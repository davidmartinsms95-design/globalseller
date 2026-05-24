import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import prisma from '../../../lib/prisma'

const client = new MercadoPagoConfig({
  accessToken:
    process.env.MERCADO_PAGO_ACCESS_TOKEN!,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log('BODY RECEBIDO:', body)

    const externalReference =
      crypto.randomUUID()

    const payment = new Payment(client)

    const response = await payment.create({
      body: {
        transaction_amount: Number(body.amount),

        description: body.title,

        payment_method_id: 'pix',

        external_reference:
          externalReference,

        payer: {
          email:
            body.email ||
            'cliente@globalseller.com',
        },
      },
    })

    const order = await prisma.order.create({
      data: {
        productId: body.productId,

        amount: Number(body.amount),

        status: 'pending',

        paymentId: String(response.id),

        externalReference,

        customerEmail:
          body.email ||
          'cliente@globalseller.com',
      },
    })

    console.log('PEDIDO CRIADO:', order)

    return NextResponse.json({
      qr_code:
        response.point_of_interaction
          ?.transaction_data?.qr_code,

      qr_code_base64:
        response.point_of_interaction
          ?.transaction_data
          ?.qr_code_base64,

      paymentId: response.id,

      orderId: order.id,
    })
  } catch (error) {
    console.log(
      'ERRO NO CHECKOUT:',
      error
    )

    return NextResponse.json(
      {
        error: 'Erro ao gerar PIX',
      },
      {
        status: 500,
      }
    )
  }
}