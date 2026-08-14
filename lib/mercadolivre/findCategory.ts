import { mercadoLivreRequest } from './api'

export async function findCategory(
  title: string,
  accessToken: string,
) {
  const data = await mercadoLivreRequest(
    `/sites/MLB/domain_discovery/search?limit=1&q=${encodeURIComponent(title)}`,
    accessToken,
  )

  console.log(
    'CATEGORY RESPONSE:',
    JSON.stringify(data, null, 2),
  )

  return Array.isArray(data)
    ? (data[0] ?? null)
    : null
}