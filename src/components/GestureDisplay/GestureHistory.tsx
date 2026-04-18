import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GestureResult } from '../../types/gesture';

interface GestureHistoryProps {
  history: GestureResult[];
}

const gestureEmojis: Record<string, string> = {
  'Open Hand': '🖐️', 'Fist': '✊', 'Thumbs Up': '👍', 'Thumbs Down': '👎',
  'Peace': '✌️', 'Point': '👆', 'OK Sign': '👌', 'Rock On': '🤘',
  'Call Me': '🤙', 'Three Fingers': '🤟',
};

export function GestureHistory({ history }: GestureHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="space-y-2">
      <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
        Recent
      </span>
      <div className="flex gap-2 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {history.map((item, idx) => (
            <motion.div
              key={`${item.gesture}-${item.timestamp}`}
              layout
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-1.5 text-xs font-medium text-text-secondary whitespace-nowrap"
            >
              <span>{gestureEmojis[item.gesture] ?? '❓'}</span>
              <span>{item.gesture}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
