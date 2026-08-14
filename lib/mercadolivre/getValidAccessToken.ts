import prisma from '@/lib/prisma'

import { refreshAccessToken } from './refreshAccessToken'

export async function getValidAccessToken(
  userId: string,
): Promise<string> {
  const integration =
    await prisma.integration.findUnique({
      where: {
        provider_userId: {
          provider: 'mercadolivre',
          userId,
        },
      },
    })

  if (!integration) {
    throw new Error(
      'Integração do Mercado Livre não encontrada.',
    )
  }

  if (!integration.accessToken) {
    throw new Error(
      'Access Token do Mercado Livre não encontrado.',
    )
  }

  const now = new Date()

  const tokenExpiresAt =
    integration.accessTokenExpiresAt

  if (
    tokenExpiresAt &&
    tokenExpiresAt.getTime() >
      now.getTime() + 60 * 1000
  ) {
    return integration.accessToken
  }

  if (!integration.refreshToken) {
    throw new Error(
      'Refresh Token do Mercado Livre não encontrado.',
    )
  }

  const refreshed =
    await refreshAccessToken(
      integration.refreshToken,
    )

  if (!refreshed.access_token) {
    throw new Error(
      'Não foi possível renovar o Access Token.',
    )
  }

  const accessTokenExpiresAt =
    refreshed.expires_in
      ? new Date(
          Date.now() +
            Number(
              refreshed.expires_in,
            ) *
              1000
        )
      : null

  await prisma.integration.update({
    where: {
      id: integration.id,
    },
    data: {
      accessToken:
        refreshed.access_token,

      refreshToken:
        refreshed.refresh_token ??
        integration.refreshToken,

      accessTokenExpiresAt,
    },
  })

  return refreshed.access_token
}