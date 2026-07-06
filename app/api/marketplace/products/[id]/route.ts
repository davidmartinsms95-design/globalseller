import { updateMercadoLivrePrice } from '@/lib/mercadolivre/updatePrice'
import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { updateMercadoLivreStock } from '@/lib/mercadolivre/updateStock'

interface RouteContext {
  params: Promise<{
    id: string
  }>
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params
  try {
    const body = await request.json()

    const marketplaceProduct =
      await prisma.marketplaceProduct.update({
        where: {
          id,
        },
        data: {
          title: body.title,
          description: body.description,
          costPrice: body.costPrice,
          suggestedPrice: body.suggestedPrice,
          stock: body.stock,
          image: body.image,
          categoryId: body.categoryId,
          categoryName: body.categoryName,
          listingType: body.listingType,
          brand: body.brand,
          sku: body.sku,
          ean: body.ean,
        },
      })

    const resellerProducts =
      await prisma.resellerProduct.findMany({
        where: {
          marketplaceProductId: marketplaceProduct.id,
        },
        include: {
          publishedProducts: true,
        },
      })

    for (const reseller of resellerProducts) {
      for (const product of reseller.publishedProducts) {
        await prisma.product.update({
  where: {
    id: product.id,
  },
  data: {
    stock: marketplaceProduct.stock,
    ...(reseller.customPrice == null && {
      price: marketplaceProduct.suggestedPrice,
    }),
  },
})

if (product.marketplaceId) {
  try {
    await updateMercadoLivreStock(
      product.id,
      marketplaceProduct.stock
    )

    if (reseller.customPrice == null) {
      await updateMercadoLivrePrice(
        product.id,
        marketplaceProduct.suggestedPrice
      )
    }
  } catch (error) {
    console.error(
      `Erro ao sincronizar produto ${product.id}:`,
      error
    )
  }
}
      }
    }

    return NextResponse.json({
      success: true,
      product: marketplaceProduct,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        message: 'Erro ao atualizar produto.',
      },
      {
        status: 500,
      }
    )
  }
}