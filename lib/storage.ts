import type { StoreData } from "./types";
import { createDefaultStore, CURRENT_SCHEMA_VERSION } from "./defaults";

const STORAGE_KEY = "drams:store";

export function loadStore(): StoreData {
  if (typeof window === "undefined") return createDefaultStore();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultStore();
    const data = JSON.parse(raw) as StoreData;
    return migrate(data);
  } catch {
    return createDefaultStore();
  }
}

export function saveStore(data: StoreData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage full or unavailable
  }
}

function migrate(data: StoreData): StoreData {
  const version = data.settings?.schemaVersion ?? 0;

  if (version < 1) {
    data.settings = {
      ...data.settings,
      schemaVersion: CURRENT_SCHEMA_VERSION,
      language: data.settings?.language ?? "ko",
      unit: data.settings?.unit ?? "ml",
      notifications: data.settings?.notifications ?? false,
    };
    data.bottles = data.bottles ?? [];
    data.entries = data.entries ?? [];
  }

  data.settings.schemaVersion = CURRENT_SCHEMA_VERSION;
  return data;
}
