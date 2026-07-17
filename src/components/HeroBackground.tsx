import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface HeroBackgroundProps {
  darkMode: boolean;
}

export default function HeroBackground({ darkMode }: HeroBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse interpolation tracking
  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  // GLSL shader code for the organic morphing neural net structure
  const vertexShader = `
    uniform float uTime;
    uniform float uNoiseStrength;
    uniform float uFrequency;
    uniform vec2 uMouse;
    uniform float uPixelRatio;
    uniform float uMouseStrength;

    attribute float aRandomPhase;
    attribute float aSize;

    varying vec3 vPosition;
    varying float vNoise;
    varying float vDistToMouse;
    varying float vTwinkle;

    // 3D Simplex Noise by Ian McEwan, Ashima Arts
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);

      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;

      i = mod289(i);
      vec4 p = permute(permute(permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));

      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      vPosition = position;

      // 1. Slow, majestic morphing using 3D noise wave based on position coordinates
      vec3 noiseInput = position * uFrequency + vec3(0.0, 0.0, uTime);
      float noiseVal = snoise(noiseInput);
      vNoise = noiseVal;

      // Displace position slightly along normal direction
      vec3 displacedPos = position + normalize(position) * noiseVal * uNoiseStrength;

      // 2. Magnetic mouse interaction: particles pull gently towards mouse on XY
      float dist = distance(uMouse, displacedPos.xy);
      vDistToMouse = dist;

      if (dist < 1.3) {
        float force = (1.3 - dist) / 1.3;
        // Attract particles dynamically towards cursor
        displacedPos.xy += (uMouse - displacedPos.xy) * force * uMouseStrength;
        // Float slightly upwards in depth
        displacedPos.z += force * 0.15;
      }

      // Sparkle twinkles based on unique phase attribute over time
      vTwinkle = sin(uTime * 3.5 + aRandomPhase);

      vec4 mvPosition = modelViewMatrix * vec4(displacedPos, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      // Depth size attenuation
      gl_PointSize = (aSize * uPixelRatio * 15.0) / -mvPosition.z;
    }
  `;

  const fragmentShader = `
    uniform vec3 uColorCore;
    uniform vec3 uColorGlow;
    uniform vec3 uColorCyan;

    varying vec3 vPosition;
    varying float vNoise;
    varying float vDistToMouse;
    varying float vTwinkle;

    void main() {
      // Soft radial glow circle dot
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      if (dist > 0.5) {
        discard;
      }

      float glow = smoothstep(0.5, 0.1, dist);

      // Interpolate colors dynamically based on noise
      vec3 baseColor = mix(uColorCore, uColorGlow, clamp(vNoise * 0.5 + 0.5, 0.0, 1.0));

      // Active interactive highlights near cursor
      if (vDistToMouse < 0.6) {
        float hoverFactor = (0.6 - vDistToMouse) / 0.6;
        baseColor = mix(baseColor, uColorCyan, hoverFactor * 0.7);
      }

      // Incorporate sparkle flashes
      float alpha = 0.35 + (vTwinkle * 0.22);

      // Soft edge boundary fade out to make particles vanish at edges
      float edgeFade = 1.0 - smoothstep(0.5, 2.5, length(vPosition));

      gl_FragColor = vec4(baseColor, glow * alpha * edgeFade);
    }
  `;

  const lineFragmentShader = `
    uniform vec3 uColorCore;
    uniform vec3 uColorGlow;
    uniform vec3 uColorCyan;

    varying vec3 vPosition;
    varying float vNoise;
    varying float vDistToMouse;

    void main() {
      // Interpolate colors dynamically based on noise
      vec3 baseColor = mix(uColorCore, uColorGlow, clamp(vNoise * 0.5 + 0.5, 0.0, 1.0));

      // Active highlights near cursor
      if (vDistToMouse < 0.6) {
        float hoverFactor = (0.6 - vDistToMouse) / 0.6;
        baseColor = mix(baseColor, uColorCyan, hoverFactor * 0.5);
      }

      // Very subtle connection line alpha
      float alpha = 0.08;

      // Edge fade
      float edgeFade = 1.0 - smoothstep(0.5, 2.3, length(vPosition));

      gl_FragColor = vec4(baseColor, alpha * edgeFade);
    }
  `;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = canvas.clientWidth || window.innerWidth;
    let height = canvas.clientHeight || window.innerHeight;

    // WebGL Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);

    // Scene Setup
    const scene = new THREE.Scene();

    // Camera - wide angle perspective to capture full-screen network depth
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10);
    camera.position.z = 2.0;

    // Determine counts based on mobile/desktop flag
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 800 : 1800;

    // Create 10 main cognitive hubs in 3D
    const hubCount = 10;
    const hubs: THREE.Vector3[] = [];
    for (let i = 0; i < hubCount; i++) {
      const theta = (i / hubCount) * Math.PI * 2;
      const r = 0.65 + Math.random() * 0.15;
      const x = Math.cos(theta) * r;
      const y = Math.sin(theta) * r;
      const z = (Math.random() - 0.5) * 0.3;
      hubs.push(new THREE.Vector3(x, y, z));
    }

    // Connect adjacent hubs to define backbone pathways
    const hubConnections: [number, number][] = [];
    for (let i = 0; i < hubCount; i++) {
      hubConnections.push([i, (i + 1) % hubCount]);
      hubConnections.push([i, (i + 4) % hubCount]); // inner crossing axons
    }

    // Allocate storage for particle assets
    const positions: number[] = [];
    const randomPhases: number[] = [];
    const sizes: number[] = [];

    const synapsesPerHub = Math.floor((particleCount * 0.5) / hubCount);
    const axonParticlesCount = Math.floor(particleCount * 0.35);
    const dustParticlesCount = particleCount - (synapsesPerHub * hubCount) - axonParticlesCount;

    // Category 1: Synaptic Clusters around hubs
    for (let h = 0; h < hubCount; h++) {
      const hub = hubs[h];
      for (let p = 0; p < synapsesPerHub; p++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 0.04 + Math.random() * 0.14; // Synapse distance boundary
        
        const x = hub.x + r * Math.sin(phi) * Math.cos(theta);
        const y = hub.y + r * Math.sin(phi) * Math.sin(theta);
        const z = hub.z + r * Math.cos(phi);

        positions.push(x, y, z);
        randomPhases.push(Math.random() * Math.PI * 2);
        sizes.push(0.8 + Math.random() * 1.6);
      }
    }

    // Category 2: Pathway particles on Hub Axons
    for (let c = 0; c < hubConnections.length; c++) {
      const [h1, h2] = hubConnections[c];
      const p1 = hubs[h1];
      const p2 = hubs[h2];
      const countForThisConnection = Math.floor(axonParticlesCount / hubConnections.length);

      for (let p = 0; p < countForThisConnection; p++) {
        const t = p / countForThisConnection;
        // Line distribution with a subtle organic wiggle
        const wiggleStrength = 0.02;
        const x = p1.x + (p2.x - p1.x) * t + (Math.random() - 0.5) * wiggleStrength;
        const y = p1.y + (p2.y - p1.y) * t + (Math.random() - 0.5) * wiggleStrength;
        const z = p1.z + (p2.z - p1.z) * t + (Math.random() - 0.5) * wiggleStrength;

        positions.push(x, y, z);
        randomPhases.push(Math.random() * Math.PI * 2);
        sizes.push(0.7 + Math.random() * 1.3);
      }
    }

    // Category 3: Ambient dust drifting freely in background
    for (let p = 0; p < dustParticlesCount; p++) {
      const x = (Math.random() - 0.5) * 2.6;
      const y = (Math.random() - 0.5) * 2.0;
      const z = (Math.random() - 0.5) * 1.2;

      positions.push(x, y, z);
      randomPhases.push(Math.random() * Math.PI * 2);
      sizes.push(0.4 + Math.random() * 1.1);
    }

    // Generate Buffers for Three.js geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("aRandomPhase", new THREE.Float32BufferAttribute(randomPhases, 1));
    geometry.setAttribute("aSize", new THREE.Float32BufferAttribute(sizes, 1));

    // Map out Connecting Lines
    const linePositions: number[] = [];

    // Backbone structural axons
    for (const [h1, h2] of hubConnections) {
      const p1 = hubs[h1];
      const p2 = hubs[h2];
      linePositions.push(p1.x, p1.y, p1.z);
      linePositions.push(p2.x, p2.y, p2.z);
    }

    // Dendrite connection links: link hub centers to nearby synapse nodes
    for (let h = 0; h < hubCount; h++) {
      const hub = hubs[h];
      const startIndex = h * synapsesPerHub;
      const linksCount = isMobile ? 4 : 8;
      for (let i = 0; i < Math.min(linksCount, synapsesPerHub); i++) {
        const pIdx = startIndex + i;
        const px = positions[pIdx * 3];
        const py = positions[pIdx * 3 + 1];
        const pz = positions[pIdx * 3 + 2];

        linePositions.push(hub.x, hub.y, hub.z);
        linePositions.push(px, py, pz);
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));

    // Shared luxurious color setups matching dark/light themes
    const colorCore = darkMode 
      ? new THREE.Color("#2563eb")   // Electric blue (Dark)
      : new THREE.Color("#4f46e5");  // Indigo 600 (Light)

    const colorGlow = darkMode 
      ? new THREE.Color("#7c3aed")   // Neon purple (Dark)
      : new THREE.Color("#7c3aed");  // Purple 600 (Light)

    const colorCyan = darkMode 
      ? new THREE.Color("#06b6d4")   // Cyan highlights (Dark)
      : new THREE.Color("#0891b2");  // Cyan 600 (Light)

    // Materials utilizing shared WebGL shader pipelines
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: darkMode ? THREE.AdditiveBlending : THREE.NormalBlending,
      uniforms: {
        uTime: { value: 0 },
        uNoiseStrength: { value: 0.18 }, // organic morphing breathe
        uFrequency: { value: 1.2 },
        uMouse: { value: new THREE.Vector2(-10, -10) },
        uPixelRatio: { value: pixelRatio },
        uMouseStrength: { value: 0.18 }, // magnetic pull strength
        uColorCore: { value: colorCore },
        uColorGlow: { value: colorGlow },
        uColorCyan: { value: colorCyan },
      },
    });

    const lineMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: lineFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: darkMode ? THREE.AdditiveBlending : THREE.NormalBlending,
      uniforms: material.uniforms, // Share exact same uniforms for perfect position matching
    });

    const points = new THREE.Points(geometry, material);
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);

    scene.add(points);
    scene.add(lineSegments);

    // Track mouse coordinate values mapped onto normalized screen camera plane
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      const aspect = width / height;
      mouseRef.current.targetX = normX * aspect * 0.95;
      mouseRef.current.targetY = normY * 0.95;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -10;
      mouseRef.current.targetY = -10;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Watch resize events dynamically
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.clientWidth || window.innerWidth;
      height = canvas.clientHeight || window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height, false);
      material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
    };
    
    // ResizeObserver tracks actual container sizing
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(canvas);

    const clock = new THREE.Clock();

    // Buttery-smooth high efficiency rendering ticker loop
    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Lerping coordinates for organic drag physics inertia
      mouseRef.current.x = THREE.MathUtils.lerp(mouseRef.current.x, mouseRef.current.targetX, 0.04);
      mouseRef.current.y = THREE.MathUtils.lerp(mouseRef.current.y, mouseRef.current.targetY, 0.04);

      // Slower background rotation
      const rotationSpeedY = elapsed * 0.025;
      const rotationSpeedX = elapsed * 0.008;
      
      points.rotation.y = rotationSpeedY;
      points.rotation.x = rotationSpeedX;
      lineSegments.rotation.y = rotationSpeedY;
      lineSegments.rotation.x = rotationSpeedX;

      // Parallax camera sway
      if (mouseRef.current.targetX !== -10) {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseRef.current.x * 0.15, 0.04);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouseRef.current.y * 0.15, 0.04);
      } else {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, 0.02);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 0.02);
      }
      camera.lookAt(0, 0, 0);

      // Update shader parameters
      material.uniforms.uTime.value = elapsed * 0.4; // breathing time scaling
      material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      resizeObserver.disconnect();
      geometry.dispose();
      lineGeometry.dispose();
      material.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, [darkMode]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-auto overflow-hidden bg-transparent"
    >
      {/* Underlying luxurious ambient background gradients */}
      <div
        className={`absolute inset-0 transition-colors duration-1000 ${
          darkMode ? "bg-[#050505]" : "bg-[#f8fafc]"
        }`}
      />

      {/* Modern slow-moving soft glowing blobs overlay */}
      <div className={`absolute inset-0 z-0 transition-all duration-1000 ${
        darkMode ? "opacity-40 mix-blend-screen" : "opacity-20 mix-blend-multiply"
      } pointer-events-none overflow-hidden`}>
        {/* Blob 1: Cosmic Blue */}
        <div className={`absolute top-[15%] left-[20%] w-[55vw] h-[55vw] rounded-full filter blur-[140px] ${
          darkMode ? "bg-blue-900/15" : "bg-blue-300/30"
        } animate-pulse`} style={{ animationDuration: "18s" }} />
        {/* Blob 2: Cyan Ray */}
        <div className={`absolute bottom-[10%] right-[15%] w-[45vw] h-[45vw] rounded-full filter blur-[150px] ${
          darkMode ? "bg-cyan-900/10" : "bg-cyan-200/25"
        } animate-pulse`} style={{ animationDuration: "24s", animationDelay: "2s" }} />
        {/* Blob 3: Purple Core */}
        <div className={`absolute top-[40%] right-[30%] w-[35vw] h-[35vw] rounded-full filter blur-[160px] ${
          darkMode ? "bg-purple-900/10" : "bg-purple-300/20"
        } animate-pulse`} style={{ animationDuration: "20s", animationDelay: "4s" }} />
      </div>

      {/* 3D WebGL Neural Cognitive Brain Network Mesh */}
      <canvas ref={canvasRef} className={`w-full h-full block transition-opacity duration-1000 ${
        darkMode ? "opacity-75 mix-blend-screen" : "opacity-85"
      } pointer-events-auto`} />

      {/* Premium subtle glass grain overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
