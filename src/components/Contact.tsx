import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle2, Copy, Linkedin, Github, Phone, FileDown, Mail, ArrowUpRight, Check } from "lucide-react";
import { personalInfo } from "../data";

interface ContactProps {
  darkMode: boolean;
}

export default function Contact({ darkMode }: ContactProps) {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSending(true);
    // Simulate high-end network submission
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setIsSent(false), 5000);
    }, 2000);
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 relative overflow-hidden bg-neutral-950/20 dark:bg-neutral-950/30"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-grid-pattern" />

      {/* Glow overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div
          className={`absolute bottom-[-10%] left-[20%] w-96 h-96 rounded-full bg-brand-purple/10 blur-[130px] animate-pulse-slow`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs tracking-widest text-brand-purple uppercase font-bold"
          >
            07 / Connect Portal
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
            Let's Build Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-pink-500 to-brand-blue">
              Amazing Together
            </span>
          </motion.h3>
        </div>

        {/* Contact Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Column 1: Info & Connections */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-brand-purple/10 text-brand-purple border border-brand-purple/10">
                <Mail size={10} strokeWidth={2.5} />
                DIRECT CONNECTION
              </span>
              <h4
                className={`font-display font-extrabold text-xl md:text-2xl tracking-tight leading-snug ${
                  darkMode ? "text-neutral-100" : "text-neutral-800"
                }`}
              >
                Have a senior vacancy or custom project in mind? Let's connect.
              </h4>
              <p
                className={`text-xs md:text-sm leading-relaxed ${
                  darkMode ? "text-neutral-400" : "text-neutral-600"
                }`}
              >
                I am actively taking inquiries for Senior Full Stack and React Tech Lead roles. Reach out directly or complete the fast routing form, and I will reply within 12 hours.
              </p>
            </div>

            {/* Quick connection pills */}
            <div className="space-y-3 pt-4">
              {/* Email Copier Card */}
              <div
                onClick={handleCopyEmail}
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer group transition-all ${
                  darkMode
                    ? "bg-neutral-900/30 border-white/5 hover:border-brand-purple/20 hover:bg-neutral-900/50 shadow-md"
                    : "bg-white border-black/5 hover:border-brand-purple/15 hover:bg-neutral-50 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-purple/5 flex items-center justify-center shrink-0">
                    <Mail size={15} className="text-brand-purple" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest leading-none">
                      EMAIL ADDRESS
                    </p>
                    <p
                      className={`text-xs font-semibold mt-1.5 transition-colors leading-none ${
                        darkMode ? "text-neutral-200 group-hover:text-brand-purple" : "text-neutral-800 group-hover:text-brand-purple"
                      }`}
                    >
                      {personalInfo.email}
                    </p>
                  </div>
                </div>
                <button
                  className={`p-2 rounded-lg border transition-all ${
                    copiedEmail
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                      : darkMode
                      ? "bg-neutral-950/60 border-white/5 text-neutral-400 group-hover:text-white"
                      : "bg-neutral-50 border-black/5 text-neutral-600 group-hover:text-neutral-950"
                  }`}
                  aria-label="Copy Email"
                >
                  {copiedEmail ? <Check size={13} /> : <Copy size={13} />}
                </button>
              </div>

              {/* LinkedIn Pill */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-between p-4 rounded-2xl border group transition-all ${
                  darkMode
                    ? "bg-neutral-900/30 border-white/5 hover:border-brand-blue/20 hover:bg-neutral-900/50 shadow-md"
                    : "bg-white border-black/5 hover:border-brand-blue/15 hover:bg-neutral-50 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-blue/5 flex items-center justify-center shrink-0">
                    <Linkedin size={15} className="text-brand-blue" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest leading-none">
                      LINKEDIN NETWORK
                    </p>
                    <p
                      className={`text-xs font-semibold mt-1.5 transition-colors leading-none ${
                        darkMode ? "text-neutral-200 group-hover:text-brand-blue" : "text-neutral-800 group-hover:text-brand-blue"
                      }`}
                    >
                      ashish-kumar-84b16b136
                    </p>
                  </div>
                </div>
                <div
                  className={`p-2 rounded-lg border transition-all ${
                    darkMode ? "bg-neutral-950/60 border-white/5 text-neutral-400" : "bg-neutral-50 border-black/5 text-neutral-600"
                  }`}
                >
                  <ArrowUpRight size={13} />
                </div>
              </a>

              {/* Phone Pill */}
              <div
                className={`flex items-center justify-between p-4 rounded-2xl border group transition-all ${
                  darkMode
                    ? "bg-neutral-900/30 border-white/5 hover:border-white/10 hover:bg-neutral-900/50 shadow-md"
                    : "bg-white border-black/5 hover:border-black/10 hover:bg-neutral-50 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-cyan/5 flex items-center justify-center shrink-0">
                    <Phone size={15} className="text-brand-cyan" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest leading-none">
                      TELEPHONE CELL
                    </p>
                    <p
                      className={`text-xs font-semibold mt-1.5 leading-none ${
                        darkMode ? "text-neutral-200" : "text-neutral-800"
                      }`}
                    >
                      {personalInfo.phone}
                    </p>
                  </div>
                </div>
                <div
                  className={`p-2 rounded-lg border transition-all ${
                    darkMode ? "bg-neutral-950/60 border-white/5 text-neutral-400" : "bg-neutral-50 border-black/5 text-neutral-600"
                  }`}
                >
                  <span className="text-[9px] font-mono font-bold text-neutral-500 leading-none">IND</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Interactive email Mock Form */}
          <div className="lg:col-span-7">
            <div
              className={`p-6 md:p-8 rounded-3xl border text-left relative overflow-hidden ${
                darkMode
                  ? "bg-neutral-900/30 border-white/5 shadow-xl shadow-black/40"
                  : "bg-white border-black/5 shadow-md shadow-neutral-100"
              }`}
            >
              {/* Form header */}
              <div className="flex items-center justify-between border-b border-white/5 dark:border-black/5 pb-4 mb-6">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest font-semibold">
                  SECURE MESSAGE COMPOSE
                </span>
              </div>

              {/* Send feedback messages */}
              <AnimatePresence mode="wait">
                {isSent ? (
                  <motion.div
                    key="sent-feedback"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5, repeat: 1 }}
                    >
                      <CheckCircle2 size={44} className="text-emerald-500" />
                    </motion.div>
                    <h5 className="font-display font-bold text-lg text-emerald-500">
                      Message Sent Successfully!
                    </h5>
                    <p
                      className={`text-xs max-w-sm leading-relaxed ${
                        darkMode ? "text-neutral-400" : "text-neutral-600"
                      }`}
                    >
                      Thank you for reaching out. Your transmission has been processed, and I will connect with you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form key="contact-form" onSubmit={handleSubmit} className="space-y-5">
                    {/* Input name */}
                    <div className="space-y-2">
                      <label
                        htmlFor="form-name"
                        className="font-mono text-[10px] font-bold text-neutral-500 uppercase tracking-widest block"
                      >
                        Your Name
                      </label>
                      <input
                        id="form-name"
                        type="text"
                        required
                        placeholder="Ashish"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        disabled={isSending}
                        className={`w-full px-4 py-3.5 rounded-xl text-xs font-semibold tracking-wide border outline-none transition-all ${
                          darkMode
                            ? "bg-neutral-950/80 border-white/5 text-white placeholder-neutral-600 focus:border-brand-purple/40 focus:bg-neutral-950"
                            : "bg-neutral-50 border-black/5 text-neutral-900 placeholder-neutral-400 focus:border-brand-purple/30 focus:bg-white"
                        }`}
                      />
                    </div>

                    {/* Input email */}
                    <div className="space-y-2">
                      <label
                        htmlFor="form-email"
                        className="font-mono text-[10px] font-bold text-neutral-500 uppercase tracking-widest block"
                      >
                        Corporate Email
                      </label>
                      <input
                        id="form-email"
                        type="email"
                        required
                        placeholder="hiring@techcorp.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        disabled={isSending}
                        className={`w-full px-4 py-3.5 rounded-xl text-xs font-semibold tracking-wide border outline-none transition-all ${
                          darkMode
                            ? "bg-neutral-950/80 border-white/5 text-white placeholder-neutral-600 focus:border-brand-purple/40 focus:bg-neutral-950"
                            : "bg-neutral-50 border-black/5 text-neutral-900 placeholder-neutral-400 focus:border-brand-purple/30 focus:bg-white"
                        }`}
                      />
                    </div>

                    {/* Input message */}
                    <div className="space-y-2">
                      <label
                        htmlFor="form-message"
                        className="font-mono text-[10px] font-bold text-neutral-500 uppercase tracking-widest block"
                      >
                        Opportunity Details
                      </label>
                      <textarea
                        id="form-message"
                        required
                        rows={4}
                        placeholder="Hi Ashish, we're building a modern React platform and looking for an architect with your skill profile..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        disabled={isSending}
                        className={`w-full px-4 py-3.5 rounded-xl text-xs font-semibold tracking-wide border outline-none transition-all resize-none ${
                          darkMode
                            ? "bg-neutral-950/80 border-white/5 text-white placeholder-neutral-600 focus:border-brand-purple/40 focus:bg-neutral-950"
                            : "bg-neutral-50 border-black/5 text-neutral-900 placeholder-neutral-400 focus:border-brand-purple/30 focus:bg-white"
                        }`}
                      />
                    </div>

                    {/* Send button */}
                    <button
                      type="submit"
                      disabled={isSending || !formState.name || !formState.email || !formState.message}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg shadow-brand-purple/10 hover:shadow-brand-purple/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none transition-all cursor-pointer"
                    >
                      {isSending ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Securing Connection...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send size={13} />
                          Transmit Message
                        </span>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
