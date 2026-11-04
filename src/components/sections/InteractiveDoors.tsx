"use client";

import React, { useState, useEffect, useRef } from "react";
import { scrollToTarget } from "@/lib/scroll";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { useTheme } from "@/lib/theme";
import { TechLogo } from "@/components/ui/TechLogo";

interface InsideItem {
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  metrics?: string;
  badge?: string;
  tech?: string[];
  links?: { label: string; href: string }[];
  isPhotoPlaceholder?: boolean;
  placeholderHint?: string;
}

interface DoorData {
  id: string;
  number: string;
  category: string;
  plaqueTitle: string;
  title: string;
  subtitle: string;
  insideHeading: string;
  insideSubtitle: string;
  accentColor: string;
  glowColor: string;
  floorSpillColor: string;
  doorBgDark: string;
  doorBgLight: string;
  frameBgDark: string;
  frameBgLight: string;
  bullets: string[];
  insideItems: InsideItem[];
}

const DOORS: DoorData[] = [
  {
    id: "projects",
    number: "01",
    category: "Production Platforms",
    plaqueTitle: "PROJECTS",
    title: "Projects",
    subtitle: "PRODUCTION PLATFORMS & FULL-STACK SYSTEMS",
    insideHeading: "Projects & Production Systems",
    insideSubtitle:
      "Websites, production platforms, and distributed systems built end to end: from architectural foundation and microservices to responsive front-end, SEO, and sub-100ms TTFB.",
    accentColor: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.6)",
    floorSpillColor: "rgba(56, 189, 248, 0.35)",
    doorBgDark: "#152438",
    doorBgLight: "#1b2c44",
    frameBgDark: "#23334d",
    frameBgLight: "#f0ece1",
    bullets: [
      "Apex Engineering: 62 edge pre-rendered routes on Vercel Edge network",
      "Lin's InfoTech: 3-tier microservices with Next.js, FastAPI & LangChain",
      "Laundex: Mobile-first full-stack booking and order tracking platform",
      "Selective React hydration, dynamic XML sitemaps & sub-100ms TTFB",
    ],
    insideItems: [
      {
        tag: "PRODUCTION PLATFORM · LIVE",
        title: "Apex Engineering",
        subtitle: "Industrial Machinery Catalog & Engineering Services",
        description:
          "Modern industrial machinery catalog serving global engineering clients. Architected with 62 edge pre-rendered dynamic routes on Vercel Edge network, Incremental Static Regeneration (ISR), selective React hydration, and structured JSON-LD schemas.",
        metrics: "62 Edge Routes · Sub-100ms TTFB · 99.8% Core Web Vitals",
        tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
        links: [
          { label: "Live Deployment ↗", href: "https://apex-engineering-tau.vercel.app/" },
          { label: "GitHub ↗", href: "https://github.com/veeravaishnavi/apex-engineering" },
        ],
      },
      {
        tag: "FULL-STACK PLATFORM · ENTERPRISE",
        title: "Lin's InfoTech",
        subtitle: "Corporate IT Solutions & Cloud Consulting",
        description:
          "Enterprise 3-tier microservices architecture featuring client project portals, automated quotation pipelines, and an integrated LangChain-powered conversational AI agent with FastAPI inference endpoints.",
        metrics: "3-Tier Microservices · FastAPI · LangChain RAG",
        tech: ["Next.js", "FastAPI", "Python", "LangChain", "PostgreSQL"],
        links: [
          { label: "Live System ↗", href: "https://lins-infotech.vercel.app/" },
          { label: "GitHub ↗", href: "https://github.com/veeravaishnavi/lins-infotech" },
        ],
      },
      {
        tag: "MOBILE-FIRST WEB APP · LOGISTICS",
        title: "Laundex",
        subtitle: "Smart On-Demand Laundry & Dry Cleaning Logistics",
        description:
          "Mobile-first on-demand booking, pickup scheduling, and order tracking platform with real-time status updates, slot booking, automated invoice generation, and responsive touch controls.",
        metrics: "Mobile-First PWA · Real-Time Tracking · Automated Billing",
        tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
        links: [
          { label: "Live App ↗", href: "https://laundex-three.vercel.app/" },
          { label: "GitHub ↗", href: "https://github.com/veeravaishnavi/laundex" },
        ],
      },
      {
        tag: "CREATIVE WEB EXPERIENCE · 3D INTERACTION",
        title: "Beyond The Code",
        subtitle: "Spatial 3D Developer Portfolio & Interaction Engine",
        description:
          "Architectural interactive door passageways, vintage mechanical odometer time machine, periodic table skill matrix, and custom Lenis inertia physics. Designed with precision typography, responsive fluid layouts, and dual theme lighting.",
        metrics: "60 FPS CSS 3D · Custom Physics · Dual Theme System",
        tech: ["Next.js 15", "Tailwind CSS", "CSS 3D Transforms", "TypeScript"],
      },
      {
        tag: "EXTENSIBLE REPOSITORY",
        title: "Additional Projects In Pipeline",
        subtitle: "Further production systems and applications will be added here",
        description:
          "Ongoing open-source contributions, high-throughput distributed tools, and client platforms currently in active staging.",
        isPhotoPlaceholder: true,
        placeholderHint: "More project builds and live demo previews will be added here.",
      },
    ],
  },
  {
    id: "research",
    number: "02",
    category: "AI Research",
    plaqueTitle: "RESEARCH & PUB",
    title: "Research & Publications",
    subtitle: "CLINICAL AI & APPLIED MACHINE LEARNING",
    insideHeading: "Clinical AI & Peer-Reviewed Research",
    insideSubtitle:
      "Deep learning diagnostic models, medical computer vision pipelines, and peer-reviewed conference publications engineered for real-world clinical impact.",
    accentColor: "#c084fc",
    glowColor: "rgba(192, 132, 252, 0.6)",
    floorSpillColor: "rgba(192, 132, 252, 0.35)",
    doorBgDark: "#321d30",
    doorBgLight: "#3c223a",
    frameBgDark: "#452943",
    frameBgLight: "#f0ece1",
    bullets: [
      "IEEE Xplore published conference paper (ICFTS 2025 proceedings)",
      "92% Parkinson's screening accuracy with MobileNet & KNN classifier",
      "Nexacro: Automated AI acrosome intactness classification platform",
      "Unified ML inference API serving Android Studio client & web app",
    ],
    insideItems: [
      {
        tag: "PEER-REVIEWED PUBLICATION · IEEE XPLORE",
        title: "Parkinson's Disease Motor Symptom Screening with MobileNet & KNN",
        subtitle: "International Conference on Frontiers of Technology and Science (ICFTS 2025)",
        description:
          "Authored and published peer-reviewed research presenting a lightweight, non-invasive computer vision screening framework for Parkinson's disease motor tremors. Evaluated MobileNet feature extraction against diverse classifiers, achieving 92% screening accuracy with low-latency inference suitable for point-of-care mobile screening.",
        metrics: "92% Accuracy · MobileNet V2 · Published in IEEE Xplore",
        tech: ["PyTorch", "MobileNet", "OpenCV", "Scikit-Learn", "Python"],
        links: [
          { label: "IEEE Xplore Proceedings ↗", href: "https://ieeexplore.ieee.org" },
        ],
      },
      {
        tag: "BIOMEDICAL AI PLATFORM · MEDICAL IMAGING",
        title: "Nexacro — Automated Acrosome Intactness Assessment",
        subtitle: "Clinical Computer Vision for Reproductive Diagnostics",
        description:
          "Designed an automated medical imaging platform that processes high-magnification microscopic sperm cell samples to classify acrosome membrane intactness. Replaces subjective, labor-intensive manual semen analysis with consistent algorithmic scoring.",
        metrics: "Automated Cell Segmentation · Real-time Microscopy Inference",
        tech: ["Convolutional Neural Networks", "TensorFlow", "FastAPI", "React"],
      },
      {
        tag: "SYSTEMS RESEARCH & GATEWAY INFRASTRUCTURE",
        title: "Unified ML Inference Architecture for Cross-Platform Healthcare",
        subtitle: "High-Throughput Diagnostic API Gateway",
        description:
          "Engineered an optimized asynchronous inference gateway serving both Android native client applications and web diagnostic dashboards with unified model serialization (ONNX/TFLite) and under 150ms round-trip latency.",
        metrics: "< 150ms Round-Trip · ONNX Runtime · Android Studio SDK",
        tech: ["FastAPI", "ONNX", "TFLite", "Docker", "Android SDK"],
      },
      {
        tag: "RESEARCH PIPELINE",
        title: "Upcoming Preprints & Datasets",
        subtitle: "Further medical research publications and preprints will be added here",
        description:
          "Clinical validation studies, dataset curation methodologies, and deep learning architectures currently under peer review.",
        isPhotoPlaceholder: true,
        placeholderHint: "Additional conference papers, preprints, and citation metrics will be added here.",
      },
    ],
  },
  {
    id: "achievements",
    number: "03",
    category: "Honors & Awards",
    plaqueTitle: "ACHIEVEMENTS",
    title: "Achievements & Honors",
    subtitle: "HACKATHONS, ACADEMIC EXCELLENCE & AWARDS",
    insideHeading: "Achievements, Hackathons & Honors",
    insideSubtitle:
      "Competitive engineering hackathon championships, university academic distinctions, and innovation summit awards earned through rigorous technical execution.",
    accentColor: "#34d399",
    glowColor: "rgba(52, 211, 153, 0.6)",
    floorSpillColor: "rgba(52, 211, 153, 0.35)",
    doorBgDark: "#1c3327",
    doorBgLight: "#546e5a",
    frameBgDark: "#264234",
    frameBgLight: "#f0ece1",
    bullets: [
      "1st Prize Winner: 12-Hour Hackathon (Tutor–Student Matching Platform)",
      "3rd Prize Winner: 24-Hour Hackathon (Fake News Classification System)",
      "9.22 / 10 CGPA in B.E. Computer Science (Artificial Intelligence)",
      "Torch Bearer Award 2025 & Best Poster Award at Tech Star Summit",
    ],
    insideItems: [
      {
        tag: "HACKATHON CHAMPIONSHIP · 1ST PRIZE",
        title: "1st Prize Winner — 12-Hour National Hackathon",
        subtitle: "SIMATS Engineering State Level Hackathon",
        description:
          "Conceived, architected, and shipped a functional real-time tutor-to-student matching platform in under 12 hours. Led the system architecture, database schema, and live frontend demonstration before a panel of industry judges.",
        badge: "🥇 1st Place Champion",
        metrics: "12-Hour Sprint · Live WebSocket Matchmaking · 1st Place",
        tech: ["Next.js", "FastAPI", "WebSockets", "Tailwind CSS"],
      },
      {
        tag: "HACKATHON DISTINCTION · 3RD PRIZE",
        title: "3rd Prize Winner — 24-Hour National Hackathon",
        subtitle: "Inter-University Technology Sprint",
        description:
          "Built an automated multimodal Fake News & Misinformation Detection platform combining linguistic analysis with web claim verification under a continuous 24-hour sprint.",
        badge: "🥉 3rd Place Winner",
        metrics: "24-Hour Continuous Sprint · Multimodal NLP Verification",
        tech: ["Python", "HuggingFace Transformers", "FastAPI", "React"],
      },
      {
        tag: "ACADEMIC EXCELLENCE · UNIVERSITY MERIT",
        title: "9.22 / 10 CGPA — B.E. Computer Science (AI)",
        subtitle: "SIMATS Engineering · Department of Artificial Intelligence",
        description:
          "Maintained a cumulative grade point average of 9.22 / 10 across all semesters with distinction in Machine Learning, Distributed Systems, Algorithms, and Software Engineering.",
        badge: "🎓 Top 5% of Class",
        metrics: "9.22 / 10.0 Cumulative Grade Point Average",
      },
      {
        tag: "INSTITUTIONAL MERIT AWARD",
        title: "Torch Bearer Award 2025",
        subtitle: "SIMATS Engineering University Annual Honors",
        description:
          "Conferred for exemplary leadership, technological contribution, and representing the university at state and national competitions.",
        badge: "🏆 Torch Bearer 2025",
      },
      {
        tag: "RESEARCH PRESENTATION DISTINCTION",
        title: "Best Poster Award — Tech Star Summit",
        subtitle: "International Research & Engineering Summit",
        description:
          "Awarded for superior technical presentation and visualization of clinical machine learning research in diagnostic computer vision.",
        badge: "⭐ Best Poster Award",
      },
      {
        tag: "VISUAL GALLERY & CERTIFICATE SHOWCASE",
        title: "Ceremony Pictures & Official Certificates",
        subtitle: "Award ceremony photographs and verification credentials will be added here",
        description:
          "Visual gallery showcasing hackathon victory moments, award ceremonies, and verified credential certificates.",
        isPhotoPlaceholder: true,
        placeholderHint: "Pictures and official award certificates will be added here.",
      },
    ],
  },
  {
    id: "leadership",
    number: "04",
    category: "Leadership & Community",
    plaqueTitle: "LEADERSHIP",
    title: "Leadership & Community",
    subtitle: "STUDENT MENTORSHIP & CAMPUS INNOVATION",
    insideHeading: "Leadership, Community & Mentorship",
    insideSubtitle:
      "Directing student developer communities, fostering campus innovation incubation, and mentoring peer engineering teams across cloud, AI, and competitive hackathons.",
    accentColor: "#fbbf24",
    glowColor: "rgba(251, 191, 36, 0.6)",
    floorSpillColor: "rgba(251, 191, 36, 0.35)",
    doorBgDark: "#3a1e14",
    doorBgLight: "#8c4a2a",
    frameBgDark: "#4d291b",
    frameBgLight: "#f0ece1",
    bullets: [
      "Innovative Student Ambassador: Institution's Innovation Council (IIC 2026)",
      "Vice President: Google Developer Group SIMATS (GDG)",
      "Research & Innovation Lead: Hackathon Club SIMATS",
      "Hands-on student mentorship & technical workshops across campus",
    ],
    insideItems: [
      {
        tag: "CAMPUS EXECUTIVE LEADERSHIP",
        title: "Vice President — Google Developer Group (GDG) SIMATS",
        subtitle: "Google Developer Groups On Campus · 2025 – Present",
        description:
          "Directing student technical activities and workshops on Google Cloud, Flutter development, and TensorFlow ML pipelines. Curated hands-on study jams and hackathon preparatory bootcamps for 500+ student developers across departments.",
        badge: "🌐 GDG Vice President",
        metrics: "500+ Student Developers Mentored · 12 Technical Workshops",
        tech: ["Google Cloud", "Flutter", "TensorFlow", "Firebase"],
      },
      {
        tag: "NATIONAL INNOVATION AMBASSADOR",
        title: "Innovative Student Ambassador — Institution's Innovation Council (IIC)",
        subtitle: "Ministry of Education Innovation Cell, Govt. of India · 2026 – Present",
        description:
          "Driving grassroots innovation initiatives, student hackathon engagements, and collaborative technology incubation projects across campus.",
        badge: "🇮🇳 MoE Innovation Ambassador",
        metrics: "National Innovation Cell Liaison · Student Startup Mentoring",
      },
      {
        tag: "TECHNICAL MENTORSHIP & STRATEGY",
        title: "Research & Innovation Lead — Hackathon Club SIMATS",
        subtitle: "Hackathon Club · 2025 – Present",
        description:
          "Guiding junior engineering teams through competitive ideation, rapid prototyping, and pitch deck presentations for national level hackathons.",
        badge: "🚀 Research & Innovation Lead",
        metrics: "10+ Hackathon Teams Coached · State & National Finalists",
      },
      {
        tag: "COMMUNITY ACTIVITIES & EVENT GALLERY",
        title: "Leadership Activities & Workshop Gallery",
        subtitle: "Photographs of workshops, developer summits, and student mentoring sessions will be added here",
        description:
          "Visual records of Google Developer Group hands-on labs, campus hackathons, student mentorship circles, and innovation summits.",
        isPhotoPlaceholder: true,
        placeholderHint: "Leadership activity pictures and event photo galleries will be added here.",
      },
    ],
  },
];

