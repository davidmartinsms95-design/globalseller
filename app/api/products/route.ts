import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET() {
  try {
    console.time('API_PRODUCTS')

    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    console.timeEnd('API_PRODUCTS')

    return NextResponse.json(products)
  } catch (error: any) {
    console.error(error)

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(
      authOptions
    )

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
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
  } catch (error: any) {
    console.error(error)

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    )
  }
}