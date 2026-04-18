import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '../../constants/animations';
import { Card } from '../ui/Card';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const FEATURES = [
  {
    icon: '⚡',
    title: 'Real-Time',
    description: 'Detect gestures at 24+ FPS with sub-100ms latency. No lag, no waiting.',
  },
  {
    icon: '🔒',
    title: 'Private',
    description: 'All processing happens in your browser. No video data ever leaves your device.',
  },
  {
    icon: '🧩',
    title: 'Extensible',
    description: 'Add custom gestures with just a few training samples. Export and share profiles.',
  },
];

export function FeatureCards() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="py-24 px-6">
      <div className="max-w-content mx-auto">
        <motion.h2
          variants={reducedMotion ? {} : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-brand font-bold text-text-primary text-center mb-16"
        >
          Why Gesture<span className="text-accent-primary">IQ</span>?
        </motion.h2>

        <motion.div
          variants={reducedMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {FEATURES.map((feature) => (
            <motion.div key={feature.title} variants={reducedMotion ? {} : fadeUp}>
              <Card className="text-center h-full">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-brand font-bold text-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
