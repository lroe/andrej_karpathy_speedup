export const WIDTH = 1920;
export const HEIGHT = 1080;
export const FPS = 30;

export const C = {
  bg: '#282A36',
  fg: '#F8F8F2',
  line: '#44475A',
  panel: '#313342',
  well: '#1E1F29',
  dim: '#B8B9C5',
  red: '#FF5555',
  green: '#50FA7B',
  pink: '#FF79C6',
  purple: '#BD93F9',
  cyan: '#8BE9FD',
  orange: '#FFB86C',
  yellow: '#F1FA8C',
} as const;

export const FONT = {
  hand: '"Patrick Hand", "Caveat", sans-serif',
  display: '"Caveat", "Patrick Hand", sans-serif',
} as const;

export const sec = (seconds: number) => Math.round(seconds * FPS);
