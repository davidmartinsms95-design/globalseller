import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function GET() {
  try {
    const supplier =
      await prisma.supplier.findFirst()

    if (!supplier) {
      return NextResponse.json(
        {
          error:
            'Nenhum fornecedor encontrado',
        },
        {
          status: 404,
        }
      )
    }

    const product =
      await prisma.marketplaceProduct.create({
        data: {
          title: 'Puff Tapeçaria Martins',
          description:
            'Puff premium para sala e decoração',
          costPrice: 50,
          suggestedPrice: 99,
          stock: 30,
          image:
            'https://http2.mlstatic.com/D_NQ_NP_2X_918257-MLB109200741737_032026-I.webp',
          supplierId: supplier.id,
        },
      })

    return NextResponse.json({
      success: true,
      product,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    )
  }
}

