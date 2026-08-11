/*
|--------------------------------------------------------------------------
| Basic Statistics
|--------------------------------------------------------------------------
*/

export function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0)
}

export function average(values: number[]): number {
  if (values.length === 0) {
    return 0
  }

  return sum(values) / values.length
}

export function min(values: number[]): number {
  if (values.length === 0) {
    return 0
  }

  return Math.min(...values)
}

export function max(values: number[]): number {
  if (values.length === 0) {
    return 0
  }

  return Math.max(...values)
}
/*
|--------------------------------------------------------------------------
| Median
|--------------------------------------------------------------------------
*/

export function median(values: number[]): number {
  if (values.length === 0) {
    return 0
  }

  const sorted = [...values].sort((a, b) => a - b)

  const middle = Math.floor(sorted.length / 2)

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2
  }

  return sorted[middle]
}
/*
|--------------------------------------------------------------------------
| Variance / Standard Deviation
|--------------------------------------------------------------------------
*/

export function variance(values: number[]): number {
  if (values.length === 0) {
    return 0
  }

  const avg = average(values)

  return (
    values.reduce(
      (total, value) => total + Math.pow(value - avg, 2),
      0,
    ) / values.length
  )
}

export function standardDeviation(
  values: number[],
): number {
  return Math.sqrt(variance(values))
}
/*
|--------------------------------------------------------------------------
| Growth
|--------------------------------------------------------------------------
*/

export function growthRate(
  previous: number,
  current: number,
): number {
  if (previous === 0) {
    return current === 0 ? 0 : 100
  }

  return ((current - previous) / previous) * 100
}

export function calculateTrend(
  values: number[],
): number {
  if (values.length < 2) {
    return 0
  }

  const middle = Math.floor(values.length / 2)

  const firstHalf = values.slice(0, middle)

  const secondHalf = values.slice(middle)

  return growthRate(
    average(firstHalf),
    average(secondHalf),
  )
}
/*
|--------------------------------------------------------------------------
| Moving Average
|--------------------------------------------------------------------------
*/

export function movingAverage(
  values: number[],
  window = 7,
): number {
  if (values.length === 0) {
    return 0
  }

  const slice =
    values.length <= window
      ? values
      : values.slice(-window)

  return average(slice)
}
/*
|--------------------------------------------------------------------------
| Normalize
|--------------------------------------------------------------------------
*/

export function normalize(
  value: number,
  minValue: number,
  maxValue: number,
): number {
  if (maxValue === minValue) {
    return 0
  }

  return (
    ((value - minValue) /
      (maxValue - minValue)) *
    100
  )
}

export function clamp(
  value: number,
  minValue: number,
  maxValue: number,
): number {
  return Math.min(
    maxValue,
    Math.max(minValue, value),
  )
}
/*
|--------------------------------------------------------------------------
| Percentage
|--------------------------------------------------------------------------
*/

export function percentage(
  value: number,
  total: number,
): number {
  if (total === 0) {
    return 0
  }

  return (value / total) * 100
}

/*
|--------------------------------------------------------------------------
| Confidence
|--------------------------------------------------------------------------
*/

export function confidenceScore(
  values: number[],
): number {
  if (values.length < 2) {
    return 50
  }

  const deviation = standardDeviation(values)

  const avg = average(values)

  if (avg === 0) {
    return 50
  }

  const coefficient =
    (deviation / avg) * 100

  const confidence = clamp(
    100 - coefficient,
    35,
    98,
  )

  return round(confidence, 1)
}
/*
|--------------------------------------------------------------------------
| Round
|--------------------------------------------------------------------------
*/

export function round(
  value: number,
  decimals = 2,
): number {
  return Number(value.toFixed(decimals))
}

export function roundCurrency(
  value: number,
): number {
  return round(value, 2)
}

export function roundPercentage(
  value: number,
): number {
  return round(value, 2)
}
