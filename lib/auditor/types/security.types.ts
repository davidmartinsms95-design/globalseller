export type SecuritySeverity =
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'CRITICAL'

export interface SecurityIssue {
  path: string

  severity: SecuritySeverity

  score: number

  issues: string[]

  recommendations: string[]
}

export interface SecurityReport {
  totalFiles: number

  totalIssues: number

  items: SecurityIssue[]
}