import React, {useEffect, useRef, useState} from 'react';
import {AbsoluteFill, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FPS} from '../theme';
import {sceneOpacity} from '../anim';

export const FontGate: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [handle] = useState(() => delayRender('Loading hand-drawn fonts'));
  const done = useRef(false);
  useEffect(() => {
    const finish = () => {
      if (!done.current) {
        done.current = true;
        continueRender(handle);
      }
    };
    Promise.all([
      document.fonts.load('400 40px "Patrick Hand"'),
      document.fonts.load('700 80px Caveat'),
      document.fonts.load('400 80px Caveat'),
      document.fonts.ready,
    ])
      .then(finish)
      .catch(finish);
    const timeout = window.setTimeout(finish, 3500);
    return () => window.clearTimeout(timeout);
  }, [handle]);
  return (
    <>
      <style>{`
        @font-face {
          font-family: 'Caveat';
          src: url('${staticFile('fonts/Caveat.ttf')}') format('truetype');
          font-weight: 400 700;
          font-display: block;
        }
        @font-face {
          font-family: 'Patrick Hand';
          src: url('${staticFile('fonts/PatrickHand-Regular.ttf')}') format('truetype');
          font-weight: 400;
          font-display: block;
        }
      `}</style>
      {children}
    </>
  );
};

export const SceneShell: React.FC<{duration: number; children: React.ReactNode; bg?: string}> = ({
  duration,
  children,
  bg = C.bg,
}) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, duration, 5);
  return (
    <AbsoluteFill style={{backgroundColor: bg, opacity}}>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
        {children}
      </svg>
    </AbsoluteFill>
  );
};

/** Sparse, near-invisible registration marks keep the dark field from feeling dead. */
export const RegistrationMarks: React.FC<{seed?: number; opacity?: number}> = ({seed = 1, opacity = 0.1}) => {
  const points = [
    [96, 92],
    [1824, 92],
    [96, 988],
    [1824, 988],
  ];
  return (
    <g opacity={opacity}>
      {points.map(([x, y], i) => (
        <g key={i} stroke={C.fg} strokeWidth={1.6}>
          <line x1={x - 8} y1={y} x2={x + 8} y2={y} />
          <line x1={x} y1={y - 8} x2={x} y2={y + 8} />
        </g>
      ))}
    </g>
  );
};

export const VignetteBackground: React.FC = () => {
  const {width, height} = useVideoConfig();
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{backgroundColor: C.bg, width, height}}>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080">
        <rect x="0" y="0" width="1920" height="1080" fill={C.bg} />
        <g opacity={0.035} stroke={C.fg} strokeWidth={1}>
          {Array.from({length: 13}).map((_, i) => (
            <line key={`v${i}`} x1={i * 160} y1={0} x2={i * 160} y2={1080} />
          ))}
          {Array.from({length: 8}).map((_, i) => (
            <line key={`h${i}`} x1={0} y1={i * 154} x2={1920} y2={i * 154} />
          ))}
        </g>
      </svg>
    </AbsoluteFill>
  );
};

export const sceneFrames = (startSeconds: number, endSeconds: number) => ({
  from: Math.round(startSeconds * FPS),
  durationInFrames: Math.max(1, Math.round((endSeconds - startSeconds) * FPS)),
});
