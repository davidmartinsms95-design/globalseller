import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

interface Params {
  params: {
    id: string
  }
}

export async function DELETE(
  req: Request,
  { params }: Params
) {
  try {
    await prisma.product.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({
      message: 'Produto deletado',
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Erro ao deletar produto',
      },
      {
        status: 500,
      }
    )
  }
}