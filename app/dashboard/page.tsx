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

import Card from '@/components/ui/Card'
import StatCard from '@/components/dashboard/StatCard'
import SalesChart from '@/components/dashboard/SalesChart'
import RecentOrders from '@/components/dashboard/RecentOrders'
import TopProducts from '@/components/dashboard/TopProducts'
import LowStock from '@/components/dashboard/LowStock'

interface DashboardData {
  products: number
  orders: number

  sales: number
  monthlyRevenue: number
  estimatedProfit: number

  averageTicket: number

  approvedOrders: number
  pendingOrders: number

  publishedProducts: number
  connectedIntegrations: number

  plan: string
  maxProducts: number

  integrations: {
    mercadoLivre: boolean
    shopee: boolean
  }

  dashboardProducts: {
  id: string
  title: string
  price: number
  stock: number
}[]

recentOrders: {
  id: string
  amount: number
  status: string
  createdAt: string
}[]

chartData: {
  day: string
  sales: number
}[]

  intelligence: {
    healthScore: number
    seoScore: number

    productsWithProblems: {
      id: string
      title: string
      score: number
    }[]
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

      <div className="flex flex-col gap-3">

        <span className="font-semibold uppercase tracking-widest text-orange-500">
          Dashboard Executivo
        </span>

        <h1 className="text-5xl font-bold text-white">
          Bem-vindo ao GlobalSeller 👋
        </h1>

        <p className="max-w-3xl text-lg leading-8 text-zinc-400">
          Acompanhe em tempo real seus produtos,
          pedidos, faturamento, lucro estimado
          e integrações conectadas.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

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
          title="Receita do Mês"
          value={`R$ ${dashboard.monthlyRevenue.toFixed(2)}`}
          subtitle="Mês atual"
          icon={DollarSign}
          iconColor="text-emerald-500"
        />

        <StatCard
          title="Lucro Estimado"
          value={`R$ ${dashboard.estimatedProfit.toFixed(2)}`}
          subtitle="Estimativa"
          icon={Wallet}
          iconColor="text-cyan-500"
        />

<StatCard
  title="Health Score"
  value={`${dashboard.intelligence.healthScore}%`}
  subtitle="Qualidade média dos anúncios"
  icon={CheckCircle}
  iconColor="text-emerald-500"
/>

<StatCard
  title="SEO Score"
  value={`${dashboard.intelligence.seoScore}%`}
  subtitle="Otimização para Marketplace"
  icon={Package}
  iconColor="text-sky-500"
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

        <div className="xl:col-span-2">

          <Card>

            <h2 className="mb-6 text-2xl font-bold text-white">
              Crescimento das vendas
            </h2>

            <SalesChart
  data={dashboard.chartData}
/>

          </Card>

        </div>

        <Card>

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

            <hr className="border-zinc-800" />

            <div className="flex items-center justify-between font-semibold">

              <span>Total conectadas</span>

              <span className="text-green-500">
                {dashboard.connectedIntegrations}
              </span>

            </div>

          </div>

        </Card>

      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">

        <RecentOrders
  orders={dashboard.recentOrders}
/>

        <TopProducts
  products={dashboard.dashboardProducts}
/>

      </div>

<div className="grid gap-6 xl:grid-cols-2">

  <Card>

    <h2 className="mb-6 text-2xl font-bold text-white">
      Produtos que precisam de atenção
    </h2>

    {dashboard.intelligence.productsWithProblems.length === 0 ? (

      <p className="text-zinc-400">
        Todos os produtos estão com excelente qualidade.
      </p>

    ) : (

      <div className="space-y-3">

        {dashboard.intelligence.productsWithProblems.map(
          (product) => (

            <div
              key={product.id}
              className="flex items-center justify-between rounded-xl border border-zinc-800 p-4"
            >

              <span>{product.title}</span>

              <span className="font-bold text-orange-400">
                {product.score}%
              </span>

            </div>

          ),
        )}

      </div>

    )}

  </Card>

</div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">

        <LowStock
  products={dashboard.dashboardProducts}
/>

        <Card>

          <h2 className="mb-6 text-2xl font-bold text-white">
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
              <span>Receita do Mês</span>

              <strong>
                R$ {dashboard.monthlyRevenue.toFixed(2)}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Lucro Estimado</span>

              <strong className="text-green-500">
                R$ {dashboard.estimatedProfit.toFixed(2)}
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

              <strong>
                {dashboard.approvedOrders}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Pedidos Pendentes</span>

              <strong>
                {dashboard.pendingOrders}
              </strong>
            </div>

          </div>

        </Card>

      </div>

    </div>
  )
}