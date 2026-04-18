export type CameraStatus = 'idle' | 'requesting' | 'active' | 'error';

export interface CameraDevice {
  deviceId: string;
  label: string;
}

export interface CameraState {
  status: CameraStatus;
  stream: MediaStream | null;
  selectedDeviceId: string | null;
  devices: CameraDevice[];
  error: string | null;
}
