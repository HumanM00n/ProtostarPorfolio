import { Fragment } from "react";

/**
 * Affiche un texte en mettant en rouge les mots entourés d'astérisques.
 * Ex. « Chaque *course*, une nouvelle *leçon*. » → « course » et « leçon » en rouge.
 */
export function Highlight({ text, className = "text-volt" }: { text: string; className?: string }) {
  return text.split(/\*([^*]+)\*/g).map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className={className}>
        {part}
      </span>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}
