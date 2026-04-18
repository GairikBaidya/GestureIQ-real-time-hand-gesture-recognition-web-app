import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Option<T> {
  label: string;
  value: T;
}

interface SegmentedControlProps<T> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  const reducedMotion = useReducedMotion();
  const activeIndex = options.findIndex((o) => o.value === value);

  return (
    <div className="relative flex bg-gray-100 rounded-xl p-1">
      {/* Sliding indicator */}
      <motion.div
        className="absolute top-1 bottom-1 bg-white rounded-lg shadow-sm"
        animate={{ left: `calc(${(activeIndex / options.length) * 100}% + 4px)` }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { type: 'spring', stiffness: 400, damping: 30 }
        }
        style={{ width: `calc(${100 / options.length}% - 8px)` }}
      />
      {options.map((opt) => (
        <button
          key={String(opt.value)}
          onClick={() => onChange(opt.value)}
          className={`relative z-10 flex-1 py-2 text-sm font-medium text-center transition-colors rounded-lg ${
            value === opt.value ? 'text-accent-primary' : 'text-text-muted'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
