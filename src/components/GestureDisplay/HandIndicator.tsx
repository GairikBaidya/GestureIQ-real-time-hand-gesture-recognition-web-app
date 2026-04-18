import React from 'react';
import { Badge } from '../ui/Badge';

interface HandIndicatorProps {
  hand: 'Left' | 'Right';
}

export function HandIndicator({ hand }: HandIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-text-secondary">Hand:</span>
      <Badge color="cyan">{hand === 'Left' ? '🫲 Left' : '🫱 Right'}</Badge>
    </div>
  );
}
