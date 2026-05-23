import { useEffect, useState } from "react";
import { NLogo } from "./NLogo";

export function IntroScreen() {
  const [gone, setGone] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [seen, setSeen] = useState(true);

  useEffect(() => {
    const already = typeof window !== "undefined" && sessionStorage.getItem("nexyvo-intro-seen") === "1";
    if (already) {
      document.body.classList.add("intro-done");
      setRemoved(true);
      return;
    }
    setSeen(false);
    const t1 = setTimeout(() => setGone(true), 3800);
    const t2 = setTimeout(() => {
      document.body.classList.add("intro-done");
      sessionStorage.setItem("nexyvo-intro-seen", "1");
      setRemoved(true);
    }, 4700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const skip = () => {
    setGone(true);
    setTimeout(() => {
      document.body.classList.add("intro-done");
      sessionStorage.setItem("nexyvo-intro-seen", "1");
      setRemoved(true);
    }, 600);
  };

  if (removed || seen) return null;

  const letters = ["N", "E", "X", "Y", "V", "O"];
  return (
    <div id="intro-screen" className={gone ? "gone" : ""}>
      <button className="skip-btn" onClick={skip}>Skip Intro</button>
      <div className="intro-stage">
        <NLogo size={120} animate id="n-grad-intro" />
        <div className="intro-name" aria-label="Nexyvo">
          {letters.map((l, i) => (
            <span
              key={i}
              className={l === "X" ? "brand-x" : "brand-w"}
              style={{ animationDelay: `${1.4 + i * 0.15}s` }}
            >{l}</span>
          ))}
        </div>
        <div className="intro-sub">Technologies</div>
      </div>
    </div>
  );
}
