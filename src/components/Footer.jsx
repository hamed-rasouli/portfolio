import { gsap } from "../lib/gsap.js";
import { LINKS, NAV_LINKS } from "../data/site.js";
import {
  GitHubIcon,
  LinkedInIcon,
  UpworkIcon,
  MailIcon,
  ArrowUpIcon,
} from "./Icons.jsx";

const SOCIALS = [
  { label: "GitHub", href: LINKS.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: LINKS.linkedin, Icon: LinkedInIcon },
  { label: "Upwork", href: LINKS.upwork, Icon: UpworkIcon },
  { label: "Email", href: `mailto:${LINKS.email}`, Icon: MailIcon },
];

export default function Footer() {
  const backToTop = () => {
    gsap.to(window, {
      duration: 0.9,
      ease: "power3.inOut",
      scrollTo: { y: 0 },
    });
  };

  return (
    <footer className="border-t border-line">
      <div className="shell py-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight text-paper">
              Hamed<span className="text-accent">.</span>
            </p>
            <p className="mt-2 text-xs text-faint">
              Python &amp; Full-Stack Developer
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-3"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="link-line w-fit text-sm text-muted transition-colors duration-300 hover:text-paper"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <ul className="flex items-center gap-2">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-line text-muted transition-colors duration-300 hover:border-accent/40 hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-faint">
            © {new Date().getFullYear()} Hamed Rasouli · Built with React, Vite
            &amp; Tailwind CSS
          </p>
          <button
            type="button"
            onClick={backToTop}
            className="group inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-faint transition-colors duration-300 hover:text-paper"
          >
            BACK TO TOP
            <ArrowUpIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
}
