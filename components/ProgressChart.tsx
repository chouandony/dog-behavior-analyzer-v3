'use client'

import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface Record {
  date: string
  count: number
  intensity: number
  recovery: number
}

interface Props {
  records: Record[]
  title: string
}

export default function ProgressChart({ records, title }: Props) {
  const data = useMemo(() => {
    const grouped: Record<string, { count: number; intensity: number; recovery: number; n: number }> = {}
    records.forEach(r => {
      if (!grouped[r.date]) grouped[r.date] = { count: 0, intensity: 0, recovery: 0, n: 0 }
      grouped[r.date].count += r.count
      grouped[r.date].intensity += r.intensity
      grouped[r.date].recovery += r.recovery
      grouped[r.date].n += 1
    })
    return Object.entries(grouped)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, vals]) => ({
        date: date.slice(5),
        次數: vals.count,
        強度: Number((vals.intensity / vals.n).toFixed(1)),
        恢復: Number((vals.recovery / vals.n).toFixed(1)),
      }))
  }, [records])

  if (data.length === 0) return null

  return (
    <div className="bg-white rounded-xl border border-earth-200 p-4">
      <h3 className="text-sm font-bold text-earth-500 mb-3">{title}</h3>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D0" />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#8B7D6B' }} />
            <YAxis tick={{ fontSize: 10, fill: '#8B7D6B' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: '1px solid #E8E0D0', background: '#FFFBF5', fontSize: '12px' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Line type="monotone" dataKey="次數" stroke="#E86A33" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="強度" stroke="#D45A2A" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="恢復" stroke="#2D5A3D" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
