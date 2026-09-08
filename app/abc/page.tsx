'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Home } from 'lucide-react'
import { behaviors } from '@/data/behaviors'
import { abcFunctions } from '@/data/analysis'
import StepIndicator from '@/components/StepIndicator'
import BorderCollieSVG from '@/components/BorderCollieSVG'

const antecedentOptions = [
  '陌生人靠近', '門鈴/敲門聲', '其他狗出現', '主人離開/準備出門',
  '看到移動物體（車/腳踏車）', '吃飯/有食物時', '觸摸/抱牠時',
  '玩耍中太興奮', '獨處時', '睡覺/休息被打擾', '特定聲音（雷聲/煙火/吸塵器）',
  '主人坐下/滑手機', '帶牽繩準備出門', '獸醫/剪指甲/洗澡', '沒有明顯前事'
]

const behaviorOptions = [
  '吠叫', '低吼/露齒', '撲人/衝向人', '咬/咬手', '爆衝/拉扯牽繩',
  '追車/追移動物', '亂尿/亂便', '啃咬家具/破壞', '來回踱步/焦慮',
  '護食/護玩具', '舔手/重複行為', '躲藏/發抖', '跳上跳下/過度興奮',
  '跟隨/討摸', '不聽指令/分心', '其他'
]

const consequenceOptions = [
  '陌生人/狗離開', '主人過來關注（摸/看/罵）', '得到食物/玩具',
  '門打開/出門成功', '可以繼續玩', '焦慮稍微降低', '移動目標被追趕',
  '主人停止觸摸/離開', '沒有任何後果（自我滿足）', '獲得安全感/距離', '其他'
]

function ABCForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const preselected = searchParams.get('behaviors')?.split(',').filter(Boolean)[0] || null

  // 改為單選：string | null
  const [selectedBehavior, setSelectedBehavior] = useState<string | null>(preselected)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({ a: '', b: '', c: '', functionId: '' })

  const behaviorList = behaviors.filter(b => b.id === selectedBehavior)
  const steps = ['選擇行為', '前事 (A)', '行為 (B)', '後果 (C)', '確認']

  const nextStep = () => setStep(s => Math.min(s + 1, 4))
  const prevStep = () => setStep(s => Math.max(s - 1, 0))

  const submit = () => {
    const params = new URLSearchParams()
    if (selectedBehavior) params.set('behaviors', selectedBehavior)
    if (answers.a) params.set('a', answers.a)
    if (answers.b) params.set('b', answers.b)
    if (answers.c) params.set('c', answers.c)
    if (answers.functionId) params.set('fn', answers.functionId)
    router.push(`/result/?${params.toString()}`)
  }

  // 單選防呆：必須選一個才能下一步
  const canProceed = step === 0 ? selectedBehavior !== null : true

  return (
    <div className="space-y-6">
      <StepIndicator currentStep={step} totalSteps={5} labels={steps} />

      {step === 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-earth-500">選擇要分析的行為</h2>
          <div className="flex justify-center py-2">
            <BorderCollieSVG size={80} pose="pointing" />
          </div>
          <p className="text-sm text-earth-400">請選擇一個您想了解的問題行為</p>
          <div className="grid gap-2">
            {behaviors.map(b => (
              <label
                key={b.id}
                className={`flex items-center gap-3 p-3 bg-white rounded-lg border cursor-pointer transition-colors ${
                  selectedBehavior === b.id
                    ? 'border-warm-400 bg-warm-50'
                    : 'border-earth-200 hover:border-warm-300'
                }`}
                onClick={() => setSelectedBehavior(b.id)}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  selectedBehavior === b.id
                    ? 'border-warm-500 bg-warm-500'
                    : 'border-earth-300'
                }`}>
                  {selectedBehavior === b.id && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <span className="text-xl shrink-0">{b.emoji}</span>
                <span className="text-sm font-medium text-earth-500">{b.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-earth-500">前事 (Antecedent)</h2>
          <p className="text-sm text-earth-400">行為發生前，環境中出現了什麼？</p>
          <div className="grid gap-2">
            {antecedentOptions.map(opt => (
              <button
                key={opt}
                onClick={() => { setAnswers(prev => ({ ...prev, a: opt })); nextStep() }}
                className={`text-left p-3 rounded-lg border text-sm transition-colors ${answers.a === opt ? 'bg-warm-50 border-warm-400 text-warm-700 font-medium' : 'bg-white border-earth-200 hover:border-warm-300 text-earth-500'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-earth-500">行為 (Behavior)</h2>
          <p className="text-sm text-earth-400">狗狗具體做了什麼？</p>
          <div className="grid gap-2">
            {behaviorOptions.map(opt => (
              <button
                key={opt}
                onClick={() => { setAnswers(prev => ({ ...prev, b: opt })); nextStep() }}
                className={`text-left p-3 rounded-lg border text-sm transition-colors ${answers.b === opt ? 'bg-warm-50 border-warm-400 text-warm-700 font-medium' : 'bg-white border-earth-200 hover:border-warm-300 text-earth-500'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-earth-500">後果 (Consequence)</h2>
          <p className="text-sm text-earth-400">行為發生後，狗狗得到了什麼或逃離了什麼？</p>
          <div className="grid gap-2">
            {consequenceOptions.map(opt => (
              <button
                key={opt}
                onClick={() => { setAnswers(prev => ({ ...prev, c: opt })); nextStep() }}
                className={`text-left p-3 rounded-lg border text-sm transition-colors ${answers.c === opt ? 'bg-warm-50 border-warm-400 text-warm-700 font-medium' : 'bg-white border-earth-200 hover:border-warm-300 text-earth-500'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-earth-500">確認分析結果</h2>
          <div className="flex justify-center py-2">
            <BorderCollieSVG size={70} pose="waving" />
          </div>
          <div className="bg-white rounded-xl border border-earth-200 p-4 space-y-3">
            <div>
              <span className="text-xs text-earth-400">行為問題</span>
              <p className="font-medium text-earth-500">{behaviorList[0]?.name || '未選擇'}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-cream p-2 rounded-lg">
                <span className="text-xs text-earth-400 block">A 前事</span>
                <span className="font-medium text-earth-500">{answers.a || '-'}</span>
              </div>
              <div className="bg-cream p-2 rounded-lg">
                <span className="text-xs text-earth-400 block">B 行為</span>
                <span className="font-medium text-earth-500">{answers.b || '-'}</span>
              </div>
              <div className="bg-cream p-2 rounded-lg">
                <span className="text-xs text-earth-400 block">C 後果</span>
                <span className="font-medium text-earth-500">{answers.c || '-'}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-earth-500">推測行為功能（可選）：</p>
            <div className="grid gap-2">
              {abcFunctions.map(fn => (
                <button
                  key={fn.id}
                  onClick={() => setAnswers(prev => ({ ...prev, functionId: fn.id }))}
                  className={`text-left p-3 rounded-lg border text-sm transition-colors flex items-center gap-2 ${answers.functionId === fn.id ? 'bg-warm-50 border-warm-400 text-warm-700 font-medium' : 'bg-white border-earth-200 hover:border-warm-300 text-earth-500'}`}
                >
                  <span className="shrink-0">{fn.icon}</span>
                  <span>{fn.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={submit}
            className="w-full flex items-center justify-center gap-2 bg-forest-500 hover:bg-forest-600 text-white font-bold py-3 rounded-xl transition-colors"
          >
            <span>查看訓練對策</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-earth-100">
        {step > 0 ? (
          <button onClick={prevStep} className="flex items-center gap-1.5 text-sm text-earth-400 hover:text-earth-500 px-3 py-2 rounded-lg hover:bg-earth-100 transition-colors">
            <ArrowLeft size={16} /> 上一步
          </button>
        ) : (
          <Link href="/" className="flex items-center gap-1.5 text-sm text-earth-400 hover:text-earth-500 px-3 py-2 rounded-lg hover:bg-earth-100 transition-colors">
            <Home size={16} /> 回首頁
          </Link>
        )}

        {step < 4 && (
          <button
            onClick={nextStep}
            disabled={!canProceed}
            className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
              canProceed
                ? 'bg-warm-500 text-white hover:bg-warm-600'
                : 'bg-earth-200 text-earth-400 cursor-not-allowed'
            }`}
          >
            下一步 <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  )
}

export default function ABCPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-earth-400">載入中...</div>}>
      <ABCForm />
    </Suspense>
  )
}
