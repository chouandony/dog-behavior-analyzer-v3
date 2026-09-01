'use client'

import { useState } from 'react'
import { BookOpen, Sparkles } from 'lucide-react'
import { techniques, categories } from '@/data/techniques'
import TechniqueCard from '@/components/TechniqueCard'
import BorderCollieSVG from '@/components/BorderCollieSVG'

export default function TechniquesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('全部')

  const filtered = activeCategory === '全部'
    ? techniques
    : techniques.filter(t => t.category === activeCategory)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <BorderCollieSVG size={90} pose="waving" />
        </div>
        <div className="inline-flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 border-2 border-pink-100 shadow-soft mb-3">
          <BookOpen size={16} className="text-pink-400" />
          <span className="text-xs font-extrabold text-pink-500">35種專業訓練技術</span>
        </div>
        <h1 className="text-2xl font-black text-ink-800">訓練技術總彙</h1>
        <p className="text-sm text-ink-400 font-semibold mt-1">點擊任一技能查看詳細解說與操作方式</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-extrabold transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-gradient-pink text-white shadow-soft scale-105'
                : 'bg-white/80 backdrop-blur-sm border-2 border-white shadow-soft text-ink-500 hover:border-pink-200 hover:text-pink-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(tech => (
          <div key={tech.id} id={`tech-${tech.id}`}>
            <TechniqueCard technique={tech} />
          </div>
        ))}
      </div>

      {/* 底部邊牧裝飾 */}
      <div className="flex justify-center pt-6 opacity-30">
        <BorderCollieSVG size={70} pose="sleeping" />
      </div>
    </div>
  )
}
