interface FinanceSummaryData {
  receitas: number
  despesas: number
  saldo: number

  contasReceber?: number
  contasPagar?: number
}

interface FinanceSummaryProps {
  summary: FinanceSummaryData
}

export default function FinanceSummary({
  summary,
}: FinanceSummaryProps) {
  const {
    receitas,
    despesas,
    saldo,
    contasReceber = 0,
    contasPagar = 0,
  } = summary

  return (
    <div className="grid gap-6 md:grid-cols-5">
      <div className="rounded-3xl border border-green-500/20 bg-zinc-900 p-8">
        <p className="text-zinc-400">
          Receitas
        </p>

        <h2 className="mt-4 text-3xl font-bold text-green-500">
          R$ {receitas.toFixed(2)}
        </h2>
      </div>

      <div className="rounded-3xl border border-red-500/20 bg-zinc-900 p-8">
        <p className="text-zinc-400">
          Despesas
        </p>

        <h2 className="mt-4 text-3xl font-bold text-red-500">
          R$ {despesas.toFixed(2)}
        </h2>
      </div>

      <div className="rounded-3xl border border-orange-500/20 bg-zinc-900 p-8">
        <p className="text-zinc-400">
          Saldo
        </p>

        <h2 className="mt-4 text-3xl font-bold text-orange-500">
          R$ {saldo.toFixed(2)}
        </h2>
      </div>

      <div className="rounded-3xl border border-blue-500/20 bg-zinc-900 p-8">
        <p className="text-zinc-400">
          Contas a Receber
        </p>

        <h2 className="mt-4 text-3xl font-bold text-blue-500">
          R$ {contasReceber.toFixed(2)}
        </h2>
      </div>

      <div className="rounded-3xl border border-yellow-500/20 bg-zinc-900 p-8">
        <p className="text-zinc-400">
          Contas a Pagar
        </p>

        <h2 className="mt-4 text-3xl font-bold text-yellow-500">
          R$ {contasPagar.toFixed(2)}
        </h2>
      </div>
    </div>
  )
}