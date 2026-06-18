'use client'

import { useEffect, useState } from 'react'

interface Product {
  id: string
  title: string
  price: number
  thumbnail: string
  available_quantity: number
  status: string
  permalink: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  async function loadProducts() {
    try {
      const response = await fetch(
        '/api/integrations/mercadolivre/products'
      )

      const data = await response.json()

      console.log(data)

      if (Array.isArray(data)) {
        setProducts(data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  if (loading) {
    return (
      <div className="p-10 text-white">
        Carregando produtos...
      </div>
    )
  }

  return (
    <div className="p-10">
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-white">
          Produtos Mercado Livre
        </h1>

        <p className="mt-3 text-zinc-400">
          Produtos sincronizados automaticamente
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-[32px] border border-zinc-800 bg-zinc-900"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-64 w-full object-cover"
            />

            <div className="p-8">
              <h2 className="text-xl font-bold text-white">
                {product.title}
              </h2>

              <p className="mt-4 text-3xl font-bold text-green-500">
                R$ {product.price}
              </p>

              <p className="mt-3 text-zinc-400">
                Estoque: {product.available_quantity}
              </p>

              <p className="mt-2 text-zinc-400">
                Status: {product.status}
              </p>

              <a
                href={product.permalink}
                target="_blank"
                className="mt-6 block rounded-xl bg-yellow-500 px-4 py-3 text-center font-bold text-black"
              >
                Ver anúncio
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}