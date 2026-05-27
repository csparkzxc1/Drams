"use client";

import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { IMAGES } from "@/lib/images";
import HeroHeader from "@/components/HeroHeader";
import MemberCard from "@/components/MemberCard";
import Link from "next/link";
import { IconSettings } from "@tabler/icons-react";

export default function MemberPage() {
  const { data } = useStore();
  const { t } = useI18n();

  return (
    <div className="pt-safe pb-20">
      <HeroHeader
        src={IMAGES.barMood}
        title="Member"
        height="h-36"
      >
        <Link href="/member/settings" className="text-cream-soft p-1">
          <IconSettings size={20} stroke={1.3} />
        </Link>
      </HeroHeader>

      <div className="px-4 pt-4">
        <MemberCard />

        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="card p-3 text-center">
            <p className="font-mono text-[7px] tracking-[0.25em] uppercase text-ash-soft mb-1">
              entries
            </p>
            <p className="font-serif text-2xl gold-text font-semibold">
              {data.entries.length}
            </p>
          </div>
          <div className="card p-3 text-center">
            <p className="font-mono text-[7px] tracking-[0.25em] uppercase text-ash-soft mb-1">
              bottles
            </p>
            <p className="font-serif text-2xl gold-text font-semibold">
              {data.bottles.length}
            </p>
          </div>
          <div className="card p-3 text-center">
            <p className="font-mono text-[7px] tracking-[0.25em] uppercase text-ash-soft mb-1">
              distilleries
            </p>
            <p className="font-serif text-2xl gold-text font-semibold">
              {new Set(data.bottles.map((b) => b.distillery)).size}
            </p>
          </div>
        </div>

        <div className="card-gold shimmer mt-8 p-6 text-center">
          <h2 className="font-mono text-[8px] tracking-[0.3em] uppercase text-gold mb-2">
            drams members
          </h2>
          <p className="text-cream-soft text-xs mb-1">
            {t("lifetime_membership")}
          </p>
          <p className="text-ash-soft text-[10px] mb-5">
            블라인드 모드 · 플라이트 비교 · PDF 출력 · Year in Drams
          </p>
          <button
            disabled
            className="w-full py-3 rounded-lg border border-gold/20 text-gold/40 font-mono text-[10px] tracking-[0.2em] uppercase cursor-not-allowed"
          >
            coming soon
          </button>
        </div>
      </div>
    </div>
  );
}
