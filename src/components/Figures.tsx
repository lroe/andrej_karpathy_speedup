import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {InkCircle, InkLine, InkPath, InkRect, Label, Panel, wobblyRect} from './Ink';

export const Cook: React.FC<{
  x: number;
  y: number;
  scale?: number;
  color?: string;
  apron?: string;
  start?: number;
  arm?: 'rest' | 'up' | 'carry' | 'chop';
  opacity?: number;
  hat?: boolean;
}> = ({x, y, scale = 1, color = C.fg, apron = C.green, start = 0, arm = 'rest', opacity = 1, hat = true}) => {
  const frame = useCurrentFrame();
  const appear = interpolate(frame, [start, start + 5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const arms =
    arm === 'up'
      ? 'M -4 -78 L -38 -104 M 4 -78 L 38 -104'
      : arm === 'carry'
        ? 'M -4 -78 L -34 -66 L -22 -48 M 4 -78 L 34 -66 L 22 -48'
        : arm === 'chop'
          ? 'M -4 -78 L -34 -54 L -20 -36 M 4 -78 L 30 -60 L 20 -42'
          : 'M -4 -78 L -32 -52 M 4 -78 L 32 -52';
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity * appear}>
      {hat ? (
        <g>
          <InkPath d="M -17 -119 L 17 -119 L 15 -101 L -15 -101 Z" stroke={color} width={3.5} start={start} dur={9} fill={C.fg} fillOpacity={0.08} />
          <InkPath d="M -17 -119 C -21 -128 -10 -132 -3 -126 C 2 -134 15 -133 18 -123 C 24 -122 21 -115 17 -119" stroke={color} width={3.5} start={start + 3} dur={9} />
        </g>
      ) : null}
      <InkCircle cx={0} cy={-84} r={14} stroke={color} width={3.5} start={start} dur={9} fill={C.fg} fillOpacity={0.07} />
      <circle cx={-5} cy={-86} r={1.8} fill={color} />
      <circle cx={5} cy={-86} r={1.8} fill={color} />
      <InkPath d="M -4 -77 C -1 -74 1 -74 4 -77" stroke={color} width={2.5} start={start + 4} dur={5} />
      <InkPath d={`M 0 -70 L 0 -36`} stroke={color} width={3.5} start={start + 2} dur={8} />
      <InkPath d={arms} stroke={color} width={3.5} start={start + 4} dur={9} />
      <InkPath d="M 0 -36 L -15 0 M 0 -36 L 15 0" stroke={color} width={3.5} start={start + 6} dur={8} />
      <InkPath d="M -24 0 L -9 0 M 9 0 L 24 0" stroke={color} width={3.5} start={start + 9} dur={5} />
      <InkPath d={`M -10 -64 L 10 -64`} stroke={apron} width={4} start={start + 8} dur={6} />
    </g>
  );
};

export const Chef: React.FC<{
  x: number;
  y: number;
  scale?: number;
  start?: number;
  color?: string;
  accent?: string;
  arm?: 'rest' | 'call' | 'read' | 'point';
  opacity?: number;
}> = ({x, y, scale = 1, start = 0, color = C.fg, accent = C.purple, arm = 'rest', opacity = 1}) => {
  const frame = useCurrentFrame();
  const appear = interpolate(frame, [start, start + 5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const arms =
    arm === 'call'
      ? 'M -12 -150 L -62 -178 L -92 -190 M 12 -150 L 50 -166'
      : arm === 'read'
        ? 'M -12 -150 L -52 -128 L -24 -100 M 12 -150 L 52 -128 L 24 -100'
        : arm === 'point'
          ? 'M -12 -150 L -58 -140 M 12 -150 L 58 -160 L 80 -170'
          : 'M -12 -150 L -46 -112 M 12 -150 L 46 -112';
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity * appear}>
      <InkPath d="M -34 -228 L 34 -228 L 28 -194 L -28 -194 Z" stroke={color} width={4} start={start} dur={10} fill={C.fg} fillOpacity={0.08} />
      <InkPath d="M -34 -228 C -40 -244 -22 -252 -10 -242 C -2 -254 20 -252 26 -236 C 36 -234 34 -222 28 -226" stroke={color} width={4} start={start + 4} dur={10} />
      <InkCircle cx={0} cy={-178} r={24} stroke={color} width={4} start={start} dur={10} fill={C.fg} fillOpacity={0.07} />
      <circle cx={-8} cy={-181} r={2.5} fill={color} />
      <circle cx={8} cy={-181} r={2.5} fill={color} />
      <InkPath d="M -7 -168 C -2 -163 2 -163 7 -168" stroke={color} width={3} start={start + 5} dur={6} />
      <InkPath d="M 0 -154 L 0 -92" stroke={color} width={4} start={start + 2} dur={9} />
      <InkPath d={arms} stroke={color} width={4} start={start + 5} dur={10} />
      <InkPath d="M 0 -92 L -28 0 M 0 -92 L 28 0" stroke={color} width={4} start={start + 7} dur={9} />
      <InkPath d="M -44 0 L -18 0 M 18 0 L 44 0" stroke={color} width={4} start={start + 10} dur={5} />
      <InkPath d="M -22 -144 L 22 -144 L 18 -98 L -18 -98 Z" stroke={accent} width={3.5} start={start + 7} dur={8} fill={accent} fillOpacity={0.1} />
      <InkPath d="M 0 -138 L 0 -104" stroke={accent} width={3} start={start + 10} dur={5} />
    </g>
  );
};

