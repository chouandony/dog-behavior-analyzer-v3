export interface Behavior {
  id: string
  name: string
  emoji: string
  description: string
  metaTitle: string
  metaDescription: string
  commonCauses: string[]
  dangerLevel: 'low' | 'medium' | 'high'
  questionnaireSectionId: string
  questionnaireQuestionIds: number[]
}

export const behaviors: Behavior[] = [
  {
    id: 'aggression',
    name: '攻擊性行為',
    emoji: '⚠️',
    description: '對人、其他狗或動物展現攻擊行為，包含低吼、露齒、咬傷、資源守護等。',
    metaTitle: '狗狗攻擊性行為分析與安全訓練對策',
    metaDescription: '狗狗攻擊行為的專業分析，從安全評估到行為改造，提供完整的訓練對策與管理方案。',
    commonCauses: ['恐懼防禦', '疼痛不適', '資源守護', '過去創傷', '社會化不足', '壓力堆疊'],
    dangerLevel: 'high',
    questionnaireSectionId: 'aggression',
    questionnaireQuestionIds: [9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35],
  },
  {
    id: 'fear_anxiety',
    name: '恐懼與焦慮',
    emoji: '😰',
    description: '對特定聲音、物體、人或情境表現出過度恐懼或焦慮，包含發抖、躲藏、逃避等。',
    metaTitle: '狗狗恐懼與焦慮分析與情緒調節訓練對策',
    metaDescription: '狗狗恐懼與焦慮行為的專業分析，從減敏感到反制約，幫助狗狗建立安全感與自信。',
    commonCauses: ['早期創傷', '社會化不足', '遺傳氣質', '感官敏感', '環境變化', '疼痛不適'],
    dangerLevel: 'medium',
    questionnaireSectionId: 'fear_anxiety',
    questionnaireQuestionIds: [36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53],
  },
  {
    id: 'separation',
    name: '分離相關問題',
    emoji: '💔',
    description: '獨處時過度焦慮，表現為嚎叫、破壞、排泄異常、過度流涎等。',
    metaTitle: '狗狗分離焦慮與獨處問題分析與訓練對策',
    metaDescription: '狗狗分離相關問題的專業分析與漸進式獨處訓練，幫助狗狗建立獨處安全感。',
    commonCauses: ['過度依戀', '創傷經驗', '生活變動', '品種傾向', '早期社會化不足', '依戀型態'],
    dangerLevel: 'medium',
    questionnaireSectionId: 'separation',
    questionnaireQuestionIds: [54,55,56,57,58,59,60,61],
  },
  {
    id: 'overexcitement',
    name: '過度興奮與衝動',
    emoji: '🤩',
    description: '難以冷靜，見人撲跳、散步爆衝、追逐移動目標、無法控制情緒。',
    metaTitle: '狗狗過度興奮與衝動控制訓練對策',
    metaDescription: '改善狗狗過度興奮、爆衝與衝動行為，學習冷靜訓練技巧，建立更好的互動模式。',
    commonCauses: ['精力過剩', '關注取得', '缺乏界限', '遺傳氣質', '環境刺激', '需求未滿足'],
    dangerLevel: 'medium',
    questionnaireSectionId: 'overexcitement',
    questionnaireQuestionIds: [62,63,64,65,66,67,7,85,90,91,92,921,922,924,95,96,97],
  },
  {
    id: 'attachment',
    name: '依戀與尋求關注',
    emoji: '💕',
    description: '過度依戀特定家庭成員，跟隨、討摸、嫉妒、無法獨立活動。',
    metaTitle: '狗狗依戀與尋求關注行為分析與獨立性訓練',
    metaDescription: '改善狗狗過度依戀與尋求關注行為，建立健康的依附關係與獨立性。',
    commonCauses: ['過度關注', '分離焦慮傾向', '品種特性', '早期經驗', '缺乏獨處練習'],
    dangerLevel: 'low',
    questionnaireSectionId: 'attachment',
    questionnaireQuestionIds: [68,69,70,71,72,73,4],
  },
  {
    id: 'obedience',
    name: '訓練與服從性',
    emoji: '🎓',
    description: '召回困難、指令服從低、易分心、學習緩慢、對糾正反應遲鈍。',
    metaTitle: '狗狗訓練與服從性提升對策',
    metaDescription: '提升狗狗訓練配合度與服從性，從基礎溝通到進階專注力訓練的完整方案。',
    commonCauses: ['訓練方法不當', '動機不足', '分心環境', '品種特性', '過去負面經驗', '生理狀態'],
    dangerLevel: 'low',
    questionnaireSectionId: 'obedience',
    questionnaireQuestionIds: [1,2,3,5,6,923],
  },
  {
    id: 'barking',
    name: '過度吠叫',
    emoji: '🔊',
    description: '對陌生人、聲音、分離或其他刺激反應過度吠叫，影響生活品質。',
    metaTitle: '狗狗吠叫怎麼辦？完整行為分析與訓練對策',
    metaDescription: '狗狗過度吠叫的原因分析與專業訓練對策，從ABC行為分析到具體訓練步驟。',
    commonCauses: ['陌生人靠近', '門鈴聲響', '分離焦慮', '尋求關注', '環境刺激', '警戒本能'],
    dangerLevel: 'low',
    questionnaireSectionId: 'miscellaneous',
    questionnaireQuestionIds: [18,20,22,28,39,57,58,59,64,97],
  },
  {
    id: 'toileting',
    name: '排泄問題',
    emoji: '💧',
    description: '在錯誤地點排泄、標記行為過度、焦慮性排泄，影響居家環境。',
    metaTitle: '狗狗亂尿怎麼辦？排泄訓練與行為分析',
    metaDescription: '狗狗排泄問題的原因分析與正確排泄訓練方法，從醫療排查到環境管理。',
    commonCauses: ['醫療問題', '標記行為', '焦慮壓力', '訓練不足', '環境變化', '分離焦慮'],
    dangerLevel: 'low',
    questionnaireSectionId: 'miscellaneous',
    questionnaireQuestionIds: [86,87,88,89],
  },
  {
    id: 'destructive',
    name: '破壞性行為',
    emoji: '🪑',
    description: '啃咬家具、挖牆、翻垃圾桶、分離時破壞等破壞性行為。',
    metaTitle: '狗狗破壞行為分析與環境豐富化對策',
    metaDescription: '改善狗狗破壞行為，了解背後原因並提供環境豐富化與訓練對策。',
    commonCauses: ['無聊精力', '分離焦慮', '換牙不適', '探索本能', '缺乏啃咬物', '壓力釋放'],
    dangerLevel: 'medium',
    questionnaireSectionId: 'miscellaneous',
    questionnaireQuestionIds: [60,80],
  },
  {
    id: 'miscellaneous',
    name: '雜項行為問題',
    emoji: '📋',
    description: '食糞、滾糞、乞食、偷食、騎乘、過度舔舐、重複行為、凝視空氣等。',
    metaTitle: '狗狗雜項行為問題分析與對策',
    metaDescription: '各種常見但難以歸類的狗狗行為問題分析與針對性訓練對策。',
    commonCauses: ['營養缺乏', '無聊', '焦慮', '習慣', '環境刺激', '醫療因素'],
    dangerLevel: 'low',
    questionnaireSectionId: 'miscellaneous',
    questionnaireQuestionIds: [74,75,76,77,78,79,81,82,83,84,93,94,98,99,100],
  },
]

export function getBehaviorById(id: string): Behavior | undefined {
  return behaviors.find(b => b.id === id)
}

export function getHighRiskBehaviors(scores: Record<string, number>): Behavior[] {
  return behaviors.filter(b => {
    const score = scores[b.id]
    if (!score) return false
    if (b.dangerLevel === 'high' && score >= 2.5) return true
    if (b.dangerLevel === 'medium' && score >= 3) return true
    if (b.dangerLevel === 'low' && score >= 3.5) return true
    return false
  })
}
