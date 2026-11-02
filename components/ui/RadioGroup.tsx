"use client";
import { useId } from "react";

export interface RadioOption {
  value: string;
  label: string;
  swatch?: string;
}

interface RadioGroupProps {
  name: string;
  legend: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

/** Native radios, so arrow keys, grouping and form submission work with no extra code. */
export function RadioGroup({ name, legend, options, value, onChange, error }: RadioGroupProps) {
  const errorId = useId();
  return (
    <fieldset aria-describedby={error ? errorId : undefined} className="min-w-0">
      <legend className="mb-3 text-sm font-medium">{legend}</legend>
      <div className="flex flex-wrap gap-3">
        {options.map((o) => (
          <label
            key={o.value}
            className="flex min-h-12 cursor-pointer items-center gap-3 rounded-full border-2 border-current px-5 transition-colors duration-[120ms] has-[:checked]:border-amber has-[:checked]:bg-amber has-[:checked]:text-night has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-[3px]"
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
            {o.swatch ? <span aria-hidden className="size-4 rounded-full border border-current" style={{ background: o.swatch }} /> : null}
            {o.label}
          </label>
        ))}
      </div>
      {error ? (
        <p id={errorId} className="mt-2 text-sm font-medium">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
