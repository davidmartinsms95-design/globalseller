import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const product = await prisma.product.findUnique({
      where: {
        id,
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

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const body = await request.json()

    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        title: body.title,
        price: Number(body.price),
        category: body.category,
        image: body.image,
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

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    await prisma.order.deleteMany({
      where: {
        productId: id,
      },
    })

    await prisma.product.delete({
  where: {
    id,
  },
})

    return NextResponse.json({
      success: true,
      message: 'Produto excluído com sucesso',
    })
  } catch (error: any) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    )
  }
}