export const Onion: React.FC<{x: number; y: number; size?: number; start?: number; color?: string; opacity?: number}> = ({
  x,
  y,
  size = 1,
  start = 0,
  color = C.pink,
  opacity = 1,
}) => (
  <g transform={`translate(${x} ${y}) scale(${size})`} opacity={opacity}>
    <InkCircle cx={0} cy={0} r={18} stroke={color} width={3.5} start={start} dur={9} fill={color} fillOpacity={0.08} />
    <InkPath d="M -8 -14 C -14 -2 -10 10 0 16 M 8 -14 C 14 -2 10 10 0 16" stroke={color} width={2.5} start={start + 4} dur={8} />
    <InkPath d="M 0 -18 C 0 -26 -4 -31 -7 -35 M 0 -18 C 3 -27 8 -31 11 -34" stroke={C.green} width={3} start={start + 6} dur={7} />
  </g>
);

export const GpuChip: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  start?: number;
  color?: string;
  label?: string;
  sublabel?: string;
  pins?: boolean;
  opacity?: number;
}> = ({x, y, w = 260, h = 260, start = 0, color = C.purple, label = 'GPU', sublabel, pins = true, opacity = 1}) => {
  const pinCount = 9;
  return (
    <g opacity={opacity}>
      {pins ? (
        <g>
          {Array.from({length: pinCount}).map((_, i) => {
            const px = x + 20 + (i * (w - 40)) / (pinCount - 1);
            return (
              <g key={`p${i}`}>
                <InkLine x1={px} y1={y - 16} x2={px} y2={y} stroke={color} width={4} start={start + i} dur={4} opacity={0.8} />
                <InkLine x1={px} y1={y + h} x2={px} y2={y + h + 16} stroke={color} width={4} start={start + i} dur={4} opacity={0.8} />
              </g>
            );
          })}
          {Array.from({length: pinCount}).map((_, i) => {
            const py = y + 20 + (i * (h - 40)) / (pinCount - 1);
            return (
              <g key={`q${i}`}>
                <InkLine x1={x - 16} y1={py} x2={x} y2={py} stroke={color} width={4} start={start + i} dur={4} opacity={0.8} />
                <InkLine x1={x + w} y1={py} x2={x + w + 16} y2={py} stroke={color} width={4} start={start + i} dur={4} opacity={0.8} />
              </g>
            );
          })}
        </g>
      ) : null}
      <InkRect x={x} y={y} w={w} h={h} r={22} stroke={color} width={5} fill={C.panel} fillOpacity={0.85} start={start} dur={16} />
      <InkRect x={x + 28} y={y + 28} w={w - 56} h={h - 56} r={12} stroke={color} width={3} start={start + 6} dur={12} fill={C.well} fillOpacity={0.8} />
      <InkPath d={`M ${x + 52} ${y + h / 2} L ${x + w - 52} ${y + h / 2}`} stroke={color} width={2} start={start + 10} dur={8} opacity={0.35} />
      {label ? (
        <Label x={x + w / 2} y={y + h / 2} align="center" size={w * 0.19} color={color} font="display" weight={700} start={start + 10}>
          {label}
        </Label>
      ) : null}
      {sublabel ? (
        <Label x={x + w / 2} y={y + h / 2 + w * 0.15} align="center" size={Math.max(36, w * 0.085)} color={C.dim} start={start + 14}>
          {sublabel}
        </Label>
      ) : null}
    </g>
  );
};

