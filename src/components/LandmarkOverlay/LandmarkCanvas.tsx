import React, { useRef, useEffect } from 'react';
import { drawSkeleton } from '../../lib/drawing/skeleton';
import type { NormalizedLandmarkList } from '../../lib/mediapipe/types';

interface LandmarkCanvasProps {
  landmarks: NormalizedLandmarkList | null;
  width: number;
  height: number;
}

export function LandmarkCanvas({ landmarks, width, height }: LandmarkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (landmarks && landmarks.length > 0) {
      drawSkeleton(ctx, landmarks, width, height);
    } else {
      ctx.clearRect(0, 0, width, height);
    }
  }, [landmarks, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ transform: 'scaleX(-1)' }}
    />
  );
}
