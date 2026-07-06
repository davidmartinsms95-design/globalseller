import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login')
  }

  if ((session.user as any).role !== 'admin') {
    redirect('/dashboard')
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Administração
        </h1>

        <p className="mt-2 text-zinc-400">
          Painel administrativo do GlobalSeller.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-bold">
            🏢 Fornecedores
          </h2>

          <p className="mt-3 text-zinc-400">
            Gerenciar fornecedores.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-bold">
            📦 Marketplace
          </h2>

          <p className="mt-3 text-zinc-400">
            Produtos disponíveis.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-bold">
            👥 Usuários
          </h2>

          <p className="mt-3 text-zinc-400">
            Administração de contas.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-bold">
            📊 Relatórios
          </h2>

          <p className="mt-3 text-zinc-400">
            Estatísticas da plataforma.
          </p>
        </div>
      </div>
    </div>
  )
}