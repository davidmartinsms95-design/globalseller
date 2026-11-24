
import { NextResponse } from 'next/server'
import {
  MercadoPagoConfig,
  Payment,
  WebhookSignatureValidator,
} from 'mercadopago'
import prisma from '../../../../lib/prisma'

const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN
const webhookSecret = process.env.MERCADO_PAGO_WEBHOOK_SECRET

const client = accessToken
  ? new MercadoPagoConfig({ accessToken })
  : null

const PAYMENT_CURRENCY = 'BRL'
const SUBSCRIPTION_PRICE_CENTS = 4900

export async function POST(req: Request) {
  try {
    if (!client || !webhookSecret) {
      console.error('[WEBHOOK MP] Credenciais não configuradas.')

      return NextResponse.json(
        { error: 'Serviço de pagamento indisponível.' },
        { status: 503 },
      )
    }

    const url = new URL(req.url)
    const paymentIdFromUrl = url.searchParams.get('data.id')
    const notificationType = url.searchParams.get('type')

    if (notificationType !== 'payment') {
      return NextResponse.json({
        success: true,
        ignored: true,
      })
    }

    if (!paymentIdFromUrl?.trim()) {
      return NextResponse.json(
        { error: 'ID de pagamento ausente na URL.' },
        { status: 400 },
      )
    }

    const signatureHeader = req.headers.get('x-signature')
    const timestampMatch = signatureHeader?.match(/(?:^|,)ts=(\d+)/)
    const signatureTimestamp = timestampMatch
      ? Number(timestampMatch[1])
      : null

    const serverTimestamp = Math.floor(Date.now() / 1000)

    console.info('[WEBHOOK MP] Diagnóstico de timestamp:', {
      signatureTimestamp,
      serverTimestamp,
      differenceSeconds:
        signatureTimestamp === null
          ? null
          : serverTimestamp - signatureTimestamp,
    })

    try {
      WebhookSignatureValidator.validate({
        xSignature: signatureHeader,
        xRequestId: req.headers.get('x-request-id'),
        dataId: paymentIdFromUrl,
        secret: webhookSecret,
        toleranceSeconds: 300,
      })
    } catch (error) {
      console.error(
        '[WEBHOOK MP] Falha na validação da assinatura.',
        {
          reason:
            error instanceof Error
              ? error.message
              : 'Erro desconhecido na validação',
          paymentId: paymentIdFromUrl,
        },
      )

      return NextResponse.json(
        { error: 'Assinatura inválida.' },
        { status: 401 },
      )
    }

    let body: unknown

    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        { error: 'Notificação inválida.' },
        { status: 400 },
      )
    }

    if (
      typeof body !== 'object' ||
      body === null ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        { error: 'Formato de notificação inválido.' },
        { status: 400 },
      )
    }

    const notification = body as {
      type?: unknown
      data?: {
        id?: unknown
      }
    }

    const rawPaymentId = notification.data?.id

    if (
      notification.type !== 'payment' ||
      (typeof rawPaymentId !== 'string' &&
        typeof rawPaymentId !== 'number') ||
      !String(rawPaymentId).trim()
    ) {
      return NextResponse.json(
        { error: 'Dados da notificação inválidos.' },
        { status: 400 },
      )
    }

    const paymentId = String(rawPaymentId)

    if (paymentId !== paymentIdFromUrl) {
      return NextResponse.json(
        { error: 'ID do pagamento não corresponde.' },
        { status: 400 },
      )
    }

    // Consulta única do pagamento no Mercado Pago.
    const paymentApi = new Payment(client)
    const paymentData = await paymentApi.get({ id: paymentId })

    if (
      paymentData.id === undefined ||
      paymentData.id === null ||
      String(paymentData.id) !== paymentId
    ) {
      return NextResponse.json(
        { error: 'Pagamento não confirmado.' },
        { status: 502 },
      )
    }

    const status = paymentData.status
    const externalReference = paymentData.external_reference
    const paymentAmount = Number(paymentData.transaction_amount)

    if (!status) {
      return NextResponse.json(
        { error: 'Pagamento sem status.' },
        { status: 502 },
      )
    }

    if (
      typeof externalReference !== 'string' ||
      !externalReference.trim()
    ) {
      return NextResponse.json(
        { error: 'Referência externa ausente.' },
        { status: 422 },
      )
    }

    if (paymentData.currency_id !== PAYMENT_CURRENCY) {
      return NextResponse.json(
        { error: 'Moeda do pagamento não corresponde.' },
        { status: 422 },
      )
    }

    if (
      !Number.isFinite(paymentAmount) ||
      paymentAmount <= 0
    ) {
      return NextResponse.json(
        { error: 'Valor do pagamento inválido.' },
        { status: 422 },
      )
    }

    const paymentCents = Math.round(paymentAmount * 100)

    // Primeiro identifica se a referência pertence a uma assinatura.
    const subscriptionPayment =
      await prisma.subscriptionPayment.findUnique({
        where: {
          externalReference,
        },
      })

    if (subscriptionPayment) {
      if (
        paymentCents !== SUBSCRIPTION_PRICE_CENTS ||
        Math.round(Number(subscriptionPayment.amount) * 100) !==
          SUBSCRIPTION_PRICE_CENTS ||
        subscriptionPayment.currencyId !== PAYMENT_CURRENCY
      ) {
        console.error(
          '[WEBHOOK MP] Dados da assinatura não correspondem.',
          { paymentId, externalReference },
        )

        return NextResponse.json(
          { error: 'Registro de assinatura inválido.' },
          { status: 422 },
        )
      }

      const processed = await prisma.$transaction(async (tx) => {
        await tx.$queryRaw`
          WITH payment_lock AS MATERIALIZED (
            SELECT pg_advisory_xact_lock(
              hashtext(${`mercadopago:${paymentId}`})
            )
          )
          SELECT 1::int AS locked
          FROM payment_lock
        `

        const currentSubscription =
          await tx.subscriptionPayment.findUnique({
            where: { id: subscriptionPayment.id },
          })

        if (!currentSubscription) {
          return false
        }

        if (
          currentSubscription.paymentId &&
          currentSubscription.paymentId !== paymentId
        ) {
          return false
        }

        // Uma aprovação anterior nunca será rebaixada.
        const effectiveStatus =
          currentSubscription.status === 'approved'
            ? 'approved'
            : status

        // Preserva a data já registrada de aprovação.
        const approvedAt =
          effectiveStatus === 'approved'
            ? paymentData.date_approved
              ? new Date(paymentData.date_approved)
              : currentSubscription.approvedAt ?? new Date()
            : currentSubscription.approvedAt

        const updateResult =
          await tx.subscriptionPayment.updateMany({
            where: {
              id: currentSubscription.id,
              OR: [
                { paymentId: null },
                { paymentId },
              ],
            },
            data: {
              paymentId,
              status: effectiveStatus,
              paymentMethod:
                paymentData.payment_method_id ?? null,
              statusDetail:
                paymentData.status_detail ?? null,
              approvedAt,
            },
          })

        if (updateResult.count !== 1) {
          return false
        }

        if (effectiveStatus === 'approved') {
          await tx.user.update({
            where: {
              id: currentSubscription.userId,
            },
            data: {
              plan: 'pro',
              maxProducts: 999999,
            },
          })
        }

        return true
      })

      if (!processed) {
        return NextResponse.json(
          { error: 'Pagamento já vinculado ou registro não encontrado.' },
          { status: 409 },
        )
      }

      console.log('[WEBHOOK MP] Assinatura processada.', {
        paymentId,
        externalReference,
        status,
      })

      return NextResponse.json({
        success: true,
        type: 'subscription',
        status,
      })
    }

    // Se não for assinatura, segue o processamento de venda.
    const result = await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`
        WITH payment_lock AS MATERIALIZED (
          SELECT pg_advisory_xact_lock(
            hashtext(${`mercadopago:${paymentId}`})
          )
        )
        SELECT 1::int AS locked
        FROM payment_lock
      `

      // Localiza o pedido antes de adquirir o bloqueio específico dele.
      const matchedOrder = await tx.order.findFirst({
        where: { externalReference },
      })

      if (!matchedOrder) {
        throw new Error(
          'Pedido correspondente ao pagamento não encontrado.',
        )
      }

      // Segundo bloqueio: impede dois pagamentos diferentes
      // de processarem simultaneamente o mesmo pedido.
      await tx.$queryRaw`
        WITH order_lock AS MATERIALIZED (
          SELECT pg_advisory_xact_lock(
            hashtext(${`mercadopago:order:${matchedOrder.id}`})
          )
        )
        SELECT 1::int AS locked
        FROM order_lock
      `

      // Reconsulta o pedido depois do bloqueio para evitar
      // utilizar dados anteriores à espera pela transação.
      const order = await tx.order.findUnique({
        where: { id: matchedOrder.id },
      })

      if (!order) {
        throw new Error(
          'Pedido correspondente ao pagamento não encontrado.',
        )
      }

      if (
        order.paymentId &&
        order.paymentId !== paymentId
      ) {
        throw new Error(
          'Pedido já associado a outro pagamento.',
        )
      }

      const paymentOrder = await tx.order.findFirst({
        where: {
          paymentId,
          id: { not: order.id },
        },
      })

      if (paymentOrder) {
        throw new Error(
          'Pagamento já associado a outro pedido.',
        )
      }

      const orderCents = Math.round(order.amount * 100)

      if (orderCents !== paymentCents) {
        throw new Error(
          'O valor do pagamento não corresponde ao pedido.',
        )
      }

      const existingTransaction =
        await tx.financeTransaction.findFirst({
          where: {
            reference: paymentId,
            type: 'income',
          },
        })

      if (
        existingTransaction &&
        (
          existingTransaction.userId !== order.sellerId ||
          existingTransaction.orderId !== order.id
        )
      ) {
        throw new Error(
          'Referência financeira já utilizada por outro pedido.',
        )
      }

      const approved = status === 'approved'

      const orderStatus =
        order.status === 'paid' || approved
          ? 'paid'
          : status

      await tx.order.update({
        where: { id: order.id },
        data: {
          paymentId,
          status: orderStatus,
        },
      })

      if (approved) {
        const paymentDate = paymentData.date_approved
          ? new Date(paymentData.date_approved)
          : new Date()

        if (existingTransaction) {
          await tx.financeTransaction.update({
            where: { id: existingTransaction.id },
            data: {
              amount: paymentAmount,
              status: 'paid',
              paymentDate,
              paymentMethod:
                paymentData.payment_method_id ??
                paymentData.payment_type_id ??
                null,
            },
          })
        } else {
          await tx.financeTransaction.create({
            data: {
              userId: order.sellerId,
              orderId: order.id,
              type: 'income',
              category: 'Mercado Pago',
              amount: paymentAmount,
              paymentDate,
              paymentMethod:
                paymentData.payment_method_id ??
                paymentData.payment_type_id ??
                null,
              reference: paymentId,
              status: 'paid',
            },
          })
        }
      }

      return {
        orderId: order.id,
        status: orderStatus,
        paymentApproved: approved,
      }
    })

    console.log('[WEBHOOK MP] Venda processada.', {
      paymentId,
      orderId: result.orderId,
      status: result.status,
      paymentApproved: result.paymentApproved,
    })

    return NextResponse.json({
      success: true,
      type: 'sale',
      ...result,
    })
  } catch (error) {
    console.error(
      '[WEBHOOK MP] Erro ao processar notificação:',
      error,
    )

    return NextResponse.json(
      { error: 'Erro ao processar notificação.' },
      { status: 500 },
    )
  }
}
