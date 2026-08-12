import {
  ensureResponseOk,
} from './errors'

import type {
  MarketplaceRequestOptions,
} from './types'

export async function executeRequest(
  baseUrl: string,
  accessToken: string,
  options: MarketplaceRequestOptions,
) {
  const params =
  new URLSearchParams()

if (options.query) {
  Object.entries(
    options.query,
  ).forEach(
    ([key, value]) => {
      params.append(
        key,
        String(value),
      )
    },
  )
}

const url =
  params.toString().length > 0
    ? `${baseUrl}${options.endpoint}?${params.toString()}`
    : `${baseUrl}${options.endpoint}`

const response = await fetch(
  url,
  {
      method: options.method ?? 'GET',

      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },

      body:
        options.body !== undefined
          ? JSON.stringify(options.body)
          : undefined,
    },
  )

  const text =
    await response.text()

  ensureResponseOk(
    response.ok,
    response.status,
    text || response.statusText,
  )

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}