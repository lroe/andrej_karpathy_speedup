import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FPS} from '../theme';
import {SceneShell, RegistrationMarks} from '../components/Stage';
import {Arrow, InkCircle, InkRect, Label, Panel} from '../components/Ink';
import {Cook} from '../components/Figures';

const start = 63.5;
const end = 79.88;

const ArrayRow: React.FC<{
  x: number;
  y: number;
  w: number;
  label: string;
  color: string;
  start: number;
  index: number;
  values: number[];
}> = ({x, y, w, label, color, start, index, values}) => {
  const cells = 9;
  const gap = 8;
  const cw = (w - gap * (cells - 1)) / cells;
  return (
    <g>
      <Label x={x} y={y - 40} size={36} color={color} start={start}>
        {label}
      </Label>
      {Array.from({length: cells}).map((_, i) => (
        <g key={i}>
          <InkRect
            x={x + i * (cw + gap)}
            y={y}
            w={cw}
            h={66}
            r={7}
            stroke={i === index ? C.yellow : color}
            width={i === index ? 4 : 2.5}
            fill={i === index ? C.yellow : C.line}
            fillOpacity={i === index ? 0.16 : 0.1}
            start={start + i * 1.4}
            dur={7}
          />
          <text
            x={x + i * (cw + gap) + cw / 2}
            y={y + 35}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={i === index ? C.yellow : C.dim}
            fontFamily='"Patrick Hand"'
            fontSize={36}
          >
            {values[i]}
          </text>
        </g>
      ))}
    </g>
  );
};

export const Scene04VectorAdd: React.FC = () => {
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

      {/* Position marker */}
      <g opacity={fade(66.0, 73.2, 6)}>
        <Label x={700} y={300} align="center" size={38} color={C.yellow} start={t(66.1)}>
          position 5,000
        </Label>
        <InkPathVertical x={710} y1={315} y2={610} start={t(66.3)} />
      </g>

      <ArrayRow x={260} y={360} w={620} label="list A" color={C.cyan} start={t(63.6)} index={6} values={[3, 8, 2, 7, 4, 1, 7, 5, 9]} />
      <ArrayRow x={260} y={500} w={620} label="list B" color={C.pink} start={t(63.9)} index={6} values={[5, 2, 9, 3, 6, 8, 5, 1, 4]} />

      <Label x={960} y={433} align="center" size={70} color={C.yellow} start={t(68.0)}>
        +
      </Label>

      {/* Output */}
      <g opacity={fade(68.0)}>
        <Panel x={1160} y={330} w={480} h={330} fill={C.panel} stroke={C.green} start={t(68.0)} dur={12} />
        <Label x={1400} y={380} align="center" size={38} color={C.dim} start={t(68.1)}>
          cook #5000 writes
        </Label>
        <Label x={1400} y={465} align="center" size={92} color={C.green} font="display" weight={700} start={t(68.6)}>
          C[5000]
        </Label>
        <Label x={1400} y={555} align="center" size={72} color={C.fg} start={t(69.3)}>
          7 + 5 = 12
        </Label>
      </g>

      <Arrow x1={920} y1={430} x2={1145} y2={445} stroke={C.green} width={4} start={t(68.9)} dur={12} />
      {frame > t(69.0)
        ? [0, 1, 2].map((i) => {
            const u = ((frame - t(69.0)) / 24 + i / 3) % 1;
            return <circle key={i} cx={930 + u * 200} cy={432 + u * 10} r={5} fill={C.green} opacity={0.8} />;
          })
        : null}

      {/* The cook */}
      <Cook x={1010} y={900} scale={0.9} start={t(69.2)} apron={C.yellow} arm="carry" />
      <Label x={1010} y={975} align="center" size={38} color={C.yellow} start={t(69.6)}>
        cook 5,000
      </Label>

      {/* No communication */}
      <g opacity={fade(73.2, 75.4, 7)}>
        <InkCircle cx={1010} cy={795} r={135} stroke={C.red} width={3} start={t(73.3)} dur={14} />
      </g>

      {/* Station / SM */}
      <g opacity={fade(75.5)}>
        <InkRect x={870} y={690} w={280} h={300} r={10} stroke={C.purple} width={4} fill={C.purple} fillOpacity={0.06} start={t(75.5)} dur={12} />
        <Label x={1190} y={790} size={64} color={C.purple} font="display" weight={700} start={t(76.0)}>
          SM
        </Label>
        <Label x={1190} y={842} size={36} color={C.dim} start={t(76.4)}>
          streaming multiprocessor
        </Label>
        <Label x={1010} y={1025} align="center" size={36} color={C.dim} start={t(76.6)}>
          the cook&apos;s station
        </Label>
      </g>

    </SceneShell>
  );
};

/* Small vertical dashed guide */
const InkPathVertical: React.FC<{x: number; y1: number; y2: number; start: number}> = ({x, y1, y2, start}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [start, start + 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <line x1={x} y1={y1} x2={x} y2={y2} stroke={C.yellow} strokeWidth={2} strokeDasharray="8 10" opacity={0.5 * p} />;
};
