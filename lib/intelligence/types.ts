export type ProductHealthLevel =
  | 'excellent'
  | 'good'
  | 'warning'
  | 'critical'

export interface ProductHealthResult {
  score: number
  level: ProductHealthLevel

  title: number
  description: number
  image: number
  stock: number
  category: number
  status: number

  strengths: string[]
  warnings: string[]
  recommendations: string[]
}

export interface SeoScoreResult {
  score: number

  titleLength: number
  descriptionLength: number

  hasCategory: boolean
  hasImage: boolean

  keywords: string[]

  strengths: string[]
  improvements: string[]
}

export interface ProfitSimulationInput {
  salePrice: number
  costPrice: number

  marketplaceFee?: number
  shippingCost?: number
  taxes?: number
  extraCosts?: number
}

export interface ProfitSimulationResult {
  grossRevenue: number

  marketplaceFee: number
  shippingCost: number
  taxes: number
  extraCosts: number

  totalCosts: number

  netProfit: number

  margin: number

  roi: number
}

export interface PriceSuggestionResult {
  minimumPrice: number
  idealPrice: number
  premiumPrice: number

  expectedMargin: number

  recommendation: string
}

export interface CompetitorItem {
  title: string

  price: number

  marketplace: string

  rating?: number

  sales?: number
}

export interface CompetitorAnalysisResult {
  averagePrice: number

  cheapestPrice: number

  highestPrice: number

  competitiveness: number

  recommendation: string

  competitors: CompetitorItem[]
}

export interface PublicationEvent {
  id: string

  title: string

  description: string

  date: Date

  status:
    | 'created'
    | 'updated'
    | 'published'
    | 'synced'
    | 'sold'
    | 'payment'
    | 'delivered'
}

export interface AiRecommendation {
  title: string

  description: string

  priority: 'high' | 'medium' | 'low'
}

export interface ProductAnalysis {
  health: ProductHealthResult

  seo: SeoScoreResult

  profit?: ProfitSimulationResult

  priceSuggestion?: PriceSuggestionResult

  competitors?: CompetitorAnalysisResult

  timeline?: PublicationEvent[]

  recommendations?: AiRecommendation[]
}