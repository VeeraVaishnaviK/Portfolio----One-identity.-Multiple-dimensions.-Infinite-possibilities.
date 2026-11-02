export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  liveUrl?: string;
  githubUrl?: string;
  category: 'production-b2b' | 'ai-cv' | 'fullstack-web';
  description: string;
  problemSolved: string;
  technologies: string[];
  highlights: string[];
  featured: boolean;
  accentColor: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl: string;
  location: string;
  period: string;
  description: string;
  responsibilities: string[];
  techStack: string[];
}

export interface ResearchPaper {
  id: string;
  title: string;
  publication: string;
  venue: string;
  year: number;
  methods: string[];
  reportedAccuracy: string;
  objective: string;
  keyFindings: string[];
  verificationNote: string;
}

export interface Leadership {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  initiatives: string[];
  tag: string;
}

export interface Award {
  id: string;
  title: string;
  event: string;
  year: string;
  description: string;
  badge: string;
  highlightColor: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: string[];
  color: string;
}

export interface NavigationDoor {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  theme: string;
  accentColor: string;
  glowColor: string;
  targetSection: string;
  tags: string[];
  icon: string;
}
