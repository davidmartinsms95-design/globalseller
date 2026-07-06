import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const products = await prisma.marketplaceProduct.findMany({
      include: {
        supplier: {
          select: {
            id: true,
            companyName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({
      success: true,
      products,
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const product = await prisma.marketplaceProduct.create({
      data: {
        title: body.title,
        description: body.description,
        costPrice: Number(body.costPrice),
        suggestedPrice: Number(body.suggestedPrice),
        stock: Number(body.stock),
        image: body.image,

        supplierId: body.supplierId,

        brand: body.brand,
        categoryId: body.categoryId,
        categoryName: body.categoryName,
        listingType: body.listingType,
        sku: body.sku,
        ean: body.ean,
      },
    })

    return NextResponse.json({
      success: true,
      product,
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