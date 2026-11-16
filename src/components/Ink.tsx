import React from 'react';
import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT} from '../theme';

/* ------------------------------------------------------------------ *
 *  Small deterministic pseudo-random helpers for hand-drawn geometry  *
 * ------------------------------------------------------------------ */

const rnd = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const jitter = (seed: number, amount = 1) => (rnd(seed) - 0.5) * 2 * amount;

export const wobblyRect = (x: number, y: number, w: number, h: number, r = 12, seed = 1, wob = 1.4) => {
  const j = (n: number) => jitter(seed + n, wob);
  const rr = Math.min(r, w / 2, h / 2);
  return [
    `M ${x + rr} ${y + j(1)}`,
    `C ${x + w * 0.3} ${y + j(2)} ${x + w * 0.7} ${y + j(3)} ${x + w - rr} ${y + j(4)}`,
    `Q ${x + w + j(5)} ${y + j(6)} ${x + w + j(7)} ${y + rr}`,
    `C ${x + w + j(8)} ${y + h * 0.33} ${x + w + j(9)} ${y + h * 0.66} ${x + w + j(10)} ${y + h - rr}`,
    `Q ${x + w + j(11)} ${y + h + j(12)} ${x + w - rr} ${y + h + j(13)}`,
    `C ${x + w * 0.66} ${y + h + j(14)} ${x + w * 0.33} ${y + h + j(15)} ${x + rr} ${y + h + j(16)}`,
    `Q ${x + j(17)} ${y + h + j(18)} ${x + j(19)} ${y + h - rr}`,
    `C ${x + j(20)} ${y + h * 0.66} ${x + j(21)} ${y + h * 0.33} ${x + j(22)} ${y + rr}`,
    `Q ${x + j(23)} ${y + j(24)} ${x + rr} ${y + j(1)}`,
    'Z',
  ].join(' ');
};

export const wobblyCircle = (cx: number, cy: number, r: number) => {
  const k = r * 0.5523;
  return [
    `M ${cx} ${cy - r}`,
    `C ${cx + k} ${cy - r} ${cx + r} ${cy - k} ${cx + r} ${cy}`,
    `C ${cx + r} ${cy + k} ${cx + k} ${cy + r} ${cx} ${cy + r}`,
    `C ${cx - k} ${cy + r} ${cx - r} ${cy + k} ${cx - r} ${cy}`,
    `C ${cx - r} ${cy - k} ${cx - k} ${cy - r} ${cx} ${cy - r}`,
    'Z',
  ].join(' ');
};

/* ------------------------------------------------------------------ *
 *  Ink linework                                                       *
 * ------------------------------------------------------------------ */

type DrawProps = {
  start?: number;
  dur?: number;
  stroke?: string;
  width?: number;
  opacity?: number;
  fill?: string;
  fillOpacity?: number;
  linecap?: 'round' | 'butt' | 'square';
  dash?: string;
};

