'use client'

import { useEffect, useState } from 'react'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  Tooltip,
} from 'recharts'

interface ChartData {
  day: string
  sales: number
}

export default function SalesChart() {
  const [data, setData] = useState<ChartData[]>([])

  useEffect(() => {
    async function loadChart() {
      try {
        const response = await fetch('/api/dashboard/chart')

        const result = await response.json()

        setData(result)
      } catch (error) {
        console.error(error)
      }
    }

    loadChart()
  }, [])

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#27272a" />

          <XAxis
            dataKey="day"
            stroke="#a1a1aa"
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="sales"
            stroke="#f97316"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}