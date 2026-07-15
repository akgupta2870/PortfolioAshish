import { Experience, Project, SkillCategory, Achievement, TestimonialValue } from "./types";

export const personalInfo = {
  name: "Ashish Kumar",
  title: "Senior Full Stack & React Specialist",
  tagline: "Building high-performance, enterprise-grade web applications with React, Next.js, and Node.js.",
  experienceYears: "7+",
  email: "akgupta2870@gmail.com",
  phone: "+91-9602445675",
  location: "Greater Noida, India",
  linkedin: "https://www.linkedin.com/in/ashish-kumar-84b16b136/",
  github: "https://github.com/akgupta2870",
  resumeUrl: "#", // Handled elegantly by opening a customized print-ready or downloadable dynamic resume view
};

export const achievements: Achievement[] = [
  {
    id: "1",
    metric: "7+",
    label: "Years Experience",
    description: "Designing enterprise architecture for FinTech, EdTech, and SaaS applications.",
  },
  {
    id: "2",
    metric: "20+",
    label: "Projects Delivered",
    description: "From concept to global deployment on AWS with top-tier engineering standards.",
  },
  {
    id: "3",
    metric: "100+",
    label: "Features Shipped",
    description: "Modernized old legacy class-based codebases to modular hooks, saving developer hours.",
  },
  {
    id: "4",
    metric: "Millions",
    label: "API Requests",
    description: "Processed through robust Node.js backends and highly-optimized MongoDB databases.",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend Core & Frameworks",
    skills: [
      { name: "React.js / React 19", level: 98 },
      { name: "Next.js (App Router)", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "JavaScript (ES6+)", level: 96 },
      { name: "Tailwind CSS", level: 98 },
      { name: "Redux / Redux Toolkit", level: 90 },
      { name: "React Query (TanStack)", level: 88 },
      { name: "HTML5 / CSS3 / SCSS", level: 96 },
    ],
  },
  {
    id: "backend",
    name: "Backend, Databases & AI",
    skills: [
      { name: "Node.js", level: 92 },
      { name: "Express.js", level: 94 },
      { name: "MongoDB Schema Design", level: 90 },
      { name: "SQL (Postgres, SQL Server)", level: 85 },
      { name: "RESTful API Architecture", level: 95 },
      { name: "GraphQL Queries", level: 80 },
      { name: "AI Integrations (OpenAI / HuggingFace)", level: 88 },
      { name: "Python / LLM Orchestration", level: 82 },
    ],
  },
  {
    id: "devops",
    name: "DevOps, Cloud & Testing",
    skills: [
      { name: "AWS (EC2, S3, CloudFront)", level: 86 },
      { name: "CI/CD (AWS Amplify / Git)", level: 88 },
      { name: "Firebase (Auth / Firestore)", level: 90 },
      { name: "Jest / React Testing Library", level: 88 },
      { name: "Docker / Microservices", level: 80 },
      { name: "Google Analytics & SEO", level: 85 },
      { name: "Performance Optimization", level: 94 },
      { name: "Security (RBAC / JWT / CORS)", level: 92 },
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: "aeologic",
    role: "Senior Full Stack Developer",
    company: "Aeologic Technology",
    duration: "Mar 2024 - Present",
    technologies: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "AWS (EC2, S3, CloudFront)", "CI/CD", "Jest", "Hugging Face", "Python"],
    responsibilities: [
      "Engineered a scalable rent management platform using the MERN stack with a modular, microservices-oriented architecture to improve maintainability and performance.",
      "Collaborated directly with the Product Owner and stakeholder teams to convert product requirements into clean engineering designs.",
      "Designed and implemented highly secure, efficient RESTful APIs with Node.js and Express.js to enable seamless frontend-backend integration.",
      "Administered MongoDB database structure design, applied strategic indexing, and optimized aggregate queries to ensure top-tier performance under high loads.",
      "Deployed and maintained high-availability applications on AWS using EC2, S3, and configured custom Amazon CloudFront CDN layers to boost asset delivery speeds.",
      "Automated testing and deployment workflows by implementing end-to-end CI/CD pipelines with AWS Amplify and advanced Git hooks.",
      "Integrated secure payment gateways (Razorpay) and compliant digital verification services (Digio KYC and agreement verification) to enable seamless financial flows.",
      "Developed responsive, highly interactive React.js admin dashboards featuring fine-grained role-based access control (RBAC) to optimize operational task workflows.",
      "Conducted extensive unit and integration testing leveraging Jest and React Testing Library to secure application reliability.",
      "Created an AI chatbot assistant using Python and Hugging Face models to streamline user site navigation and support resolution within the platform."
    ],
    impacts: [
      "Optimized query speeds by 40% and visual rendering loads by 35% through custom indexing and asset caching.",
      "Slashed developer delivery times by 50% via AWS CI/CD pipeline automation.",
      "Enabled fully automated compliance for digital verification using custom Digio integration, handling thousands of user agreements securely."
    ]
  },
  {
    id: "softmind",
    role: "Frontend Developer",
    company: "Softmind Infotech",
    duration: "Jun 2023 - Jan 2024",
    technologies: ["React.js", "Redux", "Tailwind CSS", "Material UI", "Firebase", "Stripe", "Google Analytics"],
    responsibilities: [
      "Designed and implemented modern fintech onboarding flows and integrated Stripe for smooth, secure multi-currency payment processing.",
      "Led and mentored a small team of frontend developers to maintain high codebase standards, performing detailed reviews and ensuring quality delivery.",
      "Built highly reusable, component-driven frontend architecture with Redux for streamlined state synchronization.",
      "Converted legacy class-based React components to modern functional hooks, modernizing and significantly accelerating the application codebase.",
      "Integrated Firebase authentication and Google Analytics telemetry for robust user onboarding and engagement tracking."
    ],
    impacts: [
      "Cut customer onboarding churn by 24% by optimizing visual flow and forms verification.",
      "Enforced a unified design language that cut styling effort for subsequent features by 40%."
    ]
  },
  {
    id: "aisv",
    role: "React JS Developer",
    company: "Aisv Technology (String Venture)",
    duration: "Mar 2022 - Apr 2023",
    technologies: ["React.js", "Next.js", "Redux", "REST APIs", "Recharts", "Figma", "Leaflet Maps"],
    responsibilities: [
      "Developed multiple premium EdTech projects completely from scratch based on strict Figma requirements using React and Next.js, ensuring highly responsive viewport layouts.",
      "Collaborated directly with the Product Owner to draft technical requirements and participate in brainstorming sessions.",
      "Designed data-dense analytics dashboards with interactive charts (Recharts) and geography maps for interactive admin tracking.",
      "Implemented reusable component-driven architectures and frontend performance optimizations to ensure maximum scalability."
    ],
    impacts: [
      "Delivered 3 massive EdTech portals on time with a 98% positive developer review rate.",
      "Sped up dashboard load times by 45% using React virtualization and smart memoization."
    ]
  },
  {
    id: "tag11",
    role: "Front End Developer",
    company: "Tag 11",
    duration: "Feb 2020 - Jan 2022",
    technologies: ["React.js", "GraphQL", "REST APIs", "Bootstrap", "SCSS", "JavaScript"],
    responsibilities: [
      "Created highly modular, reusable React components utilizing custom hooks and optimized state management to improve maintainability.",
      "Integrated GraphQL and REST API queries/mutations to fetch dynamic CMS data while implementing custom frontend data-validation layers.",
      "Used clean HTML5, CSS3, SCSS, and Bootstrap utilities to craft highly responsive, beautiful user interfaces aligned with strict design rules."
    ],
    impacts: [
      "Reduced CSS bundles by 30% through modular SCSS splitting.",
      "Successfully launched 4 high-fidelity marketing portals with 100% compliance to Figma guidelines."
    ]
  },
  {
    id: "technoheaven",
    role: "ASP.NET Developer",
    company: "Technoheaven",
    duration: "Mar 2019 - Jan 2020",
    technologies: [".NET MVC", "C#", "SQL Server", "JavaScript", "HTML5", "CSS3"],
    responsibilities: [
      "Worked on high-traffic CRM products using ASP.NET MVC architecture and robust C# backends.",
      "Designed and optimized SQL database interactions, writing efficient stored procedures and tuning index configurations."
    ],
    impacts: [
      "Reduced database load during peak hours by 20% through procedure optimizations.",
      "Automated automated reporting pipelines, saving manual operations hours."
    ]
  }
];

