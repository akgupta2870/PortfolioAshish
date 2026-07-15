import { motion } from "motion/react";
import { BrainCircuit, Sparkles, MessageSquareCode, Workflow, ChevronRight, Terminal, Network, SearchCode } from "lucide-react";

interface AIShowcaseProps {
  darkMode: boolean;
}

export default function AIShowcase({ darkMode }: AIShowcaseProps) {
  const aiSkills = [
    {
      id: "chatbot",
      title: "AI Chatbot Engineering",
      desc: "Architected a custom tenant chatbot using Hugging Face models and Python. Integrated conversational flows that automatically trigger client-side React actions based on parsed intent.",
      icon: MessageSquareCode,
      tag: "PILOT DEPLOYED"
    },
    {
      id: "rag",
      title: "RAG & Knowledge Feeding",
      desc: "Experienced with Retrieval-Augmented Generation. Designing pipelines that query private documents, chunk contents, and feed semantic relevance to language models for accurate responses.",
      icon: SearchCode,
      tag: "ARCHITECTURE"
    },
    {
      id: "prompting",
      title: "Prompt Engineering & Structured Outputs",
      desc: "Mastery in writing system prompts that enforce strict JSON Schema formatting. Ensuring robust type safety when feeding LLM payloads directly back into database models.",
      icon: Terminal,
      tag: "PROMPT DEV"
    },
    {
      id: "automation",
      title: "Workflow Automation",
      desc: "Pioneering the hook-up of AI pipelines to core business systems. Automatically routes tenant service requests to local contractors based on parsed emergency levels.",
      icon: Workflow,
      tag: "AUTOMATION"
    }
  ];

  return (
    <section
      id="ai"
      className="py-24 md:py-32 relative overflow-hidden bg-neutral-950/40"
    >
      {/* Visual background grids */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-dot-pattern" />

      {/* Decorative Blur Blob */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
        <div
          className={`absolute top-[30%] left-[-10%] w-96 h-96 rounded-full bg-brand-purple/10 blur-[130px] animate-pulse-slow`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Column 1: AI Technical Value Proposition */}
          <div className="lg:col-span-5 space-y-6">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs tracking-widest text-brand-purple uppercase font-bold"
            >
              05 / Cognitive Integrations
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.1] ${
                darkMode ? "text-white" : "text-neutral-900"
              }`}
            >
              Building AI-Ready <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-pink-500 to-brand-blue">
                Core Systems
              </span>
            </motion.h3>
            <p
              className={`text-sm md:text-base leading-relaxed ${
                darkMode ? "text-neutral-400" : "text-neutral-600"
              }`}
            >
              The future of enterprise software isn't static; it's agentic. I focus on bridging the gap between cutting-edge LLMs and robust, transactional web dashboards.
            </p>
            <p
              className={`text-[11px] md:text-xs leading-relaxed ${
                darkMode ? "text-neutral-500" : "text-neutral-500"
              }`}
            >
              By leveraging Python orchestration engines and Hugging Face model families, I build custom chatbots that process natural tenant speech, resolve 70% of standard questions, and automate routing tasks.
            </p>

            {/* AI Vector Neural Node Map (Interactive rotating decorative SVG) */}
            <div className="relative w-full aspect-video rounded-2xl border border-white/5 dark:border-black/5 bg-neutral-950/20 overflow-hidden flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              
              <svg className="w-56 h-56 animate-rotate-slow opacity-60" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Concentric rings */}
                <circle cx="100" cy="100" r="80" stroke="rgba(168, 85, 247, 0.15)" strokeWidth="1" strokeDasharray="5 5" />
                <circle cx="100" cy="100" r="50" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="1" />
                <circle cx="100" cy="100" r="20" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1.5" />
                
                {/* Node connection lines */}
                <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                <line x1="43.4" y1="43.4" x2="156.6" y2="156.6" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                <line x1="43.4" y1="156.6" x2="156.6" y2="43.4" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                
                {/* Active node points */}
                <circle cx="100" cy="20" r="4" fill="#a855f7" className="animate-pulse" />
                <circle cx="100" cy="180" r="4" fill="#3b82f6" />
                <circle cx="20" cy="100" r="4" fill="#06b6d4" />
                <circle cx="180" cy="100" r="4" fill="#10b981" />
                <circle cx="100" cy="100" r="6" fill="#a855f7" />
              </svg>
              
              <div className="absolute flex flex-col items-center gap-1.5 pointer-events-none select-none text-center">
                <Network size={18} className="text-brand-purple animate-bounce" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                  NEURAL NETWORK NODE MAP
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Core Bento grid cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {aiSkills.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`p-6 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    darkMode
                      ? "bg-neutral-900/30 border-white/5 hover:border-brand-purple/20 shadow-xl shadow-black/20"
                      : "bg-white border-black/5 hover:border-brand-purple/10 shadow-sm shadow-neutral-100"
                  }`}
                >
                  <div>
                    {/* Header line */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-xl bg-brand-purple/5 dark:bg-brand-purple/10 flex items-center justify-center border border-brand-purple/10">
                        <Icon size={16} className="text-brand-purple" />
                      </div>
                      <span className="font-mono text-[8px] font-bold px-2 py-0.5 rounded-full border border-brand-purple/20 text-brand-purple bg-brand-purple/5 uppercase tracking-wide">
                        {skill.tag}
                      </span>
                    </div>

                    <h4
                      className={`font-display font-bold text-sm tracking-wide mb-2 ${
                        darkMode ? "text-neutral-200" : "text-neutral-800"
                      }`}
                    >
                      {skill.title}
                    </h4>
                    <p
                      className={`text-[11px] leading-relaxed ${
                        darkMode ? "text-neutral-400" : "text-neutral-600"
                      }`}
                    >
                      {skill.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Future Study / Next Chapter Card */}
        <div className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-6 md:p-8 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 ${
              darkMode
                ? "bg-neutral-900/10 border-white/5"
                : "bg-neutral-50 border-black/5 shadow-sm"
            }`}
          >
            <div className="flex items-center gap-4 text-left">
              <span className="text-2xl">🚀</span>
              <div>
                <h5
                  className={`font-display font-bold text-sm tracking-wide ${
                    darkMode ? "text-neutral-200" : "text-neutral-800"
                  }`}
                >
                  Future Domain: Agentic Architectures & Gemini Live API
                </h5>
                <p
                  className={`text-[11px] leading-relaxed max-w-2xl mt-1 ${
                    darkMode ? "text-neutral-400" : "text-neutral-600"
                  }`}
                >
                  Actively researching system architectures that leverage multi-agent frameworks (LangChain / Autogen) and streaming real-time audio channels (Gemini Live API) to design the next wave of voice-powered customer helpdesks.
                </p>
              </div>
            </div>

            <span className="text-[10px] font-mono tracking-widest text-neutral-500 font-bold shrink-0 uppercase flex items-center">
              Learning Mode Active
              <ChevronRight size={12} className="text-neutral-500" />
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
