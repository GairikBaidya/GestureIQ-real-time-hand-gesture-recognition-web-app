import { create } from 'zustand';
import type { AppSettings } from '../types/settings';
import { DEFAULT_SETTINGS } from '../types/settings';

const STORAGE_KEY = 'gestureiq-settings';

function loadSettings(): AppSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
  } catch {
    // ignore parse errors
  }
  return DEFAULT_SETTINGS;
}

function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // ignore storage errors
  }
}

interface SettingsStore extends AppSettings {
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  ...loadSettings(),
  updateSetting: (key, value) =>
    set((state) => {
      const newSettings = { ...state, [key]: value };
      saveSettings(newSettings);
      return { [key]: value };
    }),
  resetSettings: () => {
    saveSettings(DEFAULT_SETTINGS);
    set(DEFAULT_SETTINGS);
  },
}));
