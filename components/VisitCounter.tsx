"use client";
import { useEffect, useState } from "react";

/**
 * 訪客計數器：每天每個瀏覽器只上報一次（localStorage 記日期），
 * 切換頁面／重新整理不累加。資料存 Upstash Redis（經 /api/visits）。
 */
export default function VisitCounter() {
  const [counts, setCounts] = useState<{ total: number; daily: number } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const d = new Date();
        const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
        const KEY = "bcg-visit-date";
        const isNewVisitor = window.localStorage.getItem(KEY) !== today;
        const res = await fetch("/api/visits", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isNewVisitor }),
        });
        if (!res.ok) return;
        const data = await res.json();
        if (isNewVisitor) window.localStorage.setItem(KEY, today);
        setCounts({ total: Number(data.total) || 0, daily: Number(data.daily) || 0 });
      } catch {
        // 離線或未設定資料庫時靜默：不顯示計數器
      }
    })();
  }, []);

  if (!counts) return null;
  return (
    <div className="text-center text-[11px] mt-2" style={{ color: "#5f6774" }}>
      👣 累計訪客 {counts.total.toLocaleString()} 人・今日 {counts.daily.toLocaleString()} 人
    </div>
  );
}
