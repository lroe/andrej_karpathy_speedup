import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {C, FPS} from '../theme';
import {SceneShell, RegistrationMarks} from '../components/Stage';
import {InkCircle, InkLine, InkPath, InkRect, Label, Arrow, Panel, Cross, Check, Pill, Underline} from '../components/Ink';
import {GpuChip} from '../components/Figures';

const start = 0;
const end = 28.28;

export const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const t = (s: number) => Math.round((s - start) * FPS);
  const p = (s: number, d = 12) =>
    interpolate(frame, [t(s), t(s) + d], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    });
  const gaugeFade = 1 - p(25.4, 8);

  return (
    <SceneShell duration={Math.round((end - start) * FPS)}>
      <RegistrationMarks />

      {/* Model card */}
      <Panel x={300} y={250} w={700} h={360} fill={C.panel} stroke={C.line} start={t(0.0)} dur={14} />
      <Label x={650} y={312} align="center" size={54} color={C.fg} start={t(0.2)}>
        MODEL
      </Label>
      <Label x={650} y={352} align="center" size={36} color={C.dim} start={t(3.9)}>
        next-token predictor
      </Label>

      {/* Little network inside the card */}
      {[
        [390, 420],
        [390, 490],
        [390, 560],
      ].map(([x, y], i) => (
        <InkCircle key={`in${i}`} cx={x} cy={y} r={13} stroke={C.dim} width={3} start={t(0.8 + i * 0.15)} dur={8} />
      ))}
      {[
        [570, 395],
        [570, 455],
        [570, 515],
        [570, 575],
      ].map(([x, y], i) => (
        <InkCircle key={`h${i}`} cx={x} cy={y} r={13} stroke={C.purple} width={3} start={t(1.0 + i * 0.12)} dur={8} fill={C.purple} fillOpacity={0.08} />
      ))}
      {[
        [750, 445],
        [750, 505],
      ].map(([x, y], i) => (
        <InkCircle key={`o${i}`} cx={x} cy={y} r={13} stroke={C.green} width={3} start={t(1.2 + i * 0.12)} dur={8} fill={C.green} fillOpacity={0.08} />
      ))}
      {[395, 495, 565].map((y, i) =>
        [395, 455, 515, 575].map((hy, j) => (
          <InkLine key={`c1${i}${j}`} x1={405} y1={y} x2={557} y2={hy} stroke={C.line} width={1.6} start={t(1.5 + i * 0.08)} dur={8} opacity={0.8} />
        )),
      )}
      {[395, 455, 515, 575].map((hy, i) =>
        [445, 505].map((oy, j) => (
          <InkLine key={`c2${i}${j}`} x1={583} y1={hy} x2={737} y2={oy} stroke={C.line} width={1.6} start={t(1.8 + i * 0.06)} dur={8} opacity={0.8} />
        )),
      )}
      <Label x={1000} y={330} size={36} color={C.dim} start={t(1.4)}>
        Andre Karpathy
      </Label>

      {/* Speed badge */}
      <g opacity={gaugeFade}>
        <InkPath
          d={`M 1270 430 C 1330 300 1510 260 1650 340`}
          stroke={C.green}
          width={5}
          start={t(2.4)}
          dur={16}
          opacity={0.5}
        />
        <Arrow x1={1610} y1={336} x2={1662} y2={300} stroke={C.green} width={5} start={t(2.7)} dur={10} head={14} />
        <Label x={1470} y={392} align="center" size={148} color={C.green} font="display" weight={700} start={t(2.4)}>
          25%
        </Label>
        <Label x={1470} y={480} align="center" size={52} color={C.fg} start={t(3.4)}>
          faster
        </Label>
        <Underline x={1370} y={515} w={200} color={C.green} start={t(3.7)} />
      </g>

      {/* Vocabulary strip */}
      <Panel x={300} y={640} w={860} h={195} fill={C.panel} stroke={C.line} start={t(6.3)} dur={14} />
      <Label x={330} y={680} size={38} color={C.dim} start={t(6.5)}>
        VOCABULARY
      </Label>
      <Label x={1130} y={680} align="right" size={36} color={C.dim} start={t(7.0)}>
        50,257 words
      </Label>
      {['the', 'cat', 'GPU', 'token'].map((word, i) => (
        <g key={word}>
          <InkRect x={335 + i * 105} y={712} w={95} h={44} r={8} stroke={C.line} width={2.5} start={t(6.8 + i * 0.08)} dur={7} fill={C.line} fillOpacity={0.15} />
          <text x={382 + i * 105} y={736} textAnchor="middle" dominantBaseline="middle" fontFamily='"Patrick Hand"' fontSize={36} fill={C.fg} opacity={p(6.9 + i * 0.08, 6)}>
            {word}
          </text>
        </g>
      ))}
      <Label x={780} y={680} size={36} color={C.yellow} start={t(8.0)}>
        + 47 new
      </Label>

      {/* 47 tiny tokens */}
      {Array.from({length: 47}).map((_, i) => {
        const col = i % 24;
        const row = Math.floor(i / 24);
        const appear = t(5.1) + i * 0.28;
        const dead = t(10.2) + i * 0.01;
        const o = interpolate(frame, [appear, appear + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const deadO = interpolate(frame, [dead, dead + 8], [1, 0.28], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        return (
          <rect
            key={i}
            x={770 + col * 14}
            y={716 + row * 18}
            width={10}
            height={13}
            rx={2}
            fill={C.yellow}
            opacity={o * deadO * (frame > t(9.9) ? 0.55 : 0.9)}
          />
        );
      })}
      {frame > t(9.9) ? (
        <Label x={1010} y={785} size={36} color={C.red} start={t(9.95)}>
          never used
        </Label>
      ) : null}

      {/* Edit terminal */}
      <Panel x={280} y={865} w={1140} h={125} fill={C.well} stroke={C.line} start={t(12.2)} dur={12} />
      <Label x={320} y={927} size={42} font="mono" color={C.dim} start={t(12.4)}>
        vocab_size =
      </Label>
      <Label x={650} y={927} size={52} font="mono" color={C.fg} start={t(13.2)}>
        50,257
      </Label>
      <Arrow x1={865} y1={925} x2={955} y2={925} stroke={C.dim} width={3} start={t(15.0)} dur={9} head={12} />
      <Label x={990} y={927} size={52} font="mono" color={C.yellow} start={t(16.0)}>
        50,304
      </Label>
      <InkRect x={1205} y={893} w={150} h={62} r={10} stroke={C.green} width={3.5} start={t(18.1)} dur={9} fill={C.green} fillOpacity={0.1} />
      <Label x={1280} y={927} align="center" size={36} color={C.green} start={t(18.2)}>
        RUN
      </Label>
      {frame > t(18.3) && frame < t(19.0) ? (
        <circle cx={1280} cy={924} r={12 + 10 * ((frame - t(18.3)) / 20)} fill="none" stroke={C.green} strokeWidth={3} opacity={1 - (frame - t(18.3)) / 20} />
      ) : null}

      {/* Typo tag */}
      {frame > t(19.5) ? (
        <g opacity={p(19.5, 8) * (1 - p(24.0, 8))}>
          <InkPath
            d={`M 970 970 C 1040 985 1120 955 1185 970`}
            stroke={C.red}
            width={5}
            start={t(19.5)}
            dur={10}
          />
          <Label x={1180} y={1010} align="center" size={38} color={C.red} start={t(19.8)}>
            typo?
          </Label>
        </g>
      ) : null}
      {frame > t(24.0) ? (
        <Check x={1120} y={1015} size={24} start={t(24.0)} />
      ) : null}

      {/* Final GPU reveal */}
      {frame > t(25.3) ? (
        <g>
          <GpuChip x={1440} y={655} w={270} h={240} start={t(25.4)} color={C.purple} label="GPU" sublabel="one trick" />
        </g>
      ) : null}
    </SceneShell>
  );
};
