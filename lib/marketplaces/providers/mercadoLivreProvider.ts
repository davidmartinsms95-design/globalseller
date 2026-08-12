import type {
  MarketplaceOrder,
  MarketplaceProduct,
  MarketplaceProvider,
} from '../provider'

import prisma from '@/lib/prisma'

import {
  mercadoLivreClient,
} from '@/lib/mercadolivre/mercadoLivreClient'

export class MercadoLivreProvider
  implements MarketplaceProvider
{

async getProducts(
  userId: string,
): Promise<MarketplaceProduct[]> {
  const integration =
    await prisma.integration.findUnique({
      where: {
        provider_userId: {
          provider: 'mercadolivre',
          userId,
        },
      },
    })

  if (!integration?.externalUserId) {
    throw new Error(
      'Mercado Livre não conectado.',
    )
  }

  const data =
    await mercadoLivreClient.get(
      userId,
      `/users/${integration.externalUserId}/items/search`,
    )

  const itemIds =
    data.results ?? []

  const products =
  (
    await Promise.all(
      itemIds.map(
        async (
          itemId: string,
        ) => {
          try {
            return await mercadoLivreClient.get(
              userId,
              `/items/${itemId}`,
            )
          } catch (error) {
            console.error(
              '[ML PRODUCT]',
              itemId,
              error,
            )

            return null
          }
        },
      ),
    )
  ).filter(
    (
      item,
    ): item is NonNullable<
      typeof item
    > => item !== null,
  )

  return products.map(
    (item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      stock:
        item.available_quantity,
      status: item.status,
      image:
        item.thumbnail,
      permalink:
        item.permalink,
    }),
  )
}

  async getOrders(
  userId: string,
): Promise<MarketplaceOrder[]> {
  const integration =
    await prisma.integration.findUnique({
      where: {
        provider_userId: {
          provider: 'mercadolivre',
          userId,
        },
      },
    })

  if (!integration?.externalUserId) {
    throw new Error(
      'Mercado Livre não conectado.',
    )
  }

  const data =
    await mercadoLivreClient.get(
      userId,
      `/orders/search?seller=${integration.externalUserId}`,
    )

  return (data.results ?? []).map(
  (order: any) => ({
    id: String(order.id),

    status:
      order.status,

    total:
      Number(
        order.total_amount ?? 0,
      ),

    createdAt:
      order.date_created,

    marketplaceProductId:
      order.order_items?.[0]?.item?.id
        ? String(
            order.order_items[0].item.id,
          )
        : null,

    buyerName:
      order.buyer?.nickname ??
      order.buyer?.first_name ??
      null,

    customerEmail:
      order.buyer?.email ??
      null,

    shippingStatus:
      order.shipping?.status ??
      'pending',

    quantity:
      order.order_items?.[0]?.quantity ??
      1,
  }),
)
}

  async getCategories(
    userId: string,
    query: string,
  ): Promise<unknown> {
    return mercadoLivreClient.get(
      userId,
      '/sites/MLB/domain_discovery/search',
      {
        limit: 10,
        q: query,
      },
    )
  }

  async updatePrice(): Promise<void> {
    throw new Error(
      'Not implemented.',
    )
  }

  async updateStock(): Promise<void> {
    throw new Error(
      'Not implemented.',
    )
  }

  async updateStatus(): Promise<void> {
    throw new Error(
      'Not implemented.',
    )
  }
}