"use client";

import { useEffect, type ReactNode } from "react";
import { StoreProvider, useStore } from "@/lib/store";
import { I18nProvider } from "@/lib/i18n";
import { issueMemberNumber } from "@/lib/memberNumber";
import BottomNav from "@/components/BottomNav";

function MemberNumberIssuer() {
  const { data, updateMember } = useStore();

  useEffect(() => {
    if (data.member.memberNumber !== null) return;

    issueMemberNumber().then((num) => {
      if (num !== null) {
        updateMember({ memberNumber: num });
      }
    });
  }, [data.member.memberNumber, updateMember]);

  return null;
}

function AppShell({ children }: { children: ReactNode }) {
  const { data } = useStore();

  return (
    <I18nProvider lang={data.settings.language}>
      <MemberNumberIssuer />
      <main className="pb-16 min-h-dvh">{children}</main>
      <BottomNav />
    </I18nProvider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <AppShell>{children}</AppShell>
    </StoreProvider>
  );
}
