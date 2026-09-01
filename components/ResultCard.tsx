'use client'

import { cn } from '@/lib/utils'
import type { StrategyStep } from '@/data/strategies'
import { techniques } from '@/data/techniques'
import Link from 'next/link'

interface Props {
  step: StrategyStep
  index: number
}

const phaseColors = {
  '安全管理': 'bg-red-50 border-red-200 text-red-700',
  '核心訓練': 'bg-warm-50 border-warm-200 text-warm-700',
  '日常管理': 'bg-forest-50 border-forest-200 text-forest-700',
}

const priorityLabels = {
  required: '必須',
  recommended: '建議',
  optional: '可選',
}

export default function ResultCard({ step, index }: Props) {
  const techNames = step.techniques
    .map(id => techniques.find(t => t.id === id))
    .filter(Boolean)

  return (
    <div className="bg-white rounded-xl border border-earth-200 overflow-hidden">
      <div className={cn('px-4 py-2.5 border-b flex items-center justify-between', phaseColors[step.phase])}>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold">{step.phase}</span>
          <span className="text-xs font-bold opacity-60">Step {index + 1}</span>
        </div>
        <span className={cn(
          'text-[10px] px-2 py-0.5 rounded-full font-bold',
          step.priority === 'required' ? 'bg-red-100 text-red-600' :
          step.priority === 'recommended' ? 'bg-yellow-100 text-yellow-600' :
          'bg-gray-100 text-gray-500'
        )}>
          {priorityLabels[step.priority]}
        </span>
      </div>
      <div className="p-4 space-y-3">
        <h3 className="font-bold text-earth-500">{step.title}</h3>
        <p className="text-sm text-earth-400 leading-relaxed">{step.description}</p>
        {techNames.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {techNames.map(tech => (
              <Link
                key={tech!.id}
                href={`/techniques/#tech-${tech!.id}`}
                className="text-xs px-2 py-1 rounded-md bg-cream text-earth-500 border border-earth-200 hover:border-warm-300 transition-colors"
              >
                {tech!.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
