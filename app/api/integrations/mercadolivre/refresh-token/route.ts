import { NextResponse } from 'next/server'

import prisma from '../../../../../lib/prisma'

import { refreshAccessToken } from '../../../../../lib/mercadolivre/refreshAccessToken'

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

    const data = await refreshAccessToken(
  integration.refreshToken
)

if (!data.access_token) {
  return NextResponse.json(data, {
    status: 400,
  })
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

