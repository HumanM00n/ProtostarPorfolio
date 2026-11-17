export type NavLink = { href: string; label: string };

/** Une entrée = une page. L'ordre définit la navbar, le menu mobile et le footer. */
export const navLinks: NavLink[] = [
  { href: "/pilote", label: "Le pilote" },
  { href: "/palmares", label: "Palmarès" },
  { href: "/en-piste", label: "En piste" },
  { href: "/partenaires", label: "Partenaires" },
  { href: "/contact", label: "Contact" },
];
