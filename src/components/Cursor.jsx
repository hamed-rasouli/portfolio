import { useEffect, useRef } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "../lib/gsap.js";

/**
 * Elegant cursor accent — a soft trailing ring that follows the cursor.
 * The native cursor is NEVER hidden, so there is no risk of the cursor
 * disappearing. Expands slightly over interactive elements.
 *
 * Auto-disabled on touch devices, small screens, and reduced motion.
 */
export default function Cursor() {
  const ringRef = useRef(null);

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;

    const ring = ringRef.current;

    gsap.set(ring, {
      xPercent: -50,
      yPercent: -50,
      x: -100,
      y: -100,
      opacity: 0,
    });

    const ringX = gsap.quickTo(ring, "x", { duration: 0.6, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.6, ease: "power3.out" });

    let visible = false;
    const show = () => {
      if (visible) return;
      visible = true;
      gsap.to(ring, { opacity: 1, duration: 0.4, overwrite: true });
    };

    const move = (e) => {
      show();
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const over = (e) => {
      const interactive = e.target.closest("a, button, [role='button']");

      if (interactive) {
        gsap.to(ring, {
          scale: 1.5,
          borderColor: "rgba(242,241,238,0.4)",
          duration: 0.4,
          ease: "power3.out",
          overwrite: "auto",
        });
      } else {
        gsap.to(ring, {
          scale: 1,
          backgroundColor: "rgba(242,241,238,0)",
          borderColor: "rgba(242,241,238,0.2)",
          duration: 0.4,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block" aria-hidden="true">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-8 w-8 rounded-full border border-paper/20"
      />
    </div>
  );
}
