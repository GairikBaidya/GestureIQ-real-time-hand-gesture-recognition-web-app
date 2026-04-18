import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { GestureDefinition } from '../../constants/gestures';

interface GestureCardProps {
  gesture: GestureDefinition;
  onClick: () => void;
  index: number;
}

export function GestureCard({ gesture, onClick, index }: GestureCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.button
      variants={reducedMotion ? {} : fadeUp}
      whileHover={reducedMotion ? {} : { y: -4, boxShadow: '0 8px 32px rgba(79,70,229,0.18)' }}
      whileTap={reducedMotion ? {} : { scale: 0.98 }}
      onClick={onClick}
      className="bg-bg-surface rounded-card border border-[rgba(15,23,42,0.08)] shadow-card p-6 text-left transition-shadow cursor-pointer w-full"
      layoutId={`gesture-card-${gesture.name}`}
    >
      <div className="text-5xl mb-4">{gesture.emoji}</div>
      <h3 className="text-lg font-brand font-bold text-text-primary mb-2">{gesture.name}</h3>
      <p className="text-sm text-text-secondary leading-relaxed">{gesture.description}</p>
      <div className="mt-4 text-xs text-accent-primary font-medium">
        Click to practice →
      </div>
    </motion.button>
  );
}
