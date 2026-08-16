import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/getCurrentUser'

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
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Não autorizado',
        },
        {
          status: 401,
        }
      )
    }

    if (user.role !== 'admin') {
      return NextResponse.json(
        {
          success: false,
          error: 'Acesso negado',
        },
        {
          status: 403,
        }
      )
    }

    const { id } = await params
    const body = await req.json()

    const product =
      await prisma.marketplaceProduct.update({
        where: {
          id,
        },
        data: {
          title: body.title,
          description: body.description,
          costPrice: Number(body.costPrice),
          suggestedPrice: Number(
            body.suggestedPrice
          ),
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
  } catch (error) {
    console.error(
      'Erro ao atualizar produto:',
      error
    )

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Erro interno',
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
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Não autorizado',
        },
        {
          status: 401,
        }
      )
    }

    if (user.role !== 'admin') {
      return NextResponse.json(
        {
          success: false,
          error: 'Acesso negado',
        },
        {
          status: 403,
        }
      )
    }

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
  } catch (error) {
    console.error(
      'Erro ao excluir produto:',
      error
    )

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Erro interno',
      },
      {
        status: 500,
      }
    )
  }
}