import type { Project, Experience, ResearchPaper, Leadership, Award, SkillCategory, NavigationDoor } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'VEERA VAISHNAVI K',
  title: 'Software Engineer & AI Developer',
  subtitle: 'B.E. Computer Science (Artificial Intelligence)',
  institution: 'Saveetha School of Engineering, Chennai',
  graduation: 'Expected May 2028',
  cgpa: '9.22 / 10',
  tagline: 'One identity. Multiple dimensions. Infinite possibilities.',
  editorialIntro: 'More than a developer. A problem solver.',
  bio: `I'm Veera Vaishnavi K, a Computer Science (Artificial Intelligence) student passionate about software engineering, intelligent systems and research. I enjoy transforming complex ideas into practical digital solutions, building useful products and continuously exploring emerging technologies.`,
  location: 'Chennai, Tamil Nadu, India',
  email: 'vaishureddy26096@gmail.com',
  github: 'https://github.com/VeeraVaishnaviK',
  linkedin: 'https://www.linkedin.com/in/veera-vaishnavi/',
  resumePdfPath: '/resume.pdf',
  resumeDownloadName: 'Veera_Vaishnavi_K_Resume.pdf',
  profileImagePath: '/images/veera-profile.jpg',
  coursework: [
    'Data Structures and Algorithms',
    'Object-Oriented Programming',
    'Database Management Systems',
    'Operating Systems',
    'Artificial Intelligence Architecture',
    'Deep Learning Principles'
  ]
};

export const VEE_DIALOGUE = {
  text: "Hey there! Welcome to Beyond the Code. I'm VEE, your guide. Today, I'm introducing you to Veera Vaishnavi — a software engineer, AI enthusiast and researcher who enjoys turning challenging ideas into intelligent solutions. Ready to explore her world?",
  characterName: "VEE",
  role: "Interactive Digital Guide"
};

