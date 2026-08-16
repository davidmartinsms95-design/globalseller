import { NextRequest, NextResponse } from 'next/server'

import { getCurrentUser } from '@/lib/getCurrentUser'
import prisma from '@/lib/prisma'

import {
  importMarketplaceProducts,
} from '@/lib/services/import/importer.service'
import {
  parseCsv,
} from '@/lib/services/import/csvImporter'

export async function POST(
  req: NextRequest
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

    const formData =
      await req.formData()

    const supplierId =
      formData.get('supplierId')

    const file =
      formData.get('file')

    if (
      typeof supplierId !== 'string' ||
      !supplierId
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Fornecedor não informado.',
        },
        {
          status: 400,
        }
      )
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Arquivo CSV não informado.',
        },
        {
          status: 400,
        }
      )
    }

    const supplier =
      await prisma.supplier.findUnique({
        where: {
          id: supplierId,
        },
      })

    if (!supplier) {
      return NextResponse.json(
        {
          success: false,
          error: 'Fornecedor não encontrado.',
        },
        {
          status: 404,
        }
      )
    }

    const products =
      await parseCsv(file)

    const result =
      await importMarketplaceProducts(
        supplierId,
        file.name,
        products
      )

    return NextResponse.json(
      result
    )
  } catch (error) {
    console.error(
      'Erro ao importar catálogo:',
      error
    )

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Erro interno ao importar catálogo.',
      },
      {
        status: 500,
      }
    )
  }
}
