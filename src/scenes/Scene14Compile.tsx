import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FPS} from '../theme';
import {SceneShell, RegistrationMarks} from '../components/Stage';
import {Arrow, Cross, InkLine, InkRect, Label, Panel, Pill} from '../components/Ink';
import {Chef, Terminal} from '../components/Figures';

const start = 311.94;
const end = 337.7;

const OpCard: React.FC<{x: number; y: number; n: number; start: number; color?: string; opacity?: number}> = ({
  x,
  y,
  n,
  start,
  color = C.cyan,
  opacity = 1,
}) => (
  <g opacity={opacity}>
    <InkRect x={x} y={y} w={260} h={140} r={12} stroke={color} width={3.5} fill={C.panel} fillOpacity={0.9} start={start} dur={10} />
    <Label x={x + 130} y={y + 62} align="center" size={54} color={C.fg} start={start + 2}>
      op {n}
    </Label>
    <Label x={x + 130} y={y + 110} align="center" size={36} color={C.dim} start={start + 4}>
      kernel
    </Label>
  </g>
);

export const Scene14Compile: React.FC = () => {
  const frame = useCurrentFrame();
  const t = (s: number) => Math.round((s - start) * FPS);
  const fade = (show: number, hide?: number, dur = 8) => {
    const inn = interpolate(frame, [t(show), t(show) + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    if (hide === undefined) return inn;
    const out = interpolate(frame, [t(hide) - dur, t(hide)], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    return Math.min(inn, out);
  };
  const opFade = 1 - 0.9 * fade(330.7);

  return (
    <SceneShell duration={Math.round((end - start) * FPS)}>
      <RegistrationMarks />

      {/* Plain PyTorch chain */}
      <g opacity={fade(311.9, 319.0, 7)}>
        <Label x={960} y={195} align="center" size={54} color={C.fg} start={t(311.95)}>
          Plain PyTorch
        </Label>
        <Label x={960} y={245} align="center" size={38} color={C.dim} start={t(312.4)}>
          one operation at a time
        </Label>
        <OpCard x={340} y={330} n={1} start={t(312.0)} color={C.cyan} />
        <OpCard x={740} y={330} n={2} start={t(312.15)} color={C.purple} />
        <OpCard x={1140} y={330} n={3} start={t(312.3)} color={C.pink} />
        <InkLine x1={660} y1={330} x2={660} y2={470} stroke={C.red} width={4} start={t(314.2)} dur={9} />
        <InkLine x1={1060} y1={330} x2={1060} y2={470} stroke={C.red} width={4} start={t(314.4)} dur={9} />
        <Label x={960} y={545} align="center" size={38} color={C.dim} start={t(315.3)}>
          it cannot see ahead
        </Label>
        <g opacity={fade(317.2)}>
          <Cross x={660} y={400} size={26} start={t(317.2)} />
          <Cross x={1060} y={400} size={26} start={t(317.3)} />
        </g>
      </g>

      {/* torch.compile */}
      <g opacity={fade(319.1, 326.0, 7)}>
        <InkRect x={620} y={315} w={680} h={270} r={18} stroke={C.purple} width={5} fill={C.panel} fillOpacity={0.9} start={t(319.1)} dur={14} />
        <Label x={960} y={400} align="center" size={84} color={C.purple} font="display" weight={700} start={t(319.3)}>
          torch.compile
        </Label>
        <Label x={960} y={465} align="center" size={36} color={C.dim} start={t(320.2)}>
          a compiler
        </Label>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <InkRect x={750 + i * 120} y={495} w={100} h={30} r={4} stroke={C.cyan} width={2.5} start={t(322.4 + i * 0.12)} dur={7} fill={C.cyan} fillOpacity={0.12} />
          </g>
        ))}
        <Arrow x1={1140} y1={510} x2={1180} y2={510} stroke={C.green} width={3} start={t(323.0)} dur={6} head={10} />
        <InkRect x={750} y={490} w={380} h={40} r={5} stroke={C.green} width={4} fill={C.green} fillOpacity={0.16} start={t(323.4)} dur={8} />
      </g>

      {/* Chef reads the whole recipe */}
      <g opacity={fade(326.1)}>
        <InkRect x={440} y={290} w={1130} h={290} r={14} stroke={C.fg} width={4} fill={C.panel} fillOpacity={0.75} start={t(326.1)} dur={14} />
        <InkLine x1={470} y1={320} x2={1540} y2={320} stroke={C.line} width={2} start={t(326.5)} dur={10} opacity={0.6} />
        <Label x={1460} y={265} align="right" size={36} color={C.dim} start={t(326.7)}>
          the full recipe
        </Label>
        <Chef x={380} y={780} scale={0.85} start={t(326.0)} arm="read" accent={C.purple} />
        <InkLine x1={424} y1={690} x2={470} y2={590} stroke={C.fg} width={3.5} start={t(326.8)} dur={8} />
        <OpCard x={520} y={365} n={1} start={t(326.3)} color={C.cyan} opacity={opFade} />
        <OpCard x={850} y={365} n={2} start={t(326.5)} color={C.purple} opacity={opFade} />
        <OpCard x={1180} y={365} n={3} start={t(326.7)} color={C.pink} opacity={opFade} />
        <Label x={960} y={670} align="center" size={40} color={C.yellow} start={t(326.9)}>
          reads the whole model first
        </Label>

        <g opacity={fade(330.8)}>
          <InkRect x={850} y={360} w={330} h={150} r={14} stroke={C.green} width={4} fill={C.green} fillOpacity={0.1} start={t(330.8)} dur={10} />
          <Label x={1015} y={430} align="center" size={46} color={C.green} start={t(331.0)}>
            fused block
          </Label>
        </g>
      </g>

      {/* One line */}
      <g opacity={fade(332.5)}>
        <Terminal
          x={360}
          y={800}
          w={1200}
          h={150}
          title="python"
          start={t(332.5)}
          lines={[{text: 'model = torch.compile(model)', color: C.green, size: 42, start: t(332.8)}]}
        />
        <Label x={960} y={985} align="center" size={38} color={C.dim} start={t(333.4)}>
          one line
        </Label>
        <rect x={1125} y={866} width={16} height={40} rx={2} fill={C.green} opacity={0.3 + 0.6 * (0.5 + 0.5 * Math.sin(frame / 6))} />
      </g>
    </SceneShell>
  );
};
