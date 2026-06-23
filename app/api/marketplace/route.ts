import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function GET() {
  try {
    const products =
      await prisma.marketplaceProduct.findMany()

    console.log(
      'TOTAL MARKETPLACE:',
      products.length
    )

    console.log(
  'DADOS MARKETPLACE:',
  JSON.stringify(products, null, 2)
)

return NextResponse.json({
  count: products.length,
  products,
})
  } catch (error: any) {
    console.error(
      'ERRO MARKETPLACE:',
      error
    )

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

