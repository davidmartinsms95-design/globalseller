import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../lib/auth'

export async function POST(req: Request) {
  try {
    const session =
      await getServerSession(authOptions)

    if (!session?.user?.email) {
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

    const user =
      await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      })

    if (!user) {
      return NextResponse.json(
        {
          error: 'Usuário não encontrado',
        },
        {
          status: 404,
        }
      )
    }

    const marketplaceProduct =
      await prisma.marketplaceProduct.findUnique({
        where: {
          id: body.marketplaceProductId,
        },
      })

    if (!marketplaceProduct) {
      return NextResponse.json(
        {
          error: 'Produto não encontrado.',
        },
        {
          status: 404,
        }
      )
    }

    const exists =
      await prisma.resellerProduct.findFirst({
        where: {
          resellerId: user.id,
          marketplaceProductId:
            body.marketplaceProductId,
        },
      })

    if (exists) {
      return NextResponse.json({
        success: true,
        message:
          'Produto já está no catálogo',
      })
    }

    const resellerProduct =
      await prisma.resellerProduct.create({
        data: {
          resellerId: user.id,
          marketplaceProductId:
            body.marketplaceProductId,
        },
      })

    const product =
      await prisma.product.create({
        data: {
          title: marketplaceProduct.title,
          description:
            marketplaceProduct.description,
          image: marketplaceProduct.image,
          price:
            marketplaceProduct.suggestedPrice,
          stock:
            marketplaceProduct.stock,
          userId: user.id,
          resellerProductId:
            resellerProduct.id,
        },
      })

    return NextResponse.json({
      success: true,
      resellerProduct,
      product,
    })
  } catch (error) {
    console.error(
      'ERRO ADD CATÁLOGO:',
      error
    )

    return NextResponse.json(
      {
        error: String(error),
      },
      {
        status: 500,
      }
    )
  }
}