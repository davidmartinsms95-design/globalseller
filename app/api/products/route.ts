import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return NextResponse.json(products)
}

export async function POST(req: Request) {
  const body = await req.json()

  const product = await prisma.product.create({
    data: {
      title: body.title,
      price: Number(body.price),
      category: body.category,
      image: body.image,
    },
  })

  return NextResponse.json(product)
}