import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Canvas-drawn UI textures                                           */
/* ------------------------------------------------------------------ */

function makeTexture(width, height, draw) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  draw(canvas.getContext("2d"), width, height);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

const BAR = "rgba(242,241,238,0.16)";
const BAR_DIM = "rgba(242,241,238,0.09)";
const CARD_BG = "#16161e";
const CARD_CHROME = "#1d1d28";

function drawBrowser(ctx, w, h) {
  // window chrome
  roundRect(ctx, 0, 0, w, h, 16);
  ctx.fillStyle = CARD_BG;
  ctx.fill();
  ctx.fillStyle = CARD_CHROME;
  roundRect(ctx, 0, 0, w, 46, 16);
  ctx.fill();
  ctx.fillRect(0, 30, w, 16);
  // dots
  for (const [x, c] of [
    [22, "#3a3a48"],
    [42, "#3a3a48"],
    [62, "#7d8cff"],
  ]) {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(x, 23, 5, 0, Math.PI * 2);
    ctx.fill();
  }
  // url pill
  ctx.fillStyle = "#0f0f15";
  roundRect(ctx, w / 2 - 120, 14, 240, 18, 9);
  ctx.fill();
  // headline
  ctx.fillStyle = "#7d8cff";
  roundRect(ctx, 28, 70, 200, 26, 7);
  ctx.fill();
  // sub bars
  ctx.fillStyle = BAR;
  roundRect(ctx, 28, 110, 150, 10, 5);
  ctx.fill();
  // image block
  const g = ctx.createLinearGradient(0, 140, 0, 250);
  g.addColorStop(0, "rgba(125,140,255,0.75)");
  g.addColorStop(1, "rgba(125,140,255,0.28)");
  ctx.fillStyle = g;
  roundRect(ctx, 28, 140, 220, 110, 10);
  ctx.fill();
  // text lines
  ctx.fillStyle = BAR;
  roundRect(ctx, 270, 74, 210, 10, 5);
  ctx.fill();
  roundRect(ctx, 270, 94, 170, 10, 5);
  ctx.fill();
  ctx.fillStyle = BAR_DIM;
  roundRect(ctx, 270, 116, 210, 10, 5);
  ctx.fill();
  roundRect(ctx, 270, 136, 190, 10, 5);
  ctx.fill();
  roundRect(ctx, 270, 156, 210, 10, 5);
  ctx.fill();
  // cta pill
  ctx.fillStyle = "#7d8cff";
  roundRect(ctx, 270, 196, 120, 34, 17);
  ctx.fill();
  ctx.fillStyle = "rgba(11,12,23,0.75)";
  roundRect(ctx, 300, 206, 60, 8, 4);
  ctx.fill();
  // footer bars
  ctx.fillStyle = BAR_DIM;
  roundRect(ctx, 28, 280, 90, 8, 4);
  ctx.fill();
  roundRect(ctx, 130, 280, 60, 8, 4);
  ctx.fill();
}

function drawMobile(ctx, w, h) {
  roundRect(ctx, 0, 0, w, h, 26);
  ctx.fillStyle = CARD_BG;
  ctx.fill();
  // status bar
  ctx.fillStyle = BAR_DIM;
  roundRect(ctx, 28, 26, 60, 7, 3);
  ctx.fill();
  ctx.fillStyle = "#7d8cff";
  roundRect(ctx, w - 78, 24, 50, 10, 5);
  ctx.fill();
  // headline
  ctx.fillStyle = "rgba(242,241,238,0.85)";
  roundRect(ctx, 28, 62, 120, 16, 6);
  ctx.fill();
  ctx.fillStyle = BAR;
  roundRect(ctx, 28, 90, 90, 9, 4);
  ctx.fill();
  // image
  const g = ctx.createLinearGradient(0, 120, 0, 230);
  g.addColorStop(0, "rgba(125,140,255,0.7)");
  g.addColorStop(1, "rgba(125,140,255,0.25)");
  ctx.fillStyle = g;
  roundRect(ctx, 28, 116, w - 56, 114, 12);
  ctx.fill();
  // rows
  ctx.fillStyle = BAR;
  roundRect(ctx, 28, 246, w - 56, 9, 4);
  ctx.fill();
  roundRect(ctx, 28, 266, w - 110, 9, 4);
  ctx.fill();
  // floating action
  ctx.fillStyle = "#7d8cff";
  ctx.beginPath();
  ctx.arc(w / 2, h - 74, 26, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(11,12,23,0.8)";
  ctx.beginPath();
  ctx.arc(w / 2, h - 74, 7, 0, Math.PI * 2);
  ctx.fill();
  // bottom nav
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = i === 0 ? "rgba(242,241,238,0.5)" : BAR_DIM;
    roundRect(ctx, 40 + i * 62, h - 34, 30, 8, 4);
    ctx.fill();
  }
}

