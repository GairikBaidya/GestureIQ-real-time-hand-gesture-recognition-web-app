import type { NormalizedLandmarkList } from '../../mediapipe/types';
import { isFingerExtended, isFingerCurled } from '../fingerUtils';

/** Three Fingers — index, middle, ring extended; thumb and pinky curled */
export function detectThreeFingers(landmarks: NormalizedLandmarkList): number {
  const indexExtended = isFingerExtended(landmarks, 'index');
  const middleExtended = isFingerExtended(landmarks, 'middle');
  const ringExtended = isFingerExtended(landmarks, 'ring');
  const pinkyCurled = isFingerCurled(landmarks, 'pinky');

  if (indexExtended && middleExtended && ringExtended && pinkyCurled) return 0.92;
  return 0;
}
