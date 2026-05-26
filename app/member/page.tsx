"use client";

import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import MemberCard from "@/components/MemberCard";
import Link from "next/link";
import { IconSettings } from "@tabler/icons-react";

export default function MemberPage() {
  const { data } = useStore();
  const { t } = useI18n();

  const memberSinceFormatted = new Date(
    data.member.memberSince
  ).toLocaleDateString(data.settings.language === "ko" ? "ko-KR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="px-4 pt-safe">
      <header className="flex items-center justify-between py-4">
        <h1 className="font-mono text-xs tracking-mono-eyebrow lowercase text-ash">
          {t("member")}
        </h1>
        <Link href="/member/settings" className="text-ash p-1">
          <IconSettings size={20} stroke={1.5} />
        </Link>
      </header>

      <MemberCard />

      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="bg-cask rounded-lg p-3 text-center border border-border-soft">
          <p className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-ash mb-1">
            {t("total_entries")}
          </p>
          <p className="font-serif text-2xl text-amber">
            {data.entries.length}
          </p>
        </div>
        <div className="bg-cask rounded-lg p-3 text-center border border-border-soft">
          <p className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-ash mb-1">
            {t("total_bottles")}
          </p>
          <p className="font-serif text-2xl text-amber">
            {data.bottles.length}
          </p>
        </div>
        <div className="bg-cask rounded-lg p-3 text-center border border-border-soft">
          <p className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-ash mb-1">
            {t("member_since")}
          </p>
          <p className="text-cream text-xs mt-1">{memberSinceFormatted}</p>
        </div>
      </div>

      <div className="mt-8 bg-cask rounded-lg p-5 border border-border-soft text-center">
        <h2 className="font-mono text-xs tracking-mono-eyebrow lowercase text-gold mb-2">
          {t("drams_members")}
        </h2>
        <p className="text-cream-soft text-sm mb-4">
          {t("lifetime_membership")}
        </p>
        <button
          disabled
          className="w-full py-3 rounded-lg bg-amber/20 text-amber/50 font-mono text-sm tracking-mono-tight cursor-not-allowed"
        >
          coming soon
        </button>
      </div>
    </div>
  );
}
