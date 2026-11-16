import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FPS} from '../theme';
import {SceneShell, RegistrationMarks} from '../components/Stage';
import {InkCircle, InkRect, Label, Panel} from '../components/Ink';
import {Station} from '../components/Figures';

const start = 122.2;
const end = 153.6;

const TileGrid: React.FC<{
  x: number;
  y: number;
  start: number;
  mode: 'full' | 'one';
  opacity?: number;
  stagger?: number;
}> = ({x, y, start, mode, opacity = 1, stagger = 0.035}) => {
  const cellW = 26;
  const cellH = 22;
  const gapX = 6;
  const gapY = 6;
  return (
    <g opacity={opacity}>
      {Array.from({length: 108}).map((_, i) => {
        const col = i % 12;
        const row = Math.floor(i / 12);
        const active = mode === 'full' || i === 0;
        const idle = mode === 'one' && i !== 0;
        return (
          <Station
            key={i}
            x={x + col * (cellW + gapX)}
            y={y + row * (cellH + gapY)}
            w={cellW}
            h={cellH}
            start={start + i * stagger}
            active={active}
            idle={idle}
            color={mode === 'one' && i === 0 ? C.orange : C.green}
          />
        );
      })}
    </g>
  );
};

export const Scene07Tiles: React.FC = () => {
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

      {/* Round 1 */}
      <g opacity={fade(122.3, 149.2, 8)}>
        <Panel x={215} y={350} w={430} h={306} fill={C.panel} stroke={C.green} start={t(122.3)} dur={14} />
        <Label x={430} y={312} align="center" size={42} color={C.green} start={t(122.5)}>
          ROUND 1
        </Label>
        <TileGrid x={250} y={382} start={t(122.3)} mode="full" stagger={0.03} />
        {frame > t(133.8) && frame < t(149.0) ? (
          <rect x={250} y={382 + ((frame * 3) % 246)} width={378} height={18} rx={4} fill={C.green} opacity={0.08} />
        ) : null}
        <Label x={430} y={690} align="center" size={36} color={C.dim} start={t(133.0)}>
          108 tiles, 108 stations
        </Label>

      </g>

      {/* Round 2 */}
      <g opacity={fade(144.4, 149.2, 8)}>
        <Panel x={1000} y={350} w={430} h={306} fill={C.panel} stroke={C.red} start={t(144.4)} dur={14} />
        <Label x={1215} y={312} align="center" size={42} color={C.red} start={t(144.5)}>
          ROUND 2
        </Label>
        <TileGrid x={1035} y={382} start={t(144.6)} mode="one" stagger={0.012} opacity={0.78} />
        <Label x={1215} y={690} align="center" size={36} color={C.dim} start={t(146.2)}>
          1 busy, 107 idle
        </Label>
      </g>

      {/* Middle callouts */}
      <g opacity={fade(130.9, 133.7, 7)}>
      </g>

      <g opacity={fade(135.6, 138.2, 7)}>
        <Label x={810} y={430} align="center" size={82} color={C.green} font="display" weight={700} start={t(135.2)}>
          1 round
        </Label>
        <Label x={810} y={515} align="center" size={38} color={C.dim} start={t(136.1)}>
          108 tiles
        </Label>
      </g>

      <g opacity={fade(138.2, 144.2, 7)}>
        <Label x={810} y={430} align="center" size={58} color={C.orange} start={t(138.3)}>
          add one tile
        </Label>
        <Station x={770} y={480} w={80} h={62} start={t(139.0)} active color={C.orange} />
        <Label x={810} y={590} align="center" size={36} color={C.dim} start={t(140.0)}>
          109 total
        </Label>
      </g>

      <g opacity={fade(145.3, 149.1, 7)}>
        <Label x={810} y={425} align="center" size={72} color={C.red} font="display" weight={700} start={t(145.4)}>
          2 rounds
        </Label>
      </g>

      {/* Work/time comparison */}
      <g opacity={fade(149.2)}>
        <Panel x={280} y={650} w={1360} h={330} fill={C.panel} stroke={C.line} start={t(149.2)} dur={12} />
        <Label x={330} y={730} size={40} color={C.dim} start={t(149.3)}>
          WORK
        </Label>
        <InkRect x={530} y={712} w={900} h={36} r={6} stroke={C.line} width={2} fill={C.line} fillOpacity={0.2} start={t(149.3)} dur={8} />
        <rect x={1421} y={712} width={9} height={36} rx={4} fill={C.green} opacity={p2(frame, t(149.6), 10)} />
        <Label x={1590} y={730} align="right" size={48} color={C.green} start={t(149.7)}>
          +0.9%
        </Label>
        <Label x={330} y={870} size={40} color={C.dim} start={t(149.9)}>
          TIME
        </Label>
        <InkRect x={530} y={852} w={900} h={36} r={6} stroke={C.line} width={2} fill={C.line} fillOpacity={0.2} start={t(149.9)} dur={8} />
        <rect x={530} y={852} width={900} height={36} rx={4} fill={C.red} opacity={p2(frame, t(150.2), 14) * 0.75} />
        <line x1={980} y1={840} x2={980} y2={910} stroke={C.fg} strokeWidth={2} strokeDasharray="7 8" opacity={0.5} />
        <Label x={980} y={935} align="center" size={36} color={C.dim} start={t(150.8)}>
          one round
        </Label>
        <Label x={1590} y={870} align="right" size={58} color={C.red} start={t(150.4)}>
          2×
        </Label>
        <Label x={960} y={1035} align="center" size={42} color={C.yellow} start={t(151.2)}>
          under 1% more work, nearly double the time
        </Label>
      </g>
    </SceneShell>
  );
};

const p2 = (frame: number, start: number, dur: number) =>
  interpolate(frame, [start, start + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
