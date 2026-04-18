import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function HeroSection() {
  const reducedMotion = useReducedMotion();

  const letters = 'GestureIQ'.split('');

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent-electric/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-violet/5 rounded-full blur-3xl" />

      <motion.div
        variants={reducedMotion ? {} : staggerContainer}
        initial="hidden"
        animate="visible"
        className="text-center relative z-10 max-w-3xl"
      >
        {/* Wordmark — letter-by-letter animation */}
        <div className="flex items-center justify-center mb-6">
          {letters.map((letter, idx) => (
            <motion.span
              key={idx}
              initial={reducedMotion ? {} : { opacity: 0, scale: 0.8, y: 10 }}
              animate={reducedMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
                delay: idx * 0.03,
              }}
              className={`text-6xl md:text-8xl font-brand font-extrabold ${
                idx >= 7 ? 'text-accent-primary' : 'text-text-primary'
              }`}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Animated hand emoji placeholder (in place of Lottie) */}
        <motion.div
          animate={reducedMotion ? {} : {
            rotate: [0, 15, -15, 10, -10, 0],
            scale: [1, 1.1, 1, 1.05, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          className="text-8xl mb-8"
        >
          🖐️
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={reducedMotion ? {} : fadeUp}
          className="text-xl md:text-2xl text-text-secondary mb-10 leading-relaxed"
        >
          Real-time hand gesture recognition powered by AI.
          <br />
          <span className="text-accent-primary font-semibold">100% in-browser. Zero data sent.</span>
        </motion.p>

        {/* CTA */}
        <motion.div variants={reducedMotion ? {} : fadeUp}>
          <a
            href="/app"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent-primary text-white text-lg font-brand font-bold rounded-button shadow-card hover:bg-indigo-700 transition-colors glow-pulse"
          >
            Start GestureIQ
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
