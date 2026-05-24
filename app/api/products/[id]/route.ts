import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
  })

  return NextResponse.json(product)
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json()

  const product = await prisma.product.update({
    where: {
      id: params.id,
    },

    data: {
      title: body.title,
      price: Number(body.price),
      category: body.category,
      image: body.image,
    },
  })

  return NextResponse.json(product)
}