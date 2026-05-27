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

  const sinceDisplay = new Date(member.memberSince).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className="card-gold shimmer p-6">
      {/* Top ornament */}
      <div className="flex justify-center mb-5">
        <div className="flex flex-col items-center">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="mb-2 opacity-40">
            <path d="M14 2L16.5 9.5H24L18 14.5L20 22L14 17.5L8 22L10 14.5L4 9.5H11.5L14 2Z" stroke="#D4A056" strokeWidth="0.75"/>
          </svg>
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-gold/60">
            drams
          </p>
          <p className="font-mono text-[7px] tracking-[0.25em] uppercase text-ash-soft mt-0.5">
            private membership
          </p>
        </div>
      </div>

      <div className="divider-gold mb-5" />

      {/* Member name */}
      <p className="text-center text-cream text-base mb-6">
        {member.displayName}
      </p>

      {/* Number & Since */}
      <div className="flex justify-between items-end">
        <div>
          <p className="font-mono text-[8px] tracking-[0.25em] uppercase text-ash-soft mb-1">
            member no.
          </p>
          {numberDisplay ? (
            <p className="font-serif text-3xl gold-text font-semibold leading-none">
              {numberDisplay}
            </p>
          ) : (
            <p className="font-mono text-xs text-ash-soft">
              {t("pending_issue")}
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="font-mono text-[8px] tracking-[0.25em] uppercase text-ash-soft mb-1">
            since
          </p>
          <p className="font-mono text-xs text-cream-soft">
            {sinceDisplay}
          </p>
        </div>
      </div>

      {member.isPro && (
        <>
          <div className="divider-gold my-4" />
          <div className="text-center">
            <span className="font-mono text-[8px] tracking-[0.3em] uppercase px-3 py-1 rounded-full border border-gold/20 text-gold">
              lifetime member
            </span>
          </div>
        </>
      )}
    </div>
  );
}
