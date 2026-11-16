import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FPS} from '../theme';
import {SceneShell, RegistrationMarks} from '../components/Stage';
import {Arrow, Check, Cross, InkCircle, InkLine, InkRect, Label, Panel, Pill} from '../components/Ink';
import {Chef} from '../components/Figures';

const start = 482.04;
const end = 519.72;

const words = ['the', 'cat', 'sat', 'on', 'GPU', 'big'];

export const Scene20Profile: React.FC = () => {
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

      {/* Use the library */}
      <g opacity={fade(482.1, 486.0, 7)}>
        <Label x={960} y={300} align="center" size={54} color={C.green} start={t(482.2)}>
          use the library
        </Label>
        <Label x={960} y={380} align="center" size={40} color={C.dim} start={t(482.8)}>
          good kernels already ship
        </Label>
        <InkRect x={620} y={450} w={680} h={240} r={16} stroke={C.green} width={4} fill={C.panel} fillOpacity={0.5} start={t(482.3)} dur={12} />
        {[0, 1, 2].map((i) => (
          <InkRect key={i} x={700 + i * 150} y={500} w={110} h={140} r={6} stroke={[C.cyan, C.purple, C.pink][i]} width={3} start={t(482.5 + i * 0.1)} dur={8} fill={[C.cyan, C.purple, C.pink][i]} fillOpacity={0.08} />
        ))}
        <Check x={960} y={740} size={24} start={t(484.2)} />
        <Label x={1010} y={740} size={38} color={C.green} start={t(484.4)}>
          ready
        </Label>
      </g>

      {/* Profile first */}
      <g opacity={fade(486.0, 496.0, 7)}>
        <Pill x={300} y={175} w={300} h={64} size={38} color={C.cyan} fill={C.panel} start={t(486.1)}>
          1) PROFILE
        </Pill>
        <Label x={960} y={255} align="center" size={42} color={C.dim} start={t(486.5)}>
          what does the profile say?
        </Label>

        <Panel x={300} y={330} w={460} h={250} fill={C.panel} stroke={C.cyan} start={t(486.6)} dur={12} />
        {[0, 1, 2].map((i) => (
          <InkRect key={i} x={340 + i * 130} y={400} w={i === 1 ? 70 : 100} h={100} r={5} stroke={[C.cyan, C.purple, C.green][i]} width={3} start={t(486.9 + i * 0.1)} dur={8} fill={[C.cyan, C.purple, C.green][i]} fillOpacity={0.1} />
        ))}
        <Label x={530} y={540} align="center" size={38} color={C.cyan} start={t(487.3)}>
          trace
        </Label>

        <DiagCard x={820} y={330} title="RAGGED" sub="sizes" color={C.red} start={t(489.5)} kind="ragged" />
        <DiagCard x={1150} y={330} title="PANTRY" sub="trips" color={C.orange} start={t(490.8)} kind="pantry" />
        <DiagCard x={1480} y={330} title="CHEF" sub="slow" color={C.purple} start={t(491.9)} kind="chef" />

        <g opacity={fade(493.1)}>
          <Arrow x1={530} y1={610} x2={900} y2={690} stroke={C.purple} width={3} start={t(493.2)} dur={10} />
          <Label x={960} y={720} align="center" size={46} color={C.purple} start={t(493.4)}>
            2) torch.compile
          </Label>
          <Label x={960} y={775} align="center" size={36} color={C.dim} start={t(493.8)}>
            comes after the profile
          </Label>
        </g>
      </g>

      {/* Compiler merges, cannot invent */}
      <g opacity={fade(496.1, 501.4, 7)}>
        <Label x={960} y={230} align="center" size={54} color={C.purple} start={t(496.2)}>
          torch.compile
        </Label>
        {[0, 1, 2].map((i) => (
          <InkRect key={i} x={600 + i * 280} y={330} w={220} h={120} r={10} stroke={[C.cyan, C.purple, C.pink][i]} width={3} start={t(496.4 + i * 0.12)} dur={8} fill={C.panel} fillOpacity={0.8} />
        ))}
        <Label x={710} y={395} align="center" size={40} color={C.fg} start={t(496.7)}>
          op
        </Label>
        <Label x={990} y={395} align="center" size={40} color={C.fg} start={t(496.8)}>
          op
        </Label>
        <Label x={1270} y={395} align="center" size={40} color={C.fg} start={t(496.9)}>
          op
        </Label>
        <Arrow x1={960} y1={470} x2={960} y2={535} stroke={C.green} width={3} start={t(497.2)} dur={8} />
        <InkRect x={760} y={545} w={400} h={100} r={12} stroke={C.green} width={4} fill={C.green} fillOpacity={0.1} start={t(497.4)} dur={10} />
        <Label x={960} y={598} align="center" size={44} color={C.green} start={t(497.6)}>
          fused
        </Label>
        <Label x={960} y={700} align="center" size={40} color={C.dim} start={t(497.8)}>
          merges what we wrote
        </Label>
        <g opacity={fade(497.9)}>
          <Label x={960} y={790} align="center" size={42} color={C.red} start={t(498.0)}>
            cannot invent new math
          </Label>
          <Cross x={1220} y={790} size={22} start={t(498.3)} />
        </g>
      </g>

      {/* Attention table */}
      <g opacity={fade(503.6)}>
        <Label x={960} y={170} align="center" size={62} color={C.pink} start={t(503.7)}>
          FLASH ATTENTION
        </Label>
        <Label x={960} y={235} align="center" size={38} color={C.dim} start={t(504.1)}>
          every word × every other word
        </Label>
        <g opacity={frame > t(507.8) ? 0.3 : 1}>
          <AttentionTable start={t(504.3)} />
          {frame > t(504.3) && frame < t(507.8) ? (
            <rect x={560 + ((frame - t(504.3)) * 7) % 360} y={330} width={20} height={382} rx={4} fill={C.pink} opacity={0.1} />
          ) : null}
        </g>

        <g opacity={fade(507.9)}>
          <Label x={1360} y={310} align="center" size={40} color={C.green} start={t(508.0)}>
            built in pieces
          </Label>
          <Panel x={1080} y={350} w={560} h={280} fill={C.panel} stroke={C.green} start={t(508.1)} dur={12} />
          {Array.from({length: 9}).map((_, i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            return (
              <InkRect key={i} x={1150 + col * 105} y={390 + row * 70} w={80} h={52} r={5} stroke={C.green} width={2.5} start={t(508.4 + i * 0.1)} dur={7} fill={C.green} fillOpacity={0.1} />
            );
          })}
          <InkLine x1={1360} y1={700} x2={1360} y2={770} stroke={C.red} width={3} start={t(512.2)} dur={8} />
          <Cross x={1360} y={750} size={22} start={t(512.5)} />
          <Label x={1360} y={825} align="center" size={38} color={C.red} start={t(512.7)}>
            never the pantry
          </Label>
        </g>

        <g opacity={fade(517.3)}>
          <SparkX x={960} y={845} start={t(517.4)} />
          <Label x={960} y={925} align="center" size={44} color={C.yellow} start={t(516.8)}>
            that took a human idea
          </Label>
        </g>
      </g>
    </SceneShell>
  );
};

