import { useId } from "react";
import type { FinishKey } from "@/lib/sanity/types";

const FINISH_COLORS: Record<FinishKey, string> = { a: "#E9E2D0", b: "#4A5568" };

interface LampProps {
  finish: FinishKey;
  /** Overrides the default finish colour, for example with the colour from the CMS. */
  color?: string;
  className?: string;
}

/**
 * The lamp is drawn in SVG so one source of truth, the inherited CSS variables
 * --light and --warmth, lights both the lamp and the page around it.
 */
export function Lamp({ finish, color, className }: LampProps) {
  const id = useId();
  const body = color ?? FINISH_COLORS[finish];
  const buttonFill = finish === "b" ? "#14233F" : "#14233F";
  return (
    <svg viewBox="0 0 240 360" data-finish={finish} role="img" aria-label="Larkhour sunrise lamp" className={`overflow-visible ${className ?? ""}`}>
      <defs>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor="#F5A524" stopOpacity="0.9" />
          <stop offset="1" stopColor="#F5A524" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="120" cy="140" r="150" fill={`url(#${id}-glow)`} style={{ opacity: "var(--light)" }} />
      <ellipse cx="120" cy="338" rx="84" ry="10" fill="#000" opacity="0.25" />
      <rect x="56" y="198" width="128" height="128" rx="30" fill={body} className="transition-[fill] duration-[240ms] ease-[var(--ease-state)] motion-reduce:transition-none" />
      <rect x="62" y="52" width="116" height="176" rx="58" fill="#F5A524" style={{ fillOpacity: "calc(0.14 + var(--light) * 0.86)" }} />
      <rect x="62" y="52" width="116" height="176" rx="58" fill="#C93A1C" style={{ fillOpacity: "calc(var(--warmth) * 0.55)" }} />
      <rect x="62" y="52" width="116" height="176" rx="58" fill="none" stroke={body} strokeWidth="3" opacity="0.7" />
      {[84, 120, 156].map((cx) => (
        <circle key={cx} cx={cx} cy="272" r="9" fill={buttonFill} opacity="0.85" />
      ))}
      <rect x="104" y="300" width="32" height="6" rx="3" fill={buttonFill} opacity="0.5" />
    </svg>
  );
}
