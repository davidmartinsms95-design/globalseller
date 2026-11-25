import type { ProductWithRelations } from '../shared/intelligence.types'

interface DraftProduct {
  title: string
  description?: string
  shortDescription?: string

  category?: string
  image?: string

  price: number
  costPrice?: number

  stock?: number

  brand?: string
  model?: string

  sku?: string
  ean?: string

  weight?: number
  height?: number
  width?: number
  length?: number
}

export function buildDraftProduct(
  product: DraftProduct,
): ProductWithRelations {
  return {
    id: 'draft',

    title: product.title,

    description: product.description ?? '',

    shortDescription:
      product.shortDescription ?? '',

    category:
      product.category ?? '',

    image:
      product.image ?? null,

    price:
      product.price,

    costPrice:
      product.costPrice ?? 0,

    stock:
      product.stock ?? 0,

    brand:
      product.brand ?? '',

    model:
      product.model ?? '',

    sku:
      product.sku ?? '',

    ean:
      product.ean ?? '',

    weight:
      product.weight ?? 0,

    height:
      product.height ?? 0,

    width:
      product.width ?? 0,

    length:
      product.length ?? 0,

    createdAt: new Date(),

    updatedAt: new Date(),

    userId: 'draft',

    marketplace: 'mercadolivre',

    marketplaceId: null,

    permalink: null,

    status: 'draft',

    mlCategoryId: null,

    marketplaceAttributes: null,

    resellerProductId: null,

    removedFromCatalog: false,

    resellerProduct: null,

    orders: [],
  } as ProductWithRelations
}