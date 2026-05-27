"use client";

import Link from "next/link";
import type { Entry } from "@/lib/types";
import { useStore } from "@/lib/store";

export default function EntryCard({ entry }: { entry: Entry }) {
  const { getBottle } = useStore();
  const bottle = getBottle(entry.bottleId);

  return (
    <Link
      href={`/entries/${entry.id}`}
      className="block card p-4 active:border-gold/30 transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[8px] tracking-[0.25em] uppercase text-ash-soft mb-1.5">
            entry no. {String(entry.serialNumber).padStart(3, "0")}
          </p>
          <h3 className="font-serif text-xl text-cream truncate leading-tight">
            {bottle?.name ?? "Unknown"}
          </h3>
          {bottle && (
            <p className="text-ash text-[11px] mt-1">
              {bottle.distillery}
              {bottle.age ? ` · ${bottle.age}yr` : ""}
              {` · ${bottle.abv}%`}
            </p>
          )}
        </div>
        <div className="text-right shrink-0 pt-4">
          <p className="font-serif text-3xl gold-text leading-none font-semibold">
            {entry.rating.toFixed(1)}
          </p>
        </div>
      </div>

      {entry.nose && (
        <p className="text-cream-soft text-xs mt-3 line-clamp-2 leading-relaxed">
          {entry.nose}
        </p>
      )}

      {entry.tags.length > 0 && (
        <div className="flex gap-1.5 mt-3 overflow-hidden">
          {entry.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 rounded text-[9px] font-mono tracking-mono-tight bg-gold/8 text-gold/70"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="divider-gold mt-3 mb-2" />

      <p className="text-ash-soft text-[9px] font-mono tracking-[0.15em] uppercase">
        {new Date(entry.tastedAt).toLocaleDateString("ko-KR")}
        {entry.servingStyle !== "other" && ` · ${entry.servingStyle}`}
      </p>
    </Link>
  );
}
