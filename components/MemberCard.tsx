"use client";

import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";

export default function MemberCard() {
  const { data } = useStore();
  const { t } = useI18n();
  const { member } = data;

  const numberDisplay =
    member.memberNumber !== null
      ? String(member.memberNumber).padStart(4, "0")
      : null;

  return (
    <div className="bg-cask rounded-xl p-5 border border-border relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber/5 rounded-full -translate-y-1/2 translate-x-1/2" />

      <p className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-gold mb-3 relative">
        drams
      </p>

      <p className="text-cream text-lg mb-1 relative">
        {member.displayName}
      </p>

      <div className="relative">
        {numberDisplay ? (
          <p className="font-mono text-xs tracking-mono-tight text-amber">
            {t("member_number")} {numberDisplay}
          </p>
        ) : (
          <p className="font-mono text-xs tracking-mono-tight text-ash-soft">
            {t("member_number")} — {t("pending_issue")}
          </p>
        )}
      </div>

      {member.isPro && (
        <div className="mt-3 relative">
          <span className="font-mono text-[9px] tracking-mono-eyebrow lowercase px-2 py-0.5 rounded bg-gold/15 text-gold">
            member
          </span>
        </div>
      )}
    </div>
  );
}
