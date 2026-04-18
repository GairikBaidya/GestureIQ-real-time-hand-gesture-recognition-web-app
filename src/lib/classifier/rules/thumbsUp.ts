import type { NormalizedLandmarkList } from '../../mediapipe/types';
import { isFingerExtended, isFingerCurled } from '../fingerUtils';
import { LandmarkIndex } from '../../mediapipe/types';

/** Thumbs Up — thumb extended upward, others curled */
export function detectThumbsUp(landmarks: NormalizedLandmarkList): number {
  const thumbExtended = isFingerExtended(landmarks, 'thumb');
  const othersCurled = [
    isFingerCurled(landmarks, 'index'),
    isFingerCurled(landmarks, 'middle'),
    isFingerCurled(landmarks, 'ring'),
    isFingerCurled(landmarks, 'pinky'),
  ].every(Boolean);

  // Thumb tip should be above thumb MCP (pointing up)
  const thumbPointingUp =
    landmarks[LandmarkIndex.THUMB_TIP].y < landmarks[LandmarkIndex.THUMB_MCP].y;

  if (thumbExtended && othersCurled && thumbPointingUp) return 0.95;
  if (thumbExtended && othersCurled) return 0.65;
  return 0;
}
