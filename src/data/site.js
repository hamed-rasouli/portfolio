// ------------------------------------------------------------------
// Site-wide configuration.
//
// Replace every placeholder below with your real URLs before
// deploying. The placeholders are intentional — nothing here is
// invented, and the site will still run with them as-is.
// ------------------------------------------------------------------

export const LINKS = {
  github: "GITHUB_URL",
  linkedin: "LINKEDIN_URL",
  upwork: "UPWORK_URL",
  email: "EMAIL_ADDRESS",
  cv: "CV_URL",
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const SKILLS = [
  { category: "Languages", items: ["Python", "JavaScript", "C++"] },
  { category: "Backend", items: ["FastAPI", "Express.js", "Node.js"] },
  {
    category: "Frontend",
    items: ["React", "HTML", "CSS", "Tailwind CSS", "Vite"],
  },
  { category: "Databases", items: ["MongoDB", "PostgreSQL", "SQLite"] },
  {
    category: "Tools",
    items: ["Git", "GitHub"],
  },
];

export const EXPERIENCE = [
  {
    company: "TechLife",
    period: "2023 — 2024",
    // Replace with your real title when you have it.
    role: "YOUR_ROLE",
    description:
      "Worked with TechLife during 2023 and 2024. I'll describe my responsibilities here once I confirm the exact details.",
  },
];
