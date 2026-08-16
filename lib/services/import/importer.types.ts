export interface ImportedMarketplaceProduct {
  title: string
  description?: string
  costPrice: number
  suggestedPrice: number
  stock: number
  image?: string
  brand?: string
  sku?: string
  ean?: string
  categoryId?: string
  categoryName?: string
  listingType?: string
}

export interface ImportResult {
  success: boolean

  total: number

  imported: number

  duplicates: number

  duration: number

  errors: string[]
}