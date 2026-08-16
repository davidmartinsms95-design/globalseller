import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/getCurrentUser'

export async function GET() {
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

    const products =
      await prisma.product.findMany({
        where: {
          userId: user.id,
          marketplaceId: {
            not: null,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          title: true,
          price: true,
          stock: true,
          status: true,
          image: true,
          marketplaceId: true,
          permalink: true,
          createdAt: true,
        },
      })

    return NextResponse.json(products)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          'Erro ao buscar anúncios publicados.',
      },
      {
        status: 500,
      }
    )
  }
}