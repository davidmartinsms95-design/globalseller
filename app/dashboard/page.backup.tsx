'use client'

import { useEffect, useState } from 'react'

interface Product {
  id: string
  stock?: number
}

interface Order {
  id: string
  amount?: number
  status?: string
}

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])

  async function loadData() {
    try {
      const [productsResponse, ordersResponse] =
        await Promise.all([
          fetch('/api/products'),
          fetch('/api/orders'),
        ])

      const productsData =
        await productsResponse.json()

      const ordersData =
        await ordersResponse.json()

      setProducts(
        Array.isArray(productsData)
          ? productsData
          : []
      )

      setOrders(
        Array.isArray(ordersData)
          ? ordersData
          : []
      )
    } catch (error) {
      console.error(
        'ERRO CARREGAR DASHBOARD:',
        error
      )

      setProducts([])
      setOrders([])
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const totalSales = orders.reduce(
    (acc, order) =>
      acc + Number(order.amount || 0),
    0
  )

  return (
    <div className="p-10">
      <h1 className="mb-8 text-5xl font-bold text-white">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-zinc-900 p-8">
          <p className="text-zinc-400">
            Produtos
          </p>

          <h2 className="mt-4 text-5xl font-bold text-white">
            {products.length}
          </h2>
        </div>

        <div className="rounded-3xl bg-zinc-900 p-8">
          <p className="text-zinc-400">
            Pedidos
          </p>

          <h2 className="mt-4 text-5xl font-bold text-white">
            {orders.length}
          </h2>
        </div>

        <div className="rounded-3xl bg-zinc-900 p-8">
          <p className="text-zinc-400">
            Faturamento
          </p>

          <h2 className="mt-4 text-5xl font-bold text-green-500">
            R$ {totalSales}
          </h2>
        </div>
      </div>

      <div className="mt-10 rounded-3xl bg-zinc-900 p-8">
        <h2 className="mb-6 text-3xl font-bold text-white">
          Resumo
        </h2>

        <p className="text-zinc-400">
          Sistema conectado ao banco de dados.
        </p>

        <p className="mt-3 text-zinc-400">
          Produtos cadastrados: {products.length}
        </p>

        <p className="mt-3 text-zinc-400">
          Pedidos cadastrados: {orders.length}
        </p>
      </div>
    </div>
  )
}

