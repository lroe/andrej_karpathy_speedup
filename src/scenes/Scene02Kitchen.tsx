import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FPS} from '../theme';
import {SceneShell, RegistrationMarks} from '../components/Stage';
import {Arrow, Dot, Label, Panel, Pill} from '../components/Ink';
import {Chef, Cook, Counter, GpuChip, Onion} from '../components/Figures';

const start = 28.28;
const end = 50.72;

export const Scene02Kitchen: React.FC = () => {
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

      {/* GPU chip opening */}
      <g opacity={fade(28.4, 36.1, 10)}>
        <GpuChip x={240} y={220} w={420} h={380} start={t(28.4)} color={C.purple} label="GPU" sublabel="dumb chip" />
        <Label x={450} y={665} align="center" size={44} color={C.fg} start={t(30.0)}>
          dumb chip
        </Label>
        <Label x={450} y={720} align="center" size={36} color={C.dim} start={t(30.7)}>
          one trick
        </Label>
      </g>

      {/* Thousands of data pieces */}
      <g opacity={fade(31.6, 36.1, 9)}>
        <Label x={1260} y={190} align="center" size={38} color={C.dim} start={t(31.7)}>
          SAME SMALL JOB
        </Label>
        <Label x={1260} y={245} align="center" size={56} color={C.cyan} start={t(32.3)}>
          thousands of data
        </Label>
        {Array.from({length: 144}).map((_, i) => {
          const col = i % 18;
          const row = Math.floor(i / 18);
          const appear = t(31.9) + i * 0.09;
          const o = interpolate(frame, [appear, appear + 5], [0, 0.75], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return <rect key={i} x={810 + col * 48} y={300 + row * 48} width={18} height={18} rx={4} fill={C.cyan} opacity={o} />;
        })}
        <Pill x={1150} y={690} w={220} h={70} size={42} color={C.cyan} fill={C.panel} start={t(33.4)}>
          × 1000+
        </Pill>
      </g>

      {/* Kitchen scene */}
      <g opacity={fade(36.2)}>
        <Counter x={180} y={820} w={1560} start={t(36.2)} label="KITCHEN" />
      </g>

      <g opacity={fade(37.3)}>
        <Chef x={360} y={820} scale={0.95} start={t(37.4)} arm="point" accent={C.purple} />
        <Label x={360} y={905} align="center" size={52} color={C.purple} start={t(37.6)}>
          CPU
        </Label>
        <Label x={360} y={960} align="center" size={36} color={C.dim} start={t(38.1)}>
          one very good chef
        </Label>
      </g>

      {/* Line cooks */}
      {Array.from({length: 12}).map((_, i) => (
        <g key={i} opacity={fade(39.8 + i * 0.09)}>
          <Cook x={790 + i * 76} y={820} scale={0.62} start={t(39.8 + i * 0.09)} apron={i % 2 === 0 ? C.green : C.cyan} arm="chop" />
        </g>
      ))}
      <g opacity={fade(40.6)}>
        <Label x={1740} y={310} align="right" size={58} color={C.green} start={t(40.7)}>
          × 1000
        </Label>
        <Label x={1740} y={362} align="right" size={36} color={C.dim} start={t(41.2)}>
          line cooks
        </Label>
      </g>

      {/* Same kernel card */}
      <g opacity={fade(42.9)}>
        <Panel x={840} y={285} w={470} h={200} fill={C.panel} stroke={C.purple} start={t(42.9)} dur={12} />
        <Label x={1075} y={330} align="center" size={36} color={C.dim} start={t(43.0)}>
          THE SAME CARD
        </Label>
        <Label x={1030} y={405} align="center" size={46} color={C.fg} start={t(43.4)}>
          chop an onion
        </Label>
        <Onion x={1225} y={410} size={1.35} start={t(44.4)} />
        <Label x={1075} y={462} align="center" size={36} color={C.purple} start={t(43.9)}>
          KERNEL
        </Label>
      </g>

      {/* Different onions */}
      {Array.from({length: 12}).map((_, i) => (
        <g key={`o${i}`} opacity={fade(45.2 + i * 0.045, 49.7, 6)} transform={`translate(0 ${Math.sin((frame + i * 7) / 9) * 4})`}>
          <Onion x={790 + i * 76} y={742} size={0.34} start={t(45.2 + i * 0.045)} color={i % 3 === 0 ? C.yellow : C.pink} />
        </g>
      ))}
      <g opacity={fade(45.7, 49.9, 7)}>
        <Label x={1250} y={648} align="center" size={40} color={C.yellow} start={t(45.8)}>
          a different onion each
        </Label>
      </g>
    </SceneShell>
  );
};
