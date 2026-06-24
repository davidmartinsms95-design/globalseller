import { NextResponse } from 'next/server'

export async function GET() {
  const token =
    process.env.MERCADO_PAGO_ACCESS_TOKEN || ''

  return NextResponse.json({
    hasToken: !!token,
    first10: token.substring(0, 10),
    length: token.length,
  })
}