import type {
  ProjectIndex,
} from '../../index/projectIndex'

import type {
  ArchitectureIssue,
} from '../../types/architecture.types'

import {
  calculateSeverity,
} from './rule.types'

export function analyzeComplexity(
  index: ProjectIndex,
): ArchitectureIssue[] {
  const items: ArchitectureIssue[] = []

  for (const file of index.files) {
    const issues: string[] = []

    const recommendations: string[] = []

    let score = 0

    const metrics = file.complexity

    if (metrics.ifs > 10) {
      issues.push(
        `Arquivo possui ${metrics.ifs} condicionais.`,
      )

      recommendations.push(
        'Dividir regras de negócio em funções menores.',
      )

      score += 3
    }

    if (metrics.functions > 10) {
      issues.push(
        `Arquivo possui ${metrics.functions} funções.`,
      )

      recommendations.push(
        'Separar responsabilidades em módulos especializados.',
      )

      score += 2
    }

    if (metrics.jsxDepth > 10) {
      issues.push(
        `Árvore JSX com profundidade ${metrics.jsxDepth}.`,
      )

      recommendations.push(
        'Extrair componentes para reduzir profundidade.',
      )

      score += 2
    }

    if (metrics.imports > 20) {
      issues.push(
        `Arquivo possui ${metrics.imports} imports.`,
      )

      recommendations.push(
        'Reduzir dependências para simplificar a estrutura.',
      )

      score += 2
    }

    if (metrics.lines > 700) {
      issues.push(
        `Arquivo possui ${metrics.lines} linhas.`,
      )

      recommendations.push(
        'Dividir o arquivo em unidades menores.',
      )

      score += 2
    }

    if (score === 0) {
      continue
    }

    items.push({
      path: file.path,
      rule: 'COMPLEXITY',
      severity: calculateSeverity(score),
      score,
      issues,
      recommendations,
    })
  }

  return items
}