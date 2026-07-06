'use client'

import { useEffect, useState } from 'react'

interface Product {
  id: string
  title: string
  price: number
  stock: number
}

export default function TopProducts() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch('/api/products')

        const data = await response.json()

        if (Array.isArray(data)) {
          setProducts(data)
        } else {
          console.error('Resposta inválida da API:', data)
          setProducts([])
        }
      } catch (error) {
        console.error(error)
        setProducts([])
      }
    }

    loadProducts()
  }, [])

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        🏆 Top Produtos
      </h2>

      <div className="space-y-4">
        {products.slice(0, 5).map((product, index) => (
          <div
            key={product.id}
            className="flex items-center justify-between rounded-xl border border-zinc-800 p-4"
          >
            <div>
              <p className="font-semibold text-white">
                {index + 1}. {product.title}
              </p>

              <p className="text-sm text-zinc-400">
                Estoque: {product.stock}
              </p>
            </div>

            <p className="font-bold text-green-500">
              R$ {product.price.toFixed(2)}
            </p>
          </div>
        ))}

        {products.length === 0 && (
          <p className="text-zinc-500">
            Nenhum produto encontrado.
          </p>
        )}
      </div>
    </div>
  )
}