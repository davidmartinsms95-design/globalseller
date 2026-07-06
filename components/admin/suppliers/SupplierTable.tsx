'use client'

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

interface SupplierTableProps {
  suppliers: Supplier[]
  loading: boolean
  search: string
  onDelete: (id: string) => void
  onEdit: (supplier: Supplier) => void
}

export default function SupplierTable({
  suppliers,
  loading,
  search,
  onDelete,
  onEdit,
}: SupplierTableProps) {
  const filteredSuppliers = suppliers.filter((supplier) => {
    const term = search.toLowerCase()

    return (
      supplier.companyName.toLowerCase().includes(term) ||
      supplier.email.toLowerCase().includes(term) ||
      (supplier.phone ?? '').toLowerCase().includes(term)
    )
  })

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      <table className="w-full">
        <thead className="border-b border-zinc-800 bg-zinc-950">
          <tr className="text-left">
            <th className="p-5">Empresa</th>
            <th className="p-5">E-mail</th>
            <th className="p-5">Telefone</th>
            <th className="p-5 text-center">Produtos</th>
            <th className="p-5 text-center">Ações</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={5}
                className="p-8 text-center text-zinc-400"
              >
                Carregando fornecedores...
              </td>
            </tr>
          ) : filteredSuppliers.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="p-8 text-center text-zinc-400"
              >
                Nenhum fornecedor encontrado.
              </td>
            </tr>
          ) : (
            filteredSuppliers.map((supplier) => (
              <tr
                key={supplier.id}
                className="border-b border-zinc-800 transition hover:bg-zinc-800/40"
              >
                <td className="p-5 font-semibold">
                  {supplier.companyName}
                </td>

                <td className="p-5 text-zinc-300">
                  {supplier.email}
                </td>

                <td className="p-5 text-zinc-300">
                  {supplier.phone || '-'}
                </td>

                <td className="p-5 text-center">
                  {supplier._count.products}
                </td>

                <td className="p-5">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(supplier)}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => onDelete(supplier.id)}
                      className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}