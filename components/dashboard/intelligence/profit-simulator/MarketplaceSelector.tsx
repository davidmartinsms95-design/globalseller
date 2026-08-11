import { ShoppingBag } from 'lucide-react'

import Badge from '@/components/ui/Badge'

import {
  MarketplaceConfig,
  MarketplaceKey,
} from './types'

interface MarketplaceSelectorProps {
  marketplaces: MarketplaceConfig[]
  selectedMarketplace: MarketplaceKey
  onSelect: (
    marketplace: MarketplaceKey,
  ) => void
}

export default function MarketplaceSelector({
  marketplaces,
  selectedMarketplace,
  onSelect,
}: MarketplaceSelectorProps) {
  return (
    <div>
      <h3 className="mb-6 text-xl font-semibold text-white">
        Marketplace
      </h3>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {marketplaces.map((item) => {
          const active =
            selectedMarketplace === item.id

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`
                rounded-2xl
                border
                p-5
                text-left
                transition-all
                duration-300
                ${
                  active
                    ? `
                      border-orange-500
                      bg-orange-500/10
                      shadow-lg
                      shadow-orange-500/10
                    `
                    : `
                      border-zinc-800
                      bg-zinc-900/60
                      hover:border-zinc-700
                      hover:bg-zinc-900
                    `
                }
              `}
            >
              <div className="flex items-center justify-between">
                <ShoppingBag
                  size={22}
                  className={
                    active
                      ? 'text-orange-400'
                      : 'text-zinc-500'
                  }
                />

                <Badge
                  variant={
                    active
                      ? 'premium'
                      : 'default'
                  }
                  size="sm"
                >
                  {item.fee}%
                </Badge>
              </div>

              <div className="mt-5">
                <h4 className="font-semibold text-white">
                  {item.name}
                </h4>

                <p className="mt-2 text-sm text-zinc-500">
                  Comissão
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <div
  className={`h-3 w-3 rounded-full ${item.color}`}
/>

                <span className="text-xs text-zinc-500">
                  Frete médio:
                  {' '}
                  R$ {item.shipping.toFixed(2)}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}