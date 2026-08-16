'use client'

import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'

interface Product {
  id: string
  title: string
  stock: number
}

interface LowStockProps {
  products: Product[]
}

export default function LowStock({
  products,
}: LowStockProps) {
  const lowStock = products.filter(
    (product) => product.stock <= 5,
  )

  return (
    <Card>
      <h2 className="mb-6 text-2xl font-bold text-white">
        Estoque Baixo
      </h2>

      {lowStock.length === 0 ? (
        <EmptyState
          title="Estoque saudável"
          description="Nenhum produto está com estoque baixo."
        />
      ) : (
        <div className="space-y-4">
          {lowStock
            .slice(0, 5)
            .map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
              >
                <span className="font-semibold text-white">
                  {product.title}
                </span>

                <Badge
                  variant={
                    product.stock === 0
                      ? 'error'
                      : product.stock <= 2
                        ? 'warning'
                        : 'info'
                  }
                >
                  {product.stock} un.
                </Badge>
              </div>
            ))}
        </div>
      )}
    </Card>
  )
}