import {
  mercadoLivreRequest,
} from './api'

import {
  getValidAccessToken,
} from './getValidAccessToken'

export const mercadoLivreClient = {
  async get(
    userId: string,
    endpoint: string,
    query?: Record<
      string,
      string | number | boolean
    >,
  ) {
    const accessToken =
      await getValidAccessToken(userId)

    return mercadoLivreRequest(
      endpoint,
      accessToken,
      {
        query,
      },
    )
  },

  async post(
    userId: string,
    endpoint: string,
    body: unknown,
  ) {
    const accessToken =
      await getValidAccessToken(userId)

    return mercadoLivreRequest(
      endpoint,
      accessToken,
      {
        method: 'POST',
        body,
      },
    )
  },

  async put(
    userId: string,
    endpoint: string,
    body: unknown,
  ) {
    const accessToken =
      await getValidAccessToken(userId)

    return mercadoLivreRequest(
      endpoint,
      accessToken,
      {
        method: 'PUT',
        body,
      },
    )
  },

  async delete(
    userId: string,
    endpoint: string,
  ) {
    const accessToken =
      await getValidAccessToken(userId)

    return mercadoLivreRequest(
      endpoint,
      accessToken,
      {
        method: 'DELETE',
      },
    )
  },
}