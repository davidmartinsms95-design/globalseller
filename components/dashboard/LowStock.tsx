'use client'

import { useEffect, useState } from 'react'

interface Product {
  id: string
  title: string
  stock: number
}

export default function LowStock() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function loadProducts() {
      const response = await fetch('/api/products')
      const data = await response.json()

      setProducts(data)
    }

    loadProducts()
  }, [])

  const lowStock = products.filter(
    (product) => product.stock <= 5
  )

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        ⚠️ Estoque Baixo
      </h2>

      <div className="space-y-4">
        {lowStock.slice(0, 5).map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between rounded-xl border border-zinc-800 p-4"
          >
            <span className="font-medium text-white">
              {product.title}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-sm font-bold ${
                product.stock === 0
                  ? 'bg-red-500 text-white'
                  : product.stock <= 2
                  ? 'bg-orange-500 text-white'
                  : 'bg-yellow-500 text-black'
              }`}
            >
              {product.stock} un.
            </span>
          </div>
        ))}

        {lowStock.length === 0 && (
          <p className="text-zinc-500">
            Nenhum produto com estoque baixo.
          </p>
        )}
      </div>
    </div>
  )
}