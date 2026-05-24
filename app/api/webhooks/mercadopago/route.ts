import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log('WEBHOOK RECEBIDO:', body)

    if (body.action === 'payment.updated') {
      const paymentId = body.data.id

      console.log('PAGAMENTO APROVADO:', paymentId)

      const latestOrder = await prisma.order.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
      })

      if (latestOrder) {
        await prisma.order.update({
          where: {
            id: latestOrder.id,
          },
          data: {
            status: 'paid',
          },
        })

        console.log('PEDIDO MARCADO COMO PAGO')
      }
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      { error: 'Erro webhook' },
      { status: 500 }
    )
  }
}