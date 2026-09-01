'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, RotateCcw, AlertTriangle, CheckCircle, ChevronRight, Sparkles } from 'lucide-react'
import { loadAssessment, type AssessmentResult, getSeverityColor, getSeverityBadgeColor } from '@/data/scoring'
import { behaviors } from '@/data/behaviors'
import ProfileRadar from '@/components/ProfileRadar'
import BorderCollieSVG from '@/components/BorderCollieSVG'

export default function ProfilePage() {
  const router = useRouter()
  const [result, setResult] = useState<AssessmentResult | null>(null)

  useEffect(() => {
    const saved = loadAssessment()
    if (saved) {
      setResult(saved)
    } else {
      router.push('/questionnaire/')
    }
  }, [router])

  const radarData = useMemo(() => {
    if (!result) return []
    return result.sectionScores.map(s => ({
      subject: s.sectionTitle.replace('與分離有關的行為', '分離問題').replace('依戀和尋求關注', '依戀關注').replace('恐懼和焦慮', '恐懼焦慮'),
      score: s.average,
      fullMark: 5,
    }))
  }, [result])

  const overallColor = useMemo(() => {
    if (!result) return 'text-green-600'
    const map: Record<string, string> = {
      low: 'text-green-600',
      moderate: 'text-yellow-600',
      high: 'text-orange-600',
      severe: 'text-red-600',
    }
    return map[result.overallRisk] || 'text-green-600'
  }, [result])

  const overallBg = useMemo(() => {
    if (!result) return 'bg-green-50 border-green-200'
    const map: Record<string, string> = {
      low: 'bg-green-50 border-green-200',
      moderate: 'bg-yellow-50 border-yellow-200',
      high: 'bg-orange-50 border-orange-200',
      severe: 'bg-red-50 border-red-200',
    }
    return map[result.overallRisk] || 'bg-green-50 border-green-200'
  }, [result])

  const overallLabel = useMemo(() => {
    if (!result) return '輕度'
    const map: Record<string, string> = {
      low: '整體風險輕度',
      moderate: '整體風險中度',
      high: '整體風險高度',
      severe: '整體風險嚴重',
    }
    return map[result.overallRisk] || '輕度'
  }, [result])

  if (!result) {
    return (
      <div className="text-center py-12 text-earth-400">
        <div className="flex justify-center mb-4">
          <BorderCollieSVG size={80} pose="sleeping" />
        </div>
        載入中...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 標題 */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 border border-earth-200 shadow-sm">
          <Sparkles size={16} className="text-warm-500" />
          <span className="text-sm font-bold text-earth-600">行為評估結果</span>
        </div>
        <div className="flex justify-center">
          <BorderCollieSVG size={70} pose="waving" />
        </div>
      </div>

      {/* 整體風險卡片 */}
      <div className={`rounded-2xl border-2 p-5 ${overallBg}`}>
        <div className="flex items-center gap-3 mb-2">
          {result.overallRisk === 'severe' || result.overallRisk === 'high' ? (
            <AlertTriangle size={24} className={overallColor} />
          ) : (
            <CheckCircle size={24} className={overallColor} />
          )}
          <h2 className={`text-lg font-black ${overallColor}`}>{overallLabel}</h2>
        </div>
        <p className="text-sm text-earth-500 leading-relaxed">
          {result.overallRisk === 'severe' 
            ? '您的狗狗在多個行為領域表現出嚴重問題，強烈建議尋求專業獸醫行為醫學或合格訓練師的協助。'
            : result.overallRisk === 'high'
            ? '您的狗狗在某些行為領域需要關注，建議優先處理標記為高度/嚴重的項目。'
            : result.overallRisk === 'moderate'
            ? '您的狗狗有幾個行為領域值得關注，透過適當的訓練與管理可以有效改善。'
            : '您的狗狗整體行為表現良好！可以針對個別項目進行預防性訓練。'}
        </p>
      </div>

      {/* 雷達圖 */}
      <div className="bg-white rounded-2xl border border-earth-200 p-4">
        <h3 className="text-sm font-bold text-earth-500 text-center mb-2">行為特質剖面圖</h3>
        <ProfileRadar data={radarData} />
      </div>

      {/* 優先關注項目 */}
      {result.topConcerns.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-earth-500 flex items-center gap-2">
            <AlertTriangle size={16} className="text-warm-500" />
            優先關注行為
          </h3>
          {result.topConcerns.map(b => (
            <div key={b.behaviorId} className={`rounded-xl border p-4 ${getSeverityColor(b.severity)}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{b.emoji}</span>
                  <span className="font-bold">{b.behaviorName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${getSeverityBadgeColor(b.severity)}`}>
                    {b.severityLabel}
                  </span>
                  <span className="text-sm font-bold">{b.average.toFixed(1)}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {b.recommendations.map((rec, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white/60 text-earth-500">
                    {rec}
                  </span>
                ))}
              </div>
              <Link
                href={`/abc/?behaviors=${b.behaviorId}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-warm-600 hover:text-warm-700 hover:underline"
              >
                查看訓練對策 <ChevronRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* 全部行為分數 */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-earth-500">全部行為評分</h3>
        <div className="bg-white rounded-xl border border-earth-200 overflow-hidden">
          {result.behaviorScores.map((b, i) => (
            <div 
              key={b.behaviorId} 
              className={`flex items-center justify-between p-3 ${i !== result.behaviorScores.length - 1 ? 'border-b border-earth-100' : ''}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{b.emoji}</span>
                <div>
                  <span className="text-sm font-medium text-earth-500">{b.behaviorName}</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-20 h-1.5 bg-earth-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          b.severity === 'severe' ? 'bg-red-500' : 
                          b.severity === 'high' ? 'bg-orange-500' : 
                          b.severity === 'moderate' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${(b.average / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-earth-400">{b.answeredCount}題</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${getSeverityBadgeColor(b.severity)}`}>
                  {b.severityLabel}
                </span>
                <span className="text-sm font-bold text-earth-500 w-10 text-right">{b.average.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 區段詳細分數 */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-earth-500">問卷各區段分數</h3>
        <div className="grid gap-2">
          {result.sectionScores.map(s => (
            <div key={s.sectionId} className="bg-white rounded-xl border border-earth-200 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-earth-500">{s.sectionTitle}</span>
                <span className="text-[10px] text-earth-400">({s.answeredCount}/{s.totalCount}題)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${getSeverityBadgeColor(s.severity)}`}>
                  {s.severityLabel}
                </span>
                <span className="text-sm font-bold text-earth-500 w-10 text-right">{s.average.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部按鈕 */}
      <div className="flex flex-col gap-3 pt-4 pb-6">
        <Link
          href="/questionnaire/"
          className="flex items-center justify-center gap-2 w-full bg-earth-100 hover:bg-earth-200 text-earth-500 font-bold py-3 rounded-xl transition-colors"
        >
          <RotateCcw size={18} />
          重新評估
        </Link>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 w-full bg-warm-500 hover:bg-warm-600 text-white font-bold py-3 rounded-xl transition-colors"
        >
          <span>返回首頁</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  )
}
