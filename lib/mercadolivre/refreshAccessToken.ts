export async function refreshAccessToken(
  refreshToken: string,
) {
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

        refresh_token: refreshToken,
      }),
    },
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      `Erro ao renovar token do Mercado Livre: ${JSON.stringify(data)}`,
    )
  }

  if (!data.access_token) {
    throw new Error(
      'Mercado Livre não retornou um novo Access Token.',
    )
  }

  return data
}