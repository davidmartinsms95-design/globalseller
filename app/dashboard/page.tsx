'use client'

import { useEffect, useState } from 'react'

import {
  Package,
  ShoppingCart,
  DollarSign,
  Crown,
  CheckCircle,
  Clock,
  Wallet,
} from 'lucide-react'

import StatCard from '@/components/dashboard/StatCard'
import SalesChart from '@/components/dashboard/SalesChart'
import RecentOrders from '@/components/dashboard/RecentOrders'
import TopProducts from '@/components/dashboard/TopProducts'
import LowStock from '@/components/dashboard/LowStock'

interface DashboardData {
  products: number
  orders: number
  sales: number
  averageTicket: number
  approvedOrders: number
  pendingOrders: number
  plan: string
  maxProducts: number

  integrations: {
    mercadoLivre: boolean
    shopee: boolean
  }
}

export default function DashboardPage() {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null)

  const [loading, setLoading] =
    useState(true)

  async function loadDashboard() {
    try {
      const response = await fetch('/api/dashboard')

      const data = await response.json()

      setDashboard(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  if (loading) {
    return (
      <div className="p-10 text-zinc-400">
        Carregando Dashboard...
      </div>
    )
  }

  if (!dashboard) {
    return (
      <div className="p-10 text-red-500">
        Não foi possível carregar o Dashboard.
      </div>
    )
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-5xl font-bold text-white">
          Bem-vindo 👋
        </h1>

        <p className="mt-3 text-lg text-zinc-400">
          Gerencie produtos, pedidos e vendas em um único painel.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Produtos"
          value={dashboard.products}
          subtitle={`Limite: ${dashboard.maxProducts}`}
          icon={Package}
        />

        <StatCard
          title="Pedidos"
          value={dashboard.orders}
          subtitle="Pedidos cadastrados"
          icon={ShoppingCart}
        />

        <StatCard
          title="Faturamento"
          value={`R$ ${dashboard.sales.toFixed(2)}`}
          subtitle="Total vendido"
          icon={DollarSign}
          iconColor="text-green-500"
        />

        <StatCard
          title="Plano"
          value={dashboard.plan.toUpperCase()}
          subtitle={
            dashboard.plan === 'pro'
              ? 'Produtos ilimitados'
              : 'Plano gratuito'
          }
          icon={Crown}
          iconColor="text-yellow-500"
        />

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <StatCard
          title="Ticket Médio"
          value={`R$ ${dashboard.averageTicket.toFixed(2)}`}
          subtitle="Valor médio por pedido"
          icon={Wallet}
          iconColor="text-cyan-500"
        />

        <StatCard
          title="Pedidos Aprovados"
          value={dashboard.approvedOrders}
          subtitle="Pagamentos confirmados"
          icon={CheckCircle}
          iconColor="text-green-500"
        />

        <StatCard
          title="Pedidos Pendentes"
          value={dashboard.pendingOrders}
          subtitle="Aguardando aprovação"
          icon={Clock}
          iconColor="text-orange-500"
        />

      </div>

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 xl:col-span-2">

          <h2 className="mb-6 text-2xl font-bold text-white">
            Crescimento das vendas
          </h2>

          <SalesChart />

        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

          <h2 className="mb-6 text-2xl font-bold text-white">
            Integrações
          </h2>

          <div className="space-y-4">

            <div className="flex items-center justify-between">
              <span>Mercado Livre</span>

              <span
                className={
                  dashboard.integrations.mercadoLivre
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                {dashboard.integrations.mercadoLivre
                  ? '● Conectado'
                  : '● Desconectado'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Shopee</span>

              <span
                className={
                  dashboard.integrations.shopee
                    ? 'text-green-500'
                    : 'text-yellow-500'
                }
              >
                {dashboard.integrations.shopee
                  ? '● Conectado'
                  : '● Em desenvolvimento'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Amazon</span>

              <span className="text-zinc-500">
                ● Em breve
              </span>
            </div>

          </div>

        </div>

      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <RecentOrders />
        <TopProducts />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <LowStock />

        <div className="rounded-3xl border border-zinc-700 bg-zinc-900 p-8">
          <h2 className="mb-6 text-2xl font-bold">
            Resumo Financeiro
          </h2>

          <div className="space-y-4 text-lg">

            <div className="flex justify-between">
              <span>Faturamento Total</span>
              <strong>
                R$ {dashboard.sales.toFixed(2)}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Ticket Médio</span>
              <strong>
                R$ {dashboard.averageTicket.toFixed(2)}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Pedidos Aprovados</span>
              <strong>{dashboard.approvedOrders}</strong>
            </div>

            <div className="flex justify-between">
              <span>Pedidos Pendentes</span>
              <strong>{dashboard.pendingOrders}</strong>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}