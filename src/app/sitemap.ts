import type { MetadataRoute } from "next";
import { navLinks } from "@/data/navigation";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", ...navLinks.map((link) => link.href), "/dossier"].map((path) => ({
    url: `${baseUrl}${path === "/" ? "" : path}`,
  }));
}
