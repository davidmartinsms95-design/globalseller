export function generateDescription(
  product: any
) {
  return `
${product.title}

Características:

• Produto de alta qualidade

• Excelente acabamento

• Envio rápido

• Produto novo

• Garantia de satisfação

Descrição:

${product.description ?? ''}

GlobalSeller ERP
`
}