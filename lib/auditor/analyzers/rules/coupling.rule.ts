import type {
  ProjectIndex,
} from '../../index/projectIndex'

import type {
  ArchitectureIssue,
} from '../../types/architecture.types'

import {
  calculateSeverity,
} from './rule.types'

export function analyzeCoupling(
  index: ProjectIndex,
): ArchitectureIssue[] {
  const items: ArchitectureIssue[] = []

  for (const file of index.files) {
    const issues: string[] = []

    const recommendations: string[] = []

    let score = 0

    const {
      imports,
    } = file.complexity

    if (imports > 15) {
      issues.push(
        `Arquivo possui ${imports} imports.`,
      )

      recommendations.push(
        'Avaliar a extração de serviços ou módulos para reduzir dependências.',
      )

      score += 2
    }

    if (imports > 25) {
      issues.push(
        'Acoplamento elevado entre módulos.',
      )

      recommendations.push(
        'Dividir responsabilidades e aplicar inversão de dependência quando possível.',
      )

      score += 3
    }

    if (imports > 40) {
      issues.push(
        'Acoplamento crítico detectado.',
      )

      recommendations.push(
        'Refatorar a arquitetura do arquivo para reduzir dependências diretas.',
      )

      score += 5
    }

    if (score === 0) {
      continue
    }

    items.push({
      path: file.path,
      rule: 'COUPLING',
      severity: calculateSeverity(score),
      score,
      issues,
      recommendations,
    })
  }

  return items
}