'use client'

import { useEffect, useState } from 'react'

import MarketplaceProductTable from '@/components/admin/marketplace-products/MarketplaceProductTable'
import MarketplaceProductSearch from '@/components/admin/marketplace-products/MarketplaceProductSearch'
import MarketplaceProductForm from '@/components/admin/marketplace-products/MarketplaceProductForm'

interface Supplier {
  id: string
  companyName: string
}

interface Product {
  id: string
  title: string
  description: string | null
  costPrice: number
  suggestedPrice: number
  stock: number
  image: string | null
  supplierId: string
  supplier: {
    companyName: string
  }
}
export default function MarketplaceProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [suppliers, setSuppliers] = useState<Supplier[]>([])

  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')

  const [showForm, setShowForm] = useState(false)

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null)

  async function loadProducts() {
    try {
      const response = await fetch(
        '/api/admin/marketplace-products'
      )

      const data = await response.json()

      setProducts(data.products || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function loadSuppliers() {
    try {
      const response = await fetch(
        '/api/admin/suppliers'
      )

      const data = await response.json()

      setSuppliers(data.suppliers || [])
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadProducts()
    loadSuppliers()
  }, [])
    async function deleteProduct(id: string) {
    const confirmDelete = confirm(
      'Deseja realmente excluir este produto?'
    )

    if (!confirmDelete) return

    try {
      const response = await fetch(
        `/api/admin/marketplace-products/${id}`,
        {
          method: 'DELETE',
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      await loadProducts()

      alert('Produto removido com sucesso!')
    } catch (error) {
      console.error(error)

      alert('Erro ao excluir produto.')
    }
  }

  function handleEdit(product: Product) {
    setSelectedProduct(product)
    setShowForm(true)
  }

  function handleNewProduct() {
    setSelectedProduct(null)
    setShowForm(true)
  }

  function handleSuccess() {
    setShowForm(false)
    setSelectedProduct(null)

    loadProducts()
  }

  function handleCancel() {
    setShowForm(false)
    setSelectedProduct(null)
  }
    return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Produtos do Marketplace
          </h1>

          <p className="mt-2 text-zinc-400">
            Gerencie todos os produtos disponíveis para os revendedores.
          </p>
        </div>

        <button
          onClick={handleNewProduct}
          className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-400"
        >
          + Novo Produto
        </button>
      </div>

      <MarketplaceProductSearch
        value={search}
        onChange={setSearch}
      />

      {showForm && (
        <MarketplaceProductForm
          product={selectedProduct}
          suppliers={suppliers}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      )}

      <MarketplaceProductTable
        products={products}
        loading={loading}
        search={search}
        onEdit={handleEdit}
        onDelete={deleteProduct}
      />
          </div>
  )
}