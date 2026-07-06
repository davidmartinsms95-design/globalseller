import {
  Bot,
  FileText,
  BadgeDollarSign,
  Search,
  Sparkles,
  Tags,
} from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: 'Descrições Inteligentes',
    description: 'Crie descrições completas e otimizadas automaticamente.',
  },
  {
    icon: Sparkles,
    title: 'Títulos Otimizados',
    description: 'Gere títulos que aumentam a taxa de cliques.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Precificação Inteligente',
    description: 'Sugestões automáticas para maximizar seu lucro.',
  },
  {
    icon: Search,
    title: 'SEO para Marketplaces',
    description: 'Palavras-chave para melhorar a posição dos anúncios.',
  },
  {
    icon: Tags,
    title: 'Categorias Automáticas',
    description: 'A IA identifica a categoria ideal para cada produto.',
  },
  {
    icon: Bot,
    title: 'Assistente IA',
    description: 'Seu copiloto para vender mais e economizar tempo.',
  },
]

export default function AISection() {
  return (
    <section className="border-t border-zinc-800 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-5xl font-bold">
            Inteligência Artificial
          </h2>

          <p className="mt-5 text-xl text-zinc-400">
            Automatize tarefas repetitivas e foque no crescimento do seu negócio.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition hover:-translate-y-2 hover:border-orange-500"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/15">
                  <Icon
                    size={28}
                    className="text-orange-500"
                  />
                </div>

                <h3 className="text-2xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}