import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FPS} from '../theme';
import {SceneShell, RegistrationMarks} from '../components/Stage';
import {Arrow, Check, InkLine, InkRect, Label, Panel, Pill} from '../components/Ink';

const start = 153.6;
const end = 182.36;

const RecipeCard: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  label: string;
  color: string;
  start: number;
  active?: boolean;
  dim?: number;
}> = ({x, y, w, h, title, label, color, start, active, dim = 1}) => (
  <g opacity={dim}>
    <InkRect
      x={x}
      y={y}
      w={w}
      h={h}
      r={16}
      stroke={active ? C.green : color}
      width={active ? 5 : 3.5}
      fill={C.panel}
      fillOpacity={0.95}
      start={start}
      dur={12}
    />
    <Label x={x + w / 2} y={y + 48} align="center" size={40} color={active ? C.green : color} start={start + 2}>
      {label}
    </Label>
    <Label x={x + w / 2} y={y + 112} align="center" size={58} color={C.fg} font="display" weight={700} start={start + 4}>
      {title}
    </Label>
    <InkRect x={x + 30} y={y + 155} w={w - 60} h={w - 60} r={5} stroke={color} width={2.5} start={start + 5} dur={10} fill={color} fillOpacity={0.06} />
    {Array.from({length: 3}).map((_, i) => (
      <g key={i}>
        <InkLine x1={x + 30 + ((w - 60) / 3) * (i + 1)} y1={y + 155} x2={x + 30 + ((w - 60) / 3) * (i + 1)} y2={y + 155 + w - 60} stroke={color} width={1.5} start={start + 7} dur={6} opacity={0.5} />
        <InkLine x1={x + 30} y1={y + 155 + ((w - 60) / 3) * (i + 1)} x2={x + w - 30} y2={y + 155 + ((w - 60) / 3) * (i + 1)} stroke={color} width={1.5} start={start + 7} dur={6} opacity={0.5} />
      </g>
    ))}
  </g>
);

