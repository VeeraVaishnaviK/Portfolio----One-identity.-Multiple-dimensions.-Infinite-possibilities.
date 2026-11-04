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

export const NAV: NavItem[] = [
  { label: "About", href: "#about", id: "about" },
  { label: "Explore", href: "#doors", id: "doors" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Work", href: "#work", id: "work" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Achievements", href: "#achievements", id: "achievements" },
  { label: "Contact", href: "#contact", id: "contact" }
];

export const SKILL_ITEMS: SkillItem[] = [
  // Languages
  { id: "python", name: "Python", symbol: "Py", atomicNumber: 1, family: "Languages", brandSlug: "python", projects: ["Lin's InfoTech", "Nexacro", "IEEE Research"] },
  { id: "typescript", name: "TypeScript", symbol: "Ts", atomicNumber: 2, family: "Languages", brandSlug: "typescript", projects: ["Lin's InfoTech", "Apex Engineering"] },
  { id: "javascript", name: "JavaScript", symbol: "Js", atomicNumber: 3, family: "Languages", brandSlug: "javascript", projects: ["Apex Engineering", "Laundex", "Hackathons"] },
  { id: "java", name: "Java", symbol: "Ja", atomicNumber: 4, family: "Languages", brandSlug: "java", projects: ["OOP Coursework", "Core Engineering"] },
  { id: "c", name: "C", symbol: "C", atomicNumber: 5, family: "Languages", brandSlug: "c", projects: ["Data Structures & Algorithms", "Systems"] },
  { id: "sql", name: "SQL", symbol: "Sq", atomicNumber: 6, family: "Languages", brandSlug: "sql", projects: ["DBMS Coursework", "Relational Schemas"] },

  // Frontend
  { id: "react", name: "React", symbol: "Re", atomicNumber: 7, family: "Frontend", brandSlug: "react", projects: ["Lin's InfoTech", "Apex Engineering", "Nexacro", "Laundex"] },
  { id: "nextjs", name: "Next.js", symbol: "Nx", atomicNumber: 8, family: "Frontend", brandSlug: "nextjs", projects: ["Lin's InfoTech", "Apex Engineering"] },
  { id: "tailwind", name: "Tailwind CSS", symbol: "Tw", atomicNumber: 9, family: "Frontend", brandSlug: "tailwindcss", projects: ["Lin's InfoTech", "Apex Engineering"] },
  { id: "html5", name: "HTML5", symbol: "Ht", atomicNumber: 10, family: "Frontend", brandSlug: "html5", projects: ["Production Web Standards"] },
  { id: "css3", name: "CSS3", symbol: "Cs", atomicNumber: 11, family: "Frontend", brandSlug: "css3", projects: ["Responsive Layouts"] },

  // Backend & APIs
  { id: "nodejs", name: "Node.js", symbol: "No", atomicNumber: 12, family: "Backend", brandSlug: "nodejs", projects: ["Lin's InfoTech", "Hackathon Platform"] },
  { id: "express", name: "Express.js", symbol: "Ex", atomicNumber: 13, family: "Backend", brandSlug: "express", projects: ["Lin's InfoTech Gateway", "Fake News Detector"] },
  { id: "fastapi", name: "FastAPI", symbol: "Fa", atomicNumber: 14, family: "Backend", brandSlug: "fastapi", projects: ["Lin's InfoTech AI Service"] },
  { id: "rest-apis", name: "REST APIs", symbol: "Ra", atomicNumber: 15, family: "Backend", projects: ["Lin's InfoTech", "Nexacro API Gateway"] },
  { id: "microservices", name: "Microservices", symbol: "Ms", atomicNumber: 16, family: "Backend", projects: ["Lin's InfoTech 3-Layer System"] },

  // Databases
  { id: "mongodb", name: "MongoDB", symbol: "Mg", atomicNumber: 17, family: "Databases", brandSlug: "mongodb", projects: ["Lin's InfoTech", "Nexacro", "Laundex"] },
  { id: "mongoose", name: "Mongoose ODM", symbol: "Mo", atomicNumber: 18, family: "Databases", brandSlug: "mongodb", projects: ["Lin's InfoTech", "Lead Capture & Auth"] },

  // Cloud & Tools
  { id: "vercel", name: "Vercel", symbol: "Ve", atomicNumber: 19, family: "Cloud & Tools", brandSlug: "vercel", projects: ["Lin's InfoTech", "Apex Engineering"] },
  { id: "gcp", name: "Google Cloud", symbol: "Gc", atomicNumber: 20, family: "Cloud & Tools", brandSlug: "googlecloud", projects: ["Cloud Deployments", "GDG SIMATS"] },
  { id: "git", name: "Git", symbol: "Gt", atomicNumber: 21, family: "Cloud & Tools", brandSlug: "git", projects: ["Version Control"] },
  { id: "github", name: "GitHub", symbol: "Gh", atomicNumber: 22, family: "Cloud & Tools", brandSlug: "github", projects: ["CI/CD & Open Source"] },
  { id: "vscode", name: "VS Code", symbol: "Vs", atomicNumber: 23, family: "Cloud & Tools", brandSlug: "vscode", projects: ["Primary Development IDE"] },
  { id: "androidstudio", name: "Android Studio", symbol: "As", atomicNumber: 24, family: "Cloud & Tools", brandSlug: "androidstudio", projects: ["Nexacro Android Client"] },

  // AI / ML
  { id: "gemini", name: "Google Gemini API", symbol: "Gm", atomicNumber: 25, family: "AI / ML", brandSlug: "gemini", projects: ["Lin's InfoTech Streaming Chatbot"] },
  { id: "langchain", name: "LangChain", symbol: "Lc", atomicNumber: 26, family: "AI / ML", brandSlug: "langchain", projects: ["Lin's InfoTech Document Generation"] },
  { id: "mobilenet", name: "MobileNet", symbol: "Mn", atomicNumber: 27, family: "AI / ML", projects: ["IEEE Xplore Parkinson's Screening"] },
  { id: "knn", name: "KNN Classifier", symbol: "Kn", atomicNumber: 28, family: "AI / ML", projects: ["IEEE Xplore Spiral Sketch Analysis"] },

  // Core & Concepts (from Coursework)
  { id: "dsa", name: "Data Structures", symbol: "Ds", atomicNumber: 29, family: "Core & Concepts", projects: ["Core Algorithms & Optimization"] },
  { id: "oop", name: "OOP Architecture", symbol: "Oo", atomicNumber: 30, family: "Core & Concepts", projects: ["Modular Component Design"] },
  { id: "dbms", name: "DBMS", symbol: "Db", atomicNumber: 31, family: "Core & Concepts", projects: ["Schema Normalization & ACID"] },
  { id: "os", name: "Operating Systems", symbol: "Os", atomicNumber: 32, family: "Core & Concepts", projects: ["Concurrency & Resource Handling"] }
];

export const SKILL_FAMILIES = [
  "All",
  "Languages",
  "Frontend",
  "Backend",
  "Databases",
  "Cloud & Tools",
  "AI / ML",
  "Core & Concepts"
] as const;

export const PROJECTS: ProjectItem[] = [
  {
    id: "apex-engineering",
    index: "01",
    title: "Apex Engineering",
    kicker: "Production B2B Web Platform",
    description:
      "A high-performance B2B platform engineered on Next.js App Router and TypeScript, serving 62 statically generated routes from Vercel's edge network to minimize time to first byte.",
    features: [
      "Engineered 62 statically generated routes including dynamic product and blog routes from Vercel's edge network.",
      "Optimized client-side JavaScript by hydrating React only where interactive, keeping static pages fully pre-rendered.",
      "Implemented server-side metadata generation, automated canonical URLs, dynamic XML sitemaps, and a 20+ FAQ filter."
    ],
    tech: ["Next.js App Router", "React", "TypeScript", "Vercel", "Tailwind CSS"],
    url: "https://apexengineering.org.in/",
    uiType: "b2b-platform"
  },
  {
    id: "nexacro",
    index: "02",
    title: "Nexacro",
    kicker: "AI Acrosome Intactness Analysis Platform",
    description:
      "A machine learning classification system distinguishing acrosome-intact from damaged sperm cells, automating manual laboratory assessments across web and Android clients.",
    features: [
      "Developed a machine learning classification system distinguishing acrosome-intact from damaged sperm cells.",
      "Automated manual laboratory assessment processes to improve analytical consistency and clinical throughput.",
      "Built web and Android clients against a shared backend so a single analysis service supports both platforms."
    ],
    tech: ["Python", "React.js", "MongoDB", "Android Studio", "Machine Learning"],
    url: "https://nexacro.in",
    uiType: "ai-analysis"
  },
  {
    id: "laundex",
    index: "03",
    title: "Laundex",
    kicker: "Laundry Management Web Application",
    description:
      "A full-stack hostel laundry booking and order-tracking system designed with a responsive mobile-first UI for campus operations.",
    features: [
      "Designed and shipped a full-stack booking and order-tracking system for hostel laundry operations.",
      "Engineered responsive mobile-first UI for seamless student booking and real-time order status tracking.",
      "Built on React, JavaScript and MongoDB for low-latency operational management."
    ],
    tech: ["React", "JavaScript", "MongoDB", "Responsive UI"],
    url: "https://laundex.in",
    uiType: "booking-management"
  }
];

export const EDUCATION: EducationItem = {
  institution: "Saveetha School of Engineering, Chennai",
  degree: "Bachelor of Engineering, Computer Science (Artificial Intelligence)",
  period: "Expected May 2028",
  graduationDate: "May 2028",
  cgpa: "9.22 / 10",
  coursework: [
    "Data Structures and Algorithms",
    "Object-Oriented Programming",
    "Database Management Systems",
    "Operating Systems"
  ]
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "iic-ambassador",
    year: "2026",
    title: "Innovative Student Ambassador",
    company: "Institution's Innovation Council (IIC)",
    type: "leadership",
    period: "March 2026 – Present",
    details: [
      "Advancing innovation initiatives, student hackathon engagements, and collaborative tech projects across campus."
    ]
  },
  {
    id: "gdg-simats",
    year: "2025",
    title: "Vice President",
    company: "Google Developer Group SIMATS",
    type: "leadership",
    period: "2025 – Present",
    tech: ["Cloud", "Flutter", "TensorFlow"],
    details: [
      "Ran technical workshops on Cloud, Flutter and TensorFlow.",
      "Mentored university students through hackathons and competitive coding events."
    ]
  },
  {
    id: "hackathon-club-simats",
    year: "2025",
    title: "Research and Innovation Lead",
    company: "Hackathon Club SIMATS",
    type: "leadership",
    period: "2025 – Present",
    details: [
      "Designed real-world problem statements for campus hackathons.",
      "Mentored student teams through complete project ideation and rapid software development."
    ]
  },
  {
    id: "lins-infotech",
    year: "2024",
    title: "Founding Software Engineer",
    company: "Lin's InfoTech (AI Solutions Startup)",
    type: "experience",
    period: "December 2024 – Present",
    location: "Chennai, India",
    website: "https://linsinfotech.in",
    tech: ["Next.js", "TypeScript", "Node.js", "Express.js", "Python", "FastAPI", "MongoDB", "LangChain", "Gemini API"],
    details: [
      "Architected and shipped the company platform as a three-layer microservices application separating a Next.js client, a Node.js/Express REST API and an isolated Python/FastAPI service, so each layer deploys independently.",
      "Implemented an Express API gateway that authenticates and proxies AI requests to the FastAPI microservice, keeping the LLM service and API credentials off the public surface.",
      "Built REST modules for authentication, session handling and lead capture on Mongoose schemas for MongoDB CRUD; hardened backend with Helmet, scoped CORS and request rate limiting.",
      "Integrated LangChain with Google Gemini API to serve a streaming chatbot and asynchronous document-generation endpoints.",
      "Deployed full stack to production on Vercel and own it end-to-end — architecture decisions, live debugging, and dynamic sitemap and metadata generation."
    ]
  },
  {
    id: "saveetha-education",
    year: "2024",
    title: "B.E. Computer Science (Artificial Intelligence)",
    company: "Saveetha School of Engineering, Chennai",
    type: "education",
    period: "2024 – Expected May 2028",
    details: [
      "CGPA: 9.22 / 10",
      "Relevant Coursework: Data Structures and Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems."
    ]
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "cgpa",
    index: "01 / 06",
    metric: "9.22",
    metricNumber: 9.22,
    metricSuffix: " / 10",
    title: "Academic Excellence",
    caption: "Saveetha School of Engineering",
    detail: "B.E. Computer Science (AI) with a cumulative grade point average of 9.22 / 10.",
    category: "Academics"
  },
  {
    id: "routes",
    index: "02 / 06",
    metric: "62",
    metricNumber: 62,
    metricSuffix: " Routes",
    title: "Edge Pre-Rendering",
    caption: "Apex Engineering B2B Platform",
    detail: "62 statically generated routes deployed to Vercel edge network for minimal TTFB.",
    category: "Production",
    brandSlug: "vercel"
  },
  {
    id: "accuracy",
    index: "03 / 06",
    metric: "92%",
    metricNumber: 92,
    metricSuffix: "%",
    title: "Parkinson's Screening Accuracy",
    caption: "IEEE Conference Paper (ICFTS 2025)",
    detail: "Screening from spiral hand sketches using MobileNet with KNN classification, published in IEEE Xplore.",
    category: "AI Research",
    brandSlug: "ieee"
  },
  {
    id: "hackathon-1st",
    index: "04 / 06",
    metric: "1st",
    metricNumber: 1,
    metricSuffix: "st Prize",
    title: "12-Hour Hackathon Winner",
    caption: "Tutor–Student Matching Platform",
    detail: "Built full-stack matching platform with real-time chat and course enrollment using React, Node.js, and MongoDB.",
    category: "Hackathons"
  },
  {
    id: "hackathon-3rd",
    index: "05 / 06",
    metric: "3rd",
    metricNumber: 3,
    metricSuffix: "rd Prize",
    title: "24-Hour Hackathon Winner",
    caption: "Fake News Detection Platform",
    detail: "Built web application integrating external classification APIs with Node.js and MongoDB within 24 hours.",
    category: "Hackathons"
  },
  {
    id: "awards",
    index: "06 / 06",
    metric: "2025",
    metricNumber: 2025,
    metricSuffix: "",
    title: "Torch Bearer & Best Poster",
    caption: "Tech Star Summit & Honors",
    detail: "Recipient of Best Poster Award at Tech Star Summit and the Torch Bearer Award 2025.",
    category: "Leadership"
  }
];

export const CERTIFICATIONS: CertificationItem[] = [];
