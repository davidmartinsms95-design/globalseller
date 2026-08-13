import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

import {
  marketplaceManager,
} from '@/lib/marketplaces/manager'

export async function POST(
  request: NextRequest
) {
  try {
    const { productId } = await request.json()

    const product =
      await prisma.product.findUnique({
        where: {
          id: productId,
        },
      })

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: 'Produto não encontrado.',
        },
        {
          status: 404,
        }
      )
    }

    if (!product.marketplaceId) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Produto ainda não foi publicado.',
        },
        {
          status: 400,
        }
      )
    }

    const provider =
      marketplaceManager.getProvider(
        'mercadolivre',
      )

    await provider.updateStock(
      product.id,
      product.stock,
    )

    await provider.updatePrice(
      product.id,
      product.price,
    )

    return NextResponse.json({
      success: true,
      message:
        'Produto sincronizado com sucesso.',
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        message:
          'Erro ao sincronizar produto.',
      },
      {
        status: 500,
      }
    )
  }
}