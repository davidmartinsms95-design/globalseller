'use client'

interface ProductDimensionsProps {
  weight: string
  height: string
  width: string
  length: string

  onWeightChange: (value: string) => void
  onHeightChange: (value: string) => void
  onWidthChange: (value: string) => void
  onLengthChange: (value: string) => void
}

export default function ProductDimensions({
  weight,
  height,
  width,
  length,
  onWeightChange,
  onHeightChange,
  onWidthChange,
  onLengthChange,
}: ProductDimensionsProps) {
  return (
    <div>

      <h2 className="mb-6 text-xl font-bold text-white">
        Dimensões do Produto
      </h2>

      <div className="grid gap-6 md:grid-cols-4">

        <div>

          <label className="mb-2 block text-sm font-semibold text-zinc-300">
            Peso (kg)
          </label>

          <input
            type="number"
            step="0.001"
            value={weight}
            onChange={(e) =>
              onWeightChange(e.target.value)
            }
            placeholder="0.000"
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
            Altura (cm)
          </label>

          <input
            type="number"
            step="0.01"
            value={height}
            onChange={(e) =>
              onHeightChange(e.target.value)
            }
            placeholder="0.00"
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
            Largura (cm)
          </label>

          <input
            type="number"
            step="0.01"
            value={width}
            onChange={(e) =>
              onWidthChange(e.target.value)
            }
            placeholder="0.00"
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
            Comprimento (cm)
          </label>

          <input
            type="number"
            step="0.01"
            value={length}
            onChange={(e) =>
              onLengthChange(e.target.value)
            }
            placeholder="0.00"
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

    </div>
  )
}