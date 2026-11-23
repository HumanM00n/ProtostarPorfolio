"use client";

import Image from "next/image";
import { NavLink } from "@/components/ui/NavLink";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/navigation";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, Close, Menu } from "@/components/ui/icons";

export function Nav({ brand, support }: { brand: string; support: { label: string; url: string } }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const close = () => setMobileOpen(false);

  return (
    <>
      <header
        className={cn(
          "no-print sticky top-0 z-50 border-b border-paper/10 backdrop-blur-xl transition-colors duration-300",
          scrolled ? "bg-ink/95" : "bg-ink/75",
        )}
      >
        <div className="wrap flex h-[70px] items-center justify-between gap-5 md:h-[82px]">
          <NavLink href="/" className="flex shrink-0 items-center" aria-label={`${brand} — accueil`}>
            <Image
              src="/logo-protostar.png"
              alt={brand}
              width={640}
              height={267}
              priority
              className="h-11 w-auto md:h-[52px]"
            />
          </NavLink>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "label-mono relative py-2 text-[10px] transition-colors hover:text-paper after:absolute after:bottom-0 after:left-0 after:h-px after:bg-volt after:transition-all after:duration-300 hover:after:w-full",
                  isActive(link.href) ? "text-paper after:w-full" : "text-paper/60 after:w-0",
                )}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={support.url}
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono hidden border border-paper/20 px-3.5 py-2.5 text-[10px] text-paper/80 transition-colors hover:border-volt hover:text-volt md:block"
            >
              {support.label}
            </a>
            <Button href="/partenaires" className="hidden px-4 py-2.5 text-[10px] sm:inline-flex">
              Devenir partenaire
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center border border-paper/20 text-paper lg:hidden"
              aria-label="Ouvrir le menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="grain fixed inset-0 z-[80] flex flex-col bg-ink text-paper lg:hidden">
          <div className="wrap flex h-[70px] shrink-0 items-center justify-between border-b border-paper/10">
            <Image src="/logo-protostar.png" alt={brand} width={640} height={267} className="h-10 w-auto" />
            <button
              type="button"
              onClick={close}
              aria-label="Fermer le menu"
              className="flex h-10 w-10 items-center justify-center border border-paper/20"
            >
              <Close className="h-5 w-5" />
            </button>
          </div>
          <nav className="wrap flex flex-1 flex-col justify-center gap-1 overflow-y-auto py-8" aria-label="Navigation mobile">
            {navLinks.map((link, index) => (
              <NavLink
                key={link.href}
                href={link.href}
                onClick={close}
                aria-current={isActive(link.href) ? "page" : undefined}
                className="group flex items-baseline justify-between border-b border-paper/10 py-4"
              >
                <span className="flex items-baseline gap-4">
                  <span className="label-mono text-[9px] text-volt">0{index + 1}</span>
                  <span
                    className={cn(
                      "font-display text-4xl uppercase tracking-wide transition-colors group-hover:text-volt",
                      isActive(link.href) ? "text-volt" : "text-paper/90",
                    )}
                  >
                    {link.label}
                  </span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-paper/40" />
              </NavLink>
            ))}
          </nav>
          <div className="wrap shrink-0 space-y-3 pb-8">
            <Button href="/partenaires" onClick={close} className="w-full">
              Devenir partenaire
            </Button>
            <a
              href={support.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="label-mono flex w-full items-center justify-center gap-2 border border-paper/20 py-3.5 text-paper/70"
            >
              {support.label}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
