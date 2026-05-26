"use client";

import Link from "next/link";
import type { Bottle } from "@/lib/types";

const statusBadge: Record<string, string> = {
  owned: "bg-amber/15 text-amber",
  tasted: "bg-gold/15 text-gold",
  wishlist: "bg-oxblood/30 text-cream-soft",
};

export default function BottleTile({ bottle }: { bottle: Bottle }) {
  return (
    <Link
      href={`/cellar/${bottle.id}`}
      className="bg-cask rounded-lg p-3 border border-border-soft active:border-border transition-colors flex flex-col"
    >
      <p className="font-serif text-base text-cream leading-snug line-clamp-2 mb-1">
        {bottle.name}
      </p>
      <p className="text-ash text-[11px] mb-2">{bottle.distillery}</p>

      <div className="mt-auto flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-mono-tight text-ash-soft">
          {bottle.abv}% abv
        </span>
        <span
          className={`text-[9px] font-mono tracking-mono-eyebrow lowercase px-1.5 py-0.5 rounded ${
            statusBadge[bottle.status]
          }`}
        >
          {bottle.status}
        </span>
      </div>
    </Link>
  );
}
