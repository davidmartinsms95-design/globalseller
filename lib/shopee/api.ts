import { generateShopeeSignature } from './sign'

interface ShopeeRequestOptions {
  path: string
  method?: 'GET' | 'POST'
  accessToken?: string
  shopId?: string
  body?: unknown
  query?: Record<
    string,
    string | number | boolean
  >
}

export async function shopeeRequest({
  path,
  method = 'GET',
  accessToken,
  shopId,
  body,
  query,
}: ShopeeRequestOptions) {
  const timestamp = Math.floor(
    Date.now() / 1000
  )

  const {
    partnerId,
    sign,
  } = generateShopeeSignature({
    path,
    timestamp,
    accessToken,
    shopId,
  })

  const params =
    new URLSearchParams({
      partner_id: partnerId,
      timestamp: String(timestamp),
      sign,
    })

  if (accessToken) {
    params.append(
      'access_token',
      accessToken
    )
  }

  if (shopId) {
    params.append(
      'shop_id',
      String(shopId)
    )
  }

  if (query) {
    Object.entries(query).forEach(
      ([key, value]) => {
        params.append(
          key,
          String(value)
        )
      }
    )
  }

  const response = await fetch(
    `https://partner.shopeemobile.com${path}?${params.toString()}`,
    {
      method,

      headers: {
        'Content-Type':
          'application/json',
      },

      body:
        method === 'POST'
          ? JSON.stringify(body)
          : undefined,
    }
  )

  return response
}