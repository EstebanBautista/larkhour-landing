import type { InputHTMLAttributes } from "react";

interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  name: string;
  label: string;
  error?: string;
}

export function Field({ name, label, error, className = "", ...rest }: FieldProps) {
  const errorId = `${name}-error`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`min-h-12 rounded-xl border-2 border-current bg-transparent px-4 text-base transition-colors duration-[120ms] ${className}`}
        {...rest}
      />
      {/* The slot is always rendered so an error that appears on blur cannot push the submit button out from under a click. */}
      <p id={error ? errorId : undefined} className="min-h-6 text-sm font-medium">
        {error}
      </p>
    </div>
  );
}