export function InteractiveDoors() {
  const prefersReduced = usePrefersReducedMotion();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [hoveredDoorId, setHoveredDoorId] = useState<string | null>(null);
  const [selectedDoorId, setSelectedDoorId] = useState<string>("projects");
  const [activeInsideDoor, setActiveInsideDoor] = useState<DoorData | null>(null);
  const [isZoomingIn, setIsZoomingIn] = useState(false);
  const [zoomingDoorId, setZoomingDoorId] = useState<string | null>(null);

  // Mark door section / inside door active on html root so InteractiveLamp rope hides
  useEffect(() => {
    if (activeInsideDoor) {
      document.documentElement.setAttribute("data-in-doors", "true");
    } else {
      document.documentElement.removeAttribute("data-in-doors");
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("doorStateChange"));
    }
    return () => {
      document.documentElement.removeAttribute("data-in-doors");
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("doorStateChange"));
      }
    };
  }, [activeInsideDoor]);

  const sectionRef = useRef<HTMLElement>(null);
  const insideContainerRef = useRef<HTMLDivElement>(null);

  // Active door data when on the wall
  const activeDoor = DOORS.find((d) => d.id === (hoveredDoorId || selectedDoorId)) || DOORS[0];
  const activeDoorIndex = DOORS.findIndex((d) => d.id === activeDoor.id);
  const isTextOnRight = activeDoorIndex <= 1;

  // Keyboard shortcut: Escape closes the inside door view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeInsideDoor) {
        handleBackToDoors();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeInsideDoor]);

  // Handle clicking a door to open realistically, zoom in, and reveal the inside view
  const handleDoorClick = (door: DoorData) => {
    if (activeInsideDoor || isZoomingIn) return;

    setSelectedDoorId(door.id);
    setZoomingDoorId(door.id);
    setIsZoomingIn(true);

    if (prefersReduced) {
      setActiveInsideDoor(door);
      setIsZoomingIn(false);
      setZoomingDoorId(null);
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: "instant", block: "start" });
      }
      return;
    }

    // Door swings wide open (320ms), camera zooms through (380ms), then reveal inside
    setTimeout(() => {
      setActiveInsideDoor(door);
      setIsZoomingIn(false);
      setZoomingDoorId(null);
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 650);
  };

  // Handle "Back to the doors" click to zoom back out to the 4-door wall
  const handleBackToDoors = () => {
    setActiveInsideDoor(null);
    setHoveredDoorId(null);
    scrollToTarget("#doors", -20);
  };

  // Door center positions for zoom perspective origin
  const getDoorOrigin = (id: string | null) => {
    switch (id) {
      case "projects":
        return "16% 50%";
      case "research":
        return "38% 50%";
      case "achievements":
        return "62% 50%";
      case "leadership":
        return "84% 50%";
      default:
        return "50% 50%";
    }
  };

  return (
    <>
      <section
        id="doors"
        ref={sectionRef}
        aria-label="Interactive Doors — Explore My World"
        className="relative pt-20 sm:pt-24 pb-0 overflow-hidden bg-[var(--paper)] text-[var(--ink)] transition-colors duration-500 select-none min-h-[640px]"
      >
        {/* ========================================================= */}
        {/* VIEW A: THE 4 ARCHITECTURAL DOORS WALL                    */}
        {/* (Visible when activeInsideDoor is null)                   */}
        {/* ========================================================= */}
        <div
          className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            activeInsideDoor ? "hidden pointer-events-none" : "block pointer-events-auto"
          } ${
            isZoomingIn
              ? "opacity-0 scale-[2.2] blur-md pointer-events-none"
              : "opacity-100 scale-100 blur-0"
          }`}
          style={{
            transformOrigin: getDoorOrigin(zoomingDoorId),
          }}
        >
          {/* SECTION HEADER: "Magic happens behind the doors" */}
          <div className="mb-12 md:mb-16 text-center max-w-4xl mx-auto px-4 relative z-10">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--ink)] leading-tight">
              Magic happens{" "}
              <span className="font-serif italic font-normal text-[var(--mute)]">
                behind the doors
              </span>
            </h2>
          </div>

          {/* MOBILE SELECTOR TABS (< 1024px) */}
          <div className="lg:hidden flex items-center justify-start sm:justify-center gap-2 overflow-x-auto px-4 pb-4 mb-4 no-scrollbar relative z-20">
            {DOORS.map((door) => {
              const isSelected = selectedDoorId === door.id;
              return (
                <button
                  key={door.id}
                  onClick={() => {
                    setSelectedDoorId(door.id);
                    setHoveredDoorId(door.id);
                  }}
                  className={`px-3.5 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-300 flex items-center gap-2 border ${
                    isSelected
                      ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] shadow-md scale-105"
                      : "bg-[var(--card)] text-[var(--mute)] hover:text-[var(--ink)] border-[var(--line)]"
                  }`}
                >
                  <span className="opacity-60">{door.number}</span>
                  <span className="font-semibold">{door.plaqueTitle}</span>
                </button>
              );
            })}
          </div>

          {/* ARCHITECTURAL ROOM WALL CONTAINER */}
          <div className="relative w-full overflow-hidden">
            {/* Plaster Wall Surface */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#f8f6f0] via-[#f1eee6] to-[#e7e3d8] dark:from-[#111217] dark:via-[#15171e] dark:to-[#0d0e12] transition-colors duration-700" />

            {/* Ambient Gallery Spotlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-80 dark:opacity-20"
              style={{
                background:
                  "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,255,255,0.7) 0%, transparent 80%)",
              }}
            />

            {/* DESKTOP VIEW: 4 DOORS STANDING ON THE WALL (lg+) */}
            <div className="hidden lg:block relative z-10 max-w-[1320px] mx-auto px-8 pt-8 pb-0 min-h-[520px]">
              <div className="flex justify-between items-end gap-6 xl:gap-8 w-full max-w-[1180px] mx-auto">
                {DOORS.map((door) => {
                  const isHovered = hoveredDoorId === door.id;
                  const isClickedToZoom = zoomingDoorId === door.id;
                  const isAnyHovered = Boolean(hoveredDoorId);
                  const isAjar = isHovered && !isClickedToZoom;
                  const isFaded = isAnyHovered && !isHovered && !isClickedToZoom;

                  // 3D rotation angle
                  let rotationY = 0;
                  let translateZ = 0;
                  if (!prefersReduced) {
                    if (isClickedToZoom) {
                      rotationY = -86;
                      translateZ = 16;
                    } else if (isAjar) {
                      rotationY = -24;
                      translateZ = 8;
                    }
                  }

                  return (
                    <div
                      key={door.id}
                      data-door-index={door.number}
                      onMouseEnter={() => {
                        setHoveredDoorId(door.id);
                        setSelectedDoorId(door.id);
                      }}
                      onMouseLeave={() => setHoveredDoorId(null)}
                      onClick={() => handleDoorClick(door)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleDoorClick(door);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Open door ${door.number}: ${door.title}`}
                      className={`relative flex flex-col items-center cursor-pointer select-none outline-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isFaded ? "opacity-10 blur-[0.8px] scale-[0.98]" : "opacity-100 scale-100"
                      }`}
                    >
                      {/* Arched Door Frame */}
                      <div
                        className="relative w-[185px] xl:w-[215px] h-[440px] xl:h-[470px] rounded-t-full p-[10px] xl:p-[12px] bg-gradient-to-b from-[#f7f5ee] to-[#ded9cd] dark:from-[#252833] dark:to-[#17181f] shadow-[0_16px_36px_rgba(0,0,0,0.12),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.2)] dark:shadow-[0_22px_48px_rgba(0,0,0,0.7),inset_0_2px_4px_rgba(255,255,255,0.08),inset_0_-3px_6px_rgba(0,0,0,0.9)]"
                        style={{
                          perspective: "1300px",
                        }}
                      >
                        {/* Doorway Cavity (Dark Depth / Portal Light) */}
                        <div className="relative w-full h-full rounded-t-full overflow-hidden bg-[#08090d] shadow-[inset_0_0_22px_rgba(0,0,0,0.95)]">
                          <div
                            className={`absolute inset-0 transition-opacity duration-500 ${
                              isAjar || isClickedToZoom ? "opacity-100" : "opacity-25"
                            }`}
                            style={{
                              background: isClickedToZoom
                                ? "radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 60%, rgba(0,0,0,0.9) 90%)"
                                : `radial-gradient(circle at 50% 60%, ${door.glowColor} 0%, rgba(0,0,0,0.95) 75%)`,
                            }}
                          />

                          {/* 3D Swinging Door Leaf */}
                          <div
                            className="absolute inset-0 w-full h-full rounded-t-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] [backface-visibility:hidden] origin-left border-r border-black/50 shadow-2xl"
                            style={{
                              transform: `rotateY(${rotationY}deg) translateZ(${translateZ}px)`,
                              backgroundColor: isDark ? door.doorBgDark : door.doorBgLight,
                            }}
                          >
                            {/* Fluted Vertical Wood Slat Texture */}
                            <div
                              className="absolute inset-0 rounded-t-full opacity-90"
                              style={{
                                backgroundImage:
                                  "repeating-linear-gradient(90deg, transparent, transparent 7px, rgba(255,255,255,0.045) 7px, rgba(255,255,255,0.045) 8.5px, rgba(0,0,0,0.35) 8.5px, rgba(0,0,0,0.35) 10px)",
                              }}
                            />

                            {/* Bevel Shadow */}
                            <div className="absolute inset-0 rounded-t-full shadow-[inset_0_2px_8px_rgba(255,255,255,0.18),inset_0_-4px_12px_rgba(0,0,0,0.8)]" />

                            {/* Polished Brass Nameplate */}
                            <div
                              className={`absolute top-[28%] left-1/2 -translate-x-1/2 w-[82%] max-w-[155px] py-2 px-2.5 rounded-[2px] bg-gradient-to-br from-[#dfbc60] via-[#faeb9c] via-[#cf9e33] to-[#99711c] shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.95)] border border-[#865e15] flex flex-col items-center justify-center text-center transition-opacity duration-300 ${
                                isFaded ? "opacity-0" : "opacity-100"
                              }`}
                            >
                              <span className="w-1 h-1 rounded-full bg-[#523707] shadow-inner absolute top-0.5 left-0.5" />
                              <span className="w-1 h-1 rounded-full bg-[#523707] shadow-inner absolute top-0.5 right-0.5" />
                              <span className="w-1 h-1 rounded-full bg-[#523707] shadow-inner absolute bottom-0.5 left-0.5" />
                              <span className="w-1 h-1 rounded-full bg-[#523707] shadow-inner absolute bottom-0.5 right-0.5" />

                              <span className="font-sans text-[10px] xl:text-[11px] font-extrabold tracking-[0.14em] text-[#241703] uppercase leading-none [text-shadow:0_1px_0_rgba(255,255,255,0.6)] truncate max-w-full">
                                {door.plaqueTitle}
                              </span>
                            </div>

                            {/* "Click to enter" Pill */}
                            {isAjar && (
                              <div className="absolute top-[38%] left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                                <div className="px-3.5 py-1.5 rounded-full bg-black/95 text-white dark:bg-stone-100 dark:text-stone-900 shadow-[0_8px_25px_rgba(0,0,0,0.45)] border border-white/10 dark:border-black/10 flex items-center gap-1.5 whitespace-nowrap animate-[pulse_2s_infinite]">
                                  <span className="font-sans text-[11px] font-bold tracking-wide">
                                    Click to enter
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* Brass Lever Handle */}
                            <div
                              className={`absolute top-[56%] right-3 flex flex-col items-end pointer-events-none transition-opacity duration-300 ${
                                isFaded ? "opacity-0" : "opacity-100"
                              }`}
                            >
                              <div className="flex items-center">
                                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#fff2b0] via-[#cfa33e] to-[#7b5413] shadow-md border border-[#865e15]" />
                                <div className="w-8 h-2 rounded-r-md -ml-1 bg-gradient-to-b from-[#fff6c2] via-[#d6a943] to-[#7e5513] shadow-[0_4px_8px_rgba(0,0,0,0.5)]" />
                              </div>
                              <div className="w-2.5 h-4.5 mt-1 mr-1 rounded-xs bg-gradient-to-b from-[#e3c473] to-[#7e5716] shadow-xs border border-[#6b470c] flex items-center justify-center">
                                <div className="w-0.5 h-1.5 bg-[#1a1204] rounded-full" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Floor Light Spill */}
                      <div
                        className={`w-full h-8 -mt-1 rounded-b-xl transition-all duration-500 pointer-events-none ${
                          isAjar ? "opacity-100 scale-105" : "opacity-0 scale-95"
                        }`}
                        style={{
                          background: `radial-gradient(ellipse at 50% 0%, ${door.floorSpillColor} 0%, transparent 75%)`,
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* ON-WALL TYPOGRAPHY (When hovering on desktop) */}
              {hoveredDoorId && !zoomingDoorId && (
                <div
                  className={`absolute top-1/2 -translate-y-1/2 z-20 w-[420px] xl:w-[460px] pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isTextOnRight ? "right-12 xl:right-20" : "left-12 xl:left-20"
                  }`}
                >
                  <h3 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-[var(--ink)] mb-1">
                    {activeDoor.title}
                  </h3>
                  <p className="font-mono text-[11px] xl:text-xs font-semibold uppercase tracking-wider text-[var(--mute)] mb-5">
                    {activeDoor.subtitle}
                  </p>
                  <div className="space-y-3.5">
                    {activeDoor.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center text-[10px] bg-stone-900/10 dark:bg-white/15 text-[var(--ink)] font-bold">
                          ✓
                        </div>
                        <span className="text-sm font-medium text-[var(--ink)] leading-snug">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* MOBILE VIEW: FOCUSED ACTIVE DOOR (< 1024px) */}
            <div className="lg:hidden relative z-10 px-4 pt-4 pb-8 flex flex-col items-center">
              <div
                onClick={() => handleDoorClick(activeDoor)}
                tabIndex={0}
                role="button"
                aria-label={`Open door ${activeDoor.number}: ${activeDoor.title}`}
                className="relative flex flex-col items-center cursor-pointer select-none outline-none"
              >
                <div
                  className="relative w-[190px] sm:w-[220px] h-[370px] sm:h-[420px] rounded-t-full p-[10px] sm:p-[12px] bg-gradient-to-b from-[#f7f5ee] to-[#ded9cd] dark:from-[#252833] dark:to-[#17181f] shadow-[0_18px_40px_rgba(0,0,0,0.14)] dark:shadow-[0_24px_50px_rgba(0,0,0,0.8)]"
                  style={{
                    perspective: "1200px",
                  }}
                >
                  <div className="relative w-full h-full rounded-t-full overflow-hidden bg-[#07070a] shadow-[inset_0_0_20px_rgba(0,0,0,0.95)]">
                    <div
                      className="absolute inset-0 opacity-100"
                      style={{
                        background: `radial-gradient(circle at 50% 60%, ${activeDoor.glowColor} 0%, rgba(0,0,0,0.95) 75%)`,
                      }}
                    />

                    {/* Door Leaf ajar */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-t-full transition-transform duration-500 [transform-style:preserve-3d] [backface-visibility:hidden] origin-left border-r border-black/50"
                      style={{
                        transform: prefersReduced
                          ? "none"
                          : zoomingDoorId === activeDoor.id
                          ? "rotateY(-84deg) translateZ(16px)"
                          : "rotateY(-24deg) translateZ(6px)",
                        backgroundColor: isDark ? activeDoor.doorBgDark : activeDoor.doorBgLight,
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-t-full opacity-90"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(90deg, transparent, transparent 7px, rgba(255,255,255,0.045) 7px, rgba(255,255,255,0.045) 8.5px, rgba(0,0,0,0.35) 8.5px, rgba(0,0,0,0.35) 10px)",
                        }}
                      />

                      <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-[82%] max-w-[155px] py-2 px-2 rounded-[2px] bg-gradient-to-br from-[#dfbc60] via-[#faeb9c] via-[#cf9e33] to-[#99711c] shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.95)] border border-[#865e15] flex flex-col items-center justify-center text-center">
                        <span className="font-sans text-[10px] font-extrabold tracking-[0.14em] text-[#241703] uppercase leading-none [text-shadow:0_1px_0_rgba(255,255,255,0.6)] truncate max-w-full">
                          {activeDoor.plaqueTitle}
                        </span>
                      </div>

                      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                        <div className="px-3 py-1.5 rounded-full bg-black/95 text-white shadow-md border border-white/10 flex items-center gap-1.5 whitespace-nowrap">
                          <span className="font-sans text-[10px] font-bold tracking-wide">
                            Click to enter
                          </span>
                        </div>
                      </div>

                      <div className="absolute top-[56%] right-3 flex flex-col items-end pointer-events-none">
                        <div className="flex items-center">
                          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#fff2b0] via-[#cfa33e] to-[#7b5413] shadow-md border border-[#865e15]" />
                          <div className="w-8 h-2 rounded-r-md -ml-1 bg-gradient-to-b from-[#fff6c2] via-[#d6a943] to-[#7e5513] shadow-[0_4px_8px_rgba(0,0,0,0.5)]" />
                        </div>
                        <div className="w-2.5 h-4.5 mt-1 mr-1 rounded-xs bg-gradient-to-b from-[#e3c473] to-[#7e5716] shadow-xs border border-[#6b470c] flex items-center justify-center">
                          <div className="w-0.5 h-1.5 bg-[#1a1204] rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile On-Wall Description */}
              <div className="mt-8 text-center max-w-md mx-auto px-4">
                <h3 className="text-2xl font-bold tracking-tight text-[var(--ink)] mb-1">
                  {activeDoor.title}
                </h3>
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--mute)] mb-4">
                  {activeDoor.subtitle}
                </p>
                <div className="space-y-2.5 text-left bg-[var(--paper)]/60 dark:bg-[var(--card)]/60 p-4 rounded-xl border border-[var(--line)]">
                  {activeDoor.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div
                        className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center text-[10px] text-white shadow-xs"
                        style={{ backgroundColor: activeDoor.accentColor }}
                      >
                        ✓
                      </div>
                      <span className="text-xs text-[var(--ink)] leading-snug">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleDoorClick(activeDoor)}
                  className="btn-primary mt-5 w-full py-2.5 text-xs font-mono justify-center"
                >
                  <span>Step Inside {activeDoor.title}</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Architectural Baseboard Molding */}
            <div className="relative z-10 w-full">
              <div className="h-[2px] bg-black/10 dark:bg-black/50" />
              <div className="h-6 sm:h-8 bg-[#f2efe6] dark:bg-[#1a1c23] border-t border-white/60 dark:border-white/10 shadow-[0_-3px_8px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_12px_rgba(0,0,0,0.5)]" />
              <div className="h-10 sm:h-14 w-full bg-gradient-to-b from-[#edd2be] to-[#e0bfa7] dark:from-[#1b1715] dark:to-[#100e0d] transition-colors duration-500" />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* VIEW B: INSIDE THE DOOR EXPERIENCE                        */}
        {/* (Revealed when a door is clicked; matching reference video) */}
        {/* ========================================================= */}
        {activeInsideDoor && (
          <div
            ref={insideContainerRef}
            className="relative z-20 pb-28 pt-4 px-4 sm:px-8 max-w-[1240px] mx-auto animate-[fadeIn_0.5s_ease-out]"
          >
            {/* Top Return Navigation Breadcrumb */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--line)]">
              <button
                onClick={handleBackToDoors}
                className="group flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--mute)] hover:text-[var(--ink)] transition-colors cursor-pointer"
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                <span>Back to the doors</span>
              </button>

              <div className="flex items-center gap-2 font-mono text-xs text-[var(--mute)]">
                <span
                  className="w-2 h-2 rounded-full inline-block animate-pulse"
                  style={{ backgroundColor: activeInsideDoor.accentColor }}
                />
                <span>
                  PORTAL {activeInsideDoor.number} // {activeInsideDoor.category}
                </span>
              </div>
            </div>

            {/* Inside Room Title & Editorial Statement */}
            <div className="mb-12 md:mb-16 max-w-3xl">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--ink)] mb-4 leading-tight">
                {activeInsideDoor.insideHeading}
              </h1>
              <p className="text-base sm:text-lg text-[var(--ink-2)] leading-relaxed">
                {activeInsideDoor.insideSubtitle}
              </p>
            </div>

            {/* Inside Content Cards List (Matching reference video cards) */}
            <div className="space-y-12 sm:space-y-16">
              {activeInsideDoor.insideItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 transition-all duration-300 ${
                    item.isPhotoPlaceholder
                      ? "border-2 border-dashed border-[var(--line)] bg-[var(--paper)]/60 text-center flex flex-col items-center justify-center py-12"
                      : "bg-[var(--card)] border border-[var(--line)] shadow-sm hover:shadow-md"
                  }`}
                >
                  {item.isPhotoPlaceholder ? (
                    <div className="max-w-md mx-auto space-y-3">
                      <div
                        className="w-12 h-12 rounded-full mx-auto flex items-center justify-center shadow-xs"
                        style={{
                          backgroundColor: `${activeInsideDoor.accentColor}20`,
                          color: activeInsideDoor.accentColor,
                        }}
                      >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-[var(--ink)]">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
                        {item.placeholderHint}
                      </p>
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono bg-[var(--line)] text-[var(--mute)]">
                        Extensible Content Slot
                      </span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
                      {/* Left: Metadata, Description & Badges */}
                      <div>
                        {/* Tag & Optional Badge */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--mute)]">
                            {item.tag}
                          </span>
                          {item.badge && (
                            <span className="font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] mb-2">
                          {item.title}
                        </h3>

                        {/* Subtitle */}
                        <div className="font-sans text-sm font-medium text-[var(--mute)] mb-4">
                          {item.subtitle}
                        </div>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-[var(--ink-2)] leading-relaxed mb-6">
                          {item.description}
                        </p>

                        {/* Key Metrics / Highlights */}
                        {item.metrics && (
                          <div className="mb-6 p-3 rounded-xl bg-[var(--paper)]/80 border border-[var(--line)] font-mono text-xs text-[var(--ink)] flex items-center gap-2">
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: activeInsideDoor.accentColor }}
                            />
                            <span>{item.metrics}</span>
                          </div>
                        )}

                        {/* Technology Stack Pills */}
                        {item.tech && item.tech.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {item.tech.map((t) => (
                              <span
                                key={t}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-[var(--paper)] text-[var(--ink)] border border-[var(--line)] shadow-xs"
                              >
                                <TechLogo slug={t.toLowerCase().replace(/[^a-z0-9]/g, "")} name={t} size={11} />
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Links */}
                        {item.links && item.links.length > 0 && (
                          <div className="flex flex-wrap gap-3">
                            {item.links.map((link, lIdx) => (
                              <a
                                key={lIdx}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-semibold bg-[var(--ink)] text-[var(--paper)] hover:opacity-90 transition-opacity"
                              >
                                {link.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right: Mockup / Display Canvas Showcase */}
                      <div className="relative rounded-2xl overflow-hidden border border-[var(--line)] bg-gradient-to-br from-[var(--paper)] to-[var(--card)] p-5 min-h-[220px] flex flex-col justify-between shadow-inner">
                        <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]/60 text-[11px] font-mono text-[var(--mute)]">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-red-400" />
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          </span>
                          <span className="uppercase tracking-widest">{activeInsideDoor.plaqueTitle}</span>
                        </div>

                        <div className="my-auto py-6 text-center">
                          <div
                            className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center shadow-md mb-3 transition-transform hover:scale-110"
                            style={{
                              backgroundColor: `${activeInsideDoor.accentColor}18`,
                              color: activeInsideDoor.accentColor,
                              border: `1px solid ${activeInsideDoor.accentColor}40`,
                            }}
                          >
                            <span className="font-mono text-sm font-bold">{activeInsideDoor.number}</span>
                          </div>
                          <span className="font-sans font-bold text-sm text-[var(--ink)] block">
                            {item.title}
                          </span>
                          <span className="font-mono text-[11px] text-[var(--mute)]">
                            {item.subtitle}
                          </span>
                        </div>

                        <div className="pt-3 border-t border-[var(--line)]/60 flex items-center justify-between text-[10px] font-mono text-[var(--mute)]">
                          <span>BEYOND THE CODE</span>
                          <span className="text-emerald-500">● ACTIVE ARTIFACT</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Return Action Bar */}
            <div className="mt-16 pt-8 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={handleBackToDoors}
                className="btn-primary w-full sm:w-auto px-6 py-3 font-mono text-xs cursor-pointer"
              >
                <span>← Return to Door Selection</span>
              </button>

              <span className="text-xs font-mono text-[var(--mute)]">
                Press <kbd className="px-1.5 py-0.5 rounded bg-[var(--card)] border border-[var(--line)] font-semibold text-[var(--ink)]">Esc</kbd> anytime to return
              </span>
            </div>
          </div>
        )}
      </section>

      {/* ============================================================= */}
      {/* FLOATING "← BACK TO THE DOORS" PILL BUTTON                    */}
      {/* Pinned at bottom left whenever inside a door                  */}
      {/* Matches reference video exactly                               */}
      {/* ============================================================= */}
      <div
        className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          activeInsideDoor
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <button
          onClick={handleBackToDoors}
          aria-label="Return to the Interactive Doors selection"
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[var(--card)]/95 text-[var(--ink)] border border-[var(--line)] shadow-[0_10px_35px_rgba(0,0,0,0.25)] backdrop-blur-md hover:bg-[var(--ink)] hover:text-[var(--paper)] hover:shadow-2xl transition-all duration-300 font-mono text-xs font-semibold cursor-pointer"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
          <span>Back to the doors</span>
          <span
            className="w-1.5 h-1.5 rounded-full animate-ping"
            style={{
              backgroundColor: activeInsideDoor?.accentColor || "#38bdf8",
            }}
          />
        </button>
      </div>
    </>
  );
}
