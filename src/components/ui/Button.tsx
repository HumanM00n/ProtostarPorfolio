import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowUpRight } from "./icons";

type ButtonVariant = "primary" | "outline" | "dark" | "ghost";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  /** Lien interne ("/contact"), externe ou mailto:. Sans href, rend un <button>. */
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  ariaLabel?: string;
  disabled?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-volt text-paper border-volt hover:bg-paper hover:border-paper hover:text-ink",
  outline: "bg-transparent text-paper border-paper/25 hover:border-volt hover:text-volt",
  dark: "bg-ink text-paper border-ink hover:bg-carbon hover:border-carbon",
  ghost: "bg-transparent text-ink border-ink/20 hover:bg-ink hover:text-paper hover:border-ink",
};

export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className,
  icon = true,
  type = "button",
  ariaLabel,
  disabled,
}: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-3 border px-5 py-3.5 text-[11px] font-mono font-medium uppercase tracking-[0.16em] transition-all duration-300",
    variantClasses[variant],
    disabled && "pointer-events-none opacity-50",
    className,
  );

  const inner = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </>
  );

  if (href?.startsWith("/")) {
    return (
      <Link href={href} className={classes} onClick={onClick} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} aria-label={ariaLabel}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} aria-label={ariaLabel} disabled={disabled}>
      {inner}
    </button>
  );
}
