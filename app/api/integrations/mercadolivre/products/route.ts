import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/getCurrentUser'

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const integration = await prisma.integration.findFirst({
      where: {
        userId: user.id,
        provider: 'mercadolivre',
      },
    })

    if (!integration) {
      return NextResponse.json(
        { error: 'Mercado Livre não conectado' },
        { status: 404 }
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

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Erro ao consultar Mercado Livre' },
        { status: response.status }
      )
    }

    const data = await response.json()

    const itemIds = data.results ?? []

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

        if (!itemResponse.ok) {
          return null
        }

        const item = await itemResponse.json()

        return {
          id: item.id,
          title: item.title,
          price: item.price,
          thumbnail: item.thumbnail,
          available_quantity: item.available_quantity,
          status: item.status,
          permalink: item.permalink,
        }
      })
    )

    return NextResponse.json(
      products.filter(Boolean)
    )
  } catch (error) {
    console.error('[ML PRODUCTS]', error)

    return NextResponse.json(
      { error: 'Erro ao buscar produtos do Mercado Livre.' },
      { status: 500 }
    )
  }
}