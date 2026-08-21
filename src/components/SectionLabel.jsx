/**
 * `01 / ABOUT` style metadata label with a trailing hairline.
 * The line is animated separately by each section's GSAP timeline.
 */
export default function SectionLabel({ index, children, lineClassName = "" }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-xs font-semibold uppercase tracking-[0.25em]">
        <span className="text-accent">{index}</span>
        <span className="text-faint"> / </span>
        <span className="text-muted">{children}</span>
      </span>
      <span className={`h-px flex-1 bg-line ${lineClassName}`} aria-hidden="true" />
    </div>
  );
}
