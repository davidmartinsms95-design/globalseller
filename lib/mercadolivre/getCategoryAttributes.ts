export async function getCategoryAttributes(
  categoryId: string,
  accessToken: string
) {
  const response = await fetch(
    `https://api.mercadolibre.com/categories/${categoryId}/attributes`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(
      'Erro ao buscar atributos da categoria'
    )
  }

  const attributes = await response.json()

  return attributes.filter(
    (attribute: any) =>
      attribute.tags?.required === true
  )
}