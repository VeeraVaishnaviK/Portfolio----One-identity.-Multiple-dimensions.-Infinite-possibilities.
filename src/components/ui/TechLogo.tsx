import React from "react";
import Image from "next/image";

export const BRAND_MAP: Record<string, { src: string; color: string }> = {
  python: { src: "/logos/python.svg", color: "#3776AB" },
  typescript: { src: "/logos/typescript.svg", color: "#3178C6" },
  javascript: { src: "/logos/javascript.svg", color: "#F7DF1E" },
  java: { src: "/logos/java.svg", color: "#ED8B00" },
  c: { src: "/logos/c.svg", color: "#A8B9CC" },
  sql: { src: "/logos/sql.svg", color: "#336791" },
  react: { src: "/logos/react.svg", color: "#61DAFB" },
  nextjs: { src: "/logos/nextjs.svg", color: "#000000" },
  tailwindcss: { src: "/logos/tailwindcss.svg", color: "#06B6D4" },
  html5: { src: "/logos/html5.svg", color: "#E34F26" },
  css3: { src: "/logos/css3.svg", color: "#1572B6" },
  nodejs: { src: "/logos/nodejs.svg", color: "#5FA04E" },
  express: { src: "/logos/express.svg", color: "#000000" },
  fastapi: { src: "/logos/fastapi.svg", color: "#009688" },
  mongodb: { src: "/logos/mongodb.svg", color: "#47A248" },
  vercel: { src: "/logos/vercel.svg", color: "#000000" },
  googlecloud: { src: "/logos/googlecloud.svg", color: "#4285F4" },
  git: { src: "/logos/git.svg", color: "#F05032" },
  github: { src: "/logos/github.svg", color: "#181717" },
  vscode: { src: "/logos/vscode.svg", color: "#007ACC" },
  androidstudio: { src: "/logos/androidstudio.svg", color: "#3DDC84" },
  gemini: { src: "/logos/gemini.svg", color: "#5B6BE1" },
  langchain: { src: "/logos/langchain.svg", color: "#2D8C7F" },
  ieee: { src: "/logos/ieee.svg", color: "#00629B" },
  gdg: { src: "/logos/gdg.svg", color: "#4285F4" }
};

export function isBrand(slug?: string): boolean {
  if (!slug) return false;
  return slug.toLowerCase() in BRAND_MAP;
}

export const CONCEPT_MAP: Record<string, React.FC<{ size?: number; className?: string }>> = {
  // REST APIs
  "rest-apis": ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 17l6-6-6-6" />
      <path d="M12 19h8" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  // Microservices
  microservices: ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="6" height="6" rx="1.5" />
      <rect x="16" y="2" width="6" height="6" rx="1.5" />
      <rect x="9" y="16" width="6" height="6" rx="1.5" />
      <path d="M5 8v4a2 2 0 0 0 2 2h5m7-6v4a2 2 0 0 1-2 2h-5" />
    </svg>
  ),
  // MobileNet
  mobilenet: ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="5" y="2" width="14" height="20" rx="3" />
      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2" />
      <path d="M9 6h6" />
      <path d="M8 10l4 4 4-4" />
    </svg>
  ),
  // KNN Classifier
  knn: ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <path d="M12 12L6 6M12 12l6-6M12 12l6 6M12 12l-6 6" strokeDasharray="2 2" />
    </svg>
  ),
  // Data Structures
  dsa: ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="5" r="3" />
      <circle cx="6" cy="19" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M12 8v4m-3 2l-3 2m9-2l3 2" />
    </svg>
  ),
  // OOP
  oop: ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <path d="M10 6.5h4M6.5 10v4m11-4v4M10 17.5h4" strokeDasharray="1 1" />
    </svg>
  ),
  // DBMS
  dbms: ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </svg>
  ),
  // OS
  os: ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="15" x2="23" y2="15" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="15" x2="4" y2="15" />
    </svg>
  )
};

interface TechLogoProps {
  slug?: string;
  name: string;
  size?: number;
  className?: string;
  showGlow?: boolean;
}

export function TechLogo({
  slug,
  name,
  size = 28,
  className = "",
  showGlow = false,
}: TechLogoProps) {
  const brand = slug ? BRAND_MAP[slug.toLowerCase()] : undefined;

  if (brand) {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        {showGlow && (
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-25 pointer-events-none transition-opacity duration-300"
            style={{ backgroundColor: brand.color }}
          />
        )}
        <Image
          src={brand.src}
          alt={`${name} logo`}
          width={size}
          height={size}
          className="relative z-10 object-contain"
          unoptimized
        />
      </div>
    );
  }

  // Check concept map
  const ConceptIcon = slug ? CONCEPT_MAP[slug.toLowerCase()] : undefined;
  if (ConceptIcon) {
    return (
      <div className={`inline-flex items-center justify-center text-[#3a3a3a] ${className}`}>
        <ConceptIcon size={size} />
      </div>
    );
  }

  // Fallback geometric glyph
  return (
    <div
      style={{ width: size, height: size }}
      className={`inline-flex items-center justify-center rounded-md border border-[rgba(13,13,13,0.15)] font-mono text-xs font-semibold text-[#0d0d0d] bg-[#f4f2ee] ${className}`}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}
