'use client'

interface Props {
  className?: string
  size?: number
  pose?: 'sitting' | 'standing' | 'waving' | 'sleeping' | 'pointing'
}

export default function BorderCollieSVG({ className = '', size = 120, pose = 'sitting' }: Props) {
  const poses = {
    sitting: (
      <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* 身体 */}
        <ellipse cx="100" cy="140" rx="45" ry="38" fill="#1a1a2e" />
        <ellipse cx="100" cy="140" rx="28" ry="25" fill="#f5f5f0" />
        {/* 胸部白毛 */}
        <ellipse cx="100" cy="125" rx="20" ry="18" fill="#ffffff" />
        {/* 头部 */}
        <ellipse cx="100" cy="75" rx="38" ry="34" fill="#1a1a2e" />
        {/* 脸部白毛 - 边牧特有的 blaze */}
        <path d="M100 45 L100 95" stroke="#ffffff" strokeWidth="14" strokeLinecap="round" />
        <ellipse cx="100" cy="78" rx="18" ry="20" fill="#ffffff" />
        {/* 左眼 */}
        <ellipse cx="85" cy="72" rx="10" ry="11" fill="#ffffff" />
        <circle cx="86" cy="73" r="5.5" fill="#2d5a3d" />
        <circle cx="87" cy="72" r="2.5" fill="#1a1a2e" />
        <circle cx="84.5" cy="70.5" r="1.5" fill="#ffffff" />
        {/* 右眼 */}
        <ellipse cx="115" cy="72" rx="10" ry="11" fill="#ffffff" />
        <circle cx="114" cy="73" r="5.5" fill="#2d5a3d" />
        <circle cx="113" cy="72" r="2.5" fill="#1a1a2e" />
        <circle cx="115.5" cy="70.5" r="1.5" fill="#ffffff" />
        {/* 鼻子 */}
        <ellipse cx="100" cy="88" rx="7" ry="5" fill="#1a1a2e" />
        <ellipse cx="100" cy="86.5" rx="3" ry="2" fill="#333" />
        {/* 嘴巴 */}
        <path d="M94 93 Q100 98 106 93" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M98 95 Q100 97 102 95" stroke="#e86a33" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 左耳 */}
        <path d="M68 58 Q58 35 52 48 Q50 58 62 62" fill="#1a1a2e" />
        <path d="M66 56 Q60 42 56 50 Q55 56 62 58" fill="#f5f5f0" />
        {/* 右耳 */}
        <path d="M132 58 Q142 35 148 48 Q150 58 138 62" fill="#1a1a2e" />
        <path d="M134 56 Q140 42 144 50 Q145 56 138 58" fill="#f5f5f0" />
        {/* 前腿 */}
        <rect x="78" y="165" width="12" height="28" rx="6" fill="#ffffff" />
        <rect x="110" y="165" width="12" height="28" rx="6" fill="#ffffff" />
        {/* 爪子 */}
        <ellipse cx="84" cy="192" rx="8" ry="5" fill="#f5f5f0" />
        <ellipse cx="116" cy="192" rx="8" ry="5" fill="#f5f5f0" />
        {/* 尾巴 */}
        <path d="M140 155 Q165 145 170 130 Q175 120 168 125" stroke="#1a1a2e" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M165 140 Q172 135 174 128" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* 项圈 */}
        <path d="M78 105 Q100 115 122 105" stroke="#e86a33" strokeWidth="5" strokeLinecap="round" fill="none" />
        <circle cx="100" cy="111" r="4" fill="#d4af37" />
        {/* 脸颊白毛 */}
        <ellipse cx="75" cy="82" rx="8" ry="10" fill="#ffffff" opacity="0.9" />
        <ellipse cx="125" cy="82" rx="8" ry="10" fill="#ffffff" opacity="0.9" />
      </svg>
    ),
    standing: (
      <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <ellipse cx="100" cy="130" rx="42" ry="35" fill="#1a1a2e" />
        <ellipse cx="100" cy="130" rx="26" ry="22" fill="#f5f5f0" />
        <ellipse cx="100" cy="118" rx="18" ry="16" fill="#ffffff" />
        <ellipse cx="100" cy="68" rx="36" ry="32" fill="#1a1a2e" />
        <path d="M100 40 L100 88" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" />
        <ellipse cx="100" cy="72" rx="16" ry="18" fill="#ffffff" />
        <ellipse cx="86" cy="66" rx="9" ry="10" fill="#ffffff" />
        <circle cx="87" cy="67" r="4.5" fill="#2d5a3d" />
        <circle cx="88" cy="66" r="2" fill="#1a1a2e" />
        <ellipse cx="114" cy="66" rx="9" ry="10" fill="#ffffff" />
        <circle cx="113" cy="67" r="4.5" fill="#2d5a3d" />
        <circle cx="112" cy="66" r="2" fill="#1a1a2e" />
        <ellipse cx="100" cy="82" rx="6" ry="4" fill="#1a1a2e" />
        <path d="M95 86 Q100 90 105 86" stroke="#1a1a2e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M70 52 Q62 32 56 42 Q54 50 64 54" fill="#1a1a2e" />
        <path d="M130 52 Q138 32 144 42 Q146 50 136 54" fill="#1a1a2e" />
        <rect x="76" y="155" width="11" height="30" rx="5.5" fill="#ffffff" />
        <rect x="113" y="155" width="11" height="30" rx="5.5" fill="#ffffff" />
        <rect x="86" y="158" width="10" height="28" rx="5" fill="#ffffff" />
        <rect x="104" y="158" width="10" height="28" rx="5" fill="#ffffff" />
        <ellipse cx="81.5" cy="184" rx="7" ry="4" fill="#f5f5f0" />
        <ellipse cx="118.5" cy="184" rx="7" ry="4" fill="#f5f5f0" />
        <ellipse cx="91" cy="185" rx="6" ry="3.5" fill="#f5f5f0" />
        <ellipse cx="109" cy="185" rx="6" ry="3.5" fill="#f5f5f0" />
        <path d="M138 148 Q158 138 162 125 Q166 116 160 120" stroke="#1a1a2e" strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M76 98 Q100 108 124 98" stroke="#e86a33" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <circle cx="100" cy="103" r="3.5" fill="#d4af37" />
      </svg>
    ),
    waving: (
      <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <ellipse cx="100" cy="135" rx="42" ry="35" fill="#1a1a2e" />
        <ellipse cx="100" cy="135" rx="26" ry="22" fill="#f5f5f0" />
        <ellipse cx="100" cy="123" rx="18" ry="16" fill="#ffffff" />
        <ellipse cx="100" cy="70" rx="36" ry="32" fill="#1a1a2e" />
        <path d="M100 42 L100 90" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" />
        <ellipse cx="100" cy="74" rx="16" ry="18" fill="#ffffff" />
        <ellipse cx="86" cy="68" rx="9" ry="10" fill="#ffffff" />
        <circle cx="87" cy="69" r="4.5" fill="#2d5a3d" />
        <circle cx="88" cy="68" r="2" fill="#1a1a2e" />
        <ellipse cx="114" cy="68" rx="9" ry="10" fill="#ffffff" />
        <circle cx="113" cy="69" r="4.5" fill="#2d5a3d" />
        <circle cx="112" cy="68" r="2" fill="#1a1a2e" />
        <ellipse cx="100" cy="84" rx="6" ry="4" fill="#1a1a2e" />
        <path d="M95 88 Q100 92 105 88" stroke="#1a1a2e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M70 54 Q62 34 56 44 Q54 52 64 56" fill="#1a1a2e" />
        <path d="M130 54 Q138 34 144 44 Q146 52 136 56" fill="#1a1a2e" />
        {/* 举起的前爪 */}
        <rect x="68" y="125" width="11" height="28" rx="5.5" fill="#ffffff" transform="rotate(-25 73.5 139)" />
        <ellipse cx="62" cy="118" rx="7" ry="5" fill="#f5f5f0" transform="rotate(-25 62 118)" />
        <rect x="115" y="155" width="11" height="30" rx="5.5" fill="#ffffff" />
        <rect x="86" y="158" width="10" height="28" rx="5" fill="#ffffff" />
        <rect x="104" y="158" width="10" height="28" rx="5" fill="#ffffff" />
        <ellipse cx="120.5" cy="184" rx="7" ry="4" fill="#f5f5f0" />
        <ellipse cx="91" cy="185" rx="6" ry="3.5" fill="#f5f5f0" />
        <ellipse cx="109" cy="185" rx="6" ry="3.5" fill="#f5f5f0" />
        <path d="M138 150 Q158 140 162 127 Q166 118 160 122" stroke="#1a1a2e" strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M76 100 Q100 110 124 100" stroke="#e86a33" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <circle cx="100" cy="105" r="3.5" fill="#d4af37" />
        {/* 小爱心 */}
        <path d="M140 55 Q140 50 145 50 Q150 50 150 55 Q150 62 145 65 Q140 62 140 55" fill="#e86a33" opacity="0.8" />
      </svg>
    ),
    sleeping: (
      <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <ellipse cx="100" cy="145" rx="48" ry="32" fill="#1a1a2e" />
        <ellipse cx="100" cy="145" rx="30" ry="20" fill="#f5f5f0" />
        <ellipse cx="100" cy="135" rx="20" ry="14" fill="#ffffff" />
        <ellipse cx="85" cy="105" rx="32" ry="28" fill="#1a1a2e" />
        <path d="M85 82 L85 120" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />
        <ellipse cx="85" cy="108" rx="14" ry="16" fill="#ffffff" />
        <path d="M72 102 Q75 98 78 102" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M92 102 Q95 98 98 102" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="85" cy="114" rx="5" ry="3" fill="#1a1a2e" />
        <path d="M60 88 Q54 72 50 80 Q48 86 56 90" fill="#1a1a2e" />
        <path d="M55 140 Q100 155 145 140" stroke="#1a1a2e" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M60 142 Q100 152 140 142" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" fill="none" />
        <rect x="65" y="160" width="10" height="20" rx="5" fill="#ffffff" />
        <rect x="95" y="160" width="10" height="20" rx="5" fill="#ffffff" />
        <rect x="125" y="160" width="10" height="20" rx="5" fill="#ffffff" />
        <ellipse cx="70" cy="179" rx="6" ry="3.5" fill="#f5f5f0" />
        <ellipse cx="100" cy="179" rx="6" ry="3.5" fill="#f5f5f0" />
        <ellipse cx="130" cy="179" rx="6" ry="3.5" fill="#f5f5f0" />
        <path d="M62 100 Q85 108 108 100" stroke="#e86a33" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <circle cx="85" cy="104" r="3" fill="#d4af37" />
        {/* Zzz */}
        <text x="125" y="85" fontSize="18" fontWeight="bold" fill="#8b7d6b" opacity="0.6">Z</text>
        <text x="135" y="72" fontSize="14" fontWeight="bold" fill="#8b7d6b" opacity="0.5">z</text>
        <text x="143" y="62" fontSize="10" fontWeight="bold" fill="#8b7d6b" opacity="0.4">z</text>
      </svg>
    ),
    pointing: (
      <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <ellipse cx="100" cy="135" rx="42" ry="35" fill="#1a1a2e" />
        <ellipse cx="100" cy="135" rx="26" ry="22" fill="#f5f5f0" />
        <ellipse cx="100" cy="123" rx="18" ry="16" fill="#ffffff" />
        <ellipse cx="100" cy="70" rx="36" ry="32" fill="#1a1a2e" />
        <path d="M100 42 L100 90" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" />
        <ellipse cx="100" cy="74" rx="16" ry="18" fill="#ffffff" />
        <ellipse cx="86" cy="68" rx="9" ry="10" fill="#ffffff" />
        <circle cx="87" cy="69" r="4.5" fill="#2d5a3d" />
        <circle cx="88" cy="68" r="2" fill="#1a1a2e" />
        <ellipse cx="114" cy="68" rx="9" ry="10" fill="#ffffff" />
        <circle cx="113" cy="69" r="4.5" fill="#2d5a3d" />
        <circle cx="112" cy="68" r="2" fill="#1a1a2e" />
        <ellipse cx="100" cy="84" rx="6" ry="4" fill="#1a1a2e" />
        <path d="M95 88 Q100 92 105 88" stroke="#1a1a2e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M70 54 Q62 34 56 44 Q54 52 64 56" fill="#1a1a2e" />
        <path d="M130 54 Q138 34 144 44 Q146 52 136 56" fill="#1a1a2e" />
        <rect x="76" y="155" width="11" height="30" rx="5.5" fill="#ffffff" />
        <rect x="113" y="155" width="11" height="30" rx="5.5" fill="#ffffff" />
        <rect x="86" y="158" width="10" height="28" rx="5" fill="#ffffff" />
        <rect x="104" y="158" width="10" height="28" rx="5" fill="#ffffff" />
        <ellipse cx="81.5" cy="184" rx="7" ry="4" fill="#f5f5f0" />
        <ellipse cx="118.5" cy="184" rx="7" ry="4" fill="#f5f5f0" />
        <ellipse cx="91" cy="185" rx="6" ry="3.5" fill="#f5f5f0" />
        <ellipse cx="109" cy="185" rx="6" ry="3.5" fill="#f5f5f0" />
        <path d="M138 150 Q158 140 162 127 Q166 118 160 122" stroke="#1a1a2e" strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M76 100 Q100 110 124 100" stroke="#e86a33" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <circle cx="100" cy="105" r="3.5" fill="#d4af37" />
        {/* 指向的鼻子 */}
        <ellipse cx="100" cy="82" rx="8" ry="5" fill="#1a1a2e" />
        <path d="M96 78 L100 72 L104 78" fill="#1a1a2e" />
      </svg>
    ),
  }

  return poses[pose] || poses.sitting
}
