export const EXECUTIVE_WEIGHTS = {
  security: 0.40,

  architecture: 0.30,

  codeSmells: 0.20,

  complexity: 0.10,
} as const

export const HEALTH_LEVELS = {
  excellent: 90,

  good: 75,

  warning: 50,
} as const
export const RISK_WEIGHTS = {
  LOW: 1,

  MEDIUM: 3,

  HIGH: 6,

  CRITICAL: 10,
} as const

export const RISK_LEVELS = {
  LOW: 25,

  MEDIUM: 50,

  HIGH: 75,
} as const

export const TECHNICAL_DEBT_LEVELS = {
  LOW: 8,

  MEDIUM: 24,

  HIGH: 48,
} as const