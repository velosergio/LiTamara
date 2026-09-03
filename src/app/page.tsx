"use client";

import gsap from "gsap";
import { useCallback, useRef, useState } from "react";
import FloatingObras from "./components/FloatingObras";
import GeometricIntro from "./components/GeometricIntro";
import ObraModal from "./components/ObraModal";
import RedCursor from "./components/RedCursor";
import RevealMask from "./components/RevealMask";
import type { Obra } from "./data/obras";

export default function Home() {
  const [selectedObra, setSelectedObra] = useState<Obra | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const handleIntroDone = useCallback(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (headingRef.current) {
      gsap.set(headingRef.current, { opacity: 1 });
      const chars = headingRef.current.querySelectorAll(".char");
      gsap.set(chars, { opacity: 0, y: 60, rotateX: -90 });
      tl.to(chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.06,
      });
    }

    if (navRef.current) {
      gsap.set(navRef.current, { opacity: 1 });
      const links = navRef.current.querySelectorAll("a");
      gsap.set(links, { opacity: 0, y: 30 });
      tl.to(links, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }, "-=0.4");
    }
  }, []);

  return (
    <div className="relative flex min-h-dvh flex-1 flex-col items-center justify-center overflow-hidden bg-[var(--red-bg)]">
      <RedCursor hidden={!!selectedObra} />
      <FloatingObras onSelect={setSelectedObra} />
      <RevealMask />

      <GeometricIntro onComplete={handleIntroDone} />

      <h1
        ref={headingRef}
        className="pointer-events-none relative z-30 select-none px-6 text-center font-semibold tracking-[0.14em] text-[clamp(2rem,8vw,5.5rem)] text-[var(--red-text)] mix-blend-multiply"
        style={{ perspective: "600px", opacity: 0 }}
      >
        {[..."Li Tamara"].map((ch, i) => {
          const key = `${i}-${ch}`;
          return (
            <span
              key={key}
              className="char inline-block"
              style={{ display: ch === " " ? "inline" : undefined }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          );
        })}
      </h1>

      <nav ref={navRef} className="relative z-30 mt-1 flex items-center gap-6" style={{ opacity: 0 }}>
        <a
          href="/docs/PortafolioLiTamara.pdf"
          download
          className="nav-link group relative px-1 py-1 text-sm tracking-[0.2em] uppercase text-black transition-colors hover:text-white"
        >
          Portafolio
          <span className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-500 group-hover:w-full" />
        </a>

        <span className="text-black/30 select-none">·</span>

        <a
          href="mailto:lifetaflo23@gmail.com"
          className="nav-link group relative px-1 py-1 text-sm tracking-[0.2em] uppercase text-black transition-colors hover:text-white"
        >
          Contacto
          <span className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-500 group-hover:w-full" />
        </a>
      </nav>

      <ObraModal obra={selectedObra} onClose={() => setSelectedObra(null)} />
    </div>
  );
}
