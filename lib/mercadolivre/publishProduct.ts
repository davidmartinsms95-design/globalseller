import prisma from '@/lib/prisma'

import { findCategory } from './findCategory'
import { getCategoryAttributes } from './getCategoryAttributes'
import { buildAttributes } from './buildAttributes'
import { validateProduct } from './validateProduct'

import { createSystemLog } from '@/lib/systemLog'

export async function publishOnMercadoLivre(
  userId: string,
  productId: string
) {
  const integration =
    await prisma.integration.findFirst({
      where: {
        userId,
        provider: 'mercadolivre',
      },
    })

  if (!integration) {
    throw new Error(
      'Mercado Livre não conectado'
    )
  }

  const product =
    await prisma.product.findUnique({
      where: {
        id: productId,
      },
    })

  if (!product) {
    throw new Error(
      'Produto não encontrado'
    )
  }

  await createSystemLog({
  service: 'Mercado Livre',
  event: 'Publicação iniciada',
  status: 'info',
  message: `Iniciando publicação do produto ${product.title}.`,
  payload: {
    productId: product.id,
    userId,
  },
})

  const validation =
    validateProduct(product)

  if (!validation.valid) {
    return {
      success: false,
      errors: validation.errors,
    }
  }

  const category =
    await findCategory(
      product.title,
      integration.accessToken!
    )

  const categoryId =
    category?.category_id ??
    product.mlCategoryId ??
    'MLB3530'

  console.log(
    'Categoria encontrada:',
    category
  )

  const attributes =
    await getCategoryAttributes(
      categoryId,
      integration.accessToken!
    )

  console.log(
    'ATRIBUTOS DA CATEGORIA'
  )

  console.log(attributes)

  const mlAttributes =
    buildAttributes(
      attributes,
      product
    )

  const payload = {
    title: product.title,

    category_id: categoryId,

    price: product.price,

    currency_id: 'BRL',

    available_quantity:
      product.stock,

    buying_mode: 'buy_it_now',

    condition: 'new',

    listing_type_id:
      'gold_special',

    sale_terms: [],

    pictures: product.image
      ? [
          {
            source: product.image,
          },
        ]
      : [],

    attributes: mlAttributes,
  }

  console.log(
    'PAYLOAD MERCADO LIVRE'
  )

  console.log(
    JSON.stringify(
      payload,
      null,
      2
    )
  )

  const response = await fetch(
    'https://api.mercadolibre.com/items',
    {
      method: 'POST',

      headers: {
        Authorization: `Bearer ${integration.accessToken}`,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(payload),
    }
  )

  const data = await response.json()

  console.log(
    'RESPOSTA MERCADO LIVRE'
  )

  console.log(data)

  if (!response.ok) {
  await createSystemLog({
    service: 'Mercado Livre',
    event: 'Erro na publicação',
    status: 'error',
    message: 'Falha ao publicar produto no Mercado Livre.',
    payload: data,
  })

  return {
    success: false,
    error: data,
  }
}

  await prisma.product.update({
    where: {
      id: product.id,
    },
    data: {
      marketplaceId: data.id,
      permalink: data.permalink,
      status: data.status,
      mlCategoryId: categoryId,
    },
  })

  await createSystemLog({
  service: 'Mercado Livre',
  event: 'Produto publicado',
  status: 'success',
  message: `Produto ${product.title} publicado com sucesso.`,
  payload: {
    productId: product.id,
    marketplaceId: data.id,
    permalink: data.permalink,
    status: data.status,
  },
})

  return {
    success: true,
    marketplaceId: data.id,
    permalink: data.permalink,
    status: data.status,
  }
}