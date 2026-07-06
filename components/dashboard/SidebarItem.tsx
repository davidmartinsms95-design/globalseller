'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Store,
  Plug,
  Crown,
  Home,
  Shield,
  Wallet,
  Activity,
} from 'lucide-react'

interface SidebarItemProps {
  href: string
  label: string
  icon:
    | 'dashboard'
    | 'products'
    | 'orders'
    | 'marketplace'
    | 'integrations'
    | 'plans'
    | 'home'
    | 'admin'
| 'finance'
| 'operations'
}

export default function SidebarItem({
  href,
  label,
  icon,
}: SidebarItemProps) {
  const pathname = usePathname()

  const active = pathname === href

  const icons = {
    dashboard: LayoutDashboard,
    products: Package,
    orders: ShoppingCart,
    marketplace: Store,
    integrations: Plug,
    plans: Crown,
    home: Home,
    admin: Shield,
    finance: Wallet,
    operations: Activity,
  }

  const Icon = icons[icon]

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
        active
          ? 'bg-orange-500 text-white shadow-lg'
          : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
      }`}
    >
      <Icon size={20} />

      <span className="font-medium">
        {label}
      </span>
    </Link>
  )
}