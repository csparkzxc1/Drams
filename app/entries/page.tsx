"use client";

import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { IMAGES } from "@/lib/images";
import HeroHeader from "@/components/HeroHeader";
import EntryCard from "@/components/EntryCard";

export default function EntriesPage() {
  const { data } = useStore();
  const { t } = useI18n();

  const sorted = [...data.entries].sort(
    (a, b) => new Date(b.tastedAt).getTime() - new Date(a.tastedAt).getTime()
  );

  return (
    <div className="pt-safe">
      <HeroHeader
        src={IMAGES.heroGlass}
        title="Drams"
        subtitle={sorted.length > 0 ? `${sorted.length} tasting notes` : undefined}
      />

      <div className="px-4">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-20 text-center">
            <p className="text-ash text-sm mb-1">{t("no_entries")}</p>
            <p className="text-ash-soft text-xs">{t("log_first_dram")}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 pt-4 pb-4">
            {sorted.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </div>

      <Link
        href="/entries/new"
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
