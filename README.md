# Hamed Rasouli — Portfolio

A personal developer portfolio built with **React**, **Vite**, **Tailwind CSS** (v4), **GSAP**, and a **Three.js** (React Three Fiber) hero background.

## Run locally

```bash
npm install
npm run dev
```

Open the printed URL (default: http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Customize

All content lives in two data files — no need to touch the components:

- `src/data/site.js` — social links, navigation, skills, learning, and experience.
- `src/data/projects.js` — featured projects.

Replace the placeholder values (`GITHUB_URL`, `LINKEDIN_URL`, `UPWORK_URL`,
`EMAIL_ADDRESS`, `CV_URL`, `TOEFL_GITHUB_URL`, …) with your real URLs. The site
runs fine with the placeholders, but links won't point anywhere until you
replace them.

## Structure

```text
src/
├── components/       # Sections + shared (Cursor, Magnetic, Preloader, SplitText, SectionLabel, Icons, ProjectVisual)
├── data/             # projects.js, site.js
├── lib/              # gsap.js (plugin registration + shared helpers)
├── App.jsx
├── main.jsx
└── index.css         # Tailwind v4 entry + theme + design system
```

## Motion notes

- Animations use GSAP (`ScrollTrigger`, `ScrollToPlugin`) and respect
  `prefers-reduced-motion` — under reduced motion, all entrance/scroll
  animations are skipped and content is shown directly.
- Magnetic buttons are desktop-only (`pointer: fine` and `hover: hover` media
  queries) and are never enabled on touch devices. The native cursor is
  always shown — there is no custom cursor overlay.
- Each component creates its GSAP animations inside `gsap.context()` and
  reverts them on unmount, so ScrollTriggers don't leak.

## 3D hero background

- The hero renders a layered particle network (background scatter, midground
  clusters with distance-linked connections, foreground nodes) in
  `src/components/three/HeroScene.jsx`. It is code-split and lazy-loaded, so
  the Three.js bundle only downloads when the scene mounts.
- Device capability is detected in `src/lib/quality.js`: the scene is skipped
  entirely when WebGL is unavailable or reduced motion is preferred, and it
  degrades to fewer particles/connections and DPR 1 on mobile and low-power
  devices.
- The scene fades in with the hero entrance timeline (GSAP), responds subtly
  to the cursor on desktop, and fades out via ScrollTrigger as the hero
  scrolls away. Pointer events stay disabled on the canvas, so content,
  links, and buttons are never blocked.
