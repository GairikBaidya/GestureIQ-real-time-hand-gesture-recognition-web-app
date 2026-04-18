import React from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '../constants/animations';
import { HeroSection } from '../components/Landing/HeroSection';
import { FeatureCards } from '../components/Landing/FeatureCards';
import { HowItWorks } from '../components/Landing/HowItWorks';

export function LandingPage() {
  return (
    <motion.main
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <HeroSection />
      <FeatureCards />
      <HowItWorks />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[rgba(15,23,42,0.08)]">
        <div className="max-w-content mx-auto text-center">
          <p className="text-sm text-text-muted">
            Built with{' '}
            <span className="text-accent-primary font-medium">Google Antigravity</span>
            {' + '}
            <span className="text-accent-violet font-medium">Stitch MCP</span>
            {' + '}
            <span className="text-accent-electric font-medium">MediaPipe</span>
            {' + '}
            <span className="font-medium">Framer Motion</span>
          </p>
          <p className="text-xs text-text-muted mt-2">
            © {new Date().getFullYear()} GestureIQ. All processing runs locally.
          </p>
        </div>
      </footer>
    </motion.main>
  );
}
