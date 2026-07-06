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

    const transactions =
      await prisma.financeTransaction.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          order: true,
        },
      })

    return NextResponse.json(transactions)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Erro interno' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const body = await req.json()

    const transaction =
      await prisma.financeTransaction.create({
        data: {
  userId: user.id,
  orderId: body.orderId ?? null,

  type: body.type,
  category: body.category,
  description: body.description ?? null,
  amount: Number(body.amount),

  dueDate: body.dueDate
    ? new Date(body.dueDate)
    : null,

  paymentDate: body.paymentDate
    ? new Date(body.paymentDate)
    : null,

  status: body.status ?? 'pending',

  paymentMethod:
    body.paymentMethod ?? null,

  reference:
    body.reference ?? null,

  notes:
    body.notes ?? null,

  isRecurring:
    body.isRecurring ?? false,

  recurrence:
    body.recurrence ?? null,
},
      })

    return NextResponse.json(transaction)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Erro ao criar lançamento' },
      { status: 500 }
    )
  }
}