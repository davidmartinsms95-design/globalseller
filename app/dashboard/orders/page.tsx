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
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold text-white">
            Pedidos
          </h1>

          <p className="mt-3 text-zinc-400">
            Gerencie todos os pedidos
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-900 px-6 py-4">
          <p className="text-sm text-zinc-400">
            Total de pedidos
          </p>

          <h2 className="mt-2 text-3xl font-bold text-orange-500">
            {orders.length}
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-zinc-800 bg-zinc-900">
        <table className="w-full">
          <thead className="border-b border-zinc-800">
            <tr>
              <th className="p-5 text-left text-zinc-400">
                Produto
              </th>

              <th className="p-5 text-left text-zinc-400">
                Cliente
              </th>

              <th className="p-5 text-left text-zinc-400">
                Valor
              </th>

              <th className="p-5 text-left text-zinc-400">
                Status
              </th>

              <th className="p-5 text-left text-zinc-400">
                Payment ID
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-zinc-800 transition hover:bg-zinc-800"
              >
                <td className="p-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={order.product.image}
                      alt=""
                      className="h-16 w-16 rounded-xl object-cover"
                    />

                    <div>
                      <p className="font-bold text-white">
                        {order.product.title}
                      </p>

                      <p className="text-sm text-zinc-400">
                        {order.id}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-5 text-zinc-300">
                  {order.customerEmail}
                </td>

                <td className="p-5 text-2xl font-bold text-green-500">
                  R$ {order.amount}
                </td>

                <td className="p-5">
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
                </td>

                <td className="p-5 text-sm text-zinc-400">
                  {order.paymentId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}