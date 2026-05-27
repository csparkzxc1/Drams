"use client";

import { useState } from "react";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { IMAGES } from "@/lib/images";
import HeroHeader from "@/components/HeroHeader";
import type { BottleStatus } from "@/lib/types";
import BottleTile from "@/components/BottleTile";

const filters: { key: "all" | BottleStatus; labelKey: string }[] = [
  { key: "all", labelKey: "all" },
  { key: "owned", labelKey: "owned" },
  { key: "tasted", labelKey: "tasted" },
  { key: "wishlist", labelKey: "wishlist" },
];

export default function CellarPage() {
  const { data } = useStore();
  const { t } = useI18n();
  const [filter, setFilter] = useState<"all" | BottleStatus>("all");

  const filtered =
    filter === "all"
      ? data.bottles
      : data.bottles.filter((b) => b.status === filter);

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const counts = {
    all: data.bottles.length,
    owned: data.bottles.filter((b) => b.status === "owned").length,
    tasted: data.bottles.filter((b) => b.status === "tasted").length,
    wishlist: data.bottles.filter((b) => b.status === "wishlist").length,
  };

  return (
    <div className="pt-safe">
      <HeroHeader
        src={IMAGES.cellarBottles}
        title="Cellar"
        subtitle={data.bottles.length > 0 ? `${data.bottles.length} bottles` : undefined}
        height="h-36"
      />

      <div className="px-4">
        <div className="flex gap-2 py-4 overflow-x-auto">
          {filters.map(({ key, labelKey }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-mono tracking-[0.15em] uppercase whitespace-nowrap transition-colors ${
                filter === key
                  ? "bg-gold text-ink"
                  : "text-ash border border-border"
              }`}
            >
              {t(labelKey)} {counts[key] > 0 ? counts[key] : ""}
            </button>
          ))}
        </div>

        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-20 text-center">
            <p className="text-ash-soft text-sm mb-1">{t("no_bottles")}</p>
            <p className="text-ash-soft text-xs">
              {filter === "all"
                ? "노트를 기록하면 자동으로 추가됩니다"
                : `${t(filter)} 보틀이 없습니다`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 pb-4">
            {sorted.map((bottle) => (
              <BottleTile key={bottle.id} bottle={bottle} />
            ))}
          </div>
        )}
      </div>

      <Link
        href="/cellar/new"
        className="fixed right-5 bottom-20 z-40 flex items-center justify-center rounded-full shadow-lg active:scale-95 transition-transform"
        style={{
          background: "linear-gradient(135deg, #D4A056, #C9842B)",
          width: 52,
          height: 52,
        }}
      >
        <IconPlus size={22} stroke={2} className="text-ink" />
      </Link>
    </div>
  );
}
