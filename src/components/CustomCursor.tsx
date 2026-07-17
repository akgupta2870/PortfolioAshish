import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "hover" | "text">("default");
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  
  // High-performance spring animation for cursor following
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 280, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on mobile/touch screens
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Find nearest parent with custom cursor attributes
      const clickable = target.closest("button, a, input, select, textarea, [role='button'], .cursor-pointer");
      const textCursor = target.closest("[data-cursor-text]");

      if (textCursor) {
        setCursorType("text");
        setCursorText(textCursor.getAttribute("data-cursor-text") || "");
      } else if (clickable) {
        setCursorType("hover");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Spring Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-brand-purple pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: cursorType === "hover" ? 1.5 : cursorType === "text" ? 2.2 : 1,
          backgroundColor: cursorType === "hover" ? "rgba(255, 255, 255, 0.15)" : cursorType === "text" ? "rgba(168, 85, 247, 0.25)" : "rgba(255, 255, 255, 0)",
          borderColor: cursorType === "text" ? "#22d3ee" : "#a855f7",
          width: cursorType === "text" ? 75 : 32,
          height: cursorType === "text" ? 75 : 32,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
      >
        {/* Dynamic Action text */}
        {cursorType === "text" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-mono font-black uppercase tracking-wider text-brand-cyan whitespace-nowrap"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Tiny Core Dot (Instant alignment) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand-cyan rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: cursorType === "hover" ? 0.5 : cursorType === "text" ? 0 : 1,
        }}
      />
    </>
  );
}
