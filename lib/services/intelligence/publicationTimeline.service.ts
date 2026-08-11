import {
  LOW_STOCK_THRESHOLD,
} from '@/lib/services/intelligence/shared/intelligence.constants'
import { prisma } from '@/lib/prisma'

import type {
  OrderWithRelations,
  ProductWithOrders,
  PublicationTimelineEvent,
} from '@/lib/services/intelligence/shared/intelligence.types'

export interface PublicationTimelineInput {
  userId: string

  productId?: string
}

export interface PublicationTimelineResult {
  events: PublicationTimelineEvent[]

  totalEvents: number
}

export class PublicationTimelineService {
  public async execute({
    userId,
    productId,
  }: PublicationTimelineInput): Promise<PublicationTimelineResult> {
    const products = await prisma.product.findMany({
      where: {
        userId,
        ...(productId
          ? {
              id: productId,
            }
          : {}),
      },

      include: {
        resellerProduct: {
          include: {
            marketplaceProduct: {
              include: {
                supplier: true,
              },
            },
          },
        },

        orders: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },

      orderBy: {
        createdAt: 'asc',
      },
    })

    const events: PublicationTimelineEvent[] = []

    for (const product of products) {
      events.push(
        ...this.buildProductTimeline(product),
      )
    }

    events.sort(
      (a, b) =>
        b.date.getTime() -
        a.date.getTime(),
    )

    return {
      events,

      totalEvents: events.length,
    }
  }
    private buildProductTimeline(
    product: ProductWithOrders,
  ): PublicationTimelineEvent[] {
    const events: PublicationTimelineEvent[] = []

    events.push({
      id: `${product.id}-created`,

      type: 'created',

      title: 'Produto criado',

      description:
        'O produto foi cadastrado no GlobalSeller.',

      date: product.createdAt,

      marketplace: product.marketplace,
    })

    if (product.marketplaceId) {
      events.push({
        id: `${product.id}-published`,

        type: 'published',

        title: 'Produto publicado',

        description:
          'O anúncio foi publicado no marketplace.',

        date: product.createdAt,

        marketplace: product.marketplace,

        metadata: {
          marketplaceId: product.marketplaceId,

          permalink: product.permalink,
        },
      })
    }

    if (product.status) {
      events.push({
        id: `${product.id}-status`,

        type:
          product.status === 'paused'
            ? 'paused'
            : product.status === 'active'
            ? 'reactivated'
            : 'updated',

        title: 'Status atualizado',

        description: `Status atual: ${product.status}.`,

        date: product.createdAt,

        marketplace: product.marketplace,

        metadata: {
          status: product.status,
        },
      })
    }

    if (product.marketplaceId) {
      events.push({
        id: `${product.id}-sync`,

        type: 'synchronized',

        title: 'Marketplace sincronizado',

        description:
          'O produto está sincronizado com o marketplace.',

        date: product.createdAt,

        marketplace: product.marketplace,

        metadata: {
          marketplaceId: product.marketplaceId,
        },
      })
    }

    events.push(
  ...this.buildOrderEvents(product),
)

events.push(
  ...this.buildInventoryEvents(product),
)

events.push(
  ...this.buildPriceEvents(product),
)

events.push(
  ...this.buildRecommendationEvents(
    product,
  ),
)

return events
  }

  private buildOrderEvents(
    product: ProductWithOrders,
  ): PublicationTimelineEvent[] {
    const events: PublicationTimelineEvent[] = []

    for (const order of product.orders) {
      events.push({
        id: `${order.id}-sale`,

        type: 'sold',

        title: 'Venda realizada',

        description:
          `${order.quantity} unidade(s) vendida(s).`,

        date: order.createdAt,

        marketplace: order.marketplace,

        metadata: {
          orderId: order.id,

          quantity: order.quantity,

          amount: order.amount,

          buyerName: order.buyerName,

          status: order.status,
        },
      })
    }

    return events
  }
    private buildInventoryEvents(
    product: ProductWithOrders,
  ): PublicationTimelineEvent[] {
    const events: PublicationTimelineEvent[] = []

    events.push({
      id: `${product.id}-inventory`,

      type: 'stock_changed',

      title: 'Estoque atual',

      description:
        `O produto possui ${product.stock} unidade(s) em estoque.`,

      date: product.createdAt,

      marketplace: product.marketplace,

      metadata: {
        stock: product.stock,
      },
    })

    return events
  }

  private buildPriceEvents(
    product: ProductWithOrders,
  ): PublicationTimelineEvent[] {
    const events: PublicationTimelineEvent[] = []

    const marketplaceProduct =
      product.resellerProduct?.marketplaceProduct

    if (!marketplaceProduct) {
      return events
    }

    events.push({
      id: `${product.id}-price`,

      type: 'price_changed',

      title: 'Preço analisado',

      description:
        `Preço atual: R$ ${product.price.toFixed(2)}.`,

      date: product.createdAt,

      marketplace: product.marketplace,

      metadata: {
        price: product.price,
        suggestedPrice:
          marketplaceProduct.suggestedPrice,
        costPrice:
          marketplaceProduct.costPrice,
      },
    })

    return events
  }

  private buildRecommendationEvents(
    product: ProductWithOrders,
  ): PublicationTimelineEvent[] {
    const events: PublicationTimelineEvent[] = []

    const marketplaceProduct =
      product.resellerProduct?.marketplaceProduct

    if (!marketplaceProduct) {
      return events
    }

    if (
      product.price <
      marketplaceProduct.suggestedPrice
    ) {
      events.push({
        id: `${product.id}-recommendation-price`,

        type: 'recommendation',

        title: 'Recomendação de preço',

        description:
          'A IA identificou oportunidade de melhorar a margem de lucro.',

        date: new Date(),

        marketplace: product.marketplace,

        metadata: {
          currentPrice: product.price,
          suggestedPrice:
            marketplaceProduct.suggestedPrice,
        },
      })
    }

    if (product.stock <= LOW_STOCK_THRESHOLD) {
      events.push({
        id: `${product.id}-recommendation-stock`,

        type: 'recommendation',

        title: 'Recomendação de estoque',

        description:
          'O estoque está baixo e pode comprometer futuras vendas.',

        date: new Date(),

        marketplace: product.marketplace,

        metadata: {
          stock: product.stock,
        },
      })
    }

    return events
  }
    public async getTimeline(
    input: PublicationTimelineInput,
  ): Promise<PublicationTimelineEvent[]> {
    const result = await this.execute(input)

    return result.events
  }

  public async getProductTimeline(
    userId: string,
    productId: string,
  ): Promise<PublicationTimelineEvent[]> {
    const result = await this.execute({
      userId,
      productId,
    })

    return result.events
  }

  public async getLatestEvents(
    input: PublicationTimelineInput,
    limit = 20,
  ): Promise<PublicationTimelineEvent[]> {
    const events =
      await this.getTimeline(input)

    return events.slice(0, limit)
  }
}

export const publicationTimelineService =
  new PublicationTimelineService()