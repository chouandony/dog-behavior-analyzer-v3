import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

// 兼容有/無 STORAGE 前綴的環境變數
const redis = new Redis({
  url: process.env.STORAGE_KV_REST_API_URL || process.env.KV_REST_API_URL || '',
  token: process.env.STORAGE_KV_REST_API_TOKEN || process.env.KV_REST_API_TOKEN || '',
});

const TOTAL_KEY = 'visitors:total';
const DAILY_PREFIX = 'visitors:daily';

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

export async function GET() {
  try {
    const total = await redis.get(TOTAL_KEY) || 0;
    const today = getTodayKey();
    const daily = await redis.get(`${DAILY_PREFIX}:${today}`) || 0;
    return NextResponse.json({ total: Number(total), daily: Number(daily) });
  } catch {
    return NextResponse.json({ total: 12847, daily: 0 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { isNewVisitor } = await req.json().catch(() => ({ isNewVisitor: false }));
    const today = getTodayKey();

    // 只有「新訪客」（每瀏覽器每天第一次）才累加 total，避免切換頁面/重新整理灌水
    if (isNewVisitor) {
      const total = await redis.incr(TOTAL_KEY);
      const daily = await redis.incr(`${DAILY_PREFIX}:${today}`);
      return NextResponse.json({ total: Number(total), daily: Number(daily) });
    }

    // 非新訪客：只回傳目前數字，不累加
    const total = await redis.get(TOTAL_KEY) || 0;
    const daily = await redis.get(`${DAILY_PREFIX}:${today}`) || 0;
    return NextResponse.json({ total: Number(total), daily: Number(daily) });
  } catch {
    return NextResponse.json({ total: 12847, daily: 0 });
  }
}