export const NAVIGATION_DOORS: NavigationDoor[] = [
  {
    id: 'door-builder',
    number: '01',
    title: 'THE BUILDER',
    subtitle: 'Turning ideas into working products.',
    theme: 'Violet',
    accentColor: '#9275FF',
    glowColor: 'rgba(146, 117, 255, 0.45)',
    targetSection: '#projects',
    tags: ['Full-Stack', 'Systems Architecture', 'Production B2B', 'Vercel Edge'],
    icon: 'Hammer'
  },
  {
    id: 'door-intelligence',
    number: '02',
    title: 'THE INTELLIGENCE',
    subtitle: 'Building intelligence into technology.',
    theme: 'Blue',
    accentColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.45)',
    targetSection: '#ai-engineering',
    tags: ['Computer Vision', 'LangChain', 'Gemini API', 'ML Workflows'],
    icon: 'Cpu'
  },
  {
    id: 'door-researcher',
    number: '03',
    title: 'THE RESEARCHER',
    subtitle: 'Exploring problems through research.',
    theme: 'Green',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    targetSection: '#research',
    tags: ['IEEE Xplore', 'MobileNet', 'KNN', 'Bio-Signal Diagnostics'],
    icon: 'Microscope'
  },
  {
    id: 'door-leader',
    number: '04',
    title: 'THE LEADER',
    subtitle: 'Leading people, ideas and innovation.',
    theme: 'Gold',
    accentColor: '#C7A66A',
    glowColor: 'rgba(199, 166, 106, 0.45)',
    targetSection: '#leadership',
    tags: ['GDG SIMATS', 'Hackathon Lead', 'IIC Ambassador', 'Mentorship'],
    icon: 'Crown'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Programming Languages',
    description: 'Core languages utilized for system implementation, data algorithms, and automation.',
    skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C', 'SQL'],
    color: '#9275FF'
  },
  {
    category: 'Frontend Engineering',
    description: 'Building responsive, reactive, and fluid user interfaces with modern toolchains.',
    skills: ['React', 'Next.js (App Router)', 'HTML5', 'CSS3', 'Tailwind CSS'],
    color: '#3B82F6'
  },
  {
    category: 'Backend & System APIs',
    description: 'Scalable service architectures, microservices, and secure API gateways.',
    skills: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'Microservices Architecture'],
    color: '#10B981'
  },
  {
    category: 'Databases & Storage',
    description: 'Structured relational data and scalable document persistence.',
    skills: ['MongoDB', 'Mongoose ODM', 'Relational SQL'],
    color: '#F59E0B'
  },
  {
    category: 'AI & Machine Learning',
    description: 'Deep learning classification models, LLM orchestration, and streaming AI agents.',
    skills: ['MobileNet', 'KNN', 'LangChain', 'Google Gemini API'],
    color: '#EC4899'
  },
  {
    category: 'Cloud & Developer Platforms',
    description: 'Cloud hosting, edge deployments, version control, and IDE workflows.',
    skills: ['Google Cloud Platform', 'Vercel', 'Git', 'GitHub', 'VS Code', 'Android Studio'],
    color: '#C7A66A'
  }
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: 'lins-infotech',
    role: 'Founding Software Engineer',
    company: "Lin's InfoTech (AI Solutions Startup)",
    companyUrl: 'https://linsinfotech.in',
    location: 'Chennai, India',
    period: 'December 2024 – Present',
    description: 'Working on full-stack application development and AI-powered solutions, contributing to system architecture, backend services and intelligent application features.',
    responsibilities: [
      'Architected and shipped the company platform as a three-layer microservices application separating a Next.js client, a Node.js/Express REST API and an isolated Python/FastAPI service, so each layer deploys independently.',
      'Implemented an Express API gateway that authenticates and proxies AI requests to the FastAPI microservice, keeping the LLM service and API credentials off the public surface.',
      'Built REST modules for authentication, session handling and lead capture on Mongoose schemas for MongoDB CRUD; hardened the backend with Helmet, a scoped CORS policy and request rate limiting.',
      'Integrated LangChain with the Google Gemini API to serve a streaming chatbot and asynchronous document-generation endpoints.',
      'Deployed the full stack to production on Vercel and own it end to end — architecture decisions, debugging live issues, and dynamic sitemap and metadata generation.'
    ],
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'Express.js', 'Python', 'FastAPI', 'MongoDB', 'LangChain', 'Google Gemini API', 'Vercel']
  }
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'apex-engineering',
    title: 'Apex Engineering',
    subtitle: 'Production B2B Web Platform',
    tagline: 'High-performance corporate platform with dynamic edge routing and surgical React hydration.',
    liveUrl: 'https://apexengineering.org.in',
    category: 'production-b2b',
    description: 'A production-oriented engineering website built with a focus on performance, SEO, and scalable content architecture for B2B industrial reach.',
    problemSolved: 'Industrial web clients suffered from bloated client-side JavaScript bundles and slow time-to-first-byte (TTFB), hurting organic search rankings and lead conversion.',
    technologies: ['Next.js App Router', 'React', 'TypeScript', 'Vercel Edge', 'Tailwind CSS'],
    highlights: [
      'Engineered 62 statically generated routes, including dynamic product and blog routes, served from Vercel edge network to minimise time to first byte.',
      'Optimized client-side JavaScript by hydrating React only where components are interactive, keeping static pages fully pre-rendered.',
      'Implemented server-side metadata generation, automated canonical URLs, dynamic XML sitemap generation and a reusable client-side filter over 20+ FAQ records.'
    ],
    featured: true,
    accentColor: '#9275FF'
  },
  {
    id: 'nexacro',
    title: 'Nexacro',
    subtitle: 'AI Acrosome Intactness Analysis Platform',
    tagline: 'Computer vision pipeline classifying sperm cell membrane integrity to automate labor-intensive cytology.',
    liveUrl: 'https://nexacro.in',
    category: 'ai-cv',
    description: 'An AI-assisted application for analysing acrosome integrity from microscope images, accelerating cytological analysis while reducing human manual counting error.',
    problemSolved: 'Manual laboratory assessment of sperm cell acrosome intactness is time-consuming, prone to subjectivity, and creates analytical bottlenecks in biological evaluations.',
    technologies: ['Python', 'React.js', 'MongoDB', 'Android Studio', 'Computer Vision ML'],
    highlights: [
      'Developed a machine learning classification system distinguishing acrosome-intact from damaged sperm cells, automating a manual laboratory assessment.',
      'Engineered image preprocessing and feature extraction pipelines to handle microscopic sample variations.',
      'Built web and Android clients against a shared backend so a single analysis service supports both platforms simultaneously.'
    ],
    featured: true,
    accentColor: '#3B82F6'
  },
  {
    id: 'laundex',
    title: 'Laundex',
    subtitle: 'Hostel Laundry Management Platform',
    tagline: 'Mobile-first booking, slot management, and order lifecycle tracking for campus hostel communities.',
    liveUrl: 'https://laundex.in',
    category: 'fullstack-web',
    description: 'A full-stack booking and order-tracking system tailored for campus hostel laundry operations, eliminating lost garments and scheduling conflicts.',
    problemSolved: 'Physical token management and paper logs in high-density student hostels resulted in lost items, uncoordinated laundry batches, and long collection queues.',
    technologies: ['React', 'JavaScript', 'Node.js', 'Express', 'MongoDB'],
    highlights: [
      'Designed and shipped a full-stack booking and order-tracking system for hostel laundry operations, with a responsive mobile-first UI.',
      'Implemented order status state machines from pickup to washing, drying, and delivery notification.',
      'Engineered user authentication, hostel slot reservation limits, and digital receipts.'
    ],
    featured: true,
    accentColor: '#10B981'
  }
];

