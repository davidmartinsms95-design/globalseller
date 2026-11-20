import { NextResponse } from 'next/server'

import {
  MercadoPagoConfig,
  Payment,
  WebhookSignatureValidator,
} from 'mercadopago'

import prisma from '@/lib/prisma'

const SUBSCRIPTION_PRICE = 49
const SUBSCRIPTION_CURRENCY = 'BRL'

export async function POST(req: Request) {
  try {
    const webhookSecret =
      process.env.MERCADO_PAGO_WEBHOOK_SECRET

    const accessToken =
      process.env.MERCADO_PAGO_ACCESS_TOKEN

    if (!webhookSecret || !accessToken) {
      console.error(
        '[SUBSCRIPTION WEBHOOK] Credenciais não configuradas.',
      )

      return NextResponse.json(
        { error: 'Webhook indisponível.' },
        { status: 503 },
      )
    }

    const url = new URL(req.url)
    const paymentId = url.searchParams.get('data.id')
    const notificationType = url.searchParams.get('type')

    if (notificationType !== 'payment' || !paymentId) {
      return NextResponse.json(
        { error: 'Notificação inválida.' },
        { status: 400 },
      )
    }

    try {
      WebhookSignatureValidator.validate({
        xSignature: req.headers.get('x-signature'),
        xRequestId: req.headers.get('x-request-id'),
        dataId: paymentId,
        secret: webhookSecret,
        toleranceSeconds: 300,
      })
    } catch {
      console.error(
        '[SUBSCRIPTION WEBHOOK] Assinatura inválida.',
      )

      return NextResponse.json(
        { error: 'Assinatura inválida.' },
        { status: 401 },
      )
    }

    const client = new MercadoPagoConfig({
      accessToken,
    })

    const paymentApi = new Payment(client)

    const payment = await paymentApi.get({
      id: paymentId,
    })

    if (
      payment.id?.toString() !== paymentId ||
      !payment.external_reference ||
      payment.transaction_amount !== SUBSCRIPTION_PRICE ||
      payment.currency_id !== SUBSCRIPTION_CURRENCY
    ) {
      console.error(
        '[SUBSCRIPTION WEBHOOK] Dados do pagamento não correspondem.',
      )

      return NextResponse.json(
        { error: 'Pagamento não corresponde à assinatura.' },
        { status: 400 },
      )
    }

    const subscriptionPayment =
      await prisma.subscriptionPayment.findUnique({
        where: {
          externalReference: payment.external_reference,
        },
      })

    if (!subscriptionPayment) {
      console.warn(
        '[SUBSCRIPTION WEBHOOK] Referência não encontrada.',
      )

      return NextResponse.json({
        success: true,
        ignored: true,
      })
    }

    if (
      Number(subscriptionPayment.amount) !== SUBSCRIPTION_PRICE ||
      subscriptionPayment.currencyId !== SUBSCRIPTION_CURRENCY
    ) {
      console.error(
        '[SUBSCRIPTION WEBHOOK] Valor registrado não corresponde.',
      )

      return NextResponse.json(
        { error: 'Registro de assinatura inválido.' },
        { status: 400 },
      )
    }

    if (
      subscriptionPayment.paymentId &&
      subscriptionPayment.paymentId !== paymentId
    ) {
      console.error(
        '[SUBSCRIPTION WEBHOOK] Referência já vinculada a outro pagamento.',
      )

      return NextResponse.json(
        { error: 'Pagamento já vinculado.' },
        { status: 409 },
      )
    }

    const processed = await prisma.$transaction(async (tx) => {
      const result = await tx.subscriptionPayment.updateMany({
        where: {
          id: subscriptionPayment.id,
          OR: [
            { paymentId: null },
            { paymentId },
          ],
        },
        data: {
          paymentId,
          status: payment.status ?? 'unknown',
          paymentMethod: payment.payment_method_id ?? null,
          statusDetail: payment.status_detail ?? null,
          approvedAt:
            payment.status === 'approved'
              ? payment.date_approved
                ? new Date(payment.date_approved)
                : new Date()
              : null,
        },
      })

      if (result.count !== 1) {
        return false
      }

      if (payment.status === 'approved') {
        await tx.user.update({
          where: {
            id: subscriptionPayment.userId,
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
      console.warn(
        '[SUBSCRIPTION WEBHOOK] Pagamento já vinculado a outro pagamento.',
      )

      return NextResponse.json(
        { error: 'Pagamento já vinculado.' },
        { status: 409 },
      )
    }

    console.log(
      '[SUBSCRIPTION WEBHOOK] Pagamento processado:',
      paymentId,
      payment.status,
    )

    return NextResponse.json({
      success: true,
      status: payment.status,
    })
  } catch (error) {
    console.error(
      '[SUBSCRIPTION WEBHOOK] Erro ao processar notificação:',
      error,
    )

    return NextResponse.json(
      { error: 'Erro ao processar webhook.' },
      { status: 500 },
    )
  }
}
