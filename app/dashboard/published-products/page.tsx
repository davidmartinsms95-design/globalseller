'use client'

import { useEffect, useState } from 'react'
import PublishedProductActions from '@/components/dashboard/PublishedProductActions'

interface Product {
  id: string
  title: string
  image: string | null
  price: number
  stock: number
  status: string | null
  permalink: string | null
  marketplaceId: string | null
  createdAt: string
}

export default function PublishedProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const activeProducts = products.filter(
  p => p.status === 'active' || p.status === 'Ativo'
).length

const reviewProducts = products.filter(
  p => p.status === 'under_review'
).length

const pausedProducts = products.filter(
  p => p.status === 'paused'
).length

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    try {
      const response = await fetch('/api/published-products')
      const data = await response.json()

      setProducts(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        Carregando anúncios...
      </div>
    )
  }

  return (
    <div className="p-6">

      <div className="mb-8">

  <div className="flex items-center justify-between">

    <h1 className="text-4xl font-bold text-white">
      Produtos Publicados
    </h1>

    <span className="rounded-xl bg-orange-500 px-4 py-2 font-bold text-white">
      {products.length} anúncios
    </span>

  </div>

  <div className="mt-6 grid gap-4 md:grid-cols-3">

    <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-5">

      <p className="text-sm text-zinc-400">
        Ativos
      </p>

      <h2 className="mt-2 text-3xl font-bold text-green-400">
        {activeProducts}
      </h2>

    </div>

    <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-5">

      <p className="text-sm text-zinc-400">
        Em revisão
      </p>

      <h2 className="mt-2 text-3xl font-bold text-yellow-400">
        {reviewProducts}
      </h2>

    </div>

    <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5">

      <p className="text-sm text-zinc-400">
        Pausados
      </p>

      <h2 className="mt-2 text-3xl font-bold text-red-400">
        {pausedProducts}
      </h2>

    </div>

  </div>

</div>

      <div className="overflow-x-auto rounded-xl border">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">
                Produto
              </th>

              <th className="text-left p-4">
                Preço
              </th>

              <th className="text-left p-4">
                Estoque
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-left p-4">
                Marketplace
              </th>

              <th className="text-left p-4">
                Ações
              </th>

            </tr>

          </thead>

          <tbody>

            {products.map(product => (

              <tr
                key={product.id}
                className="border-t"
              >

                <td className="p-4">

                  <div className="flex items-center gap-3">

                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-lg bg-gray-200" />
                    )}

                    <div>

                      <div className="font-semibold">
                        {product.title}
                      </div>

                      <div className="text-xs text-gray-500">
                        {product.marketplaceId}
                      </div>

                    </div>

                  </div>

                </td>

                <td className="p-4">
                  R$ {product.price.toFixed(2)}
                </td>

                <td className="p-4">
                  {product.stock}
                </td>

                <td className="p-4">

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">

                    {product.status ?? 'Sem status'}

                  </span>

                </td>

<td className="p-4">
  <PublishedProductActions
  productId={product.id}
  permalink={product.permalink}
  status={product.status}
/>
</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}