"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const PeekingStudentSVG = () => (
  <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="peeking-svg-character">
    <path d="M22 55 C 22 15, 78 15, 78 55 L 80 80 C 80 95, 20 95, 20 80 Z" fill="#1e293b"/>
    <circle cx="50" cy="58" r="22" fill="#ffedd5"/>
    <path d="M 27 58 C 27 30, 73 30, 73 58 C 60 42, 40 42, 27 58 Z" fill="#0f172a"/>
    <g className="svg-eyes">
      <path d="M 36 57 Q 39 53 42 57" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round"/>
      <path d="M 58 57 Q 61 53 64 57" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round"/>
    </g>
    <path d="M 46 65 Q 50 69 54 65" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="34" cy="64" r="5" fill="#f43f5e" opacity="0.4"/>
    <circle cx="66" cy="64" r="5" fill="#f43f5e" opacity="0.4"/>
    <rect x="32" y="50" width="14" height="11" rx="4" fill="none" stroke="#cbd5e1" strokeWidth="2.5"/>
    <rect x="54" y="50" width="14" height="11" rx="4" fill="none" stroke="#cbd5e1" strokeWidth="2.5"/>
    <line x1="46" y1="55" x2="54" y2="55" stroke="#cbd5e1" strokeWidth="2.5"/>
    <rect x="65" y="42" width="8" height="3" rx="1.5" fill="#f43f5e" transform="rotate(-15 65 42)"/>
    <rect x="23" y="78" width="14" height="18" rx="7" fill="#ffedd5" className="svg-hand left-hand"/>
    <rect x="63" y="78" width="14" height="18" rx="7" fill="#ffedd5" className="svg-hand right-hand"/>
  </svg>
);

const AnimatedCounter = ({ value, suffix = "", className = "stat-number" }: { value: number; suffix?: string; className?: string }) => {
  const [count, setCount] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Set to 0 after mounting to prepare count-up animation without hydration mismatch
    setCount(0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const end = value;
    const duration = 1500;
    const startTime = performance.now();

    const updateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress); // easeOutQuad
      setCount(Math.floor(easeProgress * (end - start) + start));

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [hasAnimated, value]);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
};

const subjects = [
  {
    semester: "1st Semester",
    rows: [
      ["Programming", "Rs. 6,000", "Rs. 8,000", "Rs. 10,000"],
      ["Database Design & Development (DDD)", "Rs. 6,000", "Rs. 8,000", "Rs. 10,000"],
      ["Professional Practice (PP)", "Rs. 5,000", "Rs. 7,000", "Rs. 9,000"],
      ["Networking", "Rs. 6,000", "Rs. 8,000", "Rs. 10,000"],
    ],
  },
  {
    semester: "2nd Semester",
    rows: [
      ["Planning A Computer Project (PACP)", "Rs. 6,500", "Rs. 8,500", "Rs. 10,500"],
      ["Security", "Rs. 4,000", "Rs. 6,000", "Rs. 8,000"],
      ["Software Development Lifecycle (SDLC)", "Rs. 7,000", "Rs. 9,000", "Rs. 11,000"],
      ["Web Development & Designing (WDD)", "Rs. 8,000", "Rs. 10,000", "Rs. 12,000"],
    ],
  },
  {
    semester: "3rd Semester",
    rows: [
      ["Business Process Support (BPS)", "Rs. 6,500", "Rs. 8,500", "Rs. 10,500"],
      ["Computing Research Project (CRP 1)", "Rs. 6,000", "Rs. 8,000", "Rs. 10,000"],
      ["User Experience & Interface Design (UEID)", "Rs. 6,000", "Rs. 8,000", "Rs. 11,000"],
      ["Systems Analysis & Design (SAD)", "Rs. 7,000", "Rs. 9,000", "Rs. 11,000"],
    ],
  },
  {
    semester: "4th Semester",
    rows: [
      ["Data Structures & Algorithms (DSA)", "Rs. 8,000", "Rs. 10,000", "Rs. 12,000"],
      ["Computing Research Project (CRP 2)", "Rs. 8,000", "Rs. 10,000", "Rs. 12,000"],
      ["Discrete Maths (DM)", "Rs. 12,000", "Rs. 14,000", "Rs. 16,000"],
      ["Applied Programming & Design Principles (APDP)", "Rs. 8,000", "Rs. 10,000", "Rs. 12,000"],
    ],
  },
];

