"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { Star } from "./icons";

/**
 * next/image en mode `fill` avec un repli visuel si l'image ne charge pas.
 * Le conteneur doit avoir une taille (aspect-ratio, hauteur ou position absolue).
 */
export function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  sizes = "100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const failed = failedSrc === src;

  return (
    <div className={cn("relative overflow-hidden bg-carbon", className)}>
      {!failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imgClassName)}
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_30%_20%,#23271c,#0a0b0a)] text-paper/40">
          <Star className="h-7 w-7" />
          <span className="label-mono text-[9px]">Image à définir</span>
        </div>
      )}
    </div>
  );
}
