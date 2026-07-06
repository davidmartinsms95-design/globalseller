'use client'

import { useEffect, useState } from 'react'

interface Order {
  id: string
  amount: number
  status: string
  createdAt: string
}

export default function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    async function loadOrders() {
      const response = await fetch('/api/orders')
      const data = await response.json()

      setOrders(data)
    }

    loadOrders()
  }, [])

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Últimos Pedidos
      </h2>

      <div className="space-y-4">
        {orders.slice(0, 5).map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between rounded-xl border border-zinc-800 p-4"
          >
            <div>
              <p className="font-semibold text-white">
                Pedido #{order.id.slice(-6)}
              </p>

              <p className="text-sm text-zinc-400">
                {new Date(order.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold text-green-500">
                R$ {order.amount.toFixed(2)}
              </p>

              <p className="text-sm text-zinc-400">
                {order.status}
              </p>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <p className="text-zinc-500">
            Nenhum pedido encontrado.
          </p>
        )}
      </div>
    </div>
  )
}