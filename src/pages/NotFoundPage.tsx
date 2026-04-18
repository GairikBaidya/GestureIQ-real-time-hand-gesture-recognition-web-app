import React from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '../constants/animations';

export function NotFoundPage() {
  return (
    <motion.main
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="text-center">
        <div className="text-8xl mb-6">🤷</div>
        <h1 className="text-6xl font-brand font-extrabold text-text-primary mb-4">404</h1>
        <p className="text-xl text-text-secondary mb-8">
          This page doesn't exist. Maybe try a different gesture?
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-accent-primary text-white rounded-button font-brand font-bold hover:bg-indigo-700 transition-colors"
        >
          Go Home
        </a>
      </div>
    </motion.main>
  );
}
