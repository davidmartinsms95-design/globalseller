import type {
  MarketplaceProvider,
} from './provider'

import {
  MercadoLivreProvider,
} from './providers/mercadoLivreProvider'

export class MarketplaceManager {
  private providers = new Map<
    string,
    MarketplaceProvider
  >()

  constructor() {
    this.providers.set(
      'mercadolivre',
      new MercadoLivreProvider(),
    )
  }

  getProvider(
    marketplace: string,
  ): MarketplaceProvider {
    const provider =
      this.providers.get(
        marketplace,
      )

    if (!provider) {
      throw new Error(
        `Marketplace "${marketplace}" não suportado.`,
      )
    }

    return provider
  }
}

export const marketplaceManager =
  new MarketplaceManager()