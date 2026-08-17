import { NextResponse } from 'next/server'

import { getCurrentUser } from '@/lib/getCurrentUser'

import {
  getDashboardIntelligence,
} from '@/lib/services/intelligence/dashboardIntelligence.service'

export async function GET() {
  try {
    const user =
      await getCurrentUser()


    if (!user) {
      return NextResponse.json(
        {
          error: 'Não autorizado.',
        },
        {
          status: 401,
        },
      )
    }

    const intelligence =
      await getDashboardIntelligence(
        user.id,
      )

    const insights = []

    if (
      intelligence.opportunities?.length
    ) {
      insights.push({
        title:
          'Oportunidades Detectadas',

        description:
          `${intelligence.opportunities.length} oportunidades de crescimento foram identificadas.`,

        type: 'success',
      })
    }

    if (
      intelligence.alerts?.length
    ) {
      insights.push({
        title:
          'Alertas Ativos',

        description:
          `${intelligence.alerts.length} alertas exigem atenção.`,

        type: 'warning',
      })
    }

    if (
      intelligence.publicationTime
    ) {
      insights.push({
        title:
          'Melhor Horário de Publicação',

        description:
          `Publicações às ${intelligence.publicationTime.bestHour} apresentam melhor desempenho.`,

        type: 'info',
      })
    }
        if (
      intelligence.salesForecast?.summary
    ) {
      insights.push({
        title:
          'Previsão de Vendas',

        description:
          `Previsão de ${intelligence.salesForecast.summary.expectedSales} vendas com faturamento estimado de R$ ${Number(
            intelligence.salesForecast.summary.expectedRevenue,
          ).toFixed(2)}.`,

        type: 'success',
      })
    }

    if (
  intelligence.marketInsights?.insights
    ?.length
) {
  insights.push({
    title:
      'Mercado',

    description:
      `${intelligence.marketInsights.insights.length} insights de mercado disponíveis.`,

    type: 'info',
  })
}

for (const recommendation of intelligence.recommendations.slice(0, 5)) {
  insights.push({
    title: recommendation.title,

    description: recommendation.action,

    type: 'info',

    priority: recommendation.priority,
  })
}

    return NextResponse.json({
  insights,

  summary: {
    healthScore:
      intelligence.healthScore,

    seoScore:
      intelligence.seoScore,

    totalProducts:
      intelligence.catalogMetrics
        .totalProducts,

    healthyProducts:
      intelligence.catalogMetrics
        .healthyProducts,

    attentionProducts:
      intelligence.catalogMetrics
        .attentionProducts,

    criticalProducts:
      intelligence.catalogMetrics
        .criticalProducts,

    recommendations:
      intelligence.recommendations
        .length,

    alerts:
      intelligence.alerts.length,

    generatedAt:
      intelligence.generatedAt,
  },
})
  } catch (error) {
    console.error(
      '[INSIGHTS_API]',
      error,
    )

    return NextResponse.json(
      {
        error:
          'Erro ao gerar os insights.',
      },
      {
        status: 500,
      },
    )
  }
}