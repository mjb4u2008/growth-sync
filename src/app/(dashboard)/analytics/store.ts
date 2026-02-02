import { create } from "zustand";
import type { Period } from "./types";

interface AnalyticsState {
  selectedPeriod: Period;
  setPeriod: (period: Period) => void;
}

export const useAnalyticsState = create<AnalyticsState>((set) => ({
  selectedPeriod: "30d",
  setPeriod: (period) => set({ selectedPeriod: period }),
}));
