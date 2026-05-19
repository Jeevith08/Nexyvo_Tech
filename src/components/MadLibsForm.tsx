import { useEffect, useRef, useState } from "react";

export function MadLibsForm() {
  const wrap = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const els = wrap.current!.querySelectorAll<HTMLElement>(".tw");
          els.forEach((el, i) => setTimeout(() => el.classList.add("in"), i * 350));
          obs.disconnect();
        }
      });
    }, { threshold: 0.3 });
    if (wrap.current) obs.observe(wrap.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={wrap} className="madlibs">
      <div className="madlibs-line">
        <span className="tw">Hi, I'm</span>
        <input className="ml-input" placeholder="your name" />
        <span className="tw">and I'm building</span>
        <select className="ml-select" defaultValue="">
          <option value="" disabled>a…</option>
          <option>an AI SaaS product</option>
          <option>a healthcare platform</option>
          <option>an internal enterprise tool</option>
          <option>something nobody's built yet</option>
        </select>
      </div>
      <div className="madlibs-line">
        <span className="tw">for the</span>
        <select className="ml-select" defaultValue="">
          <option value="" disabled>industry…</option>
          <option>healthcare</option>
          <option>fintech</option>
          <option>education</option>
          <option>enterprise</option>
          <option>consumer</option>
        </select>
        <span className="tw">industry. You can reach me at</span>
        <input className="ml-input" type="email" placeholder="you@email.com" />
        <span className="tw">.</span>
      </div>
      <div className="madlibs-line">
        <span className="tw">I'd love to</span>
        <select className="ml-select" defaultValue="">
          <option value="" disabled>collaborate on…</option>
          <option>scope a discovery call</option>
          <option>get a proposal</option>
          <option>start ASAP</option>
          <option>just say hello</option>
        </select>
        <span className="tw">with the Nexyvo team.</span>
      </div>
      <button className="submit-glow" onClick={(e) => { e.preventDefault(); setSent(true); }}>
        {sent ? "✓ Message Sent" : "Send Message →"}
      </button>
    </div>
  );
}
