export interface MarketplaceCredentials {
  accessToken: string
  externalUserId: string
}

export interface MarketplaceRequestOptions {
  endpoint: string

  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'

  body?: unknown

  query?: Record<
    string,
    string | number | boolean
  >
}

export interface MarketplaceApiError {
  status: number
  message: string
}

export interface MarketplaceClient {
  get(
    options: MarketplaceRequestOptions
  ): Promise<unknown>

  post(
    options: MarketplaceRequestOptions
  ): Promise<unknown>

  put(
    options: MarketplaceRequestOptions
  ): Promise<unknown>

  delete(
    options: MarketplaceRequestOptions
  ): Promise<unknown>
}