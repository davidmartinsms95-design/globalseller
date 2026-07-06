'use client'

import { useEffect, useState } from 'react'

import SupplierTable from '@/components/admin/suppliers/SupplierTable'
import SupplierSearch from '@/components/admin/suppliers/SupplierSearch'
import SupplierForm from '@/components/admin/suppliers/SupplierForm'

interface Supplier {
  id: string
  companyName: string
  email: string
  phone?: string
  createdAt: string
  _count: {
    products: number
  }
}

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')

  const [showForm, setShowForm] = useState(false)

  const [selectedSupplier, setSelectedSupplier] =
    useState<Supplier | null>(null)

  async function loadSuppliers() {
    setLoading(true)

    try {
      const response = await fetch(
        '/api/admin/suppliers'
      )

      const data = await response.json()

      setSuppliers(data.suppliers || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSuppliers()
  }, [])

  async function deleteSupplier(id: string) {
    const confirmDelete = confirm(
      'Deseja realmente excluir este fornecedor?'
    )

    if (!confirmDelete) return

    try {
      const response = await fetch(
        `/api/admin/suppliers/${id}`,
        {
          method: 'DELETE',
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      await loadSuppliers()

      alert('Fornecedor removido com sucesso!')
    } catch (error) {
      console.error(error)

      alert('Erro ao excluir fornecedor.')
    }
  }

  function handleEdit(supplier: Supplier) {
    setSelectedSupplier(supplier)
    setShowForm(true)
  }

  function handleNewSupplier() {
    setSelectedSupplier(null)
    setShowForm(true)
  }

  function handleSuccess() {
    setShowForm(false)
    setSelectedSupplier(null)

    loadSuppliers()
  }

  function handleCancel() {
    setShowForm(false)
    setSelectedSupplier(null)
  }

  return (
    <div className="space-y-8">
              <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Fornecedores
          </h1>

          <p className="mt-2 text-zinc-400">
            Gerencie todos os fornecedores do Marketplace.
          </p>
        </div>

        <button
          onClick={handleNewSupplier}
          className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-400"
        >
          + Novo Fornecedor
        </button>
      </div>

      <SupplierSearch
        value={search}
        onChange={setSearch}
      />

      {showForm && (
        <SupplierForm
          supplier={selectedSupplier}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      )}

      <SupplierTable
        suppliers={suppliers}
        loading={loading}
        search={search}
        onDelete={deleteSupplier}
        onEdit={handleEdit}
      />
          </div>
  )
}