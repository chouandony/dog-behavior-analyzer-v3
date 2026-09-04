"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  BookOpen,
  Search,
  BarChart3,
  Sparkles,
  ClipboardCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { behaviors } from "@/data/behaviors";
import BehaviorCard from "@/components/BehaviorCard";
import BorderCollieSVG from "@/components/BorderCollieSVG";

export default function HomePage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [shakeCard, setShakeCard] = useState(false);

  const selectBehavior = useCallback((id: string) => {
    setSelected((prev) => (prev === id ? null : id));
  }, []);

  const handleStartAnalysis = useCallback(() => {
    if (!selected) {
      setShakeCard(true);
      setTimeout(() => setShakeCard(false), 500);
      const el = document.getElementById("behavior-section");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selected]);

  const queryString = selected ? `?behaviors=${selected}` : "";

  return (
    <div className="space-y-6">
      {/* Hero 區域 */}
      <div className="relative bg-gradient-to-br from-orange-50 via-white to-emerald-50 rounded-3xl border-2 border-orange-100 p-6 overflow-hidden">
        <div className="absolute top-3 right-3 opacity-10">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <ellipse cx="30" cy="35" rx="12" ry="10" fill="#F97316" />
            <ellipse cx="18" cy="20" rx="5" ry="6" fill="#F97316" />
            <ellipse cx="30" cy="15" rx="5" ry="6" fill="#F97316" />
            <ellipse cx="42" cy="20" rx="5" ry="6" fill="#F97316" />
          </svg>
        </div>
        <div className="absolute bottom-3 left-3 opacity-10 rotate-12">
          <svg width="50" height="50" viewBox="0 0 60 60" fill="none">
            <ellipse cx="30" cy="35" rx="12" ry="10" fill="#10B981" />
            <ellipse cx="18" cy="20" rx="5" ry="6" fill="#10B981" />
            <ellipse cx="30" cy="15" rx="5" ry="6" fill="#10B981" />
            <ellipse cx="42" cy="20" rx="5" ry="6" fill="#10B981" />
          </svg>
        </div>

        <div className="flex items-center gap-4">
          <div className="shrink-0 animate-float">
            <BorderCollieSVG size={100} pose="waving" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={16} className="text-orange-500" />
              <span className="text-xs font-bold text-orange-600 tracking-wide">
                專業狗狗行為分析
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-800 leading-tight">
              狗狗行為分析
            </h1>
            <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
              選擇您想了解的問題行為，開始{" "}
              <span className="font-bold text-orange-600">ABC+E 分析</span>{" "}
              與對策規劃
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-4 pt-4 border-t border-orange-100/60">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-[10px] font-bold text-emerald-600">35</span>
            </div>
            <span>訓練技術</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-[10px] font-bold text-orange-600">8</span>
            </div>
            <span>行為維度</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-[10px] font-bold text-blue-600">6</span>
            </div>
            <span>ABC功能</span>
          </div>
        </div>
      </div>

      {/* 問卷入口 */}
      <Link
        href="/questionnaire/"
        className="group block relative bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition-all active:scale-[0.98] overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative flex items-center gap-4">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ClipboardCheck size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="font-black text-lg">CBARQ 行為評估問卷</h2>
            <p className="text-sm text-white/80 mt-0.5">
              100題專業評估，7大類別，自動識別需要關注的行為問題
            </p>
          </div>
          <ArrowRight
            size={24}
            className="shrink-0 text-white/80 group-hover:translate-x-1 transition-transform"
          />
        </div>
      </Link>

      {/* 狗狗提示條 */}
      <div className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 p-3 card-hover">
        <div className="shrink-0">
          <BorderCollieSVG size={48} pose="pointing" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-slate-700 font-bold">
            👇 請選擇一個您想了解的問題行為
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            點擊下方卡片選擇一項，即可進行 ABC+E 行為分析
          </p>
        </div>
      </div>

      {/* 行為卡片列表 - 單選 */}
      <div id="behavior-section" className={`grid gap-3 ${shakeCard ? 'animate-shake' : ''}`}>
        {behaviors.map((b, index) => (
          <div
            key={b.id}
            className="animate-fade-in-up"
            style={{
              animationDelay: `${index * 0.05}s`,
              animationFillMode: "both",
            }}
          >
            <BehaviorCard
              behavior={b}
              selected={selected === b.id}
              onToggle={() => selectBehavior(b.id)}
            />
          </div>
        ))}
      </div>

      {/* 底部浮動按鈕 */}
      <div className="fixed bottom-16 left-0 right-0 px-4 z-[60]">
        <div className="max-w-2xl mx-auto">
          {selected ? (
            <Link
              href={`/abc/${queryString}`}
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-orange-200 transition-all active:scale-[0.98] animate-fade-in-up"
            >
              <CheckCircle2 size={20} />
              <span>開始 ABC 分析</span>
              <ArrowRight size={20} />
            </Link>
          ) : (
            <button
              onClick={handleStartAnalysis}
              className="flex items-center justify-center gap-2 w-full bg-slate-200 text-slate-400 font-bold py-3.5 px-6 rounded-xl cursor-not-allowed transition-all"
            >
              <AlertCircle size={20} />
              <span>請先選擇一個行為</span>
            </button>
          )}
        </div>
      </div>

      {/* 功能入口 */}
      <div className="pt-4 pb-32">
        <div className="flex items-center gap-2 mb-3">
          <BorderCollieSVG size={32} pose="sitting" />
          <h2 className="text-sm font-bold text-slate-700">更多工具</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/techniques/"
            className="group flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-orange-300 hover:shadow-md transition-all card-hover relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-orange-100 to-transparent opacity-50 rounded-bl-full" />
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen size={22} className="text-orange-500" />
            </div>
            <span className="text-sm font-bold text-slate-700">35個訓練技術</span>
            <span className="text-[10px] text-slate-400">專業訓練方法總彙</span>
          </Link>
          <Link
            href="/analysis/"
            className="group flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all card-hover relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-emerald-100 to-transparent opacity-50 rounded-bl-full" />
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Search size={22} className="text-emerald-500" />
            </div>
            <span className="text-sm font-bold text-slate-700">ABC與九大成因</span>
            <span className="text-[10px] text-slate-400">科學行為分析工具</span>
          </Link>
          <Link
            href="/tracker/"
            className="group flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all card-hover relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-100 to-transparent opacity-50 rounded-bl-full" />
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BarChart3 size={22} className="text-blue-500" />
            </div>
            <span className="text-sm font-bold text-slate-700">進度追蹤</span>
            <span className="text-[10px] text-slate-400">記錄改善趨勢</span>
          </Link>
          <Link
            href="/abc/"
            className="group flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all card-hover relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-purple-100 to-transparent opacity-50 rounded-bl-full" />
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ClipboardList size={22} className="text-purple-500" />
            </div>
            <span className="text-sm font-bold text-slate-700">直接分析</span>
            <span className="text-[10px] text-slate-400">快速 ABC+E 分析</span>
          </Link>
        </div>
      </div>

      {/* 底部裝飾 */}
      <div className="flex justify-center pt-4 pb-8 opacity-40">
        <BorderCollieSVG size={80} pose="sleeping" />
      </div>
    </div>
  );
}
