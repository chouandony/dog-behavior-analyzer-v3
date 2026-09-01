export interface StrategyStep {
  phase: '安全管理' | '核心訓練' | '日常管理'
  title: string
  description: string
  techniques: number[] // technique IDs
  priority: 'required' | 'recommended' | 'optional'
}

export interface BehaviorStrategy {
  behaviorId: string
  defaultStrategies: StrategyStep[]
  byFunction: Record<string, StrategyStep[]>
}

export const behaviorStrategies: BehaviorStrategy[] = [
  {
    behaviorId: 'aggression',
    defaultStrategies: [
      {
        phase: '安全管理',
        title: '立即安全防護',
        description: '攻擊行為具有高度危險性，必須先確保人犬安全。使用嘴套、圍欄、牽繩管理，避免高風險情境。',
        techniques: [1, 28, 35],
        priority: 'required',
      },
      {
        phase: '核心訓練',
        title: '醫療排查與功能分析',
        description: '排除疼痛與疾病，找出攻擊的功能（恐懼？守護？挫折？），進行ABC分析。',
        techniques: [13, 14, 19, 29],
        priority: 'required',
      },
      {
        phase: '日常管理',
        title: '專業協助與長期計畫',
        description: '攻擊行為建議尋求獸醫行為醫學或合格行為專業人員協助，建立長期改善計畫。',
        techniques: [27, 33],
        priority: 'recommended',
      },
    ],
    byFunction: {
      escape: [
        { phase: '安全管理', title: '給予空間與選擇權', description: '恐懼性攻擊需要距離管理，絕對不可懲罰。使用U轉與環境管理拉開距離。', techniques: [1, 17, 28], priority: 'required' },
        { phase: '核心訓練', title: '減敏感與BAT', description: '從極遠距離開始，讓狗狗知道冷靜可以獲得距離。', techniques: [13, 14, 19], priority: 'required' },
        { phase: '日常管理', title: '信任重建', description: '透過合作照護與預測性互動重建信任。', techniques: [27], priority: 'recommended' },
      ],
      tangible: [
        { phase: '安全管理', title: '資源管理', description: '管理高價值資源，避免守護情境發生。', techniques: [1, 29], priority: 'required' },
        { phase: '核心訓練', title: '交換遊戲與反制約', description: '教導「人靠近 = 更好的東西出現」。', techniques: [29, 14], priority: 'required' },
        { phase: '日常管理', title: '預防練習', description: '在日常中練習「放開」與「交換」。', techniques: [3, 7], priority: 'recommended' },
      ],
      control: [
        { phase: '安全管理', title: '建立可預測環境', description: '減少環境中的不可預測因素，讓狗狗感到安全。', techniques: [1, 25], priority: 'required' },
        { phase: '核心訓練', title: '建立合作模式', description: '教導狗狗透過冷靜行為獲得想要的結果，而非攻擊。', techniques: [7, 19, 20], priority: 'required' },
        { phase: '日常管理', title: '增強掌控感', description: '給予狗狗更多選擇權與控制感。', techniques: [33], priority: 'recommended' },
      ],
    },
  },
  {
    behaviorId: 'fear_anxiety',
    defaultStrategies: [
      {
        phase: '安全管理',
        title: '建立安全空間與環境管理',
        description: '為狗狗創造一個可以撤退的安全區域，減少觸發恐懼的刺激暴露。',
        techniques: [1, 25],
        priority: 'required',
      },
      {
        phase: '核心訓練',
        title: '減敏感與反制約',
        description: '從極低強度開始，讓恐懼刺激與極度美好的事物連結，逐步建立正面情緒。',
        techniques: [13, 14, 15, 26],
        priority: 'required',
      },
      {
        phase: '日常管理',
        title: '壓力管理與放鬆訓練',
        description: '學習辨識壓力訊號，給予充分恢復時間，建立日常放鬆習慣。',
        techniques: [26, 33],
        priority: 'recommended',
      },
    ],
    byFunction: {
      escape: [
        { phase: '安全管理', title: '尊重逃跑需求', description: '當狗狗試圖逃離時，允許牠撤退到安全區域，不要強迫面對。', techniques: [1, 25], priority: 'required' },
        { phase: '核心訓練', title: '漸進式暴露', description: '從狗狗能夠承受的距離與強度開始，逐步縮短距離。', techniques: [13, 14], priority: 'required' },
        { phase: '日常管理', title: '建立安全訊號', description: '教導狗狗一個可以觸發安全感的行為或空間。', techniques: [25, 26], priority: 'recommended' },
      ],
      anxiety: [
        { phase: '安全管理', title: '降低環境壓力', description: '移除或減少已知的壓力源，創造低刺激環境。', techniques: [1], priority: 'required' },
        { phase: '核心訓練', title: '放鬆訓練協議', description: '系統性地教導狗狗放鬆，建立「放鬆是可以被獎勵的行為」。', techniques: [26, 13, 14], priority: 'required' },
        { phase: '日常管理', title: '壓力堆疊監控', description: '記錄每日壓力事件，避免多個壓力源累積超過閾值。', techniques: [33], priority: 'recommended' },
      ],
    },
  },
  {
    behaviorId: 'separation',
    defaultStrategies: [
      {
        phase: '安全管理',
        title: '醫療與焦慮評估',
        description: '先排除醫療因素，評估焦慮嚴重程度，必要時藥物輔助。縮短獨處時間。',
        techniques: [1, 25],
        priority: 'required',
      },
      {
        phase: '核心訓練',
        title: '離家線索減敏感與獨處梯度',
        description: '讓離家前兆不再預告分離，從極短獨處時間（1秒）開始逐步延長。',
        techniques: [13, 14, 26],
        priority: 'required',
      },
      {
        phase: '日常管理',
        title: '安全區與豐富化',
        description: '建立讓狗狗感到安全的獨處空間，提供益智玩具分散注意力。',
        techniques: [25, 33],
        priority: 'recommended',
      },
    ],
    byFunction: {
      anxiety: [
        { phase: '安全管理', title: '縮短獨處時間', description: '找寵物保母、日托，或暫時調整作息，避免長時間獨處。', techniques: [1], priority: 'required' },
        { phase: '核心訓練', title: '漸進式獨處', description: '從 1 秒鐘開始，逐步延長。配合減敏與反制約。', techniques: [13, 14], priority: 'required' },
        { phase: '日常管理', title: '放鬆訓練', description: '教導狗狗在獨處時自我安撫。', techniques: [26], priority: 'recommended' },
      ],
      attention: [
        { phase: '安全管理', title: '預防性互動', description: '在離家前給予充分的正向互動，但回家時保持低調。', techniques: [33], priority: 'required' },
        { phase: '核心訓練', title: '獨立活動增強', description: '獎勵狗狗自己安靜待著的時刻，建立獨立性。', techniques: [5, 9], priority: 'required' },
        { phase: '日常管理', title: '減少離家戲劇化', description: '離家與回家時保持低調，不過度互動。', techniques: [], priority: 'recommended' },
      ],
    },
  },
  {
    behaviorId: 'overexcitement',
    defaultStrategies: [
      {
        phase: '安全管理',
        title: '降低刺激與環境管理',
        description: '減少引發過度興奮的情境，給予冷靜的空間，避開高刺激環境。',
        techniques: [1, 25, 17],
        priority: 'required',
      },
      {
        phase: '核心訓練',
        title: '衝動控制與替代行為',
        description: '教導「冷靜才能獲得想要的東西」，建立替代行為（坐下、看主人、去墊子）。',
        techniques: [7, 8, 20, 21, 26],
        priority: 'required',
      },
      {
        phase: '日常管理',
        title: '規律運動與豐富化',
        description: '確保身心需求被滿足，但避免過度刺激的運動。提供嗅聞與探索機會。',
        techniques: [33, 22],
        priority: 'recommended',
      },
    ],
    byFunction: {
      attention: [
        { phase: '安全管理', title: '移除興奮獎勵', description: '撲人時完全轉身不理，不給任何回應（負懲罰）。', techniques: [12], priority: 'required' },
        { phase: '核心訓練', title: '坐下替代撲人', description: '教導「坐下 = 人會理我」，用替代行為取代問題行為。', techniques: [7, 8], priority: 'required' },
        { phase: '日常管理', title: '預防性獎勵冷靜', description: '在狗狗自然冷靜時主動獎勵（捕捉）。', techniques: [5], priority: 'recommended' },
      ],
      tangible: [
        { phase: '安全管理', title: '管理資源取得', description: '不讓狗狗因興奮就自動獲得想要的東西（出門、吃飯、玩耍）。', techniques: [1], priority: 'required' },
        { phase: '核心訓練', title: 'Premack 原則', description: '「先冷靜 → 再玩」。低機率行為後才能進行高機率行為。', techniques: [20, 21], priority: 'required' },
        { phase: '日常管理', title: '固定作息', description: '建立可預測的日常生活節奏，減少因不確定性產生的興奮。', techniques: [33], priority: 'recommended' },
      ],
      'self-reinforce': [
        { phase: '安全管理', title: '阻斷刺激源', description: '遮蔽窗戶、改變散步路線，減少觸發追逐或爆衝的刺激。', techniques: [1, 17], priority: 'required' },
        { phase: '核心訓練', title: 'LAT 與替代出口', description: '教導看到刺激後回頭看主人，並提供合法的追逐/嗅聞遊戲。', techniques: [16, 34], priority: 'required' },
        { phase: '日常管理', title: '驅力管理', description: '透過運動與遊戲滿足追逐與探索驅力，但選擇安全活動。', techniques: [33, 34], priority: 'recommended' },
      ],
    },
  },
  {
    behaviorId: 'attachment',
    defaultStrategies: [
      {
        phase: '安全管理',
        title: '建立獨立空間與界限',
        description: '為狗狗設置專屬的安靜區域，逐步減少過度跟隨與接觸，建立物理與心理界限。',
        techniques: [1, 25],
        priority: 'required',
      },
      {
        phase: '核心訓練',
        title: '獨立活動增強與消弱',
        description: '獎勵狗狗獨自安靜待著的時刻，對尋求關注行為進行消弱（完全不理）。',
        techniques: [5, 9, 11],
        priority: 'required',
      },
      {
        phase: '日常管理',
        title: '豐富化與規律作息',
        description: '提供益智玩具與環境豐富化，讓狗狗學會自己娛樂。建立可預測的互動時間。',
        techniques: [33, 21],
        priority: 'recommended',
      },
    ],
    byFunction: {
      attention: [
        { phase: '安全管理', title: '統一家庭回應', description: '全家人一致執行：尋求關注行為發生時完全忽略，不給任何回應。', techniques: [11, 12], priority: 'required' },
        { phase: '核心訓練', title: '教導適當溝通方式', description: '教導「坐下」或「碰手」來取得關注，替代輕推或哀叫。', techniques: [7, 8, 23], priority: 'required' },
        { phase: '日常管理', title: '預防性關注', description: '在狗狗安靜時主動給予關注與互動，減少牠用問題行為求關注的需求。', techniques: [5, 33], priority: 'recommended' },
      ],
      tangible: [
        { phase: '安全管理', title: '管理資源接觸', description: '不讓狗狗因跟隨或討摸就自動獲得資源。', techniques: [1], priority: 'required' },
        { phase: '核心訓練', title: '獨立獎勵', description: '在狗狗獨自待著時給予驚喜獎勵，強化獨立行為。', techniques: [5, 9], priority: 'required' },
        { phase: '日常管理', title: '漸進式分離', description: '從短暫離開房間開始，逐步延長分離時間。', techniques: [13], priority: 'recommended' },
      ],
    },
  },
  {
    behaviorId: 'obedience',
    defaultStrategies: [
      {
        phase: '安全管理',
        title: '環境管理與減少分心',
        description: '在訓練初期選擇低干擾環境，逐步增加難度。管理好環境中的分心物。',
        techniques: [1],
        priority: 'required',
      },
      {
        phase: '核心訓練',
        title: '基礎溝通與動機建立',
        description: '使用響片或標記訓練建立清晰溝通，找到狗狗真正想要的獎勵（食物/玩具/嗅聞/社交）。',
        techniques: [2, 3, 6, 23, 24],
        priority: 'required',
      },
      {
        phase: '日常管理',
        title: '衝動控制與專注力遊戲',
        description: '透過衝動控制遊戲與環境豐富化提升專注力與學習意願。',
        techniques: [21, 33],
        priority: 'recommended',
      },
    ],
    byFunction: {
      tangible: [
        { phase: '安全管理', title: '高價值獎勵準備', description: '在訓練環境中準備比外界刺激更有吸引力的獎勵。', techniques: [1], priority: 'required' },
        { phase: '核心訓練', title: '逐步提升難度', description: '從無干擾環境開始，逐步加入分心物，確保每個階段都能成功。', techniques: [3, 4, 23], priority: 'required' },
        { phase: '日常管理', title: '生活即訓練', description: '將訓練融入日常生活，在散步、吃飯、玩耍時練習指令。', techniques: [20, 33], priority: 'recommended' },
      ],
      'self-reinforce': [
        { phase: '安全管理', title: '控制環境刺激', description: '在訓練初期減少環境中的高價值刺激（如其他狗、氣味）。', techniques: [1], priority: 'required' },
        { phase: '核心訓練', title: '建立召回與注意力', description: '強化「看主人」與「召回」的價值，讓狗狗在刺激中也能回應。', techniques: [16, 23, 24], priority: 'required' },
        { phase: '日常管理', title: '合法出口', description: '給予足夠的嗅聞與探索時間，減少因需求壓抑造成的分心。', techniques: [33], priority: 'recommended' },
      ],
    },
  },
  {
    behaviorId: 'barking',
    defaultStrategies: [
      {
        phase: '安全管理',
        title: '降低觸發與環境管理',
        description: '先減少吠叫的練習機會，避免行為越練越強。遮蔽窗戶、管理門口動線。',
        techniques: [1, 25],
        priority: 'required',
      },
      {
        phase: '核心訓練',
        title: '找出功能並建立替代行為',
        description: '透過 ABC 分析找出吠叫功能，教導更適當的溝通方式（坐下看主人、去墊子）。',
        techniques: [7, 8, 11, 16, 23],
        priority: 'required',
      },
      {
        phase: '日常管理',
        title: '情緒調節與環境豐富化',
        description: '降低整體焦慮與無聊，從源頭減少吠叫動機。',
        techniques: [13, 14, 26, 33],
        priority: 'recommended',
      },
    ],
    byFunction: {
      attention: [
        { phase: '安全管理', title: '移除關注獎勵', description: '確定吠叫功能為求關注後，全家一致執行消弱（完全不理）。', techniques: [11, 12], priority: 'required' },
        { phase: '核心訓練', title: '教導安靜替代行為', description: '教導「坐下看主人」或「去墊子」來取得關注。', techniques: [7, 8, 25], priority: 'required' },
        { phase: '日常管理', title: '預防性關注', description: '在狗狗安靜時主動給予關注，減少牠用吠叫求關注的需求。', techniques: [5, 33], priority: 'recommended' },
      ],
      escape: [
        { phase: '安全管理', title: '拉開距離', description: '讓狗狗遠離害怕的刺激，建立安全感。', techniques: [1, 17], priority: 'required' },
        { phase: '核心訓練', title: '減敏感與反制約', description: '從低強度開始，讓刺激與好事連結。', techniques: [13, 14, 15, 16], priority: 'required' },
        { phase: '日常管理', title: '放鬆與BAT', description: '建立冷靜行為獲得距離的連結。', techniques: [19, 26], priority: 'recommended' },
      ],
      'self-reinforce': [
        { phase: '安全管理', title: '阻斷視覺與聽覺刺激', description: '遮蔽窗戶、管理環境，減少觸發。', techniques: [1], priority: 'required' },
        { phase: '核心訓練', title: 'LAT 與替代活動', description: '教導看到刺激後回頭看主人，並提供合法出口。', techniques: [16, 34], priority: 'required' },
        { phase: '日常管理', title: '環境豐富化', description: '提供更多合法的感官刺激出口。', techniques: [33], priority: 'recommended' },
      ],
      anxiety: [
        { phase: '安全管理', title: '安全空間', description: '建立讓狗狗感到安全的區域。', techniques: [1, 25], priority: 'required' },
        { phase: '核心訓練', title: '放鬆訓練與減敏感', description: '教導自我調節能力，逐步面對焦慮源。', techniques: [13, 14, 26], priority: 'required' },
        { phase: '日常管理', title: '壓力管理', description: '檢視壓力堆疊，給予充分恢復時間。', techniques: [33], priority: 'recommended' },
      ],
    },
  },
  {
    behaviorId: 'toileting',
    defaultStrategies: [
      {
        phase: '安全管理',
        title: '醫療排查與環境管理',
        description: '先排除泌尿系統疾病，限制活動範圍預防失誤。使用圍欄或監管。',
        techniques: [1, 30],
        priority: 'required',
      },
      {
        phase: '核心訓練',
        title: '規律排泄與正增強',
        description: '建立固定時間帶出，成功立即獎勵。徹底清潔失誤處氣味。',
        techniques: [3, 5, 30],
        priority: 'required',
      },
      {
        phase: '日常管理',
        title: '壓力與標記管理',
        description: '檢視是否有焦慮或標記因素，與獸醫討論絕育影響。',
        techniques: [1, 33],
        priority: 'recommended',
      },
    ],
    byFunction: {
      anxiety: [
        { phase: '安全管理', title: '安全區域', description: '建立讓狗狗感到安全的排泄區域。', techniques: [1, 25], priority: 'required' },
        { phase: '核心訓練', title: '減敏感', description: '對引發焦慮的線索進行減敏感。', techniques: [13, 14], priority: 'required' },
        { phase: '日常管理', title: '壓力源移除', description: '找出並減少環境中的壓力源。', techniques: [33], priority: 'recommended' },
      ],
      control: [
        { phase: '安全管理', title: '管理標記區域', description: '限制進入標記區域，使用圍欄。', techniques: [1], priority: 'required' },
        { phase: '核心訓練', title: '建立新習慣', description: '在新的固定地點建立排泄習慣。', techniques: [3, 30], priority: 'required' },
        { phase: '日常管理', title: '絕育考量', description: '與獸醫討論絕育對標記行為的影響。', techniques: [], priority: 'optional' },
      ],
    },
  },
  {
    behaviorId: 'destructive',
    defaultStrategies: [
      {
        phase: '安全管理',
        title: '環境管理與限制',
        description: '收好貴重物品，使用圍欄限制活動範圍，提供合法啃咬物。',
        techniques: [1, 33],
        priority: 'required',
      },
      {
        phase: '核心訓練',
        title: '教導合法出口與衝動控制',
        description: '教導「可以咬什麼」與「什麼時候可以咬」。建立去墊子與冷靜行為。',
        techniques: [7, 8, 21, 25],
        priority: 'required',
      },
      {
        phase: '日常管理',
        title: '環境豐富化與運動',
        description: '確保狗狗有足夠的身心活動，減少無聊與精力過剩。',
        techniques: [33],
        priority: 'recommended',
      },
    ],
    byFunction: {
      anxiety: [
        { phase: '安全管理', title: '獨處管理', description: '縮短獨處時間，使用攝影機監控。', techniques: [1, 25], priority: 'required' },
        { phase: '核心訓練', title: '分離訓練', description: '漸進式獨處訓練，從極短時間開始。', techniques: [13, 14], priority: 'required' },
        { phase: '日常管理', title: '離家線索減敏感', description: '讓拿鑰匙、穿外套等動作不再預告離開。', techniques: [13], priority: 'recommended' },
      ],
      'self-reinforce': [
        { phase: '安全管理', title: '移除誘惑', description: '收好所有可能被啃咬的物品。', techniques: [1], priority: 'required' },
        { phase: '核心訓練', title: '合法啃咬訓練', description: '教導並獎勵使用啃咬玩具。', techniques: [3, 7, 33], priority: 'required' },
        { phase: '日常管理', title: '豐富化計畫', description: '每日提供多種類型的環境豐富化。', techniques: [33], priority: 'recommended' },
      ],
    },
  },
  {
    behaviorId: 'miscellaneous',
    defaultStrategies: [
      {
        phase: '安全管理',
        title: '環境管理與醫療排查',
        description: '針對具體行為進行環境管理（如收好食物防偷食），排除營養或醫療因素。',
        techniques: [1],
        priority: 'required',
      },
      {
        phase: '核心訓練',
        title: '替代行為與消弱',
        description: '依具體行為選擇技術：消弱（乞食）、替代行為（騎乘→坐下）、管理（食糞→牽繩）。',
        techniques: [7, 8, 11, 12],
        priority: 'required',
      },
      {
        phase: '日常管理',
        title: '豐富化與需求滿足',
        description: '確保狗狗有足夠的身心刺激與營養，減少因無聊或缺乏引起的異常行為。',
        techniques: [33],
        priority: 'recommended',
      },
    ],
    byFunction: {
      'self-reinforce': [
        { phase: '安全管理', title: '阻斷自我增強', description: '移除讓行為自我強化的條件（如遮蔽影子、移除光點）。', techniques: [1], priority: 'required' },
        { phase: '核心訓練', title: '替代活動與消弱', description: '提供合法的替代活動，並對問題行為進行消弱。', techniques: [7, 11, 33], priority: 'required' },
        { phase: '日常管理', title: '規律運動', description: '增加運動量與心智刺激，減少重複行為的發生。', techniques: [33], priority: 'recommended' },
      ],
      tangible: [
        { phase: '安全管理', title: '資源管控', description: '收好食物與可偷物品，管理環境中的誘惑。', techniques: [1, 29], priority: 'required' },
        { phase: '核心訓練', title: '教導「放開」與「等待」', description: '建立衝動控制，教導在食物與物品前的冷靜行為。', techniques: [7, 8, 21], priority: 'required' },
        { phase: '日常管理', title: '餵食管理', description: '規律餵食，避免狗狗因飢餓而乞食或偷食。', techniques: [20], priority: 'recommended' },
      ],
    },
  },
]

export function getStrategies(behaviorId: string, functionId?: string): StrategyStep[] {
  const behavior = behaviorStrategies.find(b => b.behaviorId === behaviorId)
  if (!behavior) return []

  if (functionId && behavior.byFunction[functionId]) {
    return behavior.byFunction[functionId]
  }

  return behavior.defaultStrategies
}
