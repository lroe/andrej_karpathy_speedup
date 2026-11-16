import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export type Anim = {
  progress: number;
  opacity: number;
  scale: number;
};

/** Clamped 0→1 with an ease-out. */
export const ease = (frame: number, start: number, duration: number, easing = Easing.out(Easing.cubic)) => {
  return interpolate(frame, [start, start + Math.max(1, duration)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });
};

/** Draw progress helper: 0 before start, 1 after duration. */
export const draw = (frame: number, start: number, duration = 18) => ease(frame, start, duration);

/** Pop with spring; returns scale and opacity. */
export const pop = (frame: number, start: number, fps: number, config = {damping: 16, stiffness: 160, mass: 0.6}) => {
  const s = spring({frame: frame - start, fps, config});
  const opacity = ease(frame, start, 6);
  return {scale: 0.82 + 0.18 * s, opacity};
};

export const fadeOut = (frame: number, duration: number, frames = 6) =>
  interpolate(frame, [duration - frames, duration], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

export const sceneOpacity = (frame: number, duration: number, fadeFrames = 5) => {
  const inn = interpolate(frame, [0, fadeFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const out = interpolate(frame, [duration - fadeFrames - 1, duration - 1], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return Math.min(inn, out);
};

/** A local clock for a scene that starts at an absolute second. */
export const makeClock = (sceneStart: number, fps = 30) => (absoluteSeconds: number) =>
  Math.round((absoluteSeconds - sceneStart) * fps);

export const usePop = (start: number) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return pop(frame, start, fps);
};

export const pulse = (frame: number, start: number, period = 24) => {
  const x = ((frame - start) % period) / period;
  return 0.5 + 0.5 * Math.sin(x * Math.PI * 2);
};
