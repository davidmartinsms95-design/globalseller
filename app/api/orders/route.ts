import { NextResponse } from 'next/server'

import prisma from '../../../lib/prisma'

import { getServerSession } from 'next-auth'

import { authOptions } from '../auth/[...nextauth]/route'

export async function GET() {
  const session = await getServerSession(
    authOptions
  )

  if (!session?.user?.email) {
    return NextResponse.json(
      {
        error: 'Não autorizado',
      },
      {
        status: 401,
      }
    )
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  const orders = await prisma.order.findMany({
    where: {
      sellerId: user?.id,
    },

    include: {
      product: true,
    },

    orderBy: {
      createdAt: 'desc',
    },
  })

  return NextResponse.json(orders)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const product = await prisma.product.findUnique({
      where: {
        id: body.productId,
      },
    })

    if (!product) {
      return NextResponse.json(
        {
          error: 'Produto não encontrado',
        },
        {
          status: 404,
        }
      )
    }

    const order = await prisma.order.create({
      data: {
        productId: body.productId,

        sellerId: product.userId,

        amount: body.amount,

        status: 'pending',

        customerEmail:
          body.customerEmail,
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        error: 'Erro ao criar pedido',
      },
      {
        status: 500,
      }
    )
  }
}