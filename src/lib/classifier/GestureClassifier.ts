import type { NormalizedLandmarkList } from '../mediapipe/types';
import type { GestureResult, GestureRule } from '../../types/gesture';
import { CONFIDENCE_THRESHOLD } from '../../constants/mediapipe';
import { detectOpenHand } from './rules/openHand';
import { detectFist } from './rules/fist';
import { detectThumbsUp } from './rules/thumbsUp';
import { detectThumbsDown } from './rules/thumbsDown';
import { detectPeace } from './rules/peace';
import { detectPoint } from './rules/point';
import { detectOkSign } from './rules/okSign';
import { detectRockOn } from './rules/rockOn';
import { detectCallMe } from './rules/callMe';
import { detectThreeFingers } from './rules/threeFingers';

const RULES: GestureRule[] = [
  { name: 'Open Hand', emoji: '🖐️', detect: detectOpenHand },
  { name: 'Fist', emoji: '✊', detect: detectFist },
  { name: 'Thumbs Up', emoji: '👍', detect: detectThumbsUp },
  { name: 'Thumbs Down', emoji: '👎', detect: detectThumbsDown },
  { name: 'Peace', emoji: '✌️', detect: detectPeace },
  { name: 'Point', emoji: '👆', detect: detectPoint },
  { name: 'OK Sign', emoji: '👌', detect: detectOkSign },
  { name: 'Rock On', emoji: '🤘', detect: detectRockOn },
  { name: 'Call Me', emoji: '🤙', detect: detectCallMe },
  { name: 'Three Fingers', emoji: '🤟', detect: detectThreeFingers },
];

export class GestureClassifier {
  private rules: GestureRule[];
  private threshold: number;

  constructor(threshold: number = CONFIDENCE_THRESHOLD) {
    this.rules = RULES;
    this.threshold = threshold;
  }

  classify(
    landmarks: NormalizedLandmarkList,
    handedness: 'Left' | 'Right' = 'Right'
  ): GestureResult {
    let bestGesture = 'Unknown';
    let bestConfidence = 0;
    let bestEmoji = '❓';

    for (const rule of this.rules) {
      const confidence = rule.detect(landmarks);
      if (confidence > bestConfidence) {
        bestConfidence = confidence;
        bestGesture = rule.name;
        bestEmoji = rule.emoji;
      }
    }

    if (bestConfidence < this.threshold) {
      bestGesture = 'Unknown';
      bestConfidence = 0;
      bestEmoji = '❓';
    }

    return {
      gesture: bestGesture,
      confidence: bestConfidence,
      hand: handedness,
      landmarks,
      timestamp: performance.now(),
    };
  }
}
