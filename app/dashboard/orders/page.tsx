import prisma from '../../../lib/prisma'

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      product: true,
    },

    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-white">
          Pedidos
        </h1>

        <p className="mt-3 text-zinc-400">
          Gerencie todos os pedidos
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {order.product.title}
                </h2>

                <p className="mt-2 text-zinc-400">
                  Pedido:
                  {' '}
                  {order.id}
                </p>

                <p className="mt-1 text-zinc-400">
                  Cliente:
                  {' '}
                  {order.customerEmail}
                </p>

                <p className="mt-1 text-zinc-400">
                  Payment ID:
                  {' '}
                  {order.paymentId}
                </p>
              </div>

              <div className="text-right">
                <p className="text-3xl font-bold text-green-500">
                  R$ {order.amount}
                </p>

                <div className="mt-4">
                  {order.status ===
                  'approved' ? (
                    <span className="rounded-full bg-green-500 px-4 py-2 font-bold text-white">
                      Pago
                    </span>
                  ) : order.status ===
                    'pending' ? (
                    <span className="rounded-full bg-yellow-500 px-4 py-2 font-bold text-black">
                      Pendente
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-500 px-4 py-2 font-bold text-white">
                      Cancelado
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}