"use client";

import { useState } from "react";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
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

  return (
    <div className="px-4 pt-safe">
      <header className="py-4">
        <h1 className="font-mono text-xs tracking-mono-eyebrow lowercase text-ash">
          {t("cellar")}
        </h1>
      </header>

      <div className="flex gap-2 mb-4 overflow-x-auto">
        {filters.map(({ key, labelKey }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-mono-tight lowercase whitespace-nowrap transition-colors ${
              filter === key
                ? "bg-amber text-ink"
                : "bg-cask text-ash border border-border"
            }`}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>

      {sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center pt-24 text-center">
          <p className="text-ash-soft text-sm">{t("no_bottles")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 pb-4">
          {sorted.map((bottle) => (
            <BottleTile key={bottle.id} bottle={bottle} />
          ))}
        </div>
      )}

      <Link
        href="/cellar/new"
        className="fixed right-4 bottom-20 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-amber text-ink shadow-lg active:scale-95 transition-transform"
      >
        <IconPlus size={24} stroke={2} />
      </Link>
    </div>
  );
}
