import { useState } from "react";

const RECIPIENT = "nexyvoofficial@gmail.com";

export function MadLibsForm() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [building, setBuilding] = useState("");
  const [industry, setIndustry] = useState("");
  const [email, setEmail] = useState("");
  const [collab, setCollab] = useState("");

  const nameOk = name.trim().length >= 2;
  const buildingOk = nameOk && !!building;
  const industryOk = buildingOk && !!industry;
  const emailOk = industryOk && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const collabOk = emailOk && !!collab;

  // cascade: clear later fields when earlier becomes invalid
  if (!nameOk && building) setBuilding("");
  if (!buildingOk && industry) setIndustry("");
  if (!industryOk && email) setEmail("");
  if (!emailOk && collab) setCollab("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!collabOk) return;
    const subject = `Nexyvo Inquiry from ${name}`;
    const body =
      `Hi Nexyvo team,\n\n` +
      `I'm ${name} and I'm building ${building} for the ${industry} industry.\n` +
      `You can reach me at ${email}.\n` +
      `I'd love to ${collab} with the Nexyvo team.\n\n` +
      `— ${name}`;
    window.location.href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  if (!open) {
    return (
      <div style={{ textAlign: "center" }}>
        <button className="submit-glow" onClick={() => setOpen(true)}>
          Start Inquiry →
        </button>
        <p className="text-2" style={{ fontSize: ".72rem", marginTop: 12 }}>
          Takes 30 seconds. No spam, ever.
        </p>
      </div>
    );
  }

  return (
    <form className="madlibs" onSubmit={handleSend}>
      {/* Step 1 */}
      <div className="madlibs-line ml-step in">
        <span>Hi, I'm</span>
        <input
          className="ml-input"
          placeholder="your name"
          value={name}
          autoFocus
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Step 2 */}
      {nameOk && (
        <div className="madlibs-line ml-step in">
          <span>and I'm building</span>
          <select
            className="ml-select"
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
          >
            <option value="">a…</option>
            <option>an AI SaaS product</option>
            <option>a healthcare platform</option>
            <option>an internal enterprise tool</option>
            <option>something nobody's built yet</option>
          </select>
        </div>
      )}

      {/* Step 3 */}
      {buildingOk && (
        <div className="madlibs-line ml-step in">
          <span>for the</span>
          <select
            className="ml-select"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          >
            <option value="">industry…</option>
            <option>healthcare</option>
            <option>fintech</option>
            <option>education</option>
            <option>enterprise</option>
            <option>consumer</option>
          </select>
          <span>industry.</span>
        </div>
      )}

      {/* Step 4 */}
      {industryOk && (
        <div className="madlibs-line ml-step in">
          <span>Reach me at</span>
          <input
            className="ml-input"
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      )}

      {/* Step 5 */}
      {emailOk && (
        <div className="madlibs-line ml-step in">
          <span>I'd love to</span>
          <select
            className="ml-select"
            value={collab}
            onChange={(e) => setCollab(e.target.value)}
          >
            <option value="">collaborate on…</option>
            <option>scope a discovery call</option>
            <option>get a proposal</option>
            <option>start ASAP</option>
            <option>just say hello</option>
          </select>
          <span>with the Nexyvo team.</span>
        </div>
      )}

      <button
        type="submit"
        className="submit-glow"
        disabled={!collabOk}
        style={{ opacity: collabOk ? 1 : 0.45, cursor: collabOk ? "pointer" : "not-allowed" }}
      >
        Send Message →
      </button>
    </form>
  );
}
