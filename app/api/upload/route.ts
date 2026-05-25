import { NextResponse } from 'next/server'
import cloudinary from '../../../lib/cloudinary'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'Arquivo não enviado' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()

    const buffer = Buffer.from(bytes)

    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

    const uploadResponse =
      await cloudinary.uploader.upload(base64, {
        folder: 'globalseller',
      })

    return NextResponse.json({
      url: uploadResponse.secure_url,
    })
  } catch (error) {
    console.log('UPLOAD ERROR:', error)

    return NextResponse.json(
      {
        error: 'Erro upload',
      },
      {
        status: 500,
      }
    )
  }
}