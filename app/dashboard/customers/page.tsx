'use client'

import { useEffect, useState } from 'react'

interface Order {
  id: string

  amount: number

  customerEmail?: string

  marketplace?: string

  createdAt?: string

  status: string
}

interface Customer {
  email: string

  orders: number

  totalSpent: number

  averageTicket: number

  marketplaces: string[]
}

export default function CustomersPage() {
  const [customers, setCustomers] =
    useState<Customer[]>([])

  const [loading, setLoading] =
    useState(true)

  async function loadCustomers() {
    try {
      const response = await fetch(
        '/api/orders'
      )

      const orders: Order[] =
        await response.json()

      const approvedOrders =
        orders.filter(
          (order) =>
            order.status ===
            'approved'
        )

      const groupedCustomers: Record<
        string,
        Customer
      > = {}

      approvedOrders.forEach((order) => {
        const email =
          order.customerEmail ||
          'cliente@desconhecido.com'

        if (!groupedCustomers[email]) {
          groupedCustomers[email] = {
            email,

            orders: 0,

            totalSpent: 0,

            averageTicket: 0,

            marketplaces: [],
          }
        }

        groupedCustomers[email].orders += 1

        groupedCustomers[email].totalSpent +=
          Number(order.amount)

        groupedCustomers[email].averageTicket =
          groupedCustomers[email]
            .totalSpent /
          groupedCustomers[email].orders

        if (
          order.marketplace &&
          !groupedCustomers[
            email
          ].marketplaces.includes(
            order.marketplace
          )
        ) {
          groupedCustomers[
            email
          ].marketplaces.push(
            order.marketplace
          )
        }
      })

      setCustomers(
        Object.values(groupedCustomers)
      )

      setLoading(false)
    } catch (error) {
      console.log(error)

      setLoading(false)
    }
  }

  useEffect(() => {
    loadCustomers()
  }, [])

  const totalRevenue =
    customers.reduce(
      (acc, customer) =>
        acc + customer.totalSpent,
      0
    )

  return (
    <div>
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-6xl font-bold text-white">
            CRM Clientes
          </h1>

          <p className="mt-4 text-xl text-zinc-400">
            Gestão inteligente de clientes
            multi-marketplace.
          </p>
        </div>

        <div className="rounded-2xl bg-blue-500 px-6 py-4 font-bold text-white">
          ERP CRM
        </div>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-zinc-400">
            Clientes
          </p>

          <h2 className="mt-4 text-5xl font-bold text-white">
            {customers.length}
          </h2>
        </div>

        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-zinc-400">
            Receita Clientes
          </p>

          <h2 className="mt-4 text-5xl font-bold text-green-500">
            R$ {totalRevenue.toFixed(2)}
          </h2>
        </div>

        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-zinc-400">
            Ticket Médio Global
          </p>

          <h2 className="mt-4 text-5xl font-bold text-yellow-400">
            R$ {
              customers.length > 0
                ? (
                    totalRevenue /
                    customers.length
                  ).toFixed(2)
                : '0'
            }
          </h2>
        </div>
      </div>

      {loading ? (
        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-10">
          <p className="text-xl text-zinc-400">
            Carregando clientes...
          </p>
        </div>
      ) : customers.length === 0 ? (
        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-10">
          <p className="text-xl text-zinc-400">
            Nenhum cliente encontrado.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {customers.map((customer) => (
            <div
              key={customer.email}
              className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8"
            >
              <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {customer.email}
                  </h2>

                  <p className="mt-3 text-zinc-400">
                    Cliente multi-marketplace
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {customer.marketplaces
                      .length === 0 ? (
                      <div className="rounded-2xl bg-zinc-700 px-4 py-2 font-bold text-white">
                        Interno
                      </div>
                    ) : (
                      customer.marketplaces.map(
                        (
                          marketplace
                        ) => (
                          <div
                            key={
                              marketplace
                            }
                            className={`
                              rounded-2xl px-4 py-2 font-bold
                              ${
                                marketplace ===
                                'shopee'
                                  ? 'bg-orange-500 text-white'
                                  : marketplace ===
                                      'mercadolivre'
                                    ? 'bg-yellow-400 text-black'
                                    : 'bg-zinc-700 text-white'
                              }
                            `}
                          >
                            {
                              marketplace
                            }
                          </div>
                        )
                      )
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-2xl bg-black p-5">
                    <p className="text-sm text-zinc-400">
                      Pedidos
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-white">
                      {customer.orders}
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-black p-5">
                    <p className="text-sm text-zinc-400">
                      Total gasto
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-green-500">
                      R$ {' '}
                      {customer.totalSpent.toFixed(
                        2
                      )}
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-black p-5">
                    <p className="text-sm text-zinc-400">
                      Ticket médio
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-yellow-400">
                      R$ {' '}
                      {customer.averageTicket.toFixed(
                        2
                      )}
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

