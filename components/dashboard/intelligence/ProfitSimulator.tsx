'use client'

import { useEffect, useMemo, useState } from 'react'

import {
  Calculator,
  DollarSign,
  TrendingUp,
  Target,
  Percent,
  BarChart3,
  ShoppingBag,
  Truck,
  Landmark,
  Sparkles,
} from 'lucide-react'

import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import MarketplaceSelector from './profit-simulator/MarketplaceSelector'

import {
  MarketplaceConfig,
  MarketplaceKey,
  ScenarioKey,
} from './profit-simulator/types'

import ScenarioSelector from './profit-simulator/ScenarioSelector'

import PriceSelector from './profit-simulator/PriceSelector'
import { KPIGrid } from './profit-simulator/KPIGrid'
import { FinancialSummary } from './profit-simulator/FinancialSummary'
import BreakEvenCard from './profit-simulator/BreakEvenCard'
import AIRecommendationCard from './profit-simulator/AIRecommendationCard'
import ComparisonCard from './profit-simulator/ComparisonCard'
import StrategicInsightsCard from './profit-simulator/StrategicInsightsCard'
import AlertsCard from './profit-simulator/AlertsCard'
import ExecutivePanelCard from './profit-simulator/ExecutivePanelCard'

/* =========================================================
 * TYPES
 * =======================================================*/

export interface ProfitSimulatorProps {
  costPrice: number
  currentPrice: number
  marketplaceFee?: number
  shippingCost?: number
  suggestedPrice?: number
}

interface SimulationResult {
  feeValue: number
  totalCost: number
  profit: number
  margin: number
  markup: number
  roi: number
  breakEven: number
}

/* =========================================================
 * MARKETPLACES
 * =======================================================*/

const MARKETPLACES: MarketplaceConfig[] = [
  {
    id: 'mercadolivre',
    name: 'Mercado Livre',
    fee: 16,
    shipping: 22,
    color: 'bg-yellow-500',
  },
  {
    id: 'shopee',
    name: 'Shopee',
    fee: 14,
    shipping: 18,
    color: 'bg-orange-500',
  },
  {
    id: 'amazon',
    name: 'Amazon',
    fee: 17,
    shipping: 24,
    color: 'bg-sky-500',
  },
  {
    id: 'magalu',
    name: 'Magazine Luiza',
    fee: 15,
    shipping: 20,
    color: 'bg-blue-600',
  },
]

/* =========================================================
 * HELPERS
 * =======================================================*/

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function calculateSimulation(
  salePrice: number,
  costPrice: number,
  marketplaceFee: number,
  shippingCost: number,
): SimulationResult {
  const feeValue =
    salePrice * (marketplaceFee / 100)

  const totalCost =
    costPrice +
    feeValue +
    shippingCost

  const profit =
    salePrice - totalCost

  const margin =
    salePrice > 0
      ? (profit / salePrice) * 100
      : 0

  const markup =
    costPrice > 0
      ? ((salePrice - costPrice) / costPrice) *
        100
      : 0

  const roi =
    totalCost > 0
      ? (profit / totalCost) * 100
      : 0

  const breakEven =
    costPrice + shippingCost

  return {
    feeValue,
    totalCost,
    profit,
    margin,
    markup,
    roi,
    breakEven,
  }
}

function getMarginVariant(
  margin: number,
): 'success' | 'warning' | 'error' {
  if (margin >= 30) return 'success'
  if (margin >= 15) return 'warning'
  return 'error'
}

function getScenarioMultiplier(
  scenario: ScenarioKey,
) {
  switch (scenario) {
    case 'conservative':
      return 1.15

    case 'competitive':
      return 1.05

    case 'premium':
      return 1.35

    case 'clearance':
      return 0.95

    default:
      return 1
  }
}
/* =========================================================
 * COMPONENT
 * =======================================================*/

