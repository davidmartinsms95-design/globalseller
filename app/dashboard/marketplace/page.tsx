'use client'

import { useEffect, useState } from 'react'

interface MarketplaceProduct {
  id: string
  title: string
  description: string
  suggestedPrice: number
  stock: number
  image: string
}

export default function MarketplacePage() {
  const [products, setProducts] = useState<
    MarketplaceProduct[]
  >([])

  async function addToCatalog(
  marketplaceProductId: string
) {
  const response = await fetch(
    '/api/marketplace/add',
    {
      method: 'POST',
      headers: {
        'Content-Type':
          'application/json',
      },
      body: JSON.stringify({
        marketplaceProductId,
      }),
    }
  )

  const data =
    await response.json()

  alert(
    data.message ||
      'Produto adicionado ao catálogo'
  )
}

  async function loadProducts() {
  try {
    const response = await fetch(
      '/api/marketplace'
    )

    const result =
      await response.json()

    console.log(
      'MARKETPLACE API:',
      result
    )

    setProducts(result.products || [])
  } catch (error) {
    console.error(error)
  }
}

useEffect(() => {
  loadProducts()
}, [])

  return (
    <div className="p-10">
      <h1 className="mb-10 text-5xl font-bold text-white">
        Marketplace
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-64 w-full object-cover"
            />

            <div className="p-6">
              <h2 className="text-xl font-bold text-white">
                {product.title}
              </h2>

              <p className="mt-3 text-zinc-400">
                {product.description}
              </p>

              <p className="mt-4 text-3xl font-bold text-green-500">
                R$ {product.suggestedPrice}
              </p>

              <p className="mt-2 text-zinc-400">
                Estoque: {product.stock}
              </p>

              <button
  onClick={() =>
    addToCatalog(product.id)
  }
  className="mt-6 w-full rounded-xl bg-orange-500 px-4 py-3 font-bold text-white"
>
  Adicionar ao meu catálogo
</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

