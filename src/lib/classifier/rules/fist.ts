import type { NormalizedLandmarkList } from '../../mediapipe/types';
import { isFingerCurled } from '../fingerUtils';

/** Fist — all fingers curled */
export function detectFist(landmarks: NormalizedLandmarkList): number {
  const curled = [
    isFingerCurled(landmarks, 'thumb'),
    isFingerCurled(landmarks, 'index'),
    isFingerCurled(landmarks, 'middle'),
    isFingerCurled(landmarks, 'ring'),
    isFingerCurled(landmarks, 'pinky'),
  ];

  const count = curled.filter(Boolean).length;
  if (count === 5) return 0.95;
  if (count === 4) return 0.55;
  return 0;
}
