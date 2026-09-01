'use client'

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { useMemo } from 'react'

interface Props {
  data: { subject: string; score: number; fullMark: number }[]
}

export default function ProfileRadar({ data }: Props) {
  const maxScore = useMemo(() => Math.max(...data.map(d => d.score), 3), [data])

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#E8E0D0" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#8B7D6B', fontSize: 12, fontWeight: 600 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, Math.ceil(maxScore)]} 
            tick={{ fill: '#D4C9B0', fontSize: 10 }}
            axisLine={false}
          />
          <Radar
            name="行為分數"
            dataKey="score"
            stroke="#E86A33"
            fill="#E86A33"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '12px', 
              border: '1px solid #E8E0D0',
              background: '#FFFBF5',
              fontSize: '12px'
            }}
            formatter={(value: number) => [`${value.toFixed(2)}`, '平均分']}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
