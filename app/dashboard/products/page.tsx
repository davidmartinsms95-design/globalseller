import Link from 'next/link'
import prisma from '../../../lib/prisma'

async function handleDelete(id: string) {
  'use server'

  await prisma.product.delete({
    where: {
      id,
    },
  })
}

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold">
            Produtos
          </h1>

          <p className="mt-2 text-zinc-400">
            Gerencie seus produtos
          </p>
        </div>

        <Link
          href="/dashboard/products/new"
          className="rounded-2xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:bg-yellow-300"
        >
          Novo Produto
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900"
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="h-72 w-full object-cover"
              />
            ) : (
              <div className="flex h-72 items-center justify-center bg-zinc-800 text-zinc-500">
                Sem imagem
              </div>
            )}

            <div className="p-6">
              <h2 className="text-2xl font-bold text-white">
                {product.title}
              </h2>

              <p className="mt-2 text-zinc-400">
                Categoria: {product.category}
              </p>

              <p className="mt-4 text-3xl font-bold text-yellow-400">
                R$ {product.price}
              </p>

              <Link
                href={`/dashboard/products/edit/${product.id}`}
                className="mt-6 block w-full rounded-2xl bg-blue-500 px-4 py-3 text-center font-bold transition hover:bg-blue-400"
              >
                Editar
              </Link>

              <form action={handleDelete.bind(null, product.id)}>
                <button
                  type="submit"
                  className="mt-4 w-full rounded-2xl bg-red-500 px-4 py-3 font-bold transition hover:bg-red-400"
                >
                  Excluir
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}