import type {
  ProjectIndex,
} from '../index/projectIndex'

import type {
  DependencyGraph,
} from '../graph/dependencyGraph.types'

import type {
  Hotspot,
  HotspotReport,
} from './hotspot.types'

export function buildHotspotReport(
  index: ProjectIndex,
  graph: DependencyGraph,
): HotspotReport {
  const hotspots: Hotspot[] = []

  for (const file of index.files) {
    const node =
      graph.nodes.get(file.path)

    if (!node) {
      continue
    }

    const complexity =
  Math.min(
    file.complexity.functions * 4 +
      file.complexity.ifs * 2 +
      file.complexity.switches * 5 +
      file.complexity.loops * 3 +
      file.complexity.jsxDepth * 2 +
      file.complexity.reactComponents +
      file.complexity.imports,
    100,
  )

    const fanIn =
      node.fanIn

    const fanOut =
      node.fanOut

    const lines =
      file.lines

    const score = Math.min(
      complexity * 0.45 +
        fanIn * 2 +
        fanOut * 2 +
        lines / 20,
      100,
    )

    const reasons: string[] = []

    if (complexity >= 70) {
      reasons.push(
        'High complexity',
      )
    }

    if (fanIn >= 10) {
      reasons.push(
        'High Fan-In',
      )
    }

    if (fanOut >= 10) {
      reasons.push(
        'High Fan-Out',
      )
    }

    if (lines >= 500) {
      reasons.push(
        'Large file',
      )
    }

    hotspots.push({
      path: file.path,
      score,

      complexity,

      fanIn,

      fanOut,

      lines,

      reasons,
    })
  }

  hotspots.sort(
    (a, b) => b.score - a.score,
  )

  const totalHotspots =
  hotspots.length

const averageScore =
  totalHotspots === 0
    ? 0
    : hotspots.reduce(
        (sum, hotspot) =>
          sum + hotspot.score,
        0,
      ) / totalHotspots

const highestScore =
  hotspots.length === 0
    ? 0
    : hotspots[0].score

return {
  hotspots,

  totalHotspots,

  averageScore,

  highestScore,
}
}