export default function ProfitSimulator({
  costPrice,
  currentPrice,
  marketplaceFee = 16,
  shippingCost = 0,
  suggestedPrice,
}: ProfitSimulatorProps) {
  const [selectedMarketplace, setSelectedMarketplace] =
    useState<MarketplaceKey>('mercadolivre')

  const [selectedScenario, setSelectedScenario] =
    useState<ScenarioKey>('competitive')

  const [salePrice, setSalePrice] =
    useState(currentPrice)

  const marketplace = useMemo(() => {
    return (
      MARKETPLACES.find(
        (item) =>
          item.id === selectedMarketplace,
      ) ?? MARKETPLACES[0]
    )
  }, [selectedMarketplace])

  useEffect(() => {
    setSalePrice(currentPrice)
  }, [currentPrice])

  useEffect(() => {
    const multiplier =
      getScenarioMultiplier(
        selectedScenario,
      )

    setSalePrice(
      Number(
        (
          currentPrice * multiplier
        ).toFixed(2),
      ),
    )
  }, [
    currentPrice,
    selectedScenario,
  ])

  const simulation = useMemo(() => {
    return calculateSimulation(
      salePrice,
      costPrice,
      marketplace.fee ??
        marketplaceFee,
      marketplace.shipping ??
        shippingCost,
    )
  }, [
    salePrice,
    costPrice,
    marketplace,
    marketplaceFee,
    shippingCost,
  ])

  const badgeVariant =
    getMarginVariant(
      simulation.margin,
    )

  const minimumPrice =
    simulation.breakEven

  const recommendedPrice =
    suggestedPrice ??
    Number(
      (
        minimumPrice * 1.35
      ).toFixed(2),
    )

  const maxSlider =
    Math.max(
      recommendedPrice * 2,
      salePrice * 2,
      currentPrice * 2,
      100,
    )

  const roiColor =
    simulation.roi >= 40
      ? 'text-emerald-400'
      : simulation.roi >= 20
        ? 'text-yellow-400'
        : 'text-red-400'

  const profitColor =
    simulation.profit >= 0
      ? 'text-emerald-400'
      : 'text-red-400'

  return (
    <Card>

      <div className="space-y-10">

        {/* ====================================== */}
        {/* HEADER */}
        {/* ====================================== */}

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="flex items-center gap-3">

              <Calculator
                size={28}
                className="text-orange-400"
              />

              <h2 className="text-3xl font-bold text-white">
                Simulador Inteligente
              </h2>

            </div>

            <p className="mt-3 max-w-3xl text-zinc-400 leading-7">

              Descubra automaticamente o melhor
              preço de venda considerando
              marketplace, custos, margem,
              break-even, ROI e markup.

            </p>

          </div>

          <Badge variant={badgeVariant}>
            {simulation.margin.toFixed(1)}%
          </Badge>

        </div>

        {/* ====================================== */}
        <MarketplaceSelector
    marketplaces={MARKETPLACES}
    selectedMarketplace={selectedMarketplace}
    onSelect={setSelectedMarketplace}
/>
        {/* ====================================== */}

        {/* ====================================== */}
        {/* CENÁRIOS */}
        {/* ====================================== */}

        <ScenarioSelector
  selectedScenario={selectedScenario}
  onSelect={setSelectedScenario}
/>

        {/* ====================================== */}
        {/* SLIDER */}
        {/* ====================================== */}

        <PriceSelector
  salePrice={salePrice}
  minimumPrice={minimumPrice}
  maxSlider={maxSlider}
  formatCurrency={formatCurrency}
  clamp={clamp}
  onChange={setSalePrice}
/>
                {/* ====================================== */}
        {/* KPIs */}
        {/* ====================================== */}

        <KPIGrid
  simulation={simulation}
  profitColor={profitColor}
  roiColor={roiColor}
  formatCurrency={formatCurrency}
/>

        {/* ====================================== */}
        {/* RESUMO FINANCEIRO */}
        {/* ====================================== */}

        <div className="grid gap-6 lg:grid-cols-2">

        <FinancialSummary
  costPrice={costPrice}
  feeValue={simulation.feeValue}
  shipping={marketplace.shipping}
  totalCost={simulation.totalCost}
  formatCurrency={formatCurrency}
/>

          <BreakEvenCard
  breakEven={simulation.breakEven}
  salePrice={salePrice}
  minimumPrice={minimumPrice}
  recommendedPrice={recommendedPrice}
  formatCurrency={formatCurrency}
/>

        </div>
                {/* ====================================== */}
        {/* SCORE DE LUCRATIVIDADE */}
        {/* ====================================== */}

        <Card>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <div className="flex items-center gap-3">

                <Sparkles
                  size={24}
                  className="text-orange-400"
                />

                <h3 className="text-xl font-semibold text-white">
                  Score de Lucratividade
                </h3>

              </div>

              <p className="mt-3 max-w-3xl leading-7 text-zinc-400">

                O algoritmo analisa margem,
                ROI, markup e lucro líquido
                para estimar a qualidade
                financeira deste anúncio.

              </p>

            </div>

            <Badge variant={badgeVariant}>

              {simulation.margin >= 35
                ? 'Excelente'
                : simulation.margin >= 25
                  ? 'Muito Bom'
                  : simulation.margin >= 15
                    ? 'Bom'
                    : 'Atenção'}

            </Badge>

          </div>

          <div className="mt-8">

            <div className="h-4 overflow-hidden rounded-full bg-zinc-800">

              <div
                className={`
                  h-full
                  rounded-full
                  transition-all
                  duration-500
                  ${
                    simulation.margin >= 35
                      ? 'bg-emerald-500'
                      : simulation.margin >= 20
                        ? 'bg-orange-500'
                        : 'bg-red-500'
                  }
                `}
                style={{
                  width: `${Math.min(
                    simulation.margin,
                    100,
                  )}%`,
                }}
              />

            </div>

            <div className="mt-3 flex justify-between text-xs text-zinc-500">

              <span>Ruim</span>
              <span>Regular</span>
              <span>Bom</span>
              <span>Excelente</span>

            </div>

          </div>

        </Card>

        {/* ====================================== */}
{/* IA */}
{/* ====================================== */}

<AIRecommendationCard
  simulation={simulation}
  recommendedPrice={recommendedPrice}
  costPrice={costPrice}
  marketplace={marketplace}
  formatCurrency={formatCurrency}
  calculateSimulation={calculateSimulation}
/>

{/* ====================================== */}
{/* COMPARATIVO */}
{/* ====================================== */}

        <ComparisonCard
  currentPrice={currentPrice}
  salePrice={salePrice}
  recommendedPrice={recommendedPrice}
  marketplaceName={marketplace.name}
  marketplaceFee={marketplace.fee}
  marketplaceShipping={marketplace.shipping}
  formatCurrency={formatCurrency}
/>
        {/* ====================================== */}
        {/* INSIGHTS ESTRATÉGICOS */}
        {/* ====================================== */}
<StrategicInsightsCard
  margin={simulation.margin}
  salePrice={salePrice}
  recommendedPrice={recommendedPrice}
/>

<AlertsCard
  margin={simulation.margin}
/>

        {/* ====================================== */}
        {/* PAINEL EXECUTIVO */}
        {/* ====================================== */}

        <Card>

          <div className="flex items-center gap-3">

            <BarChart3
              size={24}
              className="text-violet-400"
            />

            <h3 className="text-xl font-semibold text-white">

              Painel Executivo

            </h3>

          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-2xl bg-zinc-900/60 p-5">

              <p className="text-sm text-zinc-500">
                Marketplace
              </p>

              <h4 className="mt-3 text-xl font-bold text-white">
                {marketplace.name}
              </h4>

            </div>

            <div className="rounded-2xl bg-zinc-900/60 p-5">

              <p className="text-sm text-zinc-500">
                Cenário
              </p>

              <h4 className="mt-3 text-xl font-bold text-orange-400">

                {selectedScenario === 'conservative' && 'Conservador'}
                {selectedScenario === 'competitive' && 'Competitivo'}
                {selectedScenario === 'premium' && 'Premium'}
                {selectedScenario === 'clearance' && 'Liquidar'}

              </h4>

            </div>

            <div className="rounded-2xl bg-zinc-900/60 p-5">

              <p className="text-sm text-zinc-500">
                Comissão
              </p>

              <h4 className="mt-3 text-xl font-bold text-white">

                {marketplace.fee}%

              </h4>

            </div>

            <div className="rounded-2xl bg-zinc-900/60 p-5">

              <p className="text-sm text-zinc-500">
                Frete Médio
              </p>

              <h4 className="mt-3 text-xl font-bold text-white">

                {formatCurrency(
                  marketplace.shipping,
                )}

              </h4>

            </div>

          </div>

        </Card>
                {/* ====================================== */}
        {/* RESUMO EXECUTIVO */}
        {/* ====================================== */}

        <Card>

          <div className="flex items-center justify-between">

            <div>

              <h3 className="text-2xl font-bold text-white">

                Resumo Executivo

              </h3>

              <p className="mt-3 max-w-3xl leading-7 text-zinc-400">

                Este simulador analisa automaticamente
                custo do produto, comissão,
                frete, margem, ROI e markup
                para ajudar na decisão do
                melhor preço de venda.

              </p>

            </div>

            <Badge variant={badgeVariant}>

              {simulation.margin.toFixed(1)}%

            </Badge>

          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">

              <h4 className="text-sm text-zinc-500">

                Melhor Preço

              </h4>

              <h2 className="mt-3 text-3xl font-bold text-orange-400">

                {formatCurrency(
                  recommendedPrice,
                )}

              </h2>

            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">

              <h4 className="text-sm text-zinc-500">

                Lucro Estimado

              </h4>

              <h2 className="mt-3 text-3xl font-bold text-emerald-400">

                {formatCurrency(
                  simulation.profit,
                )}

              </h2>

            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">

              <h4 className="text-sm text-zinc-500">

                ROI

              </h4>

              <h2
                className={`mt-3 text-3xl font-bold ${roiColor}`}
              >

                {simulation.roi.toFixed(1)}%

              </h2>

            </div>

          </div>

          <div className="mt-10 rounded-3xl border border-orange-500/20 bg-orange-500/5 p-8">

            <div className="flex items-center gap-3">

              <Sparkles
                className="text-orange-400"
                size={26}
              />

              <h3 className="text-xl font-semibold text-white">

                Recomendação Final da IA

              </h3>

            </div>

            <p className="mt-6 leading-8 text-zinc-300">

              {simulation.margin >= 35 && (
                <>
                  A operação apresenta excelente
                  lucratividade. A recomendação é
                  manter este preço e considerar
                  campanhas patrocinadas para
                  aumentar o volume de vendas.
                </>
              )}

              {simulation.margin >= 20 &&
                simulation.margin < 35 && (
                  <>
                    O cenário é saudável e permite
                    pequenos reajustes positivos de
                    preço para aumentar o lucro sem
                    comprometer significativamente a
                    competitividade.
                  </>
                )}

              {simulation.margin >= 10 &&
                simulation.margin < 20 && (
                  <>
                    Há potencial para melhorar a
                    rentabilidade negociando custos,
                    reduzindo despesas logísticas ou
                    ajustando discretamente o preço
                    final.
                  </>
                )}

              {simulation.margin < 10 && (
                <>
                  O preço atual oferece pouca
                  segurança financeira. Revise
                  fornecedores, logística ou aumente
                  o preço antes de investir em
                  anúncios pagos.
                </>
              )}

            </p>

          </div>

        </Card>

      </div>

    </Card>

  )

}        