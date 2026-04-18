import React, { useRef, useEffect } from 'react';

interface CameraViewProps {
  stream: MediaStream | null;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  children?: React.ReactNode;
}

export function CameraView({ stream, videoRef, children }: CameraViewProps) {
  useEffect(() => {
    const video = videoRef.current;
    if (video && stream) {
      video.srcObject = stream;
    }
  }, [stream, videoRef]);

  return (
    <div className="relative w-full aspect-[4/3] bg-gray-900 rounded-card overflow-hidden">
      <video
        ref={videoRef as React.RefObject<HTMLVideoElement>}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: 'scaleX(-1)' }}
      />
      {/* Canvas overlay and other children layered on top */}
      {children}
    </div>
  );
}
