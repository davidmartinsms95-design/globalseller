/*
|--------------------------------------------------------------------------
| Forecast
|--------------------------------------------------------------------------
*/

export const DEFAULT_FORECAST_DAYS = 30

export const MIN_FORECAST_DAYS = 7

export const MAX_FORECAST_DAYS = 90

export const DEFAULT_CONFIDENCE = 70

export const MIN_CONFIDENCE = 35

export const MAX_CONFIDENCE = 98

/*
|--------------------------------------------------------------------------
| Inventory
|--------------------------------------------------------------------------
*/

export const LOW_STOCK_THRESHOLD = 5

export const CRITICAL_STOCK_THRESHOLD = 0

/*
|--------------------------------------------------------------------------
| Profit
|--------------------------------------------------------------------------
*/

export const MIN_PROFIT_MARGIN = 15

export const IDEAL_PROFIT_MARGIN = 30

/*
|--------------------------------------------------------------------------
| SEO
|--------------------------------------------------------------------------
*/

export const MIN_TITLE_LENGTH = 35

export const IDEAL_TITLE_LENGTH = 60

export const MIN_DESCRIPTION_LENGTH = 200

export const IDEAL_DESCRIPTION_LENGTH = 1000

/*
|--------------------------------------------------------------------------
| Sales
|--------------------------------------------------------------------------
*/

export const SALES_ANALYSIS_DAYS = 30

export const RECENT_SALES_DAYS = 7

export const MIN_EXPECTED_ORDERS = 10

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

export const MAX_TOP_RECOMMENDATIONS = 5

export const MAX_TOP_ALERTS = 10

export const DEFAULT_PAGE_SIZE = 20
/*
|--------------------------------------------------------------------------
| Score Weights
|--------------------------------------------------------------------------
*/

export const SCORE_WEIGHTS = {
  seo: 0.20,
  profit: 0.25,
  sales: 0.25,
  stock: 0.15,
  competition: 0.15,
} as const

/*
|--------------------------------------------------------------------------
| Recommendation Weights
|--------------------------------------------------------------------------
*/

export const RECOMMENDATION_WEIGHTS = {
  impact: 0.45,
  confidence: 0.35,
  estimatedGain: 0.20,
} as const

/*
|--------------------------------------------------------------------------
| Alert Penalties
|--------------------------------------------------------------------------
*/

export const ALERT_PENALTIES = {
  critical: 20,
  high: 10,
  medium: 5,
  low: 2,
} as const
/*
|--------------------------------------------------------------------------
| Score Levels
|--------------------------------------------------------------------------
*/

export const SCORE_LEVELS = {
  excellent: 90,
  good: 70,
  warning: 50,
  critical: 0,
} as const

/*
|--------------------------------------------------------------------------
| Trend Thresholds
|--------------------------------------------------------------------------
*/

export const TREND_THRESHOLDS = {
  strongGrowth: 20,
  growth: 10,
  stable: 5,
  decline: -10,
  strongDecline: -20,
} as const

/*
|--------------------------------------------------------------------------
| Publication Status
|--------------------------------------------------------------------------
*/

export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  CLOSED: 'closed',
  INACTIVE: 'inactive',
} as const

/*
|--------------------------------------------------------------------------
| Supported Marketplaces
|--------------------------------------------------------------------------
*/

export const MARKETPLACES = {
  MERCADO_LIVRE: 'mercadolivre',
  SHOPEE: 'shopee',
} as const

/*
|--------------------------------------------------------------------------
| Timeline Events
|--------------------------------------------------------------------------
*/

export const TIMELINE_EVENTS = {
  CREATED: 'created',
  PUBLISHED: 'published',
  UPDATED: 'updated',
  PRICE_CHANGED: 'price_changed',
  STOCK_CHANGED: 'stock_changed',
  PAUSED: 'paused',
  REACTIVATED: 'reactivated',
  SOLD: 'sold',
  SYNCHRONIZED: 'synchronized',
  RECOMMENDATION: 'recommendation',
} as const

/*
|--------------------------------------------------------------------------
| Alert Severities
|--------------------------------------------------------------------------
*/

export const ALERT_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const

/*
|--------------------------------------------------------------------------
| Recommendation Priorities
|--------------------------------------------------------------------------
*/

export const RECOMMENDATION_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const

/*
|--------------------------------------------------------------------------
| Intelligence Cache
|--------------------------------------------------------------------------
*/

export const CACHE_KEYS = {
  DASHBOARD: 'intelligence:dashboard',
  FORECAST: 'intelligence:forecast',
  ALERTS: 'intelligence:alerts',
  RECOMMENDATIONS: 'intelligence:recommendations',
  MARKET: 'intelligence:market',
} as const

export const CACHE_TTL = {
  DASHBOARD: 300,
  FORECAST: 900,
  ALERTS: 300,
  RECOMMENDATIONS: 600,
  MARKET: 1800,
} as const
