import type {
  ProjectIndex,
} from '../index/projectIndex'

import type {
  DependencyGraph,
  DependencyNode,
} from './dependencyGraph.types'

import {
  resolveImport,
} from './importResolver'

function findProjectFile(
  nodes: Map<string, DependencyNode>,
  importPath: string,
): string | null {
  const candidates = [
    importPath,
    `${importPath}.ts`,
    `${importPath}.tsx`,
    `${importPath}.js`,
    `${importPath}.jsx`,
    `${importPath}/index.ts`,
    `${importPath}/index.tsx`,
    `${importPath}/index.js`,
    `${importPath}/index.jsx`,
  ]

  for (const candidate of candidates) {
    if (nodes.has(candidate)) {
      return candidate
    }
  }

  return null
}

export function buildDependencyGraph(
  index: ProjectIndex,
): DependencyGraph {
  const nodes = new Map<
    string,
    DependencyNode
  >()

  for (const file of index.files) {
    nodes.set(file.path, {
      path: file.path,

      imports: [],

      importedBy: [],

      fanIn: 0,

      fanOut: 0,
    })
  }

  for (const file of index.files) {
    const node = nodes.get(file.path)!

    for (const item of file.imports) {
      const normalized =
        resolveImport(
          file.path,
          item.source,
        )

      if (!normalized) {
        continue
      }

      const resolved =
        findProjectFile(
          nodes,
          normalized,
        )

      if (!resolved) {
        continue
      }

      node.imports.push(
        resolved,
      )
    }

    node.fanOut =
      node.imports.length
  }

  for (const node of nodes.values()) {
    for (const dependency of node.imports) {
      const target =
        nodes.get(dependency)

      if (!target) {
        continue
      }

      target.importedBy.push(
        node.path,
      )
    }
  }

  for (const node of nodes.values()) {
    node.fanIn =
      node.importedBy.length
  }

  return {
    nodes,
  }
}