export const MEDIAPIPE_CONFIG = {
  maxNumHands: 1,
  modelComplexity: 1 as 0 | 1 | 2,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.5,
} as const;

export const CAMERA_CONFIG = {
  width: 640,
  height: 480,
  facingMode: 'user' as const,
} as const;

export const CONFIDENCE_THRESHOLD = 0.6;
