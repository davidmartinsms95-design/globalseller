'use client'

interface ProductInventoryProps {
  sku: string
  ean: string
  stock: string

  onSkuChange: (value: string) => void
  onEanChange: (value: string) => void
  onStockChange: (value: string) => void
}

export default function ProductInventory({
  sku,
  ean,
  stock,
  onSkuChange,
  onEanChange,
  onStockChange,
}: ProductInventoryProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">

      <div>

        <label className="mb-2 block text-sm font-semibold text-zinc-300">
          SKU
        </label>

        <input
          type="text"
          value={sku}
          onChange={(e) =>
            onSkuChange(e.target.value)
          }
          placeholder="SKU-0001"
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
          Código EAN / GTIN
        </label>

        <input
          type="text"
          value={ean}
          onChange={(e) =>
            onEanChange(e.target.value)
          }
          placeholder="7891234567890"
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
          Estoque
        </label>

        <input
          type="number"
          value={stock}
          onChange={(e) =>
            onStockChange(e.target.value)
          }
          placeholder="0"
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