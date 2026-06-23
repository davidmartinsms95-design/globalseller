import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function GET() {
  try {
    const integration =
      await prisma.integration.findFirst({
        where: {
          provider: 'mercadolivre',
        },
      })

    if (!integration?.refreshToken) {
      return NextResponse.json({
        error: 'Refresh token não encontrado',
      })
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
      'REFRESH RESULT:',
      JSON.stringify(data, null, 2)
    )

    await prisma.integration.update({
  where: {
    id: integration.id,
  },
  data: {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    externalUserId: String(data.user_id),
  },
})

return NextResponse.json({
  success: true,
  updated: true,
})
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    })
  }
}

