import { questionnaireSections } from './questionnaire'
import { behaviors } from './behaviors'

export interface SectionScore {
  sectionId: string
  sectionTitle: string
  average: number
  answeredCount: number
  totalCount: number
  severity: 'low' | 'moderate' | 'high' | 'severe'
  severityLabel: string
  behaviorIds: string[]
}

export interface BehaviorScore {
  behaviorId: string
  behaviorName: string
  emoji: string
  average: number
  answeredCount: number
  severity: 'low' | 'moderate' | 'high' | 'severe'
  severityLabel: string
  dangerLevel: string
  recommendations: string[]
}

export interface AssessmentResult {
  sectionScores: SectionScore[]
  behaviorScores: BehaviorScore[]
  overallRisk: 'low' | 'moderate' | 'high' | 'severe'
  topConcerns: BehaviorScore[]
  timestamp: string
}

function getSeverity(average: number, dangerLevel: string): { severity: SectionScore['severity']; label: string } {
  const thresholds: Record<string, [number, number, number]> = {
    high: [1.5, 2.5, 3.5],
    medium: [2.0, 3.0, 4.0],
    low: [2.5, 3.5, 4.5],
  }
  const [mod, high, sev] = thresholds[dangerLevel] || thresholds.low

  if (average >= sev) return { severity: 'severe', label: '嚴重' }
  if (average >= high) return { severity: 'high', label: '高度' }
  if (average >= mod) return { severity: 'moderate', label: '中度' }
  return { severity: 'low', label: '輕度' }
}

export function getUnansweredInSection(
  answers: Record<number, number>,
  sectionIndex: number
): number[] {
  const section = questionnaireSections[sectionIndex];
  if (!section) return [];
  return section.questions
    .filter((q) => answers[q.id] === undefined)
    .map((q) => q.id);
}
export function calculateScores(answers: Record<number, number>): AssessmentResult {
  const sectionScores: SectionScore[] = []
  const behaviorScoreMap: Record<string, { sum: number; count: number; zeroCount: number }> = {}

  // 初始化行為分數映射
  behaviors.forEach(b => {
    behaviorScoreMap[b.id] = { sum: 0, count: 0, zeroCount: 0 }
  })

  // 計算各區段分數
  questionnaireSections.forEach(section => {
    let sum = 0
    let answered = 0
    const sectionBehaviorIds = new Set<string>()

    section.questions.forEach(q => {
      const val = answers[q.id]
      if (val !== undefined && val !== 0) {
        sum += val
        answered++
        q.behaviorMapping.forEach(bid => sectionBehaviorIds.add(bid))
      }
      // 同時累積到對應行為
      q.behaviorMapping.forEach(bid => {
        if (val !== undefined && val !== 0) {
          behaviorScoreMap[bid].sum += val
          behaviorScoreMap[bid].count++
        } else if (val === 0) {
          behaviorScoreMap[bid].zeroCount++
        }
      })
    })

    const avg = answered > 0 ? sum / answered : 0
    const sev = getSeverity(avg, 'low')

    sectionScores.push({
      sectionId: section.id,
      sectionTitle: section.title,
      average: Number(avg.toFixed(2)),
      answeredCount: answered,
      totalCount: section.questions.length,
      severity: sev.severity,
      severityLabel: sev.label,
      behaviorIds: Array.from(sectionBehaviorIds),
    })
  })

  // 計算行為分數
  const behaviorScores: BehaviorScore[] = behaviors.map(b => {
    const data = behaviorScoreMap[b.id]
    const avg = data.count > 0 ? data.sum / data.count : 0
    const sev = getSeverity(avg, b.dangerLevel)

    const recommendations: string[] = []
    if (sev.severity === 'severe' || sev.severity === 'high') {
      recommendations.push('建議優先處理，可考慮尋求專業行為諮詢')
    }
    if (b.dangerLevel === 'high') {
      recommendations.push('此行為具有安全風險，請先做好環境管理')
    }
    if (avg >= 3) {
      recommendations.push('建議進行ABC行為分析，找出行為功能')
    }

    return {
      behaviorId: b.id,
      behaviorName: b.name,
      emoji: b.emoji,
      average: Number(avg.toFixed(2)),
      answeredCount: data.count,
      severity: sev.severity,
      severityLabel: sev.label,
      dangerLevel: b.dangerLevel,
      recommendations,
    }
  }).filter(b => b.answeredCount > 0)
    .sort((a, b) => b.average - a.average)

  // 計算整體風險
  const maxSeverity = behaviorScores.length > 0
    ? behaviorScores.reduce((max, b) => {
        const order = { low: 0, moderate: 1, high: 2, severe: 3 }
        return order[b.severity] > order[max.severity] ? b : max
      }, behaviorScores[0])
    : null

  const overallRisk: AssessmentResult['overallRisk'] = maxSeverity?.severity || 'low'

  // 前三大關注點
  const topConcerns = behaviorScores
    .filter(b => b.severity !== 'low')
    .slice(0, 5)

  return {
    sectionScores,
    behaviorScores,
    overallRisk,
    topConcerns,
    timestamp: new Date().toISOString(),
  }
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'severe': return 'text-red-600 bg-red-50 border-red-200'
    case 'high': return 'text-orange-600 bg-orange-50 border-orange-200'
    case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    default: return 'text-green-600 bg-green-50 border-green-200'
  }
}

export function getSeverityBadgeColor(severity: string): string {
  switch (severity) {
    case 'severe': return 'bg-red-500 text-white'
    case 'high': return 'bg-orange-500 text-white'
    case 'moderate': return 'bg-yellow-500 text-white'
    default: return 'bg-green-500 text-white'
  }
}

export const STORAGE_KEY = 'dog-behavior-assessment-v1'

export function saveAssessment(result: AssessmentResult): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result))
  }
}

export function loadAssessment(): AssessmentResult | null {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return null
      }
    }
  }
  return null
}
