import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FPS} from '../theme';
import {SceneShell, RegistrationMarks} from '../components/Stage';
import {Arrow, InkLine, InkPath, InkRect, Label, Panel} from '../components/Ink';
import {Cook, Station} from '../components/Figures';

const start = 264.86;
const end = 289.56;

const StepCard: React.FC<{x: number; y: number; start: number; color: string; title: string; sub: string; kind: 'relu' | 'norm' | 'softmax'}> = ({
  x,
  y,
  start,
  color,
  title,
  sub,
  kind,
}) => (
  <g>
    <Panel x={x} y={y} w={440} h={330} fill={C.panel} stroke={color} start={start} dur={12} />
    <Label x={x + 220} y={y + 62} align="center" size={54} color={color} font="display" weight={700} start={start + 2}>
      {title}
    </Label>
    <InkRect x={x + 50} y={y + 105} w={340} h={145} r={8} stroke={C.line} width={2.5} start={start + 4} dur={8} fill={C.well} fillOpacity={0.5} />
    {kind === 'relu' ? (
      <g>
        <InkLine x1={x + 90} y1={y + 215} x2={x + 350} y2={y + 215} stroke={C.dim} width={2} start={start + 6} dur={6} opacity={0.5} />
        <InkLine x1={x + 190} y1={y + 125} x2={x + 190} y2={y + 235} stroke={C.dim} width={2} start={start + 6} dur={6} opacity={0.5} />
        <InkPath d={`M ${x + 100} ${y + 215} L ${x + 190} ${y + 215} L ${x + 330} ${y + 135}`} stroke={color} width={4} start={start + 8} dur={10} />
        <Label x={x + 115} y={y + 195} size={36} color={C.red} start={start + 9}>
          0
        </Label>
      </g>
    ) : null}
    {kind === 'norm' ? (
      <g>
        <InkPath d={`M ${x + 90} ${y + 215} C ${x + 150} ${y + 215} ${x + 150} ${y + 135} ${x + 220} ${y + 135} C ${x + 290} ${y + 135} ${x + 290} ${y + 215} ${x + 350} ${y + 215}`} stroke={color} width={4} start={start + 8} dur={12} />
        <Arrow x1={x + 250} y1={y + 165} x2={x + 305} y2={y + 165} stroke={C.green} width={3} start={start + 10} dur={8} />
        <Label x={x + 220} y={y + 115} align="center" size={36} color={C.dim} start={start + 10}>
          scale
        </Label>
      </g>
    ) : null}
    {kind === 'softmax' ? (
      <g>
        {[0.25, 0.55, 0.85, 0.4].map((h, i) => (
          <InkRect key={i} x={x + 100 + i * 65} y={y + 215 - h * 90} w={42} h={h * 90} r={3} stroke={color} width={3} start={start + 8 + i * 0.15} dur={7} fill={color} fillOpacity={0.1} />
        ))}
        <Label x={x + 320} y={y + 140} align="right" size={36} color={C.green} start={start + 10}>
          %
        </Label>
      </g>
    ) : null}
    <Label x={x + 220} y={y + 292} align="center" size={36} color={C.dim} start={start + 8}>
      {sub}
    </Label>
  </g>
);

