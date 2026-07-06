import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/getCurrentUser'

export async function GET(req: Request) {
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

    const { searchParams } = new URL(req.url)

    const code = searchParams.get('code')

    if (!code) {
      return NextResponse.json(
        {
          error: 'Código OAuth não encontrado',
        },
        {
          status: 400,
        }
      )
    }

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
            process.env.MERCADO_LIVRE_CLIENT_ID!,
          client_secret:
            process.env.MERCADO_LIVRE_CLIENT_SECRET!,
          code,
          redirect_uri:
            'https://globalseller-zhun.vercel.app/api/integrations/mercadolivre/callback',
        }),
      }
    )

    const data = await response.json()

    if (!data.access_token) {
      return NextResponse.json(
        {
          error: 'Falha ao obter token do Mercado Livre',
        },
        {
          status: 400,
        }
      )
    }

    await prisma.integration.upsert({
      where: {
        provider_userId: {
          provider: 'mercadolivre',
          userId: user.id,
        },
      },

      update: {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        externalUserId: String(data.user_id),
      },

      create: {
        provider: 'mercadolivre',
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        externalUserId: String(data.user_id),
        userId: user.id,
      },
    })

    return NextResponse.redirect(
      'https://globalseller-zhun.vercel.app/dashboard/integrations'
    )
  } catch (error) {
    console.error('[ML CALLBACK]', error)

    return NextResponse.json(
      {
        error: 'Erro na integração com o Mercado Livre',
      },
      {
        status: 500,
      }
    )
  }
}