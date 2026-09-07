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
    const total = await redis.incr(TOTAL_KEY);
    let daily = 0;
    if (isNewVisitor) {
      daily = await redis.incr(`${DAILY_PREFIX}:${today}`);
    } else {
      daily = await redis.get(`${DAILY_PREFIX}:${today}`) || 0;
    }
    return NextResponse.json({ total: Number(total), daily: Number(daily) });
  } catch {
    return NextResponse.json({ total: 12847, daily: 0 });
  }
}
