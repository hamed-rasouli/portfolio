import { Fragment } from "react";

/**
 * Renders text as masked words (`.mask-word > .reveal-word`) so GSAP can
 * reveal each word with a clean clip/y-translate. The text itself stays
 * readable for assistive tech and copy/paste.
 */
export default function SplitText({
  as: Tag = "span",
  text,
  className = "",
  wordClassName = "",
  ...rest
}) {
  const words = text.split(" ");
  return (
    <Tag className={className} {...rest}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className={`mask-word ${wordClassName}`}>
            <span className="reveal-word">{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
