"use client";

import { useState, useRef, useEffect } from "react";
import { IconSearch } from "@tabler/icons-react";
import { useStore } from "@/lib/store";
import { searchWhiskies, type SeedWhisky } from "@/lib/search";
import { WHISKY_SEED } from "@/lib/whiskies.seed";
import { useI18n } from "@/lib/i18n";

type Props = {
  onSelect: (whisky: SeedWhisky) => void;
  placeholder?: string;
};

export default function WhiskySearch({ onSelect, placeholder }: Props) {
  const { data } = useStore();
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SeedWhisky[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 1) {
      setResults([]);
      setOpen(false);
      return;
    }
    const r = searchWhiskies(query, WHISKY_SEED, data.bottles);
    setResults(r);
    setOpen(r.length > 0);
  }, [query, data.bottles]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <IconSearch
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-ash-soft"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder ?? t("search")}
          className="w-full bg-ink border border-border rounded-lg pl-9 pr-3 py-2.5 text-cream text-sm placeholder:text-ash-soft focus:outline-none focus:border-amber/50 transition-colors"
        />
      </div>

      {open && (
        <div className="absolute z-50 inset-x-0 top-full mt-1 bg-cask border border-border rounded-lg max-h-64 overflow-y-auto shadow-lg">
          {results.map((w, i) => (
            <button
              key={`${w.name}-${i}`}
              type="button"
              onClick={() => {
                onSelect(w);
                setQuery("");
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 hover:bg-ink/50 active:bg-ink/70 transition-colors border-b border-border-soft last:border-0"
            >
              <p className="font-serif text-sm text-cream">{w.name}</p>
              <p className="text-ash text-[11px] mt-0.5">
                {w.distillery} · {w.region}
                {w.age ? ` · ${w.age}yr` : ""} · {w.abv}%
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
