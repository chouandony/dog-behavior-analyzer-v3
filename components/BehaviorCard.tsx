"use client";

import { CheckCircle2 } from "lucide-react";
import { type Behavior } from "@/data/behaviors";

interface BehaviorCardProps {
  behavior: Behavior;
  selected: boolean;
  onToggle: () => void;
}

export default function BehaviorCard({
  behavior,
  selected,
  onToggle,
}: BehaviorCardProps) {
  const dangerColors = {
    low: "border-emerald-200 bg-emerald-50 text-emerald-700",
    medium: "border-amber-200 bg-amber-50 text-amber-700",
    high: "border-red-200 bg-red-50 text-red-700",
  };

  return (
    <button
      onClick={onToggle}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 card-hover ${
        selected
          ? "border-orange-400 bg-orange-50 shadow-md"
          : "border-slate-200 bg-white hover:border-orange-200"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 text-3xl">{behavior.emoji}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3
              className={`font-bold ${
                selected ? "text-orange-700" : "text-slate-700"
              }`}
            >
              {behavior.name}
            </h3>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${dangerColors[behavior.dangerLevel]}`}
            >
              {behavior.dangerLevel === "low"
                ? "低風險"
                : behavior.dangerLevel === "medium"
                ? "中風險"
                : "高風險"}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            {behavior.description}
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {behavior.commonCauses.slice(0, 3).map((cause) => (
              <span
                key={cause}
                className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200"
              >
                {cause}
              </span>
            ))}
          </div>
        </div>
        <div className="shrink-0">
          {selected ? (
            <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
              <CheckCircle2 size={16} className="text-white" />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full border-2 border-slate-300" />
          )}
        </div>
      </div>
    </button>
  );
}