const allSubjects = subjects.flatMap((group) => group.rows.map((row) => row[0]));
const services = allSubjects;

const subjectSlugs: Record<string, string> = {
  "Programming": "programming",
  "Database Design & Development (DDD)": "database-design-development",
  "Professional Practice (PP)": "professional-practice",
  "Networking": "networking",
  "Planning A Computer Project (PACP)": "planning-computer-project",
  "Security": "security",
  "Software Development Lifecycle (SDLC)": "software-development-lifecycle",
  "Web Development & Designing (WDD)": "web-development-designing",
  "Business Process Support (BPS)": "business-process-support",
  "Computing Research Project (CRP 1)": "computing-research-project-1",
  "User Experience & Interface Design (UEID)": "user-experience-interface-design",
  "Systems Analysis & Design (SAD)": "systems-analysis-design",
  "Data Structures & Algorithms (DSA)": "data-structures-algorithms",
  "Computing Research Project (CRP 2)": "computing-research-project-2",
  "Discrete Maths (DM)": "discrete-maths",
  "Applied Programming & Design Principles (APDP)": "applied-programming-design-principles",
};

const reviews = [
  ["Got Distinction for my DSA assignment. Worth every rupee!", "Kasun", "BTEC HND Computing (Batch 12)"],
  ["Submitted my CRP 1 on time. Life saver!", "Dilini", "Software Engineering Student"],
  ["Very professional. No plagiarism issues at all.", "Ravindu", "HND Computing (Batch 15)"],
  ["Best price in the market. Highly recommend.", "Nethmi", "BTEC HND Student"],
  ["Amazing database design work. They provided complete ERDs and normalized tables alongside SQL scripts that scored 92%.", "Dinuka", "HND Computing (Batch 11)"],
  ["Saved my final semester. The networking report was structured perfectly with Cisco Packet Tracer mockups.", "Yasith", "HND Software Engineering"],
];

const faqs = [
  ["Is the work original?", "Yes. Every assignment is prepared from scratch and checked for plagiarism."],
  ["Can I request revisions?", "Yes. Minor revisions are provided within the agreed revision period."],
  ["Is my information confidential?", "Absolutely. Your details are kept private and are never shared."],
  ["Which payment methods do you accept?", "Bank transfer, online banking, and cash deposit."],
  ["Do you provide source code files?", "Yes. For programming and web development modules, we deliver fully commented, executable source code alongside the written report."],
  ["What if my assignment has a short deadline?", "We handle urgent briefs, but we recommend sending your requirements at least 4-5 days prior to the submission date for thorough quality checks."],
  ["Is there an option to pay in installments?", "Yes, for full-semester packages, we support module-by-module milestones or 50% advance and 50% completion payment models."],
  ["Do you follow Pearson BTEC grading rubrics?", "Absolutely. Every module is structured around the Pass, Merit, and Distinction learning outcomes defined by the Pearson specification."],
];

