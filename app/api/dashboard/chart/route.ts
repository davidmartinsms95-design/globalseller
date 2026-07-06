import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/getCurrentUser'

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json([], {
        status: 401,
      })
    }

    const orders = await prisma.order.findMany({
      where: {
        sellerId: user.id,
        status: {
          in: ['approved', 'paid'],
        },
      },
      select: {
        amount: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    const grouped: Record<string, number> = {}

    for (const order of orders) {
      const day = order.createdAt.toLocaleDateString('pt-BR')

      grouped[day] =
        (grouped[day] ?? 0) + Number(order.amount)
    }

    const chart = Object.entries(grouped).map(
      ([day, sales]) => ({
        day,
        sales,
      })
    )

    return NextResponse.json(chart)
  } catch (error) {
    console.error('[CHART]', error)

    return NextResponse.json([], {
      status: 500,
    })
  }
}