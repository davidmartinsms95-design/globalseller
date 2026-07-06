import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

import {
  updateMercadoLivrePrice,
} from '@/lib/mercadolivre/updatePrice'

export async function POST(
  request: NextRequest
) {
  try {
    const { productId, price } =
      await request.json()

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

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        price: Number(price),
      },
    })

    await updateMercadoLivrePrice(
      productId,
      Number(price)
    )

    return NextResponse.json({
      success: true,
      message:
        'Preço atualizado com sucesso.',
    })
  } catch (error: any) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ??
          'Erro ao atualizar preço.',
      },
      {
        status: 500,
      }
    )
  }
}