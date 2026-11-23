import { SiteChrome } from "@/components/layout/SiteChrome";

/** Pages publiques du site. L'admin /keystatic est hors de ce groupe : pas de navigation ni de footer. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return <SiteChrome>{children}</SiteChrome>;
}
