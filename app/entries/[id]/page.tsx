"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { IconChevronLeft, IconTrash } from "@tabler/icons-react";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { IMAGES } from "@/lib/images";
import HeroHeader from "@/components/HeroHeader";

export default function EntryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { getEntry, getBottle, deleteEntry } = useStore();
  const { t } = useI18n();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const entry = getEntry(id);
  const bottle = entry ? getBottle(entry.bottleId) : undefined;

  if (!entry) {
    return (
      <div className="px-4 pt-safe">
        <header className="flex items-center gap-2 py-4">
          <Link href="/entries" className="text-ash p-1">
            <IconChevronLeft size={20} stroke={1.5} />
          </Link>
        </header>
        <p className="text-ash-soft text-sm text-center pt-24">Entry not found</p>
      </div>
    );
  }

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    deleteEntry(entry.id);
    router.push("/entries");
  };

  return (
    <div className="pt-safe pb-20">
      <HeroHeader
        src={IMAGES.tastingDark}
        title={bottle?.name ?? "Unknown"}
        subtitle={bottle ? `${bottle.distillery}${bottle.age ? ` · ${bottle.age}yr` : ""} · ${bottle.abv}%` : undefined}
        height="h-48"
      >
        <div className="flex gap-2">
          <Link href="/entries" className="text-cream-soft p-1">
            <IconChevronLeft size={20} stroke={1.5} />
          </Link>
        </div>
      </HeroHeader>

      <div className="px-4 pt-2">
        {/* Entry no & actions */}
        <div className="flex items-center justify-between mb-4">
          <p className="font-mono text-[8px] tracking-[0.25em] uppercase text-ash-soft">
            entry no. {String(entry.serialNumber).padStart(3, "0")}
          </p>
          <button
            onClick={handleDelete}
            className={`p-1 transition-colors ${confirmDelete ? "text-red-400" : "text-ash-soft"}`}
          >
            <IconTrash size={16} stroke={1.5} />
          </button>
        </div>

        {confirmDelete && (
          <div className="bg-oxblood/20 border border-oxblood/30 rounded-lg p-3 mb-4 flex items-center justify-between">
            <span className="text-cream text-xs">정말 삭제하시겠습니까?</span>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-3 py-1 rounded text-xs text-ash border border-border"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 rounded text-xs text-cream bg-oxblood"
              >
                {t("delete")}
              </button>
            </div>
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-serif text-5xl gold-text font-semibold leading-none">
            {entry.rating.toFixed(1)}
          </span>
          <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-ash-soft">
            rating
          </span>
        </div>

        {/* Tasting notes */}
        <div className="space-y-4">
          {entry.nose && (
            <section className="card p-4">
              <h2 className="font-mono text-[8px] tracking-[0.25em] uppercase text-gold mb-2">
                nose
              </h2>
              <p className="text-cream-soft text-sm leading-relaxed">{entry.nose}</p>
            </section>
          )}
          {entry.palate && (
            <section className="card p-4">
              <h2 className="font-mono text-[8px] tracking-[0.25em] uppercase text-gold mb-2">
                palate
              </h2>
              <p className="text-cream-soft text-sm leading-relaxed">{entry.palate}</p>
            </section>
          )}
          {entry.finish && (
            <section className="card p-4">
              <h2 className="font-mono text-[8px] tracking-[0.25em] uppercase text-gold mb-2">
                finish
              </h2>
              <p className="text-cream-soft text-sm leading-relaxed">{entry.finish}</p>
            </section>
          )}
        </div>

        {entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[10px] font-mono tracking-mono-tight bg-gold/10 text-gold/70"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="divider-gold my-5" />

        <div className="space-y-1.5">
          <p className="text-ash-soft text-[9px] font-mono tracking-[0.15em] uppercase">
            {new Date(entry.tastedAt).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {entry.servingStyle !== "other" && ` · ${entry.servingStyle}`}
          </p>
          {entry.location && (
            <p className="text-ash-soft text-[9px] font-mono tracking-[0.15em]">
              {entry.location}
            </p>
          )}
          {entry.companions && (
            <p className="text-ash-soft text-[9px] font-mono tracking-[0.15em]">
              with {entry.companions}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
