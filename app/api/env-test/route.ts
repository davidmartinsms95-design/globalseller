import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    DATABASE_URL:
      !!process.env.DATABASE_URL,

    DATABASE_URL_UNPOOLED:
      !!process.env.DATABASE_URL_UNPOOLED,

    MERCADO_PAGO_ACCESS_TOKEN:
      !!process.env.MERCADO_PAGO_ACCESS_TOKEN,

    tokenLength:
      process.env.MERCADO_PAGO_ACCESS_TOKEN
        ?.length || 0,

    startsWithAppUsr:
      process.env.MERCADO_PAGO_ACCESS_TOKEN?.startsWith(
        'APP_USR'
      ) || false,
  })
}