import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap.js";
import { PROJECTS } from "../data/projects.js";
import { ArrowUpRightIcon } from "./Icons.jsx";

function ProjectItem({ project }) {
  const itemRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        contentRef.current.children,
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: { trigger: itemRef.current, start: "top 80%" },
        }
      );
    }, itemRef);

    return () => ctx.revert();
  }, []);

  return (
    <article ref={itemRef} className="group/item border-b border-line py-8">
      <div ref={contentRef} className="max-w-2xl">
        <h3 className="font-display text-3xl font-semibold tracking-tight text-paper transition-transform duration-500 group-hover/item:-translate-x-1 md:text-4xl">
          {project.name}
        </h3>
        <p className="mt-2 text-xs text-faint">{project.tagline}</p>

        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
          {project.description}
        </p>

        {project.features.length > 0 && (
          <ul className="mt-5 grid max-w-md grid-cols-2 gap-x-6 gap-y-2">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2.5 text-sm text-muted"
              >
                <span
                  aria-hidden="true"
                  className="h-1 w-1 shrink-0 rounded-full bg-accent/70"
                />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-7">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="link-line text-sm font-medium text-paper"
          >
            GitHub <ArrowUpRightIcon className="inline h-3.5 w-3.5" />
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="link-line text-sm font-medium text-paper"
            >
              Live Demo <ArrowUpRightIcon className="inline h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-20 py-14 md:py-20">
      <div className="shell">
        <div className="border-t border-line">
          {PROJECTS.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
