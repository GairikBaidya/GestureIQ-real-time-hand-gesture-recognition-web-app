import type { NormalizedLandmarkList } from '../../mediapipe/types';
import { isFingerExtended, isFingerCurled } from '../fingerUtils';

/** Call Me — thumb and pinky extended, others curled */
export function detectCallMe(landmarks: NormalizedLandmarkList): number {
  const thumbExtended = isFingerExtended(landmarks, 'thumb');
  const pinkyExtended = isFingerExtended(landmarks, 'pinky');
  const indexCurled = isFingerCurled(landmarks, 'index');
  const middleCurled = isFingerCurled(landmarks, 'middle');
  const ringCurled = isFingerCurled(landmarks, 'ring');

  if (thumbExtended && pinkyExtended && indexCurled && middleCurled && ringCurled) return 0.93;
  return 0;
}
