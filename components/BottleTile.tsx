"use client";

import Link from "next/link";
import type { Bottle } from "@/lib/types";

const statusLabel: Record<string, string> = {
  owned: "owned",
  tasted: "tasted",
  wishlist: "wish",
};

export default function BottleTile({ bottle }: { bottle: Bottle }) {
  return (
    <Link
      href={`/cellar/${bottle.id}`}
      className="card p-3.5 flex flex-col active:border-gold/30 transition-colors"
    >
      <p className="font-serif text-base text-cream leading-snug line-clamp-2 mb-1">
        {bottle.name}
      </p>
      <p className="text-ash text-[10px] mb-3">{bottle.distillery}</p>

      <div className="mt-auto flex items-center justify-between">
        <span className="font-mono text-[9px] tracking-mono-tight text-ash-soft">
          {bottle.abv}%
        </span>
        <span className="text-[7px] font-mono tracking-[0.2em] uppercase px-1.5 py-0.5 rounded border border-gold/15 text-gold/60">
          {statusLabel[bottle.status]}
        </span>
      </div>
    </Link>
  );
}
