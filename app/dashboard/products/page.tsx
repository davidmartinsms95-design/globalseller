'use client'

import { useEffect, useMemo, useState } from 'react'

import Card from '@/components/ui/Card'
import PageHeader from '@/components/ui/PageHeader'
import ProductCard from '@/components/dashboard/products/ProductCard'
import ProductDashboard from '@/components/dashboard/products/ProductDashboard'

import {
  Package,
  Search,
  Brain,
} from 'lucide-react'

interface Product {
  id: string

  productId: string | null

  marketplaceId?: string | null

  permalink?: string | null

  status?: string | null

  customPrice?: number

  active: boolean

  marketplaceProduct: {
    id: string

    title: string

    description?: string

    costPrice: number

    suggestedPrice: number

    image?: string

    stock: number

    supplier: {
      companyName: string
    }
  }
}

function calculateHealth(product: Product) {
  let score = 100

  if (
    product.marketplaceProduct.title.length <
    60
  ) {
    score -= 15
  }

  if (
    !product.marketplaceProduct.description ||
    product.marketplaceProduct.description.length <
      300
  ) {
    score -= 20
  }

  if (!product.marketplaceProduct.image) {
    score -= 15
  }

  if (
    product.marketplaceProduct.stock <= 0
  ) {
    score -= 20
  }

  if (!product.active) {
    score -= 15
  }

  return Math.max(score, 0)
}

function getHealthVariant(
  score: number
):
  | 'success'
  | 'warning'
  | 'error' {
  if (score >= 85) {
    return 'success'
  }

  if (score >= 60) {
    return 'warning'
  }

  return 'error'
}

export default function ProductsPage() {
  const [products, setProducts] =
    useState<Product[]>([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState('')

  async function loadProducts() {
    try {
      const response = await fetch(
        '/api/my-products'
      )

      const data =
        await response.json()

      setProducts(
        data.products || []
      )
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const filteredProducts =
    useMemo(() => {
      return products.filter(
        (product) =>
          product.marketplaceProduct.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      )
    }, [products, search])

  const totalProducts =
    products.length

  const activeProducts =
    products.filter(
      (product) => product.active
    ).length

  const totalStock =
    products.reduce(
      (total, product) =>
        total +
        product.marketplaceProduct.stock,
      0
    )

  const estimatedProfit =
    products.reduce(
      (total, product) => {
        const sellPrice =
          product.customPrice ??
          product.marketplaceProduct
            .suggestedPrice

        return (
          total +
          (sellPrice -
            product.marketplaceProduct
              .costPrice)
        )
      },
      0
    )

  async function savePrice(
    id: string,
    customPrice: number
  ) {
    try {
      const response = await fetch(
        '/api/my-products/update-price',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            id,
            customPrice,
          }),
        }
      )

      const data =
        await response.json()

      if (!data.success) {
        throw new Error(
          data.error
        )
      }
    } catch (error) {
      console.error(error)

      alert(
        'Erro ao atualizar preço.'
      )
    }
  }

  async function publishProduct(
    resellerProductId: string
  ) {
    try {
      const response = await fetch(
        '/api/my-products/publish',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            resellerProductId,
          }),
        }
      )

      const data =
        await response.json()

      if (!data.success) {
        throw new Error(
          data.error
        )
      }

      loadProducts()
    } catch (error) {
      console.error(error)

      alert(
        'Erro ao publicar produto.'
      )
    }
  }

  async function removeProduct(
    id: string
  ) {
    const confirmDelete =
      confirm(
        'Deseja remover este produto?'
      )

    if (!confirmDelete) {
      return
    }

    try {
      const response = await fetch(
        '/api/my-products/remove',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            id,
          }),
        }
      )

      const data =
        await response.json()

      if (!data.success) {
        throw new Error(
          data.error
        )
      }

      setProducts((current) =>
        current.filter(
          (product) =>
            product.id !== id
        )
      )
    } catch (error) {
      console.error(error)

      alert(
        'Erro ao remover produto.'
      )
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-zinc-400">
        Carregando produtos...
      </div>
    )
  }

  return (
    <div className="space-y-8 p-8">
      <PageHeader
        title="Meus Produtos"
        description="Gerencie seu catálogo inteligente."
        badge="Marketplace"
      />

      <ProductDashboard
        totalProducts={totalProducts}
        activeProducts={activeProducts}
        totalStock={totalStock}
        estimatedProfit={
          estimatedProfit
        }
      />

      <Card hover={false}>
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            type="text"
            placeholder="Buscar produto..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            className="
              w-full
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-950
              py-4
              pl-12
              pr-4
              text-white
              outline-none
              transition
              focus:border-orange-500
            "
          />
        </div>
      </Card>

      <div className="grid gap-8 lg:grid-cols-3">
        {filteredProducts.map(
          (product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSavePrice={savePrice}
              onRemove={removeProduct}
              calculateHealth={
                calculateHealth
              }
              getHealthVariant={
                getHealthVariant
              }
            />
          )
        )}
      </div>

      {filteredProducts.length ===
        0 && (
        <Card
          hover={false}
          className="col-span-full py-20"
        >
          <div className="flex flex-col items-center justify-center text-center">
            <Package
              size={56}
              className="mb-6 text-zinc-600"
            />

            <h2 className="text-2xl font-bold text-white">
              Nenhum produto encontrado
            </h2>

            <p className="mt-3 max-w-md text-zinc-400">
              Tente alterar sua busca ou
              adicione novos produtos ao
              seu catálogo.
            </p>
          </div>
        </Card>
      )}

      <Card hover={false}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Resumo Inteligente
            </h2>

            <p className="mt-2 text-zinc-400">
              Visão geral da qualidade do
              catálogo.
            </p>
          </div>

          <Brain
            size={34}
            className="text-orange-500"
          />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-4">
          <div>
            <p className="text-sm text-zinc-500">
              Produtos
            </p>

            <h3 className="mt-2 text-3xl font-bold text-white">
              {totalProducts}
            </h3>
          </div>

          <div>
            <p className="text-sm text-zinc-500">
              Ativos
            </p>

            <h3 className="mt-2 text-3xl font-bold text-green-500">
              {activeProducts}
            </h3>
          </div>

          <div>
            <p className="text-sm text-zinc-500">
              Estoque
            </p>

            <h3 className="mt-2 text-3xl font-bold text-sky-400">
              {totalStock}
            </h3>
          </div>

          <div>
            <p className="text-sm text-zinc-500">
              Lucro Estimado
            </p>

            <h3 className="mt-2 text-3xl font-bold text-emerald-500">
              R${' '}
              {estimatedProfit.toFixed(
                2
              )}
            </h3>
          </div>
        </div>
      </Card>

      <div className="h-8" />
    </div>
  )
}