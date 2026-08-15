import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
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
        select: {
          id: true,
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

    await prisma.resellerProduct.delete({
      where: {
        id: resellerProduct.id,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Produto removido do catálogo.',
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