'use client'

import { useState } from 'react'
import { ChevronDown, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Technique } from '@/data/techniques'

interface Props {
  technique: Technique
}

const categoryColors: Record<string, string> = {
  '基礎訓練': 'bg-forest-50 text-forest-600 border-forest-200',
  '行為改造': 'bg-warm-50 text-warm-600 border-warm-200',
  '情緒調節': 'bg-blue-50 text-blue-600 border-blue-200',
  '安全管理': 'bg-red-50 text-red-600 border-red-200',
  '進階應用': 'bg-purple-50 text-purple-600 border-purple-200',
}

export default function TechniqueCard({ technique }: Props) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-xl border border-earth-200 overflow-hidden hover:shadow-sm transition-shadow">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 flex items-start gap-3"
      >
        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cream text-earth-500 font-bold text-sm shrink-0">
          {technique.id}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-earth-500">{technique.name}</h3>
            <span className={cn('text-xs px-2 py-0.5 rounded-full border', categoryColors[technique.category])}>
              {technique.category}
            </span>
          </div>
          <p className="text-xs text-earth-400 mt-0.5">{technique.subtitle}</p>
        </div>
        <ChevronDown
          size={20}
          className={cn('text-earth-400 shrink-0 transition-transform mt-1', expanded && 'rotate-180')}
        />
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-earth-100">
          <div className="pt-3 space-y-3">
            <div>
              <h4 className="text-sm font-bold text-earth-500 flex items-center gap-1.5 mb-1">
                <BookOpen size={14} className="text-warm-500" />
                用途
              </h4>
              <p className="text-sm text-earth-500 leading-relaxed">{technique.purpose}</p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-earth-500 mb-1">適用情境</h4>
              <div className="flex flex-wrap gap-1.5">
                {technique.applicable.map((item) => (
                  <span key={item} className="text-xs px-2 py-1 rounded-md bg-cream text-earth-500 border border-earth-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-earth-500 mb-1">操作方法</h4>
              <p className="text-sm text-earth-500 leading-relaxed">{technique.method}</p>
            </div>

            <div className="bg-warm-50 rounded-lg p-3 border border-warm-100">
              <h4 className="text-sm font-bold text-warm-700 mb-1">💡 提醒</h4>
              <p className="text-sm text-warm-600 leading-relaxed">{technique.tips}</p>
            </div>

            {technique.examples && technique.examples.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-earth-500 mb-1">範例</h4>
                <ul className="space-y-1.5">
                  {technique.examples.map((ex, i) => (
                    <li key={i} className="text-sm text-earth-500 flex items-start gap-2">
                      <span className="text-warm-500 shrink-0">•</span>
                      {ex}
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
