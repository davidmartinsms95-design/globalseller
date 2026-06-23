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

export default function MercadoLivrePage() {
  const [products, setProducts] =
    useState<Product[]>([])

  const [loading, setLoading] =
    useState(true)

  async function loadProducts() {
    try {
      const response = await fetch(
        '/api/integrations/mercadolivre/products'
      )

      const data = await response.json()

if (Array.isArray(data)) {
  setProducts(data)
} else {
  console.log('ERRO ML:', data)
  setProducts([])
}

      setLoading(false)
    } catch (error) {
      console.log(error)

      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-yellow-400">
          Mercado Livre
        </h1>

        <p className="mt-4 text-zinc-400">
          Produtos sincronizados da sua conta
          Mercado Livre.
        </p>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10">
          <p className="text-xl text-zinc-400">
            Importando produtos...
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10">
          <p className="text-xl text-zinc-400">
            Nenhum produto encontrado.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-[32px] border border-zinc-800 bg-zinc-900"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-72 w-full object-cover"
              />

              <div className="p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {product.title}
                    </h2>

                    <p className="mt-2 text-zinc-400">
                      ID:
                      {' '}
                      {product.id}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-yellow-400 px-4 py-2 font-bold text-black">
                    Mercado Livre
                  </div>
                </div>

                <div className="mb-8 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-black p-4">
                    <p className="text-sm text-zinc-400">
                      Preço
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-green-500">
                      R$ {product.price}
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-black p-4">
                    <p className="text-sm text-zinc-400">
                      Estoque
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-white">
                      {product.available_quantity}
                    </h3>
                  </div>
                </div>

                <div className="mb-8">
                  <div
                    className={`
                      inline-flex rounded-full px-4 py-2 font-bold
                      ${
                        product.status === 'active'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }
                    `}
                  >
                    {product.status}
                  </div>
                </div>

                <a
                  href={product.permalink}
                  target="_blank"
                  className="block w-full rounded-2xl bg-yellow-400 px-6 py-4 text-center font-bold text-black transition hover:bg-yellow-300"
                >
                  Abrir anúncio
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

