export async function findCategory(
  title: string,
  accessToken: string
) {
  const response = await fetch(
    `https://api.mercadolibre.com/sites/MLB/domain_discovery/search?limit=1&q=${encodeURIComponent(title)}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  const data = await response.json()

  console.log(
    'CATEGORY RESPONSE:',
    JSON.stringify(data, null, 2)
  )

  if (!response.ok) {
    throw new Error(
      `Erro ao descobrir categoria: ${JSON.stringify(data)}`
    )
  }

  return data[0] ?? null
}