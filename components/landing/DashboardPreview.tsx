import {
  BarChart3,
  DollarSign,
  Package,
  ShoppingCart,
  Bot,
} from 'lucide-react'

export default function DashboardPreview() {
  return (
    <section className="border-t border-zinc-800 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <h2 className="text-5xl font-bold">
            Gerencie tudo em um único painel
          </h2>

          <p className="mt-5 text-xl text-zinc-400">
            Controle vendas, produtos, pedidos, IA e integrações em tempo real.
          </p>

        </div>

        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-2xl bg-black p-6">
              <div className="flex items-center gap-3">
                <DollarSign className="text-green-500" />
                <span className="text-zinc-400">
                  Receita Hoje
                </span>
              </div>

              <h3 className="mt-4 text-3xl font-bold">
                R$ 18.540
              </h3>
            </div>

            <div className="rounded-2xl bg-black p-6">
              <div className="flex items-center gap-3">
                <ShoppingCart className="text-orange-500" />
                <span className="text-zinc-400">
                  Pedidos
                </span>
              </div>

              <h3 className="mt-4 text-3xl font-bold">
                124
              </h3>
            </div>

            <div className="rounded-2xl bg-black p-6">
              <div className="flex items-center gap-3">
                <Package className="text-blue-500" />
                <span className="text-zinc-400">
                  Produtos
                </span>
              </div>

              <h3 className="mt-4 text-3xl font-bold">
                2.384
              </h3>
            </div>

            <div className="rounded-2xl bg-black p-6">
              <div className="flex items-center gap-3">
                <Bot className="text-purple-500" />
                <span className="text-zinc-400">
                  IA
                </span>
              </div>

              <h3 className="mt-4 text-3xl font-bold">
                Ativa
              </h3>
            </div>

          </div>

          <div className="mt-10 rounded-3xl bg-black p-8">

            <div className="mb-6 flex items-center gap-3">
              <BarChart3
                className="text-orange-500"
              />

              <h3 className="text-2xl font-bold">
                Crescimento das vendas
              </h3>
            </div>

            <div className="flex h-56 items-end gap-4">

              {[35, 50, 45, 65, 70, 90, 110].map(
                (value, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-xl bg-gradient-to-t from-orange-500 to-orange-300"
                    style={{
                      height: `${value}%`,
                    }}
                  />
                )
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}