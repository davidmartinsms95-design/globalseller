import { NextRequest, NextResponse } from 'next/server'

import {
  marketplaceManager,
} from '@/lib/marketplaces/manager'

export async function POST(
  request: NextRequest
) {
  try {
    const { productId, status } =
      await request.json()

    if (
      !productId ||
      !['active', 'paused', 'closed'].includes(
        status
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Dados inválidos.',
        },
        {
          status: 400,
        }
      )
    }

    const provider =
  marketplaceManager.getProvider(
    'mercadolivre',
  )

await provider.updateStatus(
  productId,
  status,
)

    return NextResponse.json({
      success: true,
      message:
        'Status atualizado com sucesso.',
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Erro ao atualizar status.',
      },
      {
        status: 500,
      }
    )
  }
}