import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/getCurrentUser'
import { createSystemLog } from '@/lib/systemLog'

import {
  marketplaceManager,
} from '@/lib/marketplaces/manager'

export async function POST() {
  let user: Awaited<
    ReturnType<typeof getCurrentUser>
  > = null

  try {
    user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        {
          error: 'Não autorizado',
        },
        {
          status: 401,
        },
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
        },
      )
    }

    await createSystemLog({
      service: 'Mercado Livre',
      event: 'Importação iniciada',
      status: 'info',
      message:
        'Iniciando importação de produtos.',
      payload: {
        userId: user.id,
        externalUserId:
          integration.externalUserId,
      },
    })

    const provider =
      marketplaceManager.getProvider(
        'mercadolivre',
      )

    let products

    try {
      products =
        await provider.getProducts(
          user.id,
        )
    } catch (error) {
      await createSystemLog({
        service: 'Mercado Livre',
        event: 'Erro na importação',
        status: 'error',
        message:
          'Falha ao consultar produtos no Mercado Livre.',
        payload: {
          userId: user.id,
          error: String(error),
        },
      })

      return NextResponse.json(
        {
          error:
            'Erro ao consultar Mercado Livre.',
        },
        {
          status: 500,
        },
      )
    }

    let imported = 0

    for (const product of products) {
      try {
        await prisma.product.upsert({
          where: {
            marketplaceId:
              product.id,
          },

          update: {
            title:
              product.title,

            price:
              product.price,

            stock:
              product.stock,

            status:
              product.status,

            permalink:
              product.permalink,

            image:
              product.image
                ? product.image.replace(
                    'http://',
                    'https://',
                  )
                : null,
          },

          create: {
            marketplaceId:
              product.id,

            title:
              product.title,

            price:
              product.price,

            stock:
              product.stock,

            status:
              product.status,

            permalink:
              product.permalink,

            image:
              product.image
                ? product.image.replace(
                    'http://',
                    'https://',
                  )
                : null,

            userId:
              user.id,
          },
        })

        imported++
      } catch {
        continue
      }
    }

    await createSystemLog({
      service: 'Mercado Livre',
      event: 'Importação concluída',
      status: 'success',
      message:
        `${imported} produto(s) importado(s).`,
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
    console.error(
      '[ML IMPORT]',
      error,
    )

    await createSystemLog({
      service: 'Mercado Livre',
      event: 'Erro na importação',
      status: 'error',
      message: String(error),
      payload: {
        userId:
          user?.id ?? null,
      },
    })

    return NextResponse.json(
      {
        error:
          'Erro ao importar produtos do Mercado Livre.',
      },
      {
        status: 500,
      },
    )
  }
}