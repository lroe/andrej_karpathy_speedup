import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FPS} from '../theme';
import {SceneShell, RegistrationMarks} from '../components/Stage';
import {InkCircle, InkRect, Label, Panel} from '../components/Ink';
import {Cook, Station} from '../components/Figures';

const start = 79.88;
const end = 100.2;

const StationGrid: React.FC<{
  x: number;
  y: number;
  cols: number;
  rows: number;
  start: number;
  color?: string;
  active?: boolean;
  dim?: number;
}> = ({x, y, cols, rows, start, color = C.green, active = true, dim = 1}) => {
  const cellW = 30;
  const cellH = 22;
  const gapX = 6;
  const gapY = 6;
  return (
    <g opacity={dim}>
      {Array.from({length: cols * rows}).map((_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        return (
          <Station
            key={i}
            x={x + col * (cellW + gapX)}
            y={y + row * (cellH + gapY)}
            w={cellW}
            h={cellH}
            start={start + i * 0.012}
            active={active}
            color={color}
          />
        );
      })}
    </g>
  );
};

export const Scene05Stations: React.FC = () => {
  const frame = useCurrentFrame();
  const t = (s: number) => Math.round((s - start) * FPS);
  const fade = (show: number, hide?: number, dur = 8) => {
    const inn = interpolate(frame, [t(show), t(show) + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    if (hide === undefined) return inn;
    const out = interpolate(frame, [t(hide) - dur, t(hide)], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    return Math.min(inn, out);
  };

  const chipDim =
    frame < t(89.3)
      ? 1
      : frame < t(93.4)
        ? 0.32
        : interpolate(frame, [t(93.4), t(95.0)], [0.32, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <SceneShell duration={Math.round((end - start) * FPS)}>
      <RegistrationMarks />

      {/* A100 */}
      <g opacity={Math.min(fade(79.9), chipDim)}>
        <Panel x={185} y={315} w={550} h={390} fill={C.panel} stroke={C.purple} start={t(79.9)} dur={14} />
        <Label x={460} y={280} align="center" size={64} color={C.purple} font="display" weight={700} start={t(80.2)}>
          A100
        </Label>
        <StationGrid x={235} y={405} cols={12} rows={9} start={t(80.7)} />
        <Label x={460} y={745} align="center" size={42} color={C.fg} start={t(82.9)}>
          108 stations
        </Label>
        <Label x={460} y={790} align="center" size={36} color={C.dim} start={t(83.4)}>
          streaming multiprocessors
        </Label>
      </g>

      {/* H100 */}
      <g opacity={Math.min(fade(85.3), chipDim)}>
        <Panel x={1160} y={285} w={560} h={430} fill={C.panel} stroke={C.cyan} start={t(85.3)} dur={14} />
        <Label x={1440} y={250} align="center" size={64} color={C.cyan} font="display" weight={700} start={t(85.5)}>
          H100
        </Label>
        <StationGrid x={1210} y={370} cols={12} rows={11} start={t(85.8)} color={C.cyan} />
        <Label x={1440} y={330} align="center" size={36} color={C.fg} start={t(85.5)}>
          132 stations
        </Label>
      </g>

      {/* Group at one station */}
      <g opacity={fade(89.4, 93.6, 7)}>
        <InkRect x={680} y={760} w={520} h={190} r={16} stroke={C.green} width={4} fill={C.green} fillOpacity={0.07} start={t(89.4)} dur={12} />
        {Array.from({length: 4}).map((_, i) => (
          <Cook key={i} x={790 + i * 95} y={935} scale={0.58} start={t(89.45 + i * 0.13)} apron={C.green} arm="chop" />
        ))}

        <Label x={940} y={805} align="center" size={40} color={C.green} start={t(90.2)}>
          a group arrives
        </Label>
        <Label x={940} y={1000} align="center" size={36} color={C.dim} start={t(91.4)}>
          and stays until it finishes
        </Label>
      </g>

      {/* All busy */}
      <g opacity={fade(93.7, 97.5, 7)}>
        <Panel x={690} y={250} w={540} h={340} fill={C.panel} stroke={C.green} start={t(93.7)} dur={12} />
        <StationGrid x={756} y={282} cols={12} rows={9} start={t(93.7)} />
        <rect x={756 + ((frame * 2) % 370)} y={282} width={22} height={246} rx={4} fill={C.green} opacity={0.1} />
        <Label x={960} y={635} align="center" size={40} color={C.green} start={t(94.0)}>
          108 / 108 busy
        </Label>
        <Label x={960} y={800} align="center" size={66} color={C.fg} font="display" weight={700} start={t(94.4)}>
          = fast
        </Label>
      </g>

      {/* Three ways teaser */}
      <g opacity={fade(97.6)}>
        <Label x={960} y={735} align="center" size={52} color={C.orange} start={t(97.1)}>
          three ways to sit idle
        </Label>
        {[1, 2, 3].map((n, i) => (
          <g key={n}>
            <InkCircle cx={790 + i * 170} cy={835} r={48} stroke={C.orange} width={4} start={t(97.9 + i * 0.16)} dur={10} fill={C.orange} fillOpacity={0.06} />
            <Label x={790 + i * 170} y={838} align="center" size={52} color={C.orange} font="display" weight={700} start={t(98.0 + i * 0.16)}>
              {n}
            </Label>
          </g>
        ))}
      </g>
    </SceneShell>
  );
};
