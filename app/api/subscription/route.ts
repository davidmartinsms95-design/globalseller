
import { NextResponse } from 'next/server'

import { MercadoPagoConfig, Preference } from 'mercadopago'

import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/getCurrentUser'

const SUBSCRIPTION_PRICE = 49

export async function POST() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        {
          error: 'Usuário não autenticado.',
        },
        {
          status: 401,
        },
      )
    }

    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN

    if (!accessToken) {
      console.error(
        '[SUBSCRIPTION] MERCADO_PAGO_ACCESS_TOKEN não configurado.',
      )

      return NextResponse.json(
        {
          error: 'Serviço de pagamento indisponível.',
        },
        {
          status: 503,
        },
      )
    }

    const payment = await prisma.subscriptionPayment.create({
      data: {
        userId: user.id,
        amount: SUBSCRIPTION_PRICE,
        currencyId: 'BRL',
        status: 'pending',
      },
    })

    const client = new MercadoPagoConfig({
      accessToken,
    })

    const preference = new Preference(client)

    const response = await preference.create({
      body: {
        items: [
          {
            id: 'globalseller-pro',
            title: 'GlobalSeller PRO',
            quantity: 1,
            currency_id: 'BRL',
            unit_price: SUBSCRIPTION_PRICE,
          },
        ],

        external_reference: payment.externalReference,

        back_urls: {
          success: 'https://globalseller.vercel.app/dashboard',
          failure: 'https://globalseller.vercel.app/dashboard/plans',
        },

        notification_url:
          'https://globalseller.vercel.app/api/subscription/webhook',

        auto_return: 'approved',
      },
    })

    if (!response.init_point) {
      console.error(
        '[SUBSCRIPTION] Mercado Pago não retornou init_point.',
      )

      return NextResponse.json(
        {
          error: 'Não foi possível iniciar o pagamento.',
        },
        {
          status: 502,
        },
      )
    }

    return NextResponse.json({
      init_point: response.init_point,
    })
  } catch (error) {
    console.error(
      '[SUBSCRIPTION] Erro ao criar checkout:',
      error,
    )

    return NextResponse.json(
      {
        error: 'Erro ao criar assinatura.',
      },
      {
        status: 500,
      },
    )
  }
}
