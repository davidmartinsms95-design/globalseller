import { NextResponse } from 'next/server'

import { MercadoPagoConfig, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken:
    process.env.MERCADO_PAGO_ACCESS_TOKEN!,
})

export async function POST() {
  try {
    const preference = new Preference(client)

    const response = await preference.create({
      body: {
        items: [
  {
    id: 'globalseller-pro',

    title: 'GlobalSeller PRO',

    quantity: 1,

    currency_id: 'BRL',

    unit_price: 49,
  },
],
        back_urls: {
          success:
            'https://globalseller.vercel.app/dashboard',

          failure:
            'https://globalseller.vercel.app/dashboard/plans',
        },

        auto_return: 'approved',
      },
    })

    return NextResponse.json({
      init_point: response.init_point,
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        error:
          'Erro ao criar assinatura',
      },
      {
        status: 500,
      }
    )
  }
}