import type { Duration } from "./sanity/types";

const DAY = 1440;
const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const fromMinutes = (total: number) => {
  const t = ((total % DAY) + DAY) % DAY;
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
};

/** Times as H:MM, 24-hour, with no leading zero on the hour. Wraps across midnight. */
export function computeMorning(wakeTime: string, durationMin: Duration): { lightStart: string; fullBrightness: string } {
  const wake = toMinutes(wakeTime);
  return { lightStart: fromMinutes(wake - durationMin), fullBrightness: fromMinutes(wake) };
}

export function formatMorning(m: { lightStart: string; fullBrightness: string }): string {
  return `Light starts at ${m.lightStart}. Full brightness at ${m.fullBrightness}.`;
}
