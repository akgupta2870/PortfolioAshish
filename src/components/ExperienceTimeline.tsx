import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, Calendar, CheckSquare, Sparkles, Plus, Minus, FileCheck, CircleDot } from "lucide-react";
import { experiences } from "../data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceTimelineProps {
  darkMode: boolean;
}

export default function ExperienceTimeline({ darkMode }: ExperienceTimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>("aeologic");
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Target the vertical timeline line (reveal down as we scroll)
    const line = containerRef.current.querySelector(".timeline-glow-line");
    if (line) {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          scrollTrigger: {
            trigger: containerRef.current.querySelector(".timeline-structure"),
            start: "top 75%",
            end: "bottom 70%",
            scrub: 1,
          },
        }
      );
    }

    // Target each timeline item
    const items = containerRef.current.querySelectorAll(".timeline-item");
    items.forEach((item) => {
      const node = item.querySelector(".timeline-node");
      const card = item.querySelector(".timeline-card");

      if (node) {
        gsap.fromTo(
          node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: "back.out(1.5)",
            duration: 0.6,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (card) {
        gsap.fromTo(
          card,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background light paths */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div
          className={`absolute top-[20%] left-[5%] w-80 h-80 rounded-full bg-brand-purple/5 blur-[100px]`}
        />
        <div
          className={`absolute bottom-[20%] right-[5%] w-80 h-80 rounded-full bg-brand-blue/5 blur-[100px]`}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs tracking-widest text-brand-purple uppercase font-bold"
          >
            03 / Professional Milestones
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
            A Chronology of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-pink-500">
              Enterprise Impact
            </span>
          </motion.h3>
          <p
            className={`text-xs md:text-sm mt-4 max-w-xl mx-auto leading-relaxed ${
              darkMode ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            7 years of launching high-availability platforms, mentoring developer squads, and implementing modern frontend state engines.
          </p>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="timeline-structure relative pl-6 md:pl-10 border-l-2 border-brand-purple/20 space-y-12">
          {/* Timeline glow overlay line */}
          <div className="timeline-glow-line absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-brand-purple via-brand-blue to-transparent" />

          {experiences.map((exp, idx) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div
                key={exp.id}
                className="timeline-item relative"
              >
                {/* Connector Node */}
                <span className="timeline-node absolute -left-[31px] md:-left-[47px] top-1 flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full border bg-neutral-950 shadow-lg border-brand-purple text-brand-purple z-10">
                  {idx === 0 ? (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2.5 h-2.5 rounded-full bg-brand-purple"
                    />
                  ) : (
                    <CircleDot size={10} className="text-brand-purple/80" />
                  )}
                </span>

                {/* Main Card Content */}
                <div
                  className={`timeline-card p-6 md:p-8 rounded-2xl border transition-all ${
                    isExpanded
                      ? darkMode
                        ? "bg-neutral-900/40 border-brand-purple/30 shadow-xl shadow-brand-purple/5"
                        : "bg-white border-brand-purple/20 shadow-lg shadow-neutral-100"
                      : darkMode
                      ? "bg-neutral-900/15 border-white/5 hover:border-white/10 hover:bg-neutral-900/25 shadow-sm"
                      : "bg-white border-black/5 hover:border-black/10 hover:bg-neutral-50 shadow-sm"
                  }`}
                >
                  {/* Card Header */}
                  <div
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                    onClick={() => toggleExpand(exp.id)}
                  >
                    <div>
                      {/* Company Name */}
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-purple tracking-widest uppercase mb-1">
                        <Briefcase size={11} />
                        {exp.company}
                      </span>

                      {/* Role */}
                      <h4
                        className={`font-display font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight ${
                          darkMode ? "text-neutral-100" : "text-neutral-800"
                        }`}
                      >
                        {exp.role}
                      </h4>

                      {/* Duration */}
                      <div className="flex items-center gap-2 mt-2 font-mono text-[11px] text-neutral-500 font-medium">
                        <Calendar size={11} />
                        {exp.duration}
                      </div>
                    </div>

                    {/* Expand Trigger Indicator */}
                    <button
                      className={`p-2 rounded-xl border self-start sm:self-center transition-all ${
                        darkMode
                          ? "bg-neutral-900 border-white/5 text-neutral-400 hover:text-white"
                          : "bg-neutral-50 border-black/5 text-neutral-600 hover:text-neutral-900"
                      }`}
                    >
                      {isExpanded ? <Minus size={13} /> : <Plus size={13} />}
                    </button>
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-medium border ${
                          darkMode
                            ? "bg-neutral-950/80 border-white/5 text-neutral-400"
                            : "bg-neutral-50 border-black/5 text-neutral-600"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Expanded Body */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 border-t border-white/5 dark:border-black/5 mt-6 space-y-6">
                          {/* Business Impacts (Metric highlights) */}
                          {exp.impacts.length > 0 && (
                            <div className="space-y-3">
                              <h5 className="font-display font-bold text-xs tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-blue flex items-center gap-1.5">
                                <Sparkles size={11} className="text-brand-purple" />
                                Key Business Metric Deliveries
                              </h5>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {exp.impacts.map((impact, idx) => (
                                  <div
                                    key={idx}
                                    className={`p-4 rounded-xl border text-[11px] font-medium leading-relaxed ${
                                      darkMode
                                        ? "bg-neutral-950/40 border-white/5 text-neutral-300"
                                        : "bg-neutral-50 border-black/5 text-neutral-700 shadow-inner"
                                    }`}
                                  >
                                    {impact}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Responsibilities list */}
                          <div className="space-y-3">
                            <h5 className="font-display font-bold text-xs tracking-wider uppercase text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                              <FileCheck size={11} />
                              Scope & Responsibility Area
                            </h5>
                            <ul className="space-y-2.5">
                              {exp.responsibilities.map((resp, idx) => (
                                <li
                                  key={idx}
                                  className={`flex items-start text-[11px] md:text-xs leading-relaxed ${
                                    darkMode ? "text-neutral-400" : "text-neutral-600"
                                  }`}
                                >
                                  <span className="text-brand-purple shrink-0 mr-2.5 mt-1">
                                    •
                                  </span>
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
