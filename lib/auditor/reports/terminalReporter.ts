import type {
  AuditResult,
} from '../types/audit.types'

function printHeader() {
}

function printImports(
  report: AuditResult,
) {
  console.log('Imports')
  console.log('-------')

  console.log(
    `Arquivos analisados: ${report.analysis.imports.totalFiles}`,
  )

  console.log(
    `Imports encontrados: ${report.analysis.imports.totalImports}`,
  )

  console.log(
    `Média por arquivo: ${report.analysis.imports.averageImportsPerFile}`,
  )

  console.log()
}

function printDuplicateImports(
  report: AuditResult,
) {
  console.log('Duplicate Imports')
  console.log('-----------------')

  console.log(
    `Arquivos com imports duplicados: ${report.analysis.duplicateImports.filesWithDuplicates}`,
  )

  console.log(
    `Imports duplicados encontrados: ${report.analysis.duplicateImports.totalDuplicates}`,
  )

  if (report.analysis.duplicateImports.items.length === 0) {
    console.log(
      'Nenhum import duplicado encontrado.',
    )
  } else {
    console.log()

    for (const item of report.analysis.duplicateImports.items) {
      console.log(item.file)

      for (const duplicate of item.duplicates) {
        console.log(
          `   • ${duplicate.source} (${duplicate.count}x)`,
        )
      }

      console.log()
    }
  }

  console.log()
}

function printUnusedFiles(
  report: AuditResult,
) {
  console.log('Unused Files')
  console.log('------------')

  console.log(
    `Arquivos não utilizados: ${report.analysis.unusedFiles.totalUnusedFiles}`,
  )

  if (report.analysis.unusedFiles.items.length === 0) {
    console.log(
      'Nenhum arquivo órfão encontrado.',
    )
  } else {
    console.log()

    for (const item of report.analysis.unusedFiles.items) {
      console.log(item.path)
    }
  }

  console.log()
}

function printCircularDependencies(
  report: AuditResult,
) {
  console.log('Circular Dependencies')
  console.log('---------------------')

  console.log(
    `Ciclos encontrados: ${report.analysis.circularDependencies.totalCycles}`,
  )

  if (report.analysis.circularDependencies.items.length === 0) {
    console.log(
      'Nenhuma dependência circular encontrada.',
    )
  } else {
    console.log()

    for (const cycle of report.analysis.circularDependencies.items) {
      console.log(
        cycle.cycle.join(' -> '),
      )

      console.log()
    }
  }

  console.log()
}

function printLargeFiles(
  report: AuditResult,
) {
  console.log('Large Files')
  console.log('-----------')

  console.log(
    `Arquivos grandes: ${report.analysis.largeFiles.totalLargeFiles}`,
  )

  if (report.analysis.largeFiles.items.length === 0) {
    console.log(
      'Nenhum arquivo acima do limite encontrado.',
    )
  } else {
    console.log()

    for (const item of report.analysis.largeFiles.items) {
      console.log(
        `${item.lines} linhas - ${item.path}`,
      )
    }
  }

  console.log()
}

function printComplexity(
  report: AuditResult,
) {
  console.log('Complexity')
  console.log('----------')

  console.log(
    `Arquivos analisados: ${report.analysis.complexity.totalFiles}`,
  )

  console.log(
    `Complexidade média: ${report.analysis.complexity.averageScore}`,
  )

  console.log(
    `Arquivos críticos: ${report.analysis.complexity.criticalFiles}`,
  )

  console.log()

  const topFiles =
    report.analysis.complexity.items.slice(0, 10)

  for (const item of topFiles) {
    console.log(
      `[${item.level}] ${item.score} - ${item.path}`,
    )

    if (
      item.recommendations.length > 0
    ) {
      for (const recommendation of item.recommendations) {
        console.log(
          `   • ${recommendation}`,
        )
      }
    }

    console.log()
  }
}

