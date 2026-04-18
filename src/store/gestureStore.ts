import { create } from 'zustand';
import type { GestureResult } from '../types/gesture';

interface GestureStore {
  currentGesture: GestureResult | null;
  history: GestureResult[];
  setCurrentGesture: (result: GestureResult | null) => void;
  addToHistory: (result: GestureResult) => void;
  clearHistory: () => void;
}

const MAX_HISTORY = 5;

export const useGestureStore = create<GestureStore>((set) => ({
  currentGesture: null,
  history: [],
  setCurrentGesture: (result) => set({ currentGesture: result }),
  addToHistory: (result) =>
    set((state) => ({
      history: [result, ...state.history].slice(0, MAX_HISTORY),
    })),
  clearHistory: () => set({ history: [] }),
}));
