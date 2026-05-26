"use client";

import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import {
  totalEntries,
  totalBottles,
  averageRating,
  regionDistribution,
  typeDistribution,
  uniqueDistilleries,
  topDistilleries,
  servingStyleDistribution,
  ratingDistribution,
  topTags,
  monthlyActivity,
  averageAbv,
  caskStrengthCount,
  highestRatedEntry,
  lowestRatedEntry,
} from "@/lib/stats";
import StatCard from "@/components/StatCard";
import Link from "next/link";

const SERVING_LABELS: Record<string, string> = {
  neat: "Neat",
  rocks: "On the rocks",
  water: "With water",
  highball: "Highball",
  other: "Other",
};

export default function StatsPage() {
  const { data } = useStore();
  const { t } = useI18n();

  const entries = totalEntries(data.entries);
  const bottles = totalBottles(data.bottles);
  const avgRating = averageRating(data.entries);
  const distilleries = uniqueDistilleries(data.bottles);
  const regions = regionDistribution(data.bottles);
  const types = typeDistribution(data.bottles);
  const topDist = topDistilleries(data.entries, data.bottles);
  const servings = servingStyleDistribution(data.entries);
  const ratings = ratingDistribution(data.entries);
  const tags = topTags(data.entries);
  const monthly = monthlyActivity(data.entries);
  const avgAbv = averageAbv(data.bottles);
  const csCount = caskStrengthCount(data.bottles);
  const best = highestRatedEntry(data.entries, data.bottles);
  const worst = lowestRatedEntry(data.entries, data.bottles);

  const maxRegionCount = regions[0]?.count ?? 1;
  const maxTypeCount = types[0]?.count ?? 1;
  const maxMonthlyCount = monthly.length > 0 ? Math.max(...monthly.map((m) => m.count)) : 1;
  const maxTagCount = tags[0]?.count ?? 1;

  const isEmpty = entries === 0 && bottles === 0;

  if (isEmpty) {
    return (
      <div className="px-4 pt-safe">
        <header className="py-4">
          <h1 className="font-mono text-xs tracking-mono-eyebrow lowercase text-ash">
            {t("stats")}
          </h1>
        </header>
        <div className="flex flex-col items-center justify-center pt-32 text-center">
          <p className="text-ash-soft text-sm mb-1">{t("no_entries")}</p>
          <p className="text-ash text-xs">{t("log_first_dram")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-safe pb-20">
      <header className="py-4">
        <h1 className="font-mono text-xs tracking-mono-eyebrow lowercase text-ash">
          {t("stats")}
        </h1>
      </header>

      {/* === 핵심 숫자 === */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatCard label={t("total_entries")} value={entries} />
        <StatCard label={t("total_bottles")} value={bottles} />
        <StatCard
          label={t("avg_rating")}
          value={avgRating !== null ? avgRating.toFixed(1) : "—"}
        />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <StatCard label="증류소" value={distilleries} />
        <StatCard
          label="평균 abv"
          value={avgAbv !== null ? `${avgAbv}%` : "—"}
        />
        <StatCard label="cask strength" value={csCount} />
      </div>

      {/* === 최고 / 최저 === */}
      {best && worst && best.entry.id !== worst.entry.id && (
        <div className="grid grid-cols-2 gap-3 mb-8">
          <Link
            href={`/entries/${best.entry.id}`}
            className="bg-cask rounded-lg p-3 border border-border-soft"
          >
            <p className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-gold mb-1.5">
              최고 평점
            </p>
            <p className="font-serif text-2xl text-amber mb-1">
              {best.entry.rating.toFixed(1)}
            </p>
            <p className="text-cream text-xs truncate">
              {best.bottle?.name ?? "—"}
            </p>
          </Link>
          <Link
            href={`/entries/${worst.entry.id}`}
            className="bg-cask rounded-lg p-3 border border-border-soft"
          >
            <p className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-ash mb-1.5">
              최저 평점
            </p>
            <p className="font-serif text-2xl text-cream-soft mb-1">
              {worst.entry.rating.toFixed(1)}
            </p>
            <p className="text-cream text-xs truncate">
              {worst.bottle?.name ?? "—"}
            </p>
          </Link>
        </div>
      )}

      {/* === 평점 분포 === */}
      {ratings.length > 0 && (
        <Section title="평점 분포">
          <div className="flex items-end gap-2 h-24">
            {ratings.map(({ rating, count }) => {
              const maxRatingCount = Math.max(...ratings.map((r) => r.count));
              const h = maxRatingCount > 0 ? (count / maxRatingCount) * 100 : 0;
              return (
                <div key={rating} className="flex-1 flex flex-col items-center gap-1">
                  <span className="font-mono text-[9px] text-amber">
                    {count}
                  </span>
                  <div
                    className="w-full bg-amber/80 rounded-t transition-all"
                    style={{ height: `${Math.max(h, 4)}%` }}
                  />
                  <span className="font-mono text-[9px] text-ash-soft">
                    {rating}
                  </span>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {/* === 월별 활동 === */}
      {monthly.length > 1 && (
        <Section title="월별 활동">
          <div className="flex items-end gap-1 h-20 overflow-x-auto">
            {monthly.map(({ month, count }) => {
              const h = (count / maxMonthlyCount) * 100;
              const label = month.slice(5);
              return (
                <div
                  key={month}
                  className="flex flex-col items-center gap-1 min-w-[28px]"
                >
                  <span className="font-mono text-[9px] text-amber">
                    {count}
                  </span>
                  <div
                    className="w-5 bg-gold/70 rounded-t transition-all"
                    style={{ height: `${Math.max(h, 6)}%` }}
                  />
                  <span className="font-mono text-[8px] text-ash-soft">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {/* === 지역 분포 === */}
      {regions.length > 0 && (
        <Section title={t("region_distribution")}>
          <div className="flex flex-col gap-2.5">
            {regions.map(({ region, count }) => (
              <div key={region}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="text-cream text-sm">{region}</span>
                  <span className="font-serif text-amber text-base">
                    {count}
                  </span>
                </div>
                <div className="h-1.5 bg-ink rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber rounded-full transition-all"
                    style={{ width: `${(count / maxRegionCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* === 유형 분포 === */}
      {types.length > 0 && (
        <Section title="유형 분포">
          <div className="flex flex-col gap-2.5">
            {types.map(({ type, count }) => (
              <div key={type}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="text-cream text-sm">{type}</span>
                  <span className="font-serif text-gold text-base">
                    {count}
                  </span>
                </div>
                <div className="h-1.5 bg-ink rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold rounded-full transition-all"
                    style={{ width: `${(count / maxTypeCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* === 자주 마시는 증류소 === */}
      {topDist.length > 0 && (
        <Section title="자주 마시는 증류소">
          <div className="space-y-3">
            {topDist.map(({ distillery, count, avgRating: avg }, i) => (
              <div
                key={distillery}
                className="flex items-center gap-3"
              >
                <span className="font-serif text-lg text-amber w-6 text-center">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-cream text-sm truncate">{distillery}</p>
                  <p className="font-mono text-[10px] tracking-mono-tight text-ash-soft">
                    {count}회 · avg {avg.toFixed(1)}
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="font-serif text-base text-gold">
                    {avg.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* === 서빙 스타일 === */}
      {servings.length > 0 && (
        <Section title="서빙 스타일">
          <div className="flex flex-wrap gap-2">
            {servings.map(({ style, count }) => {
              const total = data.entries.length;
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div
                  key={style}
                  className="bg-ink rounded-lg px-3 py-2 border border-border-soft"
                >
                  <p className="text-cream text-sm">
                    {SERVING_LABELS[style] ?? style}
                  </p>
                  <p className="font-mono text-[10px] tracking-mono-tight text-ash-soft">
                    {count}회 · {pct}%
                  </p>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {/* === 자주 쓰는 태그 === */}
      {tags.length > 0 && (
        <Section title="자주 쓰는 태그">
          <div className="flex flex-wrap gap-1.5">
            {tags.map(({ tag, count }) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono tracking-mono-tight"
                style={{
                  backgroundColor: `rgba(201, 132, 43, ${0.1 + (count / maxTagCount) * 0.25})`,
                  color: `rgba(201, 132, 43, ${0.5 + (count / maxTagCount) * 0.5})`,
                }}
              >
                {tag}
                <span className="text-[9px] opacity-60">{count}</span>
              </span>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-ash mb-3">
        {title}
      </h2>
      <div className="bg-cask rounded-lg p-4 border border-border-soft">
        {children}
      </div>
    </section>
  );
}
