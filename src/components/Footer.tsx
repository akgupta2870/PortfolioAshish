import { motion } from "motion/react";
import { ArrowUp, Sparkles } from "lucide-react";
import { personalInfo } from "../data";

interface FooterProps {
  darkMode: boolean;
}

export default function Footer({ darkMode }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className={`border-t py-12 md:py-16 relative overflow-hidden ${
        darkMode ? "bg-neutral-950 border-white/5" : "bg-white border-black/5"
      }`}
    >
      {/* Decorative Blur Blob */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <div
          className={`absolute bottom-[-10%] right-[30%] w-72 h-72 rounded-full bg-brand-purple/10 blur-[80px]`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Side: Logo and copy */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
          <div className="flex items-center cursor-pointer" onClick={handleScrollTop}>
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-blue shadow-lg shadow-brand-purple/10 overflow-hidden">
              <span className="font-display font-bold text-sm text-white">A</span>
            </div>
            <span className="ml-2.5 font-display font-extrabold text-xs tracking-wider uppercase">
              ASHISH <span className="text-brand-purple">KUMAR</span>
            </span>
          </div>

          <p className="text-[11px] text-neutral-500 font-mono">
            © {currentYear} Ashish Kumar. Engineered with React 19 & Tailwind v4.
          </p>
        </div>

        {/* Right Side: Shortcut & scroll triggers */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              const el = document.getElementById("projects");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-[11px] font-semibold tracking-wider text-neutral-500 hover:text-brand-purple uppercase transition-colors cursor-pointer"
          >
            Portfolio Works
          </button>
          
          <button
            onClick={() => {
              const el = document.getElementById("experience");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-[11px] font-semibold tracking-wider text-neutral-500 hover:text-brand-purple uppercase transition-colors cursor-pointer"
          >
            Milestones
          </button>

          {/* Scroll to Top */}
          <button
            onClick={handleScrollTop}
            className={`p-3 rounded-xl border transition-all ${
              darkMode
                ? "bg-neutral-900 border-white/5 text-neutral-400 hover:text-white hover:border-white/10 shadow-lg"
                : "bg-neutral-50 border-black/5 text-neutral-600 hover:text-neutral-950 shadow-sm"
            }`}
            title="Scroll to Top"
            aria-label="Scroll to Top"
          >
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
