import { NextResponse } from 'next/server'

import { getMarketplaceQueue } from '../../../../lib/queues'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log(
      'WEBHOOK MERCADO LIVRE:',
      body
    )

    const userId =
      body.user_id
        ? String(body.user_id)
        : null

    /*
      Orders
    */

    if (body.topic === 'orders_v2') {
      await getMarketplaceQueue().add(
        'order-created',
        {
          topic: body.topic,
          resource: body.resource,
          userId,
          receivedAt: new Date(),
        },
        {
          attempts: 5,
          backoff: {
            type: 'exponential',
            delay: 3000,
          },
          removeOnComplete: 100,
          removeOnFail: 500,
        }
      )

      console.log(
        'JOB ENVIADO FILA: order-created'
      )
    }

    /*
      Payments
    */

    if (body.topic === 'payments') {
      await getMarketplaceQueue().add(
        'payment-approved',
        {
          topic: body.topic,
          resource: body.resource,
          userId,
          receivedAt: new Date(),
        },
        {
          attempts: 5,
          backoff: {
            type: 'exponential',
            delay: 3000,
          },
          removeOnComplete: 100,
          removeOnFail: 500,
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
      await getMarketplaceQueue().add(
        'shipment-updated',
        {
          topic: body.topic,
          resource: body.resource,
          userId,
          receivedAt: new Date(),
        },
        {
          attempts: 5,
          backoff: {
            type: 'exponential',
            delay: 3000,
          },
          removeOnComplete: 100,
          removeOnFail: 500,
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