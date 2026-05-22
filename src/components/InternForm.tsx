import { useRef, useState, useEffect } from "react";
import {
  Palette, Smartphone, Layers, MonitorSmartphone, Server,
  UploadCloud, FileText, X, Check, ArrowRight, ArrowLeft,
  User, Mail, Phone, GraduationCap, Sparkles, Link2, Code2,
} from "lucide-react";

const ROLES = [
  { Ic: Palette,           t: "UI / UX Design",        d: "Figma · design systems · prototyping",  hue: "270" },
  { Ic: Smartphone,        t: "App Development (Flutter)", d: "Cross-platform mobile apps",        hue: "190" },
  { Ic: Layers,            t: "Full Stack",            d: "End-to-end product engineering",        hue: "220" },
  { Ic: MonitorSmartphone, t: "Frontend",              d: "React · TypeScript · modern UI",        hue: "300" },
  { Ic: Server,            t: "Backend",               d: "APIs · databases · cloud",              hue: "160" },
];

const STEPS = ["Role", "Identity", "Education", "Craft"];
const ENDPOINT = "https://formsubmit.co/nexyvoofficial@gmail.com";

export function InternForm() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [role, setRole] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    college: "", year: "",
    skills: "", portfolio: "", resume: "", why: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const upd = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const s1Ok = !!role;
  const s2Ok = form.name.trim().length > 1 &&
               /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
               form.phone.trim().length >= 7;
  const s3Ok = form.college.trim().length > 1 && !!form.year;
  const s4Ok = form.skills.trim().length > 1 && form.why.trim().length > 4;

  const next = () => { setDir(1); setStep((s) => Math.min(3, s + 1)); };
  const back = () => { setDir(-1); setStep((s) => Math.max(0, s - 1)); };

  const send = async () => {
    setSending(true); setErr("");
    try {
      const fd = new FormData();
      fd.append("_subject", `Nexyvo Internship — ${role} — ${form.name}`);
      fd.append("Role", role);
      fd.append("Stipend", "Performance based");
      fd.append("Duration", "3–4 months");
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (resumeFile) fd.append("Resume", resumeFile);
      const res = await fetch(ENDPOINT, { method: "POST", body: fd });
      if (!res.ok) throw new Error("net");
      setDone(true);
    } catch {
      const body =
        `Role: ${role}\nStipend: Performance based\nDuration: 3-4 months\n\n` +
        Object.entries(form).map(([k, v]) => `${k}: ${v}`).join("\n") +
        (resumeFile ? `\n\nResume: ${resumeFile.name} (attach manually)` : "");
      window.location.href =
        `mailto:nexyvoofficial@gmail.com?subject=${encodeURIComponent(`Nexyvo Internship — ${role} — ${form.name}`)}&body=${encodeURIComponent(body)}`;
      setErr("Opening your email app as fallback…");
    } finally { setSending(false); }
  };

  const onPickFile = (f: File | null) => {
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) { setErr("File must be under 5MB"); return; }
    setErr(""); setResumeFile(f);
  };

  if (done) return <SuccessCard role={role} email={form.email} />;

  const canAdvance =
    (step === 0 && s1Ok) || (step === 1 && s2Ok) ||
    (step === 2 && s3Ok) || (step === 3 && s4Ok);

  return (
    <div className="ix-shell">
      {/* Orbital stepper */}
      <aside className="ix-rail">
        <div className="ix-rail-line">
          <span className="ix-rail-fill" style={{ height: `${(step / 3) * 100}%` }} />
        </div>
        {STEPS.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => i < step && (setDir(-1), setStep(i))}
            className={`ix-node ${i === step ? "is-active" : ""} ${i < step ? "is-done" : ""}`}
            disabled={i > step}
          >
            <span className="ix-node-dot">
              {i < step ? <Check size={12} strokeWidth={3} /> : <span>{i + 1}</span>}
            </span>
            <span className="ix-node-lbl">{label}</span>
          </button>
        ))}
        <div className="ix-rail-meta">
          <div className="ix-meta-row"><Sparkles size={12} /> Performance stipend</div>
          <div className="ix-meta-row"><Code2 size={12} /> 3–4 months</div>
        </div>
      </aside>

      {/* Panel */}
      <div className="ix-panel">
        <div className={`ix-stage ix-dir-${dir > 0 ? "fwd" : "back"}`} key={step}>
          {step === 0 && (
            <StepShell eyebrow={`Step 01 / 04`} title="Pick your craft" subtitle="Where would you like to grow at Nexyvo?">
              <div className="ix-roles">
                {ROLES.map((r, idx) => {
                  const sel = role === r.t;
                  return (
                    <button
                      key={r.t}
                      type="button"
                      className={`ix-role ${sel ? "sel" : ""}`}
                      style={{ ["--hue" as any]: r.hue, animationDelay: `${idx * 60}ms` }}
                      onClick={() => setRole(r.t)}
                    >
                      <span className="ix-role-glow" />
                      <span className="ix-role-ic"><r.Ic size={20} strokeWidth={1.6} /></span>
                      <span className="ix-role-text">
                        <span className="ix-role-t">{r.t}</span>
                        <span className="ix-role-d">{r.d}</span>
                      </span>
                      <span className={`ix-role-check ${sel ? "on" : ""}`}>
                        <Check size={12} strokeWidth={3} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </StepShell>
          )}

          {step === 1 && (
            <StepShell eyebrow="Step 02 / 04" title="Who are you?" subtitle="A few details so we can reach you.">
              <div className="ix-fields">
                <NeoField icon={User} label="Full name" value={form.name} onChange={(v) => upd("name", v)} placeholder="e.g. Aarav Mehta" />
                <NeoField icon={Mail} type="email" label="Email" value={form.email} onChange={(v) => upd("email", v)} placeholder="you@email.com" />
                <NeoField icon={Phone} label="Phone" value={form.phone} onChange={(v) => upd("phone", v)} placeholder="+91 …" />
              </div>
            </StepShell>
          )}

          {step === 2 && (
            <StepShell eyebrow="Step 03 / 04" title="Education" subtitle="Where you're studying — or just finished.">
              <div className="ix-fields">
                <NeoField icon={GraduationCap} label="College / University" value={form.college} onChange={(v) => upd("college", v)} placeholder="Your institution" />
                <NeoSelect label="Year of study" value={form.year} onChange={(v) => upd("year", v)}
                  options={["1st year","2nd year","3rd year","4th year","Final year","Recent graduate"]} />
              </div>
            </StepShell>
          )}

          {step === 3 && (
            <StepShell eyebrow="Step 04 / 04" title="Show your craft" subtitle="Skills, links, and a line about you.">
              <div className="ix-fields">
                <NeoField icon={Code2} label="Key skills" value={form.skills} onChange={(v) => upd("skills", v)} placeholder="React, Flutter, Figma…" />
                <NeoField icon={Link2} label="Portfolio / GitHub" value={form.portfolio} onChange={(v) => upd("portfolio", v)} placeholder="https://…" />
                <NeoField icon={Link2} label="Resume link (optional)" value={form.resume} onChange={(v) => upd("resume", v)} placeholder="Drive / Notion URL" />

                <div className="ix-field" style={{ gridColumn: "1 / -1" }}>
                  <label className="ix-lbl">Upload resume</label>
                  <div
                    className={`ix-drop ${drag ? "drag" : ""} ${resumeFile ? "has" : ""}`}
                    onClick={() => fileRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                    onDragLeave={() => setDrag(false)}
                    onDrop={(e) => { e.preventDefault(); setDrag(false); onPickFile(e.dataTransfer.files?.[0] ?? null); }}
                  >
                    <span className="ix-drop-ring" />
                    {resumeFile ? (
                      <>
                        <FileText className="ix-drop-ic" size={22} />
                        <div className="ix-drop-t">{resumeFile.name}</div>
                        <div className="ix-drop-s">{(resumeFile.size / 1024).toFixed(0)} KB · click to replace</div>
                        <button type="button" className="ix-drop-x" onClick={(e) => { e.stopPropagation(); setResumeFile(null); }} aria-label="Remove">
                          <X size={14} />
                        </button>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="ix-drop-ic" size={26} />
                        <div className="ix-drop-t">Drop your resume here</div>
                        <div className="ix-drop-s">or click to browse · PDF, DOC · max 5MB</div>
                      </>
                    )}
                    <input ref={fileRef} type="file" hidden accept=".pdf,.doc,.docx,application/pdf"
                      onChange={(e) => onPickFile(e.target.files?.[0] ?? null)} />
                  </div>
                </div>

                <div className="ix-field" style={{ gridColumn: "1 / -1" }}>
                  <label className="ix-lbl">Why Nexyvo?</label>
                  <textarea className="ix-area" rows={3} value={form.why}
                    onChange={(e) => upd("why", e.target.value)}
                    placeholder="A line or two about you — what drives you to build?" />
                </div>
              </div>
            </StepShell>
          )}
        </div>

        {err && <div className="ix-err">{err}</div>}

        <div className="ix-actions">
          <button type="button" className="ix-btn ix-ghost" onClick={back} disabled={step === 0}>
            <ArrowLeft size={14} /> Back
          </button>
          <div className="ix-progress-text">
            <span style={{ color: "var(--text)" }}>{step + 1}</span>
            <span style={{ color: "var(--text3)" }}> / 04</span>
          </div>
          {step < 3 ? (
            <button type="button" className="ix-btn ix-primary" onClick={next} disabled={!canAdvance}>
              Continue <ArrowRight size={14} />
            </button>
          ) : (
            <button type="button" className="ix-btn ix-submit" onClick={send} disabled={!s4Ok || sending}>
              {sending ? "Sending…" : <>Submit Application <ArrowRight size={14} /></>}
              <span className="ix-submit-sheen" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StepShell({ eyebrow, title, subtitle, children }: { eyebrow: string; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="ix-eyebrow">{eyebrow}</div>
      <h3 className="ix-title">{title.split("").map((c, i) => (
        <span key={i} className="ix-char" style={{ animationDelay: `${i * 22}ms` }}>{c === " " ? "\u00A0" : c}</span>
      ))}</h3>
      <p className="ix-sub">{subtitle}</p>
      <div style={{ marginTop: 24 }}>{children}</div>
    </div>
  );
}

function NeoField({ icon: Icon, label, value, onChange, placeholder, type = "text" }: {
  icon: React.ComponentType<{ size?: number }>; label: string; value: string;
  onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  const [focus, setFocus] = useState(false);
  return (
    <div className={`ix-field ${focus ? "focus" : ""} ${value ? "filled" : ""}`}>
      <label className="ix-lbl"><Icon size={11} /> {label}</label>
      <div className="ix-input-wrap">
        <input
          className="ix-input"
          type={type}
          value={value}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="ix-underline" />
      </div>
    </div>
  );
}

function NeoSelect({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div className={`ix-field ${value ? "filled" : ""}`} ref={ref}>
      <label className="ix-lbl"><GraduationCap size={11} /> {label}</label>
      <button type="button" className={`ix-select ${open ? "open" : ""}`} onClick={() => setOpen((o) => !o)}>
        <span className={value ? "" : "ph"}>{value || "Select…"}</span>
        <svg width="10" height="6" viewBox="0 0 10 6" className="ix-sel-arrow"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
      </button>
      {open && (
        <div className="ix-options">
          {options.map((o, i) => (
            <button
              key={o}
              type="button"
              className={`ix-opt ${value === o ? "sel" : ""}`}
              style={{ animationDelay: `${i * 25}ms` }}
              onClick={() => { onChange(o); setOpen(false); }}
            >
              <span>{o}</span>
              {value === o && <Check size={12} strokeWidth={3} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SuccessCard({ role, email }: { role: string; email: string }) {
  return (
    <div className="ix-success">
      <div className="ix-success-orb">
        <Check size={28} strokeWidth={3} />
        <span className="ring1" /><span className="ring2" /><span className="ring3" />
      </div>
      <h3 className="ix-success-h">Application received</h3>
      <p className="ix-success-p">
        We'll review your profile for <b style={{ color: "var(--acc3)" }}>{role}</b> and reach out at <b style={{ color: "var(--acc3)" }}>{email}</b>.
      </p>
    </div>
  );
}
