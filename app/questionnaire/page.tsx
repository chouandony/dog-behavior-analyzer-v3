"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  CheckCircle2,
  ClipboardCheck,
  Dog,
  Save,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { questionnaireSections as sections } from "@/data/questionnaire";
import BorderCollieSVG from "@/components/BorderCollieSVG";

const STORAGE_KEY = "dog-questionnaire-answers";
const STORAGE_PROGRESS = "dog-questionnaire-progress";

const scoreColors: Record<number, string> = {
  0: "bg-slate-500 text-white border-slate-500 shadow-md",
  1: "bg-emerald-500 text-white border-emerald-500 shadow-md",
  2: "bg-green-500 text-white border-green-500 shadow-md",
  3: "bg-amber-500 text-white border-amber-500 shadow-md",
  4: "bg-orange-500 text-white border-orange-500 shadow-md",
  5: "bg-red-500 text-white border-red-500 shadow-md",
};

const scoreHoverColors: Record<number, string> = {
  0: "hover:bg-slate-100 hover:text-slate-600 hover:border-slate-300",
  1: "hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300",
  2: "hover:bg-green-50 hover:text-green-600 hover:border-green-300",
  3: "hover:bg-amber-50 hover:text-amber-600 hover:border-amber-300",
  4: "hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300",
  5: "hover:bg-red-50 hover:text-red-600 hover:border-red-300",
};

const scoreBarColors: Record<number, string> = {
  0: "bg-slate-400",
  1: "bg-emerald-400",
  2: "bg-green-400",
  3: "bg-amber-400",
  4: "bg-orange-400",
  5: "bg-red-400",
};

