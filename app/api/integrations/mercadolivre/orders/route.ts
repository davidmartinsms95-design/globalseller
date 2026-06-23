import { NextResponse } from 'next/server'

import prisma from '../../../../../lib/prisma'

import { getServerSession } from 'next-auth'

import { authOptions } from '../../../../../lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(
      authOptions
    )

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

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
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
      await prisma.integration.findFirst({
        where: {
          userId: user.id,
          provider: 'mercadolivre',
        },
      })

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

    const response = await fetch(
      `https://api.mercadolibre.com/orders/search?seller=${integration.externalUserId}`,
      {
        headers: {
          Authorization: `Bearer ${integration.accessToken}`,
        },
      }
    )

    const data = await response.json()
    console.log(
  'RESPOSTA MERCADO LIVRE:',
  JSON.stringify(data, null, 2)
)

    const orders = (
      data.results || []
    ).map((order: any) => ({
      id: order.id,

      status: order.status,

      total_amount:
        order.total_amount,

      date_created:
        order.date_created,

      buyer:
        order.buyer?.nickname ||
        order.buyer?.first_name ||
        'Cliente',

      shipping:
        order.shipping?.status ||
        'Sem envio',
    }))

    console.log(
      'PEDIDOS ML:',
      orders
    )

    return NextResponse.json(
      orders
    )
  } catch (error) {
    console.error(
      'ERRO PEDIDOS ML:',
      error
    )

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

