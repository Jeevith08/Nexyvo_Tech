import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { IntroScreen } from "@/components/IntroScreen";
import { ParticlesCanvas } from "@/components/ParticlesCanvas";
import { NLogo } from "@/components/NLogo";
import { MadLibsForm } from "@/components/MadLibsForm";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Nexyvo Technologies — Innovate Beyond. Build Intelligent." },
      { name: "description", content: "Nexyvo Technologies builds AI-powered software, healthcare platforms like Care360, and intelligent automation systems." },
      { property: "og:title", content: "Nexyvo Technologies" },
      { property: "og:description", content: "AI-powered software, healthcare platforms, and intelligent automation." },
    ],
  }),
});

const services = [
  { i: "🌐", t: "Web Development", d: "Modern, performant web platforms built with the latest frameworks.", c: "#7c6fff" },
  { i: "📱", t: "Mobile App Development", d: "Native-feeling iOS & Android apps with a single codebase.", c: "#5eead4" },
  { i: "🧠", t: "AI Applications", d: "Production-grade AI features tailored to real business problems.", c: "#b8a9ff" },
  { i: "⚙️", t: "Custom Software", d: "Bespoke systems engineered around your workflows.", c: "#7c6fff" },
  { i: "📊", t: "Dashboard Systems", d: "Live data visualization & analytics dashboards.", c: "#5eead4" },
  { i: "🏥", t: "Healthcare Tech", d: "HIPAA-aware platforms for clinics and hospitals.", c: "#b8a9ff" },
  { i: "☁️", t: "Cloud Platforms", d: "Scalable cloud-native architectures, serverless first.", c: "#7c6fff" },
  { i: "🎨", t: "UI/UX Design", d: "Refined interfaces that feel premium and intuitive.", c: "#5eead4" },
  { i: "🔗", t: "API & Automation", d: "Integrations and AI automations that remove busywork.", c: "#b8a9ff" },
];

const care360 = [
  "AI Patient Timeline",
  "OCR Report Reading",
  "Voice-Based Doctor Consultation",
  "AI Patient Summary",
  "Role-Based Dashboard System",
  "Queue & Token Management",
  "Digital Prescriptions",
  "Pregnancy Risk Alerts",
  "Unified Medical History System",
];

const roles = [
  { i: "🛡️", t: "Admin Dashboard", d: "Full control over operations, staff, and analytics.", c: "#7c6fff" },
  { i: "🩺", t: "Doctor Panel", d: "Patient queue, voice notes, prescriptions and history.", c: "#5eead4" },
  { i: "💉", t: "Nurse Panel", d: "Vitals capture, alerts and ward management.", c: "#b8a9ff" },
  { i: "👤", t: "Patient Portal", d: "Bookings, reports, prescriptions and AI summaries.", c: "#5eead4" },
];

const goals = [
  { n: "01", t: "AI SaaS Platforms", d: "Launch a suite of focused, AI-native SaaS products." },
  { n: "02", t: "Healthcare Tech Expansion", d: "Bring Care360 to clinics and hospitals globally." },
  { n: "03", t: "Enterprise Workflow Systems", d: "Build automation layers for large organizations." },
  { n: "04", t: "Intelligent Automation", d: "Replace repetitive ops with agentic AI pipelines." },
  { n: "05", t: "Global Tech Brand", d: "Grow Nexyvo into a recognized engineering brand." },
  { n: "06", t: "Educational Tech", d: "Tools that make modern engineering accessible to all." },
];

