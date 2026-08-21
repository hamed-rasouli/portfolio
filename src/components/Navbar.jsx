import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion, scrollToId } from "../lib/gsap.js";
import { LINKS, NAV_LINKS } from "../data/site.js";
import { DownloadIcon } from "./Icons.jsx";

/**
 * Fixed navbar. Starts transparent over the hero, gains a blurred
 * surface + reduced height once the page scrolls (GSAP-tweened).
 * Mobile menu slides/fades in with GSAP and reverses on close.
 */
export default function Navbar({ ready }) {
  const headerRef = useRef(null);
  const panelRef = useRef(null);
  const linksRef = useRef(null);
  const tlRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  /* Entrance — slides down once the preloader starts lifting */
  useEffect(() => {
    if (!ready) return;
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      headerRef.current,
      { y: -64, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", delay: 0.05 }
    );
  }, [ready]);

  /* Scrolled state — one tween per threshold crossing */
  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 32;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    gsap.to(header, {
      backgroundColor: scrolled ? "rgba(10,10,11,0.85)" : "rgba(10,10,11,0)",
      borderColor: scrolled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0)",
      height: scrolled ? 60 : 80,
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    });
    header.classList.toggle("backdrop-blur-xl", scrolled);
  }, [scrolled]);

  /* Active-section spy */
  useEffect(() => {
    const onScroll = () => {
      let current = "#home";
      for (const link of NAV_LINKS) {
        const el = document.querySelector(link.href);
        if (el && el.getBoundingClientRect().top <= 180) current = link.href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Mobile menu */
  useEffect(() => {
    const panel = panelRef.current;
    if (open) {
      document.documentElement.style.overflow = "hidden";
      tlRef.current = gsap
        .timeline()
        .set(panel, { pointerEvents: "auto", display: "block" })
        .fromTo(
          panel,
          { autoAlpha: 0, yPercent: -8 },
          { autoAlpha: 1, yPercent: 0, duration: 0.35, ease: "power3.out" }
        )
        .fromTo(
          linksRef.current.children,
          { y: 28, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out", stagger: 0.05 },
          "-=0.12"
        );
    } else {
      document.documentElement.style.overflow = "";
      if (tlRef.current) {
        tlRef.current.reverse().eventCallback("onReverseComplete", () => {
          gsap.set(panel, { pointerEvents: "none", display: "none" });
        });
      }
    }
  }, [open]);

  const goTo = (e, href) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(href);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 border-b border-transparent"
      >
        <div className="shell flex h-full items-center justify-between">
          <a
            href="#home"
            onClick={(e) => goTo(e, "#home")}
            className="font-display text-lg font-semibold tracking-tight text-paper"
            aria-label="Hamed Rasouli — back to top"
          >
            Hamed<span className="text-accent">.</span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => goTo(e, link.href)}
                aria-current={active === link.href ? "true" : undefined}
                className={`nav-link relative px-3 py-2 text-[13px] font-medium transition-colors duration-300 ${
                  active === link.href ? "text-paper" : "text-muted hover:text-paper"
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 -bottom-0.5 h-px bg-accent transition-transform duration-300 origin-left ${
                    active === link.href ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            ))}
            <a
              href={LINKS.cv}
              className="ml-3 inline-flex items-center gap-1.5 rounded-sm border border-line px-3 py-1.5 text-xs font-semibold text-muted transition-colors duration-300 hover:border-accent/40 hover:text-accent"
            >
              <DownloadIcon className="h-3.5 w-3.5" />
              CV
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative flex h-10 w-10 items-center justify-center lg:hidden"
          >
            <span
              aria-hidden="true"
              className={`absolute h-px w-6 bg-paper transition-all duration-300 ${
                open ? "rotate-45" : "-translate-y-[5px]"
              }`}
            />
            <span
              aria-hidden="true"
              className={`absolute h-px w-6 bg-paper transition-all duration-300 ${
                open ? "-rotate-45" : "translate-y-[5px]"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className="fixed inset-0 z-40 hidden bg-ink pt-24"
        style={{ pointerEvents: "none" }}
      >
        <div className="shell">
          <nav ref={linksRef} aria-label="Mobile" className="flex flex-col">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => goTo(e, link.href)}
                className={`menu-link flex items-baseline justify-between border-b border-line py-5 ${
                  active === link.href ? "text-paper" : "text-muted"
                }`}
              >
                <span className="font-display text-3xl font-semibold tracking-tight">
                  {link.label}
                </span>
                <span className="text-xs text-faint">
                  0{i + 1}
                </span>
              </a>
            ))}
            <a
              href={LINKS.cv}
              className="menu-link mt-8 inline-flex w-fit items-center gap-2 rounded-sm border border-line px-4 py-2.5 text-sm font-medium text-muted"
            >
              <DownloadIcon className="h-4 w-4" />
              Download CV
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}
