import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      { error: 'Erro ao buscar produtos' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log('PRODUTO RECEBIDO:', body)

    const product = await prisma.product.create({
      data: {
        title: body.title,
        price: Number(body.price),
        category: body.category,
        image: body.image,
      },
    })

    console.log('PRODUTO CRIADO:', product)

    return NextResponse.json(product)
  } catch (error) {
    console.log('ERRO AO CRIAR PRODUTO:', error)

    return NextResponse.json(
      { error: 'Erro ao criar produto' },
      { status: 500 }
    )
  }
}