"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import WhiskySearch from "@/components/WhiskySearch";
import type { Region, WhiskyType, BottleStatus } from "@/lib/types";
import type { SeedWhisky } from "@/lib/search";

const REGIONS: Region[] = [
  "Islay", "Speyside", "Highland", "Lowland", "Campbeltown",
  "Japanese", "Bourbon", "Irish", "Indian", "Other",
];

const TYPES: WhiskyType[] = [
  "Single Malt", "Blended Malt", "Blended",
  "Bourbon", "Rye", "Irish", "Japanese", "Other",
];

const STATUSES: { value: BottleStatus; label: string }[] = [
  { value: "owned", label: "보유" },
  { value: "tasted", label: "시음" },
  { value: "wishlist", label: "위시" },
];

export default function NewBottlePage() {
  const router = useRouter();
  const { addBottle } = useStore();
  const { t } = useI18n();

  const [name, setName] = useState("");
  const [distillery, setDistillery] = useState("");
  const [region, setRegion] = useState<Region>("Speyside");
  const [type, setType] = useState<WhiskyType>("Single Malt");
  const [age, setAge] = useState("");
  const [abv, setAbv] = useState("");
  const [caskStrength, setCaskStrength] = useState(false);
  const [status, setStatus] = useState<BottleStatus>("owned");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [notes, setNotes] = useState("");
  const [filled, setFilled] = useState(false);

  const handleSeedSelect = (w: SeedWhisky) => {
    setName(w.name);
    setDistillery(w.distillery);
    setRegion(w.region);
    setType(w.type);
    setAge(w.age !== null ? String(w.age) : "");
    setAbv(String(w.abv));
    setCaskStrength(w.caskStrength);
    setFilled(true);
  };

  const canSave = name.trim() && distillery.trim() && abv;

  const handleSave = () => {
    if (!canSave) return;
    const now = new Date().toISOString();
    addBottle({
      id: uuid(),
      name: name.trim(),
      distillery: distillery.trim(),
      region,
      type,
      age: age ? parseInt(age, 10) : null,
      abv: parseFloat(abv),
      caskStrength,
      status,
      purchasePrice: purchasePrice ? parseFloat(purchasePrice) : undefined,
      notes: notes.trim() || undefined,
      createdAt: now,
      updatedAt: now,
    });
    router.push("/cellar");
  };

  return (
    <div className="px-4 pt-safe pb-24">
      <header className="flex items-center gap-2 py-4">
        <Link href="/cellar" className="text-ash p-1">
          <IconChevronLeft size={20} stroke={1.5} />
        </Link>
        <h1 className="font-mono text-xs tracking-mono-eyebrow lowercase text-ash">
          {t("new_bottle")}
        </h1>
      </header>

      <div className="mb-5">
        <label className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-ash block mb-2">
          검색으로 추가
        </label>
        <WhiskySearch
          onSelect={handleSeedSelect}
          placeholder="위스키 이름 또는 증류소 검색..."
        />
      </div>

      {filled && (
        <p className="text-amber text-xs font-mono tracking-mono-tight mb-4">
          시드에서 선택됨 — 정보를 확인하고 저장하세요
        </p>
      )}

      <div className="space-y-4">
        <Field label="이름 *">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Lagavulin 16"
            className="input-field"
          />
        </Field>

        <Field label="증류소 *">
          <input
            value={distillery}
            onChange={(e) => setDistillery(e.target.value)}
            placeholder="Lagavulin"
            className="input-field"
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="지역">
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value as Region)}
              className="input-field"
            >
              {REGIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </Field>
          <Field label="유형">
            <select
              value={type}
              onChange={(e) => setType(e.target.value as WhiskyType)}
              className="input-field"
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="숙성 연수">
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="NAS"
              className="input-field"
            />
          </Field>
          <Field label="ABV % *">
            <input
              type="number"
              step="0.1"
              value={abv}
              onChange={(e) => setAbv(e.target.value)}
              placeholder="43"
              className="input-field"
            />
          </Field>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <div
            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
              caskStrength
                ? "bg-amber border-amber"
                : "border-border bg-ink"
            }`}
            onClick={() => setCaskStrength(!caskStrength)}
          >
            {caskStrength && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6L5 9L10 3" stroke="#1A1410" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <span className="text-cream text-sm" onClick={() => setCaskStrength(!caskStrength)}>
            Cask strength
          </span>
        </label>

        <div className="flex gap-2">
          {STATUSES.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setStatus(s.value)}
              className={`flex-1 py-2 rounded-lg text-xs font-mono tracking-mono-tight lowercase transition-colors ${
                status === s.value
                  ? "bg-amber text-ink"
                  : "bg-cask text-ash border border-border"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <Field label="구매가 (₩)">
          <input
            type="number"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            placeholder="선택사항"
            className="input-field"
          />
        </Field>

        <Field label="메모">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="선택사항"
            rows={3}
            className="input-field resize-none"
          />
        </Field>
      </div>

      <div className="fixed bottom-16 inset-x-0 px-4 pb-4 bg-gradient-to-t from-ink via-ink to-transparent pt-6">
        <button
          onClick={handleSave}
          disabled={!canSave}
          className={`w-full py-3 rounded-lg font-mono text-sm tracking-mono-tight transition-colors ${
            canSave
              ? "bg-amber text-ink active:bg-gold"
              : "bg-amber/20 text-amber/40 cursor-not-allowed"
          }`}
        >
          {t("save")}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-ash block mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}
