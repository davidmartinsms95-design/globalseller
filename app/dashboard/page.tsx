'use client'

import { useEffect, useState } from 'react'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface Product {
  id: string
}

interface Order {
  id: string
  status: string
  total: number
}

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])

  async function loadData() {
    const productsResponse = await fetch(
      '/api/products'
    )

    const productsData =
      await productsResponse.json()

    setProducts(productsData)

    const ordersResponse = await fetch(
      '/api/orders'
    )

    const ordersData =
      await ordersResponse.json()

    setOrders(ordersData)
  }

  useEffect(() => {
    loadData()
  }, [])

  const paidOrders = orders.filter(
    (order) => order.status === 'paid'
  )

  const totalSales = paidOrders.reduce(
    (acc, order) => acc + order.total,
    0
  )

  const chartData = [
    {
      name: 'Seg',
      vendas: 400,
    },
    {
      name: 'Ter',
      vendas: 700,
    },
    {
      name: 'Qua',
      vendas: 300,
    },
    {
      name: 'Qui',
      vendas: 900,
    },
    {
      name: 'Sex',
      vendas: 1200,
    },
    {
      name: 'Sáb',
      vendas: 500,
    },
    {
      name: 'Dom',
      vendas: 1500,
    },
  ]

  return (
    <div>
      <h1 className="mb-10 text-5xl font-bold">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-zinc-900 p-8">
          <p className="text-zinc-400">
            Produtos
          </p>

          <h2 className="mt-4 text-5xl font-bold">
            {products.length}
          </h2>
        </div>

        <div className="rounded-3xl bg-zinc-900 p-8">
          <p className="text-zinc-400">
            Pedidos Pagos
          </p>

          <h2 className="mt-4 text-5xl font-bold text-green-500">
            {paidOrders.length}
          </h2>
        </div>

        <div className="rounded-3xl bg-zinc-900 p-8">
          <p className="text-zinc-400">
            Faturamento
          </p>

          <h2 className="mt-4 text-5xl font-bold text-orange-500">
            R$ {totalSales}
          </h2>
        </div>
      </div>

      <div className="mt-10 rounded-3xl bg-zinc-900 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              Vendas da Semana
            </h2>

            <p className="mt-2 text-zinc-400">
              Performance de vendas
            </p>
          </div>
        </div>

        <div className="h-96">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart data={chartData}>
              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="vendas"
                stroke="#f97316"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}