function drawStat(ctx, w, h) {
  roundRect(ctx, 0, 0, w, h, 14);
  ctx.fillStyle = CARD_BG;
  ctx.fill();
  // title
  ctx.fillStyle = "rgba(242,241,238,0.75)";
  roundRect(ctx, 22, 20, 110, 12, 5);
  ctx.fill();
  // stat tiles
  for (let i = 0; i < 3; i++) {
    const x = 22 + i * 84;
    ctx.fillStyle = "#1e1e2a";
    roundRect(ctx, x, 46, 72, 56, 8);
    ctx.fill();
    ctx.fillStyle = i === 1 ? "#7d8cff" : BAR;
    roundRect(ctx, x + 10, 84, 30 + i * 8, 7, 3);
    ctx.fill();
  }
  // mini chart bars
  const heights = [26, 40, 22, 52, 34, 60, 30];
  heights.forEach((hh, i) => {
    ctx.fillStyle = i === 5 ? "#7d8cff" : BAR;
    roundRect(ctx, 22 + i * 34, 128 + (60 - hh), 20, hh, 4);
    ctx.fill();
  });
  // bottom row
  ctx.fillStyle = BAR_DIM;
  roundRect(ctx, 22, 210, 140, 9, 4);
  ctx.fill();
}

/* ------------------------------------------------------------------ */
/*  Textures + card layout                                             */
/* ------------------------------------------------------------------ */

const browserTex = () => makeTexture(512, 340, drawBrowser);
const mobileTex = () => makeTexture(256, 512, drawMobile);
const statTex = () => makeTexture(384, 256, drawStat);

const CARDS = [
  {
    key: "browser",
    tex: browserTex,
    w: 2.35,
    h: 1.56,
    pos: [0.5, 0.28, 0.3],
    rot: [-0.05, -0.34, 0],
    depth: 0.1,
    phase: 0,
    speed: 0.85,
  },
  {
    key: "mobile",
    tex: mobileTex,
    w: 0.8,
    h: 1.6,
    pos: [-1.55, -0.5, 0.85],
    rot: [0.08, 0.3, 0],
    depth: 0.22,
    phase: 2.1,
    speed: 1.1,
  },
  {
    key: "stat",
    tex: statTex,
    w: 1.2,
    h: 0.8,
    pos: [2.05, -0.85, -0.4],
    rot: [0.1, -0.24, 0],
    depth: 0.06,
    phase: 4.2,
    speed: 0.7,
  },
];

/* ------------------------------------------------------------------ */
/*  Scene                                                              */
/* ------------------------------------------------------------------ */

