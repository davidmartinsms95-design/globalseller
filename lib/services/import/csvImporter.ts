import Papa from 'papaparse'

import {
  ImportedMarketplaceProduct,
} from './importer.types'

export async function parseCsv(
  file: File
): Promise<ImportedMarketplaceProduct[]> {
  const csv = await file.text()

  return new Promise((resolve, reject) => {
    Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,

      complete(results) {
        const products: ImportedMarketplaceProduct[] =
          (results.data as any[]).map((row) => ({
            title: row.title?.trim() ?? '',

            description:
              row.description?.trim() ?? '',

            costPrice: Number(
              row.costPrice ?? 0
            ),

            suggestedPrice: Number(
              row.suggestedPrice ?? 0
            ),

            stock: Number(
              row.stock ?? 0
            ),

            image: row.image?.trim(),

            brand: row.brand?.trim(),

            sku: row.sku?.trim(),

            ean: row.ean?.trim(),

            categoryId:
              row.categoryId?.trim(),

            categoryName:
              row.categoryName?.trim(),

            listingType:
              row.listingType?.trim() ??
              'gold_special',
          }))
          .filter(
            (product) =>
              product.title.length > 0
          )

        resolve(products)
      },

      error(error: Error) {
  reject(error)
},
    })
  })
}