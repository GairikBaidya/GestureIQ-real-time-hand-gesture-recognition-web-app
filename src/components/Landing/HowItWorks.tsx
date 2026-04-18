import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const STEPS = [
  {
    step: '01',
    title: 'Allow Camera',
    description: 'Grant access to your webcam. Nothing is recorded or sent anywhere.',
    icon: '📷',
  },
  {
    step: '02',
    title: 'Show a Gesture',
    description: 'Hold up your hand and make one of the 10 built-in gestures.',
    icon: '✋',
  },
  {
    step: '03',
    title: 'See Results',
    description: 'GestureIQ recognizes your gesture in real-time with confidence scores.',
    icon: '✨',
  },
];

export function HowItWorks() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-transparent to-accent-primary/5">
      <div className="max-w-content mx-auto">
        <motion.h2
          variants={reducedMotion ? {} : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-brand font-bold text-text-primary text-center mb-16"
        >
          How It Works
        </motion.h2>

        <motion.div
          variants={reducedMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.step}
              variants={reducedMotion ? {} : fadeUp}
              className="text-center relative"
            >
              {/* Connector line */}
              {idx < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent-primary/30 to-transparent" />
              )}

              <div className="w-24 h-24 mx-auto mb-6 bg-accent-primary/10 rounded-2xl flex items-center justify-center">
                <span className="text-4xl">{step.icon}</span>
              </div>
              <span className="text-sm font-mono text-accent-primary font-bold">
                Step {step.step}
              </span>
              <h3 className="text-xl font-brand font-bold text-text-primary mt-2 mb-3">
                {step.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
