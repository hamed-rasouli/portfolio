import { useRef } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "../lib/gsap.js";

/**
 * Subtle magnetic pull on CTAs. Movement is deliberately small; the
 * element eases back with a gentle spring on leave. Desktop only.
 */
export default function Magnetic({ children, strength = 0.22, className = "" }) {
  const ref = useRef(null);

  const onMove = (e) => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    gsap.to(el, { x, y, duration: 0.4, ease: "power3.out", overwrite: "auto" });
  };

  const onLeave = () => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.35)",
      overwrite: "auto",
    });
  };

  return (
    <span
      ref={ref}
      className={`inline-block will-change-transform ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </span>
  );
}
