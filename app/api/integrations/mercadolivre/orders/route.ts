import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/getCurrentUser'

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        {
          error: 'Não autorizado',
        },
        {
          status: 401,
        }
      )
    }

    const firstProduct = await prisma.product.findFirst({
      where: {
        userId: user.id,
      },
    })

    if (!firstProduct) {
      return NextResponse.json(
        {
          error: 'Nenhum produto encontrado para este usuário.',
        },
        {
          status: 400,
        }
      )
    }

    const integration = await prisma.integration.findFirst({
      where: {
        userId: user.id,
        provider: 'mercadolivre',
      },
    })

    if (!integration) {
      return NextResponse.json(
        {
          error: 'Mercado Livre não conectado.',
        },
        {
          status: 404,
        }
      )
    }

    const response = await fetch(
      `https://api.mercadolibre.com/orders/search?seller=${integration.externalUserId}`,
      {
        headers: {
          Authorization: `Bearer ${integration.accessToken}`,
        },
      }
    )

    const data = await response.json()

    for (const order of data.results ?? []) {
      await prisma.order.upsert({
        where: {
          externalOrderId_marketplace: {
            externalOrderId: String(order.id),
            marketplace: 'mercadolivre',
          },
        },

        update: {
          status: order.status,
          amount: order.total_amount,
          buyerName:
            order.buyer?.nickname ??
            order.buyer?.first_name ??
            null,
          customerEmail:
            order.buyer?.email ??
            null,
          shippingStatus:
            order.shipping?.status ??
            'pending',
          quantity:
            order.order_items?.[0]?.quantity ??
            1,
        },

        create: {
          externalOrderId: String(order.id),
          marketplace: 'mercadolivre',
          sellerId: user.id,
          productId: firstProduct.id,
          amount: order.total_amount,
          status: order.status,
          buyerName:
            order.buyer?.nickname ??
            order.buyer?.first_name ??
            null,
          customerEmail:
            order.buyer?.email ??
            null,
          shippingStatus:
            order.shipping?.status ??
            'pending',
          quantity:
            order.order_items?.[0]?.quantity ??
            1,
        },
      })
    }

    const orders = (data.results ?? []).map((order: any) => ({
      id: order.id,
      status: order.status,
      total_amount: order.total_amount,
      date_created: order.date_created,
      buyer:
        order.buyer?.nickname ??
        order.buyer?.first_name ??
        'Cliente',
      shipping:
        order.shipping?.status ??
        'Sem envio',
    }))

    return NextResponse.json(orders)
  } catch (error) {
    console.error('[ML ORDERS]', error)

    return NextResponse.json(
      {
        error: 'Erro ao importar pedidos do Mercado Livre.',
      },
      {
        status: 500,
      }
    )
  }
}