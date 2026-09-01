'use client'

import { useState } from 'react'
import { Search, Zap } from 'lucide-react'
import { abcFunctions, nineCauses } from '@/data/analysis'
import AnalysisCard from '@/components/AnalysisCard'
import BorderCollieSVG from '@/components/BorderCollieSVG'

export default function AnalysisPage() {
  const [tab, setTab] = useState<'abc' | 'causes'>('abc')

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 border-2 border-pink-100 shadow-soft mb-3">
          <Search size={16} className="text-pink-400" />
          <span className="text-xs font-extrabold text-pink-500">科學行為分析</span>
        </div>
        <h1 className="text-2xl font-black text-ink-800">行為分析工具</h1>
        <p className="text-sm text-ink-400 font-semibold mt-1">用 ABC 找出行為功能，用九大成因層次完整檢視</p>
      </div>

      <div className="flex rounded-3xl bg-white/80 backdrop-blur-sm border-2 border-pink-100 p-1.5 shadow-soft">
        <button
          onClick={() => setTab('abc')}
          className={`flex-1 py-3 text-sm font-extrabold rounded-2xl transition-all duration-200 ${
            tab === 'abc'
              ? 'bg-gradient-pink text-white shadow-soft'
              : 'text-ink-500 hover:bg-pink-50 hover:text-pink-500'
          }`}
        >
          🔍 ABC 行為功能
        </button>
        <button
          onClick={() => setTab('causes')}
          className={`flex-1 py-3 text-sm font-extrabold rounded-2xl transition-all duration-200 ${
            tab === 'causes'
              ? 'bg-gradient-mint text-white shadow-mint'
              : 'text-ink-500 hover:bg-mint-50 hover:text-mint-500'
          }`}
        >
          📋 九大成因
        </button>
      </div>

      {tab === 'abc' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-pink-50 to-lavender-50 rounded-3xl border-2 border-pink-100 p-5 shadow-soft">
            <h2 className="font-extrabold text-pink-700 mb-2 text-lg">🔍 ABC 分析核心</h2>
            <p className="text-sm text-ink-600 leading-relaxed font-semibold">
              A（Antecedent）前事：行為發生前出現了什麼？<br/>
              B（Behavior）行為：狗狗具體做了什麼？<br/>
              C（Consequence）後果：行為發生後，狗狗得到了什麼、逃離了什麼？
            </p>
            <div className="flex justify-center mt-3">
              <BorderCollieSVG size={90} pose="standing" />
            </div>
          </div>
          {abcFunctions.map(fn => (
            <AnalysisCard key={fn.id} item={fn} type="abc" />
          ))}
        </div>
      )}

      {tab === 'causes' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-mint-50 to-lavender-50 rounded-3xl border-2 border-mint-100 p-5 shadow-soft">
            <h2 className="font-extrabold text-mint-700 mb-2 text-lg">📋 九大成因層次檢查</h2>
            <p className="text-sm text-ink-600 leading-relaxed font-semibold">
              狗狗行為通常不是單一原因，而是多層因素疊加。如果你只找到一個原因，通常代表分析還不夠完整。
            </p>
            <div className="flex justify-center mt-3">
              <BorderCollieSVG size={85} pose="sitting" />
            </div>
          </div>
          {nineCauses.map(cause => (
            <AnalysisCard key={cause.id} item={cause} type="cause" />
          ))}
        </div>
      )}
    </div>
  )
}
