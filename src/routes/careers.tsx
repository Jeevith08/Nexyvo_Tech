import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ParticlesCanvas } from "@/components/ParticlesCanvas";
import { NLogo } from "@/components/NLogo";
import { InternForm } from "@/components/InternForm";
import {
  ArrowLeft, MapPin, Clock, Wallet, Users, Palette, Smartphone,
  Layers, MonitorSmartphone, Server, Sparkles, Rocket, HeartHandshake,
  GraduationCap, BadgeCheck, Coffee, Menu, X,
} from "lucide-react";

const OPEN_ROLES = [
  { Ic: Palette,           t: "UI / UX Design Intern",       d: "Design intuitive interfaces and contribute to our evolving design system.", id: "UI/UX Design" },
  { Ic: Smartphone,        t: "Flutter Developer Intern",    d: "Build cross-platform mobile experiences shipped to real users.", id: "App Development (Flutter)" },
  { Ic: Layers,            t: "Full Stack Engineer Intern",  d: "Own features end-to-end across frontend, backend, and infra.", id: "Full Stack Development" },
  { Ic: MonitorSmartphone, t: "Frontend Engineer Intern",    d: "Craft fast, accessible React + TypeScript interfaces.", id: "Frontend Development" },
  { Ic: Server,            t: "Backend Engineer Intern",     d: "Design APIs, data models, and resilient services in the cloud.", id: "Backend Development" },
];

const BENEFITS = [
  { Ic: Wallet,         t: "Performance stipend",   d: "Rewarded on impact, not just hours." },
  { Ic: Rocket,         t: "Ship real products",    d: "Your work goes live to real customers." },
  { Ic: HeartHandshake, t: "1:1 founder mentorship", d: "Direct guidance, weekly check-ins." },
  { Ic: BadgeCheck,     t: "Certificate & letter",  d: "Verified on completion of internship." },
  { Ic: GraduationCap,  t: "Learning budget",       d: "Courses, books, tooling — covered." },
  { Ic: Coffee,         t: "Flexible, remote-first", d: "Work where you do your best thinking." },
];

export const Route = createFileRoute("/careers")({
  component: CareersPage,
  head: () => ({
    meta: [
      { title: "Careers — Nexyvo Technologies" },
      { name: "description", content: "Join Nexyvo Technologies. 3–4 month internships in UI/UX, Flutter, Full Stack, Frontend, and Backend with a performance-based stipend." },
      { property: "og:title", content: "Careers at Nexyvo" },
      { property: "og:description", content: "Internships at Nexyvo — ship real products, mentored by the founder." },
    ],
  }),
});

