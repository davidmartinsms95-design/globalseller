'use client'

interface SupplierSearchProps {
  value: string
  onChange: (value: string) => void
}

export default function SupplierSearch({
  value,
  onChange,
}: SupplierSearchProps) {
  return (
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Pesquisar fornecedor por empresa, e-mail ou telefone..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-zinc-700
            bg-zinc-900
            px-5
            py-3
            text-white
            placeholder:text-zinc-500
            outline-none
            transition
            focus:border-orange-500
            focus:ring-2
            focus:ring-orange-500/20
          "
        />
      </div>
    </div>
  )
}