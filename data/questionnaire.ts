export interface Question {
  id: number
  text: string
  behaviorMapping: string[] // 對應行為ID
}

export interface QuestionnaireSection {
  id: string
  title: string
  description: string
  questions: Question[]
  scaleLabels: string[]
  zeroLabel: string
}

export const questionnaireSections: QuestionnaireSection[] = [
  {
    id: 'obedience',
    title: '訓練和服從性',
    description: '有些狗比其他狗更聽話，更容易訓練。請說明您的狗在最近的以下每種情況下的訓練能力或聽話程度。',
    scaleLabels: ['從不', '鮮少', '有時', '經常', '總是'],
    zeroLabel: '未觀察到/不適用',
    questions: [
      { id: 1, text: '脫繩後立即返回。', behaviorMapping: ['obedience'] },
      { id: 2, text: '立即服從「坐下」命令。', behaviorMapping: ['obedience'] },
      { id: 3, text: '立即服從「等等」命令。', behaviorMapping: ['obedience'] },
      { id: 4, text: '似乎很注意/仔細聆聽您所說或所做的一切。', behaviorMapping: ['obedience', 'attachment'] },
      { id: 5, text: '對糾正或處罰反應遲緩；「厚臉皮」。', behaviorMapping: ['obedience'] },
      { id: 6, text: '學習新技巧或任務緩慢。', behaviorMapping: ['obedience'] },
      { id: 7, text: '容易被有趣的景物、聲音或氣味分散注意力。', behaviorMapping: ['obedience', 'overexcitement'] },
      { id: 8, text: '會「拾取」或試圖取棍子、球或物體。', behaviorMapping: ['obedience', 'miscellaneous'] },
    ],
  },
  {
    id: 'aggression',
    title: '攻擊性',
    description: '有些狗不時表現出攻擊性行為。請指出您自己的狗最近在以下每種情況下表現出攻擊性行為的傾向。',
    scaleLabels: ['沒有攻擊性', '輕度攻擊性', '中度攻擊性', '明顯攻擊性', '嚴重攻擊性'],
    zeroLabel: '未觀察到/不適用',
    questions: [
      { id: 9, text: '當您或家庭成員口頭糾正或懲罰（責罵、大喊大叫等）時。', behaviorMapping: ['aggression'] },
      { id: 10, text: '牽繩散步/運動，陌生成年人直接接近時。', behaviorMapping: ['aggression', 'fear_anxiety'] },
      { id: 11, text: '牽繩散步/運動，陌生小孩直接接近時。', behaviorMapping: ['aggression', 'fear_anxiety'] },
      { id: 12, text: '當狗在您的車裡（例如在加油站），陌生人靠近狗時。', behaviorMapping: ['aggression', 'fear_anxiety'] },
      { id: 13, text: '玩具、骨頭或其他物品被家庭成員拿走時。', behaviorMapping: ['aggression'] },
      { id: 14, text: '由家庭成員洗澡或梳理時。', behaviorMapping: ['aggression', 'fear_anxiety'] },
      { id: 15, text: '在家裡；當陌生人接近您或您家庭成員時。', behaviorMapping: ['aggression', 'fear_anxiety'] },
      { id: 16, text: '在外面；當陌生人接近您或您家庭成員時。', behaviorMapping: ['aggression', 'fear_anxiety'] },
      { id: 17, text: '當狗在吃飯，家庭成員直接接近時。', behaviorMapping: ['aggression'] },
      { id: 18, text: '當郵差或送貨員接近您家時。', behaviorMapping: ['aggression', 'barking'] },
      { id: 19, text: '當狗的食物被家庭成員拿走時。', behaviorMapping: ['aggression'] },
      { id: 20, text: '當您的狗在外面或院子裡，陌生人經過您家時。', behaviorMapping: ['aggression', 'fear_anxiety', 'barking'] },
      { id: 21, text: '當陌生人試圖碰觸或撫摸您的狗時。', behaviorMapping: ['aggression', 'fear_anxiety'] },
      { id: 22, text: '當您的狗在外面或院子裡，慢跑者、騎自行車者、輪滑或滑板運動員經過您家時。', behaviorMapping: ['aggression', 'overexcitement', 'barking'] },
      { id: 23, text: '當牽繩散步/運動，被陌生公狗直接接近時。', behaviorMapping: ['aggression', 'fear_anxiety'] },
      { id: 24, text: '當牽繩散步/運動，被陌生母狗直接接近時。', behaviorMapping: ['aggression', 'fear_anxiety'] },
      { id: 25, text: '當被家庭成員直視時。', behaviorMapping: ['aggression', 'fear_anxiety'] },
      { id: 26, text: '對陌生狗來訪您家時。', behaviorMapping: ['aggression', 'fear_anxiety'] },
      { id: 27, text: '對進入您家院子的貓、松鼠或其他動物時。', behaviorMapping: ['aggression', 'overexcitement'] },
      { id: 28, text: '對陌生人來訪您家時。', behaviorMapping: ['aggression', 'fear_anxiety', 'barking'] },
      { id: 29, text: '當被另一隻陌生的狗吠叫、咆哮或撲過來時。', behaviorMapping: ['aggression', 'fear_anxiety'] },
      { id: 30, text: '當被家庭成員踩到時。', behaviorMapping: ['aggression', 'fear_anxiety'] },
      { id: 31, text: '當您或家庭成員拿回被狗偷走的食物或物品時。', behaviorMapping: ['aggression'] },
      { id: 32, text: '對您家中的另一隻熟悉的狗。', behaviorMapping: ['aggression'] },
      { id: 33, text: '當最喜歡的休息/睡覺的地方，被家中另一隻熟悉的狗接近時。', behaviorMapping: ['aggression'] },
      { id: 34, text: '當吃東西時，被家中另一隻熟悉的狗接近時。', behaviorMapping: ['aggression'] },
      { id: 35, text: '當在玩/咀嚼喜歡的玩具、骨頭、東西等，被家中另一隻熟悉的狗接近時。', behaviorMapping: ['aggression'] },
    ],
  },
  {
    id: 'fear_anxiety',
    title: '恐懼和焦慮',
    description: '狗在接觸特定的聲音、物體、人或情況時，有時會表現出焦慮或恐懼的跡象。',
    scaleLabels: ['無恐懼/焦慮', '輕度恐懼', '中度恐懼', '明顯恐懼', '極端恐懼'],
    zeroLabel: '未觀察到/不適用',
    questions: [
      { id: 36, text: '在外面，當陌生成年人直接接近時。', behaviorMapping: ['fear_anxiety', 'aggression'] },
      { id: 37, text: '在外面，當陌生小孩直接接近時。', behaviorMapping: ['fear_anxiety', 'aggression'] },
      { id: 38, text: '面對猛然或巨大的噪音（如，吸塵器、汽車排氣管、道路挖孔、物體掉落等）。', behaviorMapping: ['fear_anxiety'] },
      { id: 39, text: '當陌生人來訪您家時。', behaviorMapping: ['fear_anxiety', 'aggression', 'barking'] },
      { id: 40, text: '當陌生人試圖碰觸或撫摸您的狗時。', behaviorMapping: ['fear_anxiety', 'aggression'] },
      { id: 41, text: '在繁忙交通道路上。', behaviorMapping: ['fear_anxiety'] },
      { id: 42, text: '面對人行道上或附近的陌生或不熟悉物體（如，塑膠垃圾袋、樹葉、垃圾、飄揚旗幟等）。', behaviorMapping: ['fear_anxiety'] },
      { id: 43, text: '由獸醫檢視/治療時。', behaviorMapping: ['fear_anxiety'] },
      { id: 44, text: '在雷雨、煙火施放或類似活動期間。', behaviorMapping: ['fear_anxiety'] },
      { id: 45, text: '當一隻相同或更大尺寸的陌生狗直接接近時。', behaviorMapping: ['fear_anxiety', 'aggression'] },
      { id: 46, text: '當一隻體型較小的不陌生狗直接接近時。', behaviorMapping: ['fear_anxiety', 'aggression'] },
      { id: 47, text: '當第一次接觸到不熟悉的情況時（例如，第一次坐車、第一次搭電梯、第一次去看獸醫等）。', behaviorMapping: ['fear_anxiety'] },
      { id: 48, text: '面對強風或被風吹動的物體。', behaviorMapping: ['fear_anxiety'] },
      { id: 49, text: '由家庭成員剪指甲時。', behaviorMapping: ['fear_anxiety'] },
      { id: 50, text: '由家庭成員梳理或洗澡時。', behaviorMapping: ['fear_anxiety'] },
      { id: 51, text: '由家庭成員用毛巾擦拭狗的腳時。', behaviorMapping: ['fear_anxiety'] },
      { id: 52, text: '對陌生狗來訪您家時。', behaviorMapping: ['fear_anxiety', 'aggression'] },
      { id: 53, text: '當被陌生的狗吠叫、咆哮或撲過來時。', behaviorMapping: ['fear_anxiety', 'aggression'] },
    ],
  },
  {
    id: 'separation',
    title: '與分離有關的行為',
    description: '有些狗在獨處時會表現出焦慮或異常行為的跡象，即使是相對較短的時間。',
    scaleLabels: ['從不', '鮮少', '有時', '經常', '總是'],
    zeroLabel: '未觀察到/不適用',
    questions: [
      { id: 54, text: '抖動、發抖或顫抖。', behaviorMapping: ['separation', 'fear_anxiety'] },
      { id: 55, text: '口水流過多。', behaviorMapping: ['separation', 'fear_anxiety'] },
      { id: 56, text: '不安、激動或踱步。', behaviorMapping: ['separation', 'overexcitement'] },
      { id: 57, text: '哀叫。', behaviorMapping: ['separation', 'barking'] },
      { id: 58, text: '吠叫。', behaviorMapping: ['separation', 'barking'] },
      { id: 59, text: '嚎叫。', behaviorMapping: ['separation', 'barking'] },
      { id: 60, text: '在門、地板、窗戶、窗簾等處咀嚼或抓撓。', behaviorMapping: ['separation', 'destructive'] },
      { id: 61, text: '食慾不振。', behaviorMapping: ['separation', 'fear_anxiety'] },
    ],
  },
  {
    id: 'overexcitement',
    title: '興奮性',
    description: '有些狗對環境中突然或潛在的令人興奮的事件和干擾反應相對較小，而另一些狗則對最輕微的新奇事物高度興奮。',
    scaleLabels: ['平靜', '輕度興奮', '中度興奮', '明顯興奮', '極端興奮'],
    zeroLabel: '未觀察到/不適用',
    questions: [
      { id: 62, text: '當您或家庭成員短暫離開後回家時。', behaviorMapping: ['overexcitement', 'attachment'] },
      { id: 63, text: '在家裡，與您或家庭成員玩耍時。', behaviorMapping: ['overexcitement'] },
      { id: 64, text: '當門鈴響起時。', behaviorMapping: ['overexcitement', 'barking'] },
      { id: 65, text: '就在要帶出門散步之前。', behaviorMapping: ['overexcitement'] },
      { id: 66, text: '就在要帶上車旅遊之前。', behaviorMapping: ['overexcitement', 'fear_anxiety'] },
      { id: 67, text: '當客人來訪您家時。', behaviorMapping: ['overexcitement', 'fear_anxiety', 'aggression'] },
    ],
  },
  {
    id: 'attachment',
    title: '依戀和尋求關注',
    description: '大多數狗都很依戀他們的家庭成員，有些狗需要他們的大量關注和疼愛。',
    scaleLabels: ['從不', '鮮少', '有時', '經常', '總是'],
    zeroLabel: '未觀察到/不適用',
    questions: [
      { id: 68, text: '對某個特定的家庭成員表現出強烈的依戀。', behaviorMapping: ['attachment', 'separation'] },
      { id: 69, text: '傾向於跟著您（或其他家庭成員）在房子裡到處走動，從一個房間到另一個房間。', behaviorMapping: ['attachment', 'separation'] },
      { id: 70, text: '當您坐下時，傾向於靠近或接觸您（或其他人）。', behaviorMapping: ['attachment'] },
      { id: 71, text: '當您坐下時，傾向於輕推、撫摸或抓您（或其他人）以引起注意。', behaviorMapping: ['attachment'] },
      { id: 72, text: '當您（或其他人）對另一個人表達愛意時，會變得激動（哀叫、跳起來、試圖干預）。', behaviorMapping: ['attachment'] },
      { id: 73, text: '當您（或其他人）對另一隻狗或動物表現出愛意時，會變得激動（哀叫、跳起來、試圖干預）。', behaviorMapping: ['attachment'] },
    ],
  },
  {
    id: 'miscellaneous',
    title: '雜項行為問題',
    description: '除了本問卷已經涵蓋的問題外，狗還表現出各種各樣的行為問題。',
    scaleLabels: ['從不', '鮮少', '有時', '經常', '總是'],
    zeroLabel: '未觀察到/不適用',
    questions: [
      { id: 74, text: '有機會將追逐或可能追逐貓。', behaviorMapping: ['miscellaneous', 'overexcitement'] },
      { id: 75, text: '有機會將追逐或可能追逐鳥。', behaviorMapping: ['miscellaneous', 'overexcitement'] },
      { id: 76, text: '有機會將追逐或可能追逐松鼠、兔子和其他小動物。', behaviorMapping: ['miscellaneous', 'overexcitement'] },
      { id: 77, text: '有機會就會逃離或可能逃離家或院子。', behaviorMapping: ['miscellaneous', 'fear_anxiety'] },
      { id: 78, text: '在動物糞便或其他「臭」東西中滾動。', behaviorMapping: ['miscellaneous'] },
      { id: 79, text: '吃自己或其他動物的排泄物或糞便。', behaviorMapping: ['miscellaneous'] },
      { id: 80, text: '咀嚼不適當的物體。', behaviorMapping: ['miscellaneous', 'destructive'] },
      { id: 81, text: '騎乘物體、家具或人類。', behaviorMapping: ['miscellaneous', 'overexcitement'] },
      { id: 82, text: '當人們吃東西時，不斷地乞討食物。', behaviorMapping: ['miscellaneous', 'attachment'] },
      { id: 83, text: '偷食物。', behaviorMapping: ['miscellaneous'] },
      { id: 84, text: '在樓梯上緊張或害怕。', behaviorMapping: ['miscellaneous', 'fear_anxiety'] },
      { id: 85, text: '用牽繩牽引時過度拉扯。', behaviorMapping: ['miscellaneous', 'overexcitement'] },
      { id: 86, text: '對家中的物品/家俱亂尿。', behaviorMapping: ['miscellaneous', 'toileting'] },
      { id: 87, text: '在接近、撫摸、護理或抱起時尿失禁。', behaviorMapping: ['miscellaneous', 'fear_anxiety', 'toileting'] },
      { id: 88, text: '在晚上或白天獨處家中時亂尿。', behaviorMapping: ['miscellaneous', 'separation', 'toileting'] },
      { id: 89, text: '在晚上或白天獨處家中時亂排便。', behaviorMapping: ['miscellaneous', 'separation', 'toileting'] },
      { id: 90, text: '多動、不安、難以安定下來。', behaviorMapping: ['miscellaneous', 'overexcitement'] },
      { id: 91, text: '頑皮，幼稚，喧鬧。', behaviorMapping: ['miscellaneous', 'overexcitement'] },
      { id: 92, text: '活躍，精力充沛，總是忙個不停。', behaviorMapping: ['miscellaneous', 'overexcitement'] },
      { id: 921, text: '遇到其他（陌生的）狗時變得非常興奮/分心。', behaviorMapping: ['miscellaneous', 'overexcitement'] },
      { id: 922, text: '遇到其他（陌生的）人時變得非常興奮/分心。', behaviorMapping: ['miscellaneous', 'overexcitement'] },
      { id: 923, text: '外出走動時，很容易分心或專注於氣味（即持續嗅聞地面或物體）。', behaviorMapping: ['miscellaneous', 'obedience'] },
      { id: 924, text: '難以從有趣或分心的刺激（例如，其他狗、氣味、人、小動物等）將注意力轉移。', behaviorMapping: ['miscellaneous', 'obedience', 'overexcitement'] },
      { id: 925, text: '在受到驚嚇或驚嚇後恢復緩慢（在事件發生後很長一段時間內表現出焦慮/恐懼）。', behaviorMapping: ['miscellaneous', 'fear_anxiety'] },
      { id: 93, text: '專心地盯著看不到的東西。', behaviorMapping: ['miscellaneous'] },
      { id: 94, text: '捕捉（看不見的）蒼蠅。', behaviorMapping: ['miscellaneous'] },
      { id: 95, text: '追逐自己的尾巴/後端。', behaviorMapping: ['miscellaneous', 'overexcitement'] },
      { id: 96, text: '追逐/跟隨影子、光點等。', behaviorMapping: ['miscellaneous', 'overexcitement'] },
      { id: 97, text: '驚恐或興奮時不停地吠叫。', behaviorMapping: ['miscellaneous', 'barking', 'overexcitement'] },
      { id: 98, text: '過度舔自己。', behaviorMapping: ['miscellaneous', 'fear_anxiety'] },
      { id: 99, text: '過度舔人或物體。', behaviorMapping: ['miscellaneous', 'attachment'] },
      { id: 100, text: '表現出其他離奇、奇怪或重複的行為。', behaviorMapping: ['miscellaneous'] },
    ],
  },
]

export const allQuestions = questionnaireSections.flatMap(s => s.questions)

export function getQuestionsByBehavior(behaviorId: string): Question[] {
  return allQuestions.filter(q => q.behaviorMapping.includes(behaviorId))
}

// 相容層：讓 page.tsx 可以使用 sections 與 scoreLabels
export const sections = questionnaireSections;

// 通用標籤（0=未觀察到，1-5=頻率等級）
// 注意：不同區塊的 scaleLabels 不同，這裡使用最通用的版本
export const scoreLabels: Record<number, string> = {
  0: "未觀察到",
  1: "從不",
  2: "鮮少",
  3: "有時",
  4: "經常",
  5: "總是",
};
