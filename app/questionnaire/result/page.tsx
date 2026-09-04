"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  ClipboardCheck,
  BarChart3,
  Sparkles,
  Search,
  ArrowRight,
} from "lucide-react";
import { calculateScores, getSeverityBadgeColor } from "@/data/scoring";
import type { AssessmentResult } from "@/data/scoring";
import BorderCollieSVG from "@/components/BorderCollieSVG";

const riskConfig = {
  low: {
    label: "整體風險輕微",
    desc: "狗狗行為表現良好，建議持續觀察與正向強化。",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    badge: "bg-emerald-500",
    barFrom: "from-emerald-400",
    barTo: "to-emerald-500",
  },
  moderate: {
    label: "整體風險中度",
    desc: "部分行為需要關注，建議針對特定項目進行訓練。",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-700",
    badge: "bg-yellow-500",
    barFrom: "from-yellow-400",
    barTo: "to-yellow-500",
  },
  high: {
    label: "整體風險高度",
    desc: "建議優先處理高風險行為，可考慮尋求專業行為諮詢。",
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    badge: "bg-orange-500",
    barFrom: "from-orange-400",
    barTo: "to-orange-500",
  },
  severe: {
    label: "整體風險嚴重",
    desc: "存在明顯行為問題，強烈建議盡快尋求專業協助。",
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    badge: "bg-red-500",
    barFrom: "from-red-400",
    barTo: "to-red-500",
  },
};

