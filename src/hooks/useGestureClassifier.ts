import { useEffect, useRef } from 'react';
import { GestureClassifier } from '../lib/classifier/GestureClassifier';
import { useGestureStore } from '../store/gestureStore';
import type { NormalizedLandmarkList } from '../lib/mediapipe/types';

/**
 * Consume landmarks, run classifier, push result to store.
 */
export function useGestureClassifier(
  landmarks: NormalizedLandmarkList | null,
  handedness: 'Left' | 'Right'
) {
  const classifierRef = useRef(new GestureClassifier());
  const { setCurrentGesture, addToHistory, currentGesture } = useGestureStore();
  const lastGestureRef = useRef<string>('');

  useEffect(() => {
    if (!landmarks || landmarks.length === 0) {
      setCurrentGesture(null);
      return;
    }

    const result = classifierRef.current.classify(landmarks, handedness);
    setCurrentGesture(result);

    // Add to history only when gesture changes
    if (result.gesture !== 'Unknown' && result.gesture !== lastGestureRef.current) {
      lastGestureRef.current = result.gesture;
      addToHistory(result);
    }
  }, [landmarks, handedness, setCurrentGesture, addToHistory]);

  return { currentGesture };
}
