'use client'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'

interface ChartData {
  day: string
  sales: number
}

interface SalesChartProps {
  data: ChartData[]
}

export default function SalesChart({
  data,
}: SalesChartProps) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid
            stroke="#27272a"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="day"
            stroke="#a1a1aa"
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            contentStyle={{
              background: '#18181b',
              border: '1px solid #27272a',
              borderRadius: '16px',
              color: '#fff',
            }}
            cursor={{
              stroke: '#f97316',
              strokeDasharray: '3 3',
            }}
          />

          <Line
            type="monotone"
            dataKey="sales"
            stroke="#f97316"
            strokeWidth={4}
            dot={false}
            activeDot={{
              r: 6,
            }}
            animationDuration={900}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}