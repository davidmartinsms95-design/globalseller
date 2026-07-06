import { Crown } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import { authOptions } from '../../lib/auth'

import SidebarItem from '@/components/dashboard/SidebarItem'
import TopBar from '@/components/dashboard/TopBar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect('/login')
  }

  const user = {
    plan: 'free',
    maxProducts: 5,
  }

  return (
    <div className="flex min-h-screen bg-[#09090b] text-white">

      <aside className="w-72 border-r border-zinc-800 bg-black">

        <div className="border-b border-zinc-800 p-8">
          <h1 className="text-3xl font-bold text-orange-500">
            GlobalSeller
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Plataforma Multi Marketplace
          </p>
        </div>

        <div className="space-y-2 p-6">

          <SidebarItem
            href="/dashboard"
            label="Dashboard"
            icon="dashboard"
          />

          <SidebarItem
            href="/dashboard/products"
            label="Produtos"
            icon="products"
          />

          <SidebarItem
            href="/dashboard/orders"
            label="Pedidos"
            icon="orders"
          />

          <SidebarItem
            href="/dashboard/marketplace"
            label="Marketplace"
            icon="marketplace"
          />

          <SidebarItem
            href="/dashboard/finance"
            label="Financeiro"
            icon="finance"
          />

          <SidebarItem
            href="/dashboard/integrations"
            label="Integrações"
            icon="integrations"
          />

<SidebarItem
  href="/dashboard/operations"
  label="Operations"
  icon="operations"
/>
 
          <SidebarItem
            href="/dashboard/admin"
            label="Administração"
            icon="admin"
          />

          <SidebarItem
            href="/"
            label="Landing Page"
            icon="home"
          />

        </div>

        <div className="mx-6 mt-10 rounded-3xl border border-orange-500/20 bg-orange-500/10 p-6">

          <div className="mb-3 flex items-center gap-2">
            <Crown
              size={20}
              className="text-orange-400"
            />

            <span className="text-sm text-orange-300">
              Plano Atual
            </span>
          </div>

          <h2 className="text-3xl font-bold uppercase">
            {user.plan}
          </h2>

          <p className="mt-2 text-sm text-zinc-300">
            {user.plan === 'pro'
              ? 'Produtos ilimitados.'
              : `Até ${user.maxProducts} produtos publicados.`}
          </p>

          <a
            href="/dashboard/plans"
            className="mt-6 block rounded-xl bg-orange-500 py-3 text-center font-bold transition hover:bg-orange-400"
          >
            {user.plan === 'pro'
              ? 'Gerenciar Plano'
              : 'Upgrade PRO'}
          </a>

        </div>

        <div className="mx-6 mt-6 rounded-2xl bg-zinc-900 p-5">

          <p className="text-sm text-zinc-500">
            Usuário conectado
          </p>

          <p className="mt-2 break-all font-semibold">
            {session.user.email}
          </p>

        </div>

      </aside>

      <main className="flex-1 overflow-auto p-10">

        <TopBar />

        {children}

      </main>

    </div>
  )
}