import { useEffect, useRef, useState, useCallback } from 'react';
import { initHands } from '../lib/mediapipe/initHands';
import { processFrame } from '../lib/mediapipe/processFrame';
import { useAnimationFrame } from './useAnimationFrame';
import { useSettingsStore } from '../store/settingsStore';
import type { NormalizedLandmarkList } from '../lib/mediapipe/types';
import type { Hands } from '@mediapipe/hands';

interface MediaPipeResult {
  landmarks: NormalizedLandmarkList | null;
  handedness: 'Left' | 'Right';
  modelReady: boolean;
  modelLoading: boolean;
}

/**
 * Initialize MediaPipe Hands, wire onResults, feed frames via rAF.
 */
export function useMediaPipe(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  isActive: boolean
): MediaPipeResult {
  const handsRef = useRef<Hands | null>(null);
  const [landmarks, setLandmarks] = useState<NormalizedLandmarkList | null>(null);
  const [handedness, setHandedness] = useState<'Left' | 'Right'>('Right');
  const [modelReady, setModelReady] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);

  const { modelComplexity, minDetectionConfidence, minTrackingConfidence, maxNumHands } =
    useSettingsStore();

  // Init model
  useEffect(() => {
    if (!isActive) return;

    setModelLoading(true);
    const hands = initHands({
      maxNumHands,
      modelComplexity,
      minDetectionConfidence,
      minTrackingConfidence,
    });

    hands.onResults((results) => {
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        setLandmarks(results.multiHandLandmarks[0] as NormalizedLandmarkList);
        const label = results.multiHandedness?.[0]?.label;
        setHandedness((label === 'Left' ? 'Right' : 'Left') as 'Left' | 'Right');
      } else {
        setLandmarks(null);
      }
    });

    hands
      .initialize()
      .then(() => {
        handsRef.current = hands;
        setModelReady(true);
        setModelLoading(false);
      })
      .catch(() => {
        setModelLoading(false);
      });

    return () => {
      hands.close();
      handsRef.current = null;
      setModelReady(false);
    };
  }, [isActive, modelComplexity, minDetectionConfidence, minTrackingConfidence, maxNumHands]);

  // Feed frames
  const processCallback = useCallback(async () => {
    if (handsRef.current && videoRef.current && modelReady) {
      await processFrame(handsRef.current, videoRef.current);
    }
  }, [videoRef, modelReady]);

  const { start, stop } = useAnimationFrame(processCallback);

  useEffect(() => {
    if (modelReady && isActive) {
      start();
    } else {
      stop();
    }
  }, [modelReady, isActive, start, stop]);

  return { landmarks, handedness, modelReady, modelLoading };
}
