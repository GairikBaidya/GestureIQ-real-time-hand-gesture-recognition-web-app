import { useSettingsStore } from '../store/settingsStore';
import type { AppSettings } from '../types/settings';

/**
 * Convenience hook to read/write settings.
 */
export function useSettings() {
  const store = useSettingsStore();

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    store.updateSetting(key, value);
  };

  return {
    settings: {
      showOverlay: store.showOverlay,
      showGestureLabel: store.showGestureLabel,
      modelComplexity: store.modelComplexity,
      minDetectionConfidence: store.minDetectionConfidence,
      minTrackingConfidence: store.minTrackingConfidence,
      maxNumHands: store.maxNumHands,
      cameraDeviceId: store.cameraDeviceId,
    } as AppSettings,
    updateSetting,
    resetSettings: store.resetSettings,
  };
}
