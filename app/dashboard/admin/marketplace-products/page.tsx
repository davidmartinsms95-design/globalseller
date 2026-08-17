'use client'

import {
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  History,
  Package,
  Upload,
} from 'lucide-react'

import MarketplaceImport from '@/components/admin/marketplace-products/MarketplaceImport'
import MarketplaceImportHistory from '@/components/admin/marketplace-products/MarketplaceImportHistory'
import MarketplaceProductForm from '@/components/admin/marketplace-products/MarketplaceProductForm'
import MarketplaceProductSearch from '@/components/admin/marketplace-products/MarketplaceProductSearch'
import MarketplaceProductTable from '@/components/admin/marketplace-products/MarketplaceProductTable'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { toast } from 'sonner'

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
  const [products, setProducts] =
    useState<Product[]>([])

  const [suppliers, setSuppliers] =
    useState<Supplier[]>([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState('')

  const [showForm, setShowForm] =
    useState(false)

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null)

  const editFormRef =
    useRef<HTMLDivElement | null>(null)

  const [activeTab, setActiveTab] =
    useState<
      'products' |
      'import' |
      'history'
    >('products')

  const [confirmOpen, setConfirmOpen] =
    useState(false)

  const [productToDelete, setProductToDelete] =
    useState<Product | null>(null)

  const [deleting, setDeleting] =
    useState(false)

  async function loadProducts() {
    try {
      const response = await fetch(
        '/api/admin/marketplace-products'
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

  async function loadSuppliers() {
    try {
      const response = await fetch(
        '/api/admin/suppliers'
      )

      const data =
        await response.json()

      setSuppliers(
        data.suppliers || []
      )
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadProducts()
    loadSuppliers()
  }, [])

  useEffect(() => {
    if (!showForm) return

    const timeout = setTimeout(() => {
      editFormRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 100)

    return () => clearTimeout(timeout)
  }, [showForm, selectedProduct])

  async function deleteProduct(id: string) {
    const product = products.find(
      (item) => item.id === id
    )

    if (!product) return

    setProductToDelete(product)
    setConfirmOpen(true)
  }

  async function confirmDelete() {
    if (!productToDelete) return

    setDeleting(true)

    try {
      const response = await fetch(
        `/api/admin/marketplace-products/${productToDelete.id}`,
        {
          method: 'DELETE',
        }
      )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      await loadProducts()

      toast.success(
        'Produto excluído com sucesso!'
      )

      setConfirmOpen(false)
      setProductToDelete(null)
    } catch (error) {
      console.error(error)

      toast.error(
        'Erro ao excluir produto.'
      )
    } finally {
      setDeleting(false)
    }
  }

  function handleEdit(
    product: Product
  ) {
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

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() =>
                setActiveTab('products')
              }
              className={`flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-200 ${
                activeTab === 'products'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <Package size={18} />
              Produtos
            </button>

            <button
              onClick={() =>
                setActiveTab('import')
              }
              className={`flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-200 ${
                activeTab === 'import'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <Upload size={18} />
              Importações
            </button>

            <button
              onClick={() =>
                setActiveTab('history')
              }
              className={`flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-200 ${
                activeTab === 'history'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <History size={18} />
              Histórico
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleNewProduct}
            className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-400"
          >
            + Novo Produto
          </button>
        </div>
      </div>

      {activeTab === 'products' && (
        <>
          <MarketplaceProductSearch
            value={search}
            onChange={setSearch}
          />

          <MarketplaceProductTable
            products={products}
            loading={loading}
            search={search}
            onEdit={handleEdit}
            onDelete={deleteProduct}
          />
        </>
      )}

      {activeTab === 'import' && (
        <MarketplaceImport
          suppliers={suppliers}
          onSuccess={() => {
            loadProducts()
          }}
        />
      )}

      {activeTab === 'history' && (
        <MarketplaceImportHistory />
      )}

      {showForm && (
        <div
          ref={editFormRef}
          className="scroll-mt-6"
        >
          <MarketplaceProductForm
            product={selectedProduct}
            suppliers={suppliers}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Excluir produto"
        description={
          productToDelete
            ? `Tem certeza que deseja excluir "${productToDelete.title}"?`
            : ''
        }
        confirmText="Excluir"
        cancelText="Cancelar"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => {
          setConfirmOpen(false)
          setProductToDelete(null)
        }}
      />
    </div>
  )
}