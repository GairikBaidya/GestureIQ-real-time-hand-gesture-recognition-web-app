import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-[rgba(255,255,255,0.65)] backdrop-blur-[16px] border border-[rgba(15,23,42,0.08)] rounded-card',
          className
        )
      )}
    >
      {children}
    </div>
  );
}
