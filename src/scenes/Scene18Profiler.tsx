import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FPS} from '../theme';
import {SceneShell, RegistrationMarks} from '../components/Stage';
import {InkCircle, InkLine, InkPath, InkRect, Label, Panel} from '../components/Ink';

const start = 436.2;
const end = 451.32;

export const Scene18Profiler: React.FC = () => {
  const frame = useCurrentFrame();
  const t = (s: number) => Math.round((s - start) * FPS);
  const fade = (show: number, hide?: number, dur = 8) => {
    const inn = interpolate(frame, [t(show), t(show) + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    if (hide === undefined) return inn;
    const out = interpolate(frame, [t(hide) - dur, t(hide)], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    return Math.min(inn, out);
  };
  const playX = interpolate(frame, [t(440.8), t(446.2)], [300, 1560], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const bars = [
    {x: 300, w: 160, color: C.purple},
    {x: 500, w: 90, color: C.cyan},
    {x: 650, w: 190, color: C.green},
    {x: 920, w: 120, color: C.cyan},
    {x: 1110, w: 170, color: C.pink},
    {x: 1350, w: 210, color: C.purple},
  ];

  return (
    <SceneShell duration={Math.round((end - start) * FPS)}>
      <RegistrationMarks />

      {/* Camera and profiler */}
      <g opacity={fade(436.2)}>
        <InkRect x={280} y={230} w={190} h={120} r={12} stroke={C.fg} width={4} fill={C.panel} fillOpacity={0.8} start={t(436.2)} dur={12} />
        <InkCircle cx={375} cy={290} r={30} stroke={C.cyan} width={4} start={t(436.5)} dur={10} />
        <InkCircle cx={375} cy={290} r={12} stroke={C.cyan} width={3} start={t(436.8)} dur={8} fill={C.cyan} fillOpacity={0.15} />
        <InkPath d="M 280 250 L 240 230 L 240 350 L 280 330" stroke={C.fg} width={4} start={t(436.4)} dur={10} />
        <Label x={375} y={385} align="center" size={40} color={C.cyan} start={t(437.0)}>
          PROFILER
        </Label>

        <Panel x={700} y={250} w={620} h={150} fill={C.well} stroke={C.line} start={t(436.7)} dur={10} />
        <Label x={740} y={300} size={36} color={C.dim} start={t(436.9)}>
          torch.profiler
        </Label>
        <Label x={740} y={360} size={40} font="mono" color={C.green} start={t(437.2)}>
          record a trace
        </Label>

        {/* Trace timeline */}
        <Panel x={240} y={455} w={1440} h={330} fill={C.panel} stroke={C.line} start={t(440.6)} dur={12} />
        <Label x={280} y={510} size={38} color={C.dim} start={t(440.8)}>
          GPU TIMELINE
        </Label>
        <Label x={1640} y={510} align="right" size={36} color={C.cyan} start={t(441.2)}>
          kernels
        </Label>
        {bars.map((b, i) => (
          <InkRect key={i} x={b.x} y={560} w={b.w} h={64} r={5} stroke={b.color} width={3} fill={b.color} fillOpacity={0.2} start={t(441.0 + i * 0.18)} dur={9} />
        ))}
        {[
          [460, 40],
          [590, 60],
          [840, 80],
          [1040, 70],
          [1280, 70],
          [1560, 60],
        ].map(([x, w], i) => (
          <g key={`gap${i}`}>
            <InkRect x={x} y={560} w={w} h={64} r={5} stroke={C.red} width={2.5} start={t(443.4 + i * 0.1)} dur={7} fill={C.red} fillOpacity={0.08} />
          </g>
        ))}
        <Label x={960} y={690} align="center" size={36} color={C.red} start={t(445.8)}>
          gaps = nothing ran
        </Label>
        <InkLine x1={playX} y1={540} x2={playX} y2={730} stroke={C.yellow} width={3} start={t(441.0)} dur={4} />
        <Label x={960} y={745} align="center" size={38} color={C.yellow} start={t(445.4)}>
          one bar = one kernel
        </Label>

        <g opacity={fade(446.3)}>
          <Label x={960} y={810} align="center" size={46} color={C.red} start={t(446.4)}>
            the gaps are the story
          </Label>
        </g>

        <g opacity={fade(448.1)}>
          <Label x={960} y={930} align="center" size={40} color={C.yellow} start={t(448.2)}>
            custom kernels: rarely worth it
          </Label>
        </g>
      </g>
    </SceneShell>
  );
};
