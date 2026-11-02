"use client";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Accessible name. Describes what the switch controls, not its state. */
  label: string;
  onLabel: string;
  offLabel: string;
}

export function Switch({ checked, onChange, label, onLabel, offLabel }: SwitchProps) {
  return (
    <div className="flex items-center gap-4">
      <span aria-hidden className={checked ? "font-normal" : "font-bold underline underline-offset-4"}>
        {offLabel}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className="relative h-12 w-20 rounded-full border-2 border-current transition-colors duration-[120ms] motion-reduce:transition-none"
      >
        <span
          aria-hidden
          className="absolute top-1/2 left-1 size-8 -translate-y-1/2 rounded-full bg-current transition-transform duration-[240ms] ease-[var(--ease-state)] motion-reduce:transition-none"
          style={{ transform: `translate(${checked ? "2rem" : "0"}, -50%)` }}
        />
      </button>
      <span aria-hidden className={checked ? "font-bold underline underline-offset-4" : "font-normal"}>
        {onLabel}
      </span>
    </div>
  );
}
