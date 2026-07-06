import FinanceTabs from '@/components/dashboard/finance/FinanceTabs'

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-bold text-white">
          Relatórios Financeiros
        </h1>

        <p className="mt-2 text-zinc-400">
          Exporte dados e acompanhe indicadores financeiros.
        </p>
      </div>

      <FinanceTabs />

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <p className="text-zinc-400">
          Esta tela será implementada na próxima etapa utilizando os
          componentes financeiros já existentes.
        </p>
      </div>
    </div>
  )
}