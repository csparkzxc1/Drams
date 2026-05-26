"use client";

import type { ReactNode } from "react";
import { StoreProvider, useStore } from "@/lib/store";
import { I18nProvider } from "@/lib/i18n";
import BottomNav from "@/components/BottomNav";

function AppShell({ children }: { children: ReactNode }) {
  const { data } = useStore();

  return (
    <I18nProvider lang={data.settings.language}>
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
