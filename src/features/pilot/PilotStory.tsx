import Link from "next/link";
import { Fragment } from "react";
import { Highlight } from "@/components/ui/Highlight";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export function PilotStory({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  if (paragraphs.length === 0) return null;

  const hasCall = paragraphs.length > 1 && (paragraphs.at(-1) ?? "").includes("*");

  return (
    <div className="mt-12 max-w-2xl">
      {title && (
        <Reveal>
          <div className="label-mono mb-3 flex items-center gap-3 text-[9px] text-volt">
            <span className="h-0.5 w-7 bg-volt"/>
            Mon histoire
          </div>
          <h2 className="font-display text-[clamp(1.7rem,2.6vw,2.2rem)] uppercase leading-[0.95]">
            <Highlight text={title} />
          </h2>
        </Reveal>
      )}

      <ol className="relative mt-7 space-y-6 border-l border-ink/15 pl-7 md:pl-9">
        {paragraphs.map((paragraph, index) => {
          const isCall = hasCall && index === paragraphs.length - 1;
          return (
            <li key={paragraph} className="relative">
              <span
                className={cn(
                  "absolute top-1 h-2.5 w-2.5 rotate-45 border-2 border-paper -left-8.25 md:-left-10.25",
                  isCall ? "bg-ink" : "bg-volt",
                )}
                aria-hidden="true"
              />
              <Reveal delay={60}>
                <div className="label-mono text-[9px] text-ink/35">
                  {isCall ? "Et la suite ?" : String(index + 1).padStart(2, "0")}
                </div>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink/75">
                  {isCall ? (
                    // La phrase entre astérisques devient le lien vers la page Partenaires.
                    paragraph.split(/\*([^*]+)\*/g).map((part, i) =>
                      i % 2 === 1 ? (
                        <Link
                          key={i}
                          href="/partenaires"
                          className="group/cta inline-flex items-baseline gap-1 font-semibold text-volt underline decoration-volt/40 decoration-2 underline-offset-4 transition-colors hover:decoration-volt"
                        >
                          {part}
                          <span
                            aria-hidden="true"
                            className="transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                          >
                            ↗
                          </span>
                        </Link>
                      ) : (
                        <Fragment key={i}>{part}</Fragment>
                      ),
                    )
                  ) : (
                    <Highlight text={paragraph} className="font-semibold text-ink" />
                  )}
                </p>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
