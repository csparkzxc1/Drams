"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconNotes,
  IconBottle,
  IconChartBar,
  IconUser,
} from "@tabler/icons-react";
import { useI18n } from "@/lib/i18n";

const tabs = [
  { href: "/entries", icon: IconNotes, labelKey: "entries" },
  { href: "/cellar", icon: IconBottle, labelKey: "cellar" },
  { href: "/stats", icon: IconChartBar, labelKey: "stats" },
  { href: "/member", icon: IconUser, labelKey: "member" },
] as const;

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-ink/95 backdrop-blur-sm pb-safe">
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto">
        {tabs.map(({ href, icon: Icon, labelKey }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center gap-0.5 w-16 transition-colors ${
                active ? "text-amber" : "text-ash"
              }`}
            >
              <Icon size={22} stroke={1.5} />
              <span className="text-[10px] font-mono tracking-mono-eyebrow lowercase">
                {t(labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
