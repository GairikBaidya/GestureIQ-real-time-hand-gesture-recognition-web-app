import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CameraDevice } from '../../types/camera';

interface CameraSelectorProps {
  devices: CameraDevice[];
  selectedDeviceId: string | null;
  onSelect: (deviceId: string) => void;
}

export function CameraSelector({ devices, selectedDeviceId, onSelect }: CameraSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (devices.length <= 1) return null;

  const selectedLabel = devices.find((d) => d.deviceId === selectedDeviceId)?.label ?? 'Select Camera';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-bg-surface border border-[rgba(15,23,42,0.08)] rounded-xl text-sm font-medium text-text-secondary hover:bg-gray-50 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
        {selectedLabel}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-0 min-w-[200px] bg-bg-surface border border-[rgba(15,23,42,0.08)] rounded-xl shadow-card overflow-hidden z-20"
          >
            {devices.map((device) => (
              <button
                key={device.deviceId}
                onClick={() => {
                  onSelect(device.deviceId);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                  device.deviceId === selectedDeviceId
                    ? 'bg-accent-primary/10 text-accent-primary font-medium'
                    : 'text-text-secondary hover:bg-gray-50'
                }`}
              >
                {device.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