const DiagCard: React.FC<{
  x: number;
  y: number;
  title: string;
  sub: string;
  color: string;
  start: number;
  kind: 'ragged' | 'pantry' | 'chef';
}> = ({x, y, title, sub, color, start, kind}) => (
  <g>
    <Panel x={x} y={y} w={300} h={230} fill={C.panel} stroke={color} start={start} dur={10} />
    <Label x={x + 150} y={y + 50} align="center" size={40} color={color} start={start + 2}>
      {title}
    </Label>
    {kind === 'ragged' ? (
      <g>
        {[0, 1, 2, 3].map((i) => (
          <InkRect key={i} x={x + 45 + i * 56} y={y + 95} w={44} h={50} r={4} stroke={C.green} width={2.5} start={start + 3} dur={6} fill={C.green} fillOpacity={0.08} />
        ))}
        <InkRect x={x + 269} y={y + 95} w={12} h={50} r={2} stroke={C.red} width={3} start={start + 4} dur={6} fill={C.red} fillOpacity={0.15} />
      </g>
    ) : null}
    {kind === 'pantry' ? (
      <g>
        <InkRect x={x + 45} y={y + 95} w={80} h={90} r={4} stroke={C.orange} width={2.5} start={start + 3} dur={7} fill={C.orange} fillOpacity={0.06} />
        <InkLine x1={x + 45} y1={y + 130} x2={x + 125} y2={y + 130} stroke={C.orange} width={2} start={start + 4} dur={5} />
        <InkLine x1={x + 45} y1={y + 165} x2={x + 125} y2={y + 165} stroke={C.orange} width={2} start={start + 4} dur={5} />
        <Arrow x1={x + 145} y1={y + 140} x2={x + 225} y2={y + 140} stroke={C.red} width={2.5} start={start + 5} dur={7} />
        <Arrow x1={x + 225} y1={y + 165} x2={x + 145} y2={y + 165} stroke={C.red} width={2.5} start={start + 6} dur={7} />
      </g>
    ) : null}
    {kind === 'chef' ? (
      <g>
        <Chef x={x + 150} y={y + 180} scale={0.28} start={start + 3} arm="point" accent={C.purple} />
      </g>
    ) : null}
    <Label x={x + 150} y={y + 205} align="center" size={36} color={C.dim} start={start + 6}>
      {sub}
    </Label>
  </g>
);

const AttentionTable: React.FC<{start: number}> = ({start}) => {
  const cell = 62;
  const gap = 2;
  const x0 = 560;
  const y0 = 330;
  return (
    <g>
      {words.map((w, i) => (
        <g key={w}>
          <Label x={x0 + i * (cell + gap) + cell / 2} y={y0 - 28} align="center" size={36} color={C.dim} start={start + i * 0.08}>
            {w}
          </Label>
          <Label x={x0 - 20} y={y0 + i * (cell + gap) + cell / 2} align="right" size={36} color={C.dim} start={start + i * 0.08}>
            {w}
          </Label>
        </g>
      ))}
      <InkRect x={x0} y={y0} w={words.length * (cell + gap) - gap} h={words.length * (cell + gap) - gap} r={6} stroke={C.pink} width={4} start={start} dur={14} />
      {words.map((_, r) =>
        words.map((__, c) => {
          const intensity = (Math.sin(r * 7 + c * 3) + 1) / 2;
          return <rect key={`${r}-${c}`} x={x0 + c * (cell + gap) + 6} y={y0 + r * (cell + gap) + 6} width={cell - 12} height={cell - 12} rx={4} fill={intensity > 0.55 ? C.pink : C.purple} opacity={0.08 + intensity * 0.22} />;
        }),
      )}
    </g>
  );
};

const SparkX: React.FC<{x: number; y: number; start: number}> = ({x, y, start}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [start, start + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <g opacity={o}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const a = (i * Math.PI) / 4;
        return <line key={i} x1={x + Math.cos(a) * 26} y1={y + Math.sin(a) * 26} x2={x + Math.cos(a) * 55} y2={y + Math.sin(a) * 55} stroke={C.yellow} strokeWidth={4} strokeLinecap="round" />;
      })}
      <circle cx={x} cy={y} r={10} fill={C.yellow} />
    </g>
  );
};
