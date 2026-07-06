export function buildAttributes(
  attributes: any[],
  product: any
) {
  return attributes.map(
    (attribute: any) => {
      const name =
        attribute.name.toLowerCase()

      let value = ''

      if (name.includes('marca')) {
        value = 'Sem Marca'
      }

      if (name.includes('modelo')) {
        value = product.title
      }

      if (name.includes('cor')) {
        value = 'Preto'
      }

      if (name.includes('material')) {
        value = 'Tecido'
      }

      return {
        id: attribute.id,

        value_name: value,
      }
    }
  )
}