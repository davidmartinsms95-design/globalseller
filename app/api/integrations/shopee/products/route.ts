import { NextResponse } from 'next/server'

import prisma from '../../../../../lib/prisma'

import { getServerSession } from 'next-auth'

import { authOptions } from '../../../auth/[...nextauth]/route'

import crypto from 'crypto'

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
          'shopee'
      )

    if (!integration) {
      return NextResponse.json(
        {
          error:
            'Shopee não conectada',
        },
        {
          status: 404,
        }
      )
    }

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

    const path =
      '/api/v2/product/get_item_list'

    /*
      Assinatura Shopee
    */

    const baseString =
      `${partnerId}${path}${timestamp}${integration.accessToken}${integration.externalUserId}`

    const sign = crypto
      .createHmac(
        'sha256',
        partnerKey
      )
      .update(baseString)
      .digest('hex')

    /*
      Buscar produtos Shopee
    */

    const response = await fetch(
      `https://partner.shopeemobile.com${path}?partner_id=${partnerId}&timestamp=${timestamp}&access_token=${integration.accessToken}&shop_id=${integration.externalUserId}&sign=${sign}&offset=0&page_size=50`,
      {
        method: 'GET',
      }
    )

    const data = await response.json()

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