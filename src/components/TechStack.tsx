import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Database, Server, Cloud, Code, Sparkles, Shield, Terminal, ArrowRight, Gauge } from "lucide-react";
import { skillCategories } from "../data";

interface TechStackProps {
  darkMode: boolean;
}

export default function TechStack({ darkMode }: TechStackProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Technologies", icon: Code },
    { id: "frontend", name: "Frontend Architecture", icon: Cpu },
    { id: "backend", name: "Backend, DB & AI", icon: Database },
    { id: "devops", name: "DevOps & Cloud", icon: Cloud },
  ];

  const filteredSkills =
    selectedCategory === "all"
      ? skillCategories.flatMap((cat) => cat.skills)
      : skillCategories.find((cat) => cat.id === selectedCategory)?.skills || [];

  // Match visual category themes
  const getProgressColor = (name: string) => {
    const lowercase = name.toLowerCase();
    if (lowercase.includes("react") || lowercase.includes("next") || lowercase.includes("tailwind")) {
      return "from-brand-purple to-pink-500 shadow-brand-purple/20";
    }
    if (lowercase.includes("node") || lowercase.includes("express") || lowercase.includes("mongo") || lowercase.includes("sql")) {
      return "from-brand-blue to-brand-cyan shadow-brand-blue/20";
    }
    return "from-brand-purple to-brand-blue shadow-brand-blue/20";
  };

  return (
    <section
      id="tech"
      className="py-24 md:py-32 relative overflow-hidden bg-neutral-950/20 dark:bg-neutral-950/40"
    >
      {/* Background Dots */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-dot-pattern" />

      {/* Decorative Blur Blob */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div
          className={`absolute bottom-10 right-[-10%] w-96 h-96 rounded-full bg-brand-blue/10 blur-[120px]`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs tracking-widest text-brand-purple uppercase font-bold"
          >
            02 / Core Skills
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
            A Powerhouse of Modern{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-blue">
              Web Capabilities
            </span>
          </motion.h3>
          <p
            className={`text-xs md:text-sm mt-4 max-w-xl mx-auto leading-relaxed ${
              darkMode ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            Over 7 years of honing technical skills in standard React paradigms, database optimization, CI/CD automation, and high-performance system designs.
          </p>
        </div>

        {/* Category Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all border ${
                  isSelected
                    ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white border-transparent shadow-lg shadow-brand-purple/15"
                    : darkMode
                    ? "bg-neutral-900/60 border-white/5 text-neutral-400 hover:text-white hover:bg-neutral-900 hover:border-white/10"
                    : "bg-white border-black/5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 hover:border-black/10"
                }`}
              >
                <Icon size={14} className="shrink-0" />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, idx) => {
              const colorClass = getProgressColor(skill.name);
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.35, delay: idx * 0.03 }}
                  whileHover={{ y: -4 }}
                  className={`p-6 rounded-2xl border transition-all ${
                    darkMode
                      ? "bg-neutral-900/30 border-white/5 shadow-xl shadow-black/20"
                      : "bg-white border-black/5 shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-bold tracking-wide ${
                        darkMode ? "text-neutral-100" : "text-neutral-800"
                      }`}
                    >
                      {skill.name}
                    </span>
                    <span className="font-mono text-[11px] font-bold text-brand-purple">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Outer Bar */}
                  <div
                    className={`w-full h-1.5 rounded-full overflow-hidden ${
                      darkMode ? "bg-white/5" : "bg-neutral-100"
                    }`}
                  >
                    {/* Inner active bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                      className={`h-full rounded-full bg-gradient-to-r shadow-sm ${colorClass}`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Tech Stack Callout Card */}
        <div className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-8 rounded-3xl border text-center flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden ${
              darkMode
                ? "bg-gradient-to-r from-neutral-900/40 via-brand-purple/5 to-neutral-900/40 border-white/5 shadow-xl shadow-black/40"
                : "bg-gradient-to-r from-white via-brand-purple/5 to-white border-black/5 shadow-md shadow-neutral-100"
            }`}
          >
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-brand-purple/5 rounded-full blur-[40px] pointer-events-none" />

            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-brand-purple/10 text-brand-purple border border-brand-purple/10 mb-3">
                <Gauge size={10} />
                PERFORMANCE OBSESSED
              </span>
              <h4
                className={`font-display font-bold text-lg md:text-xl tracking-tight ${
                  darkMode ? "text-neutral-200" : "text-neutral-800"
                }`}
              >
                Lighthouse & Core Web Vitals Optimized
              </h4>
              <p
                className={`text-[11px] md:text-xs leading-relaxed max-w-xl mt-1.5 ${
                  darkMode ? "text-neutral-400" : "text-neutral-600"
                }`}
              >
                I configure dynamic imports, route-level code splitting, lazy-loaded components, responsive image scaling, and state memoization rules into every React portal, guaranteeing sub-1s load times.
              </p>
            </div>

            <button
              onClick={() => {
                const element = document.getElementById("projects");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold tracking-wide bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 border border-white/10 dark:border-transparent hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              See Architecture in Action
              <ArrowRight size={14} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
