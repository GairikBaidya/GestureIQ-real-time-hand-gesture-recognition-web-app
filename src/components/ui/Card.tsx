import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { fadeUp } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  hover?: boolean;
}

export function Card({ children, className, active = false, hover = true }: CardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={reducedMotion ? {} : fadeUp}
      initial="hidden"
      animate="visible"
      whileHover={hover && !reducedMotion ? { y: -4, boxShadow: '0 8px 32px rgba(79,70,229,0.18)' } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={twMerge(
        clsx(
          'bg-bg-surface rounded-card border border-[rgba(15,23,42,0.08)] shadow-card p-6',
          active && 'ring-2 ring-accent-primary',
          className
        )
      )}
    >
      {children}
    </motion.div>
  );
}
