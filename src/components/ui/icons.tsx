import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export function Lightning({ filled = false, ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg {...base(props)} fill={filled ? "currentColor" : "none"} aria-hidden="true">
      <path d="M13.2 2.5 4.5 13.8h5.6l-1.2 7.7 8.7-11.3h-5.6l1.2-7.7z" />
    </svg>
  );
}

export function Headphones(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 15.5v-3a8 8 0 0 1 16 0v3" />
      <rect x="2.8" y="14.5" width="4.4" height="7.5" rx="2.2" />
      <rect x="16.8" y="14.5" width="4.4" height="7.5" rx="2.2" />
    </svg>
  );
}

export function Star({ filled = false, ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg {...base(props)} fill={filled ? "currentColor" : "none"} aria-hidden="true">
      <path d="M12 2.5l2.55 6.2 6.7.55-5.1 4.4 1.55 6.55L12 16.6l-5.7 3.6 1.55-6.55-5.1-4.4 6.7-.55L12 2.5z" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowDown(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 4v15M6 13l6 6 6-6" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 7h18M3 12h18M3 17h18" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function Download(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3v12M7 10l5 5 5-5M4 20h16" />
    </svg>
  );
}

export function Printer(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v7H7z" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 12.5 9 17.5 20 6.5" />
    </svg>
  );
}

export function Clipboard(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="8" y="3" width="8" height="4" rx="1" />
      <path d="M16 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 3h4l2 5-2.5 1.5a13 13 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export function MapPin(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function CalendarDays(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" />
    </svg>
  );
}

export function Clock(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function Flag(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 21V4M5 4c4-2 6 2 10 0v9c-4 2-6-2-10 0" />
    </svg>
  );
}

export function Trophy(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4zM8 6H4v2a4 4 0 0 0 4 4M16 6h4v2a4 4 0 0 1-4 4M12 13v5M8 21h8M9 21v-2h6v2" />
    </svg>
  );
}

export function Gauge(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4.2 17a9 9 0 1 1 15.6 0" />
      <path d="M12 13l4-4" />
      <circle cx="12" cy="14" r="1.4" />
    </svg>
  );
}

export function Instagram(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YouTube(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10.5 9.5 5 2.5-5 2.5v-5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTok(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14 4v9.5a4.5 4.5 0 1 1-4-4.47" />
      <path d="M14 4c.3 2.6 1.9 4.2 4.5 4.5" />
    </svg>
  );
}

export function SocialIcon({ label, ...props }: IconProps & { label: string }) {
  const normalized = label.toLowerCase();
  if (normalized.includes("insta")) return <Instagram {...props} />;
  if (normalized.includes("you")) return <YouTube {...props} />;
  if (normalized.includes("tik")) return <TikTok {...props} />;
  return <ArrowUpRight {...props} />;
}

export function SpinnerMark({ text, className = "" }: { text: string; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <defs>
        <path
          id="spin-circle"
          d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
        />
      </defs>
      <text className="fill-current font-mono text-[9.2px] uppercase tracking-[0.32em]">
        <textPath href="#spin-circle" startOffset="0%">
          {text}
        </textPath>
      </text>
    </svg>
  );
}
