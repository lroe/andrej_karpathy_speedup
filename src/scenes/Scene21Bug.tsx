import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FPS} from '../theme';
import {SceneShell, RegistrationMarks} from '../components/Stage';
import {Arrow, Check, Cross, InkCircle, InkLine, InkPath, InkRect, Label, Panel, Pill} from '../components/Ink';

const start = 519.72;
const end = 541.68;

const Bug: React.FC<{x: number; y: number; start: number; scale?: number}> = ({x, y, start, scale = 1}) => {
  const frame = useCurrentFrame();
  return (
  <g transform={`translate(${x} ${y}) scale(${scale}) rotate(${Math.sin((frame + start) / 8) * 7})`}>
    <InkCircle cx={0} cy={0} r={28} stroke={C.red} width={3.5} start={start} dur={9} fill={C.red} fillOpacity={0.12} />
    <InkLine x1={-8} y1={-28} x2={-18} y2={-42} stroke={C.red} width={3} start={start + 3} dur={5} />
    <InkLine x1={8} y1={-28} x2={18} y2={-42} stroke={C.red} width={3} start={start + 3} dur={5} />
    {[-18, 0, 18].map((dy, i) => (
      <g key={i}>
        <InkLine x1={-24} y1={dy} x2={-44} y2={dy - 8} stroke={C.red} width={3} start={start + 4 + i} dur={4} />
        <InkLine x1={24} y1={dy} x2={44} y2={dy - 8} stroke={C.red} width={3} start={start + 4 + i} dur={4} />
      </g>
    ))}
  </g>
  );
};

