"use client";

import React, { useState, useEffect } from "react";
import { moduleMap } from "./data";

const AnimatedCounter = ({ value, suffix = "", className = "stat-number" }: { value: number; suffix?: string; className?: string }) => {
  const [count, setCount] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);

  useEffect(() => {
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

interface ModuleDetailProps {
  slug: string;
}

export default function ModuleDetail({ slug }: ModuleDetailProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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
  }, []);

  const module = moduleMap[slug];

  if (!module) {
    return (
      <main className="theme-dark" style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <div style={{ textAlign: "center", padding: "40px" }}>
          <h1 style={{ fontSize: "3rem", color: "var(--accent-lime)", marginBottom: "20px" }}>404</h1>
          <p style={{ color: "var(--text-dark-secondary)", marginBottom: "30px" }}>Module Not Found</p>
          <a href="/" className="btn-lime">Back to Homepage</a>
        </div>
      </main>
    );
  }

  const moduleFaqs = [
    [
      `How do you guarantee a Distinction grade in ${module.name}?`,
      `We structure the work strictly around the Pearson BTEC learning outcomes (LOs) and grading criteria. We ensure all Pass, Merit, and Distinction criteria are clearly met, properly labeled in the document, and referenced correctly. Our 49% Distinction rate is a testament to this structure.`
    ],
    [
      `Will I get the source code/diagram files for this module?`,
      module.abbreviation === "DDD" || slug.includes("programming") || slug.includes("web") || slug.includes("structures") || slug.includes("discrete")
        ? "Yes! For programming, database, and web modules, we deliver fully commented, executable source code files alongside the written documentation. We also provide raw design files (Figma, ERD diagrams, DFDs) so you can edit them if needed."
        : "Yes! If the assignment brief requires diagrams, Gantt charts, Cisco Packet Tracer files, or documentation templates, they are delivered as editable assets alongside your main document."
    ],
    [
      `How fast can you complete my ${module.name} assignment?`,
      "While we recommend submitting your brief 4-5 days before the deadline for quality checks, we can handle urgent requests (within 24-48 hours) depending on module complexity and our academic writers' availability."
    ],
    [
      "Is my submission safe from plagiarism?",
      "Absolutely. Every assignment goes through strict quality gates. We check the written report using professional plagiarism tools and validate all computing logic. We guarantee 100% original, custom-written work."
    ]
  ];

  return (
    <main>
      {/* Navigation Header */}
      <header className="site-header scrolled">
        <a className="brand" href="/" aria-label="ARNOVA home">
          {/* Logo SVG */}
          <svg className="brand-logo-svg" width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="24" fill="var(--accent-lime)" />
            <path 
              d="M50 32 L46 40 L41 38 L30 43 C20 40 12 46 8 56 C18 53 26 57 32 65 C36 58 42 55 50 62 C58 55 64 58 68 65 C74 57 82 53 92 56 C88 46 80 40 70 43 L59 38 L54 40 Z" 
              fill="var(--bg-dark)" 
            />
          </svg>
          <div className="brand-text">
            <strong>ARNOVA</strong>
          </div>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="/#about">About</a>
          <a href="/#services">Services</a>
          <a href="/#pricing">Pricing</a>
          <a href="/blog">Blog</a>
          <a href="/#order">Order</a>
          <a href="/#faq">FAQ</a>
          <a href="/#contact">Contact</a>
        </nav>
        <a className="header-cta" href="/#order">
          Get Free Quote
          <svg className="icon-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>
        
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </header>

      {/* Mobile Menu Panel */}
      <div className={`mobile-nav-panel ${isMobileMenuOpen ? "open" : ""}`} style={{ top: "80px" }}>
        <div className="mobile-nav-links">
          <a href="/#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="/#services" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
          <a href="/#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
          <a href="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</a>
          <a href="/#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>Process</a>
          <a href="/#order" onClick={() => setIsMobileMenuOpen(false)}>Order</a>
          <a href="/#faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
          <a href="/#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
        </div>
        <a className="mobile-nav-cta" href="/#order" onClick={() => setIsMobileMenuOpen(false)}>
          Get Free Quote
        </a>
      </div>

      {/* Module Hero Section */}
      <section className="hero-section theme-dark" style={{ minHeight: "75vh", paddingTop: "140px" }} id="home">
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "40px", alignItems: "center" }} className="about-grid">
            <div>
              <span className="hero-eyebrow" style={{ display: "inline-block" }}>
                {module.semester} Module Support
              </span>
              <h1 className="hero-title" style={{ textAlign: "left", fontSize: "clamp(30px, 4.5vw, 52px)", marginTop: "16px" }}>
                Pearson BTEC HND <br />
                <span className="highlight-text">{module.name}</span> <br />
                {module.abbreviation && <span>({module.abbreviation}) </span>}Assignment Help
              </h1>
              <p className="hero-subtitle" style={{ textAlign: "left", maxWidth: "100%", margin: "20px 0 32px" }}>
                {module.description}
              </p>
              <div className="hero-buttons" style={{ justifyContent: "flex-start" }}>
                <a href="/#order" className="btn-lime">
                  Get Free Quote
                  <svg className="icon-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
                <a href="/#pricing" className="btn-outline">View Modules</a>
              </div>
            </div>

            {/* Quick Details Card */}
            <div>
              <div className="performance-card">
                <div className="perf-header">
                  <h3 className="perf-title">Module Info</h3>
                  <span className="perf-tag" style={{ background: "var(--accent-lime-bg)", color: "var(--accent-lime)" }}>BTEC Syllabus</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", margin: "10px 0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "10px" }}>
                    <span style={{ color: "var(--text-dark-secondary)", fontSize: "14px" }}>Pass Pricing:</span>
                    <strong style={{ color: "#ffffff", fontSize: "14px" }}>{module.priceRange.split(" - ")[0]}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "10px" }}>
                    <span style={{ color: "var(--text-dark-secondary)", fontSize: "14px" }}>Distinction Pricing:</span>
                    <strong style={{ color: "var(--accent-lime)", fontSize: "14px" }}>{module.priceRange.split(" - ")[1]}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "10px" }}>
                    <span style={{ color: "var(--text-dark-secondary)", fontSize: "14px" }}>Plagiarism Check:</span>
                    <strong style={{ color: "#ffffff", fontSize: "14px" }}>Turnitin Included</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-dark-secondary)", fontSize: "14px" }}>Delivery Guarantee:</span>
                    <strong style={{ color: "#ffffff", fontSize: "14px" }}>Before Deadline</strong>
                  </div>
                </div>
                <div className="perf-tags">
                  <span className="perf-tag">CPD & Structure Mapping</span>
                  <span className="perf-tag">Code Files (Zip)</span>
                  <span className="perf-tag">Original Reports</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Covered Section */}
      <section className="about-section theme-light reveal-on-scroll" style={{ padding: "80px 0" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "48px" }} className="reveal-on-scroll">
            <span className="section-eyebrow-light">Curriculum Alignment</span>
            <h2 className="about-title" style={{ maxWidth: "700px", margin: "10px auto 0" }}>
              Key Topics & Deliverables Covered in {module.name}
            </h2>
            <p style={{ color: "var(--text-light-secondary)", marginTop: "12px" }}>
              We cover all learning outcomes specified by Pearson BTEC guidelines.
            </p>
          </div>

          <div className="bento-grid">
            {module.details.map((detail, idx) => (
              <div 
                key={idx} 
                className="bento-card tall reveal-on-scroll" 
                style={{ transitionDelay: `${(idx % 3) * 80}ms` }}
              >
                <div className="bento-icon">0{idx + 1}</div>
                <div className="bento-body">
                  <h3 className="bento-title" style={{ fontSize: "18px" }}>{detail}</h3>
                  <p className="bento-desc">
                    Comprehensive study guidance, theoretical analysis, system design modeling, and practical implementations as required by BTEC assessment criteria.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grade Criteria & Deliverables */}
      <section className="partnerships-section theme-dark reveal-on-scroll" style={{ padding: "80px 0" }}>
        <div className="section-container">
          <div className="partnerships-header-block reveal-on-scroll" style={{ textAlign: "center", margin: "0 auto 48px" }}>
            <span className="section-eyebrow-dark">- WHAT IS DELIVERED</span>
            <h2 className="partnerships-title" style={{ margin: "10px 0" }}>
              Academic Deliverables for <span>Distinction</span> Grade
            </h2>
            <p className="partnerships-desc" style={{ maxWidth: "600px", margin: "0 auto" }}>
              We compile and structure professional coursework assets that meet every high-tier grading requirement.
            </p>
          </div>

          <div className="stats-grid-horizontal">
            <div className="stat-card-premium reveal-on-scroll delay-1">
              <AnimatedCounter value={100} suffix="%" />
              <span className="stat-label">Pearson BTEC Rubric Mapping</span>
            </div>
            <div className="stat-card-premium reveal-on-scroll delay-2">
              <AnimatedCounter value={0} suffix="%" />
              <span className="stat-label">Plagiarism (Turnitin Report Included)</span>
            </div>
            <div className="stat-card-premium reveal-on-scroll delay-3">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Direct Writer Progress Updates</span>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "40px" }} className="reveal-on-scroll">
            <a href="/#order" className="btn-lime">Get Free Quote</a>
          </div>
        </div>
      </section>

      {/* Module Specific FAQ Section */}
      <section className="faq-section theme-light reveal-on-scroll" style={{ padding: "80px 0" }} id="faq">
        <div className="section-container">
          <div className="faq-grid-layout-two-col">
            <div className="faq-left-block reveal-on-scroll">
              <span className="section-eyebrow-light">FAQ</span>
              <h2 className="faq-main-title">Module specific queries</h2>
              <p className="faq-subtitle-desc">
                Got questions about the structure or deliverables for {module.name}? Here are some quick answers.
              </p>
            </div>

            <div className="faq-right-accordion">
              {moduleFaqs.map(([question, answer], idx) => (
                <div className={`faq-item reveal-on-scroll ${activeFaq === idx ? "active" : ""}`} key={idx} style={{ transitionDelay: `${idx * 80}ms` }}>
                  <button className="faq-question-btn" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                    <span>{question}</span>
                    <span className="faq-toggle-icon">+</span>
                  </button>
                  <div 
                    className="faq-answer" 
                    style={{ 
                      maxHeight: activeFaq === idx ? "250px" : "0",
                      opacity: activeFaq === idx ? 1 : 0,
                      transform: activeFaq === idx ? "translate3d(0, 0, 0)" : "translate3d(0, -8px, 0)",
                      transition: "all 0.35s ease"
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

      {/* Footer */}
      <footer className="site-footer theme-dark">
        <div className="section-container" style={{ padding: "40px 0 20px" }}>
          <div className="footer-top">
            <div className="footer-brand-info">
              <a className="brand" href="/" style={{ alignSelf: "flex-start" }}>
                <svg className="brand-logo-svg" width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="100" rx="24" fill="var(--accent-lime)" />
                  <path 
                    d="M50 32 L46 40 L41 38 L30 43 C20 40 12 46 8 56 C18 53 26 57 32 65 C36 58 42 55 50 62 C58 55 64 58 68 65 C74 57 82 53 92 56 C88 46 80 40 70 43 L59 38 L54 40 Z" 
                    fill="var(--bg-dark)" 
                  />
                </svg>
                <div className="brand-text">
                  <strong>ARNOVA</strong>
                  <small>Academic Studio</small>
                </div>
              </a>
              <p className="footer-brand-desc">
                Leading assignment and research support platform for HND engineering modules in Sri Lanka.
              </p>
              <p className="footer-brand-desc" style={{ fontSize: "11px", color: "var(--text-dark-muted)", marginTop: "8px" }}>
                Serving Colombo, Kandy, Galle, Jaffna, Negombo, and all major student hubs in Sri Lanka.
              </p>
            </div>
            
            <div className="footer-nav">
              <div className="footer-nav-col">
                <span className="footer-nav-title">Navigation</span>
                <div className="footer-nav-links">
                  <a href="/#about">About</a>
                  <a href="/#services">Services</a>
                  <a href="/#pricing">Pricing</a>
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
                  <a href="/#order">Place Order</a>
                  <a href="/#faq">FAQ</a>
                  <a href="/#contact">Contact</a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom" style={{ marginTop: "40px" }}>
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
