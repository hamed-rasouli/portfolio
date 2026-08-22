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
    status: "Completed",
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
    demoText: "Afghan Gym",
  },
  // tailor

// Course Management System
{
  id: "course",
  name: "Course Management System",
  status: "Ongoing",
  tagline: "Multi-branch education management platform",
  description:
    "A comprehensive education management platform that enables course owners to manage multiple branches, with each branch operating its own students, teachers, classes, finances, and academic activities while providing the owner with a centralized dashboard to monitor and compare all branches.",
  technologies: ["React", "Node.js", "Express.js", "MongoDB"],
  features: [
    "Owner dashboard",
    "Multi-branch management",
    "Student portal",
    "Teacher portal",
    "Student management",
    "Teacher management",
    "Class management",
    "Teacher attendance",
    "Exam management",
    "Financial management",
    "Payment management",
    "Branch-level administration",
    "Centralized owner dashboard",
    "Cross-branch analytics",
    "Centralized monitoring of all branches",
  ],
  github: "COURSE_SYSTEM_GITHUB_URL",
  demo: null,
},
  // TOEFL Preparation Tests
  {
    id: "toefl",
    name: "TOEFL Preparation Tests",
    status: "Completed",
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
    status: "Completed",
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
