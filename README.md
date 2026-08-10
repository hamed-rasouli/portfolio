# Hamed Rasouli — Portfolio

A personal developer portfolio built with **React**, **Vite**, and **Tailwind CSS** (v4).

## Run locally

```bash
npm install
npm run dev
```

Open the printed URL (default: http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Customize

All content lives in two data files — no need to touch the components:

- `src/data/site.js` — social links, navigation, skills, learning, and experience.
- `src/data/projects.js` — featured projects.

Replace the placeholder values (`GITHUB_URL`, `LINKEDIN_URL`, `UPWORK_URL`,
`EMAIL_ADDRESS`, `CV_URL`, `TOEFL_GITHUB_URL`, …) with your real URLs. The site
runs fine with the placeholders, but links won't point anywhere until you
replace them.

## Structure

```text
src/
├── components/       # Navbar, Hero, About, Skills, Projects, Experience, Learning, Contact, Footer + shared (Icons, Reveal, SectionHeading)
├── data/             # projects.js, site.js
├── App.jsx
├── main.jsx
└── index.css         # Tailwind v4 entry + theme
```
