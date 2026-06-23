import { NextResponse } from 'next/server'

import prisma from '../../../../../lib/prisma'

import { getServerSession } from 'next-auth'

import { authOptions } from '../../../../../lib/auth'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(
      authOptions
    )

    if (!session?.user?.email) {
      return NextResponse.redirect(
        'https://globalseller.vercel.app/login'
      )
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (!user) {
      return NextResponse.redirect(
        'https://globalseller.vercel.app/login'
      )
    }

    const { searchParams } = new URL(req.url)

    const code =
      searchParams.get('code')

    const shopId =
      searchParams.get('shop_id')

    if (!code || !shopId) {
      return NextResponse.json(
        {
          error:
            'Dados Shopee inválidos',
        },
        {
          status: 400,
        }
      )
    }

    console.log(
      'SHOPEE CODE:',
      code
    )

    console.log(
      'SHOPEE SHOP:',
      shopId
    )

    /*
      Próximo passo:
      trocar code por access_token
    */

    await prisma.integration.upsert({
      where: {
        provider_userId: {
          provider: 'shopee',

          userId: user.id,
        },
      },

      update: {
        externalUserId: shopId,
      },

      create: {
        provider: 'shopee',

        accessToken: 'pending',

        externalUserId: shopId,

        userId: user.id,
      },
    })

    return NextResponse.redirect(
      'https://globalseller.vercel.app/dashboard/integrations'
    )
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        error:
          'Erro callback Shopee',
      },
      {
        status: 500,
      }
    )
  }
}

