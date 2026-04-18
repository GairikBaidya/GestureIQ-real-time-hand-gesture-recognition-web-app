import type { NormalizedLandmark, NormalizedLandmarkList } from '../mediapipe/types';
import { LandmarkIndex } from '../mediapipe/types';

/**
 * Calculate Euclidean distance between two landmarks.
 */
export function distance(a: NormalizedLandmark, b: NormalizedLandmark): number {
  return Math.sqrt(
    (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2
  );
}

/**
 * Calculate angle (in degrees) at point b, formed by vectors ba and bc.
 */
export function angleBetween(
  a: NormalizedLandmark,
  b: NormalizedLandmark,
  c: NormalizedLandmark
): number {
  const ba = { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
  const bc = { x: c.x - b.x, y: c.y - b.y, z: c.z - b.z };

  const dot = ba.x * bc.x + ba.y * bc.y + ba.z * bc.z;
  const magBA = Math.sqrt(ba.x ** 2 + ba.y ** 2 + ba.z ** 2);
  const magBC = Math.sqrt(bc.x ** 2 + bc.y ** 2 + bc.z ** 2);

  if (magBA === 0 || magBC === 0) return 0;

  const cosAngle = Math.max(-1, Math.min(1, dot / (magBA * magBC)));
  return (Math.acos(cosAngle) * 180) / Math.PI;
}

/**
 * Check if finger tip is above (lower y = higher on screen) its MCP knuckle.
 */
export function tipAboveKnuckle(
  landmarks: NormalizedLandmarkList,
  tipIdx: number,
  mcpIdx: number
): boolean {
  return landmarks[tipIdx].y < landmarks[mcpIdx].y;
}

/**
 * Finger indices: [MCP, PIP, DIP, TIP]
 */
const FINGER_INDICES = {
  thumb: [LandmarkIndex.THUMB_CMC, LandmarkIndex.THUMB_MCP, LandmarkIndex.THUMB_IP, LandmarkIndex.THUMB_TIP],
  index: [LandmarkIndex.INDEX_MCP, LandmarkIndex.INDEX_PIP, LandmarkIndex.INDEX_DIP, LandmarkIndex.INDEX_TIP],
  middle: [LandmarkIndex.MIDDLE_MCP, LandmarkIndex.MIDDLE_PIP, LandmarkIndex.MIDDLE_DIP, LandmarkIndex.MIDDLE_TIP],
  ring: [LandmarkIndex.RING_MCP, LandmarkIndex.RING_PIP, LandmarkIndex.RING_DIP, LandmarkIndex.RING_TIP],
  pinky: [LandmarkIndex.PINKY_MCP, LandmarkIndex.PINKY_PIP, LandmarkIndex.PINKY_DIP, LandmarkIndex.PINKY_TIP],
} as const;

export type FingerName = keyof typeof FINGER_INDICES;

/**
 * Returns true if the given finger is extended (straightened out).
 * For thumb: uses angle-based check.
 * For other fingers: tip is above PIP joint.
 */
export function isFingerExtended(
  landmarks: NormalizedLandmarkList,
  finger: FingerName
): boolean {
  const indices = FINGER_INDICES[finger];

  if (finger === 'thumb') {
    // Thumb: check if tip is far from index MCP (extended outward)
    const tipDist = distance(landmarks[LandmarkIndex.THUMB_TIP], landmarks[LandmarkIndex.INDEX_MCP]);
    const mcpDist = distance(landmarks[LandmarkIndex.THUMB_MCP], landmarks[LandmarkIndex.INDEX_MCP]);
    return tipDist > mcpDist * 1.2;
  }

  // Other fingers: tip should be above PIP (lower y value)
  return landmarks[indices[3]].y < landmarks[indices[1]].y;
}

/**
 * Returns true if the given finger is curled (bent).
 */
export function isFingerCurled(
  landmarks: NormalizedLandmarkList,
  finger: FingerName
): boolean {
  return !isFingerExtended(landmarks, finger);
}

/**
 * Get all extended fingers as an array of finger names.
 */
export function getExtendedFingers(
  landmarks: NormalizedLandmarkList
): FingerName[] {
  const fingers: FingerName[] = ['thumb', 'index', 'middle', 'ring', 'pinky'];
  return fingers.filter((f) => isFingerExtended(landmarks, f));
}

export { FINGER_INDICES };
