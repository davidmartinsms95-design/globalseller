import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const [
      processedJobs,
      failedJobs,
      onlineIntegrations,
    ] = await Promise.all([
      prisma.systemLog.count({
        where: {
          service: 'Worker',
          event: 'Job concluído',
        },
      }),

      prisma.systemLog.count({
        where: {
          status: 'error',
        },
      }),

      prisma.integration.count(),
    ])

    return NextResponse.json({
      processedJobs,
      pendingJobs: 0,
      failedJobs,
      onlineIntegrations,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          'Erro ao buscar estatísticas do Operations Center.',
      },
      {
        status: 500,
      }
    )
  }
}