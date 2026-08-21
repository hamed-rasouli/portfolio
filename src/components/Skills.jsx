import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap.js";
import { SKILLS } from "../data/site.js";
import SectionLabel from "./SectionLabel.jsx";

export default function Skills() {
  const rootRef = useRef(null);
  const labelRef = useRef(null);
  const gridRef = useRef(null);

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
          scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        gridRef.current.children,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: gridRef.current, start: "top 82%" },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="relative scroll-mt-20 py-14 md:py-20">
      <div ref={rootRef} className="shell">
        <div ref={labelRef}>
          <SectionLabel index="02">Skills</SectionLabel>
        </div>

        <div
          ref={gridRef}
          className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SKILLS.map((group) => (
            <div key={group.category}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-faint">
                {group.category}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="group flex items-center gap-2 text-[15px] font-medium text-muted transition-colors duration-300 hover:text-paper"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 shrink-0 rounded-full bg-transparent transition-colors duration-300 group-hover:bg-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}