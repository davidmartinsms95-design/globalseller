export type ArchitectureSeverity =
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'CRITICAL'

export type ArchitectureRule =
  | 'SRP'
  | 'COUPLING'
  | 'GOD_COMPONENT'
  | 'COMPLEXITY'
  | 'LAYERING'
  | 'FAN_IN'
  | 'FAN_OUT'
  | 'CIRCULAR_DEPENDENCY'
  | 'HOTSPOT'

export interface ArchitectureIssue {
  path: string

  rule: ArchitectureRule

  severity: ArchitectureSeverity

  score: number

  issues: string[]

  recommendations: string[]
}

export interface ArchitectureReport {
  totalFiles: number

  totalIssues: number

  items: ArchitectureIssue[]
}