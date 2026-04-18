import React from 'react';
import { motion } from 'framer-motion';

interface CountdownRingProps {
  duration: number;
  isActive: boolean;
  onComplete?: () => void;
}

export function CountdownRing({ duration, isActive, onComplete }: CountdownRingProps) {
  const circumference = 2 * Math.PI * 45; // r=45

  return (
    <div className="relative w-32 h-32">
      <svg width="128" height="128" viewBox="0 0 128 128" className="-rotate-90">
        {/* Background ring */}
        <circle
          cx="64"
          cy="64"
          r="45"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="6"
        />
        {/* Progress ring */}
        <motion.circle
          cx="64"
          cy="64"
          r="45"
          fill="none"
          stroke="#4F46E5"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: 0 }}
          animate={isActive ? { strokeDashoffset: circumference } : { strokeDashoffset: 0 }}
          transition={{ duration, ease: 'linear' }}
          onAnimationComplete={() => {
            if (isActive && onComplete) onComplete();
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-2xl font-brand font-bold text-accent-primary"
        >
          {isActive ? '👀' : '▶'}
        </motion.span>
      </div>
    </div>
  );
}
