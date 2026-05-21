import { useState } from "react";

const ROLES = [
  { i: "🎨", t: "UI / UX Design", d: "Figma, design systems, prototyping" },
  { i: "📱", t: "App Development (Flutter)", d: "Cross-platform mobile apps" },
  { i: "🧩", t: "Full Stack", d: "End-to-end product engineering" },
  { i: "💻", t: "Frontend", d: "React, TypeScript, modern UI" },
  { i: "⚙️", t: "Backend", d: "APIs, databases, cloud" },
];

const ENDPOINT = "https://formsubmit.co/ajax/nexyvoofficial@gmail.com";

export function InternForm() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", college: "", year: "",
    skills: "", portfolio: "", resume: "", why: "",
  });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const upd = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const s1Ok = !!role;
  const s2Ok = form.name.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.phone.trim().length >= 7;
  const s3Ok = form.college.trim().length > 1 && !!form.year;
  const s4Ok = form.skills.trim().length > 1 && form.why.trim().length > 4;

  const send = async () => {
    setSending(true); setErr("");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Nexyvo Internship — ${role} — ${form.name}`,
          Role: role,
          Stipend: "Performance based",
          Duration: "3–4 months",
          ...form,
        }),
      });
      if (!res.ok) throw new Error("Network");
      setDone(true);
    } catch {
      // mailto fallback
      const body = `Role: ${role}\nStipend: Performance based\nDuration: 3-4 months\n\n` +
        Object.entries(form).map(([k, v]) => `${k}: ${v}`).join("\n");
      window.location.href = `mailto:nexyvoofficial@gmail.com?subject=${encodeURIComponent(`Nexyvo Internship — ${role} — ${form.name}`)}&body=${encodeURIComponent(body)}`;
      setErr("Opening your email app as fallback…");
    } finally { setSending(false); }
  };

  if (done) {
    return (
      <div className="intern-card" style={{ textAlign: "center", padding: 40 }}>
        <div style={{ fontSize: "2rem" }}>🎉</div>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginTop: 10 }}>Application received</h3>
        <p className="text-2" style={{ fontSize: ".82rem", marginTop: 8 }}>
          We'll review your profile for <b style={{ color: "var(--acc2)" }}>{role}</b> and reach out at <b style={{ color: "var(--acc2)" }}>{form.email}</b>.
        </p>
      </div>
    );
  }

  return (
    <div className="intern-card">
      {/* progress */}
      <div className="intern-prog">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`prog-dot ${step >= i ? "on" : ""}`} />
        ))}
        <span className="prog-label">Step {step + 1} of 4</span>
      </div>

      {step === 0 && (
        <div>
          <h3 className="intern-h">Pick your role</h3>
          <p className="text-2" style={{ fontSize: ".78rem", marginTop: 4 }}>Choose where you'd like to intern with Nexyvo.</p>
          <div className="role-pick">
            {ROLES.map((r) => (
              <button
                key={r.t}
                type="button"
                className={`role-tile ${role === r.t ? "sel" : ""}`}
                onClick={() => setRole(r.t)}
              >
                <span style={{ fontSize: "1.1rem" }}>{r.i}</span>
                <div>
                  <div style={{ fontSize: ".82rem", fontWeight: 600 }}>{r.t}</div>
                  <div className="text-2" style={{ fontSize: ".68rem", marginTop: 2 }}>{r.d}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h3 className="intern-h">Basic info</h3>
          <div className="intern-grid">
            <Field label="Full name" value={form.name} onChange={(v) => upd("name", v)} placeholder="Your name" />
            <Field label="Email" type="email" value={form.email} onChange={(v) => upd("email", v)} placeholder="you@email.com" />
            <Field label="Phone" value={form.phone} onChange={(v) => upd("phone", v)} placeholder="+91 ..." />
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="intern-h">Education</h3>
          <div className="intern-grid">
            <Field label="College / University" value={form.college} onChange={(v) => upd("college", v)} placeholder="Your institution" />
            <div className="field">
              <label>Year of study</label>
              <select className="fld" value={form.year} onChange={(e) => upd("year", e.target.value)}>
                <option value="">Select…</option>
                <option>1st year</option><option>2nd year</option>
                <option>3rd year</option><option>4th year</option>
                <option>Final year</option><option>Recent graduate</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="intern-h">Skills &amp; portfolio</h3>
          <div className="intern-grid">
            <Field label="Key skills" value={form.skills} onChange={(v) => upd("skills", v)} placeholder="React, Flutter, Figma…" />
            <Field label="Portfolio / GitHub" value={form.portfolio} onChange={(v) => upd("portfolio", v)} placeholder="https://…" />
            <Field label="Resume link (Drive / Notion)" value={form.resume} onChange={(v) => upd("resume", v)} placeholder="https://…" />
            <div className="field" style={{ gridColumn: "1 / -1" }}>
              <label>Why Nexyvo?</label>
              <textarea className="fld" rows={3} value={form.why} onChange={(e) => upd("why", e.target.value)} placeholder="A line or two about you." />
            </div>
          </div>
          <div className="intern-meta">
            <span>💰 Stipend: <b>Performance based</b></span>
            <span>⏱ Duration: <b>3–4 months</b></span>
          </div>
        </div>
      )}

      {err && <div style={{ fontSize: ".72rem", color: "#ff7ab6", marginTop: 10 }}>{err}</div>}

      <div className="intern-actions">
        {step > 0 && (
          <button type="button" className="btn btn-ghost" onClick={() => setStep((s) => s - 1)}>← Back</button>
        )}
        {step < 3 && (
          <button
            type="button"
            className="btn btn-primary"
            disabled={(step === 0 && !s1Ok) || (step === 1 && !s2Ok) || (step === 2 && !s3Ok)}
            onClick={() => setStep((s) => s + 1)}
            style={{ marginLeft: "auto", opacity: ((step === 0 && !s1Ok) || (step === 1 && !s2Ok) || (step === 2 && !s3Ok)) ? .45 : 1 }}
          >Continue →</button>
        )}
        {step === 3 && (
          <button
            type="button"
            className="submit-glow"
            disabled={!s4Ok || sending}
            onClick={send}
            style={{ marginLeft: "auto", opacity: (!s4Ok || sending) ? .5 : 1 }}
          >{sending ? "Sending…" : "Submit Application →"}</button>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div className="field">
      <label>{label}</label>
      <input className="fld" type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}
