import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FPS} from '../theme';
import {SceneShell, RegistrationMarks} from '../components/Stage';
import {Arrow, Check, InkRect, Label, Panel, Pill} from '../components/Ink';

const start = 451.32;
const end = 482.04;

const Bar: React.FC<{
  x: number;
  baseline: number;
  w: number;
  h: number;
  label: string;
  value: string;
  color: string;
  start: number;
  dim?: number;
}> = ({x, baseline, w, h, label, value, color, start, dim = 1}) => {
  const frame = useCurrentFrame();
  const fill = interpolate(frame, [start + 2, start + 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
  <g opacity={dim}>
    <InkRect x={x} y={baseline - h} w={w} h={h} r={5} stroke={color} width={3.5} fill={color} fillOpacity={0.18} start={start} dur={10} />
    <rect x={x} y={baseline - h + (h * (1 - fill))} width={w} height={h * fill} rx={5} fill={color} opacity={0.14} />
    <Label x={x + w / 2} y={baseline + 42} align="center" size={36} color={C.dim} start={start + 2}>
      {label}
    </Label>
    {value ? (
      <Label x={x + w / 2} y={baseline - h - 24} align="center" size={44} color={color} start={start + 4}>
        {value}
      </Label>
    ) : null}
  </g>
  );
};

export const Scene19Diy: React.FC = () => {
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

      <g opacity={fade(451.3, 461.8, 7)}>
        <Label x={300} y={160} size={42} color={C.orange} start={t(451.4)}>
          DIY KERNELS
        </Label>

        <Panel x={280} y={280} w={560} h={320} fill={C.panel} stroke={C.purple} start={t(451.6)} dur={12} />
        <Label x={560} y={350} align="center" size={64} color={C.purple} font="display" weight={700} start={t(451.8)}>
          Unsloth
        </Label>
        <Label x={560} y={410} align="center" size={38} color={C.dim} start={t(453.4)}>
          fine-tuning toolkit
        </Label>
        <Label x={560} y={480} align="center" size={36} color={C.fg} start={t(455.2)}>
          adjusts a model on new examples
        </Label>
        <Label x={560} y={540} align="center" size={36} color={C.dim} start={t(456.0)}>
          wrote its own kernels
        </Label>

        <Panel x={980} y={270} w={620} h={440} fill={C.panel} stroke={C.line} start={t(457.2)} dur={12} />
        <Label x={1290} y={320} align="center" size={38} color={C.dim} start={t(457.4)}>
          TRAINING SPEED
        </Label>
        <InkRect x={1040} y={620} w={500} h={3} stroke={C.line} width={2} start={t(457.5)} dur={6} />
        <Bar x={1110} baseline={620} w={130} h={110} label="Hugging Face" value="1×" color={C.dim} start={t(457.6)} />
        <Bar x={1320} baseline={620} w={130} h={220} label="Unsloth" value="2×" color={C.green} start={t(458.0)} />
      </g>

      <g opacity={fade(461.9, 478.0, 7)}>
        <Label x={300} y={160} size={42} color={C.pink} start={t(462.0)}>
          MARLIN
        </Label>
        <Label x={300} y={220} size={36} color={C.dim} start={t(462.4)}>
          a 4-bit kernel
        </Label>

        <Panel x={280} y={280} w={560} h={320} fill={C.panel} stroke={C.pink} start={t(462.4)} dur={12} />
        <Label x={560} y={350} align="center" size={64} color={C.pink} font="display" weight={700} start={t(462.6)}>
          Marlin
        </Label>
        <Label x={560} y={410} align="center" size={38} color={C.dim} start={t(463.0)}>
          squeezes numbers to 4 bits
        </Label>
        <Label x={560} y={480} align="center" size={36} color={C.fg} start={t(466.0)}>
          smaller memory footprint
        </Label>
        <Pill x={450} y={520} w={220} h={62} size={42} color={C.pink} fill={C.panel} start={t(466.4)}>
          4-bit
        </Pill>

        <Panel x={980} y={270} w={620} h={440} fill={C.panel} stroke={C.line} start={t(467.6)} dur={12} />
        <Label x={1290} y={320} align="center" size={38} color={C.dim} start={t(467.8)}>
          SERVING SPEED
        </Label>
        <Label x={1290} y={365} align="center" size={38} color={C.cyan} start={t(468.4)}>
          inside vLLM
        </Label>
        <InkRect x={1040} y={620} w={500} h={3} stroke={C.line} width={2} start={t(468.0)} dur={6} />
        <Bar x={1110} baseline={620} w={130} h={22} label="basic 4-bit" value="1×" color={C.dim} start={t(468.1)} />
        <Bar x={1320} baseline={620} w={130} h={220} label="Marlin" value="" color={C.green} start={t(468.6)} />
        <Label x={1510} y={430} align="center" size={96} color={C.green} font="display" weight={700} start={t(470.0)}>
          10×
        </Label>
      </g>

      <g opacity={fade(478.1)}>
        <Label x={550} y={500} align="center" size={104} color={C.green} font="display" weight={700} start={t(478.3)}>
          2×
        </Label>
        <Label x={550} y={565} align="center" size={38} color={C.dim} start={t(478.5)}>
          Unsloth
        </Label>
        <Label x={1370} y={500} align="center" size={104} color={C.green} font="display" weight={700} start={t(478.4)}>
          10×
        </Label>
        <Label x={1370} y={565} align="center" size={38} color={C.dim} start={t(478.6)}>
          Marlin
        </Label>
        <Label x={960} y={665} align="center" size={54} color={C.yellow} start={t(478.2)}>
          they sell speed
        </Label>
        <Label x={960} y={735} align="center" size={40} color={C.dim} start={t(479.0)}>
          so the effort pays for them
        </Label>
      </g>
    </SceneShell>
  );
};
