import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FPS} from '../theme';
import {SceneShell, RegistrationMarks} from '../components/Stage';
import {Arrow, Check, InkLine, InkRect, Label, Panel} from '../components/Ink';

const start = 182.36;
const end = 213.7;

const WordScore: React.FC<{
  x: number;
  y: number;
  word: string;
  score: string;
  width: number;
  color: string;
  start: number;
  active?: boolean;
  dim?: number;
}> = ({x, y, word, score, width, color, start, active, dim = 1}) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [start, start + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
  <g opacity={dim * reveal}>
    <Label x={x} y={y} size={38} color={active ? C.green : C.fg} start={start}>
      {word}
    </Label>
    <Label x={x + 150} y={y} size={38} color={active ? C.green : C.dim} start={start + 1}>
      {score}
    </Label>
    <InkRect x={x + 245} y={y - 12} w={width} h={24} r={4} stroke={color} width={2} start={start + 2} dur={7} fill={color} fillOpacity={0.08} />
    <rect x={x + 245} y={y - 12} width={width * (active ? 1 : 0.45)} height={24} rx={4} fill={color} opacity={active ? 0.55 : 0.2} />
  </g>
  );
};

const RaggedStrip: React.FC<{x: number; y: number; start: number}> = ({x, y, start}) => (
  <g>
    {Array.from({length: 8}).map((_, i) => (
      <InkRect key={i} x={x + i * 46} y={y} w={38} h={58} r={4} stroke={C.green} width={2.5} start={start + i * 2} dur={6} fill={C.green} fillOpacity={0.07} />
    ))}
    <InkRect x={x + 8 * 46} y={y} w={19} h={58} r={3} stroke={C.red} width={4} start={start + 16} dur={7} fill={C.red} fillOpacity={0.18} />
  </g>
);

export const Scene09Karpathy: React.FC = () => {
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

      {/* Model predicts a word */}
      <g opacity={fade(182.4, 189.3, 7)}>
        <Label x={300} y={175} size={38} color={C.pink} start={t(182.5)}>
          KARPATHY&apos;S CASE
        </Label>
        <Panel x={280} y={290} w={380} h={250} fill={C.panel} stroke={C.purple} start={t(182.5)} dur={14} />
        <Label x={470} y={350} align="center" size={54} color={C.purple} start={t(182.8)}>
          MODEL
        </Label>
        <InkRect x={330} y={390} w={280} h={110} r={8} stroke={C.line} width={3} start={t(183.0)} dur={10} fill={C.well} fillOpacity={0.7} />
        {[0, 1, 2, 3].map((i) => (
          <InkCircleX key={i} x={365 + i * 70} y={445} color={i === 3 ? C.green : C.dim} start={t(183.4 + i * 0.1)} />
        ))}
        <Arrow x1={670} y1={415} x2={1080} y2={415} stroke={C.pink} width={4} start={t(184.8)} dur={14} />

        <Panel x={1100} y={250} w={540} h={430} fill={C.panel} stroke={C.pink} start={t(184.6)} dur={14} />
        <Label x={1140} y={300} size={38} color={C.pink} start={t(184.8)}>
          NEXT WORD
        </Label>
        <Label x={1600} y={300} align="right" size={36} color={C.dim} start={t(186.9)}>
          50,257 scores
        </Label>
        <WordScore x={1140} y={365} word="the" score="0.42" width={190} color={C.green} start={t(185.1)} active={frame > t(188.2)} />
        <WordScore x={1140} y={425} word="cat" score="0.21" width={120} color={C.cyan} start={t(185.4)} dim={0.7} />
        <WordScore x={1140} y={485} word="GPU" score="0.08" width={80} color={C.purple} start={t(185.7)} dim={0.6} />
        <WordScore x={1140} y={545} word="onion" score="0.03" width={50} color={C.orange} start={t(186.0)} dim={0.5} />
        <Label x={1140} y={625} size={36} color={C.dim} start={t(187.4)}>
          every word in the vocabulary
        </Label>

      </g>

      {/* Score matrix */}
      <g opacity={fade(189.4)}>
        <Label x={300} y={235} size={42} color={C.cyan} start={t(189.5)}>
          score matrix
        </Label>
        <MatrixGrid x={280} y={290} start={t(189.5)} />
        {frame > t(190.0) && frame < t(195.8) ? (
          <rect x={280 + ((frame - t(190.0)) * 14) % 350} y={290} width={22} height={275} rx={4} fill={C.yellow} opacity={0.09} />
        ) : null}
        <InkLine x1={660} y1={290} x2={660} y2={565} stroke={C.yellow} width={4} start={t(192.8)} dur={10} />
        <InkLine x1={660} y1={290} x2={682} y2={300} stroke={C.yellow} width={3} start={t(192.9)} dur={6} />
        <InkLine x1={660} y1={565} x2={682} y2={555} stroke={C.yellow} width={3} start={t(192.9)} dur={6} />
        <Label x={700} y={430} size={40} color={C.yellow} start={t(193.0)}>
          vocab
        </Label>
        <Label x={700} y={480} size={38} color={C.yellow} start={t(193.2)}>
          50,257
        </Label>

        {/* Divide by 64 */}
        <Label x={980} y={330} size={52} color={C.red} start={t(195.9)}>
          50,257 ÷ 64
        </Label>
        <Label x={980} y={400} size={46} color={C.red} start={t(197.5)}>
          = 785.27
        </Label>
        <RaggedStrip x={980} y={445} start={t(198.0)} />
        <Label x={980} y={535} size={36} color={C.red} start={t(198.5)}>
          leftover edge
        </Label>
        <InkRect x={1340} y={300} w={300} h={135} r={14} stroke={C.red} width={4} fill={C.red} fillOpacity={0.07} start={t(200.4)} dur={10} />
        <Label x={1490} y={352} align="center" size={36} color={C.red} start={t(200.6)}>
          SLOW
        </Label>
        <Label x={1490} y={402} align="center" size={44} color={C.red} start={t(200.7)}>
          card
        </Label>

        {/* Divide by 64 exactly */}
        <Label x={980} y={625} size={52} color={C.green} start={t(201.9)}>
          50,304 = 64 × 786
        </Label>
        <Label x={980} y={695} size={38} color={C.green} start={t(203.2)}>
          divides evenly
        </Label>
        <InkRect x={1340} y={585} w={300} h={135} r={14} stroke={C.green} width={4} fill={C.green} fillOpacity={0.07} start={t(206.4)} dur={10} />
        <Label x={1490} y={637} align="center" size={36} color={C.green} start={t(206.6)}>
          FAST
        </Label>
        <Label x={1490} y={687} align="center" size={44} color={C.green} start={t(206.7)}>
          card
        </Label>

        {/* 47 extra words */}
        <Label x={980} y={810} size={54} color={C.yellow} start={t(208.3)}>
          + 47 words
        </Label>
        <Label x={980} y={870} size={36} color={C.dim} start={t(209.4)}>
          almost free
        </Label>

        {/* Final 25% */}
        <Label x={1450} y={860} align="center" size={112} color={C.green} font="display" weight={700} start={t(210.7)}>
          25%
        </Label>
        <Label x={1450} y={930} align="center" size={40} color={C.fg} start={t(211.1)}>
          faster
        </Label>
      </g>
    </SceneShell>
  );
};

