import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { springScale } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface GestureLabelProps {
  gesture: string;
  emoji: string;
}

export function GestureLabel({ gesture, emoji }: GestureLabelProps) {
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={gesture}
        variants={reducedMotion ? {} : springScale}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex items-center gap-3"
      >
        <span className="text-4xl">{emoji}</span>
        <h2 className="text-[56px] leading-none font-brand font-extrabold text-text-primary">
          {gesture}
        </h2>
      </motion.div>
    </AnimatePresence>
  );
}
