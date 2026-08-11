import { runAudit } from './runAudit'

export interface AuditMetadata {
  startedAt: Date
  finishedAt: Date

  duration: number

  success: boolean

  scannersExecuted: string[]

  errors: string[]
}

export interface AuditExecution {
  audit: ReturnType<typeof runAudit>

  metadata: AuditMetadata
}

export function executeAudit(
  root: string,
): AuditExecution {
  const startedAt = new Date()

  const scannersExecuted: string[] = []

  const errors: string[] = []

  try {
    const audit = runAudit(root)

    const finishedAt = new Date()

    return {
      audit,

      metadata: {
        startedAt,

        finishedAt,

        duration:
          finishedAt.getTime() -
          startedAt.getTime(),

        success: true,

        scannersExecuted,

        errors,
      },
    }
  } catch (error) {
    errors.push(
      error instanceof Error
        ? error.message
        : 'Unknown error',
    )

    throw error
  }
}