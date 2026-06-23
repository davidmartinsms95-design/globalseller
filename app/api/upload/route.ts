import { NextResponse } from 'next/server'
import cloudinary from '../../../lib/cloudinary'

export async function POST(req: Request) {
  try {
    console.log('UPLOAD START')

    const formData: any = await req.formData()

const file = formData.get('file') as File

    console.log('FILE:', file)

    if (!file) {
      return NextResponse.json(
        { error: 'Arquivo ausente' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()

    const buffer = Buffer.from(bytes)

    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

    console.log('ENVIANDO CLOUDINARY')

    const uploadResponse =
      await cloudinary.uploader.upload(base64, {
        folder: 'globalseller',
      })

    console.log('UPLOAD OK')

    return NextResponse.json({
      url: uploadResponse.secure_url,
    })
  } catch (error: any) {
    console.log('ERRO REAL:', error)

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    )
  }
}

