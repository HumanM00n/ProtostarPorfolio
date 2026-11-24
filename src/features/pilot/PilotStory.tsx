import Link from "next/link";
import { Highlight } from "@/components/ui/Highlight";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/**
 * L'histoire du pilote, racontée comme une frise d'étapes numérotées.
 * Les phrases entre astérisques sont mises en gras. Si le dernier paragraphe en contient,
 * il clôt la frise en appel à l'action (phrase en rouge + lien vers les partenariats).
 */
export function PilotStory({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  if (paragraphs.length === 0) return null;

  const hasCall = paragraphs.length > 1 && (paragraphs.at(-1) ?? "").includes("*");

  return (
    <div className="mt-12 max-w-2xl">
      {title && (
        <Reveal>
          <div className="label-mono mb-3 flex items-center gap-3 text-[9px] text-volt">
            <span className="h-px w-7 bg-volt" />
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
                  "absolute top-1 h-2.5 w-2.5 rotate-45 border-2 border-paper -left-[33px] md:-left-[41px]",
                  isCall ? "bg-ink" : "bg-volt",
                )}
                aria-hidden="true"
              />
              <Reveal delay={60}>
                <div className="label-mono text-[9px] text-ink/35">
                  {isCall ? "Et la suite ?" : String(index + 1).padStart(2, "0")}
                </div>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink/75">
                  <Highlight
                    text={paragraph}
                    className={isCall ? "font-semibold text-volt" : "font-semibold text-ink"}
                  />
                </p>
                {isCall && (
                  <Link
                    href="/partenaires"
                    className="label-mono mt-3 inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-[10px] text-ink transition-colors hover:border-volt hover:text-volt"
                  >
                    Devenir partenaire
                    <span aria-hidden="true">↗</span>
                  </Link>
                )}
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
