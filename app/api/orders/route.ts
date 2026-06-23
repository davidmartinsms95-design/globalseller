import { NextResponse } from 'next/server'

import prisma from '../../../lib/prisma'

import { getServerSession } from 'next-auth'

import { authOptions } from '../../../lib/auth'

export async function GET() {
  try {
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

    if (!user) {
      return NextResponse.json(
        {
          error: 'Usuário não encontrado',
        },
        {
          status: 404,
        }
      )
    }

    const orders = await prisma.order.findMany({
      where: {
        sellerId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        error: 'Erro ao carregar pedidos',
      },
      {
        status: 500,
      }
    )
  }
}

