"use client";

import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";

export default function EntryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getEntry, getBottle } = useStore();
  const entry = getEntry(id);
  const bottle = entry ? getBottle(entry.bottleId) : undefined;

  if (!entry) {
    return (
      <div className="px-4 pt-safe">
        <p className="text-ash-soft text-sm text-center pt-24">
          Entry not found
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 pt-safe">
      <header className="py-4">
        <p className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-ash">
          entry no. {String(entry.serialNumber).padStart(3, "0")}
        </p>
      </header>

      <h1 className="font-serif text-2xl text-cream mb-1">
        {bottle?.name ?? "Unknown"}
      </h1>
      {bottle && (
        <p className="text-ash text-sm mb-6">
          {bottle.distillery}
          {bottle.age ? ` · ${bottle.age}yr` : ""} · {bottle.abv}%
        </p>
      )}

      <div className="flex items-center gap-2 mb-6">
        <span className="font-serif text-4xl text-amber">
          {entry.rating.toFixed(1)}
        </span>
        <span className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-ash">
          rating
        </span>
      </div>

      <div className="space-y-4">
        {entry.nose && (
          <section>
            <h2 className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-gold mb-1">
              nose
            </h2>
            <p className="text-cream-soft text-sm">{entry.nose}</p>
          </section>
        )}
        {entry.palate && (
          <section>
            <h2 className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-gold mb-1">
              palate
            </h2>
            <p className="text-cream-soft text-sm">{entry.palate}</p>
          </section>
        )}
        {entry.finish && (
          <section>
            <h2 className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-gold mb-1">
              finish
            </h2>
            <p className="text-cream-soft text-sm">{entry.finish}</p>
          </section>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-border-soft">
        <p className="text-ash-soft text-[10px] font-mono tracking-mono-tight">
          {new Date(entry.tastedAt).toLocaleDateString("ko-KR")}
          {entry.servingStyle !== "other" && ` · ${entry.servingStyle}`}
          {entry.location && ` · ${entry.location}`}
        </p>
      </div>
    </div>
  );
}
