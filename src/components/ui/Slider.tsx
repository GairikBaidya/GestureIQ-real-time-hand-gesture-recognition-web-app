import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  label?: string;
  className?: string;
}

export function Slider({
  value,
  min = 0,
  max = 1,
  step = 0.05,
  onChange,
  label,
  className,
}: SliderProps) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className={twMerge(clsx('flex flex-col gap-2', className))}>
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-text-secondary">{label}</span>
          <span className="text-sm font-mono text-text-muted">{value.toFixed(2)}</span>
        </div>
      )}
      <div className="relative w-full h-2">
        <div className="absolute inset-0 bg-gray-200 rounded-full" />
        <div
          className="absolute inset-y-0 left-0 bg-accent-primary rounded-full transition-all duration-75"
          style={{ width: `${percent}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
          aria-label={label}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-accent-primary rounded-full shadow-md pointer-events-none transition-all duration-75"
          style={{ left: `calc(${percent}% - 10px)` }}
        />
      </div>
    </div>
  );
}
