import { NextResponse } from 'next/server'

import prisma from '../../../../../lib/prisma'

export async function GET() {
  try {
    const integration =
      await prisma.integration.findFirst({
        where: {
          provider: 'mercadolivre',
        },
      })

    if (!integration?.refreshToken) {
      return NextResponse.json(
        {
          error: 'Refresh token não encontrado',
        },
        {
          status: 404,
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
          grant_type: 'refresh_token',
          client_id:
            process.env.MERCADO_LIVRE_CLIENT_ID!,
          client_secret:
            process.env.MERCADO_LIVRE_CLIENT_SECRET!,
          refresh_token:
            integration.refreshToken,
        }),
      }
    )

    const data = await response.json()

    console.log(
      'NOVO TOKEN ML:',
      JSON.stringify(data, null, 2)
    )

    if (!data.access_token) {
      return NextResponse.json(
        data,
        {
          status: 400,
        }
      )
    }

    await prisma.integration.update({
      where: {
        id: integration.id,
      },
      data: {
        accessToken: data.access_token,
        refreshToken:
          data.refresh_token ??
          integration.refreshToken,
      },
    })

    return NextResponse.json({
      success: true,
      message:
        'Token renovado com sucesso',
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: String(error),
      },
      {
        status: 500,
      }
    )
  }
}