function CareersPage() {
  const [selectedPosition, setSelectedPosition] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleApply = (positionId: string) => {
    setSelectedPosition(positionId);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const handleCancel = () => {
    setShowForm(false);
    setTimeout(() => {
      document.getElementById("roles")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <main style={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}>
      <ParticlesCanvas />

      <nav className="nav">
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-0.02em", display: "inline-flex", alignItems: "center", gap: 10 }}>
            <NLogo size={26} id="n-grad-careers" />
            <span><span className="brand-w">Ne</span><span className="brand-x">x</span><span className="brand-w">yvo</span></span>
          </Link>
          <div className="nav-links">
            <Link to="/#services" className="nav-link">Services</Link>
            <Link to="/#vision" className="nav-link">Vision</Link>
            <Link to="/#goals" className="nav-link">Goals</Link>
            <Link to="/careers" className="nav-link is-active">Careers</Link>
          </div>
          <a href="#roles" className="btn btn-primary nav-cta" style={{ fontSize: ".72rem", padding: ".55rem 1rem" }} onClick={(e) => { e.preventDefault(); handleCancel(); }}>Apply now</a>

          {/* Hamburger toggle button visible on mobile */}
          <button className="menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle Navigation Menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav ${mobileOpen ? "is-open" : ""}`}>
        <Link to="/#services" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Services</Link>
        <Link to="/#vision" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Vision</Link>
        <Link to="/#goals" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Goals</Link>
        <Link to="/careers" className="mobile-nav-link is-active" onClick={() => setMobileOpen(false)}>Careers</Link>
        <a
          href="#roles"
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            handleCancel();
          }}
          className="btn btn-primary"
          style={{ marginTop: 12 }}
        >
          Apply now
        </a>
      </div>

      {/* Hero */}
      {!showForm && (
        <section style={{ position: "relative", padding: "120px 28px 60px", maxWidth: 1000, margin: "0 auto" }}>
          <div className="radial-glow" />
          <div className="bg-grid" style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.4, maskImage: "radial-gradient(ellipse at 50% 30%, #000 30%, transparent 75%)" }} />
          <div style={{ position: "relative", maxWidth: 760 }}>
            <span className="pill"><span className="pill-dot" />Careers · 2026 Internship Program</span>
            <h1 className="hero-h" style={{ marginTop: 18, fontSize: "clamp(2.2rem, 5vw, 3.4rem)", lineHeight: 1.08 }}>
              Build the <span className="serif-i">next decade</span> of intelligent software.
            </h1>
            <p className="text-2" style={{ fontSize: ".92rem", lineHeight: 1.75, marginTop: 20, maxWidth: 580 }}>
              Join Nexyvo Technologies as an intern. Work on real products with a small, senior team — and ship work that reaches real users from week one.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 26, flexWrap: "wrap" }}>
              <a href="#roles" className="btn btn-primary" style={{ fontSize: ".8rem" }} onClick={(e) => { e.preventDefault(); handleCancel(); }}>Apply now</a>
              <a href="#roles" className="btn btn-ghost" style={{ fontSize: ".8rem" }} onClick={(e) => { e.preventDefault(); handleCancel(); }}>View open roles</a>
            </div>
            <div style={{ display: "flex", gap: 28, marginTop: 36, flexWrap: "wrap", fontSize: ".74rem", color: "var(--text2)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Clock size={13} /> 3–4 months</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Wallet size={13} /> Performance stipend</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><MapPin size={13} /> Remote · Hybrid</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Users size={13} /> 5 open positions</span>
            </div>
          </div>
        </section>
      )}

      {/* Why Nexyvo */}
      {!showForm && (
        <section style={{ position: "relative", padding: "50px 28px", maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ marginBottom: 24 }}>
            <span className="section-tag">Life at Nexyvo</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.02em", marginTop: 12 }}>What you get when you join</h2>
          </div>
          <div className="ap-benefits">
            {BENEFITS.map((b) => (
              <div key={b.t} className="ap-benefit">
                <div className="ap-benefit-ic"><b.Ic size={16} strokeWidth={1.7} /></div>
                <div className="ap-benefit-t">{b.t}</div>
                <div className="ap-benefit-d">{b.d}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Open roles */}
      {!showForm && (
        <section id="roles" style={{ position: "relative", padding: "60px 28px", maxWidth: 1000, margin: "0 auto", scrollMarginTop: 80 }}>
          <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
            <div>
              <span className="section-tag">Open Positions</span>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.02em", marginTop: 12 }}>Currently hiring</h2>
            </div>
            <span style={{ fontSize: ".75rem", color: "var(--text2)" }}>{OPEN_ROLES.length} roles · Applications close rolling</span>
          </div>
          <div className="ap-jobs">
            {OPEN_ROLES.map((r) => (
              <article key={r.t} className="ap-job">
                <header className="ap-job-head">
                  <div className="ap-job-ic"><r.Ic size={18} strokeWidth={1.6} /></div>
                  <span className="ap-job-type">Internship</span>
                </header>
                <div>
                  <div className="ap-job-t">{r.t}</div>
                  <p className="ap-job-d" style={{ marginTop: 6 }}>{r.d}</p>
                </div>
                <div className="ap-job-meta">
                  <span><MapPin size={11} /> Remote</span>
                  <span><Clock size={11} /> 3–4 months</span>
                  <span><Wallet size={11} /> Stipend</span>
                </div>
                <a href="#apply" className="ap-job-apply" onClick={(e) => { e.preventDefault(); handleApply(r.id); }}>Apply for this role <ArrowLeft size={12} style={{ transform: "rotate(180deg)" }} /></a>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Application */}
      {showForm && (
        <section id="apply" className="apply-section" style={{ position: "relative", maxWidth: 840, margin: "0 auto", scrollMarginTop: 80 }}>
          <div style={{ marginBottom: 24, textAlign: "center" }}>
            <span className="section-tag" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <Sparkles size={11} />
              <span>Apply</span>
            </span>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.1rem)", fontWeight: 600, letterSpacing: "-0.02em", marginTop: 12 }}>Start your application</h2>
            <p className="text-2" style={{ fontSize: ".82rem", marginTop: 8, maxWidth: 520, margin: "8px auto 0" }}>
              Takes about 4 minutes. You can save & review each step before submitting.
            </p>
          </div>
          <InternForm selectedPosition={selectedPosition} onPositionSelect={setSelectedPosition} onCancel={handleCancel} />
        </section>
      )}

      <footer style={{ borderTop: "1px solid var(--cb)", padding: "26px 28px", marginTop: 40 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontWeight: 700, letterSpacing: "-0.02em", display: "inline-flex", alignItems: "center", gap: 10 }}>
            <NLogo size={22} id="n-grad-careers-foot" />
            <span><span className="brand-w">Ne</span><span className="brand-x">x</span><span className="brand-w">yvo Technologies</span></span>
          </div>
          <div style={{ fontSize: ".7rem", color: "var(--text2)" }}>© 2026 Nexyvo Technologies.</div>
        </div>
      </footer>
    </main>
  );
}
