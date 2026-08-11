interface PriceSelectorProps {
  salePrice: number
  minimumPrice: number
  maxSlider: number
  formatCurrency: (
    value: number,
  ) => string
  clamp: (
    value: number,
    min: number,
    max: number,
  ) => number
  onChange: (value: number) => void
}

export default function PriceSelector({
  salePrice,
  minimumPrice,
  maxSlider,
  formatCurrency,
  clamp,
  onChange,
}: PriceSelectorProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="font-medium text-zinc-300">
          Preço de Venda
        </span>

        <strong className="text-2xl text-orange-400">
          {formatCurrency(salePrice)}
        </strong>
      </div>

      <input
        type="range"
        min={minimumPrice}
        max={maxSlider}
        value={clamp(
          salePrice,
          minimumPrice,
          maxSlider,
        )}
        step={1}
        onChange={(e) =>
          onChange(
            Number(e.target.value),
          )
        }
        className="w-full accent-orange-500"
      />

      <div className="mt-4">
        <input
          type="number"
          value={salePrice}
          step="0.01"
          onChange={(e) =>
            onChange(
              Number(e.target.value),
            )
          }
          className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 p-4 text-xl font-bold text-white outline-none focus:border-orange-500"
        />
      </div>
    </div>
  )
}