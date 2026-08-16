import prisma from '@/lib/prisma'

import {
  ImportedMarketplaceProduct,
  ImportResult,
} from './importer.types'

export async function importMarketplaceProducts(
  supplierId: string,
  fileName: string,
  products: ImportedMarketplaceProduct[]
): Promise<ImportResult> {
  const startedAt = Date.now()

  const errors: string[] = []

  let imported = 0

  let duplicates = 0

  for (const product of products) {
    try {
      let existing = null

      if (product.sku) {
        existing =
          await prisma.marketplaceProduct.findFirst({
            where: {
              supplierId,
              sku: product.sku,
            },
          })
      } else {
        existing =
          await prisma.marketplaceProduct.findFirst({
            where: {
              supplierId,
              title: product.title,
            },
          })
      }

      if (existing) {
        duplicates++

        continue
      }

      await prisma.marketplaceProduct.create({
        data: {
          title: product.title,

          description:
            product.description,

          costPrice:
            product.costPrice,

          suggestedPrice:
            product.suggestedPrice,

          stock: product.stock,

          image: product.image,

          supplierId,

          brand: product.brand,

          sku: product.sku,

          ean: product.ean,

          categoryId:
            product.categoryId,

          categoryName:
            product.categoryName,

          listingType:
            product.listingType,
        },
      })

      imported++
    } catch (error) {
      console.error(error)

      errors.push(product.title)
    }
  }

  const duration =
  Date.now() - startedAt

await prisma.marketplaceImportHistory.create({
  data: {
    supplierId,

    fileName,

    total: products.length,

    imported,

    duplicates,

    errors: errors.length,

    duration,
  },
})

  return {
    success: errors.length === 0,

    total: products.length,

    imported,

    duplicates,

    duration,

    errors,
  }
}