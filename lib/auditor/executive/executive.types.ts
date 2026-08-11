export type HealthLevel =
  | 'EXCELLENT'
  | 'GOOD'
  | 'FAIR'
  | 'POOR'
  | 'CRITICAL'

export type RiskLevel =
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'CRITICAL'

export type TechnicalDebtPriority =
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'

export interface ExecutiveHealth {
  score: number
  level: HealthLevel
}

export interface ExecutiveRisk {
  score: number
  level: RiskLevel
}

export interface TechnicalDebt {
  estimatedHours: number
  priority: TechnicalDebtPriority
}

export interface ExecutiveRecommendation {
  title: string
  description: string
  priority: TechnicalDebtPriority
}

export interface ExecutiveKpis {
  totalIssues: number
  criticalIssues: number
  warnings: number
  analyzedFiles: number
}

export interface ExecutiveMetrics {
  score: number

  health: ExecutiveHealth

  risk: ExecutiveRisk

  technicalDebt: TechnicalDebt

  kpis: ExecutiveKpis

  recommendations: ExecutiveRecommendation[]
}