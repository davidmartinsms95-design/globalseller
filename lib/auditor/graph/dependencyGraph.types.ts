export interface DependencyNode {
  path: string

  imports: string[]

  importedBy: string[]

  fanIn: number

  fanOut: number
}

export interface DependencyGraph {
  nodes: Map<string, DependencyNode>
}