'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  {
    label: 'Visão Geral',
    href: '/dashboard/finance',
  },
  {
    label: 'Contas a Pagar',
    href: '/dashboard/finance/accounts-payable',
  },
  {
    label: 'Contas a Receber',
    href: '/dashboard/finance/accounts-receivable',
  },
  {
    label: 'Fluxo de Caixa',
    href: '/dashboard/finance/cash-flow',
  },
  {
    label: 'DRE',
    href: '/dashboard/finance/dre',
  },
  {
    label: 'Relatórios',
    href: '/dashboard/finance/reports',
  },
]

export default function FinanceTabs() {
  const pathname = usePathname()

  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max gap-3">
        {tabs.map((tab) => {
          const active = pathname === tab.href

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                active
                  ? 'bg-orange-500 text-white'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {tab.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}