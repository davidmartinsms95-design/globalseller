export interface AuditModule {
  id: string

  name: string

  enabled: boolean
}

export const auditModules: AuditModule[] = [
  {
    id: 'imports',
    name: 'Import Analyzer',
    enabled: true,
  },
  {
    id: 'dependencies',
    name: 'Dependency Analyzer',
    enabled: false,
  },
  {
    id: 'dead-code',
    name: 'Dead Code Analyzer',
    enabled: false,
  },
  {
    id: 'duplicates',
    name: 'Duplicate Code Analyzer',
    enabled: false,
  },
  {
    id: 'architecture',
    name: 'Architecture Analyzer',
    enabled: false,
  },
  {
    id: 'security',
    name: 'Security Analyzer',
    enabled: false,
  },
  {
    id: 'performance',
    name: 'Performance Analyzer',
    enabled: false,
  },
  {
    id: 'database',
    name: 'Database Analyzer',
    enabled: false,
  },
  {
    id: 'marketplace',
    name: 'Marketplace Analyzer',
    enabled: false,
  },
  {
    id: 'intelligence',
    name: 'AI Intelligence Analyzer',
    enabled: false,
  },
]