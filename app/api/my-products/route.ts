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

    const products =
  await prisma.resellerProduct.findMany({
    where: {
      resellerId: user.id,
    },
    include: {
      marketplaceProduct: true,
    },
  })

    return NextResponse.json({
      step: 'OK',
      userId: user.id,
      total: products.length,
      products,
    })
  } catch (error: any) {
    return NextResponse.json({
      step: 'ERRO',
      error: error.message,
    })
  }
}

