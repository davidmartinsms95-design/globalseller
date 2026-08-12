import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/getCurrentUser'

import {
  marketplaceManager,
} from '@/lib/marketplaces/manager'

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 },
      )
    }

    const integration =
      await prisma.integration.findFirst({
        where: {
          userId: user.id,
          provider: 'mercadolivre',
        },
      })

    if (!integration) {
      return NextResponse.json(
        {
          error:
            'Mercado Livre não conectado',
        },
        { status: 404 },
      )
    }

    const provider =
      marketplaceManager.getProvider(
        'mercadolivre',
      )

    const products =
      await provider.getProducts(
        user.id,
      )

    return NextResponse.json(
      products,
    )
  } catch (error) {
    console.error(
      '[ML PRODUCTS]',
      error,
    )

    return NextResponse.json(
      {
        error:
          'Erro ao buscar produtos do Mercado Livre.',
      },
      { status: 500 },
    )
  }
}