import type { NormalizedLandmarkList } from '../../mediapipe/types';
import { distance, isFingerExtended, isFingerCurled } from '../fingerUtils';
import { LandmarkIndex } from '../../mediapipe/types';

/** OK Sign — thumb and index form a circle, others extended or relaxed */
export function detectOkSign(landmarks: NormalizedLandmarkList): number {
  const thumbTip = landmarks[LandmarkIndex.THUMB_TIP];
  const indexTip = landmarks[LandmarkIndex.INDEX_TIP];

  // Thumb tip and index tip should be very close (forming a circle)
  const tipDistance = distance(thumbTip, indexTip);

  // Other fingers should be extended
  const middleExtended = isFingerExtended(landmarks, 'middle');
  const ringExtended = isFingerExtended(landmarks, 'ring');
  const pinkyExtended = isFingerExtended(landmarks, 'pinky');

  if (tipDistance < 0.06 && middleExtended && ringExtended && pinkyExtended) return 0.94;
  if (tipDistance < 0.08 && middleExtended) return 0.6;
  return 0;
}