export const Scene21Bug: React.FC = () => {
  const frame = useCurrentFrame();
  const t = (s: number) => Math.round((s - start) * FPS);
  const fade = (show: number, hide?: number, dur = 8) => {
    const inn = interpolate(frame, [t(show), t(show) + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    if (hide === undefined) return inn;
    const out = interpolate(frame, [t(hide) - dur, t(hide)], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    return Math.min(inn, out);
  };
  const dropY = interpolate(frame, [t(531.8), t(533.0), t(537.0), t(538.0)], [0, 60, 60, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const qualityP = interpolate(frame, [t(535.0), t(537.0)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const fixedP = interpolate(frame, [t(537.0), t(538.0)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <SceneShell duration={Math.round((end - start) * FPS)}>
      <RegistrationMarks />

      {/* Code has bugs */}
      <g opacity={fade(519.8, 523.0, 7)}>
        <Label x={960} y={190} align="center" size={48} color={C.fg} start={t(519.8)}>
          kernels are code
        </Label>
        <Panel x={300} y={280} w={720} h={390} fill={C.well} stroke={C.line} start={t(520.0)} dur={12} />
        <Label x={350} y={345} size={36} font="mono" color={C.purple} start={t(520.2)}>
          kernel_launch(...)
        </Label>
        <Label x={350} y={405} size={36} font="mono" color={C.cyan} start={t(520.5)}>
          scores = matmul(x, w)
        </Label>
        <Label x={350} y={465} size={36} font="mono" color={C.green} start={t(520.8)}>
          next = argmax(scores)
        </Label>
        <Label x={350} y={525} size={36} font="mono" color={C.dim} start={t(521.1)}>
          return next
        </Label>
        <Bug x={1230} y={420} start={t(521.6)} scale={1.2} />
        <Label x={1230} y={520} align="center" size={44} color={C.red} start={t(522.0)}>
          BUG
        </Label>
      </g>

      {/* Anthropic / TPU */}
      <g opacity={fade(523.1, 529.3, 7)}>
        <Label x={960} y={230} align="center" size={112} color={C.yellow} font="display" weight={700} start={t(523.1)}>
          2025
        </Label>
        <Panel x={300} y={340} w={480} h={230} fill={C.panel} stroke={C.orange} start={t(523.4)} dur={12} />
        <Label x={540} y={410} align="center" size={52} color={C.orange} start={t(523.6)}>
          Anthropic
        </Label>
        <Label x={540} y={475} align="center" size={38} color={C.dim} start={t(524.2)}>
          found a compiler bug
        </Label>
        <Bug x={1440} y={430} start={t(524.6)} scale={1.1} />
        <Label x={1440} y={540} align="center" size={40} color={C.red} start={t(525.0)}>
          BUG
        </Label>

        <InkRect x={980} y={340} w={310} h={260} r={14} stroke={C.cyan} width={4} fill={C.panel} fillOpacity={0.8} start={t(526.6)} dur={12} />
        <Label x={1135} y={430} align="center" size={72} color={C.cyan} font="display" weight={700} start={t(526.8)}>
          TPU
        </Label>
        <Label x={1135} y={500} align="center" size={36} color={C.dim} start={t(527.3)}>
          Google&apos;s AI chip
        </Label>
      </g>

      {/* Shortlist drops a word */}
      <g opacity={fade(529.4, 541.5, 7)}>
        <Label x={300} y={245} size={40} color={C.cyan} start={t(529.5)}>
          CLAUDE&apos;S SHORTLIST
        </Label>
        <Panel x={300} y={290} w={430} h={390} fill={C.panel} stroke={C.cyan} start={t(529.5)} dur={12} />
        {[
          {word: 'the', score: '0.42', y: 355, color: C.green, top: true},
          {word: 'a', score: '0.21', y: 425, color: C.cyan},
          {word: 'cat', score: '0.08', y: 495, color: C.purple},
          {word: 'on', score: '0.03', y: 565, color: C.orange},
        ].map((row, i) => (
          <g key={row.word} opacity={row.top && frame > t(531.8) && frame < t(537.0) ? 0.35 : row.top ? 1 : 0.8}>
            <g>
              <Label x={340} y={row.y} size={40} color={row.top && frame > t(531.8) && frame < t(537.0) ? C.red : C.fg} start={t(529.8 + i * 0.1)}>
                {row.word}
              </Label>
              <Label x={500} y={row.y} size={38} color={C.dim} start={t(529.9 + i * 0.1)}>
                {row.score}
              </Label>
              <InkRect x={560} y={row.y - 12} w={130 * parseFloat(row.score) / 0.42} h={24} r={4} stroke={row.color} width={2} start={t(530.0 + i * 0.1)} dur={6} fill={row.color} fillOpacity={0.15} />
            </g>
          </g>
        ))}
        {frame > t(531.8) ? (
          <g opacity={fade(531.8, 537.0, 6)}>
            <Cross x={390} y={355} size={22} start={t(531.9)} />
            <Label x={430} y={310} size={38} color={C.red} start={t(532.1)}>
              dropped
            </Label>
          </g>
        ) : null}

        <Label x={970} y={330} size={40} color={C.dim} start={t(534.8)}>
          ANSWER QUALITY
        </Label>
        <InkLine x1={970} y1={620} x2={1580} y2={620} stroke={C.line} width={2} start={t(534.9)} dur={8} opacity={0.7} />
        <InkLine x1={970} y1={390} x2={970} y2={620} stroke={C.line} width={2} start={t(534.9)} dur={8} opacity={0.7} />
        <InkPath
          d={`M 980 410 C 1100 410 1160 610 1250 610 C 1350 610 1420 610 1560 600`}
          stroke={C.red}
          width={5}
          start={t(535.1)}
          dur={20}
          opacity={0.8}
        />
        <Label x={1300} y={660} align="center" size={38} color={C.red} start={t(535.6)}>
          quality suffers
        </Label>
        <InkPath d="M 1250 610 C 1350 610 1420 520 1560 430" stroke={C.green} width={5} start={t(537.0)} dur={12} opacity={fixedP * 0.9} />
        <g opacity={fade(537.0, 541.4, 6)}>
          <Check x={1430} y={570} size={22} start={t(537.1)} />
          <Label x={1480} y={570} size={40} color={C.green} start={t(537.3)}>
            fixed
          </Label>
        </g>
      </g>
    </SceneShell>
  );
};
