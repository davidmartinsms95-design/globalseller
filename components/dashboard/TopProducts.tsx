'use client'

import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'

interface Product {
  id: string
  title: string
  price: number
  stock: number
}

interface TopProductsProps {
  products: Product[]
}

export default function TopProducts({
  products,
}: TopProductsProps) {
  return (
    <Card>
      <h2 className="mb-6 text-2xl font-bold text-white">
        Top Produtos
      </h2>

      {products.length === 0 ? (
        <EmptyState
          title="Nenhum produto"
          description="Importe produtos para começar."
        />
      ) : (
        <div className="space-y-4">
          {products
            .slice(0, 5)
            .map((product, index) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
              >
                <div>
                  <p className="font-semibold text-white">
                    #{index + 1} {product.title}
                  </p>

                  <Badge>
                    Estoque: {product.stock}
                  </Badge>
                </div>

                <p className="font-bold text-green-500">
                  R$ {product.price.toFixed(2)}
                </p>
              </div>
            ))}
        </div>
      )}
    </Card>
  )
}