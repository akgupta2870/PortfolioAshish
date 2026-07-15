import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Moon, Sun, Laptop } from "lucide-react";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Header({ darkMode, setDarkMode }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "About", id: "about" },
    { label: "Tech Stack", id: "tech" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "AI Core", id: "ai" },
    { label: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Simple active section detection
      const scrollPosition = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
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

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? darkMode
            ? "glass-panel bg-neutral-950/80 border-b border-white/5 py-4"
            : "glass-panel-light bg-white/80 border-b border-black/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <motion.div
          className="flex items-center cursor-pointer"
          onClick={() => handleNavClick("hero")}
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple to-brand-blue shadow-lg shadow-brand-purple/20 overflow-hidden">
            <span className="font-display font-bold text-lg text-white">A</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
          </div>
          <div className="ml-3 hidden sm:block">
            <h1 className="font-display font-bold text-sm tracking-wide">
              ASHISH <span className="text-brand-purple">KUMAR</span>
            </h1>
            <p className="text-[10px] text-neutral-500 font-mono tracking-wider uppercase leading-none mt-0.5">
              Sr. Full Stack Architect
            </p>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all relative ${
                  isActive
                    ? darkMode
                      ? "text-white"
                      : "text-neutral-900"
                    : darkMode
                    ? "text-neutral-400 hover:text-neutral-200"
                    : "text-neutral-500 hover:text-neutral-800"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 rounded-full -z-10 ${
                      darkMode ? "bg-white/5" : "bg-black/5"
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative flex items-center gap-1.5">
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-brand-purple" />
                  )}
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-xl border transition-all ${
              darkMode
                ? "bg-neutral-900 border-white/5 text-neutral-400 hover:text-white hover:border-white/10"
                : "bg-neutral-50 border-black/5 text-neutral-600 hover:text-neutral-900 hover:border-black/10"
            }`}
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Action Button */}
          <button
            onClick={() => handleNavClick("contact")}
            className="hidden sm:flex items-center justify-center px-4 py-2 rounded-xl text-xs font-semibold tracking-wide bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-md shadow-brand-purple/20 hover:shadow-brand-purple/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            Hire Me
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2.5 rounded-xl border transition-all ${
              darkMode
                ? "bg-neutral-900 border-white/5 text-neutral-300"
                : "bg-neutral-50 border-black/5 text-neutral-700"
            }`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`lg:hidden absolute top-full left-0 w-full border-b overflow-hidden shadow-2xl ${
              darkMode
                ? "bg-neutral-950/95 border-white/5"
                : "bg-white/95 border-black/5"
            }`}
          >
            <div className="px-6 py-6 flex flex-col space-y-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center py-2.5 px-4 rounded-xl text-sm font-medium transition-all text-left ${
                      isActive
                        ? darkMode
                          ? "bg-white/5 text-white pl-6"
                          : "bg-black/5 text-neutral-900 pl-6"
                        : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-2.5 transition-all ${
                        isActive ? "bg-brand-purple" : "bg-transparent"
                      }`}
                    />
                    {item.label}
                  </button>
                );
              })}
              <button
                onClick={() => handleNavClick("contact")}
                className="w-full mt-4 flex items-center justify-center py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-brand-purple to-brand-blue text-white"
              >
                Hire Me Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
