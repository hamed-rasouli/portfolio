import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap.js";

/**
 * Dark overlay that covers the first paint, draws a short accent line,
 * then slides away. `onDone` fires as the slide begins so the hero
 * entrance can play underneath the reveal. Total time stays under 1s.
 */
export default function Preloader({ onDone }) {
  const rootRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set(rootRef.current, { display: "none" });
      onDone?.();
      return;
    }

    const tl = gsap.timeline();
    tl.to(lineRef.current, { scaleX: 1, duration: 0.35, ease: "power3.inOut" })
      .call(() => onDone?.())
      .to(rootRef.current, {
        yPercent: -100,
        duration: 0.55,
        ease: "power4.inOut",
        delay: 0.1,
      })
      .set(rootRef.current, { display: "none" });

    return () => tl.kill();
  }, [onDone]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-5">
        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-paper/70">
          HAMED RASOULI
        </span>
        <div className="h-px w-36 overflow-hidden bg-line">
          <div ref={lineRef} className="h-full w-full origin-left scale-x-0 bg-accent" />
        </div>
      </div>
    </div>
  );
}
