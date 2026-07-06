'use client'

import { useEffect, useState } from 'react'

interface Order {
  id: string

  amount: number

  status: string

  createdAt: string

  customerEmail: string | null

  marketplace: string
}

export default function MercadoLivreOrdersPage() {
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

      setOrders(
  Array.isArray(data)
    ? data
    : []
)

      setLoading(false)
    } catch (error) {
      console.log(error)

      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-yellow-400">
          Pedidos Mercado Livre
        </h1>

        <p className="mt-4 text-zinc-400">
          Pedidos sincronizados da sua conta
          Mercado Livre.
        </p>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10">
          <p className="text-xl text-zinc-400">
            Importando pedidos...
          </p>
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10">
          <p className="text-xl text-zinc-400">
            Nenhum pedido encontrado.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Pedido #{order.id.slice(0, 8)}
                  </h2>

                  <p className="mt-2 text-zinc-400">
                    Cliente:
                    {' '}
                    {order.customerEmail ?? 'Cliente'}
                  </p>
                </div>

                <div className="rounded-2xl bg-yellow-400 px-4 py-2 font-bold text-black">
                  {order.marketplace}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="rounded-2xl bg-black p-5">
                  <p className="text-sm text-zinc-400">
                    Valor
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-green-500">
                    R$ {order.amount.toFixed(2)}
                  </h3>
                </div>

                <div className="rounded-2xl bg-black p-5">
                  <p className="text-sm text-zinc-400">
                    Status
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-white">
                    {order.status}
                  </h3>
                </div>

                <div className="rounded-2xl bg-black p-5">
                  <p className="text-sm text-zinc-400">
                    Entrega
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-orange-400">
                    Em processamento
                  </h3>
                </div>

                <div className="rounded-2xl bg-black p-5">
                  <p className="text-sm text-zinc-400">
                    Data
                  </p>

                  <h3 className="mt-2 text-sm font-bold text-white">
                    {new Date(order.createdAt).toLocaleDateString(
                      'pt-BR'
                    )}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

