'use client'

import { useEffect, useState } from 'react'

interface Supplier {
  id?: string
  companyName: string
  email: string
  phone?: string
}

interface SupplierFormProps {
  supplier: Supplier | null
  onSuccess: () => void
  onCancel: () => void
}

export default function SupplierForm({
  supplier,
  onSuccess,
  onCancel,
}: SupplierFormProps) {
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (supplier) {
      setCompanyName(supplier.companyName)
      setEmail(supplier.email)
      setPhone(supplier.phone || '')
    } else {
      setCompanyName('')
      setEmail('')
      setPhone('')
    }
  }, [supplier])

  async function handleSubmit() {
    if (!companyName.trim()) {
      alert('Informe o nome da empresa.')
      return
    }

    if (!email.trim()) {
      alert('Informe o e-mail.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        supplier
          ? `/api/admin/suppliers/${supplier.id}`
          : '/api/admin/suppliers',
        {
          method: supplier ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            companyName,
            email,
            phone,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.message)
      }

      onSuccess()
    } catch (error) {
      console.error(error)
      alert('Erro ao salvar fornecedor.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-2xl font-bold">
        {supplier ? 'Editar Fornecedor' : 'Novo Fornecedor'}
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Empresa
          </label>

          <input
            value={companyName}
            onChange={(e) =>
              setCompanyName(e.target.value)
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            E-mail
          </label>

          <input
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-zinc-400">
            Telefone
          </label>

          <input
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-400 disabled:opacity-50"
        >
          {loading
            ? 'Salvando...'
            : supplier
            ? 'Atualizar'
            : 'Cadastrar'}
        </button>

        <button
          onClick={onCancel}
          className="rounded-xl bg-zinc-700 px-6 py-3 font-bold text-white transition hover:bg-zinc-600"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}