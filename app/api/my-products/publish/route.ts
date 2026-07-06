import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../lib/auth'

export async function POST(req: Request) {
  try {
    const session =
      await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          error: 'Não autorizado',
        },
        {
          status: 401,
        }
      )
    }

    const user =
      await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
        include: {
          integrations: true,
        },
      })

    if (!user) {
      return NextResponse.json(
        {
          error: 'Usuário não encontrado',
        },
        {
          status: 404,
        }
      )
    }

    const integration =
      user.integrations.find(
        (item) =>
          item.provider ===
          'mercadolivre'
      )

    if (!integration) {
      return NextResponse.json(
        {
          error:
            'Mercado Livre não conectado',
        },
        {
          status: 404,
        }
      )
    }

    const body = await req.json()

    const {
      resellerProductId,
    } = body

    const resellerProduct =
      await prisma.resellerProduct.findUnique(
        {
          where: {
            id: resellerProductId,
          },
          include: {
            marketplaceProduct: true,
          },
        }
      )

    if (!resellerProduct) {
      return NextResponse.json(
        {
          error:
            'Produto não encontrado',
        },
        {
          status: 404,
        }
      )
    }

    const mp =
      resellerProduct.marketplaceProduct

    const payload = {
      title: mp.title,

      category_id:
  mp.categoryId ?? 'MLB31039',

      price:
        resellerProduct.customPrice ??
        mp.suggestedPrice,

      currency_id: 'BRL',

      available_quantity:
        mp.stock > 0 ? mp.stock : 1,

      buying_mode: 'buy_it_now',

      

      listing_type_id:
  mp.listingType ?? 'gold_special',

      pictures: mp.image
        ? [
            {
       condition: 'new',       source: mp.image,
            },
          ]
        : [],

      attributes: [
        {
  id: 'BRAND',
  value_name:
    mp.brand ?? 'Sem Marca',
},
        {
          id: 'SHAPE',
          value_id: '1180866',
        },
      ],
    }

    const response = await fetch(
      'https://api.mercadolibre.com/items',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${integration.accessToken}`,
          'Content-Type':
            'application/json',
        },
        body: JSON.stringify(
          payload
        ),
      }
    )
const data = await response.json()
if (response.ok && mp.description) {
  await fetch(
    `https://api.mercadolibre.com/items/${data.id}/description`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${integration.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plain_text: mp.description,
      }),
    }
  )
}

console.log(
  'RESPOSTA ML:',
  JSON.stringify(data, null, 2)
)
    if (response.ok) {
  await prisma.product.create({
  data: {
    title: mp.title,
    price: resellerProduct.customPrice ?? mp.suggestedPrice,
    image: mp.image,
    stock: mp.stock,

    userId: user.id,

    resellerProductId: resellerProduct.id,

    marketplaceId: data.id,
    permalink: data.permalink,
    status: data.status,

    marketplace: 'mercadolivre',
    category: 'Mercado Livre',
  },
})
}

    return NextResponse.json({
      success: response.ok,
      response: data,
    })
  } catch (error: any) {
    console.error(error)

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

