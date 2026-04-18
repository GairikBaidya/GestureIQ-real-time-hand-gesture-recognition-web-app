import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  onClick,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  const reducedMotion = useReducedMotion();

  const base =
    'inline-flex items-center justify-center font-semibold font-brand transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary: 'bg-accent-primary text-white hover:bg-indigo-700 shadow-card',
    secondary:
      'bg-transparent border-2 border-accent-primary text-accent-primary hover:bg-accent-primary/10',
    ghost: 'bg-transparent text-text-secondary hover:bg-gray-100',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-button',
    lg: 'px-8 py-4 text-lg rounded-button',
  };

  return (
    <motion.button
      whileHover={reducedMotion ? {} : { scale: 1.02 }}
      whileTap={reducedMotion ? {} : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={twMerge(clsx(base, variants[variant], sizes[size], className))}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </motion.button>
  );
}
