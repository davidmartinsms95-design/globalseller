import type {
  ProjectIndex,
} from '../../index/projectIndex'

import type {
  ArchitectureIssue,
} from '../../types/architecture.types'

import {
  calculateSeverity,
} from './rule.types'

export function analyzeSRP(
  index: ProjectIndex,
): ArchitectureIssue[] {
  const items: ArchitectureIssue[] = []

  for (const file of index.files) {
    const issues: string[] = []

    const recommendations: string[] = []

    let score = 0

    const metrics = file.complexity

    // Acoplamento
    if (metrics.imports > 20) {
      issues.push(
        `Arquivo possui ${metrics.imports} imports.`,
      )

      recommendations.push(
        'Reduzir o acoplamento entre módulos.',
      )

      score += 2
    }

    // Arquivo muito grande
    if (metrics.lines >= 300) {
      issues.push(
        `Arquivo possui ${metrics.lines} linhas.`,
      )

      recommendations.push(
        'Dividir o componente em subcomponentes.',
      )

      if (metrics.lines >= 800) {
        score += 7
      } else if (metrics.lines >= 500) {
        score += 5
      } else {
        score += 3
      }
    }

    // Muitas funções
    if (metrics.functions > 8) {
      issues.push(
        `Arquivo possui ${metrics.functions} funções.`,
      )

      recommendations.push(
        'Separar responsabilidades em módulos menores.',
      )

      score += 2
    }

    // Muitas condicionais
    if (metrics.ifs > 10) {
      issues.push(
        `Arquivo possui ${metrics.ifs} instruções if.`,
      )

      recommendations.push(
        'Simplificar regras de negócio.',
      )

      score += 2
    }

    // JSX muito profundo
    if (metrics.jsxDepth > 10) {
      issues.push(
        `Árvore JSX com profundidade ${metrics.jsxDepth}.`,
      )

      recommendations.push(
        'Extrair componentes visuais.',
      )

      score += 2
    }

    if (score === 0) {
      continue
    }

    const severity =
      calculateSeverity(score)

    items.push({
      path: file.path,
      rule: 'SRP',
      severity,
      score,
      issues,
      recommendations,
    })
  }

  return items
}