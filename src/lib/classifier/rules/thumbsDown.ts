import type { NormalizedLandmarkList } from '../../mediapipe/types';
import { isFingerExtended, isFingerCurled } from '../fingerUtils';
import { LandmarkIndex } from '../../mediapipe/types';

/** Thumbs Down — thumb pointing down, others curled */
export function detectThumbsDown(landmarks: NormalizedLandmarkList): number {
  const thumbExtended = isFingerExtended(landmarks, 'thumb');
  const othersCurled = [
    isFingerCurled(landmarks, 'index'),
    isFingerCurled(landmarks, 'middle'),
    isFingerCurled(landmarks, 'ring'),
    isFingerCurled(landmarks, 'pinky'),
  ].every(Boolean);

  // Thumb tip should be below thumb MCP (pointing down)
  const thumbPointingDown =
    landmarks[LandmarkIndex.THUMB_TIP].y > landmarks[LandmarkIndex.THUMB_MCP].y;

  if (thumbExtended && othersCurled && thumbPointingDown) return 0.95;
  if (thumbExtended && othersCurled) return 0.5;
  return 0;
}
