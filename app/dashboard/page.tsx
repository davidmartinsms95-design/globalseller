import prisma from '@/lib/prisma'
import SalesChart from '@/components/SalesChart'

export default async function DashboardPage() {
  const products = await prisma.product.count()

  const orders = await prisma.order.count()

  const approvedOrders =
    await prisma.order.count({
      where: {
        status: 'approved',
      },
    })

  const pendingOrders =
    await prisma.order.count({
      where: {
        status: 'pending',
      },
    })

  const totalRevenue =
    await prisma.order.aggregate({
      _sum: {
        amount: true,
      },
    })

  const latestOrders =
    await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },

      take: 5,

      include: {
        product: true,
      },
    })

  const salesData = [
    {
      name: 'Jan',
      total: 4000,
    },
    {
      name: 'Fev',
      total: 3000,
    },
    {
      name: 'Mar',
      total: 5000,
    },
    {
      name: 'Abr',
      total: 2780,
    },
    {
      name: 'Mai',
      total: 1890,
    },
    {
      name: 'Jun',
      total: 2390,
    },
  ]

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-3 text-zinc-400">
          Bem-vindo ao painel GlobalSeller
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-zinc-400">
            Produtos
          </p>

          <h2 className="mt-4 text-5xl font-bold text-orange-500">
            {products}
          </h2>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-zinc-400">
            Pedidos
          </p>

          <h2 className="mt-4 text-5xl font-bold text-blue-500">
            {orders}
          </h2>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-zinc-400">
            Aprovados
          </p>

          <h2 className="mt-4 text-5xl font-bold text-green-500">
            {approvedOrders}
          </h2>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-zinc-400">
            Pendentes
          </p>

          <h2 className="mt-4 text-5xl font-bold text-yellow-500">
            {pendingOrders}
          </h2>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <p className="text-zinc-400">
          Faturamento Total
        </p>

        <h2 className="mt-4 text-6xl font-bold text-green-500">
          R$ {totalRevenue._sum.amount || 0}
        </h2>
      </div>

      <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">
            Vendas
          </h2>

          <p className="mt-2 text-zinc-400">
            Performance mensal
          </p>
        </div>

        <SalesChart data={salesData} />
      </div>

      <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <h2 className="text-2xl font-bold text-white">
          Últimos pedidos
        </h2>

        <div className="mt-8 space-y-4">
          {latestOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-2xl bg-zinc-800 p-5"
            >
              <div>
                <p className="font-bold text-white">
                  {order.product.title}
                </p>

                <p className="text-sm text-zinc-400">
                  Status: {order.status}
                </p>
              </div>

              <p className="font-bold text-green-500">
                R$ {order.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}