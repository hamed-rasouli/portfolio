import { lazy, Suspense, useEffect, useMemo, useRef } from "react";
import { gsap, prefersReducedMotion, scrollToId } from "../lib/gsap.js";
import { getDeviceProfile } from "../lib/quality.js";
import { LINKS } from "../data/site.js";
import {
  GitHubIcon,
  LinkedInIcon,
  UpworkIcon,
  MailIcon,
  ArrowRightIcon,
} from "./Icons.jsx";
import SplitText from "./SplitText.jsx";
import Magnetic from "./Magnetic.jsx";

// Three.js scene is code-split so the main bundle stays lean.
const HeroScene = lazy(() => import("./three/HeroScene.jsx"));

const SOCIALS = [
  { label: "GitHub", href: LINKS.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: LINKS.linkedin, Icon: LinkedInIcon },
  { label: "Upwork", href: LINKS.upwork, Icon: UpworkIcon },
  { label: "Email", href: `mailto:${LINKS.email}`, Icon: MailIcon },
];

/** Static CSS browser mockup — shown when WebGL is unavailable or reduced motion is on. */
function HeroFallbackVisual() {
  return (
    <div className="relative mx-auto h-full max-w-md" aria-hidden="true">
      <div className="absolute inset-0 -z-10 rounded-full bg-accent/10 blur-3xl" />
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-panel shadow-[0_40px_90px_-40px_rgba(125,140,255,0.35)]">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
          <span className="ml-3 h-4 flex-1 max-w-[55%] rounded-full bg-white/[0.06]" />
        </div>
        <div className="flex flex-1 flex-col gap-4 p-5">
          <div className="h-6 w-2/3 rounded-md bg-accent/80" />
          <div className="h-2 w-1/2 rounded-sm bg-white/[0.14]" />
          <div className="h-2 w-2/5 rounded-sm bg-white/[0.1]" />
          <div className="mt-2 flex-1 rounded-lg bg-gradient-to-br from-accent/60 to-accent/20" />
          <div className="flex items-center gap-3">
            <div className="h-8 w-28 rounded-full bg-accent" />
            <div className="h-2 w-24 rounded-sm bg-white/[0.12]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ ready }) {
  const profile = useMemo(() => getDeviceProfile(), []);
  const sectionRef = useRef(null);
  const sceneRef = useRef(null);
  const scrollWrapRef = useRef(null);
  const scrollRef = useRef({ v: 0 });
  const bgRef = useRef(null);
  const eyebrowRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const socialRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    if (!ready) return;

    if (prefersReducedMotion()) {
      gsap.set(
        [
          bgRef.current,
          eyebrowRef.current,
          roleRef.current,
          descRef.current,
          ctaRef.current,
          socialRef.current,
          hintRef.current,
        ],
        { autoAlpha: 1, y: 0 },
      );
      if (sceneRef.current) gsap.set(sceneRef.current, { autoAlpha: 1, y: 0 });
      gsap.set(nameRef.current.querySelectorAll(".reveal-word"), {
        yPercent: 0,
      });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 });

    tl.fromTo(
      bgRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.9 },
      0,
    );

    if (sceneRef.current) {
      // 3D composition appears gently after the heading starts.
      tl.fromTo(
        sceneRef.current,
        { autoAlpha: 0, y: 30, scale: 0.97 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: "power2.out" },
        0.3,
      );
    }

    tl.fromTo(
      eyebrowRef.current,
      { y: 18, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.5 },
      0.15,
    )
      .fromTo(
        nameRef.current.querySelectorAll(".reveal-word"),
        { yPercent: 120 },
        { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.12 },
        0.22,
      )
      .fromTo(
        roleRef.current,
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6 },
        0.55,
      )
      .fromTo(
        descRef.current,
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6 },
        0.65,
      )
      .fromTo(
        ctaRef.current.children,
        { y: 22, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.09 },
        0.78,
      )
      .fromTo(
        socialRef.current.children,
        { y: 14, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.06 },
        0.92,
      )
      .fromTo(
        hintRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.6 },
        1.3,
      );

    return () => tl.kill();
  }, [ready]);

  /* Scroll away: the 3D fades out and drifts up as the hero leaves. */
  useEffect(() => {
    if (!profile.enabled || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.to(scrollWrapRef.current, {
        opacity: 0,
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            scrollRef.current.v = self.progress;
          },
        },
      });
    });
    return () => ctx.revert();
  }, [profile.enabled]);

  return (
    <section ref={sectionRef} id="home" className="relative overflow-x-hidden">
      {/* Soft studio background — gradients + glow, no grid/particles */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="bg-hero-base absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-accent/[0.07] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -left-48 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#7d8cff]/[0.05] blur-3xl"
      />

      <div className="shell relative flex min-h-svh flex-col justify-center pb-16 pt-20 sm:pb-24 sm:pt-32">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left — identity */}
          <div className="lg:col-span-6">
            <p
              ref={eyebrowRef}
              className="text-[12px] font-medium uppercase tracking-[0.32em] text-faint"
            >
              Hello, I'm
            </p>

            <h1
              ref={nameRef}
              className="mt-6 font-display text-[clamp(3rem,8.5vw,6.25rem)] font-extrabold leading-[1.02] tracking-[-0.02em] text-paper"
            >
              <SplitText text="Hamed Rasouli" />
            </h1>

            <p
              ref={roleRef}
              className="mt-6 font-display text-xl font-semibold tracking-tight text-muted sm:text-2xl"
            >
              Python <span className="text-accent">&</span> Full-Stack Developer
            </p>

            <p
              ref={descRef}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              I build practical desktop, web, and backend applications using
              Python and modern web technologies.
            </p>

            <div
              ref={ctaRef}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("#projects");
                  }}
                  className="btn-primary"
                >
                  View Projects
                  <ArrowRightIcon className="arrow h-4 w-4" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("#contact");
                  }}
                  className="btn-ghost"
                >
                  Contact Me
                </a>
              </Magnetic>
            </div>

            <ul
              ref={socialRef}
              className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                    className="link-line group inline-flex items-center gap-2 text-sm text-faint transition-colors duration-300 hover:text-paper"
                  >
                    <Icon className="h-4 w-4 text-muted transition-colors duration-300 group-hover:text-accent" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — 3D composition */}
          <div className="lg:col-span-6 max-lg:hidden">
            <div className="relative mx-auto h-[280px] max-w-md sm:h-[380px] md:h-[420px] lg:h-[540px] lg:max-w-none">
              {profile.enabled ? (
                <div ref={scrollWrapRef} className="absolute inset-0">
                  <div ref={sceneRef} className="absolute inset-0 opacity-0">
                    <Suspense fallback={null}>
                      <HeroScene
                        tier={profile.tier}
                        pointer={profile.pointer}
                        scrollRef={scrollRef}
                      />
                    </Suspense>
                  </div>
                </div>
              ) : (
                <HeroFallbackVisual />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={hintRef}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        aria-hidden="true"
      >
        <span className="label">Scroll</span>
        <span className="block h-12 w-px overflow-hidden bg-line">
          <span className="scroll-pulse block h-full w-full bg-accent/80" />
        </span>
      </div>
    </section>
  );
}
