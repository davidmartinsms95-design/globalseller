export interface Hotspot {
  path: string

  score: number

  complexity: number

  fanIn: number

  fanOut: number

  lines: number

  reasons: string[]
}

export interface HotspotReport {
  hotspots: Hotspot[]

  totalHotspots: number

  averageScore: number

  highestScore: number
}
export interface HotspotSummary {
  totalHotspots: number

  averageScore: number

  highestScore: number

  topFiles: string[]
}