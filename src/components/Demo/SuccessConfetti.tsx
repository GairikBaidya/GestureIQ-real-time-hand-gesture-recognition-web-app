import React, { useMemo } from 'react';

const COLORS = ['#4F46E5', '#6EE7F7', '#A3E635', '#FBBF24', '#F87171', '#8B5CF6'];

export function SuccessConfetti() {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        color: COLORS[i % COLORS.length],
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 0.3}s`,
        angle: Math.random() * 360,
        size: 4 + Math.random() * 6,
      })),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti-particle"
          style={{
            backgroundColor: p.color,
            left: p.left,
            top: '50%',
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            transform: `rotate(${p.angle}deg)`,
          }}
        />
      ))}
    </div>
  );
}
