# 🎂 Happy Birthday 3D

An interactive 3D birthday cinematic built with **Three.js** + **GSAP**. Tap **READY** to launch a fireball that flies into the cake, ignites a spark explosion, and reveals a fully decorated party scene — balloons, gifts, plush toys, fairy lights, and a glowing **"HAPPY BIRTHDAY"** banner with the recipient's name.

## ✨ Features

- **Cinematic opening** — a spark flies from the button into the cake and explodes into confetti, dust, and a shockwave.
- **Post-processing** — UnrealBloom glow, Bokeh depth-of-field, and FXAA.
- **Decorated rings** — inner (4.5m) and outer (7.0m) rings around the cake with keepsakes (fan, bouquet, greeting card, plush animals), gift boxes/stacks, and floating balloon clusters.
- **Fairy lights** and a warm, party-style lighting rig.
- **3D text banner** — "HAPPY BIRTHDAY" + "Thanh Tuyền" (Great Vibes calligraphy, Vietnamese-safe, with italic slant and glow).
- **Orbit controls** after the reveal — drag to rotate, scroll to zoom.
- **Mobile-friendly** — responsive `100dvh` layout and a "rotate your device" hint on portrait phones.
- **Audio** — spark ignition sound (`fr.wav`) and looping background music (`hpbd.mp3`).

## 🛠 Tech Stack

- [Three.js](https://threejs.org/) — 3D rendering
- [GSAP](https://gsap.com/) — animations/timelines
- [Vite](https://vitejs.dev/) — build tool & dev server
- Vanilla ES modules (no framework)

## 🚀 Getting Started

```bash
npm install     # install dependencies
npm run dev     # start dev server at http://localhost:5173
npm run build   # production build → dist/
npm run preview # preview the production build
```

### Customize

| Thing | Where |
| --- | --- |
| Recipient name | `src/effects.js` → `text2 = 'Thanh Tuyền'` |
| Banner fonts | `index.html` (Google Fonts link) + `src/effects.js` |
| Balloon colors / height | `src/environment.js` |
| Decoration ring layout | `src/decorations.js` |
| Cake model | `public/birthday_cake.glb` |
| Audio | `public/audio/fr.wav`, `public/audio/hpbd.mp3` |

## 📁 Project Structure

```
├── index.html                 # entry HTML + Google Fonts
├── public/                    # static assets (cake model, audio)
├── src/
│   ├── main.js                # entry point, wiring, render loop
│   ├── scene.js               # renderer + post-processing pipeline
│   ├── camera.js              # camera + OrbitControls
│   ├── cake.js                # GLB loader, candle detection
│   ├── environment.js         # lights, floor, balloons, fairy lights
│   ├── decorations.js         # inner/outer rings, keepsakes, gifts, plush
│   ├── effects.js             # banner text, flash, energy wave, flame
│   ├── animations.js          # fireball cinematic timeline
│   ├── particles.js           # dust, confetti, bokeh, dissolve particles
│   ├── ui.js                  # "READY" overlay + interactive hints
│   └── style.css              # global styles
└── vite.config.js
```

## ☁️ Deploy to Vercel

The repo is already configured (`vercel.json`) for Vite with `npm run build` and output `dist/`.

**Via Vercel CLI**

```bash
npm i -g vercel
vercel          # first time: login & link the project
vercel --prod   # deploy to production
```

**Via Dashboard**

1. Push the repo to GitHub.
2. In [vercel.com](https://vercel.com), click **Add New → Project**.
3. Import the repo — Vercel auto-detects Vite (`npm run build`, output `dist/`).
4. Click **Deploy**.

> Note: the cake model and audio are served from `public/`, so no extra static config is needed.

## 📄 License

Private project — © 2026. For personal use.
