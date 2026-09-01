'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, ClipboardList, BookOpen, Search, BarChart3, Sparkles, FileText } from 'lucide-react'
import { behaviors } from '@/data/behaviors'
import BehaviorCard from '@/components/BehaviorCard'
import BorderCollieSVG from '@/components/BorderCollieSVG'
import { loadAssessment } from '@/data/scoring'

export default function HomePage() {
  const [selected, setSelected] = useState<string[]>([])
  const [hasAssessment, setHasAssessment] = useState(false)

  useEffect(() => {
    setHasAssessment(!!loadAssessment())
  }, [])

  const toggleBehavior = useCallback((id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }, [])

  const queryString = selected.length > 0 ? `?behaviors=${selected.join(',')}` : ''

  return (
    <div className="space-y-6">
      {/* Hero 区域 */}
      <div className="relative bg-gradient-to-br from-forest-50 via-cream to-warm-50 rounded-3xl border-2 border-earth-200 p-6 overflow-hidden">
        <div className="absolute top-3 right-3 opacity-10">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <ellipse cx="30" cy="35" rx="12" ry="10" fill="#8B7D6B" />
            <ellipse cx="18" cy="20" rx="5" ry="6" fill="#8B7D6B" />
            <ellipse cx="30" cy="15" rx="5" ry="6" fill="#8B7D6B" />
            <ellipse cx="42" cy="20" rx="5" ry="6" fill="#8B7D6B" />
          </svg>
        </div>
        <div className="flex items-center gap-4">
          <div className="shrink-0 animate-float">
            <BorderCollieSVG size={100} pose="waving" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={16} className="text-warm-500" />
              <span className="text-xs font-bold text-warm-600 tracking-wide">專業狗狗行為分析 2.0</span>
            </div>
            <h1 className="text-2xl font-black text-earth-600 leading-tight">
              狗狗行為分析
            </h1>
            <p className="text-sm text-earth-400 mt-1.5 leading-relaxed">
              100題行為評估問卷 + ABC分析 + 專業訓練對策
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-4 pt-4 border-t border-earth-200/60">
          <div className="flex items-center gap-1.5 text-xs text-earth-500">
            <div className="w-6 h-6 rounded-full bg-forest-100 flex items-center justify-center">
              <span className="text-[10px] font-bold text-forest-600">35</span>
            </div>
            <span>訓練技術</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-earth-500">
            <div className="w-6 h-6 rounded-full bg-warm-100 flex items-center justify-center">
              <span className="text-[10px] font-bold text-warm-600">10</span>
            </div>
            <span>行為類別</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-earth-500">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-[10px] font-bold text-blue-600">100</span>
            </div>
            <span>評估題目</span>
          </div>
        </div>
      </div>

      {/* 問卷入口 - 新增 */}
      <Link href="/questionnaire/" className="group block bg-gradient-to-r from-warm-50 to-orange-50 rounded-2xl border-2 border-warm-200 p-5 hover:border-warm-400 hover:shadow-md transition-all card-hover relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-warm-100 to-transparent opacity-50 rounded-bl-full" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-warm-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileText size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-bold text-earth-600">100題行為評估問卷</h2>
            <p className="text-sm text-earth-400 mt-0.5">
              {hasAssessment ? '您已完成評估，查看結果 →' : '透過科學問卷評估，全面了解狗狗的行為特質'}
            </p>
          </div>
          <ArrowRight size={20} className="text-warm-500 shrink-0 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>

      {/* 边牧提示条 */}
      <div className="flex items-center gap-3 bg-white rounded-xl border border-earth-200 p-3 card-hover">
        <div className="shrink-0">
          <BorderCollieSVG size={48} pose="pointing" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-earth-500 font-medium">👇 點擊下方卡片選擇行為問題</p>
          <p className="text-xs text-earth-400 mt-0.5">選擇後可以進行 ABC 行為分析</p>
        </div>
      </div>

      {/* 行为卡片列表 */}
      <div className="grid gap-3">
        {behaviors.map((b, index) => (
          <div 
            key={b.id} 
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
          >
            <BehaviorCard
              behavior={b}
              selected={selected.includes(b.id)}
              onToggle={() => toggleBehavior(b.id)}
            />
          </div>
        ))}
      </div>

      {/* 底部浮动按钮 */}
      {selected.length > 0 && (
        <div className="fixed bottom-6 left-0 right-0 px-4 z-40 animate-fade-in-up">
          <div className="max-w-2xl mx-auto">
            <Link
              href={`/abc/${queryString}`}
              className="flex items-center justify-center gap-2 w-full bg-warm-500 hover:bg-warm-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all active:scale-[0.98]"
            >
              <span>開始分析 ({selected.length})</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      )}

      {/* 功能入口 */}
      <div className="pt-4">
        <div className="flex items-center gap-2 mb-3">
          <BorderCollieSVG size={32} pose="sitting" />
          <h2 className="text-sm font-bold text-earth-500">更多工具</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/techniques/" className="group flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-earth-200 hover:border-warm-300 hover:shadow-md transition-all card-hover relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-warm-100 to-transparent opacity-50 rounded-bl-full" />
            <div className="w-10 h-10 rounded-xl bg-warm-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen size={22} className="text-warm-500" />
            </div>
            <span className="text-sm font-bold text-earth-500">35個訓練技術</span>
            <span className="text-[10px] text-earth-400">專業訓練方法總彙</span>
          </Link>
          <Link href="/analysis/" className="group flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-earth-200 hover:border-forest-300 hover:shadow-md transition-all card-hover relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-forest-100 to-transparent opacity-50 rounded-bl-full" />
            <div className="w-10 h-10 rounded-xl bg-forest-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Search size={22} className="text-forest-500" />
            </div>
            <span className="text-sm font-bold text-earth-500">ABC與九大成因</span>
            <span className="text-[10px] text-earth-400">科學行為分析工具</span>
          </Link>
          <Link href="/tracker/" className="group flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-earth-200 hover:border-blue-300 hover:shadow-md transition-all card-hover relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-100 to-transparent opacity-50 rounded-bl-full" />
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BarChart3 size={22} className="text-blue-500" />
            </div>
            <span className="text-sm font-bold text-earth-500">進度追蹤</span>
            <span className="text-[10px] text-earth-400">記錄改善趨勢</span>
          </Link>
          <Link href="/abc/" className="group flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-earth-200 hover:border-purple-300 hover:shadow-md transition-all card-hover relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-purple-100 to-transparent opacity-50 rounded-bl-full" />
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ClipboardList size={22} className="text-purple-500" />
            </div>
            <span className="text-sm font-bold text-earth-500">直接分析</span>
            <span className="text-[10px] text-earth-400">快速 ABC 分析</span>
          </Link>
        </div>
      </div>

      <div className="flex justify-center pt-4 opacity-40">
        <BorderCollieSVG size={80} pose="sleeping" />
      </div>
    </div>
  )
}
