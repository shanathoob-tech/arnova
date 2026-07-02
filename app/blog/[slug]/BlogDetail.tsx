"use client";

import React, { useState, useEffect } from "react";
import { blogPosts } from "../data";

interface BlogDetailProps {
  slug: string;
}

export default function BlogDetail({ slug }: BlogDetailProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const post = blogPosts[slug];

  if (!post) {
    return (
      <main className="theme-dark" style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <div style={{ textAlign: "center", padding: "40px" }}>
          <h1 style={{ fontSize: "3rem", color: "var(--accent-lime)", marginBottom: "20px" }}>404</h1>
          <p style={{ color: "var(--text-dark-secondary)", marginBottom: "30px" }}>Article Not Found</p>
          <a href="/blog" className="btn-lime">Back to Blog</a>
        </div>
      </main>
    );
  }

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

      {/* Hero Header */}
      <section className="hero-section theme-dark" style={{ minHeight: "45vh", paddingTop: "140px", paddingBottom: "40px" }}>
        <div className="section-container" style={{ maxWidth: "800px" }}>
          <a href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--accent-lime)", fontSize: "14px", fontWeight: 600, textDecoration: "none", marginBottom: "16px" }}>
            ← Back to Study Guides
          </a>
          <h1 className="hero-title" style={{ textAlign: "left", fontSize: "clamp(28px, 4vw, 44px)", marginTop: "10px", lineHeight: "1.2" }}>
            {post.title}
          </h1>
          <div style={{ display: "flex", gap: "16px", marginTop: "24px", color: "var(--text-dark-secondary)", fontSize: "14px" }}>
            <span>By {post.author}</span>
            <span>•</span>
            <span>{post.publishedAt}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Content Container */}
      <section className="about-section theme-light" style={{ padding: "60px 0 100px" }}>
        <div className="section-container" style={{ maxWidth: "800px" }}>
          <article 
            className="blog-rich-content"
            style={{
              fontSize: "16px",
              lineHeight: "1.75",
              color: "var(--text-light-secondary)"
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Quick CTA Box */}
          <div 
            style={{ 
              marginTop: "60px", 
              background: "var(--bg-dark)", 
              color: "#ffffff", 
              padding: "40px", 
              borderRadius: "var(--radius-lg)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              textAlign: "center"
            }}
          >
            <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#ffffff", marginBottom: "12px" }}>
              Struggling with your Computing Assignment?
            </h3>
            <p style={{ color: "var(--text-dark-secondary)", maxWidth: "540px", margin: "0 auto 24px" }}>
              Get help from ARNOVA's subject specialists. 100% original, BTEC-aligned solutions delivered on time.
            </p>
            <a href="/#order" className="btn-lime">
              Get Free Quote
            </a>
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
