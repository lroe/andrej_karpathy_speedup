# Andre Karpathy GPU Speedup — animated explainer

A 9:25 hand-drawn Dracula-palette explainer about GPU training bottlenecks, kernels, tile quantization, pantry trips, and the 47-word vocabulary speedup.

Built with **Remotion + React + TypeScript**. The visual style is intentionally minimalist: ink linework, Caveat/Patrick Hand typography, sparse labels, continuous motion, and word-level timing against the supplied voiceover.

## Preview locally

```bash
npm install
npm start
```

Open <http://localhost:3000> and play `GpuKitchen`.

## Render

- `GpuKitchen` — 1920×1080, 30 fps master
- `GpuKitchen2K` — 2560×1440, 30 fps QHD master

```bash
# 1080p
npx remotion render GpuKitchen out/andrej_karpathy_speedup_1080p.mp4

# 2K with live progress from the Node renderer
node scripts/render-2k.mjs out/andrej_karpathy_speedup_2k.mp4 GpuKitchen2K
```

The 2K renderer prints percent, rendered frames, elapsed time, and ETA as it works.

## Google Colab + Google Drive

Use [`notebooks/render_2k_colab.ipynb`](notebooks/render_2k_colab.ipynb) in Colab.

The first notebook cell **mounts Google Drive and asks for access**. It writes the finished MP4, render log, notebook copy, and a source archive under:

`MyDrive/andrej_karpathy_speedup/`

Rendering is CPU-bound; GPU runtime does not accelerate browser rendering. A High-RAM CPU runtime is recommended.

## Project layout

- `src/scenes/` — 22 timed scenes
- `src/components/` — ink primitives, characters, kitchen props
- `src/data/transcript.json` — word-level Whisper timestamps
- `public/audio.wav` — voiceover
- `public/fonts/` — bundled Caveat + Patrick Hand
- `skill.md` — visual/timing/label rules used for production
- `scripts/render-2k.mjs` — Node render API with live progress

## Notes

- No full render is checked into git.
- `out/` and `node_modules/` are ignored.
