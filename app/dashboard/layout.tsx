import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'
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
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-orange-500">
            GlobalSeller
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Plataforma SaaS
          </p>
        </div>

        <nav className="space-y-3">
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
  href="/dashboard/marketplace"
  className="block rounded-xl px-4 py-3 transition hover:bg-zinc-900"
>
  Marketplace
</a>
          <a
            href="/dashboard/orders"
            className="block rounded-xl px-4 py-3 transition hover:bg-zinc-900"
          >
            Pedidos
          </a>
          <a
  href="/dashboard/integrations"
  className="block rounded-xl px-4 py-3 transition hover:bg-zinc-900"
>
  Integrações
</a>

          <a
            href="/dashboard/plans"
            className="block rounded-xl bg-orange-500 px-4 py-3 font-bold text-white transition hover:bg-orange-400"
          >
            Upgrade PRO
          </a>

          <a
            href="/"
            className="block rounded-xl px-4 py-3 transition hover:bg-zinc-900"
          >
            Loja
          </a>
        </nav>

        <div className="mt-16 rounded-3xl border border-orange-500/20 bg-orange-500/10 p-5">
          <p className="text-sm text-orange-300">
            Plano Atual
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            FREE
          </h2>

          <p className="mt-3 text-sm text-zinc-300">
            Máximo de 5 produtos
          </p>
        </div>

        <div className="mt-6 rounded-2xl bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">
            Logado como
          </p>

          <p className="mt-2 font-bold break-all">
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

