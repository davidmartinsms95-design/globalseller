import type {
  DependencyGraph,
  DependencyNode,
} from './dependencyGraph.types'

export function getNode(
  graph: DependencyGraph,
  path: string,
): DependencyNode | undefined {
  return graph.nodes.get(path)
}

export function getAllNodes(
  graph: DependencyGraph,
): DependencyNode[] {
  return [...graph.nodes.values()]
}

export function getHighFanOut(
  graph: DependencyGraph,
  threshold = 15,
): DependencyNode[] {
  return getAllNodes(graph).filter(
    (node) => node.fanOut >= threshold,
  )
}

export function getHighFanIn(
  graph: DependencyGraph,
  threshold = 15,
): DependencyNode[] {
  return getAllNodes(graph).filter(
    (node) => node.fanIn >= threshold,
  )
}

export function getIsolatedNodes(
  graph: DependencyGraph,
): DependencyNode[] {
  return getAllNodes(graph).filter(
    (node) =>
      node.fanIn === 0 &&
      node.fanOut === 0,
  )
}