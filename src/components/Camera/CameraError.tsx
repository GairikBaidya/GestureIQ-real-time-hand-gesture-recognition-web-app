import React from 'react';
import { Card } from '../ui/Card';

interface CameraErrorProps {
  error: string;
  onRetry?: () => void;
}

export function CameraError({ error, onRetry }: CameraErrorProps) {
  return (
    <div className="w-full aspect-[4/3] bg-gray-50 rounded-card flex items-center justify-center">
      <Card className="max-w-sm text-center" hover={false}>
        <div className="text-4xl mb-4">📷</div>
        <h3 className="text-lg font-brand font-bold text-text-primary mb-2">
          Camera Access Required
        </h3>
        <p className="text-sm text-text-secondary mb-4">
          {error.includes('denied') || error.includes('NotAllowed')
            ? 'Camera permission was denied. Please enable it in your browser settings.'
            : error}
        </p>
        <div className="text-xs text-text-muted space-y-1 mb-4">
          <p>1. Click the camera icon in your browser's address bar</p>
          <p>2. Select "Allow" for camera access</p>
          <p>3. Refresh the page</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-accent-primary text-white rounded-button text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        )}
      </Card>
    </div>
  );
}
