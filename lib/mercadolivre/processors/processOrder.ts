import prisma from '@/lib/prisma'
import { mercadoLivreClient } from '@/lib/mercadolivre/mercadoLivreClient'
import { createSystemLog } from '@/lib/systemLog'

interface ProcessOrderData {
  topic: string
  resource: string
  userId: string | null
  receivedAt: Date
}

export async function processOrder(
  data: ProcessOrderData
) {
  try {
    console.log(
      '📦 Processando pedido Mercado Livre:',
      data
    )

    if (!data.resource) {
      console.log(
        'Webhook sem resource.'
      )

      await createSystemLog({
        service: 'Mercado Livre',
        event: 'Webhook inválido',
        status: 'warning',
        message:
          'Webhook recebido sem resource.',
        payload: {
          topic: data.topic,
          resource: data.resource,
          userId: data.userId,
          receivedAt:
            data.receivedAt.toISOString(),
        },
      })

      return
    }

    if (!data.userId) {
      throw new Error(
        'Webhook do Mercado Livre sem userId.'
      )
    }

    const integration =
      await prisma.integration.findFirst({
        where: {
          provider: 'mercadolivre',
          externalUserId: data.userId,
        },
      })

    if (!integration) {
      throw new Error(
        `Integração do Mercado Livre não encontrada para o usuário externo ${data.userId}.`
      )
    }

    const globalSellerUserId =
      integration.userId

    const order =
      await mercadoLivreClient.get(
        globalSellerUserId,
        data.resource
      )

    console.log(
      'PEDIDO IMPORTADO:',
      JSON.stringify(
        order,
        null,
        2
      )
    )

    if (!order?.id) {
      throw new Error(
        'Mercado Livre retornou um pedido sem ID.'
      )
    }

    const orderId =
      String(order.id)

    const orderItem =
      order.order_items?.[0]

    const marketplaceProductId =
      orderItem?.item?.id
        ? String(orderItem.item.id)
        : null

    if (!marketplaceProductId) {
      throw new Error(
        `Pedido ${orderId} não possui item válido.`
      )
    }

    const product =
      await prisma.product.findFirst({
        where: {
          userId:
            globalSellerUserId,
          marketplaceId:
            marketplaceProductId,
        },
      })

    if (!product) {
      await createSystemLog({
        service: 'Mercado Livre',
        event:
          'Produto do pedido não encontrado',
        status: 'warning',
        message:
          `Produto ${marketplaceProductId} do pedido ${orderId} não foi encontrado no GlobalSeller.`,
        payload: {
          topic: data.topic,
          resource: data.resource,
          externalUserId:
            data.userId,
          userId:
            globalSellerUserId,
          marketplaceProductId,
          orderId,
          receivedAt:
            data.receivedAt.toISOString(),
        },
      })

      throw new Error(
        `Produto ${marketplaceProductId} do pedido ${orderId} não encontrado no GlobalSeller.`
      )
    }

    const quantity =
      Number(
        orderItem?.quantity ?? 1
      )

    const amount =
      Number(
        order.total_amount ?? 0
      )

    const buyerName =
      order.buyer?.nickname ??
      order.buyer?.first_name ??
      null

    const customerEmail =
      order.buyer?.email ??
      null

    const shippingStatus =
      order.shipping?.status ??
      'pending'

    const savedOrder =
      await prisma.order.upsert({
        where: {
          externalOrderId_marketplace: {
            externalOrderId:
              orderId,
            marketplace:
              'mercadolivre',
          },
        },

        update: {
          productId:
            product.id,

          sellerId:
            globalSellerUserId,

          amount,

          status:
            order.status ??
            'pending',

          buyerName,

          customerEmail,

          quantity,

          shippingStatus,
        },

        create: {
          externalOrderId:
            orderId,

          marketplace:
            'mercadolivre',

          productId:
            product.id,

          sellerId:
            globalSellerUserId,

          amount,

          status:
            order.status ??
            'pending',

          buyerName,

          customerEmail,

          quantity,

          shippingStatus,
        },
      })

    await createSystemLog({
      service: 'Mercado Livre',
      event: 'Pedido importado',
      status: 'success',
      message:
        `Pedido ${orderId} importado e sincronizado com sucesso.`,
      payload: {
        orderId,
        productId:
          product.id,
        marketplaceProductId,
        externalUserId:
          data.userId,
        userId:
          globalSellerUserId,
        quantity,
        amount,
        databaseOrderId:
          savedOrder.id,
      },
    })

    console.log(
      `✅ Pedido ${orderId} salvo no banco.`
    )

    return {
      success: true,
      orderId:
        savedOrder.id,
    }
  } catch (error) {
    console.error(
      '[ML PROCESS ORDER]',
      error
    )

    await createSystemLog({
      service: 'Mercado Livre',
      event:
        'Erro ao processar pedido',
      status: 'error',
      message:
        String(error),
      payload: {
        topic: data.topic,
        resource: data.resource,
        userId: data.userId,
        receivedAt:
          data.receivedAt.toISOString(),
      },
    })

    throw error
  }
}