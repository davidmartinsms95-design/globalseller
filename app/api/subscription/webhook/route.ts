import { NextResponse } from 'next/server'

import prisma from '../../../../../lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log(
      'WEBHOOK ASSINATURA:',
      body
    )

    /*
      Aqui futuramente vamos validar:
      - id pagamento
      - status approved
      - email usuário
    */

    const email =
      body.payer?.email ||
      body.data?.payer_email

    if (!email) {
      return NextResponse.json({
        success: false,
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return NextResponse.json({
        success: false,
      })
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        plan: 'pro',

        maxProducts: 999999,
      },
    })

    console.log(
      'USUÁRIO ATUALIZADO PARA PRO'
    )

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        error:
          'Erro webhook assinatura',
      },
      {
        status: 500,
      }
    )
  }
}