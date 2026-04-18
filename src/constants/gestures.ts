export interface GestureDefinition {
  name: string;
  emoji: string;
  description: string;
}

export const GESTURES: GestureDefinition[] = [
  {
    name: 'Open Hand',
    emoji: '🖐️',
    description: 'All five fingers extended',
  },
  {
    name: 'Fist',
    emoji: '✊',
    description: 'All fingers curled',
  },
  {
    name: 'Thumbs Up',
    emoji: '👍',
    description: 'Thumb extended, others curled',
  },
  {
    name: 'Thumbs Down',
    emoji: '👎',
    description: 'Thumb pointing down, others curled',
  },
  {
    name: 'Peace',
    emoji: '✌️',
    description: 'Index and middle fingers extended in a V',
  },
  {
    name: 'Point',
    emoji: '👆',
    description: 'Index finger extended, others curled',
  },
  {
    name: 'OK Sign',
    emoji: '👌',
    description: 'Thumb and index form a circle',
  },
  {
    name: 'Rock On',
    emoji: '🤘',
    description: 'Index and pinky extended',
  },
  {
    name: 'Call Me',
    emoji: '🤙',
    description: 'Thumb and pinky extended',
  },
  {
    name: 'Three Fingers',
    emoji: '🤟',
    description: 'Index, middle, ring extended',
  },
];
