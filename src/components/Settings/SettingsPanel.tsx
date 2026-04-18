import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideInRight } from '../../constants/animations';
import { useSettings } from '../../hooks/useSettings';
import { Toggle } from '../ui/Toggle';
import { Slider } from '../ui/Slider';
import { SegmentedControl } from './SegmentedControl';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { settings, updateSetting } = useSettings();
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            variants={reducedMotion ? {} : slideInRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 h-full w-80 bg-bg-surface shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-brand font-bold text-text-primary">Settings</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close settings"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <hr className="border-[rgba(15,23,42,0.08)]" />

              {/* Toggles */}
              <Toggle
                label="Show Skeleton Overlay"
                checked={settings.showOverlay}
                onChange={(v) => updateSetting('showOverlay', v)}
              />
              <Toggle
                label="Show Gesture Label"
                checked={settings.showGestureLabel}
                onChange={(v) => updateSetting('showGestureLabel', v)}
              />

              <hr className="border-[rgba(15,23,42,0.08)]" />

              {/* Model Complexity */}
              <div>
                <span className="text-sm font-medium text-text-secondary block mb-3">
                  Model Complexity
                </span>
                <SegmentedControl
                  options={[
                    { label: 'Fast', value: 0 },
                    { label: 'Balanced', value: 1 },
                    { label: 'Accurate', value: 2 },
                  ]}
                  value={settings.modelComplexity}
                  onChange={(v) => updateSetting('modelComplexity', v as 0 | 1 | 2)}
                />
              </div>

              <hr className="border-[rgba(15,23,42,0.08)]" />

              {/* Sliders */}
              <Slider
                label="Detection Confidence"
                value={settings.minDetectionConfidence}
                min={0.1}
                max={1.0}
                step={0.05}
                onChange={(v) => updateSetting('minDetectionConfidence', v)}
              />
              <Slider
                label="Tracking Confidence"
                value={settings.minTrackingConfidence}
                min={0.1}
                max={1.0}
                step={0.05}
                onChange={(v) => updateSetting('minTrackingConfidence', v)}
              />

              <hr className="border-[rgba(15,23,42,0.08)]" />

              {/* Max Hands */}
              <Toggle
                label="Detect Two Hands"
                checked={settings.maxNumHands === 2}
                onChange={(v) => updateSetting('maxNumHands', v ? 2 : 1)}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
