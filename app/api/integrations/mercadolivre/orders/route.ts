import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/getCurrentUser'
import {
  marketplaceManager,
} from '@/lib/marketplaces/manager'

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

    const integration =
      await prisma.integration.findFirst({
        where: {
          userId: user.id,
          provider: 'mercadolivre',
        },
      })

    if (!integration) {
      return NextResponse.json(
        {
          error:
            'Mercado Livre não conectado.',
        },
        {
          status: 404,
        }
      )
    }

    const provider =
      marketplaceManager.getProvider(
        'mercadolivre',
      )

    const orders =
      await provider.getOrders(
        user.id,
      )

    for (const order of orders) {
  const product =
    order.marketplaceProductId
      ? await prisma.product.findFirst({
          where: {
            marketplaceId:
              order.marketplaceProductId,
            userId: user.id,
          },
        })
      : null

  if (!product) {
    console.warn(
      `[ML ORDERS] Produto não encontrado para o pedido ${order.id}. marketplaceProductId: ${order.marketplaceProductId ?? 'null'}`
    )

    continue
  }

  await prisma.order.upsert({
        where: {
          externalOrderId_marketplace: {
            externalOrderId:
              String(order.id),
            marketplace:
              'mercadolivre',
          },
        },

        update: {
  status: order.status,
  amount: order.total,
  buyerName:
    order.buyerName ?? null,
  customerEmail:
    order.customerEmail ?? null,
  shippingStatus:
    order.shippingStatus ?? 'pending',
  quantity:
    order.quantity ?? 1,
},

        create: {
  externalOrderId:
    String(order.id),

  marketplace:
    'mercadolivre',

  sellerId: user.id,

  productId:
  product.id,

  amount: order.total,

  status: order.status,

  buyerName:
    order.buyerName ?? null,

  customerEmail:
    order.customerEmail ?? null,

  shippingStatus:
    order.shippingStatus ?? 'pending',

  quantity:
    order.quantity ?? 1,
},
      })
    }

    return NextResponse.json(
      orders,
    )
  } catch (error) {
    console.error(
      '[ML ORDERS]',
      error
    )

    return NextResponse.json(
      {
        error:
          'Erro ao importar pedidos do Mercado Livre.',
      },
      {
        status: 500,
      }
    )
  }
}