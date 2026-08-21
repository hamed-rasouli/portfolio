import { useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap.js";
import { LINKS } from "../data/site.js";
import SplitText from "./SplitText.jsx";
import {
  GitHubIcon,
  LinkedInIcon,
  UpworkIcon,
  MailIcon,
  DownloadIcon,
  ArrowUpRightIcon,
} from "./Icons.jsx";

const CHANNELS = [
  { label: "Email", value: LINKS.email, href: `mailto:${LINKS.email}`, Icon: MailIcon },
  { label: "GitHub", value: LINKS.github, href: LINKS.github, Icon: GitHubIcon },
  { label: "LinkedIn", value: LINKS.linkedin, href: LINKS.linkedin, Icon: LinkedInIcon },
  { label: "Upwork", value: LINKS.upwork, href: LINKS.upwork, Icon: UpworkIcon },
];

const inputClasses =
  "w-full rounded-sm border border-line bg-ink/60 px-3.5 py-2.5 text-sm text-paper placeholder-faint outline-none transition focus:border-accent/60";

export default function Contact() {
  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const rowsRef = useRef(null);
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${LINKS.email}?subject=${subject}&body=${body}`;
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

      gsap.fromTo(
        headingRef.current.querySelectorAll(".reveal-word"),
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: { trigger: rootRef.current, start: "top 72%" },
        }
      );
      gsap.fromTo(
        bodyRef.current.children,
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: bodyRef.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        rowsRef.current.children,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: { trigger: rowsRef.current, start: "top 82%" },
        }
      );
      gsap.fromTo(
        formRef.current,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 85%" },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="relative scroll-mt-20 py-20 md:py-28">
      <div ref={rootRef} className="shell">
        <h2
          ref={headingRef}
          className="font-display text-[clamp(2.6rem,7.5vw,5.5rem)] font-bold leading-[1.02] tracking-tight text-paper"
        >
          <SplitText text="Let's build something." />
        </h2>

        <div ref={bodyRef} className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
            Have a project in mind or want to work together? I'd love to hear
            from you.
          </p>
          <a href={LINKS.cv} className="btn-ghost">
            <DownloadIcon className="h-4 w-4" />
            Download CV
          </a>
        </div>

        <div ref={rowsRef} className="mt-10 border-t border-line">
          {CHANNELS.map(({ label, value, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
              className="group flex items-center justify-between gap-6 border-b border-line py-7 transition-colors duration-300 hover:bg-white/[0.02]"
            >
              <span className="flex min-w-0 items-center gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-line text-muted transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-2xl font-semibold tracking-tight text-paper transition-transform duration-500 group-hover:translate-x-1 md:text-3xl">
                    {label}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-faint">
                    {value}
                  </span>
                </span>
              </span>
              <ArrowUpRightIcon className="h-5 w-5 shrink-0 text-faint transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
            </a>
          ))}
        </div>

        <div ref={formRef} className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-faint">
              Or write directly
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Prefer email? Send a message and it opens in your mail client,
              addressed to me with everything prefilled.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7"
            aria-label="Contact form"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-paper/90">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-paper/90">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClasses}
                />
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-paper/90">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                className={`${inputClasses} resize-y`}
              />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button type="submit" className="btn-primary">
                Send Message
                <ArrowUpRightIcon className="arrow h-4 w-4" />
              </button>
              <p className="text-xs text-faint">
                Submitting opens your email client with the message prefilled.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}