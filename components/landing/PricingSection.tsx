import Link from 'next/link'
import { Check } from 'lucide-react'

const freePlan = [
  'Até 5 produtos',
  'Mercado Livre',
  'Dashboard',
  'Suporte por e-mail',
]

const proPlan = [
  'Produtos ilimitados',
  'Todos os marketplaces',
  'IA completa',
  'Dashboard Premium',
  'Financeiro',
  'Importação automática',
  'Atualização automática de estoque',
  'Suporte prioritário',
]

export default function PricingSection() {
  return (
    <section
      id="planos"
      className="border-t border-zinc-800 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <h2 className="text-5xl font-bold">
            Escolha seu plano
          </h2>

          <p className="mt-5 text-xl text-zinc-400">
            Comece gratuitamente e evolua quando precisar.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

            <h3 className="text-3xl font-bold">
              Free
            </h3>

            <p className="mt-2 text-zinc-400">
              Ideal para começar.
            </p>

            <div className="mt-8 text-5xl font-bold">
              R$ 0
            </div>

            <div className="mt-10 space-y-4">
              {freePlan.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <Check
                    size={20}
                    className="text-green-500"
                  />
                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/register"
              className="mt-10 block rounded-2xl border border-zinc-700 py-4 text-center font-bold transition hover:bg-zinc-800"
            >
              Começar Grátis
            </Link>

          </div>

          <div className="rounded-3xl border-2 border-orange-500 bg-zinc-900 p-8 shadow-[0_0_40px_rgba(249,115,22,0.2)]">

            <div className="mb-4 inline-flex rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white">
              MAIS POPULAR
            </div>

            <h3 className="text-3xl font-bold">
              PRO
            </h3>

            <p className="mt-2 text-zinc-400">
              Para vendedores profissionais.
            </p>

            <div className="mt-8 text-5xl font-bold">
              R$ 49
              <span className="text-xl text-zinc-400">
                /mês
              </span>
            </div>

            <div className="mt-10 space-y-4">
              {proPlan.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <Check
                    size={20}
                    className="text-green-500"
                  />
                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/checkout"
              className="mt-10 block rounded-2xl bg-orange-500 py-4 text-center font-bold text-white transition hover:bg-orange-400"
            >
              Assinar PRO
            </Link>

          </div>

        </div>

      </div>
    </section>
  )
}