export default function QuestionnairePage() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [warning, setWarning] = useState<{
    show: boolean;
    missing: number[];
    message: string;
  }>({ show: false, missing: [], message: "" });
  const [highlightId, setHighlightId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shakeSection, setShakeSection] = useState(false);
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const savedProgress = localStorage.getItem(STORAGE_PROGRESS);
      if (saved) {
        setAnswers(JSON.parse(saved));
      }
      if (savedProgress) {
        setCurrentSection(Number(savedProgress));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    localStorage.setItem(STORAGE_PROGRESS, String(currentSection));
  }, [answers, currentSection]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const allUnanswered = sections
        .flatMap((s) => s.questions.map((q) => q.id))
        .filter((id) => answers[id] === undefined);
      if (allUnanswered.length > 0) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [answers]);

  const current = sections[currentSection];
  const totalSections = sections.length;
  const progress = Math.round((Object.keys(answers).length / 100) * 100);

  const handleSelect = useCallback((qid: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
    setWarning((prev) => {
      if (prev.missing.includes(qid)) {
        const remaining = prev.missing.filter((id) => id !== qid);
        if (remaining.length === 0) {
          return { show: false, missing: [], message: "" };
        }
        return {
          ...prev,
          missing: remaining,
          message: `尚有 ${remaining.length} 題未作答（題號：${remaining.join(", ")}）`,
        };
      }
      return prev;
    });
  }, []);

  const validateSection = useCallback(() => {
    const missing = getUnansweredInSection(answers, currentSection);
    if (missing.length > 0) {
      setWarning({
        show: true,
        missing,
        message: `尚有 ${missing.length} 題未作答（題號：${missing.join(", ")}）`,
      });
      setShakeSection(true);
      setTimeout(() => setShakeSection(false), 500);
      const firstMissing = missing[0];
      setHighlightId(firstMissing);
      setTimeout(() => setHighlightId(null), 2000);

      const el = questionRefs.current[firstMissing];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return false;
    }
    setWarning({ show: false, missing: [], message: "" });
    return true;
  }, [answers, currentSection]);

  const handleNext = useCallback(() => {
    if (!validateSection()) return;
    if (currentSection < totalSections - 1) {
      setCurrentSection((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [validateSection, currentSection, totalSections]);

  const handlePrev = useCallback(() => {
    setWarning({ show: false, missing: [], message: "" });
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentSection]);

  const handleSubmit = useCallback(() => {
    if (!validateSection()) return;
    const allMissing: number[] = [];
    for (let i = 0; i < totalSections; i++) {
      allMissing.push(...getUnansweredInSection(answers, i));
    }
    if (allMissing.length > 0) {
      for (let i = 0; i < totalSections; i++) {
        if (getUnansweredInSection(answers, i).length > 0) {
          setCurrentSection(i);
          setTimeout(() => {
            setWarning({
              show: true,
              missing: allMissing,
              message: `全問卷尚有 ${allMissing.length} 題未作答，已自動跳轉至未完成區塊`,
            });
            setShakeSection(true);
            setTimeout(() => setShakeSection(false), 500);
            const first = getUnansweredInSection(answers, i)[0];
            if (first) {
              setHighlightId(first);
              setTimeout(() => setHighlightId(null), 2000);
              const el = questionRefs.current[first];
              if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }, 100);
          return;
        }
      }
    }

    setIsSubmitting(true);
    sessionStorage.setItem("dog-questionnaire-result", JSON.stringify(answers));
    router.push("/questionnaire/result/");
  }, [validateSection, answers, totalSections, router]);

  const handleReset = useCallback(() => {
    if (confirm("確定要清除所有已填寫的答案嗎？此操作無法復原。")) {
      setAnswers({});
      setCurrentSection(0);
      setWarning({ show: false, missing: [], message: "" });
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_PROGRESS);
    }
  }, []);

  const isQuestionMissing = (qid: number) =>
    warning.show && warning.missing.includes(qid);

  const getSelectedColor = (qid: number) => {
    const val = answers[qid];
    if (val === undefined) return null;
    return scoreBarColors[val] || "bg-slate-300";
  };

  return (
    <div className="space-y-4 pb-32">
      {/* 頂部標題區 */}
      <div className="relative bg-gradient-to-br from-orange-50 via-white to-emerald-50 rounded-3xl border-2 border-orange-100 p-6 overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="shrink-0 animate-float">
            <BorderCollieSVG size={80} pose="waving" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <ClipboardCheck size={16} className="text-orange-500" />
              <span className="text-xs font-bold text-orange-600 tracking-wide">
                CBARQ 專業評估
              </span>
            </div>
            <h1 className="text-xl font-black text-slate-800 leading-tight">
              狗狗行為評估問卷
            </h1>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed">
              100題專業評估，涵蓋7大類別，幫助您全面了解狗狗的行為特徵。
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-medium">完成進度</span>
            <span className="font-bold text-slate-700">{progress}%</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 via-orange-400 to-red-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>{Object.keys(answers).length} / 100 題</span>
            <span>第 {currentSection + 1} / {totalSections} 部分</span>
          </div>
        </div>
      </div>

      {/* 紅色警告區塊 */}
      {warning.show && (
        <div className="animate-fade-in-up bg-red-50 border-l-4 border-red-500 rounded-xl p-4 flex items-start gap-3 shadow-sm">
          <AlertTriangle size={20} className="text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-bold text-red-700">{warning.message}</p>
            <p className="text-xs text-red-500 mt-1">
              請完成所有題目後再繼續。未作答題目已標記為紅色。
            </p>
          </div>
        </div>
      )}

      {/* 區塊導航快捷列 */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
        {sections.map((sec, idx) => {
          const missingCount = getUnansweredInSection(answers, idx).length;
          const isActive = idx === currentSection;
          const isCompleted = missingCount === 0;
          return (
            <button
              key={sec.id}
              onClick={() => {
                setCurrentSection(idx);
                setWarning({ show: false, missing: [], message: "" });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                isActive
                  ? "bg-orange-500 text-white border-orange-500 shadow-md"
                  : isCompleted
                  ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                  : "bg-white text-slate-400 border-slate-200"
              }`}
            >
              <span className="mr-1">{idx + 1}</span>
              {isCompleted && <span className="inline-block ml-0.5">✓</span>}
              {missingCount > 0 && !isActive && (
                <span className="ml-0.5 text-red-500">({missingCount})</span>
              )}
            </button>
          );
        })}
      </div>

      {/* 當前區塊 */}
      <div ref={sectionRef} className={`space-y-4 ${shakeSection ? 'animate-shake' : ''}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
            <span className="text-lg">🐕</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">{current.title}</h2>
            <p className="text-xs text-slate-500">{current.description}</p>
          </div>
          <div className="ml-auto text-xs text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
            {current.questions.length} 題
          </div>
        </div>

        {/* 題目列表 */}
        <div className="space-y-3">
          {current.questions.map((q) => {
            const missing = isQuestionMissing(q.id);
            const selected = answers[q.id];
            const isHighlighted = highlightId === q.id;
            const barColor = getSelectedColor(q.id);

            return (
              <div
                key={q.id}
                ref={(el) => {
                  questionRefs.current[q.id] = el;
                }}
                className={`relative bg-white rounded-xl border-2 p-4 transition-all duration-300 overflow-hidden ${
                  missing
                    ? "border-red-400 shadow-red-100 shadow-md"
                    : isHighlighted
                    ? "border-orange-400 shadow-orange-100 shadow-lg scale-[1.02]"
                    : barColor
                    ? "border-slate-200"
                    : "border-slate-200 hover:border-orange-200"
                }`}
              >
                {/* 左側 Color Bar */}
                {barColor && (
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${barColor}`} />
                )}
                {missing && !barColor && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-red-400" />
                )}

                <div className="flex items-start gap-3 mb-3 pl-2">
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      missing
                        ? "bg-red-100 text-red-600 animate-pulse"
                        : selected !== undefined
                        ? `${scoreBarColors[selected]} text-white`
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {q.id}
                  </div>
                  <p
                    className={`text-sm font-semibold leading-relaxed pt-1 ${
                      missing ? "text-red-700" : "text-slate-700"
                    }`}
                  >
                    {q.text}
                  </p>
                </div>

                {/* 極端值提示 */}
                {selected === 5 && (
                  <div className="mb-2 pl-10">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                      <AlertTriangle size={10} />
                      這個行為頻率很高，建議優先關注
                    </span>
                  </div>
                )}

                {/* 選項 - Solid Color 方案 */}
                <div className="grid grid-cols-6 gap-1.5 pl-2">
                  {[0, 1, 2, 3, 4, 5].map((val) => {
                    const isSelected = selected === val;
                    const baseClasses = "py-2.5 px-1 rounded-lg text-xs font-bold border-2 transition-all active:scale-95";
                    const selectedClasses = isSelected
                      ? scoreColors[val]
                      : `bg-white text-slate-500 border-slate-200 ${scoreHoverColors[val]}`;

                    return (
                      <button
                        key={val}
                        onClick={() => handleSelect(q.id, val)}
                        className={`${baseClasses} ${selectedClasses}`}
                      >
                        <span className="block text-lg leading-none mb-0.5">
                          {val}
                        </span>
                        <span className="block text-[9px] scale-90 opacity-90">
                          {scoreLabels[val]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 底部導航按鈕 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 z-40">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={currentSection === 0}
            className="shrink-0 flex items-center gap-1 px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-95"
          >
            <ChevronLeft size={18} />
            上一部分
          </button>

          <div className="flex-1 text-center">
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 mx-auto"
            >
              <RotateCcw size={12} />
              清除重填
            </button>
          </div>

          {currentSection < totalSections - 1 ? (
            <button
              onClick={handleNext}
              className="shrink-0 flex items-center gap-1 px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm shadow-lg shadow-orange-200 transition-all active:scale-95"
            >
              下一部分
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="shrink-0 flex items-center gap-1.5 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-200 transition-all active:scale-95 disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Save size={18} className="animate-pulse" />
                  分析中...
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  提交分析
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
