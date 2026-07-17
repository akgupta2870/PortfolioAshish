import { useState } from "react";
import { AnimatePresence } from "motion/react";

// Modular UI imports
import ScrollProgressBar from "./components/ScrollProgressBar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import ExperienceTimeline from "./components/ExperienceTimeline";
import Projects from "./components/Projects";
import AIShowcase from "./components/AIShowcase";
import ValueCards from "./components/ValueCards";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CinematicLoader from "./components/CinematicLoader";
import CustomCursor from "./components/CustomCursor";
import CinematicBackground from "./components/CinematicBackground";

export default function App() {
  const [darkMode, setDarkMode] = useState(true); // Default to cinematic dark mode
  const [loading, setLoading] = useState(true);

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden select-text transition-colors duration-500 ${
        darkMode ? "bg-[#050508] text-slate-100" : "bg-[#f4faff] text-slate-900"
      }`}
    >
      {/* High-fidelity Custom Interaction Cursor */}
      <CustomCursor />

      {/* High-performance Adaptive Cinematic Canvas Background (inspired by joseph-san.com) */}
      <CinematicBackground darkMode={darkMode} />

      {/* Noise Overlays */}
      <div className="fixed inset-0 z-40 pointer-events-none noise-overlay animate-grain" />

      {/* Elegant Sky Blue Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className={`absolute top-[-5%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[130px] transition-colors duration-500 ${
          darkMode ? "bg-sky-950/20" : "bg-sky-200/40"
        }`} />
        <div className={`absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] transition-colors duration-500 ${
          darkMode ? "bg-sky-900/15" : "bg-sky-100/50"
        }`} />
        <div className={`absolute top-[30%] left-[10%] w-[400px] h-[400px] rounded-full blur-[100px] transition-colors duration-500 ${
          darkMode ? "bg-cyan-950/15" : "bg-cyan-100/40"
        }`} />
      </div>

      {/* High-End Interactive Preloader */}
      <AnimatePresence mode="wait">
        {loading && (
          <CinematicLoader key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Orchestrated View Sequence */}
      {!loading && (
        <>
          {/* Scroll progress tracking */}
          <ScrollProgressBar />

          {/* Navigation header */}
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />

          {/* Main sections */}
          <main className="relative z-10">
            <Hero darkMode={darkMode} />
            <About darkMode={darkMode} />
            <TechStack darkMode={darkMode} />
            <ExperienceTimeline darkMode={darkMode} />
            <Projects darkMode={darkMode} />
            <AIShowcase darkMode={darkMode} />
            <ValueCards darkMode={darkMode} />
            <Contact darkMode={darkMode} />
          </main>

          {/* Core Footer */}
          <Footer darkMode={darkMode} />
        </>
      )}
    </div>
  );
}
