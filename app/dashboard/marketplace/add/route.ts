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
        { error: 'Não autorizado' },
        { status: 401 }
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
        { error: 'Usuário não encontrado' },
        { status: 404 }
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

    const product =
      await prisma.resellerProduct.create({
        data: {
          resellerId: user.id,
          marketplaceProductId:
            body.marketplaceProductId,
        },
      })

    return NextResponse.json({
      success: true,
      product,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}

