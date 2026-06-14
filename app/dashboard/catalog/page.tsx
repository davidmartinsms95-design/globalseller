'use client'

import { useEffect, useState } from 'react'

interface CatalogProduct {
  id: string

  title: string

  price: number

  stock: number

  image?: string

  marketplace?: string

  sku?: string

  marketplaceId?: string
}

export default function CatalogPage() {
  const [products, setProducts] =
    useState<CatalogProduct[]>([])

  const [loading, setLoading] =
    useState(true)

  async function loadProducts() {
    try {
      const response = await fetch(
        '/api/products'
      )

      const data = await response.json()

      setProducts(data)

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
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-6xl font-bold text-white">
            Catálogo Central
          </h1>

          <p className="mt-4 text-xl text-zinc-400">
            Produtos sincronizados entre
            marketplaces.
          </p>
        </div>

        <div className="rounded-2xl bg-yellow-400 px-6 py-4 font-bold text-black">
          ERP MULTI-MARKETPLACE
        </div>
      </div>

      {loading ? (
        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-10">
          <p className="text-xl text-zinc-400">
            Carregando catálogo...
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-10">
          <p className="text-xl text-zinc-400">
            Nenhum produto encontrado.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-[32px] border border-zinc-800 bg-zinc-900"
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-72 w-full object-cover"
                />
              ) : (
                <div className="flex h-72 items-center justify-center bg-black text-zinc-500">
                  Sem imagem
                </div>
              )}

              <div className="p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {product.title}
                    </h2>

                    <p className="mt-2 text-zinc-400">
                      SKU:
                      {' '}
                      {product.sku ||
                        'Não definido'}
                    </p>
                  </div>

                  <div
                    className={`
                      rounded-2xl px-4 py-2 font-bold
                      ${
                        product.marketplace ===
                        'shopee'
                          ? 'bg-orange-500 text-white'
                          : product.marketplace ===
                              'mercadolivre'
                            ? 'bg-yellow-400 text-black'
                            : 'bg-zinc-700 text-white'
                      }
                    `}
                  >
                    {product.marketplace ||
                      'Interno'}
                  </div>
                </div>

                <div className="mb-8 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-black p-5">
                    <p className="text-sm text-zinc-400">
                      Preço
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-green-500">
                      R$ {product.price}
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-black p-5">
                    <p className="text-sm text-zinc-400">
                      Estoque
                    </p>

                    <h3
                      className={`mt-2 text-3xl font-bold ${
                        product.stock <= 5
                          ? 'text-red-500'
                          : 'text-white'
                      }`}
                    >
                      {product.stock}
                    </h3>
                  </div>
                </div>

                <div className="mb-8 rounded-2xl bg-black p-5">
                  <p className="text-sm text-zinc-400">
                    Marketplace ID
                  </p>

                  <h3 className="mt-2 break-all text-sm font-bold text-white">
                    {product.marketplaceId ||
                      'Não sincronizado'}
                  </h3>
                </div>

                <div className="mb-8">
                  {product.stock <= 5 ? (
                    <div className="rounded-2xl bg-red-500/20 px-4 py-3 font-bold text-red-400">
                      Estoque crítico
                    </div>
                  ) : (
                    <div className="rounded-2xl bg-green-500/20 px-4 py-3 font-bold text-green-400">
                      Estoque sincronizado
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 rounded-2xl bg-blue-500 px-5 py-4 font-bold text-white transition hover:bg-blue-400">
                    Editar
                  </button>

                  <button className="flex-1 rounded-2xl bg-yellow-400 px-5 py-4 font-bold text-black transition hover:bg-yellow-300">
                    Sincronizar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}