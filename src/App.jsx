import { useCallback, useState } from "react";
import Preloader from "./components/Preloader.jsx";
import Cursor from "./components/Cursor.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Experience from "./components/Experience.jsx";
import Philosophy from "./components/Philosophy.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [ready, setReady] = useState(false);
  const handlePreloaderDone = useCallback(() => setReady(true), []);

  return (
    <div id="top" className="min-h-screen bg-ink text-paper">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[110] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>

      <Preloader onDone={handlePreloaderDone} />
      <Cursor />
      {/* Fine grain overlay — adds subtle texture without distracting */}
      <div
        className="noise pointer-events-none fixed inset-0 z-[5] opacity-[0.035]"
        aria-hidden="true"
      />

      <Navbar ready={ready} />
      <main id="main">
        <Hero ready={ready} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
