export function getProductDiagnosis(
  product: any
) {
  const suggestions: string[] = []

  if (
    !product.title ||
    product.title.length < 30
  ) {
    suggestions.push(
      'Melhore o título do produto.'
    )
  }

  if (
    !product.description ||
    product.description.length < 100
  ) {
    suggestions.push(
      'Adicione uma descrição mais completa.'
    )
  }

  if (!product.image) {
    suggestions.push(
      'Adicione uma imagem principal.'
    )
  }

  if (product.price <= 0) {
    suggestions.push(
      'Informe um preço válido.'
    )
  }

  if (product.stock <= 0) {
    suggestions.push(
      'Informe um estoque disponível.'
    )
  }

  if (!product.mlCategoryId) {
    suggestions.push(
      'Escolha uma categoria.'
    )
  }

  return suggestions
}