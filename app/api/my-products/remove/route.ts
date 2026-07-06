import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Não autorizado.',
        },
        {
          status: 401,
        }
      )
    }

    const body = await req.json()

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Usuário não encontrado.',
        },
        {
          status: 404,
        }
      )
    }

    await prisma.resellerProduct.deleteMany({
      where: {
        id: body.id,
        resellerId: user.id,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Produto removido do catálogo.',
    })
  } catch (error: any) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    )
  }
}