'use client'

import { cn } from '@/lib/utils'
import type { Behavior } from '@/data/behaviors'

interface Props {
  behavior: Behavior
  selected: boolean
  onToggle: () => void
}

const dangerColors = {
  low: 'border-green-200 hover:border-green-300',
  medium: 'border-yellow-200 hover:border-yellow-300',
  high: 'border-red-200 hover:border-red-300',
}

const dangerBadgeColors = {
  low: 'bg-green-50 text-green-600',
  medium: 'bg-yellow-50 text-yellow-600',
  high: 'bg-red-50 text-red-600',
}

export default function BehaviorCard({ behavior, selected, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'w-full text-left p-4 rounded-xl border-2 transition-all card-hover bg-white',
        selected
          ? 'border-warm-400 bg-warm-50 shadow-md'
          : dangerColors[behavior.dangerLevel]
      )}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0">{behavior.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={cn(
              'font-bold text-sm',
              selected ? 'text-warm-700' : 'text-earth-500'
            )}>
              {behavior.name}
            </h3>
            <span className={cn(
              'text-[10px] px-1.5 py-0.5 rounded-full font-medium',
              dangerBadgeColors[behavior.dangerLevel]
            )}>
              {behavior.dangerLevel === 'high' ? '高危' : behavior.dangerLevel === 'medium' ? '中危' : '低危'}
            </span>
          </div>
          <p className="text-xs text-earth-400 mt-1 leading-relaxed">{behavior.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {behavior.commonCauses.slice(0, 3).map(cause => (
              <span key={cause} className="text-[10px] px-1.5 py-0.5 rounded bg-cream text-earth-400 border border-earth-200">
                {cause}
              </span>
            ))}
          </div>
        </div>
        <div className={cn(
          'w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5',
          selected
            ? 'bg-warm-500 border-warm-500'
            : 'border-earth-300'
        )}>
          {selected && (
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
    </button>
  )
}
