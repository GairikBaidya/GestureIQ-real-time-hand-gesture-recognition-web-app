import type { NormalizedLandmarkList } from '../mediapipe/types';
import {
  HAND_CONNECTIONS,
  SKELETON_COLOR,
  SKELETON_OPACITY,
  LANDMARK_COLOR,
  LANDMARK_RADIUS,
  CONNECTION_WIDTH,
} from './constants';

/**
 * Pure function: draw hand skeleton on a 2D canvas context.
 * Stateless, no side effects beyond canvas drawing.
 */
export function drawSkeleton(
  ctx: CanvasRenderingContext2D,
  landmarks: NormalizedLandmarkList,
  width: number,
  height: number
): void {
  ctx.clearRect(0, 0, width, height);

  // Draw connections
  ctx.strokeStyle = SKELETON_COLOR;
  ctx.lineWidth = CONNECTION_WIDTH;
  ctx.globalAlpha = SKELETON_OPACITY;

  for (const [startIdx, endIdx] of HAND_CONNECTIONS) {
    const start = landmarks[startIdx];
    const end = landmarks[endIdx];

    ctx.beginPath();
    ctx.moveTo(start.x * width, start.y * height);
    ctx.lineTo(end.x * width, end.y * height);
    ctx.stroke();
  }

  // Draw landmark dots
  ctx.globalAlpha = 1;
  ctx.fillStyle = LANDMARK_COLOR;

  for (const lm of landmarks) {
    ctx.beginPath();
    ctx.arc(lm.x * width, lm.y * height, LANDMARK_RADIUS, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Reset alpha
  ctx.globalAlpha = 1;
}
