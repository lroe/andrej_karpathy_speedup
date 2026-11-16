import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FPS} from '../theme';
import {SceneShell, RegistrationMarks} from '../components/Stage';
import {Check, InkRect, Label, Panel, Pill} from '../components/Ink';

const start = 213.7;
const end = 233.2;

const InfoCard: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  value: string;
  note: string;
  color: string;
  start: number;
  opacity?: number;
}> = ({x, y, w, h, title, value, note, color, start, opacity = 1}) => (
  <g opacity={opacity}>
    <Panel x={x} y={y} w={w} h={h} fill={C.panel} stroke={color} start={start} dur={12} />
    <Label x={x + 35} y={y + 55} size={38} color={C.dim} start={start + 2}>
      {title}
    </Label>
    <Label x={x + 35} y={y + 135} size={68} color={color} font="display" weight={700} start={start + 4}>
      {value}
    </Label>
    <Label x={x + 35} y={y + 190} size={38} color={C.fg} start={start + 6}>
      {note}
    </Label>
  </g>
);

export const Scene10Padding: React.FC = () => {
  const frame = useCurrentFrame();
  const t = (s: number) => Math.round((s - start) * FPS);
  const fade = (show: number, hide?: number, dur = 8) => {
    const inn = interpolate(frame, [t(show), t(show) + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    if (hide === undefined) return inn;
    const out = interpolate(frame, [t(hide) - dur, t(hide)], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    return Math.min(inn, out);
  };
  const padP = interpolate(frame, [t(216.2), t(217.0)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <SceneShell duration={Math.round((end - start) * FPS)}>
      <RegistrationMarks />

      {/* Pad the ragged row */}
      <g opacity={fade(213.7, 218.6, 7)}>
        <Label x={330} y={230} size={50} color={C.yellow} start={t(213.8)}>
          pad to a multiple of 64
        </Label>
        <Label x={330} y={315} size={42} color={C.fg} start={t(213.8)} opacity={1 - padP}>
          50,257
        </Label>
        {Array.from({length: 12}).map((_, i) => (
          <InkRect key={i} x={330 + i * 58} y={350} w={50} h={64} r={5} stroke={C.green} width={3} start={t(213.7 + i * 0.05)} dur={6} fill={C.green} fillOpacity={0.07} />
        ))}
        <InkRect x={330 + 12 * 58} y={350} w={18} h={64} r={3} stroke={C.red} width={4} start={t(215.4)} dur={7} fill={C.red} fillOpacity={0.15} />
        {padP > 0 ? (
          <g opacity={padP}>
            <InkRect x={330 + 12 * 58} y={350} w={50} h={64} r={5} stroke={C.green} width={4} start={t(216.2)} dur={6} fill={C.green} fillOpacity={0.2} />
            <Label x={330 + 12 * 58 + 62} y={315} size={46} color={C.yellow} start={t(216.4)}>
              + 47
            </Label>
            <Label x={330} y={315} size={42} color={C.green} start={t(216.7)}>
              50,304
            </Label>
          </g>
        ) : null}
        <Label x={1350} y={330} align="center" size={124} color={C.yellow} font="display" weight={700} start={t(215.0)}>
          ×64
        </Label>
        <Label x={1350} y={420} align="center" size={38} color={C.dim} start={t(215.6)}>
          the friendly size
        </Label>
      </g>

      {/* Applies to vocab and hidden size */}
      <g opacity={fade(218.7, 224.7, 7)}>
        <InfoCard x={280} y={380} w={600} h={240} title="vocabulary" value="50,304" note="= 64 × 786" color={C.cyan} start={t(218.8)} />
        <InfoCard x={1040} y={380} w={600} h={240} title="hidden size" value="4,096" note="= 64 × 64" color={C.purple} start={t(219.9)} />
        {Array.from({length: 4}).map((_, i) => (
          <rect key={`v${i}`} x={690 + i * 36} y={455 + Math.sin((frame + i * 9) / 10) * 10} width={24} height={24} rx={4} fill={C.cyan} opacity={0.16} />
        ))}
        {Array.from({length: 3}).map((_, i) => (
          <rect key={`h${i}`} x={1450} y={445 + i * 42} width={130 - Math.sin((frame + i * 8) / 11) * 24} height={16} rx={4} fill={C.purple} opacity={0.18} />
        ))}
      </g>

      {/* Memory cost */}
      <g opacity={fade(224.7, 227.2, 6)}>
        <Label x={300} y={325} size={46} color={C.dim} start={t(224.2)}>
          padding costs memory
        </Label>
        <InkRect x={300} y={380} w={720} h={44} r={7} stroke={C.line} width={2} fill={C.line} fillOpacity={0.2} start={t(224.9)} dur={8} />
        <rect x={300} y={380} width={55} height={44} rx={7} fill={C.orange} opacity={0.55} />
        <Check x={620} y={520} size={28} start={t(225.8)} />
      </g>

      {/* Bits and GPU dependence */}
      <g opacity={fade(227.2)}>
        <Label x={960} y={300} align="center" size={50} color={C.yellow} start={t(227.3)}>
          the best multiple varies
        </Label>
        <Label x={960} y={380} align="center" size={38} color={C.dim} start={t(227.8)}>
          GPU and bits both matter
        </Label>
        {[
          {x: 390, label: 'A100', color: C.cyan},
          {x: 760, label: 'H100', color: C.purple},
        ].map((g, i) => (
          <g key={g.label}>
            <InkRect x={g.x} y={480} w={200} h={100} r={10} stroke={g.color} width={3.5} start={t(228.0 + i * 0.1)} dur={9} fill={g.color} fillOpacity={0.06} />
            <Label x={g.x + 100} y={530} align="center" size={44} color={g.color} start={t(228.1 + i * 0.1)}>
              {g.label}
            </Label>
          </g>
        ))}
        {[
          {x: 1100, label: '16-bit', color: C.cyan},
          {x: 1300, label: '8-bit', color: C.purple},
          {x: 1500, label: '4-bit', color: C.pink},
        ].map((g, i) => (
          <Pill key={g.label} x={g.x} y={480} w={180} h={64} size={36} color={g.color} fill={C.panel} start={t(228.5 + i * 0.12)}>
            {g.label}
          </Pill>
        ))}
        <Label x={960} y={680} align="center" size={58} color={C.fg} font="display" weight={700} start={t(229.4)}>
          measure, don&apos;t guess
        </Label>
        <Label x={960} y={750} align="center" size={38} color={C.dim} start={t(230.2)}>
          the friendly multiple changes
        </Label>
      </g>
    </SceneShell>
  );
};
