import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/getCurrentUser'

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json([], { status: 401 })
    }

    const products = await prisma.product.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error(error)

    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(req: Request) {
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

    const body = await req.json()

    const product = await prisma.product.create({
      data: {
        title: body.title,
        description: body.description,
        price: Number(body.price),
        category: body.category,
        image: body.image,
        stock: body.stock ?? 0,
        userId: user.id,
      },
    })

    return NextResponse.json(product)
  } catch (error: any) {
    console.error(error)

    return NextResponse.json(
      {
        error: error.message ?? 'Erro interno',
      },
      {
        status: 500,
      }
    )
  }
}