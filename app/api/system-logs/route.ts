import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const logs = await prisma.systemLog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 100,
    })

    return NextResponse.json(logs)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: 'Erro ao buscar logs.',
      },
      {
        status: 500,
      }
    )
  }
}