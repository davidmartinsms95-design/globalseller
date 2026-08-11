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

    return NextResponse.json(
      intelligence,
    )
      } catch (error) {

    console.error(
      '[INTELLIGENCE_DASHBOARD]',
      error,
    )

    return NextResponse.json(
      {
        error:
          'Erro ao carregar a Inteligência.',
      },
      {
        status: 500,
      },
    )

  }
}
// Nenhum código adicional é necessário.

// Este endpoint já está completo com:
// ✅ Autenticação
// ✅ Busca do usuário
// ✅ Chamada do serviço
// ✅ Retorno JSON
// ✅ Tratamento de erros

// A próxima parte será apenas o fechamento do arquivo.
// ======================================================
// Endpoint:
// GET /api/intelligence/dashboard
//
// Responsável por fornecer os dados da Central de
// Inteligência do usuário autenticado.
//
// Fluxo:
//
// 1. Obtém o usuário autenticado.
// 2. Executa o serviço getDashboardIntelligence().
// 3. Consolida os indicadores.
// 4. Retorna JSON para o Dashboard.
//
// Este endpoint alimenta:
//
// • ExecutiveIntelligencePanel
// • ProductHealthCard
// • SeoScoreCard
// • ProfitSimulator
// • PriceSuggestion
// • CompetitorAnalysis
// • PublicationTimeline
// • AIRecommendations
// • MarketOpportunityCard
// • BestPublicationTime
// • MarketInsights
// • SalesForecast
// • PerformanceAlerts
//
// Futuras integrações:
//
// • Mercado Livre
// • Shopee
// • Amazon
// • Temu
// • AliExpress
// • IA Preditiva
// • Dashboard Executivo
// ======================================================