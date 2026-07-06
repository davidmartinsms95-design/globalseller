import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { publishProduct } from '@/lib/publishProduct'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(
      authOptions
    )

    if (!session?.user?.email) {
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

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Usuário não encontrado',
        },
        {
          status: 404,
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
      await prisma.product.findUnique({
        where: {
          id: productId,
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

    if (product.userId !== user.id) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Este produto não pertence ao usuário.',
        },
        {
          status: 403,
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