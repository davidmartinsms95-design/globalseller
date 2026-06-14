'use client'

import { useEffect, useState } from 'react'

interface Order {
  id: string

  amount: number

  status: string

  customerEmail?: string

  marketplace?: string

  createdAt?: string
}

export default function OrdersCenterPage() {
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

  const paidOrders = orders.filter(
  (order) =>
    order.status === 'approved' ||
    order.status === 'paid'
)

  const pendingOrders = orders.filter(
    (order) =>
      order.status === 'pending'
  )

  const totalSales = paidOrders.reduce(
    (acc, order) =>
      acc + Number(order.amount),
    0
  )

  return (
    <div>
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-6xl font-bold text-white">
            Central de Pedidos
          </h1>

          <p className="mt-4 text-xl text-zinc-400">
            Todos os pedidos da operação
            multi-marketplace.
          </p>
        </div>

        <div className="rounded-2xl bg-yellow-400 px-6 py-4 font-bold text-black">
          ERP ORDERS CENTER
        </div>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-zinc-400">
            Pedidos Pagos
          </p>

          <h2 className="mt-4 text-5xl font-bold text-green-500">
            {paidOrders.length}
          </h2>
        </div>

        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-zinc-400">
            Pedidos Pendentes
          </p>

          <h2 className="mt-4 text-5xl font-bold text-yellow-400">
            {pendingOrders.length}
          </h2>
        </div>

        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-zinc-400">
            Faturamento
          </p>

          <h2 className="mt-4 text-5xl font-bold text-orange-500">
            R$ {totalSales}
          </h2>
        </div>
      </div>

      {loading ? (
        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-10">
          <p className="text-xl text-zinc-400">
            Carregando pedidos...
          </p>
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-10">
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
              <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-white">
                      Pedido #{order.id}
                    </h2>

                    <div
                      className={`
                        rounded-2xl px-4 py-2 font-bold
                        ${
                          order.marketplace ===
                          'shopee'
                            ? 'bg-orange-500 text-white'
                            : order.marketplace ===
                                'mercadolivre'
                              ? 'bg-yellow-400 text-black'
                              : 'bg-zinc-700 text-white'
                        }
                      `}
                    >
                      {order.marketplace ||
                        'Interno'}
                    </div>
                  </div>

                  <p className="mt-3 text-zinc-400">
                    Cliente:
                    {' '}
                    {order.customerEmail ||
                      'Não informado'}
                  </p>

                  <p className="mt-2 text-sm text-zinc-500">
                    {order.createdAt
                      ? new Date(
                          order.createdAt
                        ).toLocaleString(
                          'pt-BR'
                        )
                      : 'Sem data'}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-2xl bg-black p-5">
                    <p className="text-sm text-zinc-400">
                      Valor
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-green-500">
                      R$ {order.amount}
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-black p-5">
                    <p className="text-sm text-zinc-400">
                      Status
                    </p>

                    <h3
  className={`mt-2 text-xl font-bold ${
    order.status === 'approved' ||
    order.status === 'paid'
      ? 'text-green-500'
      : order.status === 'pending'
        ? 'text-yellow-400'
        : 'text-red-500'
  }`}
>
  {order.status}
</h3>
                  </div>

                  <div className="rounded-2xl bg-black p-5">
                    <p className="text-sm text-zinc-400">
                      Operação
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-white">
                      Realtime
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}