import Link from 'next/link'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function HomePage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
          <h1 className="text-3xl font-bold text-yellow-400">
            GlobalSeller
          </h1>

          <Link
            href="/dashboard"
            className="rounded-2xl bg-yellow-400 px-5 py-3 font-bold text-black transition hover:bg-yellow-300"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-8 py-16">
        <div className="mb-14">
          <h2 className="text-6xl font-bold">
            Produtos em destaque
          </h2>

          <p className="mt-4 text-xl text-zinc-400">
            Descubra os melhores produtos da plataforma
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition hover:scale-[1.02]"
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
                <h3 className="text-2xl font-bold">
                  {product.title}
                </h3>

                <p className="mt-2 text-zinc-400">
                  {product.category}
                </p>

                <p className="mt-6 text-4xl font-bold text-yellow-400">
                  R$ {product.price}
                </p>

                <Link
                  href={`/product/${product.id}`}
                  className="mt-6 block w-full rounded-2xl bg-yellow-400 px-4 py-4 text-center font-bold text-black transition hover:bg-yellow-300"
                >
                  Ver Produto
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}