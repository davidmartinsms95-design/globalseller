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

  const products = await prisma.product.findMany({
    where: {
      userId: user?.id,
    },

    orderBy: {
      createdAt: 'desc',
    },
  })

  return NextResponse.json(products)
}

export async function POST(req: Request) {
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

  const body = await req.json()

  const product = await prisma.product.create({
    data: {
      title: body.title,
      price: Number(body.price),
      category: body.category,
      image: body.image,

      userId: user.id,
    },
  })

  return NextResponse.json(product)
}