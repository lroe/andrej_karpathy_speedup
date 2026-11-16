import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FPS} from '../theme';
import {SceneShell, RegistrationMarks} from '../components/Stage';
import {Cross, InkRect, Label, Panel, Underline} from '../components/Ink';

const start = 50.72;
const end = 63.5;

const KernelArray: React.FC<{
  x: number;
  y: number;
  w: number;
  label: string;
  color: string;
  start: number;
  index?: number;
}> = ({x, y, w, label, color, start, index}) => {
  const cells = 9;
  const gap = 8;
  const cw = (w - gap * (cells - 1)) / cells;
  return (
    <g>
      <Label x={x} y={y - 42} size={38} color={color} start={start}>
        {label}
      </Label>
      {Array.from({length: cells}).map((_, i) => (
        <g key={i}>
          <InkRect
            x={x + i * (cw + gap)}
            y={y}
            w={cw}
            h={68}
            r={8}
            stroke={i === index ? C.yellow : color}
            width={i === index ? 4 : 2.5}
            fill={i === index ? C.yellow : C.line}
            fillOpacity={i === index ? 0.2 : 0.12}
            start={start + i * 1.5}
            dur={7}
          />
          {i !== 4 ? (
            <line
              x1={x + i * (cw + gap) + cw * 0.25}
              y1={y + 34}
              x2={x + i * (cw + gap) + cw * 0.75}
              y2={y + 34}
              stroke={C.dim}
              strokeWidth={2}
              opacity={0.45}
            />
          ) : (
            <text
              x={x + i * (cw + gap) + cw / 2}
              y={y + 33}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={C.dim}
              fontFamily='"Patrick Hand"'
              fontSize={36}
              opacity={0.8}
            >
              ...
            </text>
          )}
        </g>
      ))}
    </g>
  );
};

export const Scene03Kernel: React.FC = () => {
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

      {/* Big kernel card */}
      <g opacity={fade(50.7, 59.0, 9)}>
        <InkRect x={660} y={235} w={600} h={270} r={26} stroke={C.purple} width={5} fill={C.panel} fillOpacity={0.9} start={t(50.7)} dur={16} />
        <InkRect x={700} y={275} w={520} h={190} r={12} stroke={C.line} width={3} start={t(51.0)} dur={12} />
        <Label x={960} y={365} align="center" size={104} font="display" weight={700} color={C.purple} start={t(50.9)}>
          KERNEL
        </Label>
        <Label x={960} y={435} align="center" size={36} color={C.dim} start={t(51.4)}>
          the card every cook reads
        </Label>
      </g>

      {/* Wrong homonyms */}
      <g opacity={fade(52.5, 58.8, 8)}>
        <Panel x={350} y={650} w={430} h={230} fill={C.panel} stroke={C.line} start={t(52.5)} dur={11} />
        <InkRect x={390} y={680} w={110} h={85} r={8} stroke={C.cyan} width={3} start={t(52.7)} dur={8} fill={C.cyan} fillOpacity={0.06} />
        <text x={445} y={716} textAnchor="middle" fill={C.cyan} fontFamily='"Patrick Hand"' fontSize={36}>
          In [1]
        </text>
        <Label x={555} y={710} size={48} color={C.fg} start={t(52.9)}>
          Jupyter
        </Label>
        <Label x={555} y={760} size={36} color={C.dim} start={t(53.1)}>
          notebook kernel
        </Label>
        <Cross x={445} y={722} size={34} start={t(53.6)} />

        <Panel x={1120} y={650} w={450} h={230} fill={C.panel} stroke={C.line} start={t(53.2)} dur={11} />
        <InkRect x={1160} y={680} w={110} h={85} r={8} stroke={C.orange} width={3} start={t(53.4)} dur={8} />
        <InkRect x={1160} y={680} w={110} h={24} r={4} stroke={C.orange} width={2} start={t(53.8)} dur={6} />
        <text x={1215} y={732} textAnchor="middle" fill={C.orange} fontFamily='"Patrick Hand"' fontSize={36}>
          OS
        </text>
        <Label x={1325} y={710} size={48} color={C.fg} start={t(53.5)}>
          OS kernel
        </Label>
        <Label x={1325} y={760} size={36} color={C.dim} start={t(53.7)}>
          operating system
        </Label>
        <Cross x={1215} y={722} size={34} start={t(54.2)} />
      </g>


      {/* Lists of numbers */}
      <g opacity={fade(59.0)}>
        <KernelArray x={300} y={385} w={600} label="list A" color={C.cyan} start={t(59.2)} index={7} />
        <KernelArray x={300} y={560} w={600} label="list B" color={C.pink} start={t(59.5)} index={7} />
        <Label x={960} y={490} align="center" size={72} color={C.dim} start={t(59.6)}>
          +
        </Label>
        <Label x={1130} y={455} size={52} color={C.fg} start={t(60.1)}>
          ?
        </Label>
        <Label x={300} y={735} size={36} color={C.dim} start={t(60.0)}>
          262,144 numbers
        </Label>
      </g>
    </SceneShell>
  );
};
