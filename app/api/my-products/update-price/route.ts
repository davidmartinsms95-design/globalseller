import { NextResponse } from 'next/server'

import prisma from '../../../../lib/prisma'
import { getCurrentUser } from '@/lib/getCurrentUser'

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

    const body = await req.json()

    const resellerProduct =
      await prisma.resellerProduct.findFirst({
        where: {
          id: body.id,
          resellerId: user.id,
        },
      })

    if (!resellerProduct) {
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

    const product =
      await prisma.resellerProduct.update({
        where: {
          id: resellerProduct.id,
        },
        data: {
          customPrice: Number(
            body.customPrice
          ),
        },
      })

    return NextResponse.json({
      success: true,
      product,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Erro interno',
      },
      {
        status: 500,
      }
    )
  }
}
