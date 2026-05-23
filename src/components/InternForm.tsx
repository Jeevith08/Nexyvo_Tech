import { useRef, useState, useEffect } from "react";
import {
  Palette, Smartphone, Layers, MonitorSmartphone, Server,
  UploadCloud, FileText, X, Check, ArrowRight, ArrowLeft,
  User, GraduationCap, Briefcase, FileCheck2, ClipboardCheck,
  CheckCircle2, Pencil,
} from "lucide-react";

const POSITIONS = [
  { Ic: Palette,           id: "UI/UX Design",            blurb: "Figma, design systems, prototyping" },
  { Ic: Smartphone,        id: "App Development (Flutter)", blurb: "Cross-platform mobile apps" },
  { Ic: Layers,            id: "Full Stack Development",  blurb: "End-to-end product engineering" },
  { Ic: MonitorSmartphone, id: "Frontend Development",    blurb: "React, TypeScript, modern UI" },
  { Ic: Server,            id: "Backend Development",     blurb: "APIs, databases, cloud infra" },
];

const STEPS = [
  { t: "Position",       d: "Role you're applying for",          Ic: Briefcase },
  { t: "Personal Info",  d: "Contact details",                    Ic: User },
  { t: "Education",      d: "Academic background",                Ic: GraduationCap },
  { t: "Experience",     d: "Skills & portfolio",                 Ic: FileCheck2 },
  { t: "Documents",      d: "Resume & consent",                   Ic: UploadCloud },
  { t: "Review",         d: "Verify & submit",                    Ic: ClipboardCheck },
];

const ENDPOINT = "https://formsubmit.co/nexyvoofficial@gmail.com";
const JOB_ID = "NXY-INT-2025";

