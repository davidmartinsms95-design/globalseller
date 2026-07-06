import prisma from './prisma'
import { publishOnMercadoLivre } from '@/lib/mercadolivre/publishProduct'

export async function publishProduct(
  userId: string,
  productId: string
) {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  })

  if (!product) {
    throw new Error('Produto não encontrado')
  }

  const integrations =
    await prisma.integration.findMany({
      where: {
        userId,
      },
    })

  const result = {
    mercadolivre: false,
    shopee: false,
    messages: [] as string[],
  }

  /*
    Mercado Livre
  */

  if (
  integrations.some(
    (i) => i.provider === 'mercadolivre'
  )
) {
  await publishOnMercadoLivre(
    userId,
    productId
  )

  result.mercadolivre = true

  result.messages.push(
    'Produto enviado para o serviço do Mercado Livre.'
  )
}

  /*
    Shopee
  */

  if (
    integrations.some(
      (i) => i.provider === 'shopee'
    )
  ) {
    result.shopee = true

    result.messages.push(
      'Shopee preparada para publicação.'
    )
  }

  return result
}