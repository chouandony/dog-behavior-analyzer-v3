import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

// 相容 Vercel KV 市集（STORAGE_KV_*）與自行申請 Upstash（KV_*）兩種環境變數
// 惰性初始化：未設定環境變數時回傳 null，本地開發或未接資料庫也不會報錯
function getRedis(): Redis | null {
  const url = process.env.STORAGE_KV_REST_API_URL || process.env.KV_REST_API_URL || "";
  const token = process.env.STORAGE_KV_REST_API_TOKEN || process.env.KV_REST_API_TOKEN || "";
  if (!url || !token) return null;
  return new Redis({ url, token });
}

const TOTAL_KEY = "bcg:visitors:total";
const DAILY_PREFIX = "bcg:visitors:daily";

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

async function readCounts(redis: Redis) {
  const today = todayKey();
  const total = Number(await redis.get(TOTAL_KEY) || 0);
  const daily = Number(await redis.get(`${DAILY_PREFIX}:${today}`) || 0);
  return { total, daily };
}

export async function GET() {
  try {
    const redis = getRedis();
    if (!redis) return NextResponse.json({ total: 0, daily: 0 });
    return NextResponse.json(await readCounts(redis));
  } catch {
    return NextResponse.json({ total: 0, daily: 0 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const redis = getRedis();
    if (!redis) return NextResponse.json({ total: 0, daily: 0 });
    const { isNewVisitor } = await req.json().catch(() => ({ isNewVisitor: false }));
    if (isNewVisitor) {
      const today = todayKey();
      const total = Number(await redis.incr(TOTAL_KEY));
      const daily = Number(await redis.incr(`${DAILY_PREFIX}:${today}`));
      return NextResponse.json({ total, daily });
    }
    return NextResponse.json(await readCounts(redis));
  } catch {
    return NextResponse.json({ total: 0, daily: 0 });
  }
}
