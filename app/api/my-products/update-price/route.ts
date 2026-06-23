import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const product =
      await prisma.resellerProduct.update({
        where: {
          id: body.id,
        },
        data: {
          customPrice: Number(
            body.customPrice
          ),
        },
      })

    return NextResponse.json({
      success: true,
      product,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    )
  }
}

