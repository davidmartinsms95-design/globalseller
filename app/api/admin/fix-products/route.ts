import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const resellerProducts =
      await prisma.resellerProduct.findMany({
        include: {
          marketplaceProduct: true,
          reseller: true,
        },
      })

    let created = 0

    for (const item of resellerProducts) {
      const exists =
        await prisma.product.findFirst({
          where: {
            resellerProductId: item.id,
          },
        })

      if (exists) continue

      await prisma.product.create({
        data: {
          title: item.marketplaceProduct.title,
          description:
            item.marketplaceProduct.description,
          image: item.marketplaceProduct.image,
          price:
            item.customPrice ??
            item.marketplaceProduct.suggestedPrice,
          stock: item.marketplaceProduct.stock,

          userId: item.resellerId,

          resellerProductId: item.id,

          marketplace: 'mercadolivre',
          category: 'Mercado Livre',
        },
      })

      created++
    }

    return NextResponse.json({
      success: true,
      created,
    })
  } catch (error: any) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    )
  }
} 