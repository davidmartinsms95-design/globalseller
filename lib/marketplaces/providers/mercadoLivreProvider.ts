import type {
  MarketplaceOrder,
  MarketplaceProduct,
  MarketplaceProvider,
} from '../provider'

import prisma from '@/lib/prisma'

import {
  mercadoLivreClient,
} from '@/lib/mercadolivre/mercadoLivreClient'

import { findCategory } from '@/lib/mercadolivre/findCategory'
import { getCategoryAttributes } from '@/lib/mercadolivre/getCategoryAttributes'
import { buildAttributes } from '@/lib/mercadolivre/buildAttributes'
import { validateProduct } from '@/lib/mercadolivre/validateProduct'
import { createSystemLog } from '@/lib/systemLog'
import { getValidAccessToken } from '@/lib/mercadolivre/getValidAccessToken'

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

    async publishProduct(
    userId: string,
    productId: string,
  ): Promise<unknown> {
    const integration =
      await prisma.integration.findFirst({
        where: {
          userId,
          provider: 'mercadolivre',
        },
      })

    if (!integration) {
      throw new Error(
        'Mercado Livre não conectado',
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
        'Produto não encontrado',
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

    const accessToken =
      await getValidAccessToken(userId)

    const category =
      await findCategory(
        product.title,
        accessToken,
      )

    const categoryId =
      category?.category_id ??
      product.mlCategoryId ??
      'MLB3530'

    console.log(
      'Categoria encontrada:',
      category,
    )

    const attributes =
      await getCategoryAttributes(
        categoryId,
        accessToken,
      )

    console.log(
      'ATRIBUTOS DA CATEGORIA',
    )

    console.log(attributes)

    const mlAttributes =
      buildAttributes(
        attributes,
        product,
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
      'PAYLOAD MERCADO LIVRE',
    )

    console.log(
      JSON.stringify(
        payload,
        null,
        2,
      ),
    )

    let data: any

    try {
      data =
        await mercadoLivreClient.post(
          userId,
          '/items',
          payload,
        )
    } catch (error) {
      await createSystemLog({
        service: 'Mercado Livre',
        event: 'Erro na publicação',
        status: 'error',
        message:
          'Falha ao publicar produto no Mercado Livre.',
        payload: {
          error: String(error),
        },
      })

      return {
        success: false,
        error,
      }
    }

    console.log(
      'RESPOSTA MERCADO LIVRE',
    )

    console.log(data)

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

    async publishResellerProduct(
    userId: string,
    resellerProductId: string,
  ): Promise<unknown> {
    const integration =
      await prisma.integration.findFirst({
        where: {
          userId,
          provider: 'mercadolivre',
        },
      })

    if (!integration) {
      throw new Error(
        'Mercado Livre não conectado',
      )
    }

    const resellerProduct =
  await prisma.resellerProduct.findFirst({
    where: {
      id: resellerProductId,
      resellerId: userId,
    },
    include: {
      marketplaceProduct: true,
    },
  })

    if (!resellerProduct) {
      throw new Error(
        'Produto não encontrado',
      )
    }

    const marketplaceProduct =
      resellerProduct.marketplaceProduct

    const price =
      resellerProduct.customPrice ??
      marketplaceProduct.suggestedPrice

    const payload = {
      title: marketplaceProduct.title,

      category_id:
        marketplaceProduct.categoryId ??
        'MLB31039',

      price,

      currency_id: 'BRL',

      available_quantity:
        marketplaceProduct.stock > 0
          ? marketplaceProduct.stock
          : 1,

      buying_mode: 'buy_it_now',

      listing_type_id:
        marketplaceProduct.listingType ??
        'gold_special',

      pictures:
        marketplaceProduct.image
          ? [
              {
                source:
                  marketplaceProduct.image,
              },
            ]
          : [],

      condition: 'new',

      attributes: [
        {
          id: 'BRAND',
          value_name:
            marketplaceProduct.brand ??
            'Sem Marca',
        },
        {
          id: 'SHAPE',
          value_id: '1180866',
        },
      ],
    }

    let data: any

    try {
      data =
        await mercadoLivreClient.post(
          userId,
          '/items',
          payload,
        )
    } catch (error) {
      console.error(
        '[ML RESELLER PUBLISH]',
        error,
      )

      return {
        success: false,
        error,
      }
    }

    if (marketplaceProduct.description) {
      try {
        await mercadoLivreClient.post(
          userId,
          `/items/${data.id}/description`,
          {
            plain_text:
              marketplaceProduct.description,
          },
        )
      } catch (error) {
        console.error(
          '[ML RESELLER DESCRIPTION]',
          error,
        )
      }
    }

    const product =
      await prisma.product.create({
        data: {
          title:
            marketplaceProduct.title,

          price,

          image:
            marketplaceProduct.image,

          stock:
            marketplaceProduct.stock,

          userId,

          resellerProductId:
            resellerProduct.id,

          marketplaceId:
            data.id,

          permalink:
            data.permalink,

          status:
            data.status,

          marketplace:
            'mercadolivre',
        },
      })

    return {
      success: true,
      productId: product.id,
      marketplaceId: data.id,
      permalink: data.permalink,
      status: data.status,
    }
  }
  async updatePrice(
    productId: string,
    price: number,
  ): Promise<void> {
    const product =
      await prisma.product.findUnique({
        where: {
          id: productId,
        },
      })

    if (!product) {
      throw new Error(
        'Produto não encontrado.',
      )
    }

    if (!product.marketplaceId) {
      throw new Error(
        'Produto ainda não foi publicado.',
      )
    }

    await mercadoLivreClient.put(
      product.userId,
      `/items/${product.marketplaceId}`,
      {
        price,
      },
    )
  }

  async updateStock(
    productId: string,
    quantity: number,
  ): Promise<void> {
    const product =
      await prisma.product.findUnique({
        where: {
          id: productId,
        },
      })

    if (!product) {
      throw new Error(
        'Produto não encontrado.',
      )
    }

    if (!product.marketplaceId) {
      throw new Error(
        'Produto não possui Marketplace ID.',
      )
    }

    await mercadoLivreClient.put(
      product.userId,
      `/items/${product.marketplaceId}`,
      {
        available_quantity:
          quantity,
      },
    )
  }

  async updateStatus(
    productId: string,
    status: 'active' | 'paused' | 'closed',
  ): Promise<void> {
    const product =
      await prisma.product.findUnique({
        where: {
          id: productId,
        },
      })

    if (!product) {
      throw new Error(
        'Produto não encontrado.',
      )
    }

    if (!product.marketplaceId) {
      throw new Error(
        'Produto ainda não foi publicado.',
      )
    }

    await mercadoLivreClient.put(
      product.userId,
      `/items/${product.marketplaceId}`,
      {
        status,
      },
    )

    await prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        status,
      },
    })
  }
}
