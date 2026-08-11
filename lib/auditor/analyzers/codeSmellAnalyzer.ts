import {
  collectCodeMetrics,
} from '../collectors/codeSmellCollector'

import type {
  ProjectIndex,
} from '../index/projectIndex'

import type {
  CodeSmell,
  CodeSmellReport,
  SmellSeverity,
} from '../types/codeSmell.types'

import { parseFile } from '../ast/parser'

import { visitFunctions } from '../ast/visitors/functionVisitor'

import { collectFunctionMetrics } from '../ast/visitors/functionMetricsVisitor'

export function analyzeCodeSmells(
  index: ProjectIndex,
): CodeSmellReport {
  const items: CodeSmell[] = []

  for (const file of index.files) {
    const metrics =
      collectCodeMetrics(file.path)

      const sourceFile = parseFile(
  file.path,
)

const functionMetrics =
  collectFunctionMetrics(
    sourceFile,
  )

const functions =
  visitFunctions(
    sourceFile,
  )

const issues: string[] = []

const recommendations: string[] = []

let score = 0

// Regra 1 - Muitos parâmetros
for (const fn of functions) {
  if (fn.parameters > 5) {
    issues.push(
      `Função "${fn.name}" possui ${fn.parameters} parâmetros.`,
    )

    recommendations.push(
      'Reduzir quantidade de parâmetros utilizando objetos ou refatoração.',
    )

    score += 2
  }
}

// Regra 2 - Funções muito grandes
for (const fn of functionMetrics) {
  if (fn.lines > 80) {
    issues.push(
      `Função "${fn.name}" possui ${fn.lines} linhas.`,
    )

    recommendations.push(
      'Dividir a função em responsabilidades menores.',
    )

    score += 2
  }
}

    if (metrics.lines > 500) {
      issues.push(
        `Arquivo muito grande (${metrics.lines} linhas)`,
      )

      recommendations.push(
        'Dividir o arquivo.',
      )

      score += 3
    }

    if (metrics.ifs > 10) {
      issues.push(
        `${metrics.ifs} instruções if.`,
      )

      recommendations.push(
        'Reduzir condicionais.',
      )

      score += 2
    }

    if (metrics.switches > 3) {
      issues.push(
        `${metrics.switches} switches.`,
      )

      recommendations.push(
        'Avaliar uso de Strategy.',
      )

      score += 2
    }

    if (metrics.returns > 8) {
      issues.push(
        `${metrics.returns} returns.`,
      )

      recommendations.push(
        'Simplificar fluxo.',
      )

      score += 1
    }

    if (metrics.trys > 3) {
      issues.push(
        `${metrics.trys} blocos try/catch.`,
      )

      recommendations.push(
        'Centralizar tratamento de erros.',
      )

      score += 1
    }

    if (score === 0) {
      continue
    }

    let severity: SmellSeverity = 'LOW'

    if (score >= 7) {
      severity = 'CRITICAL'
    } else if (score >= 5) {
      severity = 'HIGH'
    } else if (score >= 3) {
      severity = 'MEDIUM'
    }

    items.push({
      path: file.path,

      severity,

      score,

      issues,

      recommendations,
    })
  }

  items.sort(
    (a, b) => b.score - a.score,
  )

  return {
    totalFiles:
      index.files.length,

    totalSmells:
      items.length,

    items,
  }
}