// MediaPipe hand connections — pairs of landmark indices
export const HAND_CONNECTIONS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],       // Thumb
  [0, 5], [5, 6], [6, 7], [7, 8],       // Index
  [0, 9], [9, 10], [10, 11], [11, 12],  // Middle
  [0, 13], [13, 14], [14, 15], [15, 16],// Ring
  [0, 17], [17, 18], [18, 19], [19, 20],// Pinky
  [5, 9], [9, 13], [13, 17],            // Palm
];

// Drawing colors
export const SKELETON_COLOR = '#6EE7F7'; // --color-accent-electric (cyan)
export const SKELETON_OPACITY = 0.6;
export const LANDMARK_COLOR = '#FFFFFF';
export const LANDMARK_RADIUS = 4;
export const CONNECTION_WIDTH = 2;
