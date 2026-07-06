'use client'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface FinanceTransaction {
  id: string
  amount: number
  type: string
  createdAt: string
}

interface Props {
  transactions: FinanceTransaction[]
}

export default function FinanceChart({
  transactions,
}: Props) {
  const grouped = new Map<
    string,
    { receitas: number; despesas: number }
  >()

  transactions.forEach((transaction) => {
    const day = new Date(
      transaction.createdAt
    ).toLocaleDateString('pt-BR')

    if (!grouped.has(day)) {
      grouped.set(day, {
        receitas: 0,
        despesas: 0,
      })
    }

    const current = grouped.get(day)!

    if (transaction.type === 'income') {
      current.receitas += Number(
        transaction.amount
      )
    } else {
      current.despesas += Number(
        transaction.amount
      )
    }
  })

  const data = Array.from(grouped.entries()).map(
    ([date, values]) => ({
      date,
      receitas: values.receitas,
      despesas: values.despesas,
      saldo:
        values.receitas - values.despesas,
    })
  )

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      <h2 className="mb-6 text-2xl font-bold">
        Fluxo de Caixa
      </h2>

      <div className="h-96">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
  type="monotone"
  dataKey="receitas"
  stroke="#22c55e"
  strokeWidth={3}
/>

<Line
  type="monotone"
  dataKey="despesas"
  stroke="#ef4444"
  strokeWidth={3}
/>

<Line
  type="monotone"
  dataKey="saldo"
  stroke="#f97316"
  strokeWidth={3}
/>

          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  )
}