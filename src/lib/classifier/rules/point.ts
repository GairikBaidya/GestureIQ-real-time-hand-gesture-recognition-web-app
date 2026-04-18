import type { NormalizedLandmarkList } from '../../mediapipe/types';
import { isFingerExtended, isFingerCurled } from '../fingerUtils';

/** Point — index finger extended, others curled */
export function detectPoint(landmarks: NormalizedLandmarkList): number {
  const indexExtended = isFingerExtended(landmarks, 'index');
  const othersCurled = [
    isFingerCurled(landmarks, 'middle'),
    isFingerCurled(landmarks, 'ring'),
    isFingerCurled(landmarks, 'pinky'),
  ].every(Boolean);

  if (indexExtended && othersCurled) return 0.93;
  return 0;
}
