'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface SalesChartProps {
  data: {
    name: string
    total: number
  }[]
}

export default function SalesChart({
  data,
}: SalesChartProps) {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="total"
            stroke="#f97316"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
