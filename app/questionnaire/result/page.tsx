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
  },
  moderate: {
    label: "整體風險中度",
    desc: "部分行為需要關注，建議針對特定項目進行訓練。",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-700",
    badge: "bg-yellow-500",
  },
  high: {
    label: "整體風險高度",
    desc: "建議優先處理高風險行為，可考慮尋求專業行為諮詢。",
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    badge: "bg-orange-500",
  },
  severe: {
    label: "整體風險嚴重",
    desc: "存在明顯行為問題，強烈建議盡快尋求專業協助。",
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    badge: "bg-red-500",
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

  return (
    <div className="space-y-5 pb-24">
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

      {/* 整體風險卡片 */}
      <div className={`rounded-2xl border-2 p-5 ${risk.bg} ${risk.border}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-full ${risk.badge} flex items-center justify-center text-white shadow-md`}>
            <BarChart3 size={20} />
          </div>
          <div>
            <h2 className={`font-black text-lg ${risk.text}`}>{risk.label}</h2>
            <p className={`text-xs ${risk.text} opacity-80`}>{risk.desc}</p>
          </div>
        </div>
      </div>

      {/* 前三大關注點 */}
      {result.topConcerns.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-orange-500" />
            <h2 className="font-bold text-slate-800">優先關注行為</h2>
          </div>
          <div className="space-y-2">
            {result.topConcerns.map((b, idx) => (
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
                <div className="space-y-1">
                  {b.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                      <Sparkles size={12} className="text-orange-400 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 各維度分數 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <BarChart3 size={18} className="text-emerald-500" />
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

      {/* 所有行為分數 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={18} className="text-blue-500" />
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

      {/* 底部按鈕 */}
      <div className="fixed bottom-16 left-0 right-0 px-4 z-[60]">
        <div className="max-w-2xl mx-auto flex gap-3">
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
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-200 transition-all active:scale-[0.98]"
          >
            <RotateCcw size={18} />
            重新評估
          </button>
        </div>
      </div>
    </div>
  );
}
