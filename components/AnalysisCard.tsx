'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  item: any
  type: 'abc' | 'cause'
}

export default function AnalysisCard({ item, type }: Props) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-xl border border-earth-200 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 flex items-start gap-3"
      >
        <span className="text-xl shrink-0">{item.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-earth-500">{item.name}</h3>
          <p className="text-xs text-earth-400 mt-0.5">{item.description.slice(0, 50)}...</p>
        </div>
        <ChevronDown
          size={20}
          className={cn('text-earth-400 shrink-0 transition-transform mt-1', expanded && 'rotate-180')}
        />
      </button>
      {expanded && (
        <div className="px-4 pb-4 border-t border-earth-100 space-y-3">
          <p className="text-sm text-earth-500 leading-relaxed">{item.description}</p>
          {type === 'abc' && item.examples && (
            <div>
              <h4 className="text-sm font-bold text-earth-500 mb-1">範例</h4>
              <ul className="space-y-1">
                {item.examples.map((ex: string, i: number) => (
                  <li key={i} className="text-sm text-earth-400">• {ex}</li>
                ))}
              </ul>
            </div>
          )}
          {type === 'abc' && item.keyQuestions && (
            <div>
              <h4 className="text-sm font-bold text-earth-500 mb-1">關鍵問題</h4>
              <ul className="space-y-1">
                {item.keyQuestions.map((q: string, i: number) => (
                  <li key={i} className="text-sm text-earth-400">❓ {q}</li>
                ))}
              </ul>
            </div>
          )}
          {type === 'cause' && item.checklist && (
            <div>
              <h4 className="text-sm font-bold text-earth-500 mb-1">檢查清單</h4>
              <ul className="space-y-1">
                {item.checklist.map((c: string, i: number) => (
                  <li key={i} className="text-sm text-earth-400">☐ {c}</li>
                ))}
              </ul>
            </div>
          )}
          {type === 'cause' && item.actionItems && (
            <div>
              <h4 className="text-sm font-bold text-earth-500 mb-1">行動項目</h4>
              <ul className="space-y-1">
                {item.actionItems.map((a: string, i: number) => (
                  <li key={i} className="text-sm text-earth-400">→ {a}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
