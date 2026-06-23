import { MercadoPagoConfig, Payment } from 'mercadopago'
import { NextResponse } from 'next/server'

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
})
export async function POST(req: Request) {
  try {
    const body = await req.json()

    const payment = new Payment(client)

    const result = await payment.create({
      body: {
        transaction_amount: Number(body.price),
        description: body.title,
        payment_method_id: 'pix',
        payer: {
          email: 'cliente@globalseller.com',
        },
      },
    })

    return NextResponse.json({
      qr_code:
        result.point_of_interaction?.transaction_data?.qr_code,

      qr_code_base64:
        result.point_of_interaction?.transaction_data
          ?.qr_code_base64,
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      { error: 'Erro ao gerar PIX' },
      { status: 500 }
    )
  }
}

