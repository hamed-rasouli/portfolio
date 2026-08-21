import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap.js";
import { EXPERIENCE } from "../data/site.js";
import SectionLabel from "./SectionLabel.jsx";

export default function Experience() {
  const rootRef = useRef(null);
  const labelRef = useRef(null);
  const itemsRef = useRef(null);

  useLayoutEffect(() => {
    if (EXPERIENCE.length > 0) {
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
          },
        );

        gsap.fromTo(
          itemsRef.current.children,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: { trigger: itemsRef.current, start: "top 78%" },
          },
        );
      }, rootRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <>
      {EXPERIENCE.length > 0 && (
        <section
          id="experience"
          className="relative scroll-mt-20 py-16 md:py-24"
        >
          <div ref={rootRef} className="shell">
            <div ref={labelRef}>
              <SectionLabel index="04">Experience</SectionLabel>
            </div>

            <div className="mt-10 border-t border-line">
              <div ref={itemsRef}>
                {EXPERIENCE.map((item) => (
                  <div
                    key={item.company}
                    className="grid gap-6 border-b border-line py-10 md:grid-cols-12 md:gap-10"
                  >
                    <div className="md:col-span-4">
                      <div className="font-display text-3xl font-semibold tracking-tight text-faint md:text-4xl">
                        {item.period}
                      </div>
                    </div>
                    <div className="md:col-span-8">
                      <h3 className="font-display text-3xl font-bold tracking-tight text-paper md:text-4xl">
                        {item.company}
                      </h3>
                      <div className="mt-2 text-sm font-medium text-accent">
                        {item.role}
                      </div>
                      <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
