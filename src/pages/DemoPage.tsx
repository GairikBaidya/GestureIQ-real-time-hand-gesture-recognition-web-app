import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pageTransition, staggerContainer, fadeUp } from '../constants/animations';
import { GESTURES } from '../constants/gestures';
import { GestureCard } from '../components/Demo/GestureCard';
import { GestureChallenge } from '../components/Demo/GestureChallenge';
import { useReducedMotion } from '../hooks/useReducedMotion';
import type { GestureDefinition } from '../constants/gestures';

export function DemoPage() {
  const [activeChallenge, setActiveChallenge] = useState<GestureDefinition | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <motion.main
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-24 pb-16 px-4 md:px-8 max-w-content mx-auto"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-brand font-bold text-text-primary mb-4">
          Gesture Library
        </h1>
        <p className="text-lg text-text-secondary max-w-xl mx-auto">
          Explore all 10 built-in gestures. Click any card to practice with a live challenge.
        </p>
      </div>

      <motion.div
        variants={reducedMotion ? {} : staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {GESTURES.map((gesture, idx) => (
          <GestureCard
            key={gesture.name}
            gesture={gesture}
            index={idx}
            onClick={() => setActiveChallenge(gesture)}
          />
        ))}
      </motion.div>

      <AnimatePresence>
        {activeChallenge && (
          <GestureChallenge
            gesture={activeChallenge}
            onClose={() => setActiveChallenge(null)}
          />
        )}
      </AnimatePresence>
    </motion.main>
  );
}
