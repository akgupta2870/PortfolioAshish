import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as THREE from "three";
import { gsap } from "gsap";
import { 
  Sparkles, 
  RotateCcw, 
  Sliders, 
  Layers,
  Cpu,
  Activity,
  Zap,
  RefreshCw,
  SlidersHorizontal
} from "lucide-react";

interface MeltImageProps {
  darkMode: boolean;
}

export default function MeltImage({ darkMode }: MeltImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Interactive Labs controls state
  const [showPanel, setShowPanel] = useState(false);
  const [particleCount, setParticleCount] = useState(2500);
  const [noiseStrength, setNoiseStrength] = useState(0.35);
  const [frequency, setFrequency] = useState(1.8);
  const [morphSpeed, setMorphSpeed] = useState(1.0);
  const [particleSize, setParticleSize] = useState(3.5);
  const [colorShift, setColorShift] = useState(0.5);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Refs for WebGL items
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const targetScale = useRef<number>(1.0);
  const currentScale = useRef<number>(1.0);

  // Custom Shaders for generative morphing particle sphere
  const vertexShader = `
    uniform float uTime;
    uniform float uNoiseStrength;
    uniform float uFrequency;
    uniform float uHover;
    uniform float uColorShift;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    varying float vNoise;

    // Description : Array and textureless GLSL 2D/3D/4D simplex 
    //               noise functions.
    //      Author : Ian McEwan, Ashima Arts.
    //  Maintainer : stegu
    //     Lastmod : 20110822 (ijm)
    //     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
    //               Distributed under the MIT License. See LICENSE file.
    //               https://github.com/ashima/webgl-noise
    //               https://github.com/stegu/webgl-noise

    vec3 mod289(vec3 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 mod289(vec4 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 permute(vec4 x) {
         return mod289(((x*34.0)+1.0)*x);
    }

    vec4 taylorInvSqrt(vec4 r) {
      return 1.79284291400159 - 0.85373472095314 * r;
    }

    float snoise(vec3 v) { 
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

      // First corner
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 =   v - i + dot(i, C.xxx) ;

      // Other corners
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );

      //   x0 = x0 - 0.0 + 0.0 * C.xxx;
      //   x1 = x0 - i1  + 1.0 * C.xxx;
      //   x2 = x0 - i2  + 2.0 * C.xxx;
      //   x3 = x0 - 1.0 + 3.0 * C.xxx;
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
      vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

      // Permutations
      i = mod289(i); 
      vec4 p = permute( permute( permute( 
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

      // Gradients: 7x7 points over a square, mapped onto an octahedron.
      // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
      float n_ = 0.142857142857; // 1.0/7.0
      vec3  ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );

      //   vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
      //   vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);

      //Normalise gradients
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      // Mix final noise value
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                    dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vUv = uv;
      vPosition = position;
      
      // Compute procedural WebGL displacement using 3D Simplex Noise
      vec3 noiseInput = position * uFrequency + vec3(0.0, 0.0, uTime);
      float noiseVal = snoise(noiseInput);
      vNoise = noiseVal;

      // Displacement direction (along normal sphere vector direction)
      vec3 displacedPosition = position + normalize(position) * noiseVal * uNoiseStrength * (1.0 + uHover * 0.4);
      
      // Output projection mapping
      vec4 mvPosition = modelViewMatrix * vec4(displacedPosition, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      // Dynamic point size scaling relative to depth projection & zoom hover effects
      gl_PointSize = (20.0 + uHover * 10.0) / -mvPosition.z;
    }
  `;

  const fragmentShader = `
    uniform vec3 uColorCore;
    uniform vec3 uColorGlow;
    uniform float uHover;
    uniform float uColorShift;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    varying float vNoise;

    void main() {
      // Create a perfectly anti-aliased soft radial circular particle
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      if (dist > 0.5) {
        discard;
      }
      
      // Soft halo edge glow
      float glow = smoothstep(0.5, 0.1, dist);
      
      // Dynamic multi-spectrum color blend based on noise displacement and coordinate state
      vec3 baseColor = mix(uColorCore, uColorGlow, clamp(vNoise * 0.5 + 0.5 + uColorShift * 0.3, 0.0, 1.0));
      
      // Cyan iridescent neon sparks on high-motion hover
      vec3 hoverNeon = vec3(0.13, 0.82, 0.93); // brand-cyan
      vec3 finalColor = mix(baseColor, hoverNeon, uHover * 0.25);
      
      gl_FragColor = vec4(finalColor, glow * (0.8 + uHover * 0.2));
    }
  `;

  // Initialize and scale Three.js canvas scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Dimensions
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    rendererRef.current = renderer;

    // Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10);
    camera.position.z = 2.4;
    cameraRef.current = camera;

    // Procedural Sphere Geometry (Neural Avatar Core)
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const uvs: number[] = [];

    // Uniform random distribution over sphere surface (Fibonacci spiral or mathematical sphere mapping)
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      const r = 0.65; // sphere base radius
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions.push(x, y, z);
      uvs.push(u, v);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));

    // Colors
    const coreColor = new THREE.Color(darkMode ? "#a855f7" : "#6366f1"); // Indigo purple
    const glowColor = new THREE.Color(darkMode ? "#3b82f6" : "#06b6d4"); // Cyan blue

    // Custom Shader Material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0.0 },
        uNoiseStrength: { value: noiseStrength },
        uFrequency: { value: frequency },
        uHover: { value: 0.0 },
        uColorShift: { value: colorShift },
        uColorCore: { value: coreColor },
        uColorGlow: { value: glowColor },
      },
    });
    materialRef.current = material;

    // Create Points object and add to scene
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    pointsRef.current = points;

    // Ticker variable
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      if (material) {
        material.uniforms.uTime.value = elapsedTime * morphSpeed;
      }

      // Smooth slow auto-rotation
      if (points) {
        points.rotation.y = elapsedTime * 0.15;
        points.rotation.x = elapsedTime * 0.05;

        // Inertia smooth scaling on hover transitions
        currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale.current, 0.1);
        points.scale.setScalar(currentScale.current);
      }

      renderer.render(scene, camera);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h, false);
      }
    });
    resizeObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [particleCount, darkMode]);

  // Update shaders when controls are tweaked
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uNoiseStrength.value = noiseStrength;
      materialRef.current.uniforms.uFrequency.value = frequency;
      materialRef.current.uniforms.uColorShift.value = colorShift;
    }
  }, [noiseStrength, frequency, colorShift]);

  // Handle interaction & mouse movement tilts
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setTilt({ x: x * 15, y: -y * 15 }); // Max 15 degree rotation

    // Parallax sway the particle sphere slightly toward cursor
    if (pointsRef.current) {
      gsap.to(pointsRef.current.position, {
        x: x * 0.25,
        y: -y * 0.25,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  };

  const handleMouseEnter = () => {
    targetScale.current = 1.15; // spring expand
    if (materialRef.current) {
      gsap.to(materialRef.current.uniforms.uHover, {
        value: 1.0,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    targetScale.current = 1.0;
    if (materialRef.current) {
      gsap.to(materialRef.current.uniforms.uHover, {
        value: 0.0,
        duration: 0.6,
        ease: "power2.out",
      });
    }
    if (pointsRef.current) {
      gsap.to(pointsRef.current.position, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  };

  const resetControls = () => {
    setNoiseStrength(0.35);
    setFrequency(1.8);
    setMorphSpeed(1.0);
    setParticleSize(3.5);
    setColorShift(0.5);
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: tilt.y,
          rotateY: tilt.x,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        data-cursor-text="MORPH"
        className={`relative aspect-square w-72 sm:w-80 md:w-[350px] rounded-3xl border p-2.5 transition-all duration-300 overflow-hidden shadow-2xl flex items-center justify-center ${
          darkMode 
            ? "bg-neutral-950/40 border-white/10 shadow-indigo-950/5" 
            : "bg-white/40 border-sky-100/80 shadow-sky-100/30"
        }`}
      >
        {/* Subtle decorative target corners */}
        <div className="absolute top-3 left-3 w-2 h-2 border-t-2 border-l-2 border-brand-purple/40" />
        <div className="absolute top-3 right-3 w-2 h-2 border-t-2 border-r-2 border-brand-purple/40" />
        <div className="absolute bottom-3 left-3 w-2 h-2 border-b-2 border-l-2 border-brand-purple/40" />
        <div className="absolute bottom-3 right-3 w-2 h-2 border-b-2 border-r-2 border-brand-purple/40" />

        {/* Ambient status indicator */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 z-10 font-mono text-[8px] tracking-wider text-neutral-400">
          <Activity size={10} className="text-brand-cyan animate-pulse" />
          <span>NEURAL COGNITIVE MESH</span>
        </div>

        {/* Core WebGL Render Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block cursor-grab active:cursor-grabbing"
        />

        {/* Shimmering glass overlays */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

        {/* Controls Toggle Button */}
        <button
          onClick={() => setShowPanel(!showPanel)}
          className={`absolute bottom-4 right-4 z-20 p-2 rounded-full border transition-all cursor-pointer ${
            darkMode
              ? "bg-neutral-900/90 border-white/10 text-neutral-300 hover:text-white hover:bg-neutral-800"
              : "bg-white/90 border-black/10 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100"
          }`}
          title="Tweak Mesh Uniforms"
        >
          <SlidersHorizontal size={12} />
        </button>

        {/* Labs Interactive Control Panel Overlay */}
        <AnimatePresence>
          {showPanel && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.2 }}
              className={`absolute inset-x-4 bottom-14 z-30 p-4 rounded-2xl border backdrop-blur-xl flex flex-col gap-3 font-mono text-[9px] ${
                darkMode
                  ? "bg-neutral-950/95 border-white/10 text-neutral-300"
                  : "bg-white/95 border-black/10 text-neutral-700"
              }`}
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="font-bold flex items-center gap-1 uppercase tracking-wider text-brand-purple">
                  <Cpu size={10} />
                  Mesh Labs parameters
                </span>
                <button
                  onClick={resetControls}
                  className="hover:text-brand-cyan flex items-center gap-0.5 cursor-pointer uppercase font-semibold"
                >
                  <RotateCcw size={8} /> Reset
                </button>
              </div>

              {/* Slider 1: Distortion factor */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span>Distortion factor:</span>
                  <span className="font-bold text-brand-cyan">{noiseStrength.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.80"
                  step="0.05"
                  value={noiseStrength}
                  onChange={(e) => setNoiseStrength(parseFloat(e.target.value))}
                  className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-purple"
                />
              </div>

              {/* Slider 2: Wave Frequency */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span>Wave Frequency:</span>
                  <span className="font-bold text-brand-cyan">{frequency.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="4.0"
                  step="0.1"
                  value={frequency}
                  onChange={(e) => setFrequency(parseFloat(e.target.value))}
                  className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-purple"
                />
              </div>

              {/* Slider 3: Morph Speed */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span>Morph Speed:</span>
                  <span className="font-bold text-brand-cyan">{morphSpeed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="2.5"
                  step="0.1"
                  value={morphSpeed}
                  onChange={(e) => setMorphSpeed(parseFloat(e.target.value))}
                  className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-purple"
                />
              </div>

              {/* Slider 4: Spectral Blend */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span>Spectral Blend:</span>
                  <span className="font-bold text-brand-cyan">{colorShift.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={colorShift}
                  onChange={(e) => setColorShift(parseFloat(e.target.value))}
                  className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-purple"
                />
              </div>

              {/* Real-time telemetry specs line */}
              <div className="flex justify-between items-center text-[7.5px] text-neutral-500 border-t border-white/5 pt-2 mt-1">
                <span>BUFFER_PT: {particleCount}</span>
                <span>RENDERER: WEBGL_2.0</span>
                <span>STATUS: STABLE</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Decorative prompt instruction underneath */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.8 }}
        className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase mt-4 text-center select-none flex items-center gap-1"
      >
        <Zap size={10} className="text-brand-purple" />
        Hover, move, and drag to morph cognitive webgl mesh
      </motion.p>
    </div>
  );
}
