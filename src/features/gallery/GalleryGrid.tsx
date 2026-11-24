import Link from "next/link";
import type { GalleryItem } from "@/data/types";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowUpRight, Lightning } from "@/components/ui/icons";

/** Gabarits de la mosaïque : les 5 premières photos + la tuile « Votre marque ». */
const layouts = [
  "sm:col-span-2 lg:col-span-7 lg:h-[430px]",
  "sm:col-span-2 lg:col-span-5 lg:h-[430px]",
  "lg:col-span-5 lg:h-[320px]",
  "lg:col-span-7 lg:h-[320px]",
  "lg:col-span-5 lg:h-[300px]",
  "sm:col-span-2 lg:col-span-7 lg:h-[300px]",
];

export function GalleryGrid({ images }: { images: GalleryItem[] }) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">
      {images.slice(0, 5).map((image, index) => (
        <Reveal
          key={image.id}
          delay={index * 60}
          className={cn("group relative min-h-65 overflow-hidden bg-ink", layouts[index] ?? layouts[0])}
        >
          <figure className="absolute inset-0">
            <SmartImage
              src={image.src}
              alt={image.caption}
              className="absolute inset-0 h-full w-full"
              imgClassName="grayscale-[22%] transition duration-700 group-hover:scale-[1.045] group-hover:grayscale-0"
              sizes="(min-width: 1024px) 60vw, (min-width: 640px) 50vw, 100vw"
              priority={index < 2}
              position={image.position}
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/5 to-transparent" aria-hidden="true" />
            <div className="absolute left-3.5 top-3.5 flex items-center gap-1.5 border border-paper/20 bg-ink/55 px-2.5 py-1.5 backdrop-blur">
              <Lightning filled className="h-2.5 w-2.5 text-volt" />
              <span className="label-mono text-[8px] text-paper/80">{image.tag}</span>
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 p-4 text-[13px] font-medium text-paper">
              {image.caption}
            </figcaption>
          </figure>
        </Reveal>
      ))}

      <Reveal
        delay={320}
        className={cn("relative flex min-h-65 flex-col justify-between overflow-hidden bg-volt p-6 text-paper", layouts[5])}
      >
        <div className="flex items-start justify-between gap-4">
          <Lightning filled className="h-6 w-6" />
          <span className="label-mono text-[9px] opacity-60">Emplacement libre</span>
        </div>
        <div>
          <h2 className="font-display text-[clamp(1.9rem,3vw,2.6rem)] uppercase leading-[0.92]">
            Votre logo
            <br />
            votre visibilité.
          </h2>
          <p className="mt-2 max-w-60 text-[12px] leading-relaxed text-paper/70">
            Faisons en sorte d’associer votre marque à une histoire, pas un simple logo.
          </p>
          <Link
            href="/partenaires"
            className="label-mono mt-4 inline-flex items-center gap-2 border-b border-paper/40 pb-1 text-[10px] transition-opacity hover:opacity-60"
          >
            Devenir partenaire
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
