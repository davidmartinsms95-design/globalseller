'use client'

import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'

interface Order {
  id: string
  amount: number
  status: string
  createdAt: string
}

interface RecentOrdersProps {
  orders: Order[]
}

export default function RecentOrders({
  orders,
}: RecentOrdersProps) {
  return (
    <Card>
      <h2 className="mb-6 text-2xl font-bold text-white">
        Últimos Pedidos
      </h2>

      {orders.length === 0 ? (
        <EmptyState
          title="Nenhum pedido"
          description="Quando houver vendas elas aparecerão aqui."
        />
      ) : (
        <div className="space-y-4">
          {orders
            .slice(0, 5)
            .map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
              >
                <div>
                  <p className="font-semibold text-white">
                    Pedido #{order.id.slice(-6)}
                  </p>

                  <p className="text-sm text-zinc-500">
                    {new Date(
                      order.createdAt,
                    ).toLocaleDateString(
                      'pt-BR',
                    )}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-green-500">
                    R$ {order.amount.toFixed(2)}
                  </p>

                  <Badge>
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
        </div>
      )}
    </Card>
  )
}