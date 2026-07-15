import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { FileText, ArrowUpRight, Github, Linkedin, Briefcase, ChevronDown, Sparkles } from "lucide-react";
import { personalInfo } from "../data";

interface HeroProps {
  darkMode: boolean;
}

export default function Hero({ darkMode }: HeroProps) {
  const [typedText, setTypedText] = useState("");
  const [techIndex, setTechIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const technologies = [
    "Senior React Architect",
    "Next.js Specialist",
    "MERN Stack Pioneer",
    "AI Integration Specialist",
    "Web Performance Engineer",
  ];

  const typingSpeed = isDeleting ? 40 : 100;
  const holdPeriod = 2000;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = technologies[techIndex];

    if (!isDeleting) {
      if (typedText !== currentFullText) {
        timer = setTimeout(() => {
          setTypedText(currentFullText.slice(0, typedText.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, holdPeriod);
      }
    } else {
      if (typedText !== "") {
        timer = setTimeout(() => {
          setTypedText(currentFullText.slice(0, typedText.length - 1));
        }, typingSpeed);
      } else {
        setIsDeleting(false);
        setTechIndex((prev) => (prev + 1) % technologies.length);
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, techIndex]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handlePrintResume = () => {
    window.print();
  };

  // Tech items floating positions
  const floatingIcons = [
    { name: "React", icon: "⚛️", top: "15%", left: "10%", delay: 0 },
    { name: "Next.js", icon: "▲", top: "25%", right: "12%", delay: 1.5 },
    { name: "Node", icon: "🟢", top: "65%", left: "8%", delay: 0.8 },
    { name: "JS", icon: "🟨", top: "50%", right: "15%", delay: 2.2 },
    { name: "MongoDB", icon: "🍃", top: "75%", right: "20%", delay: 1.2 },
    { name: "AI", icon: "🤖", top: "45%", left: "22%", delay: 1.8 },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Glow Backdrops */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className={`absolute top-[10%] left-[15%] w-72 md:w-96 h-72 md:h-96 rounded-full bg-brand-purple/10 dark:bg-brand-purple/15 blur-[80px] md:blur-[120px] animate-pulse-slow`}
        />
        <div
          className={`absolute bottom-[20%] right-[10%] w-72 md:w-96 h-72 md:h-96 rounded-full bg-brand-blue/10 dark:bg-brand-blue/15 blur-[80px] md:blur-[120px] animate-pulse-slow`}
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Interactive Floating Abstract Vectors */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M -100,200 Q 300,50 600,300 T 1500,100"
            fill="none"
            stroke="url(#grid-grad)"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.path
            d="M -50,500 Q 500,200 900,600 T 1600,400"
            fill="none"
            stroke="url(#grid-grad)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 1 }}
          />
        </svg>
      </div>

      {/* Floating Icons */}
      <div className="hidden md:block absolute inset-0 z-10 pointer-events-none select-none">
        {floatingIcons.map((item, idx) => (
          <motion.div
            key={idx}
            className={`absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border glass-panel backdrop-blur-md shadow-xl ${
              darkMode ? "border-white/5 text-white/80" : "border-black/5 text-neutral-800"
            }`}
            style={{ top: item.top, left: item.left, right: item.right }}
            animate={{
              y: [0, -18, 0],
              rotate: [0, idx % 2 === 0 ? 5 : -5, 0],
            }}
            transition={{
              duration: 5 + idx,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
          >
            <span className="text-sm">{item.icon}</span>
            <span>{item.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center relative z-20 flex flex-col items-center">
        {/* Available for Hire Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-8 text-xs font-medium tracking-wide ${
            darkMode
              ? "bg-neutral-900/80 border-white/5 text-neutral-300"
              : "bg-neutral-100/80 border-black/5 text-neutral-700"
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Available for senior & leadership roles
          <Sparkles size={11} className="text-brand-purple ml-0.5 animate-pulse" />
        </motion.div>

        {/* Headline greeting with highlight animation */}
        <div className="flex flex-col items-center mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-5xl font-display font-extrabold tracking-tight flex items-center justify-center gap-2 flex-wrap"
          >
            <span className={darkMode ? "text-zinc-400" : "text-neutral-500"}>Hi, I am </span>
            <span className="relative inline-block px-3 py-1">
              {/* Highlight background brush animation */}
              <motion.span
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/15 to-emerald-500/10 rounded-xl -z-10 border border-brand-purple/20 shadow-lg shadow-brand-purple/5"
              />
              {/* Animated glowing border */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.8, 1] }}
                transition={{ delay: 1.2, duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className="absolute inset-0 rounded-xl border border-indigo-500/30 blur-[2px] pointer-events-none"
              />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 font-black tracking-tight drop-shadow-sm">
                Ashish Kumar
              </span>
            </span>
          </motion.div>
        </div>

        {/* Primary display typography title */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-display font-extrabold text-4xl sm:text-5xl md:text-7xl tracking-tight leading-[1.1] mb-6 max-w-4xl"
        >
          <span className={darkMode ? "text-white" : "text-neutral-900"}>
            Transforming Concepts Into{" "}
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-purple to-brand-cyan">
            Enterprise Platforms
          </span>
        </motion.h2>

        {/* Specialty Dynamic Subhead */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="h-8 md:h-10 flex items-center justify-center font-display text-lg md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple mb-8"
        >
          <span className="typing-cursor select-none">{typedText}</span>
        </motion.div>

        {/* Narrative Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className={`text-sm md:text-base max-w-2xl leading-relaxed mb-10 ${
            darkMode ? "text-neutral-400" : "text-neutral-600"
          }`}
        >
          A Senior React & Full-Stack Architect with **{personalInfo.experienceYears} of proven expertise** creating
          ultra-performant, secure FinTech, EdTech, and AI applications. Backed by solid cloud deployment pipelines on AWS and microservices architectures.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold tracking-wide bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-xl shadow-brand-purple/15 hover:shadow-brand-purple/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            Explore Projects
            <ArrowUpRight size={16} />
          </button>

          <button
            onClick={handlePrintResume}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold tracking-wide border transition-all cursor-pointer ${
              darkMode
                ? "bg-neutral-900 border-white/5 text-neutral-200 hover:bg-neutral-800/80 hover:border-white/10"
                : "bg-white border-black/5 text-neutral-800 hover:bg-neutral-50 hover:border-black/10 shadow-sm"
            }`}
          >
            <FileText size={16} />
            Generate PDF CV
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold tracking-wide border transition-all cursor-pointer ${
              darkMode
                ? "bg-transparent border-brand-purple/30 text-brand-purple hover:bg-brand-purple/5"
                : "bg-transparent border-brand-purple/40 text-brand-purple hover:bg-brand-purple/5"
            }`}
          >
            <Briefcase size={16} />
            Hire Me
          </button>
        </motion.div>

        {/* Social connections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-4 mt-12"
        >
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className={`p-2.5 rounded-full border transition-all ${
              darkMode
                ? "bg-neutral-900 border-white/5 text-neutral-400 hover:text-white hover:border-white/10"
                : "bg-neutral-50 border-black/5 text-neutral-600 hover:text-neutral-900 hover:border-black/10"
            }`}
            title="LinkedIn Profile"
          >
            <Linkedin size={15} />
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className={`p-2.5 rounded-full border transition-all ${
              darkMode
                ? "bg-neutral-900 border-white/5 text-neutral-400 hover:text-white hover:border-white/10"
                : "bg-neutral-50 border-black/5 text-neutral-600 hover:text-neutral-900 hover:border-black/10"
            }`}
            title="GitHub Profile"
          >
            <Github size={15} />
          </a>
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest sm:block hidden">
            {personalInfo.location}
          </span>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 1, duration: 1.8, repeat: Infinity }}
          className="absolute bottom-6 flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => scrollToSection("about")}
        >
          <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500">
            Scroll to Story
          </span>
          <ChevronDown size={14} className="text-neutral-500" />
        </motion.div>
      </div>
    </section>
  );
}
