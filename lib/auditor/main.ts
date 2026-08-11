import path from 'node:path'

import { executeAudit } from './auditor.service'
import { printTerminalReport } from './reports/terminalReporter'

function main() {
  const target =
    process.argv[2] ?? '.'

  const root =
    path.resolve(
      process.cwd(),
      target,
    )

try {
  const { audit, metadata } =
    executeAudit(root)

  const result = audit

  printTerminalReport(result)

  console.log()

  console.log(
    `Tempo: ${metadata.duration} ms`,
  )
} catch (error) {
  console.error('')

  console.error(
    'Falha ao executar auditoria.',
  )

  console.error(error)

  process.exit(1)
}
}

main()