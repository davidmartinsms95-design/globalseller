import { NextResponse } from 'next/server'

import prisma from '../../../../../lib/prisma'

import crypto from 'crypto'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      code,
      shopId,
      userId,
    } = body

    /*
      Credenciais Shopee
    */

    const partnerId =
      process.env.SHOPEE_PARTNER_ID!

    const partnerKey =
      process.env.SHOPEE_PARTNER_KEY!

    const timestamp = Math.floor(
      Date.now() / 1000
    )

    /*
      Assinatura Shopee
    */

    const path =
      '/api/v2/auth/token/get'

    const baseString =
      `${partnerId}${path}${timestamp}`

    const sign = crypto
      .createHmac(
        'sha256',
        partnerKey
      )
      .update(baseString)
      .digest('hex')

    /*
      Buscar token Shopee
    */

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

    /*
      Salvar integração
    */

    await prisma.integration.upsert({
      where: {
        provider_userId: {
          provider: 'shopee',

          userId,
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

        userId,
      },
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        error:
          'Erro gerar token Shopee',
      },
      {
        status: 500,
      }
    )
  }
}

