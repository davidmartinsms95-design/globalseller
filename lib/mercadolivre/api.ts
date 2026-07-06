export async function mercadoLivreRequest(
  endpoint: string,
  accessToken: string,
  options?: RequestInit
) {
  const response = await fetch(
    `https://api.mercadolibre.com${endpoint}`,
    {
      ...options,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        ...(options?.headers ?? {}),
      },
    }
  )

  if (!response.ok) {
    throw new Error(
      `Mercado Livre API: ${response.status} ${response.statusText}`
    )
  }

  return response.json()
}