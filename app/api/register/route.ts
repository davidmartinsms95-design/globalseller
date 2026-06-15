import { NextResponse } from 'next/server'

import prisma from '../../../lib/prisma'

import bcrypt from 'bcryptjs'

import { resend } from '../../../lib/resend'

import WelcomeEmail from '../../../emails/welcome-email'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const userExists =
      await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      })

    if (userExists) {
      return NextResponse.json(
        {
          error: 'Usuário já existe',
        },
        {
          status: 400,
        }
      )
    }

    const hashedPassword =
      await bcrypt.hash(body.password, 10)

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    })

    if (resend) {
  await resend.emails.send({
    from: 'GlobalSeller <onboarding@resend.dev>',

    to: user.email,

    subject:
      'Bem-vindo ao GlobalSeller 🚀',

    react: WelcomeEmail({
      name: user.name,
    }),
  })
} else {
  console.log('Resend desativado')
}

    return NextResponse.json(user)
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        error: 'Erro interno',
      },
      {
        status: 500,
      }
    )
  }
}