import type {
  ProjectIndex,
} from '../../index/projectIndex'

import type {
  ArchitectureIssue,
} from '../../types/architecture.types'

import {
  calculateSeverity,
} from './rule.types'

export function analyzeGodComponent(
  index: ProjectIndex,
): ArchitectureIssue[] {
  const items: ArchitectureIssue[] = []

  for (const file of index.files) {
    const issues: string[] = []

    const recommendations: string[] = []

    let score = 0

    const metrics = file.complexity

    if (metrics.lines >= 500) {
      issues.push(
        `Arquivo possui ${metrics.lines} linhas.`,
      )

      recommendations.push(
        'Dividir o componente em componentes menores.',
      )

      score += 3
    }

    if (metrics.lines >= 800) {
      score += 2
    }

    if (metrics.functions > 12) {
      issues.push(
        `Arquivo possui ${metrics.functions} funções.`,
      )

      recommendations.push(
        'Extrair responsabilidades para serviços especializados.',
      )

      score += 3
    }

    if (metrics.imports > 25) {
      issues.push(
        `Arquivo possui ${metrics.imports} imports.`,
      )

      recommendations.push(
        'Reduzir dependências diretas entre módulos.',
      )

      score += 2
    }

    if (metrics.ifs > 15) {
      issues.push(
        `Arquivo possui ${metrics.ifs} condicionais.`,
      )

      recommendations.push(
        'Mover regras de negócio para camadas específicas.',
      )

      score += 2
    }

    if (metrics.jsxDepth > 12) {
      issues.push(
        `Árvore JSX com profundidade ${metrics.jsxDepth}.`,
      )

      recommendations.push(
        'Extrair componentes de apresentação.',
      )

      score += 2
    }

    if (score === 0) {
      continue
    }

    items.push({
      path: file.path,
      rule: 'GOD_COMPONENT',
      severity: calculateSeverity(score),
      score,
      issues,
      recommendations,
    })
  }

  return items
}