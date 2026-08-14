import { mercadoLivreRequest } from './api'

export async function getCategoryAttributes(
  categoryId: string,
  accessToken: string,
) {
  const attributes = await mercadoLivreRequest(
    `/categories/${categoryId}/attributes`,
    accessToken,
  )

  return (attributes as any[]).filter(
    (attribute) => attribute.tags?.required === true,
  )
}