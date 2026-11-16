import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {C, FPS} from './theme';
import {FontGate} from './components/Stage';
import {Scene01Hook} from './scenes/Scene01Hook';
import {Scene02Kitchen} from './scenes/Scene02Kitchen';
import {Scene03Kernel} from './scenes/Scene03Kernel';
import {Scene04VectorAdd} from './scenes/Scene04VectorAdd';
import {Scene05Stations} from './scenes/Scene05Stations';
import {Scene06Matrix} from './scenes/Scene06Matrix';
import {Scene07Tiles} from './scenes/Scene07Tiles';
import {Scene08Cublas} from './scenes/Scene08Cublas';
import {Scene09Karpathy} from './scenes/Scene09Karpathy';
import {Scene10Padding} from './scenes/Scene10Padding';
import {Scene11Pantry} from './scenes/Scene11Pantry';
import {Scene12SmallSteps} from './scenes/Scene12SmallSteps';
import {Scene13Fusion} from './scenes/Scene13Fusion';
import {Scene14Compile} from './scenes/Scene14Compile';
import {Scene15Chef} from './scenes/Scene15Chef';
import {Scene16Batch} from './scenes/Scene16Batch';
import {Scene17NvidiaSmi} from './scenes/Scene17NvidiaSmi';
import {Scene18Profiler} from './scenes/Scene18Profiler';
import {Scene19Diy} from './scenes/Scene19Diy';
import {Scene20Profile} from './scenes/Scene20Profile';
import {Scene21Bug} from './scenes/Scene21Bug';
import {Scene22Final} from './scenes/Scene22Final';

const scenes = [
  {from: 0, duration: 28.28, C: Scene01Hook},
  {from: 28.28, duration: 22.44, C: Scene02Kitchen},
  {from: 50.72, duration: 12.78, C: Scene03Kernel},
  {from: 63.5, duration: 16.38, C: Scene04VectorAdd},
  {from: 79.88, duration: 20.32, C: Scene05Stations},
  {from: 100.2, duration: 22.0, C: Scene06Matrix},
  {from: 122.2, duration: 31.4, C: Scene07Tiles},
  {from: 153.6, duration: 28.76, C: Scene08Cublas},
  {from: 182.36, duration: 31.34, C: Scene09Karpathy},
  {from: 213.7, duration: 19.5, C: Scene10Padding},
  {from: 233.2, duration: 31.66, C: Scene11Pantry},
  {from: 264.86, duration: 24.7, C: Scene12SmallSteps},
  {from: 289.56, duration: 22.38, C: Scene13Fusion},
  {from: 311.94, duration: 25.76, C: Scene14Compile},
  {from: 337.7, duration: 26.82, C: Scene15Chef},
  {from: 364.52, duration: 36.98, C: Scene16Batch},
  {from: 401.5, duration: 34.7, C: Scene17NvidiaSmi},
  {from: 436.2, duration: 15.12, C: Scene18Profiler},
  {from: 451.32, duration: 30.72, C: Scene19Diy},
  {from: 482.04, duration: 37.68, C: Scene20Profile},
  {from: 519.72, duration: 21.96, C: Scene21Bug},
  {from: 541.68, duration: 23.82, C: Scene22Final},
];

export const Video: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      <FontGate>
        <Audio src={staticFile('audio.wav')} />
        {scenes.map((s, i) => (
          <Sequence key={i} from={Math.round(s.from * FPS)} durationInFrames={Math.round(s.duration * FPS)}>
            <s.C />
          </Sequence>
        ))}
      </FontGate>
    </AbsoluteFill>
  );
};
