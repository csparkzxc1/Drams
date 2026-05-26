import { v4 as uuid } from "uuid";
import type { Member, Settings, StoreData } from "./types";

export const CURRENT_SCHEMA_VERSION = 1;

export function createDefaultMember(): Member {
  return {
    id: uuid(),
    memberNumber: null,
    memberSince: new Date().toISOString(),
    displayName: "Anonymous taster",
    language: "ko",
    isPro: false,
  };
}

export function createDefaultSettings(): Settings {
  return {
    language: "ko",
    unit: "ml",
    notifications: false,
    schemaVersion: CURRENT_SCHEMA_VERSION,
  };
}

export function createDefaultStore(): StoreData {
  return {
    member: createDefaultMember(),
    bottles: [],
    entries: [],
    settings: createDefaultSettings(),
  };
}