export const projects: Project[] = [
  {
    id: "ai_chatbot",
    title: "AI Chatbot for Property Management",
    duration: "1 Month (Intense Pilot)",
    description: "An advanced, natural language AI property-management chatbot integrated with client systems, allowing tenants to query leases, report maintenance, and explore properties without human intervention.",
    technologies: ["Python", "Hugging Face Models", "React.js", "Node.js", "Express", "MongoDB"],
    problemSolved: "Property managers were overwhelmed with repetitive text inquiries, delaying urgent maintenance and leading to a drop in lease renewal rates.",
    architecture: "Implemented a Python microservice running Hugging Face models, accessed via secure Express API endpoints and rendered through an interactive React chat drawer with conversational routing.",
    keyFeatures: [
      "Natural language understanding for lease terms, rent schedules, and maintenance requests.",
      "Conversational workflows to automatically redirect users to direct action items (e.g., pay rent modal).",
      "Auto-escalation engine that parses sentiment and routes highly distressed tickets directly to managers."
    ],
    performanceOptimizations: [
      "Leveraged token chunking and request queuing to handle high concurrent chat volume.",
      "Cached common QA response pairs in Redis/MongoDB, bypassing LLM inference for 60% of standard questions."
    ],
    businessImpact: "Automated 70% of standard tenant inquiries, resulting in a 40% reduction in customer support response times and significantly higher tenant satisfaction ratings."
  },
  {
    id: "iflip",
    title: "iFlip - Algorithmic Stock Trading Platform",
    duration: "9 Months",
    description: "A next-generation, high-frequency digital stock brokerage platform facilitating intuitive stock buying and selling with real-time charting, broker dashboards, and dynamic client interfaces.",
    technologies: ["React.js", "Redux Toolkit", "Node.js", "Express", "MongoDB", "Recharts", "WebSockets"],
    problemSolved: "High latency in loading market data and lack of unified views for brokers hindered rapid, confident stock trading for general users.",
    architecture: "Fully decoupled frontend SPA powered by React and Redux Toolkit, pulling real-time data from a WebSocket ticker server with backend caching in MongoDB.",
    keyFeatures: [
      "Interactive charts showing real-time price trends with customizable timeline filters.",
      "Differentiated interfaces for Brokers (admin tools, risk parameters) and General Users (portfolio, wallet, buy/sell).",
      "Instant portfolio value calculators and trade execution pipelines."
    ],
    performanceOptimizations: [
      "Utilized custom Web Workers to process continuous stock price streams off the main browser thread.",
      "Implemented layout virtualization to render stock ticker tables containing thousands of items smoothly."
    ],
    businessImpact: "Enabled seamless stock trades with sub-100ms execution rendering, serving over 50,000 active transactions daily without visual delay or crash."
  },
  {
    id: "scoreplus",
    title: "Scoreplus.in - EdTech Exam Hub",
    duration: "12 Months",
    description: "A comprehensive, high-traffic educational examination hub providing responsive assessment dashboards, mock test environments, and interactive performance reports for students.",
    technologies: ["React.js", "Next.js", "Tailwind CSS", "Redux", "REST APIs", "Node.js"],
    problemSolved: "Heavy page sizes and slow image-rendering on low-bandwidth networks in rural areas caused high student dropout rates during high-stakes mock exams.",
    architecture: "Full server-side rendered (SSR) Next.js structure paired with optimized dynamic client hydration, enabling rapid initial load even on weak mobile connections.",
    keyFeatures: [
      "Interactive examination client with timers, progress tracking, and flag-for-review features.",
      "Instantly generated performance analytics showing strength/weakness metrics visually.",
      "Dynamic exam content loader supporting multiple rich media types (images, diagrams)."
    ],
    performanceOptimizations: [
      "Reduced CSS footprint by 65% by migrating from legacy styles to Tailwind CSS utilities.",
      "Implemented strict code-splitting, lazy-loading off-screen sections, and automated image compression pipelines."
    ],
    businessImpact: "Achieved a 98/100 performance score on Google Lighthouse, reducing page-load dropouts by 45% and growing student engagement by 80%."
  },
  {
    id: "speakenenglish",
    title: "SpeakEnEnglish - Language Mastery Portal",
    duration: "12 Months",
    description: "An immersive language learning platform combining audio feedback, personalized dynamic content, and detailed analytics to accelerate English language acquisition.",
    technologies: ["React.js", "Context API", "REST APIs", "Web Audio API", "Chart.js"],
    problemSolved: "Generic, static language lessons failed to adapt to individual student speaking speeds and mistakes, slowing down student fluency progress.",
    architecture: "Client-centric React SPA featuring customized Web Audio API voice tracking and dynamic, server-driven personalized lesson pipelines.",
    keyFeatures: [
      "Voice audio analysis and visual feedback tracking user pronunciation.",
      "Custom user analytics dashboard providing tailored visual progress metrics.",
      "Personalized dynamic content pipelines adapting lesson difficulty in real time."
    ],
    performanceOptimizations: [
      "Optimized browser speech buffers to ensure zero audio recording lag or playback distortion.",
      "Memoized heavy chart render cycles to prevent UI stutters during pronunciation analysis."
    ],
    businessImpact: "Helped over 100,000 students improve pronunciation precision scores by 35% within their first month of daily usage."
  },
  {
    id: "studybharat",
    title: "StudyBharat - NEET & JEE Preparation Portal",
    duration: "12 Months",
    description: "A leading-edge preparation portal specifically designed to prepare students for the highly competitive NEET and JEE entrance exams, complete with testing modules and study aids.",
    technologies: ["React.js", "Next.js", "Tailwind CSS", "REST APIs", "MongoDB"],
    problemSolved: "High density of mathematical and scientific notation caused sluggish page loading and visual misalignment on mobile browsers.",
    architecture: "High-performance hybrid static-site generated (SSG) system with dynamic React exam simulators.",
    keyFeatures: [
      "Pixel-perfect rendering of scientific equations and complex high-res graphics.",
      "Interactive, adaptive practice tests simulating real JEE/NEET testing environments.",
      "Interactive math learning aids and instant solution finders."
    ],
    performanceOptimizations: [
      "Implemented MathJax rendering in a worker thread to keep the main thread fluid.",
      "Optimized static pre-rendering on over 2,000 syllabus topic pages."
    ],
    businessImpact: "Created a seamless preparation ecosystem used by over 250,000 aspiring engineers and doctors, leading to a 50% increase in average mock exam scores."
  }
];

