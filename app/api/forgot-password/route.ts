import { NextResponse } from 'next/server'
import crypto from 'crypto'

import prisma from '../../../lib/prisma'
import { resend } from '../../../lib/resend'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    })

    if (!user) {
      return NextResponse.json({
        success: true,
      })
    }

    const token = crypto.randomUUID()

    const resetLink = `https://globalseller.vercel.app/reset-password/${token}`

    if (resend) {
      await resend.emails.send({
        from: 'GlobalSeller <onboarding@resend.dev>',
        to: user.email,
        subject: 'Recuperação de senha 🔐',
        html: `
          <div style="background:#09090b;padding:40px;font-family:Arial;color:white">
            <div style="max-width:600px;margin:auto;background:#18181b;padding:40px;border-radius:24px">
              <h1 style="color:#f97316;font-size:40px">
                Recuperação de senha
              </h1>

              <p style="color:#a1a1aa;font-size:18px;line-height:30px">
                Recebemos uma solicitação para redefinir sua senha.
              </p>

              <a
                href="${resetLink}"
                style="
                  display:inline-block;
                  background:#f97316;
                  color:white;
                  padding:18px 32px;
                  border-radius:16px;
                  text-decoration:none;
                  font-weight:bold;
                  margin-top:20px;
                "
              >
                Redefinir senha
              </a>

              <p style="margin-top:40px;color:#71717a">
                Caso você não tenha solicitado,
                ignore este email.
              </p>
            </div>
          </div>
        `,
      })
    } else {
      console.log('Resend desativado')
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        error: 'Erro recuperação senha',
      },
      {
        status: 500,
      }
    )
  }
}