export function InternForm({ 
  selectedPosition, 
  onPositionSelect,
  onCancel
}: { 
  selectedPosition?: string; 
  onPositionSelect?: (pos: string) => void; 
  onCancel?: () => void;
} = {}) {
  const [step, setStep] = useState(0);
  const [localPos, setLocalPos] = useState("");
  const position = selectedPosition !== undefined ? selectedPosition : localPos;
  const setPosition = onPositionSelect || setLocalPos;

  useEffect(() => {
    if (position) {
      setStep(0);
    }
  }, [position]);
  const [f, setF] = useState({
    firstName: "", lastName: "", email: "", phone: "", location: "",
    college: "", degree: "", year: "", graduation: "",
    skills: "", portfolio: "", github: "", linkedin: "",
    experience: "", why: "",
    resumeLink: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [drag, setDrag] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const upd = (k: keyof typeof f, v: string) => setF((p) => ({ ...p, [k]: v }));

  const ok0 = !!position;
  const ok1 = f.firstName.trim().length > 1 && f.lastName.trim().length > 0 &&
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email) && f.phone.trim().length >= 7;
  const ok2 = f.college.trim().length > 1 && f.degree.trim().length > 1 && !!f.year;
  const ok3 = f.skills.trim().length > 1 && f.why.trim().length > 9;
  const ok4 = (!!resumeFile || f.resumeLink.trim().length > 5) && consent;

  const stepOk = [ok0, ok1, ok2, ok3, ok4, true];

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));
  const goto = (i: number) => { if (i <= step || stepOk.slice(0, i).every(Boolean)) setStep(i); };

  const send = async () => {
    setSending(true); setErr("");
    try {
      const fd = new FormData();
      fd.append("_subject", `Nexyvo Application — ${position} — ${f.firstName} ${f.lastName}`);
      fd.append("Job ID", JOB_ID);
      fd.append("Position", position);
      fd.append("Stipend", "Performance based");
      fd.append("Duration", "3–4 months");
      Object.entries(f).forEach(([k, v]) => fd.append(k, v));
      if (resumeFile) fd.append("Resume", resumeFile);
      const res = await fetch(ENDPOINT, { method: "POST", body: fd });
      if (!res.ok) throw new Error("net");
      setDone(true);
    } catch {
      const body =
        `Job ID: ${JOB_ID}\nPosition: ${position}\nStipend: Performance based\nDuration: 3-4 months\n\n` +
        Object.entries(f).map(([k, v]) => `${k}: ${v}`).join("\n") +
        (resumeFile ? `\n\nResume: ${resumeFile.name} (attach manually)` : "");
      window.location.href =
        `mailto:nexyvoofficial@gmail.com?subject=${encodeURIComponent(`Nexyvo Application — ${position} — ${f.firstName} ${f.lastName}`)}&body=${encodeURIComponent(body)}`;
      setErr("Couldn't reach the server. Opening your email app as a fallback…");
    } finally { setSending(false); }
  };

  const onPick = (file: File | null) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setErr("Resume must be under 5MB."); return; }
    const ok = /\.(pdf|docx?|rtf)$/i.test(file.name);
    if (!ok) { setErr("Please upload a PDF, DOC, or DOCX file."); return; }
    setErr(""); setResumeFile(file);
  };

  if (done) return <Success position={position} email={f.email} name={`${f.firstName} ${f.lastName}`} />;

  const progress = Math.round(((step) / (STEPS.length - 1)) * 100);

  return (
    <div className="ap-card">
      <header className="ap-card-head">
        <div>
          <div className="ap-card-title">Internship Application</div>
          <div className="ap-card-sub">All fields are kept confidential and used only for hiring.</div>
        </div>
        <span className="ap-jobid">{JOB_ID}</span>
      </header>

      <div className="ap-body">
        <aside className="ap-side">
          <div className="ap-side-h">Application Steps</div>
          <nav className="ap-steps">
            {STEPS.map((s, i) => (
              <button
                key={s.t}
                type="button"
                disabled={i > step && !stepOk.slice(0, i).every(Boolean)}
                onClick={() => goto(i)}
                className={`ap-step-btn ${i === step ? "is-active" : ""} ${i < step ? "is-done" : ""}`}
              >
                <span className="ap-step-num">
                  {i < step ? <Check size={11} strokeWidth={3} /> : i + 1}
                </span>
                <span className="ap-step-meta">
                  <span className="ap-step-t">{s.t}</span>
                  <span className="ap-step-d">{s.d}</span>
                </span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="ap-content" key={step}>
          <div className="ap-stage">
            {step === 0 && (
              <>
                <div className="ap-eyebrow">Step 1 of {STEPS.length}</div>
                <h2 className="ap-h">Select a position</h2>
                <p className="ap-sub">Choose the role you'd like to be considered for. You'll be matched with a mentor in that team.</p>
                <div className="ap-positions">
                  {POSITIONS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className={`ap-position ${position === p.id ? "sel" : ""}`}
                      onClick={() => setPosition(p.id)}
                    >
                      <span className="ap-position-ic"><p.Ic size={18} strokeWidth={1.6} /></span>
                      <span className="ap-position-text">
                        <span className="ap-position-t">{p.id}</span>
                        <span className="ap-position-d">{p.blurb}</span>
                      </span>
                      <span className="ap-radio" />
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="ap-eyebrow">Step 2 of {STEPS.length}</div>
                <h2 className="ap-h">Personal information</h2>
                <p className="ap-sub">How should we reach you?</p>
                <div className="ap-grid">
                  <Field label="First name" req value={f.firstName} onChange={(v) => upd("firstName", v)} placeholder="Aarav" />
                  <Field label="Last name"  req value={f.lastName}  onChange={(v) => upd("lastName", v)}  placeholder="Mehta" />
                  <Field label="Email"      req type="email" value={f.email} onChange={(v) => upd("email", v)} placeholder="you@email.com" />
                  <Field label="Phone"      req value={f.phone} onChange={(v) => upd("phone", v)} placeholder="+91 98xxxxxxxx" />
                  <div className="ap-field full">
                    <label className="ap-lbl">Current location <span className="ap-hint">(optional)</span></label>
                    <input className="ap-input" value={f.location} onChange={(e) => upd("location", e.target.value)} placeholder="City, Country" />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="ap-eyebrow">Step 3 of {STEPS.length}</div>
                <h2 className="ap-h">Education</h2>
                <p className="ap-sub">Tell us where you're studying, or just finished.</p>
                <div className="ap-grid">
                  <Field full label="College / University" req value={f.college} onChange={(v) => upd("college", v)} placeholder="e.g. SRM Institute of Science and Technology" />
                  <Field label="Degree / Major" req value={f.degree} onChange={(v) => upd("degree", v)} placeholder="B.Tech, CSE" />
                  <div className="ap-field">
                    <label className="ap-lbl">Year of study <span className="req">*</span></label>
                    <select className="ap-native-select" value={f.year} onChange={(e) => upd("year", e.target.value)}>
                      <option value="">Select year</option>
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year / Final Year</option>
                      <option>Recent Graduate</option>
                    </select>
                  </div>
                  <div className="ap-field full">
                    <label className="ap-lbl">Expected graduation <span className="ap-hint">(optional)</span></label>
                    <input className="ap-input" value={f.graduation} onChange={(e) => upd("graduation", e.target.value)} placeholder="e.g. June 2026" />
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="ap-eyebrow">Step 4 of {STEPS.length}</div>
                <h2 className="ap-h">Experience & portfolio</h2>
                <p className="ap-sub">Share what you've built and the tools you're strongest in.</p>
                <div className="ap-grid">
                  <div className="ap-field full">
                    <label className="ap-lbl">Key skills <span className="req">*</span></label>
                    <input className="ap-input" value={f.skills} onChange={(e) => upd("skills", e.target.value)} placeholder="e.g. React, TypeScript, Figma, Flutter, Node.js" />
                  </div>
                  <Field label="Portfolio URL" value={f.portfolio} onChange={(v) => upd("portfolio", v)} placeholder="https://yourwork.com" />
                  <Field label="GitHub"        value={f.github}    onChange={(v) => upd("github", v)}    placeholder="https://github.com/username" />
                  <Field full label="LinkedIn" value={f.linkedin} onChange={(v) => upd("linkedin", v)} placeholder="https://linkedin.com/in/username" />
                  <div className="ap-field full">
                    <label className="ap-lbl">Relevant experience <span className="ap-hint">(internships, freelance, projects — optional)</span></label>
                    <textarea className="ap-textarea" value={f.experience} onChange={(e) => upd("experience", e.target.value)} placeholder="Briefly describe 1–2 projects or internships." />
                  </div>
                  <div className="ap-field full">
                    <label className="ap-lbl">Why Nexyvo? <span className="req">*</span></label>
                    <textarea className="ap-textarea" value={f.why} onChange={(e) => upd("why", e.target.value)} placeholder="A few lines on what excites you about this role and Nexyvo." />
                  </div>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div className="ap-eyebrow">Step 5 of {STEPS.length}</div>
                <h2 className="ap-h">Documents & consent</h2>
                <p className="ap-sub">Upload your resume (PDF, DOC, DOCX · max 5MB) or share a link.</p>
                <div className="ap-grid one">
                  <div className="ap-field">
                    <label className="ap-lbl">Resume <span className="req">*</span></label>
                    <div
                      className={`ap-drop ${drag ? "drag" : ""} ${resumeFile ? "has" : ""}`}
                      onClick={() => fileRef.current?.click()}
                      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                      onDragLeave={() => setDrag(false)}
                      onDrop={(e) => { e.preventDefault(); setDrag(false); onPick(e.dataTransfer.files?.[0] ?? null); }}
                    >
                      {resumeFile ? (
                        <>
                          <FileText className="ap-drop-ic" size={22} />
                          <div className="ap-drop-t">{resumeFile.name}</div>
                          <div className="ap-drop-s">{(resumeFile.size / 1024).toFixed(0)} KB · click to replace</div>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="ap-drop-ic" size={24} />
                          <div className="ap-drop-t">Drag & drop your resume</div>
                          <div className="ap-drop-s">or click to browse — PDF, DOC, DOCX</div>
                        </>
                      )}
                      <input ref={fileRef} type="file" hidden accept=".pdf,.doc,.docx,application/pdf"
                        onChange={(e) => onPick(e.target.files?.[0] ?? null)} />
                    </div>
                    {resumeFile && (
                      <span className="ap-file-tag">
                        <FileText size={12} /> {resumeFile.name}
                        <button type="button" onClick={() => setResumeFile(null)} aria-label="Remove"><X size={12} /></button>
                      </span>
                    )}
                  </div>
                  <div className="ap-field">
                    <label className="ap-lbl">…or paste a resume link <span className="ap-hint">(Drive, Notion, Dropbox)</span></label>
                    <input className="ap-input" value={f.resumeLink} onChange={(e) => upd("resumeLink", e.target.value)} placeholder="https://…" />
                  </div>
                  <label className="ap-check">
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                    <span>
                      <span className="ap-check-t">I consent to Nexyvo Technologies processing my application.</span>
                      <span className="ap-check-d">Your information is used only for evaluating this application and contacting you about the role.</span>
                    </span>
                  </label>
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <div className="ap-eyebrow">Final step</div>
                <h2 className="ap-h">Review your application</h2>
                <p className="ap-sub">Take a moment to confirm everything looks right before submitting.</p>
                <div className="ap-review">
                  <ReviewSec t="Position" Ic={Briefcase} onEdit={() => setStep(0)}>
                    <Row k="Role" v={position} full />
                    <Row k="Duration" v="3–4 months" />
                    <Row k="Stipend" v="Performance based" />
                  </ReviewSec>
                  <ReviewSec t="Personal Info" Ic={User} onEdit={() => setStep(1)}>
                    <Row k="Name" v={`${f.firstName} ${f.lastName}`} />
                    <Row k="Email" v={f.email} />
                    <Row k="Phone" v={f.phone} />
                    <Row k="Location" v={f.location || "—"} />
                  </ReviewSec>
                  <ReviewSec t="Education" Ic={GraduationCap} onEdit={() => setStep(2)}>
                    <Row k="Institution" v={f.college} full />
                    <Row k="Degree" v={f.degree} />
                    <Row k="Year" v={f.year} />
                    <Row k="Graduation" v={f.graduation || "—"} />
                  </ReviewSec>
                  <ReviewSec t="Experience" Ic={FileCheck2} onEdit={() => setStep(3)}>
                    <Row k="Skills" v={f.skills} full />
                    <Row k="Portfolio" v={f.portfolio || "—"} />
                    <Row k="GitHub" v={f.github || "—"} />
                    <Row k="LinkedIn" v={f.linkedin || "—"} full />
                    <Row k="Why Nexyvo" v={f.why} full />
                  </ReviewSec>
                  <ReviewSec t="Documents" Ic={UploadCloud} onEdit={() => setStep(4)}>
                    <Row k="Resume" v={resumeFile?.name || f.resumeLink || "—"} full />
                    <Row k="Consent" v={consent ? "Provided" : "—"} />
                  </ReviewSec>
                </div>
              </>
            )}
          </div>

          {err && <div className="ap-err">{err}</div>}
        </div>
      </div>

      <footer className="ap-foot">
        {step === 0 && onCancel ? (
          <button type="button" className="ap-btn ghost" onClick={onCancel}>
            <ArrowLeft size={14} /> Back to roles
          </button>
        ) : (
          <button type="button" className="ap-btn ghost" onClick={back} disabled={step === 0}>
            <ArrowLeft size={14} /> Back
          </button>
        )}
        <div className="ap-foot-prog">
          <span>Step {step + 1} of {STEPS.length}</span>
          <span className="ap-foot-bar"><span style={{ width: `${progress}%` }} /></span>
        </div>
        {step < STEPS.length - 1 ? (
          <button type="button" className="ap-btn primary" onClick={next} disabled={!stepOk[step]}>
            Continue <ArrowRight size={14} />
          </button>
        ) : (
          <button type="button" className="ap-btn submit" onClick={send} disabled={sending}>
            {sending ? "Submitting…" : <>Submit application <ArrowRight size={14} /></>}
          </button>
        )}
      </footer>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", req = false, full = false }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; req?: boolean; full?: boolean;
}) {
  return (
    <div className={`ap-field ${full ? "full" : ""}`}>
      <label className="ap-lbl">{label} {req && <span className="req">*</span>}</label>
      <input className="ap-input" type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

function ReviewSec({ t, Ic, onEdit, children }: { t: string; Ic: React.ComponentType<{ size?: number }>; onEdit: () => void; children: React.ReactNode }) {
  return (
    <section className="ap-review-sec">
      <div className="ap-review-h">
        <span className="ap-review-t"><Ic size={14} /> {t}</span>
        <button type="button" className="ap-review-edit" onClick={onEdit}><Pencil size={11} /> Edit</button>
      </div>
      <div className="ap-review-list">{children}</div>
    </section>
  );
}

function Row({ k, v, full = false }: { k: string; v: string; full?: boolean }) {
  return (
    <div className={`ap-review-row ${full ? "full" : ""}`}>
      <span className="ap-review-k">{k}</span>
      <span className="ap-review-v">{v || "—"}</span>
    </div>
  );
}

function Success({ position, email, name }: { position: string; email: string; name: string }) {
  return (
    <div className="ap-card">
      <div className="ap-success">
        <div className="ap-success-ic"><CheckCircle2 size={32} strokeWidth={1.8} /></div>
        <h2 className="ap-success-h">Application submitted</h2>
        <p className="ap-success-p">
          Thanks, <b style={{ color: "var(--text)" }}>{name.trim() || "candidate"}</b>. We've received your application for <b style={{ color: "var(--text)" }}>{position}</b>. Our team will review it and reach out at <b style={{ color: "var(--text)" }}>{email}</b> within 5–7 business days.
        </p>
        <div className="ap-success-meta">Reference: <b>{JOB_ID}</b></div>
      </div>
    </div>
  );
}