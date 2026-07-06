import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/getCurrentUser'
import { createSystemLog } from '@/lib/systemLog'

export async function POST() {
  let user: Awaited<ReturnType<typeof getCurrentUser>> = null

  try {
    user = await getCurrentUser()

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

    const integration = await prisma.integration.findFirst({
      where: {
        userId: user.id,
        provider: 'mercadolivre',
      },
    })

    if (!integration) {
      return NextResponse.json(
        {
          error: 'Mercado Livre não conectado',
        },
        {
          status: 404,
        }
      )
    }

    await createSystemLog({
      service: 'Mercado Livre',
      event: 'Importação iniciada',
      status: 'info',
      message: 'Iniciando importação de produtos.',
      payload: {
        userId: user.id,
        externalUserId: integration.externalUserId,
      },
    })

    const response = await fetch(
      `https://api.mercadolibre.com/users/${integration.externalUserId}/items/search`,
      {
        headers: {
          Authorization: `Bearer ${integration.accessToken}`,
        },
      }
    )

    if (!response.ok) {
      await createSystemLog({
        service: 'Mercado Livre',
        event: 'Erro na importação',
        status: 'error',
        message: 'Falha ao consultar produtos no Mercado Livre.',
        payload: {
          userId: user.id,
          status: response.status,
        },
      })

      return NextResponse.json(
        {
          error: 'Erro ao consultar Mercado Livre.',
        },
        {
          status: response.status,
        }
      )
    }

    const data = await response.json()

    const itemIds = data.results ?? []

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

      if (!itemResponse.ok) {
        continue
      }

      const item = await itemResponse.json()

      await prisma.product.upsert({
        where: {
          marketplaceId: item.id,
        },

        update: {
          title: item.title,
          price: item.price,
          stock: item.available_quantity,
          status: item.status,
          permalink: item.permalink,
          image: item.thumbnail
            ? item.thumbnail.replace(
                'http://',
                'https://'
              )
            : null,
        },

        create: {
          marketplaceId: item.id,
          title: item.title,
          price: item.price,
          stock: item.available_quantity,
          status: item.status,
          permalink: item.permalink,
          image: item.thumbnail
            ? item.thumbnail.replace(
                'http://',
                'https://'
              )
            : null,
          userId: user.id,
        },
      })

      imported++
    }

    await createSystemLog({
      service: 'Mercado Livre',
      event: 'Importação concluída',
      status: 'success',
      message: `${imported} produto(s) importado(s).`,
      payload: {
        imported,
        userId: user.id,
      },
    })

    return NextResponse.json({
      success: true,
      imported,
    })
  } catch (error) {
    console.error('[ML IMPORT]', error)

    await createSystemLog({
      service: 'Mercado Livre',
      event: 'Erro na importação',
      status: 'error',
      message: String(error),
      payload: {
        userId: user?.id ?? null,
      },
    })

    return NextResponse.json(
      {
        error: 'Erro ao importar produtos do Mercado Livre.',
      },
      {
        status: 500,
      }
    )
  }
}