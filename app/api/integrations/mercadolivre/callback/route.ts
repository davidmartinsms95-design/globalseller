import { NextResponse } from 'next/server'

import prisma from '../../../../../../lib/prisma'

import { getServerSession } from 'next-auth'

import { authOptions } from '../../../../auth/[...nextauth]/route'

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

    const code = searchParams.get('code')

    if (!code) {
      return NextResponse.json(
        {
          error:
            'Código OAuth não encontrado',
        },
        {
          status: 400,
        }
      )
    }

    console.log(
      'CÓDIGO MERCADO LIVRE:',
      code
    )

    const response = await fetch(
      'https://api.mercadolibre.com/oauth/token',
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/x-www-form-urlencoded',
        },

        body: new URLSearchParams({
          grant_type: 'authorization_code',

          client_id:
            process.env
              .MERCADO_LIVRE_CLIENT_ID!,

          client_secret:
            process.env
              .MERCADO_LIVRE_CLIENT_SECRET!,

          code,

          redirect_uri:
            'https://globalseller.vercel.app/api/integrations/mercadolivre/callback',
        }),
      }
    )

    const data = await response.json()

    console.log(
      'TOKEN MERCADO LIVRE:',
      data
    )

    await prisma.integration.upsert({
      where: {
        provider_userId: {
          provider: 'mercadolivre',

          userId: user.id,
        },
      },

      update: {
        accessToken: data.access_token,

        refreshToken:
          data.refresh_token,

        externalUserId:
          String(data.user_id),
      },

      create: {
        provider: 'mercadolivre',

        accessToken: data.access_token,

        refreshToken:
          data.refresh_token,

        externalUserId:
          String(data.user_id),

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
          'Erro integração Mercado Livre',
      },
      {
        status: 500,
      }
    )
  }
}