function printCodeSmells(
  report: AuditResult,
) {
  console.log('Code Smells')

  console.log('------------')

  console.log()

  console.log(
    `Arquivos analisados: ${report.analysis.codeSmells.totalFiles}`,
  )

  console.log(
    `Smells encontrados: ${report.analysis.codeSmells.totalSmells}`,
  )

  console.log()

  for (const smell of report.analysis.codeSmells.items.slice(0, 10)) {
    console.log(
      `[${smell.severity}] ${smell.path}`,
    )

    for (const issue of smell.issues) {
      console.log(
        `  • ${issue}`,
      )
    }

    if (
      smell.recommendations.length > 0
    ) {
      console.log(
        '  Recomendações:',
      )

      for (const recommendation of smell.recommendations) {
        console.log(
          `    - ${recommendation}`,
        )
      }
    }

    console.log()
  }

  console.log()
}

function printArchitectureAnalysis(
  report: AuditResult,
) {
  console.log(
    'Architecture Analysis',
  )

  console.log(
    '---------------------',
  )

  console.log()

  console.log(
    `Arquivos analisados: ${report.analysis.architecture.totalFiles}`,
  )

  console.log(
    `Problemas encontrados: ${report.analysis.architecture.totalIssues}`,
  )

  console.log()

  for (const item of report.analysis.architecture.items.slice(0, 10)) {
    console.log(
      `[${item.severity}] ${item.path}`,
    )

    for (const issue of item.issues) {
      console.log(
        `  • ${issue}`,
      )
    }

    if (item.recommendations.length > 0) {
      console.log(
        '  Recomendações:',
      )

      for (const recommendation of item.recommendations) {
        console.log(
          `    - ${recommendation}`,
        )
      }
    }

    console.log()
  }

  console.log()
}

function printDeadCode(
  report: AuditResult,
) {
console.log('Dead Code')
console.log('---------')

console.log(
  `Funções encontradas: ${report.analysis.deadCode.totalFunctions}`,
)

console.log(
  `Interfaces encontradas: ${report.analysis.deadCode.totalInterfaces}`,
)

console.log(
  `Types encontrados: ${report.analysis.deadCode.totalTypes}`,
)

console.log(
  `Enums encontrados: ${report.analysis.deadCode.totalEnums}`,
)

console.log(
  `Classes encontradas: ${report.analysis.deadCode.totalClasses}`,
)

console.log(
  `Exports encontrados: ${report.analysis.deadCode.totalExports}`,
)

console.log()

for (const item of report.analysis.deadCode.items) {
  if (
    item.functions.length === 0 &&
    item.interfaces.length === 0 &&
    item.types.length === 0 &&
    item.enums.length === 0 &&
    item.classes.length === 0 &&
    item.exports.length === 0
  ) {
    continue
  }

  console.log(item.path)

  if (item.functions.length > 0) {
    console.log(
      `  Functions: ${item.functions.join(', ')}`,
    )
  }

  if (item.interfaces.length > 0) {
    console.log(
      `  Interfaces: ${item.interfaces.join(', ')}`,
    )
  }

  if (item.types.length > 0) {
    console.log(
      `  Types: ${item.types.join(', ')}`,
    )
  }

  if (item.enums.length > 0) {
    console.log(
      `  Enums: ${item.enums.join(', ')}`,
    )
  }

  if (item.classes.length > 0) {
    console.log(
      `  Classes: ${item.classes.join(', ')}`,
    )
  }

  if (item.exports.length > 0) {
    console.log(
      `  Exports: ${item.exports.join(', ')}`,
    )
  }

  console.log()
}

console.log()
}

export function printTerminalReport(
  report: AuditResult,
) {
  printHeader()

  printImports(report)

  printDuplicateImports(report)

  printUnusedFiles(report)

  printCircularDependencies(report)

  printLargeFiles(report)

  printComplexity(report)

  printDeadCode(report)

  printCodeSmells(report)

  printArchitectureAnalysis(report)
}