import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Check, CodeXml, Layers, Cpu, ShieldAlert, TrendingUp, Sparkle, HeartHandshake } from "lucide-react";
import { teamValues, hireReasons } from "../data";

interface ValueCardsProps {
  darkMode: boolean;
}

export default function ValueCards({ darkMode }: ValueCardsProps) {
  const [activeTab, setActiveTab] = useState<"team" | "hire">("team");

  // Icon mapper helper
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Layers":
        return Layers;
      case "CodeXml":
        return CodeXml;
      case "Cpu":
        return Cpu;
      case "Sparkles":
        return Sparkles;
      case "ShieldAlert":
        return ShieldAlert;
      case "TrendingUp":
        return TrendingUp;
      default:
        return Sparkle;
    }
  };

  return (
    <section
      id="values"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background Dots */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-dot-pattern" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs tracking-widest text-brand-purple uppercase font-bold"
          >
            06 / Value Proposal
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`font-display font-bold text-3xl sm:text-4xl md:text-5xl mt-3 tracking-tight ${
              darkMode ? "text-white" : "text-neutral-900"
            }`}
          >
            An Engineering Partner For{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-blue">
              Your Product Squad
            </span>
          </motion.h3>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-center mb-16">
          <div className={`p-1.5 rounded-2xl border flex items-center gap-1 ${
            darkMode ? "bg-neutral-900/60 border-white/5" : "bg-neutral-100 border-black/5"
          }`}>
            <button
              onClick={() => setActiveTab("team")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === "team"
                  ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-md shadow-brand-purple/10"
                  : darkMode
                  ? "text-neutral-400 hover:text-white"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <HeartHandshake size={14} />
              What I Bring to Your Team
            </button>
            <button
              onClick={() => setActiveTab("hire")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === "hire"
                  ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-md shadow-brand-purple/10"
                  : darkMode
                  ? "text-neutral-400 hover:text-white"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Sparkles size={14} />
              Why Hire Me (Pillars)
            </button>
          </div>
        </div>

        {/* Dynamic Bento Cards Display */}
        <AnimatePresence mode="wait">
          {activeTab === "team" ? (
            <motion.div
              key="team-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {teamValues.map((val, idx) => (
                <motion.div
                  key={val.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -6 }}
                  className={`p-6 md:p-8 rounded-2xl border text-left flex flex-col justify-between transition-all relative overflow-hidden ${
                    darkMode
                      ? "bg-neutral-900/30 border-white/5 hover:border-brand-purple/30 shadow-xl shadow-black/20"
                      : "bg-white border-black/5 hover:border-brand-purple/10 shadow-sm shadow-neutral-100"
                  }`}
                >
                  {/* Decorative corner node element */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-purple/5 rounded-full blur-[24px] pointer-events-none" />

                  <div>
                    <span className="font-mono text-[9px] font-bold text-brand-purple uppercase tracking-widest mb-3 block">
                      VALUE PROP / 0{idx + 1}
                    </span>
                    <h4
                      className={`font-display font-bold text-base md:text-lg tracking-tight mb-3 ${
                        darkMode ? "text-neutral-100" : "text-neutral-800"
                      }`}
                    >
                      {val.title}
                    </h4>
                    <p
                      className={`text-xs leading-relaxed mb-6 ${
                        darkMode ? "text-neutral-400" : "text-neutral-600"
                      }`}
                    >
                      {val.description}
                    </p>
                  </div>

                  {/* Highlights list */}
                  <div className="space-y-2 border-t border-white/5 dark:border-black/5 pt-4">
                    {val.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-brand-purple/10 flex items-center justify-center shrink-0">
                          <Check size={10} className="text-brand-purple" />
                        </div>
                        <span
                          className={`text-[10px] font-semibold tracking-wide ${
                            darkMode ? "text-neutral-300" : "text-neutral-700"
                          }`}
                        >
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="hire-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {hireReasons.map((reason, idx) => {
                const IconComponent = getIcon(reason.icon);
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    whileHover={{ y: -6 }}
                    className={`p-6 md:p-8 rounded-2xl border text-left flex flex-col justify-between transition-all relative overflow-hidden ${
                      darkMode
                        ? "bg-neutral-900/30 border-white/5 hover:border-brand-blue/30 shadow-xl shadow-black/20"
                        : "bg-white border-black/5 hover:border-brand-blue/10 shadow-sm shadow-neutral-100"
                    }`}
                  >
                    {/* Corner gradient blur */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-full blur-[24px] pointer-events-none" />

                    <div>
                      <div className="w-9 h-9 rounded-xl bg-brand-blue/5 dark:bg-brand-blue/10 flex items-center justify-center mb-5 border border-brand-blue/10">
                        <IconComponent size={16} className="text-brand-blue" />
                      </div>

                      <h4
                        className={`font-display font-bold text-base md:text-lg tracking-tight mb-2.5 ${
                          darkMode ? "text-neutral-100" : "text-neutral-800"
                        }`}
                      >
                        {reason.title}
                      </h4>
                      <p
                        className={`text-xs leading-relaxed ${
                          darkMode ? "text-neutral-400" : "text-neutral-600"
                        }`}
                      >
                        {reason.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
