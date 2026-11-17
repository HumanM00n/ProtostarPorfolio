import { Hero } from "@/features/home/Hero";
import { SectionLinks } from "@/features/home/SectionLinks";
import { Ticker } from "@/features/home/Ticker";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <SectionLinks />
    </>
  );
}
