import { NextResponse } from 'next/server'

import prisma from '../../../../../lib/prisma'
import { getCurrentUser } from '@/lib/getCurrentUser'

import {
  shopeeClient,
} from '@/lib/shopee/shopeeClient'

export async function GET() {
  try {
    const user = await getCurrentUser()

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

    const integration =
      await prisma.integration.findFirst({
        where: {
          userId: user.id,
          provider: 'shopee',
        },
      })

    if (!integration) {
      return NextResponse.json(
        {
          error: 'Shopee não conectada',
        },
        {
          status: 404,
        }
      )
    }

    if (!integration.accessToken) {
      return NextResponse.json(
        {
          error:
            'Access Token da Shopee não encontrado.',
        },
        {
          status: 400,
        }
      )
    }

    /*
      Credenciais Shopee
    */

    const response =
      await shopeeClient.get({
        path:
          '/api/v2/product/get_item_list',

        accessToken:
          integration.accessToken,

        shopId:
          integration.externalUserId!,
      })

    const data =
      await response.json()

    const itemIds =
      Array.isArray(data.response?.item)
        ? data.response.item.map(
            (item: any) =>
              item.item_id
          )
        : []

    if (
      Array.isArray(
        data.response?.item
      )
    ) {
      for (
        const item of
        data.response.item
      ) {
        await prisma.product.upsert({
          where: {
            marketplaceId:
              String(item.item_id),
          },

          update: {
            title:
              item.item_name,

            stock:
              item.stock ?? 0,

            marketplace:
              'shopee',
          },

          create: {
            title:
              item.item_name,

            price: 0,

            stock:
              item.stock ?? 0,

            marketplace:
              'shopee',

            marketplaceId:
              String(item.item_id),

            userId:
              user.id,
          },
        })
      }
    }

    if (itemIds.length > 0) {
      console.log(
        'Itens encontrados na Shopee:',
        itemIds
      )
    }

    console.log(
      'PRODUTOS SHOPEE:',
      data
    )

    return NextResponse.json(data)
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        error:
          'Erro importar produtos Shopee',
      },
      {
        status: 500,
      }
    )
  }
}