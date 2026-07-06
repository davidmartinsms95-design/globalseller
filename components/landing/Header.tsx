import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-tight text-orange-500"
        >
          GlobalSeller
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <a href="#como-funciona" className="transition hover:text-orange-400">
            Como Funciona
          </a>

          <a href="#marketplaces" className="transition hover:text-orange-400">
            Marketplaces
          </a>

          <a href="#fornecedores" className="transition hover:text-orange-400">
            Fornecedores
          </a>

          <a href="#planos" className="transition hover:text-orange-400">
            Planos
          </a>

          <a href="#faq" className="transition hover:text-orange-400">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="rounded-xl px-5 py-3 font-semibold transition hover:bg-zinc-900"
          >
            Entrar
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-400"
          >
            Começar Grátis
          </Link>
        </div>
      </div>
    </header>
  )
}