import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const order = await prisma.order.create({
      data: {
        productId: body.productId,
        amount: body.amount,
        status: 'pending',
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      { error: 'Erro ao criar pedido' },
      { status: 500 }
    )
  }
}