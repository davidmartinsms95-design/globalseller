import type {
  DependencyGraph,
} from './dependencyGraph.types'

export interface DependencyCycle {
  path: string[]
}

export function detectCycles(
  graph: DependencyGraph,
): DependencyCycle[] {
  const cycles: DependencyCycle[] = []

  const visited = new Set<string>()

  const stack = new Set<string>()

  function visit(
    nodePath: string,
    trail: string[],
  ) {
    if (stack.has(nodePath)) {
      const start =
        trail.indexOf(nodePath)

      cycles.push({
        path: trail.slice(start),
      })

      return
    }

    if (visited.has(nodePath)) {
      return
    }

    visited.add(nodePath)

    stack.add(nodePath)

    const node =
      graph.nodes.get(nodePath)

    if (node) {
      for (const dependency of node.imports) {
        visit(
          dependency,
          [
            ...trail,
            dependency,
          ],
        )
      }
    }

    stack.delete(nodePath)
  }

  for (const node of graph.nodes.values()) {
    visit(
      node.path,
      [node.path],
    )
  }

  return cycles
}