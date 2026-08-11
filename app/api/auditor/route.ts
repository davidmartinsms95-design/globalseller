import { NextResponse } from 'next/server'

import { executeAudit } from '@/lib/auditor/auditor.service'

export async function GET() {
  try {
    const result = executeAudit(process.cwd())

    return NextResponse.json(result)
  } catch (error) {
    console.error('Auditor execution failed:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Falha ao executar a auditoria.',
      },
      {
        status: 500,
      },
    )
  }
}