"use client";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Duration, FinishKey } from "@/lib/sanity/types";

export interface MorningState {
  wakeTime: string;
  durationMin: Duration;
  sound: string;
  finish: FinishKey;
}

interface MorningContextValue extends MorningState {
  set: (patch: Partial<MorningState>) => void;
}

const MorningContext = createContext<MorningContextValue | null>(null);

export function MorningProvider({ defaults, children }: { defaults: MorningState; children: ReactNode }) {
  const [state, setState] = useState<MorningState>(defaults);
  const set = useCallback((patch: Partial<MorningState>) => setState((s) => ({ ...s, ...patch })), []);
  const value = useMemo(() => ({ ...state, set }), [state, set]);
  return <MorningContext.Provider value={value}>{children}</MorningContext.Provider>;
}

export function useMorning(): MorningContextValue {
  const ctx = useContext(MorningContext);
  if (!ctx) throw new Error("useMorning must be used inside MorningProvider");
  return ctx;
}
