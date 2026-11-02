const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const sineInOut = (t: number) => (1 - Math.cos(Math.PI * t)) / 2;

/** Light and warmth for a sunrise progress from 0 (night) to 1 (full morning). */
export function lightAt(progress: number): { light: number; warmth: number } {
  const p = clamp01(progress);
  const light = sineInOut(p);
  // Warmth peaks mid-sunrise (ember and amber) and fades as the sky turns clear.
  const warmth = Math.sin(Math.PI * light);
  return { light, warmth: clamp01(warmth) };
}
