import {
  Link2,
  Package,
  Bot,
  ShoppingBag,
} from 'lucide-react'

const steps = [
  {
    icon: Link2,
    title: 'Conecte seus marketplaces',
    description:
      'Integre Mercado Livre, Shopee, Amazon e outras plataformas em poucos cliques.',
  },
  {
    icon: Package,
    title: 'Importe produtos',
    description:
      'Escolha produtos de fornecedores globais sem precisar manter estoque.',
  },
  {
    icon: Bot,
    title: 'IA otimiza seus anúncios',
    description:
      'Crie títulos, descrições, categorias e preços automaticamente.',
  },
  {
    icon: ShoppingBag,
    title: 'Venda e acompanhe tudo',
    description:
      'Gerencie pedidos, produtos e lucro em um único painel.',
  },
]

export default function HowItWorksSection() {
  return (
    <section
      id="como-funciona"
      className="border-t border-zinc-800 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-5xl font-bold">
            Como funciona
          </h2>

          <p className="mt-5 text-xl text-zinc-400">
            Em apenas quatro passos você já pode começar a vender.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon

            return (
              <div
                key={step.title}
                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition hover:-translate-y-2 hover:border-orange-500"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/15">
                  <Icon
                    size={30}
                    className="text-orange-500"
                  />
                </div>

                <h3 className="text-2xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-4 leading-8 text-zinc-400">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}