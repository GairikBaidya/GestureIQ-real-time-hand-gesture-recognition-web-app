import type { Hands } from '@mediapipe/hands';

/**
 * Send a single video frame to MediaPipe Hands for processing.
 * Results are delivered via the onResults callback set on the Hands instance.
 */
export async function processFrame(
  hands: Hands,
  video: HTMLVideoElement
): Promise<void> {
  if (video.readyState >= 2) {
    await hands.send({ image: video });
  }
}
