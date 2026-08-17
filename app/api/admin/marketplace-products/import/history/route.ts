import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const history =
      await prisma.marketplaceImportHistory.findMany({
        include: {
          supplier: {
            select: {
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

      history,
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
