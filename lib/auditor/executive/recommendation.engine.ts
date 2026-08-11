import {
  ExecutiveRecommendation,
  TechnicalDebtPriority,
} from './executive.types'

export interface RecommendationAnalysisInput {
  architectureIssues: number
  complexityIssues: number
  codeSmellIssues: number
  deadCodeIssues: number
  circularDependencies: number
  duplicateImports: number
}

interface RecommendationRule {
  condition: boolean
  title: string
  description: string
  priority: TechnicalDebtPriority
}

export function buildRecommendations(
  input: RecommendationAnalysisInput,
): ExecutiveRecommendation[] {
  const rules: RecommendationRule[] = [
    {
      condition: input.architectureIssues > 0,
      title: 'Refatorar arquitetura',
      description:
        'Existem problemas arquiteturais que podem aumentar o acoplamento e dificultar a manutenção.',
      priority: 'HIGH',
    },
    {
      condition: input.circularDependencies > 0,
      title: 'Eliminar dependências circulares',
      description:
        'As dependências circulares tornam o sistema mais difícil de manter e evoluir.',
      priority: 'HIGH',
    },
    {
      condition: input.complexityIssues > 0,
      title: 'Reduzir complexidade',
      description:
        'Refatore métodos e componentes muito complexos para melhorar a legibilidade.',
      priority: 'MEDIUM',
    },
    {
      condition: input.codeSmellIssues > 0,
      title: 'Corrigir Code Smells',
      description:
        'Resolver Code Smells melhora a qualidade e reduz a dívida técnica.',
      priority: 'MEDIUM',
    },
    {
      condition: input.deadCodeIssues > 0,
      title: 'Remover código morto',
      description:
        'Eliminar código não utilizado reduz manutenção desnecessária.',
      priority: 'LOW',
    },
    {
      condition: input.duplicateImports > 0,
      title: 'Remover imports duplicados',
      description:
        'Eliminar imports duplicados melhora organização e legibilidade.',
      priority: 'LOW',
    },
  ]

  return rules
    .filter(rule => rule.condition)
    .map(rule => ({
      title: rule.title,
      description: rule.description,
      priority: rule.priority,
    }))
}