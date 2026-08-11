import type {
  ProjectIndex,
} from '../index/projectIndex'

import {
  analyzers,
} from '../analyzers/analyzerRegistry'

export function runAnalyzers(
  index: ProjectIndex,
) {
  return {
    imports:
      analyzers.imports(index),

    duplicateImports:
      analyzers.duplicateImports(index),

    unusedFiles:
      analyzers.unusedFiles(index),

    circularDependencies:
      analyzers.circularDependencies(
        index,
      ),

    largeFiles:
      analyzers.largeFiles(
        index,
      ),

    complexity:
      analyzers.complexity(
        index,
      ),

    deadCode:
      analyzers.deadCode(
        index,
      ),

    codeSmells:
      analyzers.codeSmells(
        index,
      ),

    architecture:
      analyzers.architecture(
        index,
      ),

    security:
      analyzers.security(
        index,
      ),
  }
}