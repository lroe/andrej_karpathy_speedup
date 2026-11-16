import React from 'react';
import {AbsoluteFill, Composition} from 'remotion';
import {Video} from './Video';
import {C, FPS, HEIGHT, WIDTH} from './theme';

const Video2K: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: C.bg, overflow: 'hidden'}}>
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        transform: `scale(${2560 / WIDTH})`,
        transformOrigin: 'top left',
      }}
    >
      <Video />
    </div>
  </AbsoluteFill>
);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="GpuKitchen"
      component={Video}
      durationInFrames={Math.round(565.5 * FPS)}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
    <Composition
      id="GpuKitchen2K"
      component={Video2K}
      durationInFrames={Math.round(565.5 * FPS)}
      fps={FPS}
      width={2560}
      height={1440}
    />
  </>
);
