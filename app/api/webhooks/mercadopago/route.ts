import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import {
  MercadoPagoConfig,
  Payment,
} from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken:
    process.env.MERCADO_PAGO_ACCESS_TOKEN!,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log(
      'WEBHOOK MP RECEBIDO:',
      body
    )

    if (body.type === 'payment') {
      const payment = new Payment(client)

      const paymentData =
        await payment.get({
          id: body.data.id,
        })

      const paymentId = String(
        paymentData.id
      )

      const status =
        paymentData.status || 'pending'

      await prisma.order.updateMany({
        where: {
          paymentId,
        },

        data: {
          status,
        },
      })

      console.log(
        'PEDIDO ATUALIZADO:',
        paymentId,
        status
      )
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.log(
      'ERRO WEBHOOK MP:',
      error
    )

    return NextResponse.json(
      {
        error: 'Erro webhook',
      },
      {
        status: 500,
      }
    )
  }
}

