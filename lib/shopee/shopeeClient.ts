import {
  shopeeRequest,
} from './api'

export const shopeeClient = {
  get(
    options: Parameters<
      typeof shopeeRequest
    >[0],
  ) {
    return shopeeRequest({
      ...options,
      method: 'GET',
    })
  },

  post(
    options: Parameters<
      typeof shopeeRequest
    >[0],
  ) {
    return shopeeRequest({
      ...options,
      method: 'POST',
    })
  },
}