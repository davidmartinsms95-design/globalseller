'use client'

interface FinanceTransaction {
  id: string
  amount: number
  type: string
  category: string
  description?: string

  dueDate?: string | null
  status?: string | null
  paymentMethod?: string | null
}

interface Props {
  loading: boolean
  transactions: FinanceTransaction[]
}

export default function FinanceTransactions({
  loading,
  transactions,
}: Props) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      <h2 className="mb-6 text-2xl font-bold">
        LanÃ§amentos Financeiros
      </h2>

      {loading ? (
        <p>Carregando...</p>
      ) : transactions.length === 0 ? (
        <p className="text-zinc-500">
          Nenhum lanÃ§amento encontrado.
        </p>
      ) : (
        <div className="space-y-4">

          {transactions.map((transaction) => (
  <div
    key={transaction.id}
    className="rounded-2xl border border-zinc-800 p-5"
  >
    <div className="flex items-start justify-between">
      <div className="space-y-2">
        <h3 className="text-lg font-bold">
          {transaction.category}
        </h3>

        <p className="text-sm text-zinc-400">
          {transaction.description || 'Sem descriÃ§Ã£o'}
        </p>

        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-lg bg-zinc-800 px-3 py-1">
            {transaction.paymentMethod || 'NÃ£o informado'}
          </span>

          <span
            className={`rounded-lg px-3 py-1 ${
              transaction.status === 'paid'
                ? 'bg-green-600 text-white'
                : 'bg-yellow-600 text-white'
            }`}
          >
            {transaction.status === 'paid'
              ? 'Pago'
              : 'Pendente'}
          </span>

          {transaction.dueDate && (
            <span className="rounded-lg bg-blue-600 px-3 py-1 text-white">
              Vence em{' '}
              {new Date(
                transaction.dueDate
              ).toLocaleDateString('pt-BR')}
            </span>
          )}
        </div>
      </div>

      <div
        className={
          transaction.type === 'income'
            ? 'text-right font-bold text-green-500'
            : 'text-right font-bold text-red-500'
        }
      >
        R$ {Number(transaction.amount).toFixed(2)}
      </div>
    </div>
  </div>
))}

        </div>
      )}

    </div>
  )
}