export const Scene08Cublas: React.FC = () => {
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

      {/* Who cuts the tiles? */}
      <g opacity={fade(153.6, 156.3, 7)}>
        <Label x={960} y={230} align="center" size={52} color={C.orange} start={t(153.65)}>
          who cuts the tiles?
        </Label>
        <Matrixx x={760} y={300} start={t(153.6)} />
        <Label x={960} y={720} align="center" size={86} color={C.orange} font="display" weight={700} start={t(154.3)}>
          ?
        </Label>
      </g>

      {/* Library shelf */}
      <g opacity={fade(156.3, 160.8, 8)}>
        <Label x={260} y={255} size={40} color={C.dim} start={t(156.4)}>
          READY-MADE CODE
        </Label>
        <InkRect x={250} y={310} w={540} h={420} r={12} stroke={C.orange} width={4} fill={C.panel} fillOpacity={0.5} start={t(156.4)} dur={14} />
        <InkLine x1={260} y1={470} x2={780} y2={470} stroke={C.orange} width={4} start={t(156.8)} dur={12} opacity={0.7} />
        <InkLine x1={260} y1={610} x2={780} y2={610} stroke={C.orange} width={4} start={t(157.0)} dur={12} opacity={0.7} />
        {[
          [290, 355, 58, 105, C.cyan],
          [360, 345, 58, 115, C.purple],
          [430, 360, 58, 100, C.pink],
          [500, 340, 58, 120, C.yellow],
          [570, 355, 58, 105, C.green],
          [310, 495, 58, 108, C.green],
          [380, 505, 58, 98, C.yellow],
          [450, 490, 58, 113, C.cyan],
          [520, 500, 58, 103, C.pink],
        ].map(([x, y, w, h, color], i) => (
          <g key={i}>
            <InkRect x={x as number} y={y as number} w={w as number} h={h as number} r={4} stroke={color as string} width={3.5} start={t(156.8 + i * 0.1)} dur={8} fill={color as string} fillOpacity={0.1} />
            <line x1={(x as number) + 12} y1={(y as number) + 18} x2={(x as number) + (w as number) - 12} y2={(y as number) + 18} stroke={color as string} strokeWidth={2} opacity={0.55} />
            <line x1={(x as number) + 12} y1={(y as number) + 30} x2={(x as number) + (w as number) - 12} y2={(y as number) + 30} stroke={color as string} strokeWidth={2} opacity={0.35} />
          </g>
        ))}
        <Label x={530} y={790} align="center" size={42} color={C.fg} start={t(157.6)}>
          a shelf of code
        </Label>
      </g>

      {/* cuBLAS */}
      <g opacity={fade(160.9)}>
        <Label x={1230} y={270} align="center" size={100} color={C.purple} font="display" weight={700} start={t(160.9)}>
          cuBLAS
        </Label>
        <Label x={1230} y={340} align="center" size={38} color={C.dim} start={t(161.4)}>
          the cookbook
        </Label>
      </g>

      {/* Recipe cards */}
      <g opacity={fade(164.2)}>
        <RecipeCard x={880} y={470} w={220} h={320} title="64" label="CHUNK" color={frame > t(173.0) ? C.green : C.cyan} start={t(164.3)} active={frame > t(173.0)} dim={frame > t(173.0) ? 1 : 0.8} />
        <RecipeCard x={1120} y={480} w={220} h={320} title="128" label="CHUNK" color={C.cyan} start={t(164.7)} dim={0.68} />
        <RecipeCard x={1360} y={490} w={220} h={320} title="256" label="CHUNK" color={C.purple} start={t(165.1)} dim={0.56} />
        <Arrow x1={1180} y1={405} x2={1085} y2={455} stroke={C.green} width={4} start={t(169.2)} dur={14} />
        <Label x={990} y={450} align="center" size={40} color={C.green} start={t(173.0)}>
          A100
        </Label>
        {frame < t(177.3) ? <rect x={850 + ((frame * 6) % 760)} y={445} width={18} height={370} rx={4} fill={C.purple} opacity={0.05} /> : null}
      </g>

      {/* Ragged edge */}
      <g opacity={fade(177.3)}>
        <Label x={960} y={835} align="center" size={40} color={C.red} start={t(177.4)}>
          ragged edge
        </Label>
        <Ragged x={640} y={875} start={t(177.4)} />
        <Arrow x1={1010} y1={920} x2={1300} y2={930} stroke={C.red} width={4} start={t(178.7)} dur={12} />
        <InkRect x={1320} y={875} w={260} h={110} r={14} stroke={C.red} width={4} fill={C.red} fillOpacity={0.08} start={t(179.1)} dur={10} />
        <Label x={1450} y={930} align="center" size={42} color={C.red} start={t(179.3)}>
          slow card
        </Label>
      </g>

    </SceneShell>
  );
};

const Matrixx: React.FC<{x: number; y: number; start: number}> = ({x, y, start}) => (
  <g>
    <InkRect x={x} y={y} w={400} h={300} r={10} stroke={C.orange} width={4} start={start} dur={12} />
    {Array.from({length: 4}).map((_, i) => (
      <g key={i}>
        <InkLine x1={x + 80 * (i + 1)} y1={y} x2={x + 80 * (i + 1)} y2={y + 300} stroke={C.orange} width={2} start={start + 4} dur={8} opacity={0.5} />
        <InkLine x1={x} y1={y + 60 * (i + 1)} x2={x + 400} y2={y + 60 * (i + 1)} stroke={C.orange} width={2} start={start + 4} dur={8} opacity={0.5} />
      </g>
    ))}
    <InkLine x1={x + 80} y1={y} x2={x + 80} y2={y + 300} stroke={C.yellow} width={4} start={start + 8} dur={8} />
    <InkLine x1={x + 160} y1={y} x2={x + 160} y2={y + 300} stroke={C.yellow} width={4} start={start + 9} dur={8} />
    <InkLine x1={x + 240} y1={y} x2={x + 240} y2={y + 300} stroke={C.yellow} width={4} start={start + 10} dur={8} />
  </g>
);

const Ragged: React.FC<{x: number; y: number; start: number}> = ({x, y, start}) => (
  <g>
    {Array.from({length: 9}).map((_, i) => (
      <InkRect key={i} x={x + i * 42} y={y} w={34} h={64} r={4} stroke={i === 8 ? C.red : C.green} width={i === 8 ? 4 : 2.5} start={start + i * 2} dur={7} fill={i === 8 ? C.red : C.green} fillOpacity={0.08} />
    ))}
    <InkRect x={x + 9 * 42} y={y} w={17} h={64} r={3} stroke={C.red} width={4} start={start + 18} dur={8} fill={C.red} fillOpacity={0.2} />
  </g>
);
