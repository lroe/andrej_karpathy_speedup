import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FPS} from '../theme';
import {SceneShell, RegistrationMarks} from '../components/Stage';
import {Arrow, InkLine, InkPath, InkRect, Label, Panel} from '../components/Ink';
import {Chef, Cook, GpuChip, Station} from '../components/Figures';

const start = 337.7;
const end = 364.52;

export const Scene15Chef: React.FC = () => {
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

      {/* Intro */}
      <g opacity={fade(337.7, 342.6, 7)}>
        <Label x={300} y={160} size={44} color={C.red} start={t(337.8)}>
          3) SLOW CHEF
        </Label>
        <Chef x={380} y={790} scale={0.9} start={t(337.8)} arm="call" accent={C.red} />
        <Label x={380} y={875} align="center" size={44} color={C.red} start={t(338.8)}>
          CPU
        </Label>
        <Panel x={500} y={330} w={360} h={150} fill={C.panel} stroke={C.cyan} start={t(338.9)} dur={10} />
        <Label x={680} y={405} align="center" size={64} color={C.cyan} font="display" weight={700} start={t(339.1)}>
          Python
        </Label>
        <InkPath d="M 540 480 L 500 530 L 560 510" stroke={C.cyan} width={3} start={t(339.4)} dur={8} />
        <Station x={900} y={760} w={170} h={90} start={t(338.4)} active color={C.green} />
        <Station x={1120} y={760} w={170} h={90} start={t(340.0)} active color={C.green} />
        <Station x={1340} y={760} w={170} h={90} start={t(340.2)} active color={C.green} />
        <Label x={1200} y={890} align="center" size={36} color={C.dim} start={t(340.8)}>
          waiting for orders
        </Label>
      </g>

      {/* Python vs A100 */}
      <g opacity={fade(342.7, 352.8, 7)}>
        <Panel x={280} y={320} w={420} h={250} fill={C.panel} stroke={C.cyan} start={t(342.7)} dur={12} />
        <Label x={490} y={390} align="center" size={40} color={C.cyan} start={t(342.8)}>
          PYTHON
        </Label>
        <Label x={490} y={485} align="center" size={84} color={C.fg} font="display" weight={700} start={t(343.2)}>
          1 + 1
        </Label>
        <Label x={490} y={535} align="center" size={36} color={C.dim} start={t(343.6)}>
          one tiny order
        </Label>

        <GpuChip x={1080} y={280} w={320} h={300} start={t(343.4)} color={C.cyan} label="A100" sublabel="" />
        <Label x={1520} y={390} align="center" size={40} color={C.cyan} start={t(346.3)}>
          10,000,000
        </Label>
        <Label x={1520} y={445} align="center" size={36} color={C.dim} start={t(346.7)}>
          calculations
        </Label>
        <Label x={960} y={660} align="center" size={48} color={C.yellow} start={t(346.9)}>
          one shout, 10 million chops
        </Label>
      </g>

      {/* Big order timeline */}
      <g opacity={fade(352.9, 364.2, 7)}>
        <Label x={300} y={300} size={40} color={C.dim} start={t(352.9)}>
          BIG ORDER
        </Label>
        <InkRect x={560} y={300} w={720} h={46} r={5} stroke={C.green} width={2.5} fill={C.green} fillOpacity={0.16} start={t(353.0)} dur={10} />
        {Array.from({length: 8}).map((_, i) => (
          <InkLine key={i} x1={620 + i * 80} y1={300} x2={620 + i * 80} y2={346} stroke={C.green} width={2} start={t(353.3 + i * 0.08)} dur={5} opacity={0.5} />
        ))}
        {frame > t(353.0) ? <circle cx={570 + ((frame * 7) % 700)} cy={323} r={6} fill={C.green} opacity={0.7} /> : null}
        <Arrow x1={1060} y1={230} x2={1060} y2={285} stroke={C.yellow} width={3} start={t(354.6)} dur={8} />
        <Label x={1090} y={220} size={36} color={C.yellow} start={t(354.8)}>
          next order arrives
        </Label>
        <Label x={1420} y={325} align="right" size={36} color={C.green} start={t(355.4)}>
          no gap
        </Label>

        <Label x={300} y={665} size={40} color={C.dim} start={t(357.5)}>
          TINY ORDER
        </Label>
        <InkRect x={560} y={665} w={720} h={46} r={5} stroke={C.line} width={2} fill={C.line} fillOpacity={0.16} start={t(357.5)} dur={8} />
        <InkRect x={560} y={665} w={130} h={46} r={5} stroke={C.green} width={3} fill={C.green} fillOpacity={0.2} start={t(357.7)} dur={8} />
        <InkPath d="M 690 688 L 1040 688" stroke={C.red} width={3} start={t(359.2)} dur={12} dash="0.02 0.02" />
        {frame > t(357.5) ? <circle cx={700 + ((frame * 5) % 330)} cy={688} r={5} fill={C.red} opacity={0.75} /> : null}
        <Label x={865} y={610} align="center" size={38} color={C.red} start={t(359.5)}>
          cooks finish, then wait
        </Label>
        <Arrow x1={1060} y1={735} x2={1060} y2={780} stroke={C.red} width={3} start={t(360.2)} dur={8} />
        <Label x={1090} y={805} size={36} color={C.red} start={t(360.4)}>
          for the next shout
        </Label>
      </g>
    </SceneShell>
  );
};
