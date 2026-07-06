'use client'

interface MarketplaceProductSearchProps {
  value: string
  onChange: (value: string) => void
}

export default function MarketplaceProductSearch({
  value,
  onChange,
}: MarketplaceProductSearchProps) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Pesquisar produto..."
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
  )
}