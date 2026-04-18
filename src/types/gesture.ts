export interface NormalizedLandmark {
  x: number;
  y: number;
  z: number;
  visibility?: number;
}

export type NormalizedLandmarkList = NormalizedLandmark[];

export interface GestureResult {
  gesture: string;
  confidence: number;
  hand: 'Left' | 'Right';
  landmarks: NormalizedLandmark[];
  timestamp: number;
}

export interface GestureRule {
  name: string;
  emoji: string;
  detect: (landmarks: NormalizedLandmarkList) => number;
}
