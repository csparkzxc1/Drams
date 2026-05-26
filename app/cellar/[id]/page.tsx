"use client";

import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";

export default function BottleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getBottle, data } = useStore();
  const bottle = getBottle(id);
  const relatedEntries = data.entries
    .filter((e) => e.bottleId === id)
    .sort((a, b) => new Date(b.tastedAt).getTime() - new Date(a.tastedAt).getTime());

  if (!bottle) {
    return (
      <div className="px-4 pt-safe">
        <p className="text-ash-soft text-sm text-center pt-24">
          Bottle not found
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 pt-safe">
      <header className="py-4">
        <p className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-ash">
          {bottle.region} · {bottle.type}
        </p>
      </header>

      <h1 className="font-serif text-2xl text-cream mb-1">{bottle.name}</h1>
      <p className="text-ash text-sm mb-4">
        {bottle.distillery}
        {bottle.age ? ` · ${bottle.age}yr` : " · NAS"} · {bottle.abv}% abv
        {bottle.caskStrength && " · cask strength"}
      </p>

      <div className="flex gap-2 mb-6">
        <span className="font-mono text-[9px] tracking-mono-eyebrow lowercase px-2 py-0.5 rounded bg-amber/15 text-amber">
          {bottle.status}
        </span>
      </div>

      <section>
        <h2 className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-gold mb-3">
          tasting notes ({relatedEntries.length})
        </h2>

        {relatedEntries.length === 0 ? (
          <p className="text-ash-soft text-sm">No tasting notes yet</p>
        ) : (
          <div className="space-y-3">
            {relatedEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-cask rounded-lg p-3 border border-border-soft"
              >
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-ash">
                    entry no. {String(entry.serialNumber).padStart(3, "0")}
                  </span>
                  <span className="font-serif text-lg text-amber">
                    {entry.rating.toFixed(1)}
                  </span>
                </div>
                {entry.nose && (
                  <p className="text-cream-soft text-xs line-clamp-1">
                    {entry.nose}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
