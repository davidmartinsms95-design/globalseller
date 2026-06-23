import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const partnerId =
      process.env.SHOPEE_PARTNER_ID

    const redirect =
      'https://globalseller.vercel.app/api/integrations/shopee/callback'

    /*
      URL OAuth Shopee
    */

    const authUrl =
      `https://partner.shopeemobile.com/api/v2/shop/auth_partner` +
      `?partner_id=${partnerId}` +
      `&redirect=${redirect}`

    return NextResponse.redirect(
      authUrl
    )
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        error:
          'Erro integração Shopee',
      },
      {
        status: 500,
      }
    )
  }
}

