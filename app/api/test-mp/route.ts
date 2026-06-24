import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hasToken: !!process.env.MERCADO_PAGO_ACCESS_TOKEN,
    startsWithAppUsr:
      process.env.MERCADO_PAGO_ACCESS_TOKEN?.startsWith(
        'APP_USR'
      ) || false,
    tokenLength:
      process.env.MERCADO_PAGO_ACCESS_TOKEN?.length || 0,
  })
}