function UiComposition({ tier, pointer, scrollRef }) {
  const groupRef = useRef(null);
  const cardRefs = useRef({});
  const orbRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const matsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, sx: 0, sy: 0 });

  const rich = tier === "desktop"; // mobile/low get fewer cards

  const cards = useMemo(() => {
    const list = CARDS.filter((c) => rich || c.key === "browser");
    return list.map((c) => {
      const texture = c.tex();
      return {
        ...c,
        texture,
        material: new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true,
          opacity: 0,
          roughness: 0.55,
          metalness: 0.12,
          emissive: new THREE.Color("#3a3f6b"),
          emissiveIntensity: 0.35,
        }),
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rich]);

  useEffect(() => {
    matsRef.current = cards.map((c) => c.material);
  }, [cards]);

  const orbMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#2b2b46"),
        roughness: 0.35,
        metalness: 0.25,
        emissive: new THREE.Color("#3a3f7a"),
        emissiveIntensity: 0.22,
        transparent: true,
        opacity: 0,
      }),
    []
  );

  const ringMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#7d8cff"),
        emissive: new THREE.Color("#7d8cff"),
        emissiveIntensity: 0.45,
        roughness: 0.4,
        metalness: 0.2,
        transparent: true,
        opacity: 0,
      }),
    []
  );

  const glowMat = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, "rgba(125,140,255,0.5)");
    g.addColorStop(0.5, "rgba(125,140,255,0.14)");
    g.addColorStop(1, "rgba(125,140,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return new THREE.SpriteMaterial({
      map: tex,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  /* Mouse tracking — window-level so pointer-events stay off the canvas */
  useEffect(() => {
    if (!pointer) return;
    const onMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [pointer]);

  const scratch = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const group = groupRef.current;
    const camera = state.camera;

    const m = mouseRef.current;
    m.sx += (m.x - m.sx) * (1 - Math.exp(-2.5 * dt));
    m.sy += (m.y - m.sy) * (1 - Math.exp(-2.5 * dt));

    /* Idle motion: slow rotation, gentle float, scroll drift */
    group.rotation.y = Math.sin(t * 0.08) * 0.07 + m.sx * 0.055;
    group.rotation.x = Math.sin(t * 0.06) * 0.02 - m.sy * 0.02;
    group.position.y = Math.sin(t * 0.12) * 0.12 + scrollRef.current.v * 1.4;

    /* Camera drift toward cursor */
    camera.position.x += (m.sx * 0.35 - camera.position.x) * (1 - Math.exp(-1.8 * dt));
    camera.position.y += (m.sy * 0.25 - camera.position.y) * (1 - Math.exp(-1.8 * dt));
    camera.lookAt(0, 0, 0);

    /* Fade-in after mount */
    const fade = Math.min(1, t * 1.1);

    /* Orb: slow self-rotation */
    if (orbRef.current) {
      orbRef.current.rotation.y += dt * 0.12;
      orbRef.current.rotation.z = Math.sin(t * 0.1) * 0.08;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.08;
    }

    /* Cards: bob + depth parallax at different speeds */
    cards.forEach((card, i) => {
      const mesh = cardRefs.current[card.key];
      if (!mesh) return;
      scratch.set(
        card.pos[0] + m.sx * card.depth * 1.6,
        card.pos[1] + Math.sin(t * card.speed + card.phase) * 0.05,
        card.pos[2] + m.sy * card.depth * 0.9
      );
      mesh.position.copy(scratch);
      card.material.opacity = fade;
    });

    orbMat.opacity = fade * 0.9;
    ringMat.opacity = fade * 0.8;
    glowMat.opacity = fade * 0.55;

    if (glowRef.current) {
      glowRef.current.position.y = Math.sin(t * 0.14) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.55} color="#fff6ea" />
      <directionalLight position={[4, 5, 6]} intensity={1.6} color="#fff2e0" />
      <directionalLight position={[-4, 2, 3]} intensity={0.5} color="#ffffff" />
      <directionalLight position={[2, -3, 4]} intensity={0.9} color="#7d8cff" />

      {/* soft glow behind the composition */}
      <sprite ref={glowRef} position={[0.2, 0.1, -1.6]} material={glowMat} scale={[5, 5, 1]} />

      {/* abstract sculpture — dark orb */}
      <mesh ref={orbRef} position={[1.35, 0.35, -1.1]} material={orbMat}>
        <sphereGeometry args={[1.15, 48, 48]} />
      </mesh>

      {/* elegant accent ring */}
      <mesh ref={ringRef} position={[1.9, 1.15, -1.5]} rotation={[0.7, 0, 0]} material={ringMat}>
        <torusGeometry args={[0.75, 0.014, 16, 120]} />
      </mesh>

      {/* floating interface cards */}
      {cards.map((card) => (
        <mesh
          key={card.key}
          ref={(el) => {
            cardRefs.current[card.key] = el;
          }}
          position={card.pos}
          rotation={card.rot}
          material={card.material}
        >
          <planeGeometry args={[card.w, card.h]} />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Canvas wrapper                                                     */
/* ------------------------------------------------------------------ */

export default function HeroScene({ tier, pointer, scrollRef }) {
  const [dpr, setDpr] = useState(tier === "desktop" ? 1.5 : 1);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 8.5], fov: 45, near: 0.1, far: 40 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ pointerEvents: "none" }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <PerformanceMonitor
        flipflops={4}
        onDecline={() => setDpr((d) => Math.max(0.75, Number((d - 0.25).toFixed(2))))}
        onIncline={() => setDpr(tier === "desktop" ? 1.5 : 1)}
      >
        <UiComposition tier={tier} pointer={pointer} scrollRef={scrollRef} />
      </PerformanceMonitor>
    </Canvas>
  );
}
