import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface CinematicBackgroundProps {
  darkMode: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  color: string;
}

export default function CinematicBackground({ darkMode }: CinematicBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Parallax state offsets
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Mouse tracking
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Handle mouse move for parallax and particle interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Parallax calculations (subtle shift -15px to 15px)
      const px = ((clientX / width) - 0.5) * 30;
      const py = ((clientY / height) - 0.5) * 30;

      if (!prefersReducedMotion) {
        setParallax({ x: px, y: py });
      }

      // Save raw target mouse coordinates for the canvas particle system
      mouseRef.current.targetX = clientX;
      mouseRef.current.targetY = clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
      setParallax({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  // Canvas particle constellation physics loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle density calculation based on screen size
    const getParticleCount = () => {
      const area = width * height;
      if (area < 600000) return 35; // Mobile density
      if (area < 1200000) return 65; // Tablet density
      return 110; // Desktop density
    };

    let particles: Particle[] = [];
    const colors = darkMode 
      ? ["rgba(139, 92, 246, ", "rgba(59, 130, 246, ", "rgba(6, 182, 212, "] // Purple, blue, cyan
      : ["rgba(99, 102, 241, ", "rgba(79, 70, 229, ", "rgba(14, 165, 233, "]; // Indigo, dark indigo, sky blue

    const createParticles = () => {
      particles = [];
      const count = getParticleCount();
      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 1.8 + 0.8;
        const baseAlpha = Math.random() * 0.45 + 0.15;
        const colorPrefix = colors[Math.floor(Math.random() * colors.length)];
        
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.35),
          vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.35),
          radius,
          alpha: baseAlpha,
          baseAlpha,
          color: colorPrefix,
        });
      }
    };

    createParticles();

    // Smooth resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    };
    window.addEventListener("resize", handleResize);

    // Track active mouse coordinate with soft lag interpolation
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate current mouse positions to follow with physics inertia
      if (mouseRef.current.targetX !== -1000) {
        if (mouseRef.current.x === -1000) {
          mouseRef.current.x = mouseRef.current.targetX;
          mouseRef.current.y = mouseRef.current.targetY;
        } else {
          mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
          mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;
        }
      } else {
        mouseRef.current.x = -1000;
        mouseRef.current.y = -1000;
      }

      // Render & update particles
      particles.forEach((p) => {
        // Simple continuous floating motion
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundary bounds gracefully
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Interactive mouse force field behavior (gentle gravity swell)
        if (mouseRef.current.x !== -1000) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxInteractionDist = 180;

          if (dist < maxInteractionDist) {
            // High-end spring attraction physics
            const force = (maxInteractionDist - dist) / maxInteractionDist;
            const angle = Math.atan2(dy, dx);
            
            // Move particle towards mouse with a very small dampening factor
            const pull = force * 0.45;
            p.x += Math.cos(angle) * pull;
            p.y += Math.sin(angle) * pull;

            // Enhance particle size/glow subtly near mouse
            p.alpha = Math.min(1.0, p.baseAlpha + force * 0.45);
          } else {
            // Return to baseline opacity smoothly
            p.alpha += (p.baseAlpha - p.alpha) * 0.05;
          }
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.shadowBlur = p.radius * 3;
        ctx.shadowColor = p.color + "0.6)";
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for performance on lines
      });

      // Draw constellation connections (thin elegant proximity links)
      ctx.lineWidth = 0.55;
      const maxDistance = 115;

      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            // Opacity scales beautifully with distance (fades out when far)
            const alphaFactor = (maxDistance - dist) / maxDistance;
            const lineAlpha = alphaFactor * 0.16 * Math.min(pi.alpha, pj.alpha);

            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            
            // Blend linear line gradient based on node positions
            const gradient = ctx.createLinearGradient(pi.x, pi.y, pj.x, pj.y);
            gradient.addColorStop(0, pi.color + lineAlpha + ")");
            gradient.addColorStop(1, pj.color + lineAlpha + ")");
            
            ctx.strokeStyle = gradient;
            ctx.stroke();
          }
        }

        // Draw dynamic line connecting cursor to nearby particles
        if (mouseRef.current.x !== -1000) {
          const dx = pi.x - mouseRef.current.x;
          const dy = pi.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseConnectionDist = 150;

          if (dist < mouseConnectionDist) {
            const alphaFactor = (mouseConnectionDist - dist) / mouseConnectionDist;
            const lineAlpha = alphaFactor * 0.22 * pi.alpha;

            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = pi.color + lineAlpha + ")";
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [darkMode, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-20 pointer-events-none overflow-hidden select-none"
    >
      {/* 1. Underlying Atmospheric Color Gradients */}
      <div
        className={`absolute inset-0 transition-colors duration-1000 ${
          darkMode
            ? "bg-gradient-to-b from-[#050505] via-[#0b0a11] to-[#111111]"
            : "bg-gradient-to-b from-[#fafafa] via-[#f1f3f8] to-[#f5f5f7]"
        }`}
      />

      {/* 2. Soft Ambient Glowing Blobs Layer (Dynamic Parallax Shift) */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `translate3d(${parallax.x * 0.6}px, ${parallax.y * 0.6}px, 0)`,
        }}
      >
        {/* Blob 1: Cosmic Violet */}
        <div
          className={`absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full filter blur-[150px] opacity-25 mix-blend-screen animate-pulse ${
            darkMode ? "bg-violet-700" : "bg-indigo-300"
          }`}
          style={{ animationDuration: "16s" }}
        />

        {/* Blob 2: Cyan Ray */}
        <div
          className={`absolute bottom-[-15%] right-[-5%] w-[45vw] h-[45vw] rounded-full filter blur-[140px] opacity-20 mix-blend-screen animate-pulse ${
            darkMode ? "bg-cyan-600" : "bg-sky-200"
          }`}
          style={{ animationDuration: "22s", animationDelay: "2s" }}
        />

        {/* Blob 3: Royal Blue Core */}
        <div
          className={`absolute top-[35%] left-[25%] w-[35vw] h-[35vw] rounded-full filter blur-[160px] opacity-15 mix-blend-screen animate-pulse ${
            darkMode ? "bg-blue-800" : "bg-indigo-100"
          }`}
          style={{ animationDuration: "18s", animationDelay: "4s" }}
        />
      </div>

      {/* 3. Slow Moving Aurora / Light Beam Effect */}
      <div className="absolute inset-0 opacity-15 mix-blend-overlay overflow-hidden">
        <div 
          className={`absolute top-[-30%] left-[-20%] w-[140%] h-[80%] origin-center rotate-[15deg] filter blur-[90px] transition-colors duration-1000 ${
            darkMode 
              ? "bg-gradient-to-r from-transparent via-indigo-950 to-transparent" 
              : "bg-gradient-to-r from-transparent via-slate-200 to-transparent"
          }`}
          style={{
            animation: prefersReducedMotion ? "none" : "auroraSway 25s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* 4. Connected Particle Network (Slight Parallax Displacement) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block mix-blend-screen opacity-85 pointer-events-none will-change-transform"
        style={{
          transform: `translate3d(${parallax.x * 0.3}px, ${parallax.y * 0.3}px, 0)`,
        }}
      />

      {/* 5. Subtle Premium Noise Grain Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.022] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 6. Soft Radial Glow Behind Main Content */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[55vh] rounded-full filter blur-[180px] opacity-[0.08] pointer-events-none ${
          darkMode ? "bg-white" : "bg-indigo-900"
        }`} 
      />

      {/* Global CSS Keyframe injection for the organic Aurora sway animation */}
      <style>{`
        @keyframes auroraSway {
          0% {
            transform: translate3d(-3%, -2%, 0) rotate(12deg) scaleY(0.9);
          }
          100% {
            transform: translate3d(3%, 3%, 0) rotate(18deg) scaleY(1.1);
          }
        }
      `}</style>
    </div>
  );
}
