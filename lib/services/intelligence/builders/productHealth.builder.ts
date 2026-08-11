export function buildProductHealth(
  positivePoints: string[],
  negativePoints: string[],
  recommendations: string[],
) {
  return {
    strengths: positivePoints,

    warnings: negativePoints,

    suggestions: recommendations,
  }
}