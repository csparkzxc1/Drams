"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { IconChevronLeft, IconTrash, IconPlus } from "@tabler/icons-react";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
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
    .sort(
      (a, b) =>
        new Date(b.tastedAt).getTime() - new Date(a.tastedAt).getTime()
    );

  if (!bottle) {
    return (
      <div className="px-4 pt-safe">
        <header className="flex items-center gap-2 py-4">
          <Link href="/cellar" className="text-ash p-1">
            <IconChevronLeft size={20} stroke={1.5} />
          </Link>
        </header>
        <p className="text-ash-soft text-sm text-center pt-24">
          Bottle not found
        </p>
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
      ? (
          relatedEntries.reduce((sum, e) => sum + e.rating, 0) /
          relatedEntries.length
        ).toFixed(1)
      : null;

  return (
    <div className="px-4 pt-safe pb-20">
      <header className="flex items-center justify-between py-4">
        <Link href="/cellar" className="text-ash p-1">
          <IconChevronLeft size={20} stroke={1.5} />
        </Link>
        <p className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-ash">
          {bottle.region} · {bottle.type}
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

      <h1 className="font-serif text-2xl text-cream mb-1">{bottle.name}</h1>
      <p className="text-ash text-sm mb-4">
        {bottle.distillery}
        {bottle.age ? ` · ${bottle.age}yr` : " · NAS"} · {bottle.abv}% abv
        {bottle.caskStrength && " · cask strength"}
      </p>

      <div className="flex gap-2 mb-2">
        {STATUSES.map((s) => (
          <button
            key={s.value}
            onClick={() => updateBottle(bottle.id, { status: s.value })}
            className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-mono-tight lowercase transition-colors ${
              bottle.status === s.value
                ? "bg-amber text-ink"
                : "bg-cask text-ash border border-border"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {bottle.purchasePrice && (
        <p className="text-ash text-xs font-mono tracking-mono-tight mt-2">
          ₩{bottle.purchasePrice.toLocaleString()}
        </p>
      )}

      {bottle.notes && (
        <p className="text-cream-soft text-sm mt-3 mb-4">{bottle.notes}</p>
      )}

      <div className="mt-6 flex items-center justify-between mb-3">
        <h2 className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-gold">
          tasting notes ({relatedEntries.length})
          {avgRating && (
            <span className="ml-2 text-amber">avg {avgRating}</span>
          )}
        </h2>
        <Link
          href="/entries/new"
          className="flex items-center gap-1 text-amber text-xs font-mono tracking-mono-tight"
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
              className="block bg-cask rounded-lg p-3 border border-border-soft active:border-border transition-colors"
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
                <p className="text-cream-soft text-xs line-clamp-2">
                  {entry.nose}
                </p>
              )}
              <p className="text-ash-soft text-[10px] font-mono tracking-mono-tight mt-1">
                {new Date(entry.tastedAt).toLocaleDateString("ko-KR")}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