const InkCircleX: React.FC<{x: number; y: number; color: string; start: number}> = ({x, y, color, start}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [start, start + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <g opacity={o}>
      <circle cx={x} cy={y} r={12} fill="none" stroke={color} strokeWidth={3} />
      <circle cx={x} cy={y} r={3} fill={color} />
    </g>
  );
};

const MatrixGrid: React.FC<{x: number; y: number; start: number}> = ({x, y, start}) => {
  const cols = 8;
  const rows = 5;
  const cell = 40;
  const gap = 6;
  const w = cols * (cell + gap) - gap;
  const h = rows * (cell + gap) - gap;
  return (
    <g>
      <InkRect x={x} y={y} w={w} h={h} r={8} stroke={C.cyan} width={4} start={start} dur={12} fill={C.cyan} fillOpacity={0.03} />
      {Array.from({length: cols - 1}).map((_, i) => (
        <InkLine key={`c${i}`} x1={x + (i + 1) * (cell + gap) - gap / 2} y1={y} x2={x + (i + 1) * (cell + gap) - gap / 2} y2={y + h} stroke={C.cyan} width={1.2} start={start + 3} dur={6} opacity={0.35} />
      ))}
      {Array.from({length: rows - 1}).map((_, i) => (
        <InkLine key={`r${i}`} x1={x} y1={y + (i + 1) * (cell + gap) - gap / 2} x2={x + w} y2={y + (i + 1) * (cell + gap) - gap / 2} stroke={C.cyan} width={1.2} start={start + 3} dur={6} opacity={0.35} />
      ))}
      {Array.from({length: cols}).map((_, i) => (
        <rect key={`d${i}`} x={x + i * (cell + gap) + 9} y={y + 11} width={cell - 18} height={cell - 22} rx={3} fill={C.cyan} opacity={0.12} />
      ))}
      <rect x={x + (cols - 1) * (cell + gap)} y={y} width={cell} height={h} rx={6} fill={C.yellow} opacity={0.2} />
    </g>
  );
};
