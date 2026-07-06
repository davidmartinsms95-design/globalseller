import prisma from '@/lib/prisma'

export async function updateMercadoLivreStock(
  productId: string,
  quantity: number
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

  const integration =
    product.user.integrations.find(
      (item) => item.provider === 'mercadolivre'
    )

  if (!integration) {
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
      available_quantity: quantity,
    }),
  }
)

const data = await response.json()

if (!response.ok) {
  throw new Error(
    data.message ??
      'Erro ao atualizar estoque no Mercado Livre.'
  )
}

return data
}