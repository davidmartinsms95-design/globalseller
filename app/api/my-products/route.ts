import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'

export async function GET() {
  try {
    const session =
      await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({
        step: 'SEM_SESSAO',
      })
    }

    const user =
      await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      })

    if (!user) {
      return NextResponse.json({
        step: 'USUARIO_NAO_ENCONTRADO',
        email: session.user.email,
      })
    }

    const resellerProducts =
      await prisma.resellerProduct.findMany({
        where: {
          resellerId: user.id,
        },
        include: {
          marketplaceProduct: {
            include: {
              supplier: true,
            },
          },
        },
      })

    const publishedProducts =
  await prisma.product.findMany({
    where: {
      userId: user.id,
      resellerProductId: {
        in: resellerProducts.map(
          (item) => item.id,
        ),
      },
    },
    select: {
      id: true,
      resellerProductId: true,
      marketplaceId: true,
      permalink: true,
      status: true,
    },
  })

const publishedProductsMap = new Map(
  publishedProducts.map((product) => [
    product.resellerProductId,
    product,
  ]),
)

const products = resellerProducts.map(
  (item) => {
    const publishedProduct =
      publishedProductsMap.get(item.id)

    return {
      ...item,

      productId:
        publishedProduct?.id ?? null,

      marketplaceId:
        publishedProduct?.marketplaceId ??
        null,

      permalink:
        publishedProduct?.permalink ??
        null,

      status:
        publishedProduct?.status ??
        null,
    }
  },
)

    return NextResponse.json({
      step: 'OK',
      userId: user.id,
      total: products.length,
      products,
    })
  } catch (error: any) {
    console.error(error)

    return NextResponse.json({
      step: 'ERRO',
      error: error.message,
    })
  }
}