import { Prisma } from '@prisma/client'

/*
|--------------------------------------------------------------------------
| Prisma Relations
|--------------------------------------------------------------------------
*/

export type MarketplaceProductWithRelations =
  Prisma.MarketplaceProductGetPayload<{
    include: {
      supplier: true
    }
  }>

export type ResellerProductWithRelations =
  Prisma.ResellerProductGetPayload<{
    include: {
      marketplaceProduct: {
        include: {
          supplier: true
        }
      }
    }
  }>

export type ProductWithRelations =
  Prisma.ProductGetPayload<{
    include: {
      resellerProduct: {
        include: {
          marketplaceProduct: {
            include: {
              supplier: true
            }
          }
        }
      }
    }
  }>

  export type ProductForPerformanceAlerts =
  Prisma.ProductGetPayload<{
    select: {
      id: true
      title: true
      price: true
      stock: true
      status: true
      description: true

      resellerProduct: {
        select: {
          marketplaceProduct: {
            select: {
              costPrice: true
            }
          }
        }
      }
    }
  }>

  export type ProductForAIRecommendations =
  Prisma.ProductGetPayload<{
    select: {
      id: true
      title: true
      price: true
      stock: true
      description: true

      resellerProduct: {
        select: {
          marketplaceProduct: {
            select: {
              costPrice: true
            }
          }
        }
      }
    }
  }>

export type ProductWithOrders =
  Prisma.ProductGetPayload<{
    include: {
      resellerProduct: {
        include: {
          marketplaceProduct: {
            include: {
              supplier: true
            }
          }
        }
      }

      orders: true
    }
  }>

export type OrderWithRelations =
  Prisma.OrderGetPayload<{
    include: {
      product: {
        include: {
          resellerProduct: {
            include: {
              marketplaceProduct: {
                include: {
                  supplier: true
                }
              }
            }
          }
        }
      }
    }
  }>

export type OrderForPerformanceAlerts =
  Prisma.OrderGetPayload<{
    select: {
      createdAt: true
    }
  }>

  export type OrderForAIRecommendations =
  Prisma.OrderGetPayload<{
    select: {
      id: true
    }
  }>
  
export type IntegrationWithRelations =
  Prisma.IntegrationGetPayload<{}>
  /*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

export interface DashboardData {
  products: ProductWithRelations[]
  orders: OrderWithRelations[]
  integrations: IntegrationWithRelations[]
}
/*
|--------------------------------------------------------------------------
| Generic Score
|--------------------------------------------------------------------------
*/

export type ScoreLevel =
  | 'excellent'
  | 'good'
  | 'warning'
  | 'critical'

export interface IntelligenceScore {
  score: number
  level: ScoreLevel
  trend: number
}
/*
|--------------------------------------------------------------------------
| Forecast
|--------------------------------------------------------------------------
*/

export interface ForecastPoint {
  date: string
  predictedSales: number
  predictedRevenue: number
  confidence: number
}

export interface ForecastSummary {
  averageSales: number
  averageRevenue: number
  expectedSales: number
  expectedRevenue: number
  growthTrend: number
  confidence: number
}

export interface ForecastResult {
  summary: ForecastSummary
  forecast: ForecastPoint[]
}
/*
|--------------------------------------------------------------------------
| Alerts
|--------------------------------------------------------------------------
*/

export type AlertSeverity =
  | 'low'
  | 'medium'
  | 'high'
  | 'critical'

export type AlertCategory =
  | 'inventory'
  | 'sales'
  | 'pricing'
  | 'seo'
  | 'competition'
  | 'publication'
  | 'financial'
  | 'integration'
  | 'system'
  | 'opportunity'

export interface IntelligenceAlert {
  id: string

  title: string

  description: string

  severity: AlertSeverity

  category: AlertCategory

  score: number

  recommendation: string

  createdAt: string

  metadata?: Record<string, unknown>
}
/*
|--------------------------------------------------------------------------
| AI Recommendations
|--------------------------------------------------------------------------
*/

export type RecommendationPriority =
  | 'low'
  | 'medium'
  | 'high'
  | 'critical'

export type RecommendationCategory =
  | 'pricing'
  | 'seo'
  | 'inventory'
  | 'sales'
  | 'publication'
  | 'competition'
  | 'financial'
  | 'growth'
  | 'automation'
  | 'marketplace'

export interface AIRecommendation {
  id: string

  title: string

  description: string

  priority: RecommendationPriority

  category: RecommendationCategory

  impact: number

  confidence: number

  estimatedGain?: number

  recommendation: string

  createdAt: string

  metadata?: Record<string, unknown>
}
/*
|--------------------------------------------------------------------------
| Product Intelligence
|--------------------------------------------------------------------------
*/

export interface ProductHealth {
  productId: string

  score: IntelligenceScore

  seoScore: number

  profitScore: number

  stockScore: number

  salesScore: number

  recommendationCount: number

  alertCount: number
}
/*
|--------------------------------------------------------------------------
| SEO
|--------------------------------------------------------------------------
*/

export interface SeoAnalysis {
  titleScore: number

  descriptionScore: number

  keywordScore: number

  imageScore: number

  finalScore: number

  suggestions: string[]
}
/*
|--------------------------------------------------------------------------
| Market Opportunities
|--------------------------------------------------------------------------
*/

export interface MarketOpportunity {
  id: string

  title: string

  description: string

  estimatedDemand: number

  competitionLevel: number

  profitability: number

  confidence: number
}
/*
|--------------------------------------------------------------------------
| Competitors
|--------------------------------------------------------------------------
*/

export interface CompetitorSnapshot {
  marketplace: string

  averagePrice: number

  lowestPrice: number

  highestPrice: number

  competitors: number

  competitiveness: number
}
/*
|--------------------------------------------------------------------------
| Competitors
|--------------------------------------------------------------------------
*/

export interface CompetitorSnapshot {
  marketplace: string

  averagePrice: number

  lowestPrice: number

  highestPrice: number

  competitors: number

  competitiveness: number
}
/*
|--------------------------------------------------------------------------
| Dashboard Metrics
|--------------------------------------------------------------------------
*/

export interface DashboardMetrics {
  totalProducts: number

  activeProducts: number

  inactiveProducts: number

  totalOrders: number

  totalRevenue: number

  averageTicket: number

  averageMargin: number

  totalAlerts: number

  totalRecommendations: number

  healthScore: number
}
/*
|--------------------------------------------------------------------------
| Executive Panel
|--------------------------------------------------------------------------
*/

export interface ExecutivePanelData {
  metrics: DashboardMetrics

  forecast: ForecastResult

  alerts: IntelligenceAlert[]

  recommendations: AIRecommendation[]

  opportunities: MarketOpportunity[]

  competitors: CompetitorSnapshot[]
}
/*
|--------------------------------------------------------------------------
| Intelligence Response
|--------------------------------------------------------------------------
*/

export interface IntelligenceDashboardResponse {
  generatedAt: Date

  userId: string

  data: ExecutivePanelData
}

/*
|--------------------------------------------------------------------------
| Publication Timeline
|--------------------------------------------------------------------------
*/

export type PublicationTimelineEventType =
  | 'created'
  | 'published'
  | 'updated'
  | 'paused'
  | 'reactivated'
  | 'synchronized'
  | 'sold'
  | 'sale'
  | 'stock'
  | 'stock_changed'
  | 'price'
  | 'price_changed'
  | 'recommendation'
  | 'warning'

export interface PublicationTimelineEvent {
  id: string

  type: PublicationTimelineEventType

  title: string

  description: string

  date: Date

  marketplace?: string

  metadata?: Record<string, unknown>
}