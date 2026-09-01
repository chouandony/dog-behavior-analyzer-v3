'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import { behaviors } from '@/data/behaviors'
import { getStrategies } from '@/data/strategies'
import { techniques } from '@/data/techniques'
import ResultCard from '@/components/ResultCard'

function ResultContent() {
  const searchParams = useSearchParams()
  const behaviorIds = searchParams.get('behaviors')?.split(',').filter(Boolean) || []
  const fn = searchParams.get('fn') || undefined
  const a = searchParams.get('a')
  const b = searchParams.get('b')
  const c = searchParams.get('c')

  const behaviorList = behaviors.filter(b => behaviorIds.includes(b.id))

  if (behaviorList.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-earth-400">尚未選擇行為問題</p>
        <Link href="/abc/" className="inline-block text-warm-600 font-medium hover:underline">
          前往 ABC 分析
        </Link>
      </div>
    )
  }

  const allTechIds = Array.from(new Set(
    behaviorList.flatMap(b => getStrategies(b.id, fn).flatMap(s => s.techniques))
  ))

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/abc/" className="p-2 hover:bg-earth-100 rounded-lg transition-colors">
          <ArrowLeft size={20} className="text-earth-400" />
        </Link>
        <h1 className="text-xl font-bold text-earth-500">訓練對策建議</h1>
      </div>

      <div className="bg-white rounded-xl border border-earth-200 p-4 space-y-2">
        <div className="flex flex-wrap gap-2">
          {behaviorList.map(b => (
            <span key={b.id} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-warm-50 text-warm-700 text-sm font-medium border border-warm-200">
              <span>{b.emoji}</span>
              {b.name}
            </span>
          ))}
        </div>
        {(a || b || c) && (
          <div className="text-xs text-earth-400 pt-1">
            {a && <span>A: {a} </span>}
            {b && <span>B: {b} </span>}
            {c && <span>C: {c}</span>}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {behaviorList.map(b => {
          const strategies = getStrategies(b.id, fn)
          return (
            <div key={b.id} className="space-y-3">
              <h2 className="font-bold text-earth-500 flex items-center gap-2">
                <span>{b.emoji}</span>
                {b.name}
              </h2>
              {strategies.length === 0 ? (
                <p className="text-sm text-earth-400">暫無特定對策，請參考預設建議。</p>
              ) : (
                <div className="space-y-3">
                  {strategies.map((s, i) => (
                    <ResultCard key={i} step={s} index={i} />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {allTechIds.length > 0 && (
        <div className="bg-forest-50 rounded-xl border border-forest-200 p-4">
          <h3 className="font-bold text-forest-700 mb-2">📋 相關訓練技術一覽</h3>
          <div className="flex flex-wrap gap-2">
            {allTechIds.map(tid => {
              const tech = techniques.find(t => t.id === tid)
              if (!tech) return null
              return (
                <Link
                  key={tid}
                  href={`/techniques/#tech-${tid}`}
                  className="text-xs px-2.5 py-1.5 rounded-lg bg-white border border-forest-200 text-forest-600 hover:border-forest-400 transition-colors"
                >
                  {tech.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}

      <div className="flex justify-center pt-4">
        <Link
          href="/abc/"
          className="flex items-center gap-2 text-sm text-earth-400 hover:text-earth-500 transition-colors"
        >
          <RotateCcw size={16} />
          重新分析
        </Link>
      </div>
    </div>
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-earth-400">載入中...</div>}>
      <ResultContent />
    </Suspense>
  )
}