// --- Custom SVGs Icons (Replacing Emojis) ---
function ArnovaLogo() {
  return (
    <svg className="brand-logo-svg" width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="24" fill="var(--accent-lime)" />
      <path 
        d="M50 32 L46 40 L41 38 L30 43 C20 40 12 46 8 56 C18 53 26 57 32 65 C36 58 42 55 50 62 C58 55 64 58 68 65 C74 57 82 53 92 56 C88 46 80 40 70 43 L59 38 L54 40 Z" 
        fill="var(--bg-dark)" 
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="icon-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.3-6.3l-.7.7M6.7 17.3l-.7.7m12.6 0l-.7-.7M6.7 6.7l-.7-.7" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function FlashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function AcademicIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function ClipIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.733-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.903-6.99C16.658 1.877 14.19 .845 11.55.845 6.116.845 1.693 5.268 1.69 10.702c-.001 1.642.43 3.254 1.248 4.668l-.968 3.548 3.635-.953c1.41.77 2.96 1.18 4.542 1.182zm11.233-7.558c-.3-.15-1.77-.875-2.04-.972-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-1.125-.565-1.92-1.025-2.69-2.34-.2-.35-.02-.54.15-.71.15-.15.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.51s1.07 2.9 1.22 3.1c.15.2 2.1 3.21 5.1 4.51.71.31 1.27.5 1.7.63.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.3-.22-.6-.37z" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}

export default function Home() {
  const [activeSemester, setActiveSemester] = useState("1st Semester");
  const [displayedSemester, setDisplayedSemester] = useState("1st Semester");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dynamic sliding indicator for semester tabs
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({
    left: 0,
    width: 0,
    opacity: 0
  });

  useEffect(() => {
    const updateIndicator = () => {
      const activeIndex = subjects.findIndex(s => s.semester === activeSemester);
      const activeTab = tabRefs.current[activeIndex];
      if (activeTab) {
        setIndicatorStyle({
          left: activeTab.offsetLeft,
          width: activeTab.offsetWidth,
          opacity: 1
        });
      }
    };

    updateIndicator();
    // Keep aligned on resize
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeSemester]);

  // Monitor scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsHeaderScrolled(true);
      } else {
        setIsHeaderScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for hardware-accelerated animations (compatible with iOS Safari)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.01,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".reveal-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, [displayedSemester]);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleSemesterChange = (semester: string) => {
    if (semester === activeSemester) return;
    setActiveSemester(semester);
    setIsTransitioning(true);
    setTimeout(() => {
      setDisplayedSemester(semester);
      setIsTransitioning(false);
    }, 300);
  };

  const selectedSemesterData = subjects.find(s => s.semester === displayedSemester) || subjects[0];

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://thearnova.netlify.app/#localbusiness",
        "name": "ARNOVA Academic Studio",
        "description": "Professional HND assignment help for Pearson BTEC Computing & Software Engineering students in Sri Lanka.",
        "url": "https://thearnova.netlify.app",
        "telephone": "+94-XXX-XXX-XXXX",
        "email": "info@thearnova.netlify.app",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "LK",
          "addressLocality": "Colombo"
        },
        "serviceType": "Academic Assignment Support",
        "areaServed": "Sri Lanka",
        "priceRange": "Rs. 5,000 - Rs. 16,000",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "43"
        }
      },
      {
        "@type": "Service",
        "@id": "https://thearnova.netlify.app/#service",
        "serviceType": "HND Assignment Help Sri Lanka",
        "provider": {
          "@type": "Organization",
          "name": "ARNOVA Academic Studio"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Sri Lanka"
        },
        "audience": {
          "@type": "EducationalAudience",
          "educationalRole": "Student"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://thearnova.netlify.app/#faq",
        "mainEntity": faqs.map(([question, answer]) => ({
          "@type": "Question",
          "name": question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": answer
          }
        }))
      }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      {/* Navigation Header */}
      <header className={`site-header ${isHeaderScrolled ? "scrolled" : ""}`}>
        <a className="brand" href="#home" aria-label="ARNOVA home">
          <ArnovaLogo />
          <div className="brand-text">
            <strong>ARNOVA</strong>
          </div>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#pricing">Pricing</a>
          <a href="/blog">Blog</a>
          <a href="#order">Order</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-cta" href="#order">
          Get Free Quote <ArrowIcon />
        </a>
        
        {/* Mobile menu trigger */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </header>

      {/* Mobile Menu Panel */}
      <div className={`mobile-nav-panel ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-nav-links">
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
          <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
          <a href="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</a>
          <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>Process</a>
          <a href="#order" onClick={() => setIsMobileMenuOpen(false)}>Order</a>
          <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
        </div>
        <a className="mobile-nav-cta" href="#order" onClick={() => setIsMobileMenuOpen(false)}>
          Get Free Quote
        </a>
      </div>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-bg-container">
          <Image 
            src="/student_study_hero.png" 
            alt="HND computing assignment help Sri Lanka - ARNOVA" 
            fill
            sizes="100vw"
            priority
            className="hero-bg-image"
            style={{ objectFit: "cover" }}
          />
          <div className="hero-bg-overlay"></div>
        </div>

        {/* Upmind-Style Floating Badges Wrapper */}
        <div className="hero-badges-container">
          <div className="floating-badge badge-1">
            <SparklesIcon /> 100% Original
          </div>
          <div className="floating-badge badge-2">
            <ShieldIcon /> Plagiarism Free
          </div>
          <div className="floating-badge badge-3">
            <FlashIcon /> On-Time Delivery
          </div>
          <div className="floating-badge badge-4">
            <SupportIcon /> 24/7 Support
          </div>
          <div className="floating-badge badge-5">
            <AcademicIcon /> Distinction Grade Target
          </div>
        </div>

        <div className="hero-content">
          <p className="hero-eyebrow">Professional Academic Support & Guidance</p>
          <h1 className="hero-title">
            Clear guidance. <span className="highlight-text">Real grades.</span><br />
            Academic success.
          </h1>
          <p className="hero-subtitle">
            Professional assignment support for Sri Lankan HND computing students. 
            Get original solutions, timely delivery, and a comprehensive refund/revision policy.
          </p>

          <div className="hero-buttons">
            <a href="#pricing" className="btn-outline">
              View Modules
            </a>
            <a href="#order" className="btn-lime">
              Get Free Quote <ArrowIcon />
            </a>
          </div>
        </div>
        
        {/* Decorative Liquid Glass Bottom Overlay */}
        <div className="hero-glass-wave"></div>
      </section>

      {/* Partnerships & Trust Section */}
      <section className="partnerships-section theme-dark reveal-on-scroll">
        <div className="section-container">
          <div className="partnerships-header-block">
            <span className="section-eyebrow-dark">- TRUST & RELIABILITY</span>
            <h2 className="partnerships-title">
              Helping BTEC HND students <span>excel</span>.
            </h2>
            <p className="partnerships-desc">
              From structure mapping and computing logic validation to advanced implementation, we combine academic standards with professional insights to help you secure top-tier results.
            </p>
          </div>

          <div className="stats-grid-horizontal">
            <div className="stat-card-premium reveal-on-scroll delay-1">
              <div className="stat-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <AnimatedCounter value={98} suffix="%" />
              <span className="stat-label">Satisfaction rate</span>
            </div>

            <div className="stat-card-premium reveal-on-scroll delay-2">
              <div className="stat-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <AnimatedCounter value={150} suffix="+" />
              <span className="stat-label">Assignments supported</span>
            </div>

            <div className="stat-card-premium reveal-on-scroll delay-3">
              <div className="stat-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <AnimatedCounter value={90} suffix="+" />
              <span className="stat-label">Distinction grades</span>
            </div>
          </div>
        </div>

        <div className="logo-marquee-fullwidth">
          <div className="logo-marquee-track">
            <div className="logo-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              HND Computing
            </div>
            <div className="logo-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
              Pearson BTEC
            </div>
            <div className="logo-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
              Software Engineering
            </div>
            <div className="logo-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              Data Science
            </div>
            <div className="logo-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              Java &amp; Python
            </div>
            <div className="logo-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              Web Technologies
            </div>
            {/* Duplicate set for seamless infinite scroll */}
            <div className="logo-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              HND Computing
            </div>
            <div className="logo-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
              Pearson BTEC
            </div>
            <div className="logo-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
              Software Engineering
            </div>
            <div className="logo-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              Data Science
            </div>
            <div className="logo-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              Java &amp; Python
            </div>
            <div className="logo-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              Web Technologies
            </div>
          </div>
        </div>
      </section>

      {/* About Us & Why Choose Us Section */}
      <section className="about-section theme-light reveal-on-scroll" id="about">
        <div className="section-container">
          <div className="about-grid">
            <div className="about-left">
              <span className="section-eyebrow-light">About Us</span>
              <h2 className="about-title">
                Built for Sri Lankan students balancing deadlines, lectures, and careers.
              </h2>
              <p className="about-desc">
                ARNOVA Academic Studio was established with a straightforward mission: support Sri Lankan BTEC HND computing and software engineering students in navigating complex requirements. We are a collective of graduates and senior professionals who master your curriculum and codebases.
              </p>
              <a href="#order" className="btn-dark">
                Get Free Quote <ArrowIcon />
              </a>
            </div>
            <div className="about-right">
              {/* Upmind Performance card mockup */}
              <div className="performance-card reveal-on-scroll">
                <div className="perf-header">
                  <h3 className="perf-title">Performance</h3>
                </div>
                <div className="perf-stat-row">
                  <AnimatedCounter value={49} suffix="%" className="perf-number" />
                  <span className="perf-trend">Distinction Rate</span>
                </div>
                <div className="perf-bar-container">
                  <div className="perf-bar-fill"></div>
                </div>
                <div className="perf-tags">
                  <span className="perf-tag">Strategic</span>
                  <span className="perf-tag">HND-Focused</span>
                  <span className="perf-tag">Zero Plagiarism</span>
                  <span className="perf-tag">Full Revision Period</span>
                </div>
              </div>
            </div>
          </div>

          {/* Inline spacing spacer to tightly bind sections */}
          <div style={{ height: "48px" }}></div>

          {/* Why Choose Us */}
          <div className="why-choose-us-wrapper">
            <span className="section-eyebrow-light reveal-on-scroll">Why Choose Us</span>
            <h2 className="about-title reveal-on-scroll" style={{ maxWidth: "600px", marginBottom: "24px" }}>
              Academic support tailored entirely to your curriculum.
            </h2>
            <div className="bento-grid">
              <div className="bento-card tall reveal-on-scroll delay-1">
                <div className="bento-icon">01</div>
                <div className="bento-body">
                  <h3 className="bento-title">Experienced Writers</h3>
                  <p className="bento-desc">
                    All modules are handled by graduates and working professionals who know exactly what lecturers are looking for, guaranteeing structure, theory, and implementation match grading rubrics perfectly.
                  </p>
                </div>
              </div>
              <div className="bento-card highlight reveal-on-scroll delay-2">
                <div className="bento-icon">02</div>
                <div className="bento-body">
                  <h3 className="bento-title">Affordable Prices</h3>
                  <p className="bento-desc">
                    We maintain the most student-friendly rates in Sri Lanka. Tailored packages for Pass, Merit, or Distinction grades let you manage your budget without sacrificing quality.
                  </p>
                </div>
              </div>
              <div className="bento-card reveal-on-scroll delay-3">
                <div className="bento-icon">03</div>
                <div className="bento-body">
                  <h3 className="bento-title">Confidential Service</h3>
                  <p className="bento-desc">
                    Your identity, documents, and interactions with us remain completely private. We never share student information or solutions, maintaining absolute academic integrity.
                  </p>
                </div>
              </div>
              <div className="bento-card reveal-on-scroll delay-4">
                <div className="bento-icon">04</div>
                <div className="bento-body">
                  <h3 className="bento-title">Unlimited Revisions</h3>
                  <p className="bento-desc">
                    We stand by the quality of our work. If you need any adjustments or additions based on feedback, our team offers support throughout the module revision timeframe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Tag Cloud Section */}
      <section className="services-section theme-light reveal-on-scroll" id="services">
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow-light">Services</span>
            <h2 className="section-title">
              We provide comprehensive assistance for computing assignments across all semesters.
            </h2>
          </div>
          <div className="services-tag-cloud">
            {services.map((service, index) => (
              <span className="service-tag" key={index}>
                {service}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Pricing Section */}
      <section className="pricing-section theme-light reveal-on-scroll" id="pricing">
        <div className="section-container">
          <div className="section-header" style={{ textAlign: "center", margin: "0 auto 32px" }}>
            <span className="section-eyebrow-light">Transparent Pricing Schedule</span>
            <h2 className="section-title">HND Computing Modules</h2>
            <p style={{ color: "var(--text-light-muted)", marginTop: "12px", maxWidth: "600px", margin: "12px auto 0" }}>
              Select a semester below to view standard tier-based pricing for each module. Custom packages are available based on timeline urgency.
            </p>
          </div>

          {/* Pricing Semester Tab Selector */}
          <div className="pricing-tabs" style={{ position: "relative" }}>
            {/* Sliding background pill indicator */}
            <div className="pricing-tab-indicator" style={indicatorStyle}></div>
            {subjects.map((group, index) => (
              <button
                key={group.semester}
                ref={(el) => { tabRefs.current[index] = el; }}
                className={`pricing-tab-btn ${activeSemester === group.semester ? "active" : ""}`}
                onClick={() => handleSemesterChange(group.semester)}
                style={{ position: "relative", zIndex: 2 }}
              >
                {group.semester}
              </button>
            ))}
          </div>

          {/* Pricing Module Grid */}
          <div className={`pricing-grid-layout ${isTransitioning ? "fade-out" : ""}`}>
            {selectedSemesterData.rows.map(([subject, pass, merit, distinction], idx) => (
              <div className="pricing-module-card reveal-on-scroll" key={idx} style={{ transitionDelay: `${idx * 80}ms` }}>
                <h4 className="pricing-module-title">
                  {subjectSlugs[subject] ? (
                    <a href={`/modules/${subjectSlugs[subject]}`} className="module-title-link">
                      {subject}
                    </a>
                  ) : (
                    subject
                  )}
                </h4>
                <div className="pricing-tier-container">
                  <div className="pricing-tier">
                    <span className="tier-label">Pass</span>
                    <span className="tier-value">{pass}</span>
                    <div className="distinction-peeker" aria-hidden="true">
                      <PeekingStudentSVG />
                    </div>
                  </div>
                  <div className="pricing-tier">
                    <span className="tier-label">Merit</span>
                    <span className="tier-value">{merit}</span>
                    <div className="distinction-peeker" aria-hidden="true">
                      <PeekingStudentSVG />
                    </div>
                  </div>
                  <div className="pricing-tier highlight">
                    <span className="tier-label">Distinction</span>
                    <span className="tier-value">{distinction}</span>
                    <div className="distinction-peeker" aria-hidden="true">
                      <PeekingStudentSVG />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="pricing-bottom-info">
            * Note: Urgency & complex custom project files may affect estimates. Contact our team for an exact timeline pricing quote.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="process-section theme-light reveal-on-scroll" id="how-it-works">
        <div className="section-container">
          <div className="section-header" style={{ textAlign: "center", margin: "0 auto 32px" }}>
            <span className="section-eyebrow-light">Process Flow</span>
            <h2 className="section-title">Simple 4-Step Academic Support</h2>
          </div>

          <div className="steps-container">
            {[
              ["Submit Details", "Fill the order form below with your module code and assignment brief."],
              ["Get a Quote", "Our academic leads review the brief and send pricing details within 2 hours."],
              ["Secure Payment", "Confirm your deadline slot with standard bank transfers or deposits."],
              ["Receive Work", "Receive original documentation and code assets well before your deadline."]
            ].map(([title, desc], idx) => (
              <div 
                className="step-card reveal-on-scroll" 
                key={idx}
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                <div className="step-number">0{idx + 1}</div>
                <h3 className="step-title">{title}</h3>
                <p className="step-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section className="order-section theme-dark reveal-on-scroll" id="order">
        <div className="section-container">
          <div className="order-grid">
            <div className="order-left">
              <span className="section-eyebrow-dark">Order Submission</span>
              <h2 className="order-title">Place your assignment request.</h2>
              <p className="order-desc">
                Provide your core module information and paste your guidelines. Our academic coordinator will evaluate your brief and contact you within 2 hours with pricing estimates.
              </p>
            </div>
            <div className="order-right">
              <div className="order-card-form">
                <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group">
                    <label className="form-label">WhatsApp Number</label>
                    <input className="form-input" type="tel" placeholder="+94 7X XXX XXXX" required />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Select Subject</label>
                    <select className="form-select" defaultValue="" required>
                      <option value="" disabled>Choose subject</option>
                      {allSubjects.map((subject, idx) => (
                        <option key={idx} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Deadline Date</label>
                    <input className="form-input" type="date" required />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Assignment Brief & Special Instructions (Optional)</label>
                    <textarea 
                      className="form-textarea" 
                      rows={4} 
                      placeholder="Paste guidelines, grading rubric link, required programming languages, or other instructions."
                    ></textarea>
                  </div>

                  <button className="btn-submit full-width" type="submit">
                    Get Free Quote
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews / Testimonials Section */}
      <section className="reviews-section theme-light reveal-on-scroll" id="reviews">
        <div className="section-container">
          <div className="section-header" style={{ textAlign: "center", margin: "0 auto 32px" }}>
            <span className="section-eyebrow-light">Student Reviews</span>
            <h2 className="section-title">Trusted by computing and software engineering students</h2>
          </div>

          <div className="reviews-grid">
            {reviews.map(([quote, name, role], idx) => (
              <div 
                className="review-card reveal-on-scroll" 
                key={idx}
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                <div className="review-stars">
                  <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                </div>
                <p className="review-text">"{quote}"</p>
                <div className="review-author">
                  <div className="author-avatar">
                    {name.charAt(0)}
                  </div>
                  <div className="author-info">
                    <span className="author-name">{name}</span>
                    <span className="author-role">{role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="faq-section theme-light reveal-on-scroll" id="faq">
        <div className="section-container">
          <div className="faq-grid-layout-two-col">
            <div className="faq-left-block">
              <span className="section-eyebrow-light">FAQ</span>
              <h2 className="faq-main-title">Frequently Asked Questions</h2>
              <p className="faq-subtitle-desc">
                Find answers to common questions about our Pearson BTEC HND support, grading alignment, source files, and payment structures.
              </p>
            </div>

            <div className="faq-right-accordion">
              {faqs.map(([question, answer], idx) => (
                <div className={`faq-item ${activeFaq === idx ? "active" : ""}`} key={idx}>
                  <button className="faq-question-btn" onClick={() => toggleFaq(idx)}>
                    <span>{question}</span>
                    <span className="faq-toggle-icon">+</span>
                  </button>
                  <div 
                    className="faq-answer" 
                    style={{ 
                      maxHeight: activeFaq === idx ? "220px" : "0",
                      opacity: activeFaq === idx ? 1 : 0,
                      transform: activeFaq === idx ? "translate3d(0, 0, 0)" : "translate3d(0, -8px, 0)"
                    }}
                  >
                    <div className="faq-answer-inner">
                      <p>{answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section theme-dark reveal-on-scroll" id="contact">
        <div className="section-container">
          <div className="contact-grid">
            <div className="contact-left">
              <span className="section-eyebrow-dark">Get in Touch</span>
              <h2 className="contact-title">Available 24/7. Reach out to our consultants.</h2>
              <p className="order-desc">
                If you have questions about custom modules, bulk pricing, or ongoing assignment updates, don't hesitate to message us directly.
              </p>
            </div>
            <div className="contact-right">
              <div className="contact-cards-container">
                <div className="contact-card-item">
                  <div className="contact-card-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div className="contact-card-details">
                    <span className="contact-card-label">Response Time</span>
                    <span className="contact-card-value">Within 2 Hours</span>
                  </div>
                </div>
                
                <div className="contact-card-item">
                  <div className="contact-card-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <div className="contact-card-details">
                    <span className="contact-card-label">Support Hours</span>
                    <span className="contact-card-value">24/7 Availability</span>
                  </div>
                </div>

                <div className="contact-card-item">
                  <div className="contact-card-icon">
                    <MapPinIcon />
                  </div>
                  <div className="contact-card-details">
                    <span className="contact-card-label">Location</span>
                    <span className="contact-card-value">Sri Lanka</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer theme-dark">
        <div className="section-container" style={{ padding: "0 0 20px" }}>
          <div className="footer-top">
            <div className="footer-brand-info">
              <a className="brand" href="#home" style={{ alignSelf: "flex-start" }}>
                <ArnovaLogo />
                <div className="brand-text">
                  <strong>ARNOVA</strong>
                  <small>Academic Studio</small>
                </div>
              </a>
              <p className="footer-brand-desc">
                Leading assignment and research support platform for HND engineering modules in Sri Lanka.
              </p>
            </div>
            
            <div className="footer-nav">
              <div className="footer-nav-col">
                <span className="footer-nav-title">Navigation</span>
                <div className="footer-nav-links">
                  <a href="#about">About</a>
                  <a href="#services">Services</a>
                  <a href="#pricing">Pricing</a>
                  <a href="/blog">Blog</a>
                </div>
              </div>
              <div className="footer-nav-col">
                <span className="footer-nav-title">Streams</span>
                <div className="footer-nav-links">
                  <a href="/hnd-computing-assignment-help">Computing Help</a>
                  <a href="/hnd-software-engineering-help">Software Eng Help</a>
                </div>
              </div>
              <div className="footer-nav-col">
                <span className="footer-nav-title">Actions</span>
                <div className="footer-nav-links">
                  <a href="#order">Place Order</a>
                  <a href="#faq">FAQ</a>
                  <a href="#contact">Contact</a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-passion-phrase">"Done with passion, love, and support"</p>
            <span className="footer-copyright">
              © {new Date().getFullYear()} ARNOVA Academic Studio. All rights reserved.
            </span>
            <span className="footer-disclaimer">
              Disclaimer: All assistance, solutions, and reports provided by ARNOVA are intended strictly for study, drafting, and research guidance purposes. Students are expected to adhere to their university academic integrity policies.
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
