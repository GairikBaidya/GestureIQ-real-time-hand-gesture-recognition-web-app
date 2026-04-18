import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { springScale } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'lime' | 'amber' | 'coral' | 'violet' | 'indigo' | 'cyan';
  className?: string;
}

const colorMap = {
  lime: 'bg-accent-lime/20 text-green-800 border-accent-lime/30',
  amber: 'bg-accent-amber/20 text-amber-800 border-accent-amber/30',
  coral: 'bg-accent-coral/20 text-red-800 border-accent-coral/30',
  violet: 'bg-accent-violet/20 text-violet-800 border-accent-violet/30',
  indigo: 'bg-accent-primary/20 text-indigo-800 border-accent-primary/30',
  cyan: 'bg-accent-electric/20 text-cyan-800 border-accent-electric/30',
};

export function Badge({ children, color = 'indigo', className }: BadgeProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.span
      variants={reducedMotion ? {} : springScale}
      initial="hidden"
      animate="visible"
      className={twMerge(
        clsx(
          'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium font-body border',
          colorMap[color],
          className
        )
      )}
    >
      {children}
    </motion.span>
  );
}
