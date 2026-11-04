/**
 * src/lib/data.ts
 * Single source of truth for all portfolio content.
 * Extracted verbatim and strictly from public/resume.pdf.
 * NO fabricated information, metrics, or links.
 */

export interface Profile {
  name: string;
  initials: string;
  firstName: string;
  role: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  resumeSummary: string;
  resumeShortLine: string;
  idCard: {
    idNo: string;
    dept: string;
    validTill: string;
    whatIAm: string[];
  };
  quickFacts: {
    location: string;
    education: string;
    currentRole: string;
    email: string;
    quote: string;
  };
  github: string;
  linkedin: string;
  resumePath: string;
}

export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export interface SkillItem {
  id: string;
  name: string;
  symbol: string;
  atomicNumber: number;
  family: "Languages" | "Frontend" | "Backend" | "Databases" | "Cloud & Tools" | "AI / ML" | "Core & Concepts";
  brandSlug?: string;
  projects: string[];
}

export interface SkillGroup {
  family: "Languages" | "Frontend" | "Backend" | "Databases" | "Cloud & Tools" | "AI / ML" | "Core & Concepts";
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  url?: string;
  github?: string;
  role?: string;
  uiType: "b2b-platform" | "ai-analysis" | "booking-management";
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  graduationDate: string;
  cgpa: string;
  coursework: string[];
}

export interface ExperienceItem {
  id: string;
  year?: string;
  title: string;
  company: string;
  type: "experience" | "education" | "leadership";
  period: string;
  location?: string;
  website?: string;
  tech?: string[];
  details: string[];
}

export interface AchievementItem {
  id: string;
  index: string;
  metric: string;
  metricNumber?: number;
  metricSuffix?: string;
  title: string;
  caption: string;
  detail: string;
  category: "Academics" | "Production" | "AI Research" | "Hackathons" | "Leadership";
  brandSlug?: string;
  brandColor?: string;
}

export interface CertificationItem {
  id: string;
  index?: string;
  title: string;
  issuer: string;
  date?: string;
  url?: string;
}

// ----------------------------------------------------------------------------
// DATA DEFINITIONS (Strictly from resume.pdf)
// ----------------------------------------------------------------------------

export const PROFILE: Profile = {
  name: "VEERA VAISHNAVI K",
  initials: "VV",
  firstName: "VEERA",
  role: "Full Stack Developer",
  email: "vaishureddy26096@gmail.com",
  phone: "+91-6383929687",
  phoneHref: "tel:+916383929687",
  location: "Chennai, Tamil Nadu, India",
  resumeSummary:
    "Founding Software Engineer at Lin's InfoTech and Computer Science (Artificial Intelligence) engineer at Saveetha School of Engineering with a 9.22 CGPA. Experienced in architecting decoupled three-layer microservices, optimizing production edge rendering across 60+ routes, and deploying machine learning models into clinical and production web environments.",
  resumeShortLine:
    "Architecting three-layer microservices, high-performance edge platforms, and applied AI systems.",
  idCard: {
    idNo: "SSE-2028-AI",
    dept: "Computer Science (AI)",
    validTill: "May 2028",
    whatIAm: [
      "Founding Software Engineer — Lin's InfoTech",
      "B.E. Computer Science (AI) · CGPA: 9.22 / 10",
      "Published Researcher — IEEE Xplore (ICFTS 2025)",
      "VP at GDG SIMATS & Hackathon Club Research Lead",
      "1st & 3rd Prize Hackathon Winner (12h & 24h)"
    ]
  },
  quickFacts: {
    location: "Chennai, Tamil Nadu, India",
    education: "Saveetha School of Engineering (CGPA 9.22 / 10)",
    currentRole: "Founding Software Engineer — Lin's InfoTech",
    email: "vaishureddy26096@gmail.com",
    quote:
      "Architecting modular microservices, streaming LLM workflows, and edge-rendered platforms with zero unnecessary client hydration."
  },
  github: "https://github.com/VeeraVaishnaviK",
  linkedin: "https://www.linkedin.com/in/veera-vaishnavi/",
  resumePath: "/resume.pdf"
};
