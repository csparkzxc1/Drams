import type { Bottle } from "./types";

export type SeedWhisky = Omit<Bottle, "id" | "status" | "createdAt" | "updatedAt">;

export function searchWhiskies(
  query: string,
  seed: SeedWhisky[],
  userBottles: Bottle[],
  limit = 20
): SeedWhisky[] {
  if (!query.trim()) return [];

  const q = query.toLowerCase();
  const seen = new Set<string>();
  const results: SeedWhisky[] = [];

  for (const b of userBottles) {
    if (results.length >= limit) break;
    const key = b.name.toLowerCase();
    if (key.includes(q) && !seen.has(key)) {
      seen.add(key);
      results.push(b);
    }
  }

  for (const s of seed) {
    if (results.length >= limit) break;
    const key = s.name.toLowerCase();
    if ((key.includes(q) || s.distillery.toLowerCase().includes(q)) && !seen.has(key)) {
      seen.add(key);
      results.push(s);
    }
  }

  return results;
}
