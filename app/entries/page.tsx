"use client";

import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import EntryCard from "@/components/EntryCard";

export default function EntriesPage() {
  const { data } = useStore();
  const { t } = useI18n();

  const sorted = [...data.entries].sort(
    (a, b) => new Date(b.tastedAt).getTime() - new Date(a.tastedAt).getTime()
  );

  return (
    <div className="px-4 pt-safe">
      <header className="flex items-center justify-between py-4">
        <h1 className="font-mono text-xs tracking-mono-eyebrow lowercase text-ash">
          {t("entries")}
        </h1>
      </header>

      {sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center pt-32 text-center">
          <p className="text-ash-soft text-sm mb-1">{t("no_entries")}</p>
          <p className="text-ash text-xs">{t("log_first_dram")}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 pb-4">
          {sorted.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}

      <Link
        href="/entries/new"
        className="fixed right-4 bottom-20 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-amber text-ink shadow-lg active:scale-95 transition-transform"
      >
        <IconPlus size={24} stroke={2} />
      </Link>
    </div>
  );
}
