export type MarketplaceKey =
  | 'mercadolivre'
  | 'shopee'
  | 'amazon'
  | 'magalu'

export type ScenarioKey =
  | 'conservative'
  | 'competitive'
  | 'premium'
  | 'clearance'

export interface MarketplaceConfig {
  id: MarketplaceKey
  name: string
  fee: number
  shipping: number
  color: string
}

export interface MarketplaceSelectorProps {
  marketplaces: MarketplaceConfig[]
  selectedMarketplace: MarketplaceKey
  onSelect: (
    marketplace: MarketplaceKey,
  ) => void
}