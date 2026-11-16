import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FPS} from '../theme';
import {SceneShell, RegistrationMarks} from '../components/Stage';
import {InkCircle, InkLine, InkPath, InkRect, Label, Panel} from '../components/Ink';
import {Station} from '../components/Figures';

const start = 401.5;
const end = 436.2;

export const Scene17NvidiaSmi: React.FC = () => {
  const frame = useCurrentFrame();
  const t = (s: number) => Math.round((s - start) * FPS);
  const fade = (show: number, hide?: number, dur = 8) => {
    const inn = interpolate(frame, [t(show), t(show) + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    if (hide === undefined) return inn;
    const out = interpolate(frame, [t(hide) - dur, t(hide)], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    return Math.min(inn, out);
  };
  const trainW = interpolate(frame, [t(416.8), t(435.0)], [0, 480], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <SceneShell duration={Math.round((end - start) * FPS)}>
      <RegistrationMarks />

      {/* nvidia-smi panel */}
      <g opacity={fade(401.6, 430.3, 7)}>
        <Panel x={300} y={200} w={1320} h={470} fill={C.well} stroke={C.line} start={t(401.6)} dur={14} />
        <InkLine x1={300} y1={280} x2={1620} y2={280} stroke={C.line} width={2} start={t(402.0)} dur={10} opacity={0.8} />
        <Label x={350} y={242} size={42} color={C.fg} start={t(401.8)}>
          NVIDIA-SMI
        </Label>
        <Label x={1570} y={242} align="right" size={36} color={C.dim} start={t(402.3)}>
          driver 580.1
        </Label>
        <Label x={350} y={330} size={36} color={C.dim} start={t(401.9)}>
          GPU  A100-SXM4
        </Label>
        <Label x={350} y={405} size={40} color={C.dim} start={t(405.5)}>
          MEMORY
        </Label>
        <Label x={1570} y={405} align="right" size={48} color={C.fg} start={t(405.6)}>
          38.2 / 40 GB
        </Label>
        <Label x={350} y={485} size={40} color={C.dim} start={t(406.9)}>
          TEMP
        </Label>
        <Label x={1570} y={485} align="right" size={48} color={C.orange} start={t(407.0)}>
          71 C
        </Label>
        <Label x={350} y={565} size={40} color={C.dim} start={t(407.6)}>
          POWER
        </Label>
        <Label x={1570} y={565} align="right" size={48} color={C.yellow} start={t(407.7)}>
          220 W
        </Label>
        <Label x={350} y={635} size={40} color={C.dim} start={t(408.8)}>
          UTIL
        </Label>
        <Label x={1570} y={635} align="right" size={64} color={C.red} start={t(408.9)}>
          100%
        </Label>
        <g opacity={fade(413.3, 416.5, 7)}>
          <InkCircle cx={1465} cy={632} r={105} stroke={C.red} width={4} start={t(413.4)} dur={12} />
        </g>
      </g>

      {/* 100% vs training crawls */}
      <g opacity={fade(416.7, 430.4, 7)}>
        <Label x={700} y={800} align="center" size={104} color={C.red} font="display" weight={700} start={t(416.8)}>
          100%
        </Label>
        <Label x={700} y={865} align="center" size={36} color={C.dim} start={t(417.2)}>
          utilisation
        </Label>
        <InkRect x={300} y={915} w={700} h={28} r={5} stroke={C.line} width={2} fill={C.line} fillOpacity={0.16} start={t(416.9)} dur={8} />
        <rect x={300} y={915} width={trainW} height={28} rx={4} fill={C.orange} opacity={0.55} />
        <Label x={300} y={990} size={38} color={C.orange} start={t(417.4)}>
          training crawls
        </Label>

        <g opacity={fade(420.6, 430.3, 7)}>
          <InkRect x={310} y={915} w={80} h={28} r={4} stroke={C.purple} width={3} fill={C.purple} fillOpacity={0.3} start={t(420.7)} dur={8} />
          <Label x={420} y={875} size={36} color={C.purple} start={t(420.9)}>
            one kernel
          </Label>
        </g>

        <g opacity={fade(423.7, 430.3, 7)}>
          <Label x={960} y={735} align="center" size={38} color={C.purple} start={t(423.8)}>
            one kernel, a handful of cooks
          </Label>
          <KitchenBusy start={t(423.8)} />
          <Label x={1520} y={1005} align="center" size={36} color={C.dim} start={t(424.6)}>
            3 / 108 busy
          </Label>
        </g>
      </g>

      {/* Door light */}
      <g opacity={fade(430.5)}>
        <InkRect x={500} y={700} w={250} h={300} r={8} stroke={C.yellow} width={4} fill={C.panel} fillOpacity={0.5} start={t(430.5)} dur={12} />
        <InkRect x={530} y={730} w={190} h={240} r={4} stroke={C.yellow} width={2.5} start={t(430.7)} dur={10} fill={C.well} fillOpacity={0.8} />
        <InkCircle cx={680} cy={850} r={7} stroke={C.yellow} width={3} start={t(431.0)} dur={6} />
        {[0, 1, 2, 3, 4].map((i) => (
          <InkPath
            key={i}
            d={`M ${750} ${720 + i * 48} C ${840} ${700 + i * 48} ${900} ${690 + i * 48} ${980} ${680 + i * 48}`}
            stroke={C.yellow}
            width={4}
            start={t(431.2 + i * 0.06)}
            dur={10}
            opacity={0.32}
          />
        ))}
        <Label x={1060} y={760} size={44} color={C.yellow} start={t(431.4)}>
          light on
        </Label>
        <Label x={1060} y={830} size={44} color={C.red} start={t(431.7)}>
          0 cooks
        </Label>
        <Label x={960} y={1015} align="center" size={44} color={C.fg} start={t(433.2)}>
          light on, kitchen empty
        </Label>
      </g>
    </SceneShell>
  );
};

const KitchenBusy: React.FC<{start: number}> = ({start}) => (
  <g>
    {Array.from({length: 108}).map((_, i) => {
      const col = i % 12;
      const row = Math.floor(i / 12);
      return (
        <Station
          key={i}
          x={1160 + col * 26}
          y={760 + row * 20}
          w={22}
          h={16}
          start={start + i * 0.01}
          active={i < 3}
          color={C.green}
        />
      );
    })}
  </g>
);
