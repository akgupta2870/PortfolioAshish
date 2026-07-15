import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Github, Code, Sparkles, Layers, CheckSquare, Zap, TrendingUp, X, BarChart } from "lucide-react";
import { projects, personalInfo } from "../data";
import { Project } from "../types";

interface ProjectsProps {
  darkMode: boolean;
}

export default function Projects({ darkMode }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Render a customized, stunning responsive vector mockup depending on the project
  const renderProjectMockup = (id: string) => {
    if (id === "ai_chatbot") {
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Frame */}
          <rect width="400" height="240" rx="16" fill="#0c0e17" stroke="#1f2937" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="5" fill="#ef4444" />
          <circle cx="34" cy="20" r="5" fill="#f59e0b" />
          <circle cx="48" cy="20" r="5" fill="#10b981" />
          
          {/* Main area */}
          <rect x="15" y="40" width="370" height="185" rx="10" fill="#080a10" />
          
          {/* Chat header */}
          <rect x="25" y="50" width="350" height="24" rx="6" fill="#111827" />
          <circle cx="40" cy="62" r="5" fill="#a855f7" />
          <rect x="52" y="58" width="80" height="8" rx="4" fill="#6b7280" />
          
          {/* User message bubble */}
          <rect x="180" y="85" width="180" height="28" rx="8" fill="#3b82f6" />
          <rect x="195" y="93" width="150" height="6" rx="3" fill="#ffffff" />
          <circle cx="345" cy="99" r="6" fill="#60a5fa" />
          
          {/* AI message bubble */}
          <rect x="35" y="125" width="220" height="38" rx="8" fill="#1e1b4b" stroke="#4338ca" strokeWidth="1" />
          <rect x="50" y="134" width="190" height="6" rx="3" fill="#a78bfa" />
          <rect x="50" y="146" width="130" height="6" rx="3" fill="#a78bfa" />
          <circle cx="21" cy="139" r="6" fill="#a855f7" />
          
          {/* Text input area */}
          <rect x="25" y="185" width="350" height="30" rx="8" fill="#111827" />
          <rect x="40" y="196" width="160" height="8" rx="4" fill="#374151" />
          <circle cx="355" cy="200" r="8" fill="#a855f7" />
        </svg>
      );
    }
    if (id === "iflip") {
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Frame */}
          <rect width="400" height="240" rx="16" fill="#080a10" stroke="#1f2937" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="5" fill="#ef4444" />
          <circle cx="34" cy="20" r="5" fill="#f59e0b" />
          <circle cx="48" cy="20" r="5" fill="#10b981" />
          
          {/* Ticker bar */}
          <rect x="15" y="40" width="370" height="20" rx="6" fill="#111827" />
          <rect x="25" y="48" width="40" height="4" rx="2" fill="#10b981" />
          <rect x="75" y="48" width="40" height="4" rx="2" fill="#ef4444" />
          <rect x="125" y="48" width="50" height="4" rx="2" fill="#10b981" />
          
          {/* Left panel: stocks list */}
          <rect x="15" y="70" width="120" height="155" rx="8" fill="#111827" />
          <rect x="25" y="80" width="100" height="18" rx="4" fill="#1f2937" />
          <rect x="25" y="105" width="100" height="18" rx="4" fill="#1f2937" />
          <rect x="25" y="130" width="100" height="18" rx="4" fill="#1f2937" />
          <rect x="25" y="155" width="100" height="18" rx="4" fill="#1f2937" />
          
          {/* Chart area */}
          <rect x="145" y="70" width="240" height="110" rx="8" fill="#111827" />
          <path d="M 155,160 L 190,140 L 220,150 L 260,110 L 300,120 L 340,90 L 375,100" fill="none" stroke="#10b981" strokeWidth="2.5" />
          <path d="M 155,160 L 190,140 L 220,150 L 260,110 L 300,120 L 340,90 L 375,100 L 375,170 L 155,170 Z" fill="url(#chart-grad)" opacity="0.15" />
          <defs>
            <linearGradient id="chart-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Quick Buy panel */}
          <rect x="145" y="190" width="240" height="35" rx="8" fill="#059669" />
          <rect x="220" y="202" width="90" height="10" rx="5" fill="#ffffff" />
        </svg>
      );
    }
    if (id === "scoreplus") {
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Frame */}
          <rect width="400" height="240" rx="16" fill="#090d16" stroke="#1f2937" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="5" fill="#ef4444" />
          <circle cx="34" cy="20" r="5" fill="#f59e0b" />
          <circle cx="48" cy="20" r="5" fill="#10b981" />
          
          {/* Exam layout panel */}
          <rect x="15" y="40" width="240" height="185" rx="8" fill="#111827" />
          {/* Question text placeholder */}
          <rect x="25" y="55" width="220" height="8" rx="4" fill="#374151" />
          <rect x="25" y="70" width="180" height="8" rx="4" fill="#374151" />
          {/* Answer blocks */}
          <rect x="25" y="95" width="220" height="24" rx="6" fill="#1f2937" stroke="#3b82f6" strokeWidth="1" />
          <rect x="40" y="103" width="140" height="8" rx="4" fill="#3b82f6" />
          <rect x="25" y="125" width="220" height="24" rx="6" fill="#1f2937" />
          <rect x="40" y="133" width="150" height="8" rx="4" fill="#4b5563" />
          <rect x="25" y="155" width="220" height="24" rx="6" fill="#1f2937" />
          
          {/* Right sidebar: timer & navigation keys */}
          <rect x="265" y="40" width="120" height="185" rx="8" fill="#111827" />
          <circle cx="325" cy="75" r="22" fill="#1f2937" stroke="#ef4444" strokeWidth="2.5" />
          <rect x="315" y="72" width="20" height="6" rx="3" fill="#ef4444" />
          {/* Grid of keys */}
          <rect x="275" y="115" width="20" height="20" rx="4" fill="#10b981" />
          <rect x="302" y="115" width="20" height="20" rx="4" fill="#10b981" />
          <rect x="329" y="115" width="20" height="20" rx="4" fill="#4b5563" />
          <rect x="356" y="115" width="20" height="20" rx="4" fill="#eab308" />
          
          <rect x="275" y="142" width="20" height="20" rx="4" fill="#4b5563" />
          <rect x="302" y="142" width="20" height="20" rx="4" fill="#4b5563" />
          <rect x="329" y="142" width="20" height="20" rx="4" fill="#10b981" />
          <rect x="356" y="142" width="20" height="20" rx="4" fill="#4b5563" />
        </svg>
      );
    }
    if (id === "speakenenglish") {
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Frame */}
          <rect width="400" height="240" rx="16" fill="#08070d" stroke="#1f2937" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="5" fill="#ef4444" />
          <circle cx="34" cy="20" r="5" fill="#f59e0b" />
          <circle cx="48" cy="20" r="5" fill="#10b981" />
          
          {/* Audio interface */}
          <rect x="15" y="40" width="370" height="185" rx="8" fill="#111827" />
          
          {/* Waveform representation */}
          <rect x="40" y="100" width="6" height="60" rx="3" fill="#a855f7" />
          <rect x="52" y="90" width="6" height="80" rx="3" fill="#a855f7" />
          <rect x="64" y="110" width="6" height="40" rx="3" fill="#3b82f6" />
          <rect x="76" y="80" width="6" height="100" rx="3" fill="#3b82f6" />
          <rect x="88" y="100" width="6" height="60" rx="3" fill="#06b6d4" />
          <rect x="100" y="115" width="6" height="30" rx="3" fill="#06b6d4" />
          
          <rect x="120" y="95" width="6" height="70" rx="3" fill="#a855f7" />
          <rect x="132" y="85" width="6" height="90" rx="3" fill="#a855f7" />
          <rect x="144" y="105" width="6" height="50" rx="3" fill="#3b82f6" />
          <rect x="156" y="75" width="6" height="110" rx="3" fill="#3b82f6" />
          <rect x="168" y="110" width="6" height="40" rx="3" fill="#06b6d4" />
          
          <rect x="190" y="100" width="6" height="60" rx="3" fill="#a855f7" />
          <rect x="202" y="90" width="6" height="80" rx="3" fill="#a855f7" />
          <rect x="214" y="110" width="6" height="40" rx="3" fill="#3b82f6" />
          <rect x="226" y="80" width="6" height="100" rx="3" fill="#3b82f6" />
          
          <rect x="246" y="95" width="6" height="70" rx="3" fill="#a855f7" />
          <rect x="258" y="85" width="6" height="90" rx="3" fill="#a855f7" />
          <rect x="270" y="105" width="6" height="50" rx="3" fill="#3b82f6" />
          <rect x="282" y="75" width="6" height="110" rx="3" fill="#3b82f6" />
          
          <rect x="302" y="100" width="6" height="60" rx="3" fill="#a855f7" />
          <rect x="314" y="115" width="6" height="30" rx="3" fill="#06b6d4" />
          <rect x="326" y="110" width="6" height="40" rx="3" fill="#06b6d4" />
          <rect x="338" y="95" width="6" height="70" rx="3" fill="#06b6d4" />
          
          {/* Progress bubble */}
          <circle cx="200" cy="180" r="16" fill="#10b981" />
          <path d="M 194,180 L 198,184 L 206,176" fill="none" stroke="#ffffff" strokeWidth="2.5" />
        </svg>
      );
    }
    // studybharat
    return (
      <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Frame */}
        <rect width="400" height="240" rx="16" fill="#070b13" stroke="#1f2937" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="5" fill="#ef4444" />
        <circle cx="34" cy="20" r="5" fill="#f59e0b" />
        <circle cx="48" cy="20" r="5" fill="#10b981" />
        
        {/* Core panel */}
        <rect x="15" y="40" width="370" height="185" rx="8" fill="#111827" />
        
        {/* NEET / JEE header */}
        <rect x="25" y="52" width="100" height="18" rx="4" fill="#3b82f6" />
        <rect x="35" y="59" width="80" height="4" rx="2" fill="#ffffff" />
        
        {/* Mathematical Graph Mockup */}
        <line x1="40" y1="180" x2="160" y2="180" stroke="#4b5563" strokeWidth="1.5" />
        <line x1="40" y1="100" x2="40" y2="190" stroke="#4b5563" strokeWidth="1.5" />
        <path d="M 40,180 Q 70,110 100,140 T 160,90" fill="none" stroke="#06b6d4" strokeWidth="2" />
        
        {/* Formula outline box */}
        <rect x="190" y="80" width="175" height="100" rx="6" fill="#1f2937" stroke="#374151" strokeWidth="1" />
        <text x="205" y="115" fontFamily="Courier" fontSize="11" fill="#10b981">f(x) = ∫ e^x² dx</text>
        <rect x="205" y="135" width="130" height="6" rx="3" fill="#4b5563" />
        <rect x="205" y="150" width="110" height="6" rx="3" fill="#4b5563" />
      </svg>
    );
  };

  return (
    <section
      id="projects"
      className="py-24 md:py-32 relative overflow-hidden bg-neutral-950/40"
    >
      {/* Visual background grids */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-grid-pattern" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs tracking-widest text-brand-purple uppercase font-bold"
          >
            04 / Selected Works
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
            Engineering Custom{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">
              Client Solutions
            </span>
          </motion.h3>
          <p
            className={`text-xs md:text-sm mt-4 max-w-xl mx-auto leading-relaxed ${
              darkMode ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            Detailed breakdowns of enterprise products built, optimized, and deployed for global users. Click any card to inspect full technical case studies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedProject(proj)}
              className={`rounded-3xl border overflow-hidden cursor-pointer flex flex-col justify-between group transition-all h-full ${
                darkMode
                  ? "bg-neutral-900/30 border-white/5 hover:border-brand-purple/30 shadow-xl shadow-black/40"
                  : "bg-white border-black/5 hover:border-brand-purple/20 shadow-md shadow-neutral-100"
              }`}
            >
              {/* SVG Mockup Visual Wrapper */}
              <div className="p-4 bg-neutral-950/20 border-b border-white/5 flex items-center justify-center overflow-hidden">
                <div className="w-full scale-100 group-hover:scale-[1.02] transition-transform duration-500 rounded-xl overflow-hidden shadow-lg shadow-black/30">
                  {renderProjectMockup(proj.id)}
                </div>
              </div>

              {/* Text Card details */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category Pill */}
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-cyan uppercase tracking-widest mb-3">
                    <Code size={10} />
                    {proj.duration}
                  </span>

                  <h4
                    className={`font-display font-bold text-lg md:text-xl tracking-tight mb-3 transition-colors ${
                      darkMode ? "text-neutral-100 group-hover:text-brand-purple" : "text-neutral-800 group-hover:text-brand-purple"
                    }`}
                  >
                    {proj.title}
                  </h4>

                  <p
                    className={`text-xs leading-relaxed mb-6 line-clamp-3 ${
                      darkMode ? "text-neutral-400" : "text-neutral-600"
                    }`}
                  >
                    {proj.description}
                  </p>
                </div>

                <div>
                  {/* Technology labels */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-0.5 rounded text-[9px] font-mono border ${
                          darkMode
                            ? "bg-neutral-950/60 border-white/5 text-neutral-400"
                            : "bg-neutral-50 border-black/5 text-neutral-600"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {proj.technologies.length > 4 && (
                      <span className="text-[9px] font-mono text-neutral-500 self-center">
                        +{proj.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Trigger Action link */}
                  <button className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-brand-purple hover:translate-x-1 transition-all">
                    View Complete Case Study
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Case Study Detailed Modal Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Blur backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md"
              />

              {/* Case Study Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className={`relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl border p-6 md:p-10 z-10 shadow-2xl ${
                  darkMode ? "bg-neutral-950 border-white/10 text-white" : "bg-white border-black/10 text-neutral-900"
                }`}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className={`absolute top-6 right-6 p-2.5 rounded-full border transition-all hover:rotate-90 ${
                    darkMode
                      ? "bg-neutral-900 border-white/5 text-neutral-400 hover:text-white"
                      : "bg-neutral-50 border-black/5 text-neutral-600 hover:text-neutral-950"
                  }`}
                >
                  <X size={15} />
                </button>

                {/* Modal Title Block */}
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-cyan uppercase tracking-widest mb-2">
                  <Sparkles size={11} />
                  PROJECT CASE STUDY
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight mb-2">
                  {selectedProject.title}
                </h3>
                <p className="text-xs font-mono text-neutral-500 mb-6">Duration: {selectedProject.duration}</p>

                {/* Case Study Content Sections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-white/5 dark:border-black/5">
                  {/* Column Left: Visual & Details */}
                  <div className="md:col-span-5 space-y-6">
                    <div className="rounded-2xl border border-white/5 overflow-hidden shadow-md bg-neutral-950/20">
                      {renderProjectMockup(selectedProject.id)}
                    </div>

                    {/* Technologies Pills */}
                    <div className="space-y-3">
                      <h5 className="font-display font-bold text-xs uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                        <Code size={11} /> Tech Stack Leveraged
                      </h5>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`px-2.5 py-1 rounded-md text-[10px] font-mono border ${
                              darkMode
                                ? "bg-neutral-900/40 border-white/5 text-neutral-300"
                                : "bg-neutral-50 border-black/5 text-neutral-700"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Column Right: Case narrative */}
                  <div className="md:col-span-7 space-y-6">
                    {/* Problem Solved */}
                    <div className="space-y-2">
                      <h5 className="font-display font-bold text-xs uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                        • Problem Solved
                      </h5>
                      <p className={`text-xs md:text-sm leading-relaxed ${darkMode ? "text-neutral-300" : "text-neutral-600"}`}>
                        {selectedProject.problemSolved}
                      </p>
                    </div>

                    {/* Architecture description */}
                    <div className="space-y-2">
                      <h5 className="font-display font-bold text-xs uppercase tracking-wider text-brand-cyan flex items-center gap-1.5">
                        <Layers size={11} /> Technical Architecture
                      </h5>
                      <p className={`text-xs md:text-sm leading-relaxed ${darkMode ? "text-neutral-300" : "text-neutral-600"}`}>
                        {selectedProject.architecture}
                      </p>
                    </div>

                    {/* Core Features */}
                    <div className="space-y-2">
                      <h5 className="font-display font-bold text-xs uppercase tracking-wider text-brand-purple flex items-center gap-1.5">
                        <CheckSquare size={11} /> Key Features Developed
                      </h5>
                      <ul className="space-y-1.5 pl-4 list-disc">
                        {selectedProject.keyFeatures.map((feat, idx) => (
                          <li
                            key={idx}
                            className={`text-xs leading-relaxed ${darkMode ? "text-neutral-300" : "text-neutral-600"}`}
                          >
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Performance Optimizations */}
                    <div className="space-y-2">
                      <h5 className="font-display font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Zap size={11} /> Performance Optimizations Applied
                      </h5>
                      <ul className="space-y-1.5 pl-4 list-disc">
                        {selectedProject.performanceOptimizations.map((opt, idx) => (
                          <li
                            key={idx}
                            className={`text-xs leading-relaxed ${darkMode ? "text-neutral-300" : "text-neutral-600"}`}
                          >
                            {opt}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Business Impact block */}
                    <div className={`p-5 rounded-2xl border ${
                      darkMode ? "bg-brand-purple/5 border-brand-purple/20" : "bg-neutral-50 border-neutral-200"
                    }`}>
                      <h5 className="font-display font-bold text-xs uppercase tracking-wider text-brand-purple flex items-center gap-1.5 mb-2">
                        <TrendingUp size={11} /> Measurable Business Impact
                      </h5>
                      <p className={`text-xs md:text-sm font-semibold leading-relaxed ${darkMode ? "text-neutral-200" : "text-neutral-800"}`}>
                        {selectedProject.businessImpact}
                      </p>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex items-center gap-3 pt-4">
                      <a
                        href={personalInfo.github}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold border transition-all ${
                          darkMode
                            ? "bg-neutral-900 border-white/5 hover:bg-neutral-800/80 text-white"
                            : "bg-white border-black/5 hover:bg-neutral-50 text-neutral-800"
                        }`}
                      >
                        <Github size={13} />
                        Inspect Source Code
                      </a>
                      <button
                        onClick={() => {
                          setSelectedProject(null);
                          const element = document.getElementById("contact");
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg shadow-brand-purple/10"
                      >
                        Request Live Walkthrough
                        <ArrowUpRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
