import { create } from 'zustand';
import type { CameraDevice, CameraStatus } from '../types/camera';

interface CameraStore {
  status: CameraStatus;
  stream: MediaStream | null;
  selectedDeviceId: string | null;
  devices: CameraDevice[];
  error: string | null;
  setStatus: (status: CameraStatus) => void;
  setStream: (stream: MediaStream | null) => void;
  setSelectedDeviceId: (id: string | null) => void;
  setDevices: (devices: CameraDevice[]) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useCameraStore = create<CameraStore>((set) => ({
  status: 'idle',
  stream: null,
  selectedDeviceId: null,
  devices: [],
  error: null,
  setStatus: (status) => set({ status }),
  setStream: (stream) => set({ stream }),
  setSelectedDeviceId: (id) => set({ selectedDeviceId: id }),
  setDevices: (devices) => set({ devices }),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      status: 'idle',
      stream: null,
      selectedDeviceId: null,
      devices: [],
      error: null,
    }),
}));
