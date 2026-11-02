"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import { reserve, type ReserveState } from "@/app/actions/reserve";
import { Lamp } from "@/components/lamp/Lamp";
import { useMorning } from "@/components/MorningProvider";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { computeMorning, formatMorning } from "@/lib/morning";
import { EMAIL_MESSAGE, isValidEmail } from "@/lib/email";
import type { FinishKey, Product, ReserveSection } from "@/lib/sanity/types";

const IDLE: ReserveState = { status: "idle" };

export function ReserveForm({ section, product }: { section: ReserveSection; product: Product }) {
  const morning = useMorning();
  const [state, formAction, pending] = useActionState(reserve, IDLE);
  const [blurError, setBlurError] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);
  const finish = product.finishes.find((f) => f.key === morning.finish) ?? product.finishes[0];
  const summary = formatMorning(computeMorning(morning.wakeTime, morning.durationMin));

  // Move focus to the first field with an error so keyboard and screen reader users land on it.
  useEffect(() => {
    if (state.status !== "error" || !state.errors) return;
    const first = Object.keys(state.errors)[0];
    formRef.current?.querySelector<HTMLElement>(`input[name="${first}"]:not([type=hidden])`)?.focus();
  }, [state]);

  const checkEmail = (email: string) => setBlurError(isValidEmail(email) ? undefined : EMAIL_MESSAGE);

  return (
    <div className="grid gap-8">
      <div className="flex items-center gap-6">
        <div style={{ "--light": 0.9, "--warmth": 0 } as React.CSSProperties} className="w-24 shrink-0">
          <Lamp finish={morning.finish} color={finish.color} className="w-full" />
        </div>
        <p data-testid="morning-summary">
          {summary}
          <span className="mt-1 block text-sm">
            {finish.name} finish, {morning.sound.toLowerCase()}.
          </span>
        </p>
      </div>

      <p role="status" className="text-xl font-bold">
        {state.status === "success" ? section.successMessage || state.message : null}
      </p>

      {state.status === "success" ? null : (
        <form ref={formRef} action={formAction} noValidate className="grid gap-6">
          <Field
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            defaultValue={state.values?.email ?? ""}
            error={state.errors?.email ?? blurError}
            onBlur={(e) => checkEmail(e.currentTarget.value)}
          />
          <RadioGroup
            name="finish"
            legend="Finish"
            options={product.finishes.map((f) => ({ value: f.key, label: f.name, swatch: f.color }))}
            value={morning.finish}
            onChange={(v) => morning.set({ finish: v as FinishKey })}
            error={state.errors?.finish}
          />
          <input type="hidden" name="wakeTime" value={morning.wakeTime} />
          <input type="hidden" name="durationMin" value={morning.durationMin} />
          <input type="hidden" name="sound" value={morning.sound} />
          <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <Button type="submit" disabled={pending}>
            {pending ? "Reserving…" : section.ctaLabel}
          </Button>
          <p className="text-sm">{section.demoNote}</p>
        </form>
      )}
    </div>
  );
}
