import type { NormalizedLandmarkList } from '../../mediapipe/types';
import { isFingerExtended, isFingerCurled } from '../fingerUtils';

/** Peace / Victory — index and middle fingers extended in a V */
export function detectPeace(landmarks: NormalizedLandmarkList): number {
  const indexExtended = isFingerExtended(landmarks, 'index');
  const middleExtended = isFingerExtended(landmarks, 'middle');
  const ringCurled = isFingerCurled(landmarks, 'ring');
  const pinkyCurled = isFingerCurled(landmarks, 'pinky');

  if (indexExtended && middleExtended && ringCurled && pinkyCurled) return 0.92;
  return 0;
}