export const Station: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  start?: number;
  active?: boolean;
  color?: string;
  idle?: boolean;
  opacity?: number;
  label?: string;
}> = ({x, y, w = 54, h = 38, start = 0, active = true, color = C.green, idle = false, opacity = 1, label}) => {
  const frame = useCurrentFrame();
  const appear = interpolate(frame, [start, start + 5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
  <g opacity={opacity * appear}>
    <InkRect
      x={x}
      y={y}
      w={w}
      h={h}
      r={6}
      stroke={idle ? C.red : active ? color : C.line}
      width={idle ? 3.5 : 3}
      fill={active ? color : C.line}
      fillOpacity={active ? 0.14 : 0.06}
      start={start}
      dur={6}
    />
    <circle cx={x + w / 2} cy={y + h / 2} r={active ? 5 : 3} fill={idle ? C.red : active ? color : C.dim} opacity={active || idle ? 1 : 0.5} />
    {label ? <Label x={x + w / 2} y={y - 14} align="center" size={36} color={C.dim} start={start + 4}>{label}</Label> : null}
  </g>
  );
};

export const Counter: React.FC<{x: number; y: number; w: number; start?: number; h?: number; color?: string; label?: string}> = ({
  x,
  y,
  w,
  h = 16,
  start = 0,
  color = C.line,
  label,
}) => (
  <g>
    <InkLine x1={x} y1={y} x2={x + w} y2={y} stroke={color} width={5} start={start} dur={18} />
    <InkLine x1={x + 10} y1={y + h} x2={x + w - 10} y2={y + h} stroke={color} width={3} start={start + 4} dur={18} opacity={0.55} />
    {label ? <Label x={x + w / 2} y={y + 44} align="center" size={36} color={C.dim} start={start + 10}>{label}</Label> : null}
  </g>
);

export const Pantry: React.FC<{x: number; y: number; w?: number; h?: number; start?: number; opacity?: number}> = ({
  x,
  y,
  w = 360,
  h = 300,
  start = 0,
  opacity = 1,
}) => {
  const shelfY = [y + 80, y + 160, y + 240];
  return (
    <g opacity={opacity}>
      <InkRect x={x} y={y} w={w} h={h} r={8} stroke={C.orange} width={4} fill={C.panel} fillOpacity={0.5} start={start} dur={16} />
      {shelfY.map((sy, i) => (
        <InkLine key={sy} x1={x + 10} y1={sy} x2={x + w - 10} y2={sy} stroke={C.orange} width={3.5} start={start + 6 + i * 3} dur={12} opacity={0.8} />
      ))}
      {Array.from({length: 10}).map((_, i) => {
        const crateX = x + 28 + (i % 4) * 76;
        const crateY = i < 4 ? shelfY[0] - 48 : i < 7 ? shelfY[1] - 48 : shelfY[2] - 48;
        return (
          <g key={i}>
            <InkRect x={crateX} y={crateY} w={52} h={40} r={4} stroke={C.orange} width={2.5} start={start + 10 + i * 2} dur={8} fill={C.orange} fillOpacity={0.08} />
            <InkLine x1={crateX + 8} y1={crateY + 12} x2={crateX + 44} y2={crateY + 12} stroke={C.orange} width={2} start={start + 14 + i * 2} dur={6} opacity={0.5} />
          </g>
        );
      })}
      <Label x={x + w / 2} y={y + h + 38} align="center" size={36} color={C.orange} start={start + 12}>
        {`MAIN MEMORY`}
      </Label>
    </g>
  );
};

export const Matrix: React.FC<{
  x: number;
  y: number;
  rows: number;
  cols: number;
  cell?: number;
  gap?: number;
  start?: number;
  color?: string;
  fill?: string;
  opacity?: number;
  labels?: string[];
  highlight?: Array<[number, number]>;
  highlightColor?: string;
  highlightRow?: number;
  highlightCol?: number;
  rowColor?: string;
  colColor?: string;
  numbers?: boolean;
}> = ({
  x,
  y,
  rows,
  cols,
  cell = 26,
  gap = 3,
  start = 0,
  color = C.cyan,
  fill = C.cyan,
  opacity = 1,
  labels,
  highlight = [],
  highlightColor = C.yellow,
  highlightRow,
  highlightCol,
  rowColor = C.yellow,
  colColor = C.yellow,
  numbers = false,
}) => {
  const step = cell + gap;
  const w = cols * step - gap;
  const h = rows * step - gap;
  const lines: string[] = [];
  for (let c = 1; c < cols; c++) lines.push(`M ${x + c * step} ${y} L ${x + c * step} ${y + h}`);
  for (let r = 1; r < rows; r++) lines.push(`M ${x} ${y + r * step} L ${x + w} ${y + r * step}`);
  const frameLines = lines;
  return (
    <g opacity={opacity}>
      <InkRect x={x - 6} y={y - 6} w={w + 12} h={h + 12} r={6} stroke={color} width={3.5} start={start} dur={10} />
      {highlightRow !== undefined ? (
        <rect x={x - gap / 2} y={y + highlightRow * step - gap / 2} width={w + gap} height={cell + gap} rx={3} fill={rowColor} opacity={0.18} />
      ) : null}
      {highlightCol !== undefined ? (
        <rect x={x + highlightCol * step - gap / 2} y={y - gap / 2} width={cell + gap} height={h + gap} rx={3} fill={colColor} opacity={0.18} />
      ) : null}
      <path d={frameLines.join(' ')} stroke={color} strokeWidth={1.2} opacity={0.35} fill="none" />
      {highlight.map(([r, c], i) => (
        <rect
          key={i}
          x={x + c * step - gap / 2}
          y={y + r * step - gap / 2}
          width={cell + gap}
          height={cell + gap}
          rx={3}
          fill={highlightColor}
          opacity={0.22}
        />
      ))}
      {numbers
        ? Array.from({length: Math.min(rows, 6)}).map((_, r) =>
            Array.from({length: Math.min(cols, 6)}).map((_, c) => (
              <text
                key={`${r}-${c}`}
                x={x + c * step + cell / 2}
                y={y + r * step + cell / 2 + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={C.dim}
                fontFamily={FONT.hand}
                fontSize={Math.max(13, cell * 0.5)}
                opacity={0.85}
              >
                {Math.round(Math.sin(r * 9 + c * 3) * 4 + 5)}
              </text>
            )),
          )
        : null}
      {labels?.map((l, i) => (
        <Label key={l} x={x + (i * w) / Math.max(1, labels.length - 1)} y={y + h + 30} align={i === 0 ? 'left' : i === labels.length - 1 ? 'right' : 'center'} size={36} color={C.dim} start={start + 8}>
          {l}
        </Label>
      ))}
    </g>
  );
};

export const Terminal: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  start?: number;
  title?: string;
  lines: Array<{text: string; color?: string; size?: number; indent?: number; start?: number}>;
  opacity?: number;
}> = ({x, y, w, h, start = 0, title = 'terminal', lines, opacity = 1}) => (
  <g opacity={opacity}>
    <Panel x={x} y={y} w={w} h={h} fill={C.well} stroke={C.line} start={start} dur={14} />
    <InkLine x1={x} y1={y + 50} x2={x + w} y2={y + 50} stroke={C.line} width={2} start={start + 6} dur={10} opacity={0.8} />
    {[C.red, C.yellow, C.green].map((c, i) => (
      <circle key={c} cx={x + 26 + i * 22} cy={y + 25} r={5} fill={c} opacity={0.8} />
    ))}
    <text x={x + w - 24} y={y + 26} textAnchor="end" dominantBaseline="middle" fill={C.dim} fontFamily={FONT.hand} fontSize={36}>
      {title}
    </text>
    {lines.map((l, i) => (
      <text
        key={i}
        x={x + 36 + (l.indent ?? 0)}
        y={y + 92 + i * 38}
        fill={l.color ?? C.fg}
        fontFamily={'ui-monospace, "DejaVu Sans Mono", monospace'}
        fontSize={l.size ?? 28}
        opacity={1}
      >
        {l.text}
      </text>
    ))}
  </g>
);
