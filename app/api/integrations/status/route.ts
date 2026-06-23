import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../lib/auth'

export async function GET() {
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

    const user =
      await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      })

    if (!user) {
      return NextResponse.json(
        {
          error:
            'Usuário não encontrado',
        },
        {
          status: 404,
        }
      )
    }

    const integration =
      await prisma.integration.findFirst({
        where: {
          userId: user.id,
          provider: 'mercadolivre',
        },
      })

    const products =
      await prisma.resellerProduct.count({
        where: {
          resellerId: user.id,
        },
      })

    return NextResponse.json({
      connected: !!integration,
      externalUserId:
        integration?.externalUserId || null,
      products,
      orders: 0,
    })
  } catch (error) {
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