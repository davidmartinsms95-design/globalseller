export function averageScore(
  values: number[],
): number {
  if (values.length === 0) {
    return 0
  }

  const total =
    values.reduce(
      (sum, value) => sum + value,
      0,
    )

  return Math.round(
    total / values.length,
  )
}

export function sumValues(
  values: number[],
): number {
  return values.reduce(
    (sum, value) => sum + value,
    0,
  )
}

export function clamp(
  value: number,
  min = 0,
  max = 100,
): number {
  return Math.max(
    min,
    Math.min(max, value),
  )
}

export function percentage(
  value: number,
  total: number,
): number {
  if (total <= 0) {
    return 0
  }

  return Number(
    (
      (value / total) * 100
    ).toFixed(2),
  )
}

export function averagePrice(
  values: number[],
): number {
  if (values.length === 0) {
    return 0
  }

  return Number(
    (
      sumValues(values) /
      values.length
    ).toFixed(2),
  )
}