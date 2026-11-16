import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FPS} from '../theme';
import {SceneShell, RegistrationMarks} from '../components/Stage';
import {Arrow, InkPath, InkRect, Label, Panel, Pill} from '../components/Ink';
import {Chef, GpuChip, Onion, Terminal} from '../components/Figures';

const start = 364.52;
const end = 401.5;

export const Scene16Batch: React.FC = () => {
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

      {/* Batch test */}
      <g opacity={fade(364.5, 373.8, 7)}>
        <Label x={300} y={160} size={42} color={C.cyan} start={t(364.6)}>
          THE BATCH TEST
        </Label>
        <Label x={960} y={250} align="center" size={52} color={C.yellow} start={t(364.9)}>
          double the batch
        </Label>
        <Label x={430} y={420} align="center" size={40} color={C.cyan} start={t(365.9)}>
          batch 4
        </Label>
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(0 ${Math.sin((frame + i * 8) / 10) * 5})`}>
            <Onion x={390 + i * 105} y={480} size={1.15} start={t(364.8 + i * 0.05)} color={C.pink} />
          </g>
        ))}
        <Arrow x1={850} y1={480} x2={950} y2={480} stroke={C.green} width={6} start={t(366.6)} dur={12} />
        <Label x={1250} y={420} align="center" size={40} color={C.green} start={t(367.0)}>
          batch 8
        </Label>
        {Array.from({length: 8}).map((_, i) => (
          <g key={`b${i}`} transform={`translate(0 ${Math.sin((frame + i * 6) / 9) * 4})`}>
            <Onion x={1020 + i * 68} y={480} size={0.88} start={t(365.35 + i * 0.05)} color={i % 2 ? C.yellow : C.pink} />
          </g>
        ))}
        <Label x={960} y={700} align="center" size={46} color={C.yellow} start={t(369.6)}>
          twice the work per order
        </Label>
      </g>

      {/* Work/time bars */}
      <g opacity={fade(373.9, 381.2, 7)}>
        <Label x={400} y={380} size={42} color={C.dim} start={t(374.0)}>
          WORK
        </Label>
        <InkRect x={650} y={350} w={800} h={44} r={6} stroke={C.line} width={2} fill={C.line} fillOpacity={0.2} start={t(374.0)} dur={8} />
        <rect x={650} y={350} width={800} height={44} rx={5} fill={C.green} opacity={0.5 * fade(374.4)} />
        <Label x={1520} y={382} align="right" size={54} color={C.green} start={t(375.6)}>
          2×
        </Label>
        <Label x={400} y={530} size={42} color={C.dim} start={t(374.5)}>
          TIME
        </Label>
        <InkRect x={650} y={500} w={800} h={44} r={6} stroke={C.line} width={2} fill={C.line} fillOpacity={0.2} start={t(374.5)} dur={8} />
        <rect x={650} y={500} width={440} height={44} rx={5} fill={C.orange} opacity={0.65 * fade(374.9)} />
        <line x1={1050} y1={485} x2={1050} y2={560} stroke={C.fg} strokeWidth={2} strokeDasharray="7 8" opacity={0.5} />
        <Label x={1050} y={600} align="center" size={36} color={C.dim} start={t(375.9)}>
          one batch
        </Label>
        <Label x={1520} y={532} align="right" size={54} color={C.orange} start={t(376.6)}>
          +10%
        </Label>
        <Label x={960} y={700} align="center" size={46} color={C.red} start={t(379.0)}>
          the chef was the bottleneck
        </Label>
        <Chef x={350} y={930} scale={0.62} start={t(379.3)} arm="point" accent={C.red} />
        <Label x={350} y={985} align="center" size={36} color={C.red} start={t(379.6)}>
          CPU
        </Label>
      </g>

      {/* CUDA graph */}
      <g opacity={fade(381.3, 393.5, 7)}>
        <Label x={960} y={180} align="center" size={54} color={C.purple} start={t(381.4)}>
          CUDA GRAPH
        </Label>
        <GpuChip x={280} y={300} w={280} h={260} start={t(381.6)} color={C.purple} label="CUDA" />
        <Label x={420} y={235} align="center" size={36} color={C.dim} start={t(382.0)}>
          NVIDIA toolkit
        </Label>
        <Label x={960} y={620} align="center" size={38} color={C.dim} start={t(382.3)}>
          a routine, written once
        </Label>
        <g opacity={fade(381.6, 388.4, 6)}>
          {Array.from({length: 8}).map((_, i) => (
            <InkRect key={i} x={680 + i * 110} y={380} w={88} h={52} r={6} stroke={C.purple} width={2.5} start={t(382.0 + i * 0.08)} dur={7} fill={C.purple} fillOpacity={0.08} />
          ))}
        </g>
        <g opacity={fade(388.5)}>
          <InkRect x={760} y={370} w={560} h={120} r={16} stroke={C.green} width={5} fill={C.green} fillOpacity={0.1} start={t(388.5)} dur={12} />
          <Label x={1040} y={425} align="center" size={64} color={C.green} font="display" weight={700} start={t(388.7)}>
            one launch
          </Label>
        </g>
      </g>

      {/* torch.compile setup */}
      <g opacity={fade(393.6, 398.3, 6)}>
        <Terminal
          x={340}
          y={700}
          w={1240}
          h={170}
          title="python"
          start={t(393.6)}
          lines={[{text: 'torch.compile(model, mode="reduce-overhead")', color: C.green, size: 38}]}
        />
      </g>

      {/* nvidia-smi handoff */}
      <g opacity={fade(398.4)}>
        <Terminal
          x={560}
          y={740}
          w={800}
          h={150}
          title="shell"
          start={t(398.4)}
          lines={[{text: '$ nvidia-smi', color: C.cyan, size: 46}]}
        />
      </g>
    </SceneShell>
  );
};
