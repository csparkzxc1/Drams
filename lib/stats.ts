import type { Bottle, Entry, Region } from "./types";

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

export function uniqueDistilleries(bottles: Bottle[]): number {
  return new Set(bottles.map((b) => b.distillery)).size;
}