export const InkPath: React.FC<DrawProps & {d: string; className?: string}> = ({
  d,
  start = 0,
  dur = 18,
  stroke = C.fg,
  width = 4,
  opacity = 1,
  fill,
  fillOpacity = 0,
  linecap = 'round',
  dash,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [start, start + Math.max(1, dur)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const fillP = interpolate(frame, [start + dur * 0.1, start + dur * 0.9], [0, fillOpacity], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <g opacity={opacity}>
      {fill ? <path d={d} fill={fill} stroke="none" opacity={fillP} /> : null}
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={width}
        strokeLinecap={linecap}
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray={dash ?? '1'}
        strokeDashoffset={dash ? 0 : 1 - p}
        opacity={p > 0 ? 1 : 0}
      />
    </g>
  );
};

export const InkRect: React.FC<
  DrawProps & {x: number; y: number; w: number; h: number; r?: number; seed?: number; wob?: number}
> = ({x, y, w, h, r = 14, seed = 1, wob = 1.2, ...rest}) => (
  <InkPath d={wobblyRect(x, y, w, h, r, seed, wob)} {...rest} />
);

export const InkCircle: React.FC<DrawProps & {cx: number; cy: number; r: number}> = ({
  cx,
  cy,
  r,
  ...rest
}) => <InkPath d={wobblyCircle(cx, cy, r)} {...rest} />;

export const InkLine: React.FC<DrawProps & {x1: number; y1: number; x2: number; y2: number}> = ({
  x1,
  y1,
  x2,
  y2,
  ...rest
}) => <InkPath d={`M ${x1} ${y1} L ${x2} ${y2}`} {...rest} />;

/* ------------------------------------------------------------------ *
 *  Arrows                                                             *
 * ------------------------------------------------------------------ */

export const Arrow: React.FC<
  DrawProps & {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    head?: number;
    dashed?: boolean;
  }
> = ({x1, y1, x2, y2, start = 0, dur = 14, stroke = C.fg, width = 4, opacity = 1, head = 16, dashed}) => {
  const frame = useCurrentFrame();
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const p = interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const hx1 = x2 - head * Math.cos(angle - Math.PI / 7);
  const hy1 = y2 - head * Math.sin(angle - Math.PI / 7);
  const hx2 = x2 - head * Math.cos(angle + Math.PI / 7);
  const hy2 = y2 - head * Math.sin(angle + Math.PI / 7);
  return (
    <g opacity={opacity}>
      <path
        d={`M ${x1} ${y1} L ${x2} ${y2}`}
        fill="none"
        stroke={stroke}
        strokeWidth={width}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={dashed ? '0.018 0.018' : '1'}
        strokeDashoffset={dashed ? 0 : 1 - p}
      />
      <path
        d={`M ${hx1} ${hy1} L ${x2} ${y2} L ${hx2} ${hy2}`}
        fill="none"
        stroke={stroke}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={interpolate(p, [0.65, 1], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
      />
    </g>
  );
};

/* ------------------------------------------------------------------ *
 *  Text                                                               *
 * ------------------------------------------------------------------ */

type LabelProps = {
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  color?: string;
  font?: 'hand' | 'display' | 'mono';
  weight?: number | string;
  align?: 'left' | 'center' | 'right' | 'middle';
  start?: number;
  opacity?: number;
  pop?: boolean;
  letterSpacing?: number;
  italic?: boolean;
  maxWidth?: number;
};

export const Label: React.FC<LabelProps> = ({
  x,
  y,
  children,
  size = 44,
  color = C.fg,
  font = 'hand',
  weight = 400,
  align = 'left',
  start = 0,
  opacity = 1,
  pop: shouldPop = true,
  letterSpacing = 0.2,
  italic,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - start, fps, config: {damping: 15, stiffness: 190, mass: 0.55}});
  const o = interpolate(frame, [start, start + 5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const scale = shouldPop ? 0.9 + 0.1 * s : 1;
  const anchor = align === 'center' ? 'middle' : align === 'right' ? 'end' : 'start';
  const family = font === 'display' ? FONT.display : font === 'mono' ? 'ui-monospace, "DejaVu Sans Mono", monospace' : FONT.hand;
  return (
    <text
      x={x}
      y={y}
      fill={color}
      fontFamily={family}
      fontWeight={weight}
      fontSize={size}
      textAnchor={anchor}
      dominantBaseline="middle"
      letterSpacing={letterSpacing}
      fontStyle={italic ? 'italic' : 'normal'}
      opacity={o * opacity}
      transform={`translate(${x} ${y}) scale(${scale}) translate(${-x} ${-y})`}
      style={{paintOrder: 'stroke', whiteSpace: 'pre'}}
    >
      {children}
    </text>
  );
};

export const Underline: React.FC<{
  x: number;
  y: number;
  w: number;
  color?: string;
  start?: number;
  dur?: number;
  width?: number;
}> = ({x, y, w, color = C.yellow, start = 0, dur = 12, width = 5}) => (
  <InkPath
    d={`M ${x} ${y} C ${x + w * 0.25} ${y - 4} ${x + w * 0.7} ${y + 3} ${x + w} ${y - 2}`}
    stroke={color}
    width={width}
    start={start}
    dur={dur}
  />
);

export const Pill: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  children: React.ReactNode;
  color?: string;
  fill?: string;
  start?: number;
  size?: number;
  font?: 'hand' | 'display' | 'mono';
  opacity?: number;
}> = ({x, y, w, h, children, color = C.fg, fill = C.panel, start = 0, size = 42, font = 'hand', opacity = 1}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - start, fps, config: {damping: 16, stiffness: 180, mass: 0.6}});
  const o = interpolate(frame, [start, start + 5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <g opacity={o * opacity} transform={`translate(${x + w / 2} ${y + h / 2}) scale(${0.9 + 0.1 * s}) translate(${-(x + w / 2)} ${-(y + h / 2)})`}>
      <InkRect x={x} y={y} w={w} h={h} r={Math.min(18, h / 2)} stroke={color} width={3.5} fill={fill} fillOpacity={1} start={start} dur={10} />
      <Label x={x + w / 2} y={y + h / 2 + 2} align="center" size={size} color={color} font={font} start={start + 4} opacity={1}>
        {children}
      </Label>
    </g>
  );
};

/* ------------------------------------------------------------------ *
 *  Panels & bits                                                      *
 * ------------------------------------------------------------------ */

export const Panel: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  fill?: string;
  stroke?: string;
  start?: number;
  dur?: number;
  opacity?: number;
  r?: number;
}> = ({x, y, w, h, fill = C.panel, stroke = C.line, start = 0, dur = 14, opacity = 1, r = 20}) => (
  <InkRect
    x={x}
    y={y}
    w={w}
    h={h}
    r={r}
    fill={fill}
    fillOpacity={1}
    stroke={stroke}
    width={3}
    start={start}
    dur={dur}
    opacity={opacity}
  />
);

export const Cross: React.FC<{x: number; y: number; size?: number; color?: string; start?: number; width?: number}> = ({
  x,
  y,
  size = 22,
  color = C.red,
  start = 0,
  width = 5,
}) => (
  <g>
    <InkLine x1={x - size} y1={y - size} x2={x + size} y2={y + size} stroke={color} width={width} start={start} dur={10} />
    <InkLine x1={x + size} y1={y - size} x2={x - size} y2={y + size} stroke={color} width={width} start={start + 4} dur={10} />
  </g>
);

export const Check: React.FC<{x: number; y: number; size?: number; color?: string; start?: number; width?: number}> = ({
  x,
  y,
  size = 26,
  color = C.green,
  start = 0,
  width = 6,
}) => (
  <InkPath
    d={`M ${x - size} ${y} L ${x - size * 0.25} ${y + size * 0.8} L ${x + size * 1.3} ${y - size * 0.9}`}
    stroke={color}
    width={width}
    start={start}
    dur={12}
  />
);

export const Spark: React.FC<{x: number; y: number; r?: number; color?: string; start?: number}> = ({
  x,
  y,
  r = 28,
  color = C.yellow,
  start = 0,
}) => (
  <g>
    {[0, 1, 2, 3].map((i) => {
      const a = (i * Math.PI) / 2 + Math.PI / 4;
      return (
        <InkLine
          key={i}
          x1={x + Math.cos(a) * r * 0.45}
          y1={y + Math.sin(a) * r * 0.45}
          x2={x + Math.cos(a) * r}
          y2={y + Math.sin(a) * r}
          stroke={color}
          width={4}
          start={start + i * 2}
          dur={8}
        />
      );
    })}
  </g>
);

export const Dot: React.FC<{x: number; y: number; r?: number; color?: string; start?: number; opacity?: number}> = ({
  x,
  y,
  r = 6,
  color = C.fg,
  start = 0,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [start, start + 6], [0, opacity], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <circle cx={x} cy={y} r={r} fill={color} opacity={o} />;
};
