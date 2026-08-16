import { NextResponse } from 'next/server'

import prisma from '../../../../../lib/prisma'
import { getCurrentUser } from '../../../../../lib/getCurrentUser'
import { generateShopeeSignature } from '../../../../../lib/shopee/sign'

export async function POST(req: Request) {
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

    const body = await req.json()

    const {
      code,
      shopId,
    } = body

    if (!code || !shopId) {
      return NextResponse.json(
        {
          error:
            'Código ou loja Shopee não informado.',
        },
        {
          status: 400,
        }
      )
    }

    const path =
      '/api/v2/auth/token/get'

    const {
      partnerId,
      sign,
      timestamp,
    } = generateShopeeSignature({
      path,
      timestamp: Math.floor(
        Date.now() / 1000
      ),
    })

    const response = await fetch(
      `https://partner.shopeemobile.com${path}?partner_id=${partnerId}&timestamp=${timestamp}&sign=${sign}`,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({
          code,

          shop_id: Number(shopId),

          partner_id: Number(
            partnerId
          ),
        }),
      }
    )

    const data = await response.json()

    console.log(
      'TOKEN SHOPEE:',
      data
    )

    if (
      !response.ok ||
      !data.access_token
    ) {
      return NextResponse.json(
        {
          error:
            data.message ??
            'Erro ao obter token da Shopee',
        },
        {
          status: 500,
        }
      )
    }

    await prisma.integration.upsert({
      where: {
        provider_userId: {
          provider: 'shopee',

          userId: user.id,
        },
      },

      update: {
        accessToken:
          data.access_token,

        refreshToken:
          data.refresh_token,

        externalUserId:
          String(shopId),
      },

      create: {
        provider: 'shopee',

        accessToken:
          data.access_token,

        refreshToken:
          data.refresh_token,

        externalUserId:
          String(shopId),

        userId: user.id,
      },
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(
      '[SHOPEE TOKEN]',
      error
    )

    return NextResponse.json(
      {
        error:
          'Erro ao gerar token da Shopee',
      },
      {
        status: 500,
      }
    )
  }
}
