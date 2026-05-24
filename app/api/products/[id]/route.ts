import prisma from '../../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  context: {
    params: Promise<{
      id: string
    }>
  }
) {
  const params = await context.params

  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
  })

  return NextResponse.json(product)
}

export async function PUT(
  req: Request,
  context: {
    params: Promise<{
      id: string
    }>
  }
) {
  const params = await context.params

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

export async function DELETE(
  req: Request,
  context: {
    params: Promise<{
      id: string
    }>
  }
) {
  const params = await context.params

  await prisma.product.delete({
    where: {
      id: params.id,
    },
  })

  return NextResponse.json({
    message: 'Produto deletado',
  })
}