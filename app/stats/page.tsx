"use client";

import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import {
  totalEntries,
  totalBottles,
  averageRating,
  regionDistribution,
} from "@/lib/stats";
import StatCard from "@/components/StatCard";

export default function StatsPage() {
  const { data } = useStore();
  const { t } = useI18n();

  const entries = totalEntries(data.entries);
  const bottles = totalBottles(data.bottles);
  const avgRating = averageRating(data.entries);
  const regions = regionDistribution(data.bottles);
  const maxRegionCount = regions[0]?.count ?? 1;

  return (
    <div className="px-4 pt-safe">
      <header className="py-4">
        <h1 className="font-mono text-xs tracking-mono-eyebrow lowercase text-ash">
          {t("stats")}
        </h1>
      </header>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <StatCard label={t("total_entries")} value={entries} />
        <StatCard label={t("total_bottles")} value={bottles} />
        <StatCard
          label={t("avg_rating")}
          value={avgRating !== null ? avgRating.toFixed(1) : "—"}
        />
      </div>

      <section>
        <h2 className="font-mono text-xs tracking-mono-eyebrow lowercase text-ash mb-4">
          {t("region_distribution")}
        </h2>

        {regions.length === 0 ? (
          <p className="text-ash-soft text-sm text-center py-8">
            {t("no_bottles")}
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {regions.map(({ region, count }) => (
              <div key={region}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-cream text-sm">{region}</span>
                  <span className="font-serif text-amber text-lg">
                    {count}
                  </span>
                </div>
                <div className="h-1.5 bg-cask rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber rounded-full transition-all"
                    style={{ width: `${(count / maxRegionCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
