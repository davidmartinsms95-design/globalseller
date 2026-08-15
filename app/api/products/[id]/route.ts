import { NextResponse } from 'next/server'

import prisma from '../../../../lib/prisma'
import { getCurrentUser } from '@/lib/getCurrentUser'

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
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

    const { id } = await context.params

    let product =
      await prisma.product.findFirst({
        where: {
          id,
          userId: user.id,
        },
        include: {
          resellerProduct: {
            include: {
              marketplaceProduct: {
                include: {
                  supplier: true,
                },
              },
            },
          },
        },
      })

    if (!product) {
      product =
        await prisma.product.findFirst({
          where: {
            resellerProductId: id,
            userId: user.id,
          },
          include: {
            resellerProduct: {
              include: {
                marketplaceProduct: {
                  include: {
                    supplier: true,
                  },
                },
              },
            },
          },
        })
    }

    if (!product) {
      return NextResponse.json(
        {
          error: 'Produto não encontrado',
        },
        {
          status: 404,
        }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : String(error),
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

    const { id } = await context.params

    const body = await request.json()

    const existingProduct =
      await prisma.product.findFirst({
        where: {
          id,
          userId: user.id,
        },
      })

    if (!existingProduct) {
      return NextResponse.json(
        {
          error: 'Produto não encontrado',
        },
        {
          status: 404,
        }
      )
    }

    const product =
      await prisma.product.update({
        where: {
          id: existingProduct.id,
        },
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
        },
      })

    return NextResponse.json(product)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : String(error),
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
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Não autorizado',
        },
        {
          status: 401,
        }
      )
    }

    const { id } = await context.params

    const product =
      await prisma.product.findFirst({
        where: {
          id,
          userId: user.id,
        },
        select: {
          id: true,
        },
      })

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: 'Produto não encontrado',
        },
        {
          status: 404,
        }
      )
    }

    await prisma.order.deleteMany({
      where: {
        productId: product.id,
      },
    })

    await prisma.product.delete({
      where: {
        id: product.id,
      },
    })

    return NextResponse.json({
      success: true,
      message:
        'Produto excluído com sucesso',
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      {
        status: 500,
      }
    )
  }
}