export default function QuestionnaireResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("dog-questionnaire-result");
    if (saved) {
      try {
        const answers = JSON.parse(saved);
        const assessment = calculateScores(answers);
        setResult(assessment);
      } catch {
        router.push("/questionnaire/");
      }
    } else {
      router.push("/questionnaire/");
    }
  }, [router]);

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="animate-bounce">
          <BorderCollieSVG size={64} pose="sitting" />
        </div>
        <p className="text-slate-400 font-medium">分析中...</p>
      </div>
    );
  }

  const risk = riskConfig[result.overallRisk];
  const concernIds = result.topConcerns.map((b) => b.behaviorId).join(",");
  const concernCount = result.topConcerns.length;

  return (
    <div className="space-y-5 pb-32">
      {/* 頂部標題 */}
      <div className="relative bg-gradient-to-br from-orange-50 via-white to-emerald-50 rounded-3xl border-2 border-orange-100 p-6 overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <BorderCollieSVG size={80} pose="waving" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <ClipboardCheck size={16} className="text-orange-500" />
              <span className="text-xs font-bold text-orange-600 tracking-wide">
                CBARQ 評估完成
              </span>
            </div>
            <h1 className="text-xl font-black text-slate-800 leading-tight">
              評估結果報告
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              共完成 {result.behaviorScores.reduce((sum, b) => sum + b.answeredCount, 0)} 題評估
            </p>
          </div>
        </div>
      </div>

      {/* 整體風險指數卡片（與貓版一致） */}
      <div className={`rounded-2xl border-2 p-5 ${risk.bg} ${risk.border}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${risk.badge} flex items-center justify-center text-white shadow-md`}>
              <BarChart3 size={20} />
            </div>
            <div>
              <h2 className={`font-black text-lg ${risk.text}`}>{risk.label}</h2>
            </div>
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full bg-white/80 ${risk.text} border ${risk.border}`}>
            {riskConfig[result.overallRisk].label.replace("整體風險", "")}
          </span>
        </div>

        {/* 風險進度條 */}
        <div className="mb-3">
          <div className="h-3 bg-white/60 rounded-full overflow-hidden border border-slate-100">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${risk.barFrom} ${risk.barTo} transition-all duration-1000`}
              style={{
                width: `${(() => {
                  const maxAvg =
                    result.behaviorScores.length > 0
                      ? Math.max(...result.behaviorScores.map((b) => b.average))
                      : 0;
                  return Math.min((maxAvg / 5) * 100, 100);
                })()}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>

        <p className={`text-xs ${risk.text} opacity-80 leading-relaxed`}>
          {risk.desc}
        </p>
      </div>

      {/* 需要關注的行為 */}
      {concernCount > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-orange-500" />
            <h2 className="font-bold text-slate-800">
              需要關注的行為（{concernCount} 項）
            </h2>
          </div>
          <div className="space-y-3">
            {result.topConcerns.map((b) => (
              <div
                key={b.behaviorId}
                className="bg-white rounded-xl border-2 border-slate-200 p-4 hover:border-orange-200 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{b.emoji}</span>
                    <span className="font-bold text-slate-700">{b.behaviorName}</span>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold text-white ${getSeverityBadgeColor(
                      b.severity
                    )}`}
                  >
                    {b.severityLabel} · {b.average}分
                  </span>
                </div>

                {/* 得分進度條 */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getSeverityBadgeColor(b.severity)}`}
                      style={{ width: `${Math.min((b.average / 5) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-500 w-12 text-right">
                    {b.average} / 5
                  </span>
                </div>

                {/* 建議 + ABC 分析按鈕 */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-1">
                    {b.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                        <Sparkles size={12} className="text-orange-400 shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/abc/?behaviors=${b.behaviorId}`}
                    className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-50 text-orange-600 text-xs font-bold border border-orange-200 hover:bg-orange-100 transition-colors"
                  >
                    <Search size={12} />
                    ABC 分析
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 正常範圍的行為 */}
      {result.behaviorScores.filter((b) => b.severity === "low").length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-500" />
            <h2 className="font-bold text-slate-800">
              正常範圍的行為（{result.behaviorScores.filter((b) => b.severity === "low").length} 項）
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {result.behaviorScores
              .filter((b) => b.severity === "low")
              .map((b) => (
                <div
                  key={b.behaviorId}
                  className="bg-white rounded-xl border border-slate-200 p-3 flex items-center gap-2"
                >
                  <span className="text-lg">{b.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-700 truncate">{b.behaviorName}</div>
                    <div className="text-[10px] text-slate-400">{b.average} / 5</div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 各維度分數 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <BarChart3 size={18} className="text-blue-500" />
          <h2 className="font-bold text-slate-800">各維度分數</h2>
        </div>
        <div className="space-y-2">
          {result.sectionScores.map((sec) => (
            <div
              key={sec.sectionId}
              className="bg-white rounded-xl border border-slate-200 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-700 text-sm">
                  {sec.sectionTitle}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${getSeverityBadgeColor(
                    sec.severity
                  )}`}
                >
                  {sec.severityLabel}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${getSeverityBadgeColor(
                      sec.severity
                    )}`}
                    style={{ width: `${Math.min((sec.average / 5) * 100, 100)}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-slate-600 w-12 text-right">
                  {sec.average} / 5
                </span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                已答 {sec.answeredCount} / {sec.totalCount} 題
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 全部行為維度 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={18} className="text-purple-500" />
          <h2 className="font-bold text-slate-800">全部行為維度</h2>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {result.behaviorScores.map((b) => (
            <div
              key={b.behaviorId}
              className="bg-white rounded-xl border border-slate-200 p-3 text-center"
            >
              <div className="text-2xl mb-1">{b.emoji}</div>
              <div className="text-xs font-bold text-slate-700 mb-1">{b.behaviorName}</div>
              <div
                className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${getSeverityBadgeColor(
                  b.severity
                )}`}
              >
                {b.average}分
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部操作區 */}
      <div className="space-y-3 pt-2">
        {/* 對全部關注行為進行 ABC+E 分析（與貓版一致） */}
        {concernCount > 0 && (
          <Link
            href={`/abc/?behaviors=${concernIds}`}
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-orange-200 transition-all active:scale-[0.98] animate-fade-in-up"
          >
            <Sparkles size={18} />
            <span>對全部關注行為進行 ABC+E 分析</span>
            <ArrowRight size={18} />
          </Link>
        )}

        <div className="flex gap-3">
          <Link
            href="/questionnaire/"
            className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-600 font-bold py-3 rounded-xl hover:border-orange-300 hover:text-orange-600 transition-all active:scale-[0.98]"
          >
            <ArrowLeft size={18} />
            返回問卷
          </Link>
          <button
            onClick={() => {
              sessionStorage.removeItem("dog-questionnaire-result");
              localStorage.removeItem("dog-questionnaire-answers");
              localStorage.removeItem("dog-questionnaire-progress");
              router.push("/questionnaire/");
            }}
            className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-600 font-bold py-3 rounded-xl hover:border-orange-300 hover:text-orange-600 transition-all active:scale-[0.98]"
          >
            <RotateCcw size={18} />
            重新評估
          </button>
        </div>

        <Link
          href="/"
          className="flex items-center justify-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors py-2"
        >
          <ArrowLeft size={14} />
          返回首頁
        </Link>
      </div>
    </div>
  );
}
