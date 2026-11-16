#!/usr/bin/env node
/**
 * Render the 2K master with live, line-buffered progress output.
 *
 * Usage:
 *   node scripts/render-2k.mjs /path/to/output.mp4 [compositionId]
 *
 * Environment:
 *   REMOTION_CONCURRENCY  number of parallel browser tabs (default: min(4, CPUs))
 *   REMOTION_CRF          x264 CRF (default: 18)
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {bundle} from '@remotion/bundler';
import {ensureBrowser, renderMedia, selectComposition} from '@remotion/renderer';

const outputLocation = path.resolve(
  process.argv[2] ?? 'out/andrej_karpathy_speedup_2k.mp4',
);
const compositionId = process.argv[3] ?? 'GpuKitchen2K';
const concurrency = Number(
  process.env.REMOTION_CONCURRENCY ??
    Math.max(1, Math.min(4, os.cpus().length)),
);
const crf = Number(process.env.REMOTION_CRF ?? 18);
const rangeEnv = process.env.REMOTION_FRAME_RANGE;
const frameRange = rangeEnv
  ? (() => {
      const [a, b] = rangeEnv.split('-').map(Number);
      if (!Number.isFinite(a) || !Number.isFinite(b)) throw new Error('REMOTION_FRAME_RANGE must look like 0-300');
      return [a, b];
    })()
  : undefined;

fs.mkdirSync(path.dirname(outputLocation), {recursive: true});

const fmt = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '--:--';
  const s = Math.round(seconds);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};

console.log('=== Andre Karpathy GPU speedup — 2K render ===');
console.log(`composition: ${compositionId}`);
console.log(`output:      ${outputLocation}`);
console.log(`cpus:        ${os.cpus().length}`);
console.log(`concurrency: ${concurrency}`);
console.log(`crf:         ${crf}`);
console.log('browser:     ensuring Remotion headless shell...');
await ensureBrowser();
console.log('browser:     ready');
console.log('bundling:    building Remotion project...');

const startedAt = Date.now();
const serveUrl = await bundle({
  entryPoint: path.resolve('src/index.ts'),
  publicDir: path.resolve('public'),
  onProgress: (progress) => {
    if (progress === 0 || progress === 100 || progress % 10 === 0) {
      console.log(`bundling:    ${progress}%`);
    }
  },
});
console.log(`bundling:    done in ${fmt((Date.now() - startedAt) / 1000)}`);

const composition = await selectComposition({
  serveUrl,
  id: compositionId,
  logLevel: 'info',
});
console.log(
  `composition: ${composition.width}x${composition.height} · ${composition.fps} fps · ${composition.durationInFrames} frames`,
);
console.log('render:      starting...');

let lastPct = -1;
let lastPrinted = 0;
const renderStartedAt = Date.now();

const result = await renderMedia({
  composition,
  serveUrl,
  codec: 'h264',
  outputLocation,
  overwrite: true,
  imageFormat: 'png',
  pixelFormat: 'yuv420p',
  crf,
  x264Preset: 'medium',
  audioCodec: 'aac',
  audioBitrate: '320k',
  enforceAudioTrack: true,
  concurrency,
  frameRange,
  logLevel: 'info',
  onProgress: ({progress, renderedFrames, encodedFrames, stitchStage}) => {
    const pct = Math.max(0, Math.min(100, Math.floor(progress * 100)));
    const now = Date.now();
    if (pct === lastPct && now - lastPrinted < 15000) return;
    lastPct = pct;
    lastPrinted = now;
    const elapsed = (now - renderStartedAt) / 1000;
    const eta = pct > 0 ? (elapsed / pct) * (100 - pct) : Number.NaN;
    console.log(
      `progress:    ${String(pct).padStart(3)}% · rendered ${renderedFrames}/${composition.durationInFrames} · encoded ${encodedFrames} · elapsed ${fmt(elapsed)} · eta ${fmt(eta)} · ${stitchStage}`,
    );
  },
});

const elapsed = (Date.now() - renderStartedAt) / 1000;
const bytes = fs.statSync(outputLocation).size;
console.log('render:      DONE');
console.log(`file:        ${outputLocation}`);
console.log(`size:        ${(bytes / (1024 * 1024)).toFixed(1)} MB`);
console.log(`elapsed:     ${fmt(elapsed)}`);
if (result?.contentType) console.log(`content:     ${result.contentType}`);
