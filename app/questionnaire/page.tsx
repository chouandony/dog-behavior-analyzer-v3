'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Home, Check, AlertCircle } from 'lucide-react'
import { questionnaireSections } from '@/data/questionnaire'
import { calculateScores, saveAssessment } from '@/data/scoring'
import StepIndicator from '@/components/StepIndicator'
import BorderCollieSVG from '@/components/BorderCollieSVG'

export default function QuestionnairePage() {
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showWarning, setShowWarning] = useState(false)

  const section = questionnaireSections[currentSection]
  const totalSections = questionnaireSections.length
  const progress = ((currentSection) / totalSections) * 100

  const setAnswer = useCallback((questionId: number, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
    // 作答後隱藏警告
    setShowWarning(false)
  }, [])

  // 檢查當前頁面是否全部作答
  const unansweredIds = section.questions
    .filter(q => answers[q.id] === undefined)
    .map(q => q.id)
  const allAnswered = unansweredIds.length === 0

  const nextSection = () => {
    if (!allAnswered) {
      setShowWarning(true)
      // 滾動到第一個未作答的題目
      const firstUnanswered = section.questions.find(q => answers[q.id] === undefined)
      if (firstUnanswered) {
        const el = document.getElementById(`q-${firstUnanswered.id}`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          el.classList.add('ring-2', 'ring-warm-400', 'ring-offset-2')
          setTimeout(() => el.classList.remove('ring-2', 'ring-warm-400', 'ring-offset-2'), 2000)
        }
      }
      return
    }

    if (currentSection < totalSections - 1) {
      setShowWarning(false)
      setCurrentSection(s => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // 完成問卷
      const result = calculateScores(answers)
      saveAssessment(result)
      router.push('/profile/')
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setShowWarning(false)
      setCurrentSection(s => s - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const sectionProgress = section.questions.filter(q => answers[q.id] !== undefined).length

  return (
    <div className="space-y-6">
      {/* 頂部導航 */}
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1.5 text-sm text-earth-400 hover:text-earth-500 px-3 py-2 rounded-lg hover:bg-earth-100 transition-colors">
          <Home size={16} /> 回首頁
        </Link>
        <span className="text-xs text-earth-400 font-medium">
          第 {currentSection + 1} / {totalSections} 部分
        </span>
      </div>

      {/* 進度條 */}
      <div className="w-full bg-earth-200 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-warm-500 h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-xs text-earth-400 text-center">
        已作答 {sectionProgress} / {section.questions.length} 題
      </div>

      {/* 區段標題 */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 border border-earth-200 shadow-sm">
          <span className="text-lg">{section.id === 'obedience' ? '🎓' : section.id === 'aggression' ? '⚠️' : section.id === 'fear_anxiety' ? '😰' : section.id === 'separation' ? '💔' : section.id === 'overexcitement' ? '🤩' : section.id === 'attachment' ? '💕' : '📋'}</span>
          <span className="text-sm font-bold text-earth-600">{section.title}</span>
        </div>
        <p className="text-sm text-earth-400 max-w-md mx-auto">{section.description}</p>
        <div className="flex justify-center">
          <BorderCollieSVG size={60} pose={currentSection % 2 === 0 ? 'sitting' : 'standing'} />
        </div>
      </div>

      {/* 量表說明 */}
      <div className="bg-white rounded-xl border border-earth-200 p-3">
        <div className="flex items-center justify-between text-xs text-earth-400">
          <span>0 = {section.zeroLabel}</span>
          <div className="flex gap-3">
            {section.scaleLabels.map((label, i) => (
              <span key={i} className="hidden sm:inline">{i + 1}={label}</span>
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-2 gap-1">
          {section.scaleLabels.map((label, i) => (
            <div key={i} className="flex-1 text-center">
              <div className="text-[10px] text-earth-400 mb-1 sm:hidden">{i + 1}</div>
              <div className="text-[10px] text-earth-400 hidden sm:block">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 警告區塊 */}
      {showWarning && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3 animate-fade-in-up">
          <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-600">請完成本頁所有題目</p>
            <p className="text-xs text-red-500 mt-0.5">
              尚有 {unansweredIds.length} 題未作答（題號: {unansweredIds.join(', ')}）
            </p>
          </div>
        </div>
      )}

      {/* 題目列表 */}
      <div className="space-y-4">
        {section.questions.map((q, idx) => {
          const currentVal = answers[q.id]
          const isUnanswered = currentVal === undefined
          return (
            <div 
              key={q.id} 
              id={`q-${q.id}`}
              className={`bg-white rounded-xl border p-4 space-y-3 animate-fade-in-up transition-all ${
                isUnanswered && showWarning 
                  ? 'border-red-300 shadow-sm' 
                  : 'border-earth-200'
              }`}
              style={{ animationDelay: `${idx * 0.03}s`, animationFillMode: 'both' }}
            >
              <div className="flex items-start gap-3">
                <span className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold transition-colors ${
                  isUnanswered && showWarning
                    ? 'bg-red-50 border-red-300 text-red-500'
                    : 'bg-cream border-earth-200 text-earth-500'
                }`}>
                  {q.id}
                </span>
                <p className="text-sm text-earth-500 font-medium leading-relaxed pt-0.5">{q.text}</p>
              </div>

              <div className="pl-10">
                <div className="flex gap-2">
                  {/* 0 選項 */}
                  <button
                    onClick={() => setAnswer(q.id, 0)}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-medium border transition-all ${
                      currentVal === 0
                        ? 'bg-earth-500 text-white border-earth-500'
                        : 'bg-earth-50 text-earth-400 border-earth-200 hover:border-earth-300'
                    }`}
                  >
                    0
                  </button>
                  {/* 1-5 選項 */}
                  {[1, 2, 3, 4, 5].map(val => (
                    <button
                      key={val}
                      onClick={() => setAnswer(q.id, val)}
                      className={`flex-1 py-2.5 rounded-lg text-xs font-bold border transition-all ${
                        currentVal === val
                          ? val <= 2
                            ? 'bg-green-500 text-white border-green-500'
                            : val === 3
                            ? 'bg-yellow-500 text-white border-yellow-500'
                            : 'bg-red-500 text-white border-red-500'
                          : 'bg-white text-earth-400 border-earth-200 hover:border-warm-300'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-1 px-1">
                  <span className="text-[10px] text-earth-300">{section.zeroLabel}</span>
                  <span className="text-[10px] text-earth-300">{section.scaleLabels[4]}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 底部導航 */}
      <div className="flex items-center justify-between pt-4 border-t border-earth-100 pb-6">
        {currentSection > 0 ? (
          <button 
            onClick={prevSection} 
            className="flex items-center gap-1.5 text-sm text-earth-400 hover:text-earth-500 px-3 py-2 rounded-lg hover:bg-earth-100 transition-colors"
          >
            <ArrowLeft size={16} /> 上一部分
          </button>
        ) : (
          <Link href="/" className="flex items-center gap-1.5 text-sm text-earth-400 hover:text-earth-500 px-3 py-2 rounded-lg hover:bg-earth-100 transition-colors">
            <Home size={16} /> 回首頁
          </Link>
        )}

        <button
          onClick={nextSection}
          className="flex items-center gap-1.5 text-sm font-medium px-5 py-2.5 rounded-xl transition-colors bg-warm-500 text-white hover:bg-warm-600"
        >
          {currentSection < totalSections - 1 ? (
            <>下一部分 <ArrowRight size={16} /></>
          ) : (
            <>完成評估 <Check size={16} /></>
          )}
        </button>
      </div>
    </div>
  )
}
