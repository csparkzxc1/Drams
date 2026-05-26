"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Bottle, Entry, Member, Settings, StoreData } from "./types";
import { createDefaultStore } from "./defaults";
import { loadStore, saveStore } from "./storage";

type StoreContextValue = {
  data: StoreData;
  // Member
  updateMember: (patch: Partial<Member>) => void;
  // Bottles
  addBottle: (bottle: Bottle) => void;
  updateBottle: (id: string, patch: Partial<Bottle>) => void;
  deleteBottle: (id: string) => void;
  getBottle: (id: string) => Bottle | undefined;
  // Entries
  addEntry: (entry: Entry) => void;
  updateEntry: (id: string, patch: Partial<Entry>) => void;
  deleteEntry: (id: string) => void;
  getEntry: (id: string) => Entry | undefined;
  nextSerialNumber: () => number;
  // Settings
  updateSettings: (patch: Partial<Settings>) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<StoreData>(createDefaultStore);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setData(loadStore());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveStore(data);
  }, [data, loaded]);

  const updateMember = useCallback((patch: Partial<Member>) => {
    setData((prev) => ({
      ...prev,
      member: { ...prev.member, ...patch },
    }));
  }, []);

  const addBottle = useCallback((bottle: Bottle) => {
    setData((prev) => ({
      ...prev,
      bottles: [...prev.bottles, bottle],
    }));
  }, []);

  const updateBottle = useCallback((id: string, patch: Partial<Bottle>) => {
    setData((prev) => ({
      ...prev,
      bottles: prev.bottles.map((b) =>
        b.id === id ? { ...b, ...patch, updatedAt: new Date().toISOString() } : b
      ),
    }));
  }, []);

  const deleteBottle = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      bottles: prev.bottles.filter((b) => b.id !== id),
    }));
  }, []);

  const getBottle = useCallback(
    (id: string) => data.bottles.find((b) => b.id === id),
    [data.bottles]
  );

  const addEntry = useCallback((entry: Entry) => {
    setData((prev) => ({
      ...prev,
      entries: [...prev.entries, entry],
    }));
  }, []);

  const updateEntry = useCallback((id: string, patch: Partial<Entry>) => {
    setData((prev) => ({
      ...prev,
      entries: prev.entries.map((e) =>
        e.id === id ? { ...e, ...patch, updatedAt: new Date().toISOString() } : e
      ),
    }));
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      entries: prev.entries.filter((e) => e.id !== id),
    }));
  }, []);

  const getEntry = useCallback(
    (id: string) => data.entries.find((e) => e.id === id),
    [data.entries]
  );

  const nextSerialNumber = useCallback(() => {
    const max = data.entries.reduce(
      (m, e) => Math.max(m, e.serialNumber),
      0
    );
    return max + 1;
  }, [data.entries]);

  const updateSettings = useCallback((patch: Partial<Settings>) => {
    setData((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...patch },
    }));
  }, []);

  const value = useMemo<StoreContextValue>(
    () => ({
      data,
      updateMember,
      addBottle,
      updateBottle,
      deleteBottle,
      getBottle,
      addEntry,
      updateEntry,
      deleteEntry,
      getEntry,
      nextSerialNumber,
      updateSettings,
    }),
    [
      data,
      updateMember,
      addBottle,
      updateBottle,
      deleteBottle,
      getBottle,
      addEntry,
      updateEntry,
      deleteEntry,
      getEntry,
      nextSerialNumber,
      updateSettings,
    ]
  );

  if (!loaded) return null;

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