export const teamValues: TestimonialValue[] = [
  {
    id: "delivery",
    title: "Fast Delivery",
    description: "A strong advocate of Agile methodologies and rapid shipping. I deliver clean, production-ready iterations swiftly without sacrificing architecture standards.",
    points: ["Agile shipping cadence", "Pragmatic MVP design", "Rapid prototyping"]
  },
  {
    id: "ownership",
    title: "Full Ownership",
    description: "I take absolute, end-to-end accountability for features, servers, databases, and pipelines. I ensure products run flawlessly under peak loads and scale predictably.",
    points: ["Self-directed problem solver", "Zero handholding required", "Proactive system design"]
  },
  {
    id: "quality",
    title: "Pristine Code Quality",
    description: "Believer in clean code, robust types, and architectural patterns. I write self-documenting code backed by comprehensive Jest and React Testing Library coverages.",
    points: ["TypeScript strict mode", "Reusable modular patterns", "High-coverage testing tests"]
  },
  {
    id: "communication",
    title: "Clear Communication",
    description: "Articulating technical architectural choices clearly to product owners, design specialists, and clients, ensuring 100% team alignment on target outcomes.",
    points: ["Stakeholder collaboration", "Technical spec authoring", "Cross-team synchronization"]
  },
  {
    id: "mentoring",
    title: "Team Mentoring",
    description: "I take pride in leveling up junior engineers. I conduct rigorous, supportive code reviews and host sessions on frontend architecture, state management, and debugging.",
    points: ["Pair programming lead", "Codebase standardization", "Knowledge sharing advocate"]
  },
  {
    id: "architecture",
    title: "System Architecture",
    description: "Expert in decoupling frontend client layers from microservices and databases. I design robust schemas, caching strategies, CDNs, and security protocols.",
    points: ["Microservices integration", "DB indexing & aggregation", "Cloud hosting setup"]
  }
];

export const hireReasons = [
  {
    title: "Scalable Architecture",
    description: "Expert in building microservices-oriented and highly componentized modular react codebases that survive heavy production traffic.",
    icon: "Layers"
  },
  {
    title: "Clean Code Champion",
    description: "Enforcing clean hooks, typescript absolute safety, and beautiful atomic file design to keep developers moving fast.",
    icon: "CodeXml"
  },
  {
    title: "Performance First",
    description: "Focused on optimizing core web vitals, state memoization, indexing, and CDN cache layers to keep application loads under 1s.",
    icon: "Cpu"
  },
  {
    title: "AI-Ready Engineer",
    description: "Pioneering LLM integration, prompt engineering, Hugging Face pipelines, and custom conversational assistants directly inside web apps.",
    icon: "Sparkles"
  },
  {
    title: "Full Stack Competence",
    description: "Moving fluidly from pixel-perfect UI adjustments in Tailwind to writing high-throughput REST APIs and database queries in Express & MongoDB.",
    icon: "ShieldAlert"
  },
  {
    title: "Business Mindset",
    description: "Working directly with Product Owners to ensure engineering solutions maps strictly to high-value user metrics and revenue.",
    icon: "TrendingUp"
  }
];
