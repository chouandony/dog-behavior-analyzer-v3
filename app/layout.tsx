import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import DisclaimerMeasure from "@/components/DisclaimerMeasure";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "狗狗行為分析器 — 專業行為評估與ABC分析",
  description: "基於學術研究框架的狗狗行為評估工具，提供100題專業問卷、ABC行為分析與個人化訓練對策。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={`${inter.className} bg-cream min-h-screen`}>
        <div className="max-w-2xl mx-auto px-4 py-6 pb-[calc(var(--navbar-height,3.5rem)_+_var(--disclaimer-height,5rem)_+_6rem)] relative z-10">
          {children}

        </div>
        {/* 底部免責聲明：fixed 在導覽列上方，高度由 DisclaimerMeasure 動態量測 */}
        <div
          id="site-disclaimer"
          className="fixed bottom-[var(--navbar-height,3.5rem)] left-0 right-0 bg-amber-50 border-t border-amber-200 px-4 py-2 z-30"
          style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom, 0px))' }}
        >
            <p className="text-[10px] text-amber-700 leading-relaxed text-center">
              ⚠️ 本工具僅供輔助參考，不構成專業獸醫或動物行為諮詢建議。
              評估結果與訓練對策基於學術研究框架獨立編寫，非官方授權的標準化問卷。
              若您依據本工具建議操作，導致寵物受傷、行為問題惡化或人員受傷，開發者不負相關法律責任。
              如有嚴重行為問題，請尋求認證行為諮詢師協助。
            </p>        </div>
        <DisclaimerMeasure />
        <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-forest-400 via-warm-400 to-forest-400 opacity-60" />
        <Navbar />
      </body>
    </html>
  );
}
