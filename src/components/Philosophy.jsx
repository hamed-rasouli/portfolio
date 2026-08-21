import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap.js";
import SplitText from "./SplitText.jsx";

const LINES = ["Learn it.", "Build it.", "Improve it."];

export default function Philosophy() {
  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const lineRef = useRef(null);
  const noteRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

      gsap.fromTo(
        headingRef.current.querySelectorAll(".reveal-word"),
        { yPercent: 115, x: 24, autoAlpha: 0 },
        {
          yPercent: 0,
          x: 0,
          autoAlpha: 1,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: { trigger: headingRef.current, start: "top 78%" },
        }
      );

      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: lineRef.current, start: "top 90%" },
        }
      );

      gsap.fromTo(
        noteRef.current,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: noteRef.current, start: "top 88%" },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden border-y border-line py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-accent/[0.03] blur-3xl"
      />
      <div className="shell relative">
        <h2
          ref={headingRef}
          className="font-display text-[clamp(2.9rem,9vw,7rem)] font-bold leading-[1.04] tracking-tight text-paper"
        >
          {LINES.map((line) => (
            <span key={line} className="block">
              <SplitText text={line} />
            </span>
          ))}
        </h2>

        <div className="mt-8 flex items-center gap-6">
          <span
            ref={lineRef}
            aria-hidden="true"
            className="h-px w-28 origin-left bg-accent"
          />
          <p
            ref={noteRef}
            className="max-w-md text-sm leading-relaxed text-faint"
          >
            I believe the best way to learn technology is to build with it. I
            turn what I learn into practical projects and continuously improve
            them.
          </p>
        </div>
      </div>
    </section>
  );
}
