import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(req: Request) {
  try {
    const { code, shopId, userId } = await req.json()

    const partnerId = process.env.SHOPEE_PARTNER_ID!
    const partnerKey = process.env.SHOPEE_PARTNER_KEY!

    const timestamp = Math.floor(Date.now() / 1000)
    const path = '/api/v2/auth/token/get'

    const baseString = `${partnerId}${path}${timestamp}`

    const sign = crypto
      .createHmac('sha256', partnerKey)
      .update(baseString)
      .digest('hex')

    const response = await fetch(
      `https://partner.shopeemobile.com${path}?partner_id=${partnerId}&timestamp=${timestamp}&sign=${sign}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          shop_id: Number(shopId),
          partner_id: Number(partnerId),
        }),
      }
    )

    const data = await response.json()

    if (!response.ok || !data.access_token) {
      return NextResponse.json(
        {
          error: data.message ?? 'Erro ao obter token da Shopee',
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
          userId,
        },
      },

      update: {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        externalUserId: String(shopId),
      },

      create: {
        provider: 'shopee',
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        externalUserId: String(shopId),
        userId,
      },
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: 'Erro ao gerar token da Shopee',
      },
      {
        status: 500,
      }
    )
  }
}