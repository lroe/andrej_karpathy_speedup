import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FPS} from '../theme';
import {SceneShell, RegistrationMarks} from '../components/Stage';
import {Arrow, InkRect, Label, Panel, Pill} from '../components/Ink';
import {Cook, Matrix, Station} from '../components/Figures';

const start = 100.2;
const end = 122.2;

export const Scene06Matrix: React.FC = () => {
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

      <g opacity={fade(100.4, 104.1, 7)}>
        <Pill x={760} y={150} w={400} h={66} size={38} color={C.red} fill={C.panel} start={t(100.4)}>
          1) RAGGED WORK
        </Pill>
        {Array.from({length: 9}).map((_, i) => (
          <Station key={i} x={470 + i * 82} y={425} w={58} h={62} start={t(100.4 + i * 0.015)} active color={C.green} />
        ))}
        <g transform={`translate(${interpolate(frame, [t(100.9), t(101.7)], [80, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} 0)`}>
          <Station x={1210} y={425} w={58} h={62} start={t(100.9)} active color={C.orange} />
          {frame > t(101.8) ? <InkRect x={1204} y={419} w={70} h={74} r={8} stroke={C.red} width={2} start={t(101.8)} dur={5} opacity={0.25 + 0.2 * Math.sin(frame / 7)} /> : null}
        </g>
      </g>

      <g opacity={fade(104.3)}>
        <Label x={360} y={245} size={44} color={C.cyan} start={t(104.4)}>
          matrix A
        </Label>
        <Matrix x={300} y={310} rows={6} cols={6} cell={32} gap={5} start={t(104.5)} color={C.cyan} highlightRow={2} rowColor={C.yellow} opacity={0.95} />
        <Label x={610} y={400} align="center" size={72} color={C.dim} start={t(106.2)}>
          ×
        </Label>
        <Label x={710} y={245} size={44} color={C.pink} start={t(105.0)}>
          matrix B
        </Label>
        <Matrix x={650} y={310} rows={6} cols={6} cell={32} gap={5} start={t(105.0)} color={C.pink} highlightCol={3} colColor={C.yellow} opacity={0.95} />
        <Label x={970} y={400} align="center" size={72} color={C.dim} start={t(106.5)}>
          =
        </Label>
        <Label x={1080} y={245} size={44} color={C.green} start={t(105.5)}>
          matrix C
        </Label>
        <Matrix x={1020} y={310} rows={6} cols={6} cell={32} gap={5} start={t(105.5)} color={C.green} highlight={[[2, 3]]} highlightColor={C.yellow} opacity={0.95} />
        {frame > t(106.0) && frame < t(110.8) ? (
          <rect x={1020 + ((frame - t(106.0)) * 9) % 210} y={310} width={18} height={202} rx={4} fill={C.yellow} opacity={0.1} />
        ) : null}
      </g>

      {/* Formula / focus on one cell */}
      <g opacity={fade(110.8, 118.3, 7)}>
        <InkRect x={1310} y={285} w={210} h={120} r={10} stroke={C.yellow} width={4} fill={C.yellow} fillOpacity={0.1} start={t(111.0)} dur={10} />
        <Label x={1415} y={318} align="center" size={36} color={C.yellow} start={t(111.2)}>
          one cell
        </Label>
        <Label x={1415} y={368} align="center" size={38} color={C.fg} start={t(111.4)}>
          C[2,3]
        </Label>
        <Arrow x1={1310} y1={405} x2={1230} y2={425} stroke={C.yellow} width={3} start={t(112.0)} dur={10} opacity={0.8} />
        <Label x={960} y={720} align="center" size={48} color={C.fg} start={t(114.0)}>
          one row × one column
        </Label>
        <Label x={960} y={785} align="center" size={44} color={C.yellow} start={t(114.5)}>
          6 multiply-adds
        </Label>
      </g>

      {/* Split among cooks */}
      <g opacity={fade(118.4)}>
        {Array.from({length: 36}).map((_, i) => {
          const col = i % 6;
          const row = Math.floor(i / 6);
          return (
            <Cook
              key={i}
              x={990 + col * 46}
              y={700 + row * 40}
              scale={0.26}
              start={t(118.6 + i * 0.035)}
              apron={i % 2 === 0 ? C.cyan : C.purple}
              arm="chop"
            />
          );
        })}
        <Label x={1128} y={950} align="center" size={40} color={C.cyan} start={t(118.6)}>
          one cook per cell
        </Label>
      </g>
    </SceneShell>
  );
};
