// ------------------------------------------------------------------
// Featured projects.
//
// Replace the GitHub / demo placeholders with your real URLs. Set
// `demo: null` (or omit it) when a live demo is not available — the
// Live Demo button is only rendered when `demo` is present.
// ------------------------------------------------------------------

export const PROJECTS = [
  // Gym Management System
  {
    id: "gym",
    name: "Gym Management System",
    tagline: "Complete digital platform for modern gym management",
    description:
      "A full-featured gym management platform that centralizes members, trainers, memberships, payments, attendance, workout programs, diet plans, and daily operations in one responsive application.",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PWA",
      "Telegram Bot API",
    ],
    features: [
      "Admin dashboard",
      "Member management",
      "Trainer management",
      "Membership management",
      "Membership plans",
      "Automated membership-expiry notifications",
      "Attendance tracking",
      "Payment management",
      "Workout program management",
      "Personalized diet plans",
      "Member progress tracking",
      "Telegram bot integration",
      "Workout and diet delivery through Telegram",
      "Daily operational reports for the gym owner",
      "7-day offline functionality",
      "Installable PWA",
      "Fully responsive design",
      "English, Persian, and Pashto support",
    ],
    github: "GYM_SYSTEM_GITHUB_URL",
    demo: "https://afghangym.com",
    demoText: "Afghan Gym"
  },
  // tailor

  // Course Management System
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
  // TOEFL Preparation Tests
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

    github: null,
    demo: null,
  },
  // Inventory Management System
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
];
