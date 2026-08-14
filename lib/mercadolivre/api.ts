import { executeRequest } from '@/lib/marketplaces/baseClient'

interface MercadoLivreRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  query?: Record<
    string,
    string | number | boolean
  >
}

export async function mercadoLivreRequest(
  endpoint: string,
  accessToken: string,
  options?: MercadoLivreRequestOptions,
) {
  return executeRequest(
  'https://api.mercadolibre.com',
  accessToken,
  {
    endpoint,
    method: options?.method,
    body: options?.body,
    query: options?.query,
  },
)
}
