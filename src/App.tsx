import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Terminal } from "lucide-react";

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

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Pre-loader simulated network compilation
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 120);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden select-text transition-colors duration-500 ${
        darkMode ? "bg-[#030303] text-zinc-100" : "bg-neutral-50 text-neutral-900"
      }`}
    >
      {/* Noise Overlays */}
      <div className="fixed inset-0 z-40 pointer-events-none noise-overlay" />

      {/* Elegant Dark Background Orbs */}
      {darkMode && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[100px]" />
          <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[100px]" />
        </div>
      )}

      {/* High-End Interactive Preloader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-neutral-950 z-[9999] flex flex-col items-center justify-center text-white p-6"
          >
            {/* Spinning vector logo */}
            <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-3xl border-2 border-brand-purple border-t-transparent border-r-transparent"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-2xl border-2 border-brand-blue border-b-transparent border-l-transparent"
              />
              <span className="font-display font-black text-xl text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-400">
                AK
              </span>
            </div>

            {/* Simulated compilation terminal lines */}
            <div className="flex flex-col items-center gap-2 max-w-sm text-center">
              <span className="font-mono text-[9px] tracking-widest text-brand-purple uppercase font-bold flex items-center gap-1">
                <Terminal size={10} />
                INITIALIZING PORTFOLIO ENGINE
              </span>
              <p className="font-mono text-[10px] text-neutral-400">
                {loadingProgress < 40
                  ? "Resolving dependency trees..."
                  : loadingProgress < 75
                  ? "Configuring glassmorphism filters..."
                  : "Optimizing viewport renderers..."}
              </p>
              
              {/* Progress counter */}
              <div className="w-48 h-1 bg-neutral-900 rounded-full overflow-hidden mt-4">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-purple to-brand-blue rounded-full"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <span className="font-mono text-[10px] text-neutral-500 mt-1">{loadingProgress}%</span>
            </div>
          </motion.div>
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
