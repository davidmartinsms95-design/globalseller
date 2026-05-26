import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen bg-[#0f0f12] text-white">
      <aside className="w-72 border-r border-zinc-800 bg-black p-8">
        <h1 className="mb-10 text-3xl font-bold text-orange-500">
          GlobalSeller
        </h1>

        <nav className="space-y-4">
          <a
            href="/dashboard"
            className="block rounded-xl px-4 py-3 transition hover:bg-zinc-900"
          >
            Dashboard
          </a>

          <a
            href="/dashboard/products"
            className="block rounded-xl px-4 py-3 transition hover:bg-zinc-900"
          >
            Produtos
          </a>

          <a
            href="/dashboard/orders"
            className="block rounded-xl px-4 py-3 transition hover:bg-zinc-900"
          >
            Pedidos
          </a>

          <a
            href="/"
            className="block rounded-xl px-4 py-3 transition hover:bg-zinc-900"
          >
            Loja
          </a>
        </nav>

        <div className="mt-16 rounded-2xl bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">
            Logado como
          </p>

          <p className="mt-2 font-bold">
            {session.user?.email}
          </p>
        </div>
      </aside>

      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  )
}