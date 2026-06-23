import { NextResponse } from 'next/server'

import prisma from '../../../../../lib/prisma'

import { getServerSession } from 'next-auth'

import { authOptions } from '../../../../../lib/auth'

export async function POST() {
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

    let imported = 0

    for (const itemId of itemIds) {
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

      await prisma.product.upsert({
        where: {
          marketplaceId: item.id,
        },

        update: {
          title: item.title,
          price: item.price,
          stock:
            item.available_quantity,
          status: item.status,
          permalink: item.permalink,
          image: item.thumbnail?.replace(
  'http://',
  'https://'
),
        },

        create: {
  marketplaceId: item.id,
  title: item.title,
  price: item.price,
  stock: item.available_quantity,
  status: item.status,
  permalink: item.permalink,
  image: `https://${item.thumbnail.replace(
    /^https?:\/\//,
    ''
  )}`,
  userId: user.id,
},
})
      imported++
    }

    return NextResponse.json({
      success: true,
      imported,
    })
  } catch (error) {
    console.error(
      'ERRO IMPORTAÇÃO:',
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

