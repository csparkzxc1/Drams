"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { v4 as uuid } from "uuid";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import WhiskySearch from "@/components/WhiskySearch";
import TagInput from "@/components/TagInput";
import RatingInput from "@/components/RatingInput";
import type { Bottle, ServingStyle } from "@/lib/types";
import type { SeedWhisky } from "@/lib/search";

const STEPS = ["bottle", "nose", "palate", "finish", "meta"] as const;

const SERVING_STYLES: { value: ServingStyle; label: string }[] = [
  { value: "neat", label: "Neat" },
  { value: "rocks", label: "On the rocks" },
  { value: "water", label: "With water" },
  { value: "highball", label: "Highball" },
  { value: "other", label: "Other" },
];

export default function NewEntryPage() {
  const router = useRouter();
  const { data, addBottle, addEntry, nextSerialNumber } = useStore();
  const { t } = useI18n();

  const [step, setStep] = useState(0);
  const currentStep = STEPS[step];

  // Step 1: Bottle
  const [bottleId, setBottleId] = useState<string | null>(null);
  const [manualMode, setManualMode] = useState(false);
  const [manualName, setManualName] = useState("");
  const [manualDistillery, setManualDistillery] = useState("");
  const [manualAbv, setManualAbv] = useState("");

  // Step 2: Nose
  const [nose, setNose] = useState("");
  const [noseTags, setNoseTags] = useState<string[]>([]);

  // Step 3: Palate
  const [palate, setPalate] = useState("");
  const [palateTags, setPalateTags] = useState<string[]>([]);

  // Step 4: Finish
  const [finish, setFinish] = useState("");
  const [finishTags, setFinishTags] = useState<string[]>([]);

  // Step 5: Meta
  const [rating, setRating] = useState(3);
  const [servingStyle, setServingStyle] = useState<ServingStyle>("neat");
  const [location, setLocation] = useState("");
  const [companions, setCompanions] = useState("");

  const selectedBottle = bottleId
    ? data.bottles.find((b) => b.id === bottleId)
    : null;

  const handleSelectExisting = (b: Bottle) => {
    setBottleId(b.id);
    setManualMode(false);
  };

  const handleSelectSeed = (w: SeedWhisky) => {
    const existing = data.bottles.find(
      (b) => b.name.toLowerCase() === w.name.toLowerCase()
    );
    if (existing) {
      setBottleId(existing.id);
      setManualMode(false);
      return;
    }
    const now = new Date().toISOString();
    const newBottle: Bottle = {
      id: uuid(),
      name: w.name,
      distillery: w.distillery,
      region: w.region,
      type: w.type,
      age: w.age,
      abv: w.abv,
      caskStrength: w.caskStrength,
      status: "tasted",
      createdAt: now,
      updatedAt: now,
    };
    addBottle(newBottle);
    setBottleId(newBottle.id);
    setManualMode(false);
  };

  const handleManualBottle = () => {
    if (!manualName.trim() || !manualAbv) return;
    const now = new Date().toISOString();
    const newBottle: Bottle = {
      id: uuid(),
      name: manualName.trim(),
      distillery: manualDistillery.trim() || manualName.trim(),
      region: "Other",
      type: "Other",
      age: null,
      abv: parseFloat(manualAbv),
      caskStrength: false,
      status: "tasted",
      createdAt: now,
      updatedAt: now,
    };
    addBottle(newBottle);
    setBottleId(newBottle.id);
    setManualMode(false);
  };

  const canProceed = () => {
    if (currentStep === "bottle") return !!bottleId;
    return true;
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
  };
  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSave = () => {
    if (!bottleId) return;
    const now = new Date().toISOString();
    const allTags = [...noseTags, ...palateTags, ...finishTags];
    const uniqueTags = Array.from(new Set(allTags));

    addEntry({
      id: uuid(),
      serialNumber: nextSerialNumber(),
      bottleId,
      tastedAt: now,
      location: location.trim() || undefined,
      servingStyle,
      nose: nose.trim(),
      palate: palate.trim(),
      finish: finish.trim(),
      rating,
      tags: uniqueTags,
      blind: false,
      companions: companions.trim() || undefined,
      createdAt: now,
      updatedAt: now,
    });
    router.push("/entries");
  };

  return (
    <div className="px-4 pt-safe pb-28 min-h-dvh">
      <header className="flex items-center gap-2 py-4">
        {step === 0 ? (
          <Link href="/entries" className="text-ash p-1">
            <IconChevronLeft size={20} stroke={1.5} />
          </Link>
        ) : (
          <button onClick={handleBack} className="text-ash p-1">
            <IconChevronLeft size={20} stroke={1.5} />
          </button>
        )}
        <h1 className="font-mono text-xs tracking-mono-eyebrow lowercase text-ash">
          {t("new_entry")}
        </h1>
        <div className="ml-auto flex gap-1">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i <= step ? "bg-amber" : "bg-border"
              }`}
            />
          ))}
        </div>
      </header>

      {/* Step 1: Bottle selection */}
      {currentStep === "bottle" && (
        <div className="animate-fadeIn">
          <h2 className="font-serif text-xl text-cream mb-1">어떤 위스키를 드셨나요?</h2>
          <p className="text-ash text-xs mb-4">검색하거나, 셀러에서 고르거나, 직접 입력하세요</p>

          <WhiskySearch
            onSelect={handleSelectSeed}
            placeholder="위스키 이름 또는 증류소 검색..."
          />

          {selectedBottle && !manualMode && (
            <div className="mt-4 bg-cask rounded-lg p-3 border border-amber/30">
              <p className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-amber mb-1">
                선택됨
              </p>
              <p className="font-serif text-base text-cream">
                {selectedBottle.name}
              </p>
              <p className="text-ash text-xs">
                {selectedBottle.distillery} · {selectedBottle.region} · {selectedBottle.abv}%
              </p>
            </div>
          )}

          {data.bottles.length > 0 && !manualMode && (
            <div className="mt-5">
              <p className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-ash mb-2">
                내 셀러에서 선택
              </p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {data.bottles
                  .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                  .slice(0, 20)
                  .map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => handleSelectExisting(b)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg border transition-colors ${
                        bottleId === b.id
                          ? "border-amber bg-amber/10"
                          : "border-border-soft bg-cask hover:border-border"
                      }`}
                    >
                      <p className="font-serif text-sm text-cream">{b.name}</p>
                      <p className="text-ash text-[11px]">
                        {b.distillery} · {b.abv}%
                      </p>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {!manualMode ? (
            <button
              type="button"
              onClick={() => setManualMode(true)}
              className="mt-4 w-full text-center py-2.5 border border-dashed border-border rounded-lg text-ash text-xs hover:border-ash transition-colors"
            >
              목록에 없는 위스키 직접 입력
            </button>
          ) : (
            <div className="mt-4 bg-cask rounded-lg p-4 border border-border-soft animate-fadeIn">
              <p className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-gold mb-3">
                직접 입력
              </p>
              <div className="space-y-3">
                <input
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder="위스키 이름 *"
                  className="input-field"
                />
                <input
                  value={manualDistillery}
                  onChange={(e) => setManualDistillery(e.target.value)}
                  placeholder="증류소 (선택)"
                  className="input-field"
                />
                <input
                  type="number"
                  step="0.1"
                  value={manualAbv}
                  onChange={(e) => setManualAbv(e.target.value)}
                  placeholder="ABV % *"
                  className="input-field"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setManualMode(false)}
                    className="flex-1 py-2 rounded-lg text-xs text-ash bg-ink border border-border"
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    onClick={handleManualBottle}
                    disabled={!manualName.trim() || !manualAbv}
                    className={`flex-1 py-2 rounded-lg text-xs transition-colors ${
                      manualName.trim() && manualAbv
                        ? "bg-amber text-ink"
                        : "bg-amber/20 text-amber/40"
                    }`}
                  >
                    추가
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Nose */}
      {currentStep === "nose" && (
        <div className="animate-fadeIn">
          <h2 className="font-serif text-xl text-cream mb-1">Nose</h2>
          <p className="text-ash text-xs mb-4">향을 기록하세요</p>

          <textarea
            value={nose}
            onChange={(e) => setNose(e.target.value)}
            placeholder="첫 향에서 느껴지는 것들..."
            rows={4}
            className="input-field resize-none mb-4"
          />

          <p className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-ash mb-2">
            tags
          </p>
          <TagInput tags={noseTags} onChange={setNoseTags} />
        </div>
      )}

      {/* Step 3: Palate */}
      {currentStep === "palate" && (
        <div className="animate-fadeIn">
          <h2 className="font-serif text-xl text-cream mb-1">Palate</h2>
          <p className="text-ash text-xs mb-4">맛을 기록하세요</p>

          <textarea
            value={palate}
            onChange={(e) => setPalate(e.target.value)}
            placeholder="입안에서 느껴지는 것들..."
            rows={4}
            className="input-field resize-none mb-4"
          />

          <p className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-ash mb-2">
            tags
          </p>
          <TagInput tags={palateTags} onChange={setPalateTags} />
        </div>
      )}

      {/* Step 4: Finish */}
      {currentStep === "finish" && (
        <div className="animate-fadeIn">
          <h2 className="font-serif text-xl text-cream mb-1">Finish</h2>
          <p className="text-ash text-xs mb-4">여운을 기록하세요</p>

          <textarea
            value={finish}
            onChange={(e) => setFinish(e.target.value)}
            placeholder="남는 여운과 길이..."
            rows={4}
            className="input-field resize-none mb-4"
          />

          <p className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-ash mb-2">
            tags
          </p>
          <TagInput tags={finishTags} onChange={setFinishTags} />
        </div>
      )}

      {/* Step 5: Meta */}
      {currentStep === "meta" && (
        <div className="animate-fadeIn">
          <h2 className="font-serif text-xl text-cream mb-4">
            {t("rating")}
          </h2>

          <div className="mb-6">
            <RatingInput value={rating} onChange={setRating} />
          </div>

          <div className="mb-5">
            <p className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-ash mb-2">
              serving style
            </p>
            <div className="flex flex-wrap gap-2">
              {SERVING_STYLES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setServingStyle(s.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-mono-tight lowercase transition-colors ${
                    servingStyle === s.value
                      ? "bg-amber text-ink"
                      : "bg-cask text-ash border border-border"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-ash block mb-1.5">
                장소
              </label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="선택사항"
                className="input-field"
              />
            </div>
            <div>
              <label className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-ash block mb-1.5">
                동행
              </label>
              <input
                value={companions}
                onChange={(e) => setCompanions(e.target.value)}
                placeholder="선택사항"
                className="input-field"
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <div className="fixed bottom-16 inset-x-0 px-4 pb-4 bg-gradient-to-t from-ink via-ink to-transparent pt-6">
        {currentStep === "meta" ? (
          <button
            onClick={handleSave}
            disabled={!bottleId}
            className={`w-full py-3 rounded-lg font-mono text-sm tracking-mono-tight transition-colors ${
              bottleId
                ? "bg-amber text-ink active:bg-gold"
                : "bg-amber/20 text-amber/40 cursor-not-allowed"
            }`}
          >
            잔을 기록한다
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`w-full py-3 rounded-lg font-mono text-sm tracking-mono-tight transition-colors flex items-center justify-center gap-2 ${
              canProceed()
                ? "bg-amber text-ink active:bg-gold"
                : "bg-amber/20 text-amber/40 cursor-not-allowed"
            }`}
          >
            다음
            <IconChevronRight size={16} stroke={2} />
          </button>
        )}
      </div>
    </div>
  );
}
