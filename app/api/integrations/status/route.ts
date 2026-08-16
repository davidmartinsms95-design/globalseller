import { NextResponse } from 'next/server'

import prisma from '../../../../lib/prisma'
import { getCurrentUser } from '@/lib/getCurrentUser'

export async function GET() {
  try {
    const user =
      await getCurrentUser()

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