export const Scene12SmallSteps: React.FC = () => {
  const frame = useCurrentFrame();
  const t = (s: number) => Math.round((s - start) * FPS);
  const fade = (show: number, hide?: number, dur = 8) => {
    const inn = interpolate(frame, [t(show), t(show) + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    if (hide === undefined) return inn;
    const out = interpolate(frame, [t(hide) - dur, t(hide)], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    return Math.min(inn, out);
  };
  const mathW = interpolate(frame, [t(285.0), t(286.0)], [0, 4], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const timeW = interpolate(frame, [t(287.0), t(288.0)], [0, 290], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <SceneShell duration={Math.round((end - start) * FPS)}>
      <RegistrationMarks />

      {/* Small-step loop */}
      <g opacity={fade(264.9, 269.2, 7)}>
        <Label x={300} y={200} size={48} color={C.red} start={t(264.9)}>
          a small step
        </Label>
        <Panel x={300} y={270} w={600} h={330} fill={C.panel} stroke={C.line} start={t(264.9)} dur={12} />
        <Station x={360} y={405} w={150} h={85} start={t(265.0)} active color={C.cyan} />
        <InkRect x={680} y={330} w={180} h={190} r={6} stroke={C.orange} width={3.5} fill={C.panel} fillOpacity={0.5} start={t(265.4)} dur={10} />
        <InkLine x1={690} y1={395} x2={850} y2={395} stroke={C.orange} width={2.5} start={t(265.6)} dur={8} opacity={0.7} />
        <InkLine x1={690} y1={460} x2={850} y2={460} stroke={C.orange} width={2.5} start={t(265.7)} dur={8} opacity={0.7} />
        <InkRect x={710} y={355} w={42} h={32} r={3} stroke={C.orange} width={2} start={t(265.8)} dur={6} />
        <InkRect x={770} y={350} w={42} h={37} r={3} stroke={C.orange} width={2} start={t(265.9)} dur={6} />
        <InkRect x={710} y={420} w={42} h={32} r={3} stroke={C.orange} width={2} start={t(266.0)} dur={6} />
        <Label x={770} y={555} align="center" size={36} color={C.orange} start={t(265.6)}>
          pantry
        </Label>
        <Cook x={440} y={490} scale={0.65} start={t(265.05)} arm="rest" />
        <InkPath d={`M 530 500 C 600 520 620 500 680 470`} stroke={C.orange} width={3} start={t(265.8)} dur={12} dash="0.02 0.02" />
        <InkPath d={`M 680 430 C 620 400 600 410 530 430`} stroke={C.orange} width={3} start={t(266.6)} dur={12} dash="0.02 0.02" />
        <Label x={560} y={560} align="center" size={38} color={C.green} start={t(266.2)}>
          one chop
        </Label>
      </g>

      {/* Three small steps */}
      <g opacity={fade(269.2, 281.2, 7)}>
        <Label x={960} y={250} align="center" size={42} color={C.dim} start={t(269.3)}>
          three tiny steps, everywhere
        </Label>
        <StepCard x={240} y={310} start={t(269.4)} color={C.cyan} title="ReLU" sub="zero the negatives" kind="relu" />
        <StepCard x={740} y={310} start={t(273.9)} color={C.purple} title="normalise" sub="scale the range" kind="norm" />
        <StepCard x={1240} y={310} start={t(277.9)} color={C.pink} title="softmax" sub="scores → percentages" kind="softmax" />
      </g>

      {/* BERT comparison */}
      <g opacity={fade(281.2)}>
        <Label x={960} y={330} align="center" size={62} color={C.fg} font="display" weight={700} start={t(281.3)}>
          BERT
        </Label>
        <Panel x={300} y={455} w={1320} h={450} fill={C.panel} stroke={C.line} start={t(281.8)} dur={12} />
        <Label x={350} y={550} size={40} color={C.dim} start={t(283.8)}>
          MATH
        </Label>
        <InkRect x={600} y={530} w={800} h={38} r={6} stroke={C.line} width={2} fill={C.line} fillOpacity={0.2} start={t(283.8)} dur={8} />
        <rect x={600} y={530} width={mathW} height={38} rx={4} fill={C.orange} opacity={0.8} />
        <Label x={1460} y={549} align="right" size={46} color={C.orange} start={t(285.0)}>
          0.2%
        </Label>
        <Label x={350} y={700} size={40} color={C.dim} start={t(285.8)}>
          TIME
        </Label>
        <InkRect x={600} y={680} w={800} h={38} r={6} stroke={C.line} width={2} fill={C.line} fillOpacity={0.2} start={t(285.8)} dur={8} />
        <rect x={600} y={680} width={timeW} height={38} rx={4} fill={C.red} opacity={0.7} />
        <Label x={1460} y={699} align="right" size={52} color={C.red} start={t(286.5)}>
          over 1/3
        </Label>
      </g>
    </SceneShell>
  );
};
