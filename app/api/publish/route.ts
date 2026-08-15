import { NextResponse } from 'next/server'

import { getCurrentUser } from '@/lib/getCurrentUser'
import prisma from '@/lib/prisma'
import { publishProduct } from '@/lib/publishProduct'

export async function POST(req: Request) {
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

    const { productId } =
      await req.json()

    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Produto não informado.',
        },
        {
          status: 400,
        }
      )
    }

    const product =
      await prisma.product.findFirst({
        where: {
          id: productId,
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
          error: 'Produto não encontrado.',
        },
        {
          status: 404,
        }
      )
    }

    const result =
      await publishProduct(
        user.id,
        productId
      )

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error(
      'ERRO PUBLICAÇÃO:',
      error
    )

    return NextResponse.json(
      {
        success: false,
        error:
          'Erro interno ao publicar produto.',
      },
      {
        status: 500,
      }
    )
  }
}