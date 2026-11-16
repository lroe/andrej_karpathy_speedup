import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FPS} from '../theme';
import {SceneShell, RegistrationMarks} from '../components/Stage';
import {Arrow, InkCircle, InkRect, Label, Panel, Pill} from '../components/Ink';

const start = 289.56;
const end = 311.94;

const CosCard: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  start: number;
  color: string;
  active?: boolean;
  label?: string;
}> = ({x, y, w = 240, h = 135, start, color, active, label = 'cos'}) => (
  <g>
    <InkRect x={x} y={y} w={w} h={h} r={14} stroke={color} width={4} fill={C.panel} fillOpacity={0.9} start={start} dur={10} />
    <Label x={x + w / 2} y={y + h / 2} align="center" size={62} color={active ? C.green : C.fg} font="display" weight={700} start={start + 3}>
      {label}
    </Label>
  </g>
);

export const Scene13Fusion: React.FC = () => {
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

      {/* Two kernels panel */}
      <g opacity={fade(289.7)}>
        <Panel x={220} y={230} w={700} h={550} fill={C.panel} stroke={C.red} start={t(289.6)} dur={12} />
        <Label x={570} y={295} align="center" size={40} color={C.red} start={t(290.0)}>
          TWO KERNELS
        </Label>
        <CosCard x={260} y={335} start={t(289.8)} color={C.pink} />
        <CosCard x={640} y={335} start={t(289.85)} color={C.pink} />
        <Arrow x1={505} y1={402} x2={625} y2={402} stroke={C.pink} width={4} start={t(291.2)} dur={10} head={12} />
        <Label x={570} y={520} align="center" size={38} color={C.dim} start={t(292.6)}>
          same step, twice
        </Label>

        <g opacity={fade(294.6)}>
          {[
            {x: 275, y: 585, n: 1, label: 'fetch'},
            {x: 530, y: 585, n: 2, label: 'put back'},
            {x: 275, y: 665, n: 3, label: 'fetch'},
            {x: 530, y: 665, n: 4, label: 'put back'},
          ].map((s, i) => (
            <g key={s.n}>
              <InkCircle cx={s.x} cy={s.y} r={24} stroke={C.red} width={3} start={t(294.7 + i * 0.15)} dur={7} />
              <Label x={s.x} y={s.y + 1} align="center" size={36} color={C.red} start={t(294.8 + i * 0.15)}>
                {s.n}
              </Label>
              <Label x={s.x + 40} y={s.y} size={36} color={C.fg} start={t(294.9 + i * 0.15)}>
                {s.label}
              </Label>
            </g>
          ))}
          <Label x={570} y={742} align="center" size={54} color={C.red} font="display" weight={700} start={t(296.6)}>
            4 trips
          </Label>
        </g>
      </g>

      {/* One kernel panel */}
      <g opacity={fade(301.0)}>
        <Panel x={1000} y={230} w={700} h={550} fill={C.panel} stroke={C.green} start={t(301.0)} dur={12} />
        <Label x={1350} y={295} align="center" size={40} color={C.green} start={t(301.2)}>
          ONE KERNEL
        </Label>
        <InkRect x={1040} y={330} w={620} h={145} r={14} stroke={C.green} width={4} fill={C.green} fillOpacity={0.06} start={t(301.4)} dur={12} />
        <Label x={1140} y={403} align="center" size={58} color={C.green} font="display" weight={700} start={t(301.5)}>
          cos
        </Label>
        <Arrow x1={1210} y1={403} x2={1290} y2={403} stroke={C.green} width={3.5} start={t(301.8)} dur={8} head={11} />
        <Label x={1390} y={403} align="center" size={58} color={C.green} font="display" weight={700} start={t(301.9)}>
          cos
        </Label>

        <InkRect x={1040} y={510} w={620} h={80} r={10} stroke={C.purple} width={3} fill={C.purple} fillOpacity={0.07} start={t(302.7)} dur={10} />
        <Label x={1350} y={550} align="center" size={38} color={C.purple} start={t(302.9)}>
          stays on the counter
        </Label>

        <g opacity={fade(304.8)}>
          {[
            {x: 1080, y: 650, n: 1, label: 'fetch'},
            {x: 1330, y: 650, n: 2, label: 'put back'},
          ].map((s, i) => (
            <g key={s.n}>
              <InkCircle cx={s.x} cy={s.y} r={24} stroke={C.green} width={3} start={t(304.8 + i * 0.15)} dur={7} />
              <Label x={s.x} y={s.y + 1} align="center" size={36} color={C.green} start={t(304.9 + i * 0.15)}>
                {s.n}
              </Label>
              <Label x={s.x + 40} y={s.y} size={36} color={C.fg} start={t(305.0 + i * 0.15)}>
                {s.label}
              </Label>
            </g>
          ))}
          <Label x={1350} y={742} align="center" size={54} color={C.green} font="display" weight={700} start={t(305.2)}>
            2 trips
          </Label>
        </g>
      </g>

      {/* Fusion result */}
      <g opacity={fade(307.8)}>
        <Label x={960} y={875} align="center" size={82} color={C.green} font="display" weight={700} start={t(307.9)}>
          FUSION
        </Label>
        <Label x={960} y={945} align="center" size={44} color={C.fg} start={t(308.2)}>
          about twice as fast
        </Label>
      </g>
    </SceneShell>
  );
};
