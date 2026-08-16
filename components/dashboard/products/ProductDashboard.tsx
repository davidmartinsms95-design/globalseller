import {
  Boxes,
  DollarSign,
  Package,
  TrendingUp,
} from 'lucide-react'

import StatCard from '@/components/dashboard/StatCard'

interface ProductDashboardProps {
  totalProducts: number

  activeProducts: number

  totalStock: number

  estimatedProfit: number
}

export default function ProductDashboard({
  totalProducts,
  activeProducts,
  totalStock,
  estimatedProfit,
}: ProductDashboardProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Produtos"
        value={totalProducts}
        icon={Package}
        iconColor="text-orange-500"
      />

      <StatCard
        title="Ativos"
        value={activeProducts}
        icon={TrendingUp}
        iconColor="text-green-500"
      />
            <StatCard
        title="Estoque"
        value={totalStock}
        icon={Boxes}
        iconColor="text-sky-500"
      />

      <StatCard
        title="Lucro Estimado"
        value={`R$ ${estimatedProfit.toFixed(2)}`}
        icon={DollarSign}
        iconColor="text-emerald-500"
      />

    </div>
  )
}