function Particles() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const dots = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => {
        const size = 1 + Math.random() * 2.5;
        return {
          key: i,
          left: Math.random() * 100,
          size,
          dur: 14 + Math.random() * 22,
          delay: Math.random() * 20,
          opacity: 0.25 + Math.random() * 0.5,
          x: (Math.random() - 0.5) * 80,
          color: Math.random() > 0.7 ? "var(--acc3)" : "var(--acc2)",
        };
      }),
    [],
  );
  if (!ready) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <span
          key={d.key}
          className="particle"
          style={
            {
              left: `${d.left}%`,
              width: d.size,
              height: d.size,
              background: d.color,
              animationDuration: `${d.dur}s`,
              animationDelay: `${d.delay}s`,
              ["--o" as any]: d.opacity,
              ["--x" as any]: `${d.x}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function Scene3D() {
  return (
    <div className="scene">
      {/* Chips */}
      <div className="chip chip-1">
        <span className="chip-icon" style={{ background: "rgba(124,111,255,.25)", color: "#b8a9ff" }}>✦</span>
        AI-Powered
      </div>
      <div className="chip chip-2">
        <span className="chip-icon" style={{ background: "rgba(94,234,212,.2)", color: "#5eead4" }}>☁</span>
        Cloud Native
      </div>
      <div className="chip chip-3">
        <span className="chip-icon" style={{ background: "rgba(184,169,255,.22)", color: "#b8a9ff" }}>⇡</span>
        Scalable
      </div>

      {/* Phone */}
      <div className="phone">
        <div className="phone-card">
          <div className="l">Patients</div>
          <div className="v">1,284</div>
        </div>
        <div className="phone-card">
          <div className="l">AI Accuracy</div>
          <div className="v">98.6%</div>
        </div>
        <div className="phone-chart">
          {[40, 70, 55, 85, 60, 95, 75].map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>

      {/* Laptop */}
      <div className="laptop">
        <div className="laptop-shadow" />
        <div className="laptop-screen">
          <div className="dots">
            <span className="dot r" /><span className="dot y" /><span className="dot g" />
          </div>
          <div className="mini-grid">
            {[
              { l: "Patients", c: "#7c6fff" },
              { l: "Doctors", c: "#5eead4" },
              { l: "Alerts", c: "#ff7ab6" },
              { l: "Revenue", c: "#b8a9ff" },
            ].map((m) => (
              <div key={m.l} className="mini-card">
                <div className="mini-label">{m.l}</div>
                <div className="mini-bars">
                  {[30, 60, 45, 80, 55].map((h, i) => (
                    <span key={i} className="mini-bar" style={{ height: `${h}%`, background: m.c, opacity: 0.35 + i * 0.15 }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="laptop-hinge" />
        <div className="laptop-base" />
      </div>
    </div>
  );
}

function DashMock() {
  return (
    <div className="dash">
      <div className="dash-head">
        <div>
          <div className="dash-title">Care360 — Operations</div>
          <div style={{ fontSize: ".55rem", color: "var(--text2)", textTransform: "uppercase", letterSpacing: ".08em", marginTop: 2 }}>
            Today · Live
          </div>
        </div>
        <div className="dots"><span className="dot r" /><span className="dot y" /><span className="dot g" /></div>
      </div>
      <div className="stat-row">
        <div className="stat-card"><div className="l">Patients Today</div><div className="v">248</div><div className="d">+12.4%</div></div>
        <div className="stat-card"><div className="l">Doctors Active</div><div className="v">36</div><div className="d">+3</div></div>
        <div className="stat-card"><div className="l">Risk Alerts</div><div className="v">7</div><div className="d" style={{ color: "#ff7ab6" }}>2 critical</div></div>
      </div>
      <div className="bar-chart">
        {[45, 70, 55, 90, 65, 80, 95].map((h, i) => (
          <span key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="patient-table">
        {[
          { n: "A", name: "Aarav Mehta", s: "In Queue", c: "s-queue", bg: "linear-gradient(135deg,#5eead4,#7c6fff)" },
          { n: "P", name: "Priya Sharma", s: "Consulting", c: "s-cons", bg: "linear-gradient(135deg,#b8a9ff,#7c6fff)" },
          { n: "R", name: "Rahul Iyer", s: "Discharged", c: "s-disc", bg: "linear-gradient(135deg,#7c6fff,#5eead4)" },
        ].map((p) => (
          <div key={p.n} className="patient-row">
            <span className="avatar" style={{ background: p.bg }}>{p.n}</span>
            <span style={{ color: "var(--text)" }}>{p.name}</span>
            <span className={`status ${p.c}`}>{p.s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Index() {
  const [active, setActive] = useState<string>("top");
  useEffect(() => {
    const ids = ["services", "care360", "about", "vision", "goals", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main style={{ position: "relative", overflow: "hidden" }}>
      <IntroScreen />
      <ParticlesCanvas />
      {/* NAV */}
      <nav className="nav">
        <div className="enter-nav" style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#top" style={{ fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-0.02em", display: "inline-flex", alignItems: "center", gap: 10 }}>
            <NLogo size={26} id="n-grad-nav" />
            <span><span className="brand-w">Ne</span><span className="brand-x">x</span><span className="brand-w">yvo</span></span>
          </a>
          <div className="nav-links">
            {["Services", "Care360", "About", "Vision", "Goals"].map((l) => {
              const id = l.toLowerCase();
              return (
                <a
                  key={l}
                  href={`#${id}`}
                  onClick={(e) => handleNav(e, id)}
                  className={`nav-link ${active === id ? "is-active" : ""}`}
                >
                  {l}
                </a>
              );
            })}
          </div>
          <a href="#contact" onClick={(e) => handleNav(e, "contact")} className="btn btn-primary nav-cta">Get in Touch →</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="top" style={{ position: "relative", padding: "140px 28px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="radial-glow" />
        <div className="bg-grid" style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.6, maskImage: "radial-gradient(ellipse at 50% 30%, #000 30%, transparent 75%)" }} />
        <Particles />
        <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 40, alignItems: "center" }} className="hero-grid">
          <div className="enter-hero-text">
            <span className="pill"><span className="pill-dot" />Nexyvo Technologies · Est. 2025</span>
            <h1 className="hero-h" style={{ marginTop: 18 }}>
              Innovate Beyond.<br />
              Build <span className="serif-i">Intelligent.</span>
            </h1>
            <p className="text-2" style={{ fontSize: ".88rem", lineHeight: 1.75, marginTop: 16, maxWidth: 480 }}>
              We craft AI-driven software, healthcare platforms, and intelligent automation systems for the next decade of digital products.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <a href="#care360" className="btn btn-primary">Explore Care360 →</a>
              <a href="#services" className="btn btn-ghost">Our Services</a>
            </div>
            <div style={{ display: "flex", gap: 32, marginTop: 36 }}>
              {[
                { n: "10+", l: "Services" },
                { n: "4+", l: "Industries" },
                { n: "2×", l: "Models" },
              ].map((s) => (
                <div key={s.l}>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.03em" }}>{s.n}</div>
                  <div style={{ fontSize: ".62rem", color: "var(--text2)", textTransform: "uppercase", letterSpacing: ".08em", marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="enter-hero-media"><Scene3D /></div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: 1200, margin: "0 auto" }} />

      {/* SERVICES */}
      <section id="services" style={{ padding: "90px 28px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <span className="section-tag">What we build</span>
          <h2 className="sec-h" style={{ marginTop: 14 }}>
            Engineering across the <span className="serif-i">full stack.</span>
          </h2>
          <p className="text-2" style={{ marginTop: 12, fontSize: ".85rem", maxWidth: 520, margin: "12px auto 0" }}>
            From product design to AI infrastructure — a complete service layer for ambitious teams.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }} className="svc-grid">
          {services.map((s) => (
            <div key={s.t} className="card-base card-hover" style={{ padding: 22 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, display: "grid", placeItems: "center", background: `${s.c}22`, border: `1px solid ${s.c}44`, fontSize: ".95rem" }}>{s.i}</div>
              <h3 style={{ fontSize: ".95rem", fontWeight: 600, marginTop: 14, letterSpacing: "-0.01em" }}>{s.t}</h3>
              <p className="text-2" style={{ fontSize: ".78rem", lineHeight: 1.7, marginTop: 6 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CARE360 */}
      <section id="care360" style={{ position: "relative", padding: "100px 28px" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 50% at 30% 50%, rgba(124,111,255,0.10), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="care-grid">
          <div>
            <span className="section-tag">Flagship Product</span>
            <h2 className="sec-h" style={{ marginTop: 14 }}>
              Nexyvo <span className="serif-i">Care360</span>
            </h2>
            <p className="text-2" style={{ fontSize: ".88rem", marginTop: 14, lineHeight: 1.75, maxWidth: 480 }}>
              An AI-powered maternity hospital management ecosystem — unifying patients, doctors, nurses, and admin into one intelligent workflow.
            </p>
            <ul style={{ marginTop: 22, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 18px" }}>
              {care360.map((f) => (
                <li key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: ".78rem", color: "var(--text)" }}>
                  <span className="fdot" />{f}
                </li>
              ))}
            </ul>
          </div>
          <DashMock />
        </div>
      </section>

      {/* ROLES */}
      <section style={{ padding: "80px 28px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span className="section-tag">Role-Based Access</span>
          <h2 className="sec-h" style={{ marginTop: 14 }}>One platform. <span className="serif-i">Four perspectives.</span></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }} className="role-grid">
          {roles.map((r) => (
            <div key={r.t} className="card-base card-hover" style={{ padding: 22, position: "relative", overflow: "hidden" }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", display: "grid", placeItems: "center", background: `${r.c}22`, border: `1px solid ${r.c}55`, fontSize: "1rem" }}>{r.i}</div>
              <h3 style={{ fontSize: ".92rem", fontWeight: 600, marginTop: 14 }}>{r.t}</h3>
              <p className="text-2" style={{ fontSize: ".76rem", lineHeight: 1.7, marginTop: 6 }}>{r.d}</p>
              <div style={{ height: 2, marginTop: 18, borderRadius: 2, background: `linear-gradient(90deg, ${r.c}, transparent)` }} />
            </div>
          ))}
        </div>
      </section>

      {/* VISION / MISSION */}
      <section id="vision" style={{ padding: "80px 28px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span className="section-tag">Why we exist</span>
          <h2 className="sec-h" style={{ marginTop: 14 }}>Vision &amp; <span className="serif-i">Mission.</span></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }} className="vm-grid">
          {[
            { n: "01", t: "Vision", i: "🔭", c: "#7c6fff", d: "Build intelligent digital ecosystems that simplify complex workflows using modern software engineering and AI-driven automation." },
            { n: "02", t: "Mission", i: "🚀", c: "#5eead4", d: "Create scalable and impactful digital products that improve efficiency, user experience, and business operations across healthcare, enterprise, and SaaS." },
          ].map((v) => (
            <div key={v.t} className="card-base card-hover" style={{ padding: 30, position: "relative", overflow: "hidden" }}>
              <div className="glow-tr" style={{ background: v.c }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "3rem", color: "var(--text3)", lineHeight: 1 }}>{v.n}</span>
                <span style={{ fontSize: "1.6rem" }}>{v.i}</span>
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 18 }}>{v.t}</h3>
              <p className="text-2" style={{ fontSize: ".82rem", lineHeight: 1.75, marginTop: 8 }}>{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOUNDER */}
      <section id="about" style={{ padding: "60px 28px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="card-base" style={{ padding: 30, display: "flex", gap: 26, alignItems: "center" }}>
          <div className="ring"><div className="ring-inner">J</div></div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.02em" }}>Jeevith</h3>
              <span className="pill" style={{ color: "var(--acc2)", borderColor: "rgba(124,111,255,0.3)", background: "rgba(124,111,255,0.08)" }}>Founder & Full Stack Developer</span>
            </div>
            <p className="text-2" style={{ fontSize: ".82rem", lineHeight: 1.75, marginTop: 10, maxWidth: 720 }}>
              Building Nexyvo with a single belief — that thoughtful engineering and AI can quietly transform entire industries. From healthcare to enterprise SaaS, every product ships with craft, calm, and purpose.
            </p>
          </div>
        </div>
      </section>

      {/* GOALS */}
      <section id="goals" style={{ padding: "80px 28px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span className="section-tag">Where we&apos;re headed</span>
          <h2 className="sec-h" style={{ marginTop: 14 }}>Future <span className="serif-i">goals.</span></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="goal-grid">
          {goals.map((g) => (
            <div key={g.n} className="card-base card-hover" style={{ padding: 26, display: "flex", gap: 22, alignItems: "flex-start" }}>
              <span className="big-num">{g.n}</span>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, letterSpacing: "-0.01em" }}>{g.t}</h3>
                <p className="text-2" style={{ fontSize: ".8rem", lineHeight: 1.7, marginTop: 6 }}>{g.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TAGLINE / CTA */}
      <section id="contact" style={{ padding: "120px 28px 100px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(50% 60% at 50% 50%, rgba(124,111,255,0.18), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 820, margin: "0 auto" }}>
          <span className="section-tag">Let&apos;s build</span>
          <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05, marginTop: 18 }}>
            Innovate <span className="serif-i">beyond</span>. Build <span className="serif-i">intelligent</span>.
          </h2>
          <p className="text-2" style={{ fontSize: ".88rem", lineHeight: 1.75, marginTop: 16, maxWidth: 520, margin: "16px auto 32px" }}>
            Fill in the blanks. We'll take it from there.
          </p>
          <div style={{ textAlign: "left" }}>
            <MadLibsForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--cb)", padding: "26px 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontWeight: 700, letterSpacing: "-0.02em", display: "inline-flex", alignItems: "center", gap: 10 }}>
            <NLogo size={22} id="n-grad-foot" />
            <span><span className="brand-w">Ne</span><span className="brand-x">x</span><span className="brand-w">yvo Technologies</span></span>
          </div>
          <div style={{ fontSize: ".7rem", color: "var(--text2)" }}>© 2025 Nexyvo Technologies. All rights reserved.</div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid, .care-grid, .vm-grid { grid-template-columns: 1fr !important; }
          .svc-grid, .role-grid, .goal-grid { grid-template-columns: 1fr 1fr !important; }
          .scene { height: 420px; }
        }
        @media (max-width: 560px) {
          .svc-grid, .role-grid, .goal-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
