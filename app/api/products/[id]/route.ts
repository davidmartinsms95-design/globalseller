import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

interface Params {
  params: {
    id: string
  }
}

export async function GET(
  req: Request,
  { params }: Params
) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Erro ao buscar produto',
      },
      {
        status: 500,
      }
    )
  }
}

export async function PUT(
  req: Request,
  { params }: Params
) {
  try {
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
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Erro ao atualizar produto',
      },
      {
        status: 500,
      }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: Params
) {
  try {
    await prisma.product.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({
      message: 'Produto deletado',
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Erro ao deletar produto',
      },
      {
        status: 500,
      }
    )
  }
}