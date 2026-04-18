import { Hands } from '@mediapipe/hands';

export interface HandsConfig {
  maxNumHands?: number;
  modelComplexity?: 0 | 1 | 2;
  minDetectionConfidence?: number;
  minTrackingConfidence?: number;
}

export function initHands(config: HandsConfig = {}): Hands {
  const hands = new Hands({
    locateFile: (file: string) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
  });

  hands.setOptions({
    maxNumHands: config.maxNumHands ?? 1,
    modelComplexity: Math.min(config.modelComplexity ?? 1, 1) as 0 | 1,
    minDetectionConfidence: config.minDetectionConfidence ?? 0.7,
    minTrackingConfidence: config.minTrackingConfidence ?? 0.5,
  });

  return hands;
}
