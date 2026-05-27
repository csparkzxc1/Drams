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
      <header className="flex items-center justify-between py-5">
        <div>
          <h1 className="font-serif text-2xl text-cream">Drams</h1>
        </div>
        {sorted.length > 0 && (
          <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-ash-soft">
            {sorted.length} entries
          </p>
        )}
      </header>

      {sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center pt-28 text-center">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mb-4 opacity-30">
            <path d="M20 4L23.5 14.5H34L25.5 21L28.5 32L20 25L11.5 32L14.5 21L6 14.5H16.5L20 4Z" stroke="#D4A056" strokeWidth="0.75"/>
          </svg>
          <p className="text-ash text-sm mb-1">{t("no_entries")}</p>
          <p className="text-ash-soft text-xs">{t("log_first_dram")}</p>
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
        className="fixed right-5 bottom-20 z-40 flex items-center justify-center w-13 h-13 rounded-full shadow-lg active:scale-95 transition-transform"
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
