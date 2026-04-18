import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { springScale } from '../../constants/animations';
import { CountdownRing } from './CountdownRing';
import { SuccessConfetti } from './SuccessConfetti';
import { useGestureStore } from '../../store/gestureStore';
import type { GestureDefinition } from '../../constants/gestures';

interface GestureChallengeProps {
  gesture: GestureDefinition;
  onClose: () => void;
}

export function GestureChallenge({ gesture, onClose }: GestureChallengeProps) {
  const [status, setStatus] = useState<'waiting' | 'active' | 'success' | 'timeout'>('waiting');
  const currentGesture = useGestureStore((s) => s.currentGesture);

  // Start challenge
  const startChallenge = useCallback(() => {
    setStatus('active');
  }, []);

  // Check for match
  useEffect(() => {
    if (status === 'active' && currentGesture?.gesture === gesture.name) {
      setStatus('success');
    }
  }, [currentGesture, gesture.name, status]);

  const handleTimeout = useCallback(() => {
    if (status === 'active') {
      setStatus('timeout');
    }
  }, [status]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        variants={springScale}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="bg-bg-surface rounded-card shadow-2xl p-8 max-w-md w-full mx-4 text-center relative overflow-hidden"
        layoutId={`gesture-card-${gesture.name}`}
      >
        {status === 'success' && <SuccessConfetti />}

        <div className="text-6xl mb-4">{gesture.emoji}</div>
        <h3 className="text-2xl font-brand font-bold text-text-primary mb-2">
          {gesture.name}
        </h3>
        <p className="text-text-secondary mb-6">{gesture.description}</p>

        {status === 'waiting' && (
          <button
            onClick={startChallenge}
            className="px-6 py-3 bg-accent-primary text-white rounded-button font-brand font-bold hover:bg-indigo-700 transition-colors"
          >
            Start Challenge
          </button>
        )}

        {status === 'active' && (
          <div className="flex flex-col items-center gap-4">
            <CountdownRing duration={5} isActive onComplete={handleTimeout} />
            <p className="text-sm text-text-muted">Show the gesture to your camera!</p>
          </div>
        )}

        {status === 'success' && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.1, 1] }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <span className="text-4xl">🎉</span>
            <p className="text-lg font-brand font-bold text-accent-lime mt-2">
              Nice! You got it!
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-gray-100 rounded-button text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Done
            </button>
          </motion.div>
        )}

        {status === 'timeout' && (
          <div className={status === 'timeout' ? 'gentle-shake' : ''}>
            <p className="text-lg font-brand font-bold text-accent-coral mb-4">
              Time's up!
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setStatus('waiting')}
                className="px-6 py-2 bg-accent-primary text-white rounded-button text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-100 rounded-button text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
