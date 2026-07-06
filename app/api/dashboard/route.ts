import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/getCurrentUser'

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const [
      products,
      orders,
      approvedOrders,
      integrations,
    ] = await Promise.all([
      prisma.product.count({
        where: {
          userId: user.id,
        },
      }),

      prisma.order.findMany({
        where: {
          sellerId: user.id,
        },
      }),

      prisma.order.count({
        where: {
          sellerId: user.id,
          status: {
            in: ['approved', 'paid'],
          },
        },
      }),

      prisma.integration.findMany({
        where: {
          userId: user.id,
        },
      }),
    ])

    const sales = orders.reduce(
      (total, order) => total + Number(order.amount),
      0
    )

    const averageTicket =
      orders.length > 0
        ? sales / orders.length
        : 0

    const pendingOrders = orders.filter(
      (order) =>
        !['approved', 'paid'].includes(order.status)
    ).length

    return NextResponse.json({
      products,
      orders: orders.length,
      sales,
      averageTicket,
      approvedOrders,
      pendingOrders,

      plan: user.plan,
      maxProducts: user.maxProducts,

      integrations: {
        mercadoLivre: integrations.some(
          (i) => i.provider === 'mercadolivre'
        ),

        shopee: integrations.some(
          (i) => i.provider === 'shopee'
        ),
      },
    })
  } catch (error) {
    console.error('[Dashboard]', error)

    return NextResponse.json(
      { error: 'Erro interno.' },
      { status: 500 }
    )
  }
}