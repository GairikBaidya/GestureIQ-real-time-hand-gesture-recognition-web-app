import React from 'react';
import { Badge } from '../ui/Badge';

interface ConfidenceBarProps {
  confidence: number;
}

function getColor(confidence: number): 'lime' | 'amber' | 'coral' {
  if (confidence >= 0.85) return 'lime';
  if (confidence >= 0.65) return 'amber';
  return 'coral';
}

function getLabel(confidence: number): string {
  if (confidence >= 0.85) return 'High';
  if (confidence >= 0.65) return 'Medium';
  return 'Low';
}

export function ConfidenceBar({ confidence }: ConfidenceBarProps) {
  const color = getColor(confidence);
  const percent = Math.round(confidence * 100);

  const barColors = {
    lime: 'bg-accent-lime',
    amber: 'bg-accent-amber',
    coral: 'bg-accent-coral',
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text-secondary">Confidence</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono text-text-muted">{percent}%</span>
          <Badge color={color}>{getLabel(confidence)}</Badge>
        </div>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${barColors[color]}`}
          style={{
            width: `${percent}%`,
            transition: 'width 80ms linear',
          }}
        />
      </div>
    </div>
  );
}
