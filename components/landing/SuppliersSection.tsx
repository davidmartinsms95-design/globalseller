const suppliers = [
  {
    name: 'GlobalSeller Marketplace',
    description: 'Produtos exclusivos disponíveis dentro da plataforma.',
    status: 'Disponível',
  },
  {
    name: 'AliExpress',
    description: 'Milhões de produtos para importar.',
    status: 'Em breve',
  },
  {
    name: 'Alibaba',
    description: 'Fornecedores internacionais em grande escala.',
    status: 'Em breve',
  },
  {
    name: 'CJ Dropshipping',
    description: 'Dropshipping global automatizado.',
    status: 'Em breve',
  },
  {
    name: 'Zendrop',
    description: 'Produtos premium para e-commerce.',
    status: 'Planejado',
  },
  {
    name: 'Spocket',
    description: 'Fornecedores dos EUA e Europa.',
    status: 'Planejado',
  },
  {
    name: 'Printful',
    description: 'Print on Demand.',
    status: 'Planejado',
  },
  {
    name: 'Printify',
    description: 'Produtos personalizados.',
    status: 'Planejado',
  },
  {
    name: 'SaleHoo',
    description: 'Diretório global de fornecedores.',
    status: 'Planejado',
  },
  {
    name: 'Modalyst',
    description: 'Dropshipping premium.',
    status: 'Planejado',
  },
]

export default function SuppliersSection() {
  return (
    <section className="border-t border-zinc-800 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <h2 className="text-5xl font-bold">
            Fornecedores Globais
          </h2>

          <p className="mt-5 text-xl text-zinc-400">
            Importe produtos dos maiores fornecedores do mundo.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {suppliers.map((supplier) => (

            <div
              key={supplier.name}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition duration-300 hover:-translate-y-2 hover:border-orange-500 hover:shadow-[0_0_40px_rgba(249,115,22,0.15)]"
            >
              <h3 className="text-2xl font-bold">
                {supplier.name}
              </h3>

              <p className="mt-4 text-zinc-400 leading-7">
                {supplier.description}
              </p>

              <span
                className={`mt-6 inline-block rounded-full px-4 py-2 text-sm font-semibold ${
                  supplier.status === 'Disponível'
                    ? 'bg-green-500/20 text-green-400'
                    : supplier.status === 'Em breve'
                    ? 'bg-orange-500/20 text-orange-400'
                    : 'bg-zinc-700 text-zinc-300'
                }`}
              >
                {supplier.status}
              </span>

            </div>

          ))}

        </div>

      </div>
    </section>
  )
}