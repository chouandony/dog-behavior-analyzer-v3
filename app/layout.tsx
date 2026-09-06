import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
        <div className="max-w-2xl mx-auto px-4 py-6 pb-32 relative z-10">
          {children}

          {/* 底部免責聲明 — 非 fixed，隨頁面流動 */}
          <div className="mt-8 bg-amber-50 rounded-xl border border-amber-200 p-3">
            <p className="text-[10px] text-amber-700 leading-relaxed text-center">
              ⚠️ 本工具僅供輔助參考，不構成專業獸醫或動物行為諮詢建議。
              評估結果與訓練對策基於學術研究框架獨立編寫，非官方授權的標準化問卷。
              若您依據本工具建議操作，導致寵物受傷、行為問題惡化或人員受傷，開發者不負相關法律責任。
              如有嚴重行為問題，請尋求認證行為諮詢師協助。
            </p>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-forest-400 via-warm-400 to-forest-400 opacity-60" />
        <Navbar />
      </body>
    </html>
  );
}
