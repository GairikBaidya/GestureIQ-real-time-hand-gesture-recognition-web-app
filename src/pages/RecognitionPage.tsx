import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '../constants/animations';
import { CameraView, CameraSelector, CameraError, CameraLoader } from '../components/Camera';
import { GesturePanel } from '../components/GestureDisplay/GesturePanel';
import { LandmarkCanvas } from '../components/LandmarkOverlay/LandmarkCanvas';
import { SettingsPanel } from '../components/Settings/SettingsPanel';
import { Spinner } from '../components/ui/Spinner';
import { useCamera } from '../hooks/useCamera';
import { useMediaPipe } from '../hooks/useMediaPipe';
import { useGestureClassifier } from '../hooks/useGestureClassifier';
import { useSettingsStore } from '../store/settingsStore';

export function RecognitionPage() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const showOverlay = useSettingsStore((s) => s.showOverlay);

  const {
    status,
    stream,
    selectedDeviceId,
    devices,
    error,
    startCamera,
    switchCamera,
  } = useCamera();

  const isActive = status === 'active';
  const { landmarks, handedness, modelReady, modelLoading } = useMediaPipe(videoRef, isActive);
  useGestureClassifier(landmarks, handedness);

  return (
    <motion.main
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-20 pb-8 px-4 md:px-8 max-w-content mx-auto"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-brand font-bold text-text-primary">
            Gesture Recognition
          </h1>
          {modelLoading && (
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <Spinner size={16} />
              Loading model...
            </div>
          )}
          {modelReady && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-lime/20 text-green-800 rounded-full text-xs font-medium">
              <span className="w-2 h-2 bg-accent-lime rounded-full" />
              Model Ready
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <CameraSelector
            devices={devices}
            selectedDeviceId={selectedDeviceId}
            onSelect={switchCamera}
          />
          <button
            onClick={() => setSettingsOpen(true)}
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
            aria-label="Open settings"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 13a3 3 0 100-6 3 3 0 000 6z" />
              <path d="M16.5 10a6.5 6.5 0 01-.35 2.1l1.75 1.37a.5.5 0 01.12.64l-1.66 2.87a.5.5 0 01-.61.22l-2.07-.83a6.5 6.5 0 01-1.76 1.02l-.31 2.2a.5.5 0 01-.5.41H8.89a.5.5 0 01-.5-.41l-.31-2.2a6.5 6.5 0 01-1.76-1.02l-2.07.83a.5.5 0 01-.61-.22L1.98 14.1a.5.5 0 01.12-.64l1.75-1.37A6.5 6.5 0 013.5 10c0-.72.12-1.42.35-2.1L2.1 6.54a.5.5 0 01-.12-.64l1.66-2.87a.5.5 0 01.61-.22l2.07.83a6.5 6.5 0 011.76-1.02l.31-2.2A.5.5 0 018.89.01h3.22a.5.5 0 01.5.41l.31 2.2a6.5 6.5 0 011.76 1.02l2.07-.83a.5.5 0 01.61.22l1.66 2.87a.5.5 0 01-.12.64l-1.75 1.37c.23.68.35 1.38.35 2.1z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Camera column */}
        <div className="lg:col-span-3">
          {status === 'idle' && (
            <div className="w-full aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 rounded-card flex items-center justify-center border border-[rgba(15,23,42,0.08)]">
              <div className="text-center">
                <div className="text-6xl mb-4">📷</div>
                <h3 className="text-lg font-brand font-bold text-text-primary mb-2">
                  Ready to detect gestures
                </h3>
                <p className="text-sm text-text-secondary mb-6">
                  Grant camera access to start real-time recognition
                </p>
                <button
                  onClick={() => startCamera()}
                  className="px-6 py-3 bg-accent-primary text-white rounded-button font-brand font-bold hover:bg-indigo-700 transition-colors glow-pulse"
                >
                  Enable Camera
                </button>
              </div>
            </div>
          )}

          {status === 'requesting' && <CameraLoader />}

          {status === 'error' && (
            <CameraError error={error ?? 'Unknown error'} onRetry={() => startCamera()} />
          )}

          {status === 'active' && (
            <CameraView stream={stream} videoRef={videoRef}>
              {showOverlay && landmarks && (
                <LandmarkCanvas landmarks={landmarks} width={640} height={480} />
              )}
            </CameraView>
          )}
        </div>

        {/* Results column */}
        <div className="lg:col-span-2">
          <GesturePanel />

          {/* Placeholder when no gesture */}
          {status === 'active' && !landmarks && (
            <div className="bg-bg-surface rounded-card border border-[rgba(15,23,42,0.08)] shadow-card p-8 text-center">
              <div className="text-5xl mb-4 breathing">👋</div>
              <h3 className="text-lg font-brand font-bold text-text-primary mb-2">
                Show your hand
              </h3>
              <p className="text-sm text-text-secondary">
                Hold your hand up in front of the camera to start detecting gestures.
              </p>
            </div>
          )}
        </div>
      </div>

      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </motion.main>
  );
}
