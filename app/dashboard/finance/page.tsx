'use client'

import { useEffect, useState } from 'react'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

interface Order {
  id: string

  amount: number

  status: string

  marketplace?: string
}

export default function FinancePage() {
  const [orders, setOrders] = useState<
    Order[]
  >([])

  const [loading, setLoading] =
    useState(true)

  async function loadOrders() {
    try {
      const response = await fetch(
        '/api/orders'
      )

      const data = await response.json()

      setOrders(data)

      setLoading(false)
    } catch (error) {
      console.log(error)

      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const approvedOrders =
    orders.filter(
      (order) =>
        order.status === 'approved'
    )

  const totalRevenue =
    approvedOrders.reduce(
      (acc, order) =>
        acc + Number(order.amount),
      0
    )

  const estimatedProfit =
    totalRevenue * 0.72

  const marketplaceRevenue =
    approvedOrders
      .filter(
        (order) => order.marketplace
      )
      .reduce(
        (acc, order) =>
          acc + Number(order.amount),
        0
      )

  const internalRevenue =
    totalRevenue -
    marketplaceRevenue

  const financeChart = [
    {
      name: 'Seg',
      valor: 1200,
    },
    {
      name: 'Ter',
      valor: 1800,
    },
    {
      name: 'Qua',
      valor: 2400,
    },
    {
      name: 'Qui',
      valor: 3200,
    },
    {
      name: 'Sex',
      valor: 4100,
    },
    {
      name: 'Sáb',
      valor: 2800,
    },
    {
      name: 'Dom',
      valor: 5300,
    },
  ]

  const pieData = [
    {
      name: 'Marketplace',
      value: marketplaceRevenue,
    },
    {
      name: 'Interno',
      value: internalRevenue,
    },
  ]

  return (
    <div>
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-6xl font-bold text-white">
            Financeiro
          </h1>

          <p className="mt-4 text-xl text-zinc-400">
            Controle financeiro da operação
            multi-marketplace.
          </p>
        </div>

        <div className="rounded-2xl bg-green-500 px-6 py-4 font-bold text-white">
          ERP FINANCE
        </div>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-zinc-400">
            Faturamento
          </p>

          <h2 className="mt-4 text-5xl font-bold text-green-500">
            R$ {totalRevenue.toFixed(2)}
          </h2>
        </div>

        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-zinc-400">
            Lucro Estimado
          </p>

          <h2 className="mt-4 text-5xl font-bold text-yellow-400">
            R$ {estimatedProfit.toFixed(2)}
          </h2>
        </div>

        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-zinc-400">
            Receita Marketplace
          </p>

          <h2 className="mt-4 text-5xl font-bold text-orange-500">
            R$ {marketplaceRevenue.toFixed(2)}
          </h2>
        </div>

        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-zinc-400">
            Receita Interna
          </p>

          <h2 className="mt-4 text-5xl font-bold text-blue-500">
            R$ {internalRevenue.toFixed(2)}
          </h2>
        </div>
      </div>

      {loading ? (
        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-10">
          <p className="text-xl text-zinc-400">
            Carregando financeiro...
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
            <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">
                  Receita Semanal
                </h2>

                <p className="mt-2 text-zinc-400">
                  Performance financeira
                </p>
              </div>

              <div className="h-96">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <LineChart
                    data={financeChart}
                  >
                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="valor"
                      stroke="#22c55e"
                      strokeWidth={4}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">
                  Receita por Canal
                </h2>

                <p className="mt-2 text-zinc-400">
                  Marketplace vs interno
                </p>
              </div>

              <div className="h-96">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={140}
                    >
                      <Cell fill="#f97316" />

                      <Cell fill="#3b82f6" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-[32px] border border-zinc-800 bg-zinc-900 p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white">
                Resumo Financeiro
              </h2>

              <p className="mt-2 text-zinc-400">
                Indicadores da operação
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-2xl bg-black p-6">
                <p className="text-zinc-400">
                  Pedidos aprovados
                </p>

                <h3 className="mt-3 text-4xl font-bold text-white">
                  {approvedOrders.length}
                </h3>
              </div>

              <div className="rounded-2xl bg-black p-6">
                <p className="text-zinc-400">
                  Ticket médio
                </p>

                <h3 className="mt-3 text-4xl font-bold text-yellow-400">
                  R$ {
                    approvedOrders.length > 0
                      ? (
                          totalRevenue /
                          approvedOrders.length
                        ).toFixed(2)
                      : '0'
                  }
                </h3>
              </div>

              <div className="rounded-2xl bg-black p-6">
                <p className="text-zinc-400">
                  Taxa estimada ERP
                </p>

                <h3 className="mt-3 text-4xl font-bold text-red-400">
                  28%
                </h3>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}