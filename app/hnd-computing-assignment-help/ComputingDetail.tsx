"use client";

import React, { useState, useEffect } from "react";

const computingModules = [
  { name: "Database Design & Development", slug: "database-design-development", abbreviation: "DDD", price: "Rs. 6,000" },
  { name: "Programming", slug: "programming", abbreviation: "Java/C#/Python", price: "Rs. 6,000" },
  { name: "Software Development Lifecycle", slug: "software-development-lifecycle", abbreviation: "SDLC", price: "Rs. 7,000" },
  { name: "Web Development & Designing", slug: "web-development-designing", abbreviation: "WDD", price: "Rs. 8,000" },
  { name: "Data Structures & Algorithms", slug: "data-structures-algorithms", abbreviation: "DSA", price: "Rs. 8,000" },
  { name: "Systems Analysis & Design", slug: "systems-analysis-design", abbreviation: "SAD", price: "Rs. 7,000" },
  { name: "Networking", slug: "networking", abbreviation: "CISCO", price: "Rs. 6,000" },
  { name: "Professional Practice", slug: "professional-practice", abbreviation: "PP", price: "Rs. 5,000" },
  { name: "Computing Research Project", slug: "computing-research-project-1", abbreviation: "CRP", price: "Rs. 6,000" },
];

export default function ComputingDetail() {
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

  const faqs = [
    ["Which HND Computing modules do you cover?", "We cover the full Pearson BTEC specification, including Programming, Database Design (DDD), Networking, SDLC, SAD, UX/UI, and DSA."],
    ["Do you provide working source code?", "Absolutely. All programming and database tasks include executable code (Java, C#, Python, SQL) and step-by-step setup guides."],
    ["How can I be sure the assignments are plagiarism-free?", "We write everything from scratch based on your syllabus details. Every delivery includes a free Turnitin plagiarism checking report."],
  ];

  return (
    <main>
      {/* Header */}
      <header className="site-header scrolled">
        <a className="brand" href="/" aria-label="ARNOVA home">
          <svg className="brand-logo-svg" width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="24" fill="var(--accent-lime)" />
            <path d="M50 32 L46 40 L41 38 L30 43 C20 40 12 46 8 56 C18 53 26 57 32 65 C36 58 42 55 50 62 C58 55 64 58 68 65 C74 57 82 53 92 56 C88 46 80 40 70 43 L59 38 L54 40 Z" fill="var(--bg-dark)" />
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
        <a className="header-cta" href="/#order">Get Free Quote <svg className="icon-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg></a>
        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle navigation menu">
          {isMobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
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
        <a className="mobile-nav-cta" href="/#order" onClick={() => setIsMobileMenuOpen(false)}>Get Free Quote</a>
      </div>

      {/* Hero Section */}
      <section className="hero-section theme-dark" style={{ minHeight: "70vh", paddingTop: "140px" }}>
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "40px", alignItems: "center" }} className="about-grid">
            <div>
              <span className="hero-eyebrow">Academic Stream support</span>
              <h1 className="hero-title" style={{ textAlign: "left", fontSize: "clamp(30px, 4.5vw, 52px)", marginTop: "16px" }}>
                Pearson BTEC HND <br />
                <span className="highlight-text">Computing</span> Assignment Help Sri Lanka
              </h1>
              <p className="hero-subtitle" style={{ textAlign: "left", maxWidth: "100%", margin: "20px 0 32px" }}>
                Comprehensive coursework, SQL script modeling, Packet Tracer builds, and research documents tailored directly to your Computing curriculum. Secure Distinction grades with our expert guidance.
              </p>
              <div className="hero-buttons" style={{ justifyContent: "flex-start" }}>
                <a href="/#order" className="btn-lime">Get Free Quote</a>
                <a href="/#pricing" className="btn-outline">View Semester Prices</a>
              </div>
            </div>
            <div>
              <div className="performance-card">
                <div className="perf-header">
                  <h3 className="perf-title">Syllabus Coverage</h3>
                  <span className="perf-tag">Syllabus Aligned</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "10px 0", fontSize: "14px" }}>
                  <p>✔ Comprehensive design mapping</p>
                  <p>✔ Normalized ERD diagrams & schema files</p>
                  <p>✔ Cisco simulated environments (.pkt)</p>
                  <p>✔ Full source files & testing audits</p>
                </div>
                <div className="perf-tags">
                  <span className="perf-tag">Pass Target</span>
                  <span className="perf-tag">Merit Target</span>
                  <span className="perf-tag">Distinction Target</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module Links Section */}
      <section className="about-section theme-light reveal-on-scroll" style={{ padding: "80px 0" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "48px" }} className="reveal-on-scroll">
            <span className="section-eyebrow-light">Choose Module Page</span>
            <h2 className="about-title">Dedicated Computing Module Guides</h2>
            <p style={{ color: "var(--text-light-secondary)" }}>Click any module below to view detailed support guides and target deliverables.</p>
          </div>

          <div className="bento-grid">
            {computingModules.map((module, idx) => (
              <a 
                href={`/modules/${module.slug}`} 
                key={idx} 
                className="bento-card reveal-on-scroll" 
                style={{ display: "block", transitionDelay: `${(idx % 4) * 80}ms` }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="bento-icon">{module.abbreviation}</div>
                  <span style={{ fontSize: "12px", color: "var(--text-light-muted)", fontWeight: 600 }}>From {module.price}</span>
                </div>
                <div style={{ marginTop: "16px" }}>
                  <h3 className="bento-title" style={{ fontSize: "18px", margin: 0 }}>{module.name}</h3>
                  <p className="bento-desc" style={{ marginTop: "6px" }}>Get custom-written reports, UML specs, and structured code models mapped to learning criteria.</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="faq-section theme-light reveal-on-scroll" style={{ padding: "80px 0" }}>
        <div className="section-container">
          <div className="faq-grid-layout-two-col">
            <div className="faq-left-block reveal-on-scroll">
              <span className="section-eyebrow-light">FAQ</span>
              <h2 className="faq-main-title">Computing Stream Help</h2>
            </div>
            <div className="faq-right-accordion">
              {faqs.map(([question, answer], idx) => (
                <div className={`faq-item reveal-on-scroll ${activeFaq === idx ? "active" : ""}`} key={idx} style={{ transitionDelay: `${idx * 80}ms` }}>
                  <button className="faq-question-btn" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                    <span>{question}</span>
                    <span className="faq-toggle-icon">+</span>
                  </button>
                  <div className="faq-answer" style={{ maxHeight: activeFaq === idx ? "200px" : "0", opacity: activeFaq === idx ? 1 : 0, transition: "all 0.35s ease" }}>
                    <div className="faq-answer-inner"><p>{answer}</p></div>
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
                  <path d="M50 32 L46 40 L41 38 L30 43 C20 40 12 46 8 56 C18 53 26 57 32 65 C36 58 42 55 50 62 C58 55 64 58 68 65 C74 57 82 53 92 56 C88 46 80 40 70 43 L59 38 L54 40 Z" fill="var(--bg-dark)" />
                </svg>
                <div className="brand-text">
                  <strong>ARNOVA</strong>
                  <small>Academic Studio</small>
                </div>
              </a>
              <p className="footer-brand-desc">Leading assignment and research support platform for HND engineering modules in Sri Lanka.</p>
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
            <span className="footer-copyright">© {new Date().getFullYear()} ARNOVA Academic Studio. All rights reserved.</span>
            <span className="footer-disclaimer" style={{ display: "block", fontSize: "11px", color: "var(--text-dark-muted)", marginTop: "12px", lineHeight: "1.4" }}>
              Disclaimer: All assistance, solutions, and reports provided by ARNOVA are intended strictly for study, drafting, and research guidance purposes. Students are expected to adhere to their university academic integrity policies.
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
