/**
 * Device capability profile used to decide whether (and how richly) the
 * hero 3D background should render.
 *
 * Returns:
 *   { enabled: false }        — no WebGL, reduced motion, or too weak
 *   { enabled: true, tier: "desktop"|"mobile"|"low", pointer: boolean }
 */
export function getDeviceProfile() {
  if (typeof window === "undefined") {
    return { enabled: false };
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 767px)").matches;

  let webgl = false;
  try {
    const canvas = document.createElement("canvas");
    webgl = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    webgl = false;
  }

  if (!webgl || reduced) {
    return { enabled: false };
  }

  const cores = navigator.hardwareConcurrency || 8;
  const lowPower = cores <= 4;

  if (lowPower) {
    return { enabled: true, tier: "low", pointer: false };
  }
  if (mobile) {
    return { enabled: true, tier: "mobile", pointer: false };
  }

  const finePointer =
    window.matchMedia("(pointer: fine)").matches &&
    window.matchMedia("(hover: hover)").matches;

  return { enabled: true, tier: "desktop", pointer: finePointer };
}
