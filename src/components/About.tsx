import { motion } from "motion/react";
import { CheckCircle2, Shield, Flame, Activity, Brain, CodeXml, Laptop } from "lucide-react";
import { achievements } from "../data";

interface AboutProps {
  darkMode: boolean;
}

export default function About({ darkMode }: AboutProps) {
  const specialties = [
    {
      title: "Frontend UI Architecture",
      desc: "Pixel-perfect React & Next.js systems matching exact high-fidelity Figma specifications. Expert in converting legacy structures into modern hook architectures.",
      icon: Laptop,
    },
    {
      title: "Full Stack Integration",
      desc: "Robust backend creation using Node.js and Express.js paired with MongoDB schema optimizations, secure RESTful APIs, and role-based access controls (RBAC).",
      icon: CodeXml,
    },
    {
      title: "AI & LLM Orchestration",
      desc: "Integrating natural language processing engines, Hugging Face models, and Python services directly into core tenant dashboards to automate workflows.",
      icon: Brain,
    },
    {
      title: "Performance Engineering",
      desc: "Maximizing core web vitals and database query efficiency. Skilled in CDN setups (CloudFront) and aggressive memoization strategies to hit sub-1s load times.",
      icon: Activity,
    },
  ];

  return (
    <section
      id="about"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div
          className={`absolute top-1/2 left-[-10%] w-80 h-80 rounded-full bg-brand-cyan/10 blur-[100px]`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center md:text-left mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs tracking-widest text-brand-purple uppercase font-bold"
          >
            01 / Professional Summary
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`font-display font-bold text-3xl sm:text-4xl md:text-5xl mt-3 tracking-tight ${
              darkMode ? "text-white" : "text-neutral-900"
            }`}
          >
            Engineering Fluid, Secure, & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-cyan">
              High-Traffic Digital Products
            </span>
          </motion.h3>
        </div>

        {/* Narrative & Metrics Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Column 1: Narrative Intro */}
          <div className="lg:col-span-7 space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`text-sm md:text-base leading-relaxed ${
                darkMode ? "text-neutral-300" : "text-neutral-700"
              }`}
            >
              I am a seasoned **Senior Full Stack Developer** with a focus on Frontend UI Architecture and cloud delivery pipelines. Over my **7+ year career**, I have engineered comprehensive digital architectures in highly demanding environments including **FinTech, EdTech, and SaaS management**.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-sm md:text-base leading-relaxed ${
                darkMode ? "text-neutral-400" : "text-neutral-600"
              }`}
            >
              My expertise centers around the **MERN stack**, specifically mastering standard modern React, Next.js, and strict TypeScript. I am dedicated to writing clean, maintainable, and modular component structures. I don't just build UI; I connect them to high-throughput Node.js microservices, configure secure payment layers (Stripe, Razorpay), automate KYC (Digio), and scale databases on AWS.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              {[
                "Enterprise Application Development",
                "Strict TypeScript Safety",
                "Advanced Redux & React Query State",
                "AWS Deployment & CI/CD",
                "Rigorous Jest Unit Testing",
                "AI-Powered Chatbot & LLM Integrations",
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="flex items-center gap-2.5"
                >
                  <CheckCircle2 size={16} className="text-brand-purple shrink-0" />
                  <span
                    className={`text-xs font-medium tracking-wide ${
                      darkMode ? "text-neutral-300" : "text-neutral-700"
                    }`}
                  >
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 2: Glowing Metrics Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {achievements.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`p-6 rounded-2xl border text-left flex flex-col justify-between transition-all relative overflow-hidden ${
                  darkMode
                    ? "bg-neutral-900/40 border-white/5 hover:border-brand-purple/30 hover:bg-neutral-900/60 shadow-xl shadow-black/40"
                    : "bg-white border-black/5 hover:border-brand-purple/20 hover:bg-neutral-50 shadow-md shadow-neutral-100"
                }`}
              >
                {/* Visual Glow Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-purple to-brand-blue opacity-50" />

                <div>
                  <h4 className="font-display font-extrabold text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-blue tracking-tight">
                    {item.metric}
                  </h4>
                  <p
                    className={`text-xs font-semibold tracking-wide uppercase mt-1 ${
                      darkMode ? "text-neutral-200" : "text-neutral-800"
                    }`}
                  >
                    {item.label}
                  </p>
                </div>
                <p
                  className={`text-[11px] leading-relaxed mt-4 ${
                    darkMode ? "text-neutral-400" : "text-neutral-600"
                  }`}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section: Core Pillars / Specialties */}
        <div className="mt-24">
          <motion.h4
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`font-display font-bold text-xl sm:text-2xl mb-10 text-center ${
              darkMode ? "text-neutral-200" : "text-neutral-800"
            }`}
          >
            My Operational Pillars
          </motion.h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className={`p-6 rounded-2xl border transition-all ${
                    darkMode
                      ? "bg-neutral-900/20 border-white/5 hover:bg-neutral-900/40 hover:border-brand-cyan/20 shadow-lg shadow-black/20"
                      : "bg-white border-black/5 hover:bg-neutral-50 hover:border-brand-cyan/20 shadow-sm"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-cyan/5 dark:bg-brand-cyan/10 flex items-center justify-center mb-5 border border-brand-cyan/10">
                    <IconComponent size={18} className="text-brand-cyan" />
                  </div>
                  <h5
                    className={`font-display font-bold text-sm tracking-wide mb-3 ${
                      darkMode ? "text-neutral-200" : "text-neutral-800"
                    }`}
                  >
                    {item.title}
                  </h5>
                  <p
                    className={`text-[11px] md:text-xs leading-relaxed ${
                      darkMode ? "text-neutral-400" : "text-neutral-600"
                    }`}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
