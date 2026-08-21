// ------------------------------------------------------------------
// Featured projects.
//
// Replace the GitHub / demo placeholders with your real URLs. Set
// `demo: null` (or omit it) when a live demo is not available — the
// Live Demo button is only rendered when `demo` is present.
// ------------------------------------------------------------------

export const PROJECTS = [
  {
    id: "toefl",
    name: "TOEFL Preparation Tests",
    tagline: "Desktop TOEFL prep application",
    description:
      "A desktop application for practicing and taking TOEFL-style tests, with vocabulary and speaking practice built in.",
    technologies: ["Python", "CustomTkinter", "SQLite"],
    features: [
      "Practice tests",
      "Real test mode",
      "Vocabulary library",
      "Speaking tasks",
      "Test management",
      "Local database",
      "Offline functionality",
    ],
    github: "TOEFL_GITHUB_URL",
    demo: null,
  },
  {
    id: "inventory",
    name: "Inventory Management System",
    tagline: "Desktop inventory & business management",
    description:
      "A desktop application for managing products, invoices, warehouse operations, and financial records.",
    technologies: ["Python", "CustomTkinter", "SQLite"],
    features: [
      "Invoice registration",
      "Inventory management",
      "Warehouse management",
      "Ledger",
      "Invoice printing",
      "Local database",
    ],
    github: "INVENTORY_GITHUB_URL",
    demo: null,
  },
  {
    id: "course",
    name: "Course Management System",
    tagline: "Management platform for multi-branch institutions",
    description:
      "A web platform designed for educational institutions with multiple branches, centralizing administration in one place.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB"],
    features: [
      "Super Admin dashboard",
      "Branch management",
      "Student management",
      "Teacher management",
      "Class management",
      "Payment management",
      "Exams",
      "Teacher attendance",
      "Centralized administration",
    ],
    github: "COURSE_SYSTEM_GITHUB_URL",
    demo: null,
  },
  {
    id: "hotel",
    name: "Hotel & Reservation Management System",
    tagline: "Web-based hotel reservation management",
    description:
      "A web-based system for managing hotel reservations and the operations that go with them.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB"],
    features: [],
    github: "HOTEL_GITHUB_URL",
    demo: "HOTEL_LIVE_URL",
  },
  {
    id: "ecommerce",
    name: "E-Commerce Application",
    tagline: "Full-stack e-commerce application",
    description:
      "A full-stack e-commerce application covering frontend, backend, database, authentication, and API integration.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB"],
    features: [],
    github: "ECOMMERCE_GITHUB_URL",
    demo: "ECOMMERCE_LIVE_URL",
  },
];
