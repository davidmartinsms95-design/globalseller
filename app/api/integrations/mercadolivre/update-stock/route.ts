import { NextResponse } from 'next/server'

import prisma from '../../../../../../lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      productId,
      stock,
    } = body

    /*
      Buscar produto interno
    */

    const product =
      await prisma.product.findUnique({
        where: {
          id: productId,
        },
      })

    if (!product) {
      return NextResponse.json(
        {
          error:
            'Produto não encontrado',
        },
        {
          status: 404,
        }
      )
    }

    /*
      Produto não conectado
    */

    if (!product.marketplaceId) {
      return NextResponse.json(
        {
          error:
            'Produto sem marketplaceId',
        },
        {
          status: 400,
        }
      )
    }

    /*
      Buscar integração Mercado Livre
    */

    const integration =
      await prisma.integration.findFirst({
        where: {
          provider: 'mercadolivre',

          userId: product.userId,
        },
      })

    if (!integration) {
      return NextResponse.json(
        {
          error:
            'Integração Mercado Livre não encontrada',
        },
        {
          status: 404,
        }
      )
    }

    /*
      Atualizar estoque anúncio
    */

    const response = await fetch(
      `https://api.mercadolibre.com/items/${product.marketplaceId}`,
      {
        method: 'PUT',

        headers: {
          Authorization: `Bearer ${integration.accessToken}`,

          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({
          available_quantity: stock,
        }),
      }
    )

    const data = await response.json()

    console.log(
      'ESTOQUE ATUALIZADO ML:',
      data
    )

    /*
      Atualizar estoque interno
    */

    await prisma.product.update({
      where: {
        id: product.id,
      },

      data: {
        stock,
      },
    })

    return NextResponse.json({
      success: true,

      marketplace: data,
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        error:
          'Erro atualizar estoque',
      },
      {
        status: 500,
      }
    )
  }
}