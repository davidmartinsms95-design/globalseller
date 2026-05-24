import { NextResponse } from 'next/server'
import cloudinary from '../../lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const uploadResponse =
      await cloudinary.uploader.upload(
        body.image,
        {
          folder: 'globalseller',
        }
      )

    return NextResponse.json({
      url: uploadResponse.secure_url,
    })
  } catch (error) {
    console.log(error)

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