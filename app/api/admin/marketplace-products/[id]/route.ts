import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { updateMercadoLivreStock } from '@/lib/mercadolivre/updateStock'
interface RouteContext {
  params: Promise<{
    id: string
  }>
}

export async function PUT(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params
    const body = await req.json()

    const product = await prisma.marketplaceProduct.update({
      where: {
        id,
      },
      data: {
        title: body.title,
        description: body.description,
        costPrice: Number(body.costPrice),
        suggestedPrice: Number(body.suggestedPrice),
        stock: Number(body.stock),
        image: body.image,
        supplierId: body.supplierId,
      },
      include: {
        supplier: true,
      },
    })

    try {
  // A implementação completa virá na próxima etapa
  // Por enquanto apenas deixamos o ponto de integração preparado.
} catch (error) {
  console.error(
    'Erro ao sincronizar estoque com Mercado Livre:',
    error
  )
}
    return NextResponse.json({
      success: true,
      product,
    })
  } catch (error: any) {
    console.error('Erro ao atualizar produto:', error)

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

export async function DELETE(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params

    await prisma.marketplaceProduct.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Produto removido com sucesso.',
    })
  } catch (error: any) {
    console.error('Erro ao excluir produto:', error)

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