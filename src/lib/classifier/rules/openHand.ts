import type { NormalizedLandmarkList } from '../../mediapipe/types';
import { isFingerExtended } from '../fingerUtils';

/** Open Hand — all five fingers extended */
export function detectOpenHand(landmarks: NormalizedLandmarkList): number {
  const extended = [
    isFingerExtended(landmarks, 'thumb'),
    isFingerExtended(landmarks, 'index'),
    isFingerExtended(landmarks, 'middle'),
    isFingerExtended(landmarks, 'ring'),
    isFingerExtended(landmarks, 'pinky'),
  ];

  const count = extended.filter(Boolean).length;
  if (count === 5) return 0.95;
  if (count === 4) return 0.5;
  return 0;
}
