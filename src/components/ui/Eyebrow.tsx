import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({
  index,
  children,
  tone = "light",
  className,
}: {
  index?: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "label-mono flex items-center gap-3",
        tone === "light" ? "text-paper/55" : "text-ink/55",
        className,
      )}
    >
      {index && (
        <span
          className={cn(
            "flex h-5 min-w-5 items-center justify-center rounded-[2px] px-1 text-[9px]",
            tone === "light" ? "bg-volt text-paper" : "bg-ink text-volt",
          )}
        >
          {index}
        </span>
      )}
      <span className="h-px w-7 bg-current opacity-40" />
      <span>{children}</span>
    </div>
  );
}
