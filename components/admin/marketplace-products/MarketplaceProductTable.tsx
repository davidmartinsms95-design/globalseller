'use client'

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

interface MarketplaceProductTableProps {
  products: Product[]
  loading: boolean
  search: string
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
}

export default function MarketplaceProductTable({
  products,
  loading,
  search,
  onEdit,
  onDelete,
}: MarketplaceProductTableProps) {
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      <table className="w-full">
        <thead className="border-b border-zinc-800">
          <tr className="text-left">
            <th className="p-5">Produto</th>
            <th className="p-5">Fornecedor</th>
            <th className="p-5">Custo</th>
            <th className="p-5">Venda</th>
            <th className="p-5">Estoque</th>
            <th className="p-5 text-center">Ações</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={6}
                className="p-8 text-center text-zinc-400"
              >
                Carregando produtos...
              </td>
            </tr>
          ) : filteredProducts.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="p-8 text-center text-zinc-400"
              >
                Nenhum produto encontrado.
              </td>
            </tr>
          ) : (
            filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b border-zinc-800 hover:bg-zinc-800/40"
              >
                <td className="p-5 font-semibold text-white">
                  {product.title}
                </td>

                <td className="p-5 text-zinc-300">
                  {product.supplier.companyName}
                </td>

                <td className="p-5">
                  R$ {product.costPrice.toFixed(2)}
                </td>

                <td className="p-5 font-bold text-green-500">
                  R$ {product.suggestedPrice.toFixed(2)}
                </td>

                <td className="p-5">
                  {product.stock}
                </td>

                <td className="p-5">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => onDelete(product.id)}
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