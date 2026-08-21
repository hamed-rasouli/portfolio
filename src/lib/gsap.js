import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export { gsap, ScrollTrigger };

export const EASE = {
  out: "power3.out",
  out4: "power4.out",
  inOut: "power4.inOut",
  expo: "expo.out",
};

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isFinePointer() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    window.matchMedia("(hover: hover)").matches
  );
}

/** Smooth-scroll to a section id (e.g. "#about"), offset for the fixed header. */
export function scrollToId(id) {
  const el = document.querySelector(id);
  if (!el) return;
  gsap.to(window, {
    duration: 0.9,
    ease: "power3.inOut",
    scrollTo: { y: el, offsetY: 72 },
  });
}
