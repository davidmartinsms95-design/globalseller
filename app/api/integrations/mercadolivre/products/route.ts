import { NextResponse } from 'next/server'

import prisma from '../../../../../lib/prisma'

import { getServerSession } from 'next-auth'

import { authOptions } from '../../../auth/[...nextauth]/route'

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

      include: {
        integrations: true,
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

    const response = await fetch(
      `https://api.mercadolibre.com/users/${integration.externalUserId}/items/search`,
      {
        headers: {
          Authorization: `Bearer ${integration.accessToken}`,
        },
      }
    )

    const data = await response.json()

    const itemIds = data.results || []

    const products = await Promise.all(
      itemIds.map(async (itemId: string) => {
        const itemResponse = await fetch(
          `https://api.mercadolibre.com/items/${itemId}`,
          {
            headers: {
              Authorization: `Bearer ${integration.accessToken}`,
            },
          }
        )

        const item =
          await itemResponse.json()

        return {
          id: item.id,

          title: item.title,

          price: item.price,

          thumbnail: item.thumbnail,

          available_quantity:
            item.available_quantity,

          status: item.status,

          permalink: item.permalink,
        }
      })
    )

    console.log(
      'PRODUTOS COMPLETOS:',
      products
    )

    return NextResponse.json(products)
  } catch (error) {
  console.error('ERRO ML:', error)

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