import crypto from 'crypto'

interface ShopeeSignatureParams {
  path: string
  timestamp: number
  accessToken?: string
  shopId?: string | number
}

export function generateShopeeSignature({
  path,
  timestamp,
  accessToken,
  shopId,
}: ShopeeSignatureParams) {
  const partnerId =
    process.env.SHOPEE_PARTNER_ID!

  const partnerKey =
    process.env.SHOPEE_PARTNER_KEY!

  let baseString =
    `${partnerId}${path}${timestamp}`

  if (accessToken && shopId) {
    baseString +=
      `${accessToken}${shopId}`
  }

  const sign = crypto
    .createHmac('sha256', partnerKey)
    .update(baseString)
    .digest('hex')

  return {
    partnerId,
    partnerKey,
    sign,
    timestamp,
  }
}