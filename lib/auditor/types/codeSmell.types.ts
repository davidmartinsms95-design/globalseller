export type SmellSeverity =
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'CRITICAL'

export interface CodeSmell {
  path: string

  severity: SmellSeverity

  score: number

  issues: string[]

  recommendations: string[]
}

export interface CodeSmellReport {
  totalFiles: number

  totalSmells: number

  items: CodeSmell[]
}