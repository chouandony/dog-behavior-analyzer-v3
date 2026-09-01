'use client'

import { cn } from '@/lib/utils'
import BorderCollieSVG from '@/components/BorderCollieSVG'

interface Props {
  currentStep: number
  totalSteps: number
  labels: string[]
}

export default function StepIndicator({ currentStep, totalSteps, labels }: Props) {
  return (
    <div className="w-full relative">
      {/* 頂部邊牧裝飾 */}
      <div className="flex justify-center mb-3">
        <div className={cn(
          "transition-all duration-500",
          currentStep === totalSteps - 1 ? "animate-bounce" : "animate-float"
        )}>
          <BorderCollieSVG 
            size={currentStep === totalSteps - 1 ? 56 : 48} 
            pose={currentStep === totalSteps - 1 ? "waving" : "sitting"} 
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors shrink-0 relative',
                i < currentStep
                  ? 'bg-forest-500 text-white'
                  : i === currentStep
                  ? 'bg-warm-500 text-white ring-4 ring-warm-100'
                  : 'bg-earth-200 text-earth-400'
              )}
            >
              {i < currentStep ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                i + 1
              )}
              {/* 當前步驟的小狗耳朵裝飾 */}
              {i === currentStep && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-warm-400 rounded-full animate-pulse" />
              )}
            </div>
            {i < totalSteps - 1 && (
              <div
                className={cn(
                  'h-1 flex-1 mx-2 rounded-full transition-colors',
                  i < currentStep ? 'bg-forest-500' : 'bg-earth-200'
                )}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-earth-400 px-1">
        {labels.map((label, i) => (
          <span
            key={i}
            className={cn(
              'transition-colors text-center flex-1',
              i === currentStep ? 'text-warm-600 font-bold' : ''
            )}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
