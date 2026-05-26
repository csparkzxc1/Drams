"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { IconChevronLeft, IconTrash } from "@tabler/icons-react";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";

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
        <p className="text-ash-soft text-sm text-center pt-24">
          Entry not found
        </p>
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
    <div className="px-4 pt-safe pb-20">
      <header className="flex items-center justify-between py-4">
        <Link href="/entries" className="text-ash p-1">
          <IconChevronLeft size={20} stroke={1.5} />
        </Link>
        <p className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-ash">
          entry no. {String(entry.serialNumber).padStart(3, "0")}
        </p>
        <button
          onClick={handleDelete}
          className={`p-1 transition-colors ${
            confirmDelete ? "text-red-400" : "text-ash"
          }`}
        >
          <IconTrash size={18} stroke={1.5} />
        </button>
      </header>

      {confirmDelete && (
        <div className="bg-oxblood/30 border border-oxblood/50 rounded-lg p-3 mb-4 flex items-center justify-between">
          <span className="text-cream text-xs">정말 삭제하시겠습니까?</span>
          <div className="flex gap-2">
            <button
              onClick={() => setConfirmDelete(false)}
              className="px-3 py-1 rounded text-xs text-ash bg-cask border border-border"
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

      <Link href={bottle ? `/cellar/${bottle.id}` : "#"}>
        <h1 className="font-serif text-2xl text-cream mb-1">
          {bottle?.name ?? "Unknown"}
        </h1>
        {bottle && (
          <p className="text-ash text-sm mb-6">
            {bottle.distillery}
            {bottle.age ? ` · ${bottle.age}yr` : ""} · {bottle.abv}%
          </p>
        )}
      </Link>

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
          <section className="bg-cask rounded-lg p-4 border border-border-soft">
            <h2 className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-gold mb-2">
              nose
            </h2>
            <p className="text-cream-soft text-sm leading-relaxed">{entry.nose}</p>
          </section>
        )}
        {entry.palate && (
          <section className="bg-cask rounded-lg p-4 border border-border-soft">
            <h2 className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-gold mb-2">
              palate
            </h2>
            <p className="text-cream-soft text-sm leading-relaxed">{entry.palate}</p>
          </section>
        )}
        {entry.finish && (
          <section className="bg-cask rounded-lg p-4 border border-border-soft">
            <h2 className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-gold mb-2">
              finish
            </h2>
            <p className="text-cream-soft text-sm leading-relaxed">{entry.finish}</p>
          </section>
        )}
      </div>

      {entry.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded bg-amber/10 text-amber text-[11px] font-mono tracking-mono-tight"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-border-soft space-y-1">
        <p className="text-ash-soft text-[10px] font-mono tracking-mono-tight">
          {new Date(entry.tastedAt).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {entry.servingStyle !== "other" && ` · ${entry.servingStyle}`}
        </p>
        {entry.location && (
          <p className="text-ash-soft text-[10px] font-mono tracking-mono-tight">
            {entry.location}
          </p>
        )}
        {entry.companions && (
          <p className="text-ash-soft text-[10px] font-mono tracking-mono-tight">
            with {entry.companions}
          </p>
        )}
      </div>
    </div>
  );
}
