import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap.js";
import SectionLabel from "./SectionLabel.jsx";
import SplitText from "./SplitText.jsx";

const FACTS = [
  { label: "Role", value: "Python & Full-Stack Developer" },
  { label: "Focus", value: "Backend · Web · Desktop" },
  { label: "Working with", value: "Python, JavaScript, React, Node.js" },
];

export default function About() {
  const rootRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const factsRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

      gsap.fromTo(
        labelRef.current,
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 78%" },
        }
      );
      gsap.fromTo(
        headingRef.current.querySelectorAll(".reveal-word"),
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.035,
          scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        bodyRef.current.children,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: bodyRef.current, start: "top 85%" },
        }
      );
      gsap.fromTo(
        factsRef.current.children,
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: factsRef.current, start: "top 85%" },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative scroll-mt-20 py-16 md:py-24">
      <div ref={rootRef} className="shell">
        <div ref={labelRef}>
          <SectionLabel index="01">About</SectionLabel>
        </div>

        <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <h2
              ref={headingRef}
              className="font-display text-[1.9rem] font-bold leading-[1.12] tracking-[-0.01em] text-paper sm:text-4xl lg:text-[3.2rem]"
            >
              <SplitText text="I build practical software with a focus on clean interfaces and useful experiences." />
            </h2>

            <div ref={bodyRef} className="mt-10 max-w-2xl space-y-5 text-base leading-relaxed text-muted md:text-[17px]">
              <p>
                I'm a developer who enjoys turning ideas into working software.
                My work spans desktop applications and full-stack web
                applications, with a focus on Python and backend development.
              </p>
              <p>
                I like working with databases and designing REST APIs, and I
                care about building applications that are practical and
                actually get used — from inventory and course management tools
                to test-preparation software.
              </p>
              <p>
                I'm always learning, and I keep improving my skills through
                real projects rather than tutorials alone.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div ref={factsRef} className="space-y-8">
              {FACTS.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-faint">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 text-sm font-medium leading-relaxed text-paper/90">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}