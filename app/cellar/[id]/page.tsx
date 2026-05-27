"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { IconChevronLeft, IconTrash, IconPlus } from "@tabler/icons-react";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { IMAGES } from "@/lib/images";
import HeroHeader from "@/components/HeroHeader";
import type { BottleStatus } from "@/lib/types";

const STATUSES: { value: BottleStatus; label: string }[] = [
  { value: "owned", label: "보유" },
  { value: "tasted", label: "시음" },
  { value: "wishlist", label: "위시" },
];

export default function BottleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { getBottle, data, updateBottle, deleteBottle } = useStore();
  const { t } = useI18n();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const bottle = getBottle(id);
  const relatedEntries = data.entries
    .filter((e) => e.bottleId === id)
    .sort((a, b) => new Date(b.tastedAt).getTime() - new Date(a.tastedAt).getTime());

  if (!bottle) {
    return (
      <div className="px-4 pt-safe">
        <header className="flex items-center gap-2 py-4">
          <Link href="/cellar" className="text-ash p-1">
            <IconChevronLeft size={20} stroke={1.5} />
          </Link>
        </header>
        <p className="text-ash-soft text-sm text-center pt-24">Bottle not found</p>
      </div>
    );
  }

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    deleteBottle(bottle.id);
    router.push("/cellar");
  };

  const avgRating =
    relatedEntries.length > 0
      ? (relatedEntries.reduce((sum, e) => sum + e.rating, 0) / relatedEntries.length).toFixed(1)
      : null;

  return (
    <div className="pt-safe pb-20">
      <HeroHeader
        src={IMAGES.glassClose}
        title={bottle.name}
        subtitle={`${bottle.distillery}${bottle.age ? ` · ${bottle.age}yr` : " · NAS"} · ${bottle.abv}%`}
        height="h-48"
      >
        <Link href="/cellar" className="text-cream-soft p-1">
          <IconChevronLeft size={20} stroke={1.5} />
        </Link>
      </HeroHeader>

      <div className="px-4 pt-2">
        {/* Meta row */}
        <div className="flex items-center justify-between mb-4">
          <p className="font-mono text-[8px] tracking-[0.25em] uppercase text-ash-soft">
            {bottle.region} · {bottle.type}
            {bottle.caskStrength && " · cask strength"}
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

        {/* Status toggle */}
        <div className="flex gap-2 mb-6">
          {STATUSES.map((s) => (
            <button
              key={s.value}
              onClick={() => updateBottle(bottle.id, { status: s.value })}
              className={`px-3 py-1.5 rounded-full text-[10px] font-mono tracking-[0.15em] uppercase transition-colors ${
                bottle.status === s.value
                  ? "bg-gold text-ink"
                  : "text-ash border border-border"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {bottle.purchasePrice && (
          <p className="text-ash text-xs font-mono tracking-mono-tight mb-2">
            ₩{bottle.purchasePrice.toLocaleString()}
          </p>
        )}

        {bottle.notes && (
          <p className="text-cream-soft text-sm mb-4">{bottle.notes}</p>
        )}

        <div className="divider-gold my-5" />

        {/* Tasting notes */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-mono text-[8px] tracking-[0.25em] uppercase text-gold">
              tasting notes ({relatedEntries.length})
            </h2>
            {avgRating && (
              <p className="font-mono text-[9px] text-ash-soft mt-0.5">
                avg {avgRating}
              </p>
            )}
          </div>
          <Link
            href="/entries/new"
            className="flex items-center gap-1 text-gold text-xs font-mono tracking-mono-tight"
          >
            <IconPlus size={14} stroke={2} />
            기록
          </Link>
        </div>

        {relatedEntries.length === 0 ? (
          <p className="text-ash-soft text-sm text-center py-8">
            아직 기록이 없습니다
          </p>
        ) : (
          <div className="space-y-3">
            {relatedEntries.map((entry) => (
              <Link
                key={entry.id}
                href={`/entries/${entry.id}`}
                className="block card p-3 active:border-gold/30 transition-colors"
              >
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-ash-soft">
                    entry no. {String(entry.serialNumber).padStart(3, "0")}
                  </span>
                  <span className="font-serif text-lg gold-text font-semibold">
                    {entry.rating.toFixed(1)}
                  </span>
                </div>
                {entry.nose && (
                  <p className="text-cream-soft text-xs line-clamp-2">{entry.nose}</p>
                )}
                <p className="text-ash-soft text-[9px] font-mono tracking-[0.15em] mt-1.5">
                  {new Date(entry.tastedAt).toLocaleDateString("ko-KR")}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
