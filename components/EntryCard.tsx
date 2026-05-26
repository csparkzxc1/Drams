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
      className="block bg-cask rounded-lg p-4 border border-border-soft active:border-border transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-ash mb-1">
            entry no. {String(entry.serialNumber).padStart(3, "0")}
          </p>
          <h3 className="font-serif text-lg text-cream truncate">
            {bottle?.name ?? "Unknown"}
          </h3>
          {bottle && (
            <p className="text-ash text-xs mt-0.5">
              {bottle.distillery}
              {bottle.age ? ` · ${bottle.age}yr` : ""}
            </p>
          )}
        </div>
        <div className="text-right shrink-0">
          <p className="font-serif text-2xl text-amber leading-none">
            {entry.rating.toFixed(1)}
          </p>
        </div>
      </div>

      {entry.nose && (
        <p className="text-cream-soft text-xs mt-3 line-clamp-2">
          {entry.nose}
        </p>
      )}

      <p className="text-ash-soft text-[10px] font-mono tracking-mono-tight mt-3">
        {new Date(entry.tastedAt).toLocaleDateString("ko-KR")}
        {entry.servingStyle !== "other" && ` · ${entry.servingStyle}`}
      </p>
    </Link>
  );
}
