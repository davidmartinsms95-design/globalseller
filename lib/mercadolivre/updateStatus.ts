import prisma from '@/lib/prisma'

export async function updateMercadoLivreStatus(
  productId: string,
  status: 'active' | 'paused' | 'closed'
) {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      user: {
        include: {
          integrations: true,
        },
      },
    },
  })

  if (!product) {
    throw new Error('Produto não encontrado.')
  }

  if (!product.marketplaceId) {
    throw new Error(
      'Produto ainda não foi publicado.'
    )
  }

  const integration =
    product.user.integrations.find(
      (item) =>
        item.provider === 'mercadolivre'
    )

  if (!integration?.accessToken) {
    throw new Error(
      'Mercado Livre não conectado.'
    )
  }

  const response = await fetch(
    `https://api.mercadolibre.com/items/${product.marketplaceId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${integration.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
      }),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ??
        'Erro ao atualizar status.'
    )
  }

  await prisma.product.update({
    where: {
      id: product.id,
    },
    data: {
      status,
    },
  })

  return data
}