export const RESEARCH_DATA: ResearchPaper = {
  id: 'parkinsons-icfts-2025',
  title: "Parkinson's Disease Screening from Spiral Hand Sketches",
  publication: 'IEEE Conference Paper, ICFTS 2025',
  venue: 'IEEE Xplore',
  year: 2025,
  methods: ['MobileNet Deep Feature Extraction', 'K-Nearest Neighbours (KNN) Classifier'],
  reportedAccuracy: 'Over 92% accuracy',
  objective: 'Provide a non-invasive, accessible preliminary screening mechanism for early signs of Parkinsonian tremors through digital hand-drawn Archimedean spiral sketches.',
  keyFindings: [
    'Fine-motor tremors leave distinct kinematic frequency anomalies in hand-drawn spiral line thickness and smoothness.',
    'MobileNet extracted high-dimensional spatial representations from spiral raster images without heavy compute constraints.',
    'KNN classifier delivered superior discrimination on subtle trajectory deviations, validated at >92% screening accuracy.'
  ],
  verificationNote: 'Published in IEEE Xplore (ICFTS 2025). Verification reference documented via conference proceedings.'
};

export const LEADERSHIP_DATA: Leadership[] = [
  {
    id: 'gdg-simats',
    role: 'Vice President',
    organization: 'Google Developer Group (GDG) On Campus SIMATS',
    period: '2025 – Present',
    description: 'Leading developer community initiatives, spearheading technical masterclasses, and fostering student developer engagement across campus.',
    initiatives: [
      'Ran technical hands-on workshops on Google Cloud Platform, Flutter cross-platform development, and TensorFlow machine learning.',
      'Mentored student cohorts through state and national hackathons and coding competitions.',
      'Coordinated technical roadmaps, speaker sessions, and developer outreach programs.'
    ],
    tag: 'Community Leadership'
  },
  {
    id: 'hackathon-club-simats',
    role: 'Research and Innovation Lead',
    organization: 'Hackathon Club SIMATS',
    period: '2025 – Present',
    description: 'Architecting competitive engineering tracks, formulating real-world industry problem statements, and reviewing technical architecture.',
    initiatives: [
      'Designed real-world problem statements across AI, web systems, and automation for campus-wide hackathons.',
      'Mentored over a dozen student teams through rapid prototyping, API design, and pitch presentation.',
      'Established engineering evaluation rubrics prioritizing production-readiness over basic prototypes.'
    ],
    tag: 'Innovation & Research'
  },
  {
    id: 'iic-ambassador',
    role: 'Innovative Student Ambassador',
    organization: "Institution's Innovation Council (IIC)",
    period: 'March 2026 – Present',
    description: "Championing institutional innovation frameworks, startup culture, and technology transfer initiatives aligned with national innovation mandates.",
    initiatives: [
      'Promoted patent awareness, student-led R&D ventures, and interdisciplinary engineering challenges.',
      'Liaised between student innovators and university incubation centers.'
    ],
    tag: 'Institutional Innovation'
  }
];

export const AWARDS_DATA: Award[] = [
  {
    id: 'hackathon-1st',
    title: '1st Prize Winner',
    event: '12-Hour Intensive Hackathon',
    year: '2025',
    description: 'Engineered a real-time tutor–student matching and mentorship platform featuring live messaging, course enrollment, and schedule booking built with React, Node.js, and MongoDB.',
    badge: '1st Prize',
    highlightColor: '#C7A66A'
  },
  {
    id: 'hackathon-3rd',
    title: '3rd Prize Winner',
    event: '24-Hour National Hackathon',
    year: '2025',
    description: 'Developed an automated fake news detection web application integrating external NLP classification APIs with Node.js and MongoDB backend.',
    badge: '3rd Prize',
    highlightColor: '#9275FF'
  },
  {
    id: 'best-poster',
    title: 'Best Poster Award',
    event: 'Tech Star Summit',
    year: '2025',
    description: 'Awarded for exceptional technical clarity, research depth, and visual presentation in emerging technology systems.',
    badge: 'Best Poster',
    highlightColor: '#10B981'
  },
  {
    id: 'torch-bearer',
    title: 'Torch Bearer Award',
    event: 'SIMATS University Annual Honors',
    year: '2025',
    description: 'Recognized for distinguished academic performance (9.22 CGPA), student leadership, and continuous contributions to university technology initiatives.',
    badge: 'Honor Award',
    highlightColor: '#F59E0B'
  }
];

export const LEARNING_JOURNEY = [
  {
    title: 'AI Engineering & Agentic Workflows',
    description: 'Deepening hands-on exploration of multi-agent architectures, streaming LLM interfaces, and vector knowledge stores.'
  },
  {
    title: 'Advanced Data Structures & Algorithms',
    description: 'Rigorous algorithmic problem solving in graph theory, dynamic programming, and optimal system resource scaling.'
  },
  {
    title: 'Distributed Systems & Cloud Architecture',
    description: 'Designing fault-tolerant microservices, event-driven pipelines, caching layers, and high-concurrency gateways.'
  },
  {
    title: 'Full-Stack Machine Learning Systems',
    description: 'End-to-end operationalization of computer vision and NLP models with tight API contracts and edge delivery.'
  }
];
