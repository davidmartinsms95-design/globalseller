import prisma from '../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const count = await prisma.user.count()

    return NextResponse.json({
      ok: true,
      count,
    })
  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      error: error.message,
    })
  }
}