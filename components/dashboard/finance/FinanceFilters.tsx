'use client'

interface Props {
  filter: string
  setFilter: (value: string) => void
}

export default function FinanceFilters({
  filter,
  setFilter,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">

      <button
        onClick={() => setFilter('all')}
        className={`rounded-xl px-4 py-2 ${
          filter === 'all'
            ? 'bg-orange-500 text-white'
            : 'bg-zinc-800'
        }`}
      >
        Todos
      </button>

      <button
        onClick={() => setFilter('income')}
        className={`rounded-xl px-4 py-2 ${
          filter === 'income'
            ? 'bg-green-600 text-white'
            : 'bg-zinc-800'
        }`}
      >
        Receitas
      </button>

      <button
        onClick={() => setFilter('expense')}
        className={`rounded-xl px-4 py-2 ${
          filter === 'expense'
            ? 'bg-red-600 text-white'
            : 'bg-zinc-800'
        }`}
      >
        Despesas
      </button>

    </div>
  )
}