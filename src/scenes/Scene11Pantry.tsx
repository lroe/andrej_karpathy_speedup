import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FPS} from '../theme';
import {SceneShell, RegistrationMarks} from '../components/Stage';
import {Arrow, InkPath, InkRect, Label, Panel, Pill} from '../components/Ink';
import {Cook, Counter, Pantry, Station} from '../components/Figures';

const start = 233.2;
const end = 264.86;

export const Scene11Pantry: React.FC = () => {
  const frame = useCurrentFrame();
  const t = (s: number) => Math.round((s - start) * FPS);
  const fade = (show: number, hide?: number, dur = 8) => {
    const inn = interpolate(frame, [t(show), t(show) + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    if (hide === undefined) return inn;
    const out = interpolate(frame, [t(hide) - dur, t(hide)], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    return Math.min(inn, out);
  };
  const walkX =
    frame < t(244.9)
      ? interpolate(frame, [t(241.2), t(244.8)], [800, 1250], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
      : interpolate(frame, [t(244.9), t(248.0)], [1250, 800], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const walkY = 760 - (walkX - 800) * 0.42;

  return (
    <SceneShell duration={Math.round((end - start) * FPS)}>
      <RegistrationMarks />

      {/* Hallway scene */}
      <g opacity={fade(233.2, 249.1, 8)}>
        <Label x={300} y={160} size={44} color={C.orange} start={t(233.3)}>
          2) PANTRY TRIPS
        </Label>
        <Label x={300} y={215} size={36} color={C.dim} start={t(233.8)}>
          the cooks wait for ingredients
        </Label>

        <Counter x={180} y={760} w={760} start={t(233.2)} label="KITCHEN" />
        <Station x={260} y={700} w={94} h={60} start={t(233.3)} active color={C.green} />
        <Station x={380} y={700} w={94} h={60} start={t(233.4)} active color={C.green} />
        <Cook x={520} y={760} scale={0.85} start={t(233.4)} arm="rest" apron={C.orange} />

        <Pantry x={1340} y={300} w={400} h={420} start={t(237.0)} />
        <InkPath
          d={`M 830 760 C 980 690 1130 640 1320 590`}
          stroke={C.orange}
          width={3.5}
          start={t(238.6)}
          dur={16}
          dash="0.018 0.018"
          opacity={0.5}
        />

        {frame > t(241.0) && frame < t(248.2) ? (
          <g>
            <Cook x={walkX} y={walkY} scale={0.46} start={t(241.0)} arm="carry" apron={C.orange} />
          </g>
        ) : null}


        {/* Trip vs chop */}
        <g opacity={fade(245.1, 249.0, 7)}>
          <InkRect x={300} y={900} w={70} h={32} r={4} stroke={C.green} width={3} fill={C.green} fillOpacity={0.15} start={t(245.1)} dur={7} />
          <Label x={300} y={975} size={36} color={C.green} start={t(245.2)}>
            1 chop
          </Label>
          <InkRect x={620} y={900} w={760} h={32} r={4} stroke={C.orange} width={3} fill={C.orange} fillOpacity={0.1} start={t(245.2)} dur={10} />
          <Label x={620} y={975} size={36} color={C.orange} start={t(245.4)}>
            one pantry trip
          </Label>
          <Label x={1530} y={915} align="right" size={96} color={C.red} font="display" weight={700} start={t(246.2)}>
            300×
          </Label>
        </g>
      </g>

      {/* Counter space phase */}
      <g opacity={fade(249.2)}>
        <Label x={300} y={205} size={42} color={C.purple} start={t(249.3)}>
          a little counter space
        </Label>
        <Panel x={300} y={285} w={620} h={235} fill={C.panel} stroke={C.purple} start={t(249.4)} dur={12} />
        {[0, 1, 2].map((i) => (
          <Station key={i} x={360 + i * 175} y={355} w={110} h={70} start={t(249.6 + i * 0.1)} active color={C.green} />
        ))}
        <Label x={610} y={490} align="center" size={38} color={C.dim} start={t(250.0)}>
          stations
        </Label>
        <Arrow x1={950} y1={410} x2={1100} y2={410} stroke={C.green} width={4} start={t(251.0)} dur={12} />
        {frame > t(251.5) ? [0, 1, 2].map((i) => {
          const u = ((frame - t(251.5)) / 22 + i / 3) % 1;
          return <circle key={i} cx={960 + u * 130} cy={410} r={4} fill={C.green} opacity={0.85} />;
        }) : null}
        <Panel x={1120} y={300} w={400} h={220} fill={C.panel} stroke={C.green} start={t(249.8)} dur={12} />
        <Label x={1320} y={350} align="center" size={38} color={C.green} start={t(250.2)}>
          SRAM / L1
        </Label>
        <Label x={1320} y={440} align="center" size={58} color={C.fg} font="display" weight={700} start={t(250.6)}>
          instant
        </Label>
        <Label x={1320} y={490} align="center" size={36} color={C.dim} start={t(252.8)}>
          leftover values
        </Label>
        <Label x={960} y={715} align="center" size={64} color={C.yellow} font="display" weight={700} start={t(255.9)}>
          chops ÷ trip
        </Label>

        {/* Big op */}
        <g opacity={fade(259.1)}>
          <Panel x={300} y={790} w={470} h={220} fill={C.panel} stroke={C.green} start={t(259.1)} dur={12} />
          <Label x={335} y={840} size={36} color={C.dim} start={t(259.2)}>
            BIG MATRIX MULTIPLY
          </Label>
          <Label x={535} y={915} align="center" size={48} color={C.green} start={t(259.5)}>
            a whole crate
          </Label>
          <InkRect x={820} y={850} w={280} h={34} r={5} stroke={C.green} width={3} fill={C.green} fillOpacity={0.2} start={t(259.8)} dur={10} />
          <rect x={820} y={850} width={interpolate(frame, [t(260.0), t(263.6)], [0, 280], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} height={34} rx={5} fill={C.green} opacity={0.4} />
          <Label x={960} y={825} size={38} color={C.green} start={t(260.4)}>
            many chops
          </Label>
          <Label x={960} y={920} size={38} color={C.green} start={t(260.8)}>
            one trip
          </Label>
        </g>
      </g>
    </SceneShell>
  );
};
