export function validateProduct(product: any) {
  const errors: string[] = []

  if (!product.title) {
    errors.push('Título obrigatório.')
  }

  if (!product.price || product.price <= 0) {
    errors.push('Preço inválido.')
  }

  if (!product.stock || product.stock < 1) {
    errors.push('Estoque inválido.')
  }

  if (!product.image) {
    errors.push('Imagem obrigatória.')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}