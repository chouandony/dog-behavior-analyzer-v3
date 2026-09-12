'use client'

import { useState } from 'react'
import { ChevronDown, CheckSquare, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  item: {
    name: string
    description: string
    icon: string
    examples?: string[]
    keyQuestions?: string[]
    checklist?: string[]
    actionItems?: string[]
  }
  type: 'abc' | 'cause'
}

export default function AnalysisCard({ item, type }: Props) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-xl border border-earth-200 overflow-hidden hover:shadow-sm transition-shadow">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 flex items-start gap-3"
      >
        <span className="text-2xl shrink-0">{item.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-earth-500">{item.name}</h3>
          <p className="text-sm text-earth-400 mt-0.5 line-clamp-2">{item.description}</p>
        </div>
        <ChevronDown
          size={20}
          className={cn('text-earth-400 shrink-0 transition-transform mt-1', expanded && 'rotate-180')}
        />
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-earth-100">
          <div className="pt-3 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-earth-500 mb-1.5">說明</h4>
              <p className="text-sm text-earth-500 leading-relaxed">{item.description}</p>
            </div>

            {type === 'abc' && item.examples && item.examples.length > 0 && (
              <div className="bg-cream rounded-lg p-3 border border-earth-200">
                <h4 className="text-sm font-bold text-earth-500 mb-2">📖 範例</h4>
                <ul className="space-y-2">
                  {item.examples.map((ex, i) => (
                    <li key={i} className="text-sm text-earth-500 flex items-start gap-2">
                      <span className="text-warm-500 shrink-0 font-bold">{i + 1}.</span>
                      <span className="leading-relaxed">{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {type === 'abc' && item.keyQuestions && item.keyQuestions.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-earth-500 flex items-center gap-1.5 mb-2">
                  <Lightbulb size={14} className="text-warm-500" />
                  判斷關鍵問題
                </h4>
                <ul className="space-y-1.5">
                  {item.keyQuestions.map((q, i) => (
                    <li key={i} className="text-sm text-earth-500 flex items-start gap-2">
                      <span className="text-warm-500 shrink-0">❓</span>
                      <span className="leading-relaxed">{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {type === 'cause' && item.checklist && item.checklist.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-earth-500 flex items-center gap-1.5 mb-2">
                  <CheckSquare size={14} className="text-forest-500" />
                  檢查清單
                </h4>
                <ul className="space-y-1.5">
                  {item.checklist.map((c, i) => (
                    <li key={i} className="text-sm text-earth-500 flex items-start gap-2">
                      <span className="text-forest-500 shrink-0">☐</span>
                      <span className="leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {type === 'cause' && item.actionItems && item.actionItems.length > 0 && (
              <div className="bg-forest-50 rounded-lg p-3 border border-forest-100">
                <h4 className="text-sm font-bold text-forest-700 mb-2">✅ 行動建議</h4>
                <ul className="space-y-1.5">
                  {item.actionItems.map((a, i) => (
                    <li key={i} className="text-sm text-forest-600 flex items-start gap-2">
                      <span className="shrink-0">→</span>
                      <span className="leading-relaxed">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}