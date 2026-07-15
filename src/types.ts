export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  technologies: string[];
  responsibilities: string[];
  impacts: string[];
}

export interface Project {
  id: string;
  title: string;
  duration: string;
  description: string;
  technologies: string[];
  problemSolved: string;
  architecture: string;
  keyFeatures: string[];
  performanceOptimizations: string[];
  businessImpact: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: {
    name: string;
    level: number; // 1-100 percentage
    icon?: string;
  }[];
}

export interface Achievement {
  id: string;
  metric: string;
  label: string;
  description: string;
}

export interface TestimonialValue {
  id: string;
  title: string;
  description: string;
  points: string[];
}
