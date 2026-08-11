import {
  TechnicalDebt,
  TechnicalDebtPriority,
} from './executive.types'

export interface DebtAnalysisInput {
  complexityIssues: number
  architectureIssues: number
  codeSmellIssues: number
  deadFunctions: number
  deadClasses: number
  deadInterfaces: number
  deadTypes: number
  deadEnums: number
  deadExports: number
}

const HOURS = {
  complexity: 4,
  architecture: 2,
  codeSmell: 1,
  deadFunction: 0.5,
  deadClass: 2,
  deadInterface: 0.25,
  deadType: 0.25,
  deadEnum: 0.25,
  deadExport: 0.25,
} as const

function calculateEstimatedHours(
  input: DebtAnalysisInput,
): number {
  const total =
    input.complexityIssues * HOURS.complexity +
    input.architectureIssues * HOURS.architecture +
    input.codeSmellIssues * HOURS.codeSmell +
    input.deadFunctions * HOURS.deadFunction +
    input.deadClasses * HOURS.deadClass +
    input.deadInterfaces * HOURS.deadInterface +
    input.deadTypes * HOURS.deadType +
    input.deadEnums * HOURS.deadEnum +
    input.deadExports * HOURS.deadExport

  return Number(total.toFixed(2))
}

function determinePriority(
  estimatedHours: number,
): TechnicalDebtPriority {
  if (estimatedHours >= 80) {
    return 'HIGH'
  }

  if (estimatedHours >= 30) {
    return 'MEDIUM'
  }

  return 'LOW'
}

export function buildTechnicalDebt(
  input: DebtAnalysisInput,
): TechnicalDebt {
  const estimatedHours =
    calculateEstimatedHours(input)

  return {
    estimatedHours,
    priority: determinePriority(
      estimatedHours,
    ),
  }
}