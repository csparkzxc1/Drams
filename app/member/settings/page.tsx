"use client";

import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";

export default function SettingsPage() {
  const { data, updateSettings } = useStore();
  const { t } = useI18n();

  return (
    <div className="px-4 pt-safe">
      <header className="flex items-center gap-2 py-4">
        <Link href="/member" className="text-ash p-1">
          <IconChevronLeft size={20} stroke={1.5} />
        </Link>
        <h1 className="font-mono text-xs tracking-mono-eyebrow lowercase text-ash">
          {t("settings")}
        </h1>
      </header>

      <div className="space-y-4">
        <div className="bg-cask rounded-lg p-4 border border-border-soft">
          <label className="flex items-center justify-between">
            <span className="text-cream text-sm">{t("language")}</span>
            <select
              value={data.settings.language}
              onChange={(e) =>
                updateSettings({
                  language: e.target.value as "ko" | "en",
                })
              }
              className="bg-ink border border-border rounded px-3 py-1.5 text-cream text-sm"
            >
              <option value="ko">한국어</option>
              <option value="en">English</option>
            </select>
          </label>
        </div>

        <div className="bg-cask rounded-lg p-4 border border-border-soft">
          <label className="flex items-center justify-between">
            <span className="text-cream text-sm">{t("unit")}</span>
            <select
              value={data.settings.unit}
              onChange={(e) =>
                updateSettings({
                  unit: e.target.value as "ml" | "oz",
                })
              }
              className="bg-ink border border-border rounded px-3 py-1.5 text-cream text-sm"
            >
              <option value="ml">ml</option>
              <option value="oz">oz</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
