import type { NormalizedLandmarkList } from '../../mediapipe/types';
import { isFingerExtended, isFingerCurled } from '../fingerUtils';

/** Rock On — index and pinky extended, middle and ring curled */
export function detectRockOn(landmarks: NormalizedLandmarkList): number {
  const indexExtended = isFingerExtended(landmarks, 'index');
  const pinkyExtended = isFingerExtended(landmarks, 'pinky');
  const middleCurled = isFingerCurled(landmarks, 'middle');
  const ringCurled = isFingerCurled(landmarks, 'ring');

  if (indexExtended && pinkyExtended && middleCurled && ringCurled) return 0.93;
  return 0;
}
