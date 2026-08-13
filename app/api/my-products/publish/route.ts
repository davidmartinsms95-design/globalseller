import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '../../../../lib/auth'

import {
  marketplaceManager,
} from '@/lib/marketplaces/manager'

export async function POST(req: Request) {
  try {
    const session =
      await getServerSession(authOptions)

    if (!session?.user?.email) {
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

    const body = await req.json()

    const {
      resellerProductId,
    } = body

    if (!resellerProductId) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Produto não informado.',
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

    const result =
      await provider.publishResellerProduct(
        session.user.id,
        resellerProductId,
      )

    if (
      typeof result === 'object' &&
      result !== null &&
      'success' in result &&
      result.success === false
    ) {
      return NextResponse.json(
        result,
        {
          status: 500,
        }
      )
    }

    return NextResponse.json({
      success: true,
      response: result,
    })
  } catch (error) {
    console.error(
      '[MY PRODUCTS PUBLISH]',
      error,
    )

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      {
        status: 500,
      }
    )
  }
}
