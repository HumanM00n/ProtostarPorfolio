"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

export function NavLink({ href, onClick, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    // Laisse le navigateur gérer ctrl/cmd+clic (nouvel onglet) et les clics déjà annulés.
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    if (href === pathname) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
