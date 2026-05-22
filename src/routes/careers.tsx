import { createFileRoute, Link } from "@tanstack/react-router";
import { ParticlesCanvas } from "@/components/ParticlesCanvas";
import { NLogo } from "@/components/NLogo";
import { InternForm } from "@/components/InternForm";
import { ArrowLeft } from "lucide-react";

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
  return (
    <main style={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}>
      <ParticlesCanvas />

      <nav className="nav">
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-0.02em", display: "inline-flex", alignItems: "center", gap: 10 }}>
            <NLogo size={26} id="n-grad-careers" />
            <span><span className="brand-w">Ne</span><span className="brand-x">x</span><span className="brand-w">yvo</span></span>
          </Link>
          <Link to="/" className="nav-link" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <ArrowLeft size={14} /> Back to home
          </Link>
        </div>
      </nav>

      <section style={{ position: "relative", padding: "120px 28px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <div className="radial-glow" />
        <div className="bg-grid" style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.5, maskImage: "radial-gradient(ellipse at 50% 30%, #000 30%, transparent 75%)" }} />

        <div style={{ position: "relative", textAlign: "center", marginBottom: 50 }}>
          <span className="pill"><span className="pill-dot" />Open Applications · 2025</span>
          <h1 className="hero-h" style={{ marginTop: 18, fontSize: "clamp(2.2rem, 5vw, 3.6rem)" }}>
            Build the <span className="serif-i">next decade</span><br />
            of intelligent software.
          </h1>
          <p className="text-2" style={{ fontSize: ".9rem", lineHeight: 1.8, marginTop: 18, maxWidth: 560, margin: "18px auto 0" }}>
            A 3–4 month internship at Nexyvo. Ship real products. Learn from the founder. Earn a performance-based stipend.
          </p>
        </div>

        <div style={{ position: "relative" }}>
          <InternForm />
        </div>
      </section>

      <footer style={{ borderTop: "1px solid var(--cb)", padding: "26px 28px", marginTop: 40 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontWeight: 700, letterSpacing: "-0.02em", display: "inline-flex", alignItems: "center", gap: 10 }}>
            <NLogo size={22} id="n-grad-careers-foot" />
            <span><span className="brand-w">Ne</span><span className="brand-x">x</span><span className="brand-w">yvo Technologies</span></span>
          </div>
          <div style={{ fontSize: ".7rem", color: "var(--text2)" }}>© 2025 Nexyvo Technologies.</div>
        </div>
      </footer>
    </main>
  );
}
