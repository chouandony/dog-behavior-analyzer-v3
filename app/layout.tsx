import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import BorderCollieSVG from '@/components/BorderCollieSVG'

export const metadata: Metadata = {
  title: '狗狗行為分析與訓練對策 | Dog Behavior Analyzer',
  description: '從100題行為評估到ABC分析與訓練技術選擇的完整流程。分析狗狗不良行為，找到最適合的訓練對策，記錄進度改善成效。',
  keywords: '狗狗訓練, 行為分析, 吠叫, 咬人, 爆衝, 分離焦慮, 正向訓練, ABC分析, 行為評估',
  openGraph: {
    title: '狗狗行為分析與訓練對策',
    description: '從原因判斷到訓練技術選擇的完整流程',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body className="bg-cream min-h-screen text-earth-500 relative overflow-x-hidden">
        <div className="fixed top-20 right-2 opacity-[0.06] pointer-events-none z-0 hidden lg:block">
          <BorderCollieSVG size={180} pose="standing" />
        </div>
        <div className="fixed bottom-10 left-2 opacity-[0.05] pointer-events-none z-0 hidden lg:block rotate-[-10deg]">
          <BorderCollieSVG size={150} pose="sleeping" />
        </div>
        <div className="fixed inset-0 dot-pattern opacity-30 pointer-events-none z-0" />
        <Navbar />
        
        <main className="max-w-2xl mx-auto px-4 py-6 pb-[72px] relative z-10">
          {children}
        </main>
        <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-forest-400 via-warm-400 to-forest-400 opacity-60" />
      </body>
    </html>
  )
}
