import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient()

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  })

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Produto não encontrado
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-10 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full rounded-3xl"
          />
        </div>

        <div>
          <p className="mb-3 text-yellow-400">
            {product.category}
          </p>

          <h1 className="mb-6 text-5xl font-bold">
            {product.title}
          </h1>

          <p className="mb-8 text-4xl font-bold">
            R$ {product.price}
          </p>

          <Link
            href={`/checkout/${product.id}`}
            className="rounded-2xl bg-yellow-400 px-8 py-4 font-bold text-black"
          >
            Comprar Agora
          </Link>
        </div>
      </div>
    </div>
  )
}