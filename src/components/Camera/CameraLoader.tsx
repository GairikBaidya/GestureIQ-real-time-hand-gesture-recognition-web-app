import React from 'react';

export function CameraLoader() {
  return (
    <div className="w-full aspect-[4/3] rounded-card overflow-hidden">
      <div className="w-full h-full shimmer bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3 animate-pulse">📹</div>
          <p className="text-sm text-text-muted font-medium">Initializing camera...</p>
        </div>
      </div>
    </div>
  );
}
