import { NextResponse } from 'next/server'

import prisma from '../../../../../lib/prisma'

import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../../lib/auth'

export async function POST(
  req: Request
) {
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
        include: {
          integrations: true,
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

    const integration =
      user.integrations.find(
        (item) =>
          item.provider ===
          'mercadolivre'
      )

    if (!integration) {
      return NextResponse.json(
        {
          error:
            'Mercado Livre não conectado',
        },
        {
          status: 404,
        }
      )
    }

    const { query } =
      await req.json()

    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLB/domain_discovery/search?limit=10&q=${encodeURIComponent(
        query
      )}`,
      {
        headers: {
          Authorization: `Bearer ${integration.accessToken}`,
        },
      }
    )

    const data =
      await response.json()

    return NextResponse.json({
      success: true,
      categories: data,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          'Erro ao buscar categorias',
      },
      {
        status: 500,
      }
    )
  }
}

