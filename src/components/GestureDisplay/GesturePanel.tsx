import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassPanel } from '../ui/GlassPanel';
import { GestureLabel } from './GestureLabel';
import { ConfidenceBar } from './ConfidenceBar';
import { HandIndicator } from './HandIndicator';
import { GestureHistory } from './GestureHistory';
import { useGestureStore } from '../../store/gestureStore';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useSettingsStore } from '../../store/settingsStore';

export function GesturePanel() {
  const { currentGesture, history } = useGestureStore();
  const showLabel = useSettingsStore((s) => s.showGestureLabel);
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      {currentGesture && currentGesture.gesture !== 'Unknown' && (
        <motion.div
          initial={reducedMotion ? {} : { x: 40, opacity: 0 }}
          animate={reducedMotion ? {} : { x: 0, opacity: 1 }}
          exit={reducedMotion ? {} : { x: 40, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="w-full"
        >
          <GlassPanel className="p-6 space-y-4">
            {showLabel && (
              <GestureLabel
                gesture={currentGesture.gesture}
                emoji={getEmoji(currentGesture.gesture)}
              />
            )}
            <ConfidenceBar confidence={currentGesture.confidence} />
            <HandIndicator hand={currentGesture.hand} />
            <GestureHistory history={history} />
          </GlassPanel>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function getEmoji(gesture: string): string {
  const map: Record<string, string> = {
    'Open Hand': '🖐️',
    'Fist': '✊',
    'Thumbs Up': '👍',
    'Thumbs Down': '👎',
    'Peace': '✌️',
    'Point': '👆',
    'OK Sign': '👌',
    'Rock On': '🤘',
    'Call Me': '🤙',
    'Three Fingers': '🤟',
  };
  return map[gesture] ?? '❓';
}
