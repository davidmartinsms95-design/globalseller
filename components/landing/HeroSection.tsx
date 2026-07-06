import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  Boxes,
  ShoppingCart,
  TrendingUp,
} from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-400">
            <Bot size={16} />
            Inteligência Artificial integrada
          </div>

          <h1 className="text-5xl font-extrabold leading-tight lg:text-7xl">
            Venda sem estoque nos maiores marketplaces.
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-9 text-zinc-400">
            Importe produtos de fornecedores globais, publique automaticamente
            em vários marketplaces e utilize IA para criar anúncios,
            precificar produtos e aumentar suas vendas.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="flex items-center gap-2 rounded-2xl bg-orange-500 px-8 py-4 font-bold text-white transition hover:bg-orange-400"
            >
              Começar Grátis
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/login"
              className="rounded-2xl border border-zinc-700 px-8 py-4 font-bold transition hover:bg-zinc-900"
            >
              Entrar
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-8">
            <div>
              <h3 className="text-4xl font-bold">14+</h3>
              <p className="mt-2 text-zinc-400">
                Marketplaces
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">10+</h3>
              <p className="mt-2 text-zinc-400">
                Fornecedores
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">IA</h3>
              <p className="mt-2 text-zinc-400">
                Automatizando vendas
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-zinc-400">
                Dashboard GlobalSeller
              </p>

              <h2 className="mt-2 text-4xl font-bold">
                Tudo em um só lugar
              </h2>
            </div>

            <TrendingUp
              size={42}
              className="text-green-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-black p-5">
              <div className="flex items-center gap-3">
                <ShoppingCart className="text-orange-500" />
                <span>Pedidos Hoje</span>
              </div>

              <strong>124</strong>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-black p-5">
              <div className="flex items-center gap-3">
                <Boxes className="text-orange-500" />
                <span>Produtos</span>
              </div>

              <strong>2.384</strong>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-black p-5">
              <span>Mercado Livre</span>
              <span className="text-green-500">
                Conectado
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-black p-5">
              <span>Shopee</span>
              <span className="text-yellow-400">
                Em breve
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-black p-5">
              <span>Amazon</span>
              <span className="text-yellow-400">
                Em breve
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-black p-5">
              <span>IA GlobalSeller</span>

              <span className="text-green-500">
                Ativa
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}