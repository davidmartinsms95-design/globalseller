import { NextResponse } from 'next/server'

import { marketplaceQueue } from '../../../../lib/queues'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log(
      'WEBHOOK MERCADO LIVRE:',
      body
    )

    /*
      Orders
    */

    if (body.topic === 'orders_v2') {
      console.log('Webhook Mercado Livre recebido', body)

      console.log(
        'JOB ENVIADO FILA: order-created'
      )
    }

    /*
      Payments
    */

    if (body.topic === 'payments') {
      await marketplaceQueue.add(
        'payment-approved',
        {
          topic: body.topic,

          resource: body.resource,

          receivedAt: new Date(),
        }
      )

      console.log(
        'JOB ENVIADO FILA: payment-approved'
      )
    }

    /*
      Shipments
    */

    if (body.topic === 'shipments') {
      await marketplaceQueue.add(
        'shipment-updated',
        {
          topic: body.topic,

          resource: body.resource,

          receivedAt: new Date(),
        }
      )

      console.log(
        'JOB ENVIADO FILA: shipment-updated'
      )
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        error:
          'Erro webhook Mercado Livre',
      },
      {
        status: 500,
      }
    )
  }
}

