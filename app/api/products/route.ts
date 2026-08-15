import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/getCurrentUser'

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        [],
        { status: 401 }
      )
    }

    const products =
      await prisma.product.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          title: true,
          price: true,
          stock: true,
          status: true,
          image: true,
          sku: true,
          createdAt: true,
        },
      })

    return NextResponse.json(
      products
    )
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      [],
      { status: 500 }
    )
  }
}

export async function POST(
  req: Request
) {
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

    const product =
      await prisma.product.create({
        data: {
          title: body.title,

          price: Number(
            body.price ?? 0
          ),

          costPrice: Number(
            body.costPrice ?? 0
          ),

          category: body.category,

          image: body.image,

          stock: Number(
            body.stock ?? 0
          ),

          description:
            body.description,

          shortDescription:
            body.shortDescription,

          sku: body.sku,

          ean: body.ean,

          brand: body.brand,

          model: body.model,

          weight: Number(
            body.weight ?? 0
          ),

          height: Number(
            body.height ?? 0
          ),

          width: Number(
            body.width ?? 0
          ),

          length: Number(
            body.length ?? 0
          ),

          userId: user.id,
        },
      })

    return NextResponse.json(
      product
    )
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Erro interno',
      },
      {
        status: 500,
      }
    )
  }
}