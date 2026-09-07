import { NextRequest, NextResponse } from "next/server";

// 簡易記憶體計數器（開發環境或無 Redis 時使用）
let memoryTotal = 12847; // 初始值，可隨意設定
let memoryDaily = 0;
let lastResetDate = "";

function getTodayKey() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function getCounts() {
  const today = getTodayKey();
  if (lastResetDate !== today) {
    memoryDaily = 0;
    lastResetDate = today;
  }
  return { total: memoryTotal, daily: memoryDaily };
}

export async function GET() {
  const counts = getCounts();
  return NextResponse.json(counts);
}

export async function POST(req: NextRequest) {
  const { isNewVisitor } = await req.json().catch(() => ({ isNewVisitor: false }));
  const today = getTodayKey();

  if (lastResetDate !== today) {
    memoryDaily = 0;
    lastResetDate = today;
  }

  memoryTotal += 1;
  if (isNewVisitor) {
    memoryDaily += 1;
  }

  return NextResponse.json({ total: memoryTotal, daily: memoryDaily });
}

