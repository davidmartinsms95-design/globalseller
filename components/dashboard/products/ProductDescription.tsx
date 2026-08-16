'use client'

interface ProductDescriptionProps {
  shortDescription: string
  description: string

  onShortDescriptionChange: (value: string) => void
  onDescriptionChange: (value: string) => void
}

export default function ProductDescription({
  shortDescription,
  description,
  onShortDescriptionChange,
  onDescriptionChange,
}: ProductDescriptionProps) {
  return (
    <div className="space-y-6">

      <div>

        <label className="mb-2 block text-sm font-semibold text-zinc-300">
          Descrição Curta
        </label>

        <textarea
          rows={3}
          value={shortDescription}
          onChange={(e) =>
            onShortDescriptionChange(
              e.target.value,
            )
          }
          placeholder="Resumo rápido do produto..."
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
            resize-none
          "
        />

      </div>

      <div>

        <label className="mb-2 block text-sm font-semibold text-zinc-300">
          Descrição Completa
        </label>

        <textarea
          rows={10}
          value={description}
          onChange={(e) =>
            onDescriptionChange(
              e.target.value,
            )
          }
          placeholder="Digite uma descrição detalhada do produto..."
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
            resize-none
          "
        />

      </div>

    </div>
  )
}