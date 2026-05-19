export function NLogo({ size = 28, animate = false, id = "n-grad" }: { size?: number; animate?: boolean; id?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Nexyvo">
      <defs>
        <linearGradient id={id} x1="0" y1="64" x2="64" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#005eff" />
          <stop offset="0.2" stopColor="#00d2ff" />
          <stop offset="0.45" stopColor="#7a00ff" />
          <stop offset="0.65" stopColor="#ff007f" />
          <stop offset="0.85" stopColor="#ff6a00" />
          <stop offset="1" stopColor="#ffc800" />
        </linearGradient>
      </defs>
      <path
        d="M10 54 V18 C10 12 16 9 20 13 L46 46 C50 51 56 49 56 43 V12"
        stroke={`url(#${id})`}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animate ? "n-draw" : undefined}
      />
    </svg>
  );
}
