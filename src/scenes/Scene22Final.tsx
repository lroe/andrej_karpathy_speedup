import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FPS} from '../theme';
import {SceneShell, RegistrationMarks} from '../components/Stage';
import {Arrow, InkLine, InkRect, Label, Panel, Underline} from '../components/Ink';
import {Station} from '../components/Figures';

const start = 541.68;
const end = 565.5;

export const Scene22Final: React.FC = () => {
  const frame = useCurrentFrame();
  const t = (s: number) => Math.round((s - start) * FPS);
  const fade = (show: number, hide?: number, dur = 8) => {
    const inn = interpolate(frame, [t(show), t(show) + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    if (hide === undefined) return inn;
    const out = interpolate(frame, [t(hide) - dur, t(hide)], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    return Math.min(inn, out);
  };

  return (
    <SceneShell duration={Math.round((end - start) * FPS)}>
      <RegistrationMarks />

      {/* Control panel */}
      <g opacity={fade(541.8, 556.7, 8)}>
        <Label x={960} y={170} align="center" size={40} color={C.dim} start={t(541.9)}>
          every training run picks
        </Label>
        <Panel x={280} y={235} w={1360} h={330} fill={C.panel} stroke={C.line} start={t(541.8)} dur={14} />
        <Label x={430} y={330} align="center" size={42} color={C.cyan} start={t(542.0)}>
          batch size
        </Label>
        <Label x={430} y={440} align="center" size={84} color={C.cyan} font="display" weight={700} start={t(542.2)}>
          8
        </Label>
        <Label x={430} y={510} align="center" size={36} color={C.dim} start={t(545.0)}>
          examples per step
        </Label>

        <Label x={960} y={330} align="center" size={42} color={C.purple} start={t(542.8)}>
          sequence length
        </Label>
        <Label x={960} y={440} align="center" size={84} color={C.purple} font="display" weight={700} start={t(543.0)}>
          2,048
        </Label>
        <Label x={960} y={510} align="center" size={36} color={C.dim} start={t(546.0)}>
          tokens per example
        </Label>

        <Label x={1490} y={330} align="center" size={42} color={C.green} start={t(543.5)}>
          vocabulary
        </Label>
        <Label x={1490} y={440} align="center" size={84} color={C.green} font="display" weight={700} start={t(543.7)}>
          50,304
        </Label>
        <Label x={1490} y={510} align="center" size={36} color={C.dim} start={t(547.0)}>
          words the model knows
        </Label>
        <InkLineSep x={700} start={t(542.6)} />
        <InkLineSep x={1230} start={t(543.0)} />
        {(() => {
          const idx = ((Math.floor((frame - t(542.0)) / 40) % 3) + 3) % 3;
          const xs = [300, 740, 1230];
          const cs = [C.cyan, C.purple, C.green];
          return <rect x={xs[idx]} y={540} width={360} height={4} rx={2} fill={cs[idx]} opacity={0.45} />;
        })()}
      </g>

      {/* Kernel and stations */}
      <g opacity={fade(551.7, 556.7, 7)}>
        <Label x={960} y={635} align="center" size={42} color={C.yellow} start={t(551.8)}>
          each number chooses a kernel
        </Label>
        <Arrow x1={960} y1={655} x2={960} y2={695} stroke={C.yellow} width={3} start={t(552.1)} dur={7} />

        <Panel x={300} y={700} w={520} h={200} fill={C.panel} stroke={C.yellow} start={t(552.4)} dur={12} />
        <Label x={560} y={765} align="center" size={42} color={C.dim} start={t(552.6)}>
          KERNEL
        </Label>
        <Label x={560} y={850} align="center" size={54} color={C.yellow} font="display" weight={700} start={t(552.8)}>
          one recipe
        </Label>

        <g opacity={fade(553.0)}>
          {Array.from({length: 108}).map((_, i) => {
            const col = i % 12;
            const row = Math.floor(i / 12);
            return (
              <Station key={i} x={1120 + col * 28} y={700 + row * 22} w={24} h={17} start={t(552.2 + i * 0.004)} active color={C.green} />
            );
          })}
          <Label x={1290} y={955} align="center" size={38} color={C.dim} start={t(553.6)}>
            108 stations
          </Label>
        </g>
      </g>

      {/* Final 47 → 25% */}
      <g opacity={fade(556.8)}>
        <Label x={550} y={360} align="center" size={184} color={C.yellow} font="display" weight={700} start={t(556.9)}>
          47
        </Label>
        <Label x={550} y={455} align="center" size={54} color={C.fg} start={t(557.1)}>
          words
        </Label>
        <Arrow x1={810} y1={380} x2={1120} y2={380} stroke={C.dim} width={5} start={t(557.4)} dur={12} head={18} />
        <Label x={1360} y={360} align="center" size={184} color={C.green} font="display" weight={700} start={t(557.2)}>
          25%
        </Label>
        <Label x={1360} y={455} align="center" size={54} color={C.fg} start={t(557.4)}>
          faster
        </Label>
        <Underline x={1230} y={495} w={260} color={C.green} start={t(557.6)} />

        {Array.from({length: 47}).map((_, i) => {
          const col = i % 24;
          const row = Math.floor(i / 24);
          return (
            <rect
              key={i}
              x={650 + col * 18}
              y={610 + row * 24}
              width={13}
              height={17}
              rx={2}
              fill={C.yellow}
              opacity={0.75}
            />
          );
        })}
        <Label x={960} y={760} align="center" size={40} color={C.dim} start={t(558.2)}>
          almost free to add
        </Label>
        <g opacity={fade(560.5)}>
          <Label x={960} y={845} align="center" size={64} color={C.red} font="display" weight={700} start={t(560.6)}>
            nobody will read
          </Label>
        </g>
        <Underline x={610} y={890} w={700} color={C.red} start={t(561.0)} />
      </g>
    </SceneShell>
  );
};

const InkLineSep: React.FC<{x: number; start: number}> = ({x, start}) => (
  <InkLine x1={x} y1={285} x2={x} y2={515} stroke={C.line} width={1.5} start={start} dur={6} opacity={0.7} />
);
