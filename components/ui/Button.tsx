import type { ReactNode } from "react";

type Variant = "primary" | "quiet";
interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}
type LinkProps = BaseProps & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children" | "className">;
type ButtonProps = BaseProps & { href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

const base =
  "inline-flex min-h-12 items-center justify-center rounded-full px-7 font-medium transition-[filter,transform] duration-[120ms] ease-[var(--ease-response)] hover:brightness-110 active:scale-[0.98] motion-reduce:transition-none";
const variants: Record<Variant, string> = {
  primary: "bg-amber text-night",
  quiet: "border-2 border-current bg-transparent",
};

export function Button(props: LinkProps | ButtonProps) {
  const { variant = "primary", className = "", children } = props;
  const classes = `${base} ${variants[variant]} ${className}`;
  if (props.href !== undefined) {
    const { href, variant: _v, className: _c, children: _ch, ...rest } = props as LinkProps;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  const { variant: _v, className: _c, children: _ch, ...rest } = props as ButtonProps;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
