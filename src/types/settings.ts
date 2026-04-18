export interface AppSettings {
  showOverlay: boolean;
  showGestureLabel: boolean;
  modelComplexity: 0 | 1 | 2;
  minDetectionConfidence: number;
  minTrackingConfidence: number;
  maxNumHands: 1 | 2;
  cameraDeviceId: string | null;
}

export const DEFAULT_SETTINGS: AppSettings = {
  showOverlay: true,
  showGestureLabel: true,
  modelComplexity: 1,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.5,
  maxNumHands: 1,
  cameraDeviceId: null,
};
