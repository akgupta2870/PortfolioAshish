import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Terminal, Shield, Sparkles } from "lucide-react";

interface CinematicLoaderProps {
  onComplete: () => void;
  key?: string | number;
}

export default function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("Establishing pipeline connection...");

  useEffect(() => {
    // Non-linear realistic ticking curve to feel like a real WebGL loading sequence
    let current = 0;
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 8) + 1;
      current = Math.min(100, current + increment);
      setProgress(current);

      // Dynamically change status messages based on progress
      if (current < 20) {
        setCurrentStatus("Fetching GPU hardware profiles...");
      } else if (current < 45) {
        setCurrentStatus("Compiling fragment shaders...");
      } else if (current < 70) {
        setCurrentStatus("Uploading high-resolution diffuse maps...");
      } else if (current < 90) {
        setCurrentStatus("Orchestrating layout spring physics...");
      } else {
        setCurrentStatus("Optimizing rendering viewport...");
      }

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 950); // let transition animation finish
        }, 400);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  const nameLetters = "ASHISH KUMAR".split("");

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", 
            transition: { 
              duration: 0.95, 
              ease: [0.76, 0, 0.24, 1] 
            } 
          }}
          className="fixed inset-0 bg-[#050508] z-[99999] flex flex-col justify-between p-6 sm:p-12 text-white overflow-hidden"
        >
          {/* Top Decorative Tech Rail */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <Cpu className="text-brand-purple w-4 h-4 animate-pulse" />
              <span className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase font-bold">
                PORTFOLIO SYSTEM ENGINE V2.5
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-neutral-500 font-mono text-[9px] tracking-wider">
              <span>RENDER: WEBGL_2.0</span>
              <span>•</span>
              <span>LOC: BENGALURU, INDIA</span>
            </div>
          </div>

          {/* Center Main Stagger Title & Progress */}
          <div className="flex flex-col items-center justify-center flex-1 py-12 relative">
            {/* Background glowing orb */}
            <div className="absolute w-[350px] h-[350px] bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Title staggered reveal */}
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter flex mb-6 select-none overflow-hidden py-2">
              {nameLetters.map((char, idx) => (
                <motion.span
                  key={idx}
                  initial={{ y: "100%", rotate: 6 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: idx * 0.05,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className={`inline-block origin-bottom-left ${char === " " ? "w-4 sm:w-6" : ""}`}
                >
                  {char}
                </motion.span>
              ))}
            </h1>

            {/* Large Cinematic ticking counter */}
            <div className="relative overflow-hidden mb-4 h-24 sm:h-32 flex items-center justify-center">
              <span className="font-display font-black text-7xl sm:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-800 opacity-90 select-none tracking-tight">
                {progress.toString().padStart(3, "0")}
              </span>
              <span className="font-mono text-xs text-brand-cyan absolute bottom-2 right-[-24px] uppercase tracking-widest">
                % loaded
              </span>
            </div>

            {/* Custom layout system status line */}
            <div className="flex flex-col items-center gap-2">
              <p className="font-mono text-[10px] text-neutral-400 min-h-4 text-center">
                {currentStatus}
              </p>
              
              {/* Radial Progress Dot indicator */}
              <div className="flex gap-1 items-center justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      progress > i * 20 
                        ? "bg-brand-cyan shadow-sm shadow-brand-cyan" 
                        : "bg-neutral-800"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Rail Metadata */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/5 pt-4 gap-4">
            <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[9px] tracking-wider">
              <Shield size={10} className="text-brand-cyan" />
              <span>SECURE PROTOCOL ESTABLISHED</span>
            </div>
            <div className="flex items-center gap-1 text-[9px] font-mono text-neutral-500">
              <Sparkles size={9} className="text-brand-purple animate-pulse" />
              <span>INSPIRED BY HIGH-CRAFTSMANSHIP MOTION PARADIGMS</span>
            </div>
          </div>

          {/* Fluid curtain splits overlaying on exit */}
          <div className="absolute inset-x-0 bottom-0 h-0 bg-brand-purple z-[100000] pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
