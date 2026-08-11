import type {
  ProjectIndex,
} from '../index/projectIndex'

import type {
  AnalyzerResults,
} from '../types/audit.types'

import type {
  ExecutiveReport,
} from '../reports/executiveReport.types'

import {
  analyzeArchitecture,
} from './architectureAnalyzer'

import {
  buildDependencyGraph,
} from '../graph/dependencyGraph.builder'

import {
  buildHotspotReport,
} from '../hotspots/hotspot.engine'

import {
  buildHotspotSummary,
} from '../hotspots/hotspot.report'

import {
  buildHealth,
} from '../executive/health.engine'

import {
  buildRisk,
} from '../executive/risk.engine'

import {
  buildTechnicalDebt,
} from '../executive/debt.engine'

import {
  buildRecommendations,
} from '../executive/recommendation.engine'

import {
  buildExecutiveMetrics,
} from '../executive/metrics.engine'

import {
  buildExecutiveReport,
} from '../reports/executiveReport.builder'

export function analyzeExecutive(
  index: ProjectIndex,
  analysis: AnalyzerResults,
): ExecutiveReport {
  const architecture =
    analyzeArchitecture(index)

  const dependencyGraph =
    buildDependencyGraph(index)

  const hotspotReport =
    buildHotspotReport(
      index,
      dependencyGraph,
    )

  const hotspots =
    buildHotspotSummary(
      hotspotReport,
    )

  const health =
    buildHealth(analysis)

  const risk =
    buildRisk(analysis)

  const complexityIssues =
    analysis.complexity.items.filter(
      (
        item,
      ) =>
        item.level ===
          'HIGH' ||
        item.level ===
          'CRITICAL',
    ).length

  const architectureIssues =
    analysis.architecture
      .totalIssues

  const codeSmellIssues =
    analysis.codeSmells
      .totalSmells

  const deadCodeIssues =
    analysis.deadCode
      .totalFunctions +
    analysis.deadCode
      .totalClasses +
    analysis.deadCode
      .totalInterfaces +
    analysis.deadCode
      .totalTypes +
    analysis.deadCode
      .totalEnums +
    analysis.deadCode
      .totalExports

  const circularDependencies =
  analysis
    .circularDependencies
    .totalCycles

  const duplicateImports =
  analysis
    .duplicateImports
    .totalDuplicates

  const technicalDebt =
    buildTechnicalDebt({
      complexityIssues,

      architectureIssues,

      codeSmellIssues,

      deadFunctions:
        analysis.deadCode
          .totalFunctions,

      deadClasses:
        analysis.deadCode
          .totalClasses,

      deadInterfaces:
        analysis.deadCode
          .totalInterfaces,

      deadTypes:
        analysis.deadCode
          .totalTypes,

      deadEnums:
        analysis.deadCode
          .totalEnums,

      deadExports:
        analysis.deadCode
          .totalExports,
    })

  const recommendations =
    buildRecommendations({
      architectureIssues,

      complexityIssues,

      codeSmellIssues,

      deadCodeIssues,

      circularDependencies,

      duplicateImports,
    })

  const criticalIssues =
    architecture.items.filter(
      (
        item,
      ) =>
        item.severity ===
        'CRITICAL',
    ).length +
    analysis
      .complexity
      .criticalFiles

  const warnings =
    architecture.items.filter(
      (
        item,
      ) =>
        item.severity ===
          'HIGH' ||
        item.severity ===
          'MEDIUM',
    ).length

  const executive =
    buildExecutiveMetrics({
      health,

      risk,

      technicalDebt,

      recommendations,

      analyzedFiles:
        index.files.length,

      criticalIssues,

      warnings,
    })

  return buildExecutiveReport(
  architecture,
  hotspots,
  hotspotReport,
  executive,
)
}