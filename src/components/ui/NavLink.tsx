"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

/**
 * <Link> qui remonte en haut de page quand on clique sur la page où l'on est déjà.
 * Sans ça, Next garde la position ou s'arrête sur une section au milieu de la page
 * (ex. logo cliqué en bas de l'accueil → section « Brick by brick »).
 */
export function NavLink({ href, onClick, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    // Laisse le navigateur gérer ctrl/cmd+clic (nouvel onglet) et les clics déjà annulés.
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    if (href === pathname) {
      event.preventDefault();
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
