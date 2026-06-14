import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch(
      'https://api.mercadopago.com/v1/payment_methods',
      {
        headers: {
          Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
        },
      }
    )

    const data = await response.json()

    return NextResponse.json({
      status: response.status,
      total: Array.isArray(data)
        ? data.length
        : 0,
      data,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 500,
      }
    )
  }
}
