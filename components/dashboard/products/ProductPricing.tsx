'use client'

interface ProductPricingProps {
  salePrice: string
  costPrice: string

  onSalePriceChange: (value: string) => void
  onCostPriceChange: (value: string) => void
}

export default function ProductPricing({
  salePrice,
  costPrice,
  onSalePriceChange,
  onCostPriceChange,
}: ProductPricingProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">

      <div>

        <label className="mb-2 block text-sm font-semibold text-zinc-300">
          Preço de Venda
        </label>

        <input
          type="number"
          step="0.01"
          value={salePrice}
          onChange={(e) =>
            onSalePriceChange(e.target.value)
          }
          placeholder="0,00"
          className="
            w-full
            rounded-2xl
            border
            border-zinc-700
            bg-zinc-900
            px-4
            py-3
            text-white
            placeholder:text-zinc-500
            outline-none
            transition
            focus:border-orange-500
          "
        />

      </div>

      <div>

        <label className="mb-2 block text-sm font-semibold text-zinc-300">
          Preço de Custo
        </label>

        <input
          type="number"
          step="0.01"
          value={costPrice}
          onChange={(e) =>
            onCostPriceChange(e.target.value)
          }
          placeholder="0,00"
          className="
            w-full
            rounded-2xl
            border
            border-zinc-700
            bg-zinc-900
            px-4
            py-3
            text-white
            placeholder:text-zinc-500
            outline-none
            transition
            focus:border-orange-500
          "
        />

      </div>

    </div>
  )
}