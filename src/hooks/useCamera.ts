import { useCallback, useEffect, useRef } from 'react';
import { useCameraStore } from '../store/cameraStore';

/**
 * Camera hook — getUserMedia, enumerate devices, manage stream lifecycle.
 * Pauses on visibilitychange.
 */
export function useCamera() {
  const {
    status,
    stream,
    selectedDeviceId,
    devices,
    error,
    setStatus,
    setStream,
    setSelectedDeviceId,
    setDevices,
    setError,
  } = useCameraStore();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const enumerateDevices = useCallback(async () => {
    try {
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = allDevices
        .filter((d) => d.kind === 'videoinput')
        .map((d) => ({ deviceId: d.deviceId, label: d.label || `Camera ${d.deviceId.slice(0, 4)}` }));
      setDevices(videoDevices);
    } catch {
      setDevices([]);
    }
  }, [setDevices]);

  const startCamera = useCallback(
    async (deviceId?: string) => {
      setStatus('requesting');
      setError(null);

      try {
        const constraints: MediaStreamConstraints = {
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user',
            ...(deviceId ? { deviceId: { exact: deviceId } } : {}),
          },
        };

        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        setStream(mediaStream);
        setStatus('active');
        setSelectedDeviceId(deviceId ?? mediaStream.getVideoTracks()[0]?.getSettings().deviceId ?? null);
        await enumerateDevices();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Camera access denied';
        setError(message);
        setStatus('error');
      }
    },
    [setStatus, setStream, setSelectedDeviceId, setError, enumerateDevices]
  );

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
    setStatus('idle');
  }, [stream, setStream, setStatus]);

  const switchCamera = useCallback(
    (deviceId: string) => {
      stopCamera();
      startCamera(deviceId);
    },
    [stopCamera, startCamera]
  );

  // Pause on tab hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && stream) {
        stream.getVideoTracks().forEach((t) => (t.enabled = false));
      } else if (!document.hidden && stream) {
        stream.getVideoTracks().forEach((t) => (t.enabled = true));
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [stream]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, [stream]);

  return {
    videoRef,
    status,
    stream,
    selectedDeviceId,
    devices,
    error,
    startCamera,
    stopCamera,
    switchCamera,
  };
}
