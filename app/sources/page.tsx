import Link from "next/link";
import { QUESTIONNAIRE_VERSION } from "@/lib/analyzer/questionnaire";
import VisitCounter from "@/components/VisitCounter";

export default function SourcesPage() {
  return (
    <div>
      <h1 className="text-xl font-bold">📚 資料來源與使用說明</h1>
      <div className="rounded-2xl bg-white p-3.5 mt-3 mb-2.5 text-[13px] leading-[21px]" style={{ border: "1px solid var(--bd)", color: "#55555e" }}>
        本指南的知識架構整理自以下書籍與專案，並以中文重寫為實用導讀，<b>不是逐字翻譯</b>：
        <ul className="list-disc pl-5 mt-1.5">
          <li>Barbara Sykes《Understanding Border Collies》— 側重牧羊本能、夥伴關係、常識訓練法與問題排除</li>
          <li>Carol Price《Understanding the Border Collie》— 側重家庭飼養適配、救援犬、壓力／攻擊、健康與老年照護</li>
          <li>Christopher Little《The Dog Care Handbook: Things I Wish My Vet Had Told Me》(2024) — 獸醫視角的選獸醫、門診溝通、例行照護、急症判斷、居家護理與老年告別（健康分類後 5 篇的整理來源）</li>
          <li>Mechtild Käufer《Canine Play Behavior: The Science of Dogs at Play》(2014, Dogwise) — 遊戲行為科學：遊戲訊號（play bow 與後設溝通）、自我設限、角色互換、幼犬遊戲發展、犬際遊戲風險與人犬遊戲（同齡對等遊戲主題的科學依據）</li>
          <li>dog-behavior-analyzer-v3（行為分析器專案）— 提供訓練技巧百科、九大行為成因、ABC 功能分析等行為科學工具知識</li>
        </ul>
      </div>
      <div className="rounded-2xl bg-white p-3.5 mt-3 mb-2.5 text-[13px] leading-[21px]" style={{ border: "1px solid var(--bd)", color: "#55555e" }}>
        發育里程碑內容另參考「邊境牧羊犬專屬階段里程碑表」（Facebook 分享貼文），其引用來源包括：
        <ul className="list-disc pl-5 mt-1.5">
          <li>C2C Border Collies 繁殖協議 — 早期神經刺激（ENS）與產後護理</li>
          <li>Heine (2000) 犬隻行為個體發展研究；PMC 邊牧行為發展縱向追蹤研究（6–12 月）</li>
          <li>Collie Consultant (2023) 邊牧青春期行為與神經科學專題</li>
          <li>American Border Collie Association 遺傳健康指南（OCD、CEA 等）</li>
          <li>AAHA 犬隻疫苗接種指南、Tailster 邊牧疫苗指引、Royal Canin 品種指南</li>
        </ul>
        <div className="text-xs mt-1.5" style={{ color: "#5f6774" }}>以上發育里程碑、疫苗時程與疾病窗口皆已重寫為繁體中文並濃縮整理，年齡為約略值，僅供參考。</div>
      </div>
      <div className="rounded-2xl p-3.5 mb-2.5 text-[13px] leading-[21px]" style={{ border: "1px solid rgba(239,68,68,.3)", background: "rgba(239,68,68,.05)", color: "#55555e" }}>
        ⚠️ 本指南不取代獸醫、訓練師或行為專家的判斷。高風險攻擊、嚴重焦慮、健康異常，請尋求專業協助。
      </div>
      <div className="rounded-2xl bg-white p-3.5 mb-2.5 text-[13px] leading-[21px]" style={{ border: "1px solid var(--bd)", color: "#55555e" }}>
        <div className="font-bold">🗂️ 內容版本</div>
        指南內容 1.3・評估問卷 v{QUESTIONNAIRE_VERSION}・資料格式 v1
        <div className="text-xs mt-1" style={{ color: "#5f6774" }}>內容修訂時此處版本號會更新；每筆評估紀錄也會標註當時的問卷版本，方便前後對比。</div>
      </div>
      <div className="rounded-2xl bg-white p-3.5 mb-2.5" style={{ border: "1px solid var(--bd)" }}>
        <div className="text-[13px] font-bold" style={{ color: "#55555e" }}>💾 我的資料</div>
        <div className="text-xs mt-1 mb-2 leading-[18px]" style={{ color: "#5f6774" }}>收藏、今日練習、評估紀錄都存在這台裝置的瀏覽器，建議定期備份。</div>
        <Link href="/data" className="text-[13px] font-semibold" style={{ color: "var(--acc)" }}>前往「我的資料」：匯出備份／匯入／清除 →</Link>
      <VisitCounter />
      </div>
    </div>
  );
}
