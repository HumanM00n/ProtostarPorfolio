"use client";

import { useEffect, useRef, type PointerEvent } from "react";

/**
 * Remplace la barre de défilement native (souris / trackpad uniquement) par une piste
 * où un prototype LMP2 vu de dessus descend au fil de la page. La voiture se glisse
 * comme une barre de défilement classique ; la molette et le clavier fonctionnent comme avant.
 * Sur écrans tactiles, la barre native est conservée (voir .scroll-car dans globals.css).
 */
export function ScrollCar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const grabOffset = useRef(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const track = trackRef.current;
      const car = carRef.current;
      if (!track || !car) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      track.dataset.empty = String(max <= 0);
      const progress = max > 0 ? window.scrollY / max : 0;
      car.style.transform = `translateY(${progress * (track.clientHeight - car.offsetHeight)}px)`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // La hauteur de page change aussi quand les images ou les sections se chargent.
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, []);

  /** Fait défiler la page pour que la voiture suive le pointeur. */
  const scrollToPointer = (clientY: number) => {
    const track = trackRef.current;
    const car = carRef.current;
    if (!track || !car) return;
    const rect = track.getBoundingClientRect();
    const range = rect.height - car.offsetHeight;
    const ratio = Math.min(1, Math.max(0, (clientY - rect.top - grabOffset.current) / range));
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: ratio * max, behavior: "instant" });
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.preventDefault();
    const car = carRef.current;
    if (!car) return;
    const carRect = car.getBoundingClientRect();
    const onCar = event.clientY >= carRect.top && event.clientY <= carRect.bottom;
    // Clic sur la voiture : on la garde sous le pointeur. Clic sur la piste : on centre la voiture.
    grabOffset.current = onCar ? event.clientY - carRect.top : carRect.height / 2;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.dataset.dragging = "true";
    if (!onCar) scrollToPointer(event.clientY);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) scrollToPointer(event.clientY);
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
    delete event.currentTarget.dataset.dragging;
  };

  return (
    <div
      ref={trackRef}
      className="scroll-car no-print group"
      aria-hidden="true"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div ref={carRef} className="scroll-car__car">
        <Lmp2 />
      </div>
    </div>
  );
}

/** Prototype type LMP2 vu de dessus, nez vers le bas (sens du défilement). Livrée Protostar. */
function Lmp2() {
  return (
    <svg viewBox="0 0 40 100" width="20" height="50" className="block">
      {/* Roues, à peine visibles sous les ailes carrossées */}
      <rect x="0" y="15" width="3" height="16" rx="1" fill="#070707" />
      <rect x="37" y="15" width="3" height="16" rx="1" fill="#070707" />
      <rect x="0.5" y="66" width="3" height="14" rx="1" fill="#070707" />
      <rect x="36.5" y="66" width="3" height="14" rx="1" fill="#070707" />
      {/* Aileron arrière */}
      <rect x="3" y="1" width="34" height="5" rx="1" fill="#070707" />
      <rect x="5" y="2.5" width="30" height="2" fill="#ff1e2d" />
      {/* Carrosserie fermée : ailes arrière et avant bombées, cellule centrale étroite */}
      <path
        d="M7 7 H33 Q37.5 10 37.5 18 V30 Q37.5 35 34 37 L32 58 Q37 61 37 68 V79 Q37 85 33 88 L27 97 H13 L7 88 Q3 85 3 79 V68 Q3 61 8 58 L6 37 Q2.5 35 2.5 30 V18 Q2.5 10 7 7 Z"
        fill="#ff1e2d"
        stroke="#d90429"
        strokeWidth="0.8"
      />
      {/* Ailes : reflets sombres pour marquer le volume */}
      <path d="M4 14 Q4 10 8 9 V34 Q4 33 4 29 Z" fill="#d90429" />
      <path d="M36 14 Q36 10 32 9 V34 Q36 33 36 29 Z" fill="#d90429" />
      <path d="M4.5 68 Q4.5 62 9 60 V86 Q4.5 84 4.5 79 Z" fill="#d90429" />
      <path d="M35.5 68 Q35.5 62 31 60 V86 Q35.5 84 35.5 79 Z" fill="#d90429" />
      {/* Aileron de requin le long de la colonne */}
      <rect x="19.3" y="6" width="1.4" height="38" fill="#070707" />
      {/* Bande blanche du cockpit au nez */}
      <path d="M17 50 H23 V93 L20 96 L17 93 Z" fill="#f5f3ee" />
      {/* Cockpit fermé */}
      <ellipse cx="20" cy="51" rx="6" ry="9.5" fill="#070707" />
      <ellipse cx="20" cy="54" rx="3.8" ry="5" fill="#3a3d3a" />
      {/* Phares */}
      <rect x="9" y="85" width="5" height="1.6" rx="0.8" fill="#f5f3ee" />
      <rect x="26" y="85" width="5" height="1.6" rx="0.8" fill="#f5f3ee" />
    </svg>
  );
}
