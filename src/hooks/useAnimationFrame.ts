import { useRef, useCallback, useEffect } from 'react';

/**
 * rAF loop hook. Accepts callback, returns start/stop controls.
 */
export function useAnimationFrame(callback: (time: number) => void) {
  const requestRef = useRef<number | null>(null);
  const callbackRef = useRef(callback);
  const isRunning = useRef(false);

  // Keep callback ref fresh
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const loop = useCallback((time: number) => {
    callbackRef.current(time);
    if (isRunning.current) {
      requestRef.current = requestAnimationFrame(loop);
    }
  }, []);

  const start = useCallback(() => {
    if (!isRunning.current) {
      isRunning.current = true;
      requestRef.current = requestAnimationFrame(loop);
    }
  }, [loop]);

  const stop = useCallback(() => {
    isRunning.current = false;
    if (requestRef.current !== null) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => stop();
  }, [stop]);

  return { start, stop };
}
