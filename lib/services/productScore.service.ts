export function calculateProductScore(
  product: any
) {
  let score = 0

  if (product.title?.length >= 30) {
    score += 20
  }

  if (product.description?.length >= 100) {
    score += 20
  }

  if (product.image) {
    score += 15
  }

  if (product.price > 0) {
    score += 15
  }

  if (product.stock > 0) {
    score += 10
  }

  if (product.mlCategoryId) {
    score += 10
  }

  if (product.marketplaceId) {
    score += 10
  }

  return score
}