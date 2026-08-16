'use client'

interface ProductBasicInfoProps {
  title: string
  category: string
  price: string

  brand: string
  model: string

  onTitleChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onPriceChange: (value: string) => void

  onBrandChange: (value: string) => void
  onModelChange: (value: string) => void
}

export default function ProductBasicInfo({
  title,
  category,
  price,

  brand,
  model,

  onTitleChange,
  onCategoryChange,
  onPriceChange,

  onBrandChange,
  onModelChange,
}: ProductBasicInfoProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">

      <div>

        <label className="mb-2 block text-sm font-semibold text-zinc-300">
          Nome do Produto
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) =>
            onTitleChange(e.target.value)
          }
          placeholder="Ex.: Smartphone Samsung Galaxy"
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
          Categoria
        </label>

        <input
          type="text"
          value={category}
          onChange={(e) =>
            onCategoryChange(e.target.value)
          }
          placeholder="Ex.: Eletrônicos"
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
          Preço
        </label>

        <input
          type="number"
          value={price}
          onChange={(e) =>
            onPriceChange(e.target.value)
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
    Marca
  </label>

  <input
    type="text"
    value={brand}
    onChange={(e) =>
      onBrandChange(e.target.value)
    }
    placeholder="Ex.: Samsung"
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
    Modelo
  </label>

  <input
    type="text"
    value={model}
    onChange={(e) =>
      onModelChange(e.target.value)
    }
    placeholder="Ex.: Galaxy S25"
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