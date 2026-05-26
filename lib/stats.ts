import type { Bottle, Entry, Region, WhiskyType, ServingStyle } from "./types";

export function totalEntries(entries: Entry[]): number {
  return entries.length;
}

export function totalBottles(bottles: Bottle[]): number {
  return bottles.length;
}

export function averageRating(entries: Entry[]): number | null {
  if (entries.length === 0) return null;
  const sum = entries.reduce((acc, e) => acc + e.rating, 0);
  return Math.round((sum / entries.length) * 10) / 10;
}

export function highestRatedEntry(
  entries: Entry[],
  bottles: Bottle[]
): { entry: Entry; bottle: Bottle | undefined } | null {
  if (entries.length === 0) return null;
  const best = entries.reduce((a, b) => (a.rating >= b.rating ? a : b));
  return { entry: best, bottle: bottles.find((b) => b.id === best.bottleId) };
}

export function lowestRatedEntry(
  entries: Entry[],
  bottles: Bottle[]
): { entry: Entry; bottle: Bottle | undefined } | null {
  if (entries.length === 0) return null;
  const worst = entries.reduce((a, b) => (a.rating <= b.rating ? a : b));
  return { entry: worst, bottle: bottles.find((b) => b.id === worst.bottleId) };
}

export function regionDistribution(
  bottles: Bottle[]
): { region: Region; count: number }[] {
  const counts = new Map<Region, number>();
  for (const b of bottles) {
    counts.set(b.region, (counts.get(b.region) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([region, count]) => ({ region, count }))
    .sort((a, b) => b.count - a.count);
}

export function typeDistribution(
  bottles: Bottle[]
): { type: WhiskyType; count: number }[] {
  const counts = new Map<WhiskyType, number>();
  for (const b of bottles) {
    counts.set(b.type, (counts.get(b.type) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);
}

export function uniqueDistilleries(bottles: Bottle[]): number {
  return new Set(bottles.map((b) => b.distillery)).size;
}

export function topDistilleries(
  entries: Entry[],
  bottles: Bottle[],
  limit = 5
): { distillery: string; count: number; avgRating: number }[] {
  const map = new Map<string, { count: number; totalRating: number }>();

  for (const e of entries) {
    const b = bottles.find((bot) => bot.id === e.bottleId);
    if (!b) continue;
    const cur = map.get(b.distillery) ?? { count: 0, totalRating: 0 };
    cur.count += 1;
    cur.totalRating += e.rating;
    map.set(b.distillery, cur);
  }

  return Array.from(map.entries())
    .map(([distillery, { count, totalRating }]) => ({
      distillery,
      count,
      avgRating: Math.round((totalRating / count) * 10) / 10,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function servingStyleDistribution(
  entries: Entry[]
): { style: ServingStyle; count: number }[] {
  const counts = new Map<ServingStyle, number>();
  for (const e of entries) {
    counts.set(e.servingStyle, (counts.get(e.servingStyle) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([style, count]) => ({ style, count }))
    .sort((a, b) => b.count - a.count);
}

export function ratingDistribution(
  entries: Entry[]
): { rating: string; count: number }[] {
  const buckets: Record<string, number> = {
    "0–1": 0, "1–2": 0, "2–3": 0, "3–4": 0, "4–5": 0,
  };
  for (const e of entries) {
    if (e.rating <= 1) buckets["0–1"]++;
    else if (e.rating <= 2) buckets["1–2"]++;
    else if (e.rating <= 3) buckets["2–3"]++;
    else if (e.rating <= 4) buckets["3–4"]++;
    else buckets["4–5"]++;
  }
  return Object.entries(buckets)
    .map(([rating, count]) => ({ rating, count }))
    .filter((r) => r.count > 0);
}

export function topTags(
  entries: Entry[],
  limit = 10
): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const e of entries) {
    for (const tag of e.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function monthlyActivity(
  entries: Entry[]
): { month: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const e of entries) {
    const d = new Date(e.tastedAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

export function averageAbv(bottles: Bottle[]): number | null {
  if (bottles.length === 0) return null;
  const sum = bottles.reduce((acc, b) => acc + b.abv, 0);
  return Math.round((sum / bottles.length) * 10) / 10;
}

export function caskStrengthCount(bottles: Bottle[]): number {
  return bottles.filter((b) => b.caskStrength).length;
}

export function recentStreak(entries: Entry[]): number {
  if (entries.length === 0) return 0;
  const sorted = [...entries].sort(
    (a, b) => new Date(b.tastedAt).getTime() - new Date(a.tastedAt).getTime()
  );
  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1].tastedAt);
    const curr = new Date(sorted[i].tastedAt);
    const diffDays = (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays <= 7) streak++;
    else break;
  }
  return streak;
}
