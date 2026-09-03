"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const ISOTIPO_POINTS =
  "153.4,932.5 98.8,308.2 651.4,35.1 913.7,612.3 431.8,838.2 211.2,327.4 761.7,71.5 1033.7,597.3 560.3,1044.9 46.3,670.1 391.2,109 864.5,362.8 632.1,858.6 217.7,657.3";

/** Target visual stroke ≈ 5.6px after scale (matches desktop look). */
function strokeForScale(scale: number) {
  return Math.round(5.6 / scale);
}

function introSettle() {
  const narrow = window.matchMedia("(max-width: 640px)").matches;
  const short = window.matchMedia("(max-height: 700px)").matches;

  if (narrow) {
    // Larger mark, tucked just above the title — not lost in the upper third
    return {
      scale: short ? 0.42 : 0.5,
      y: short ? "-6vh" : "-8vh",
    };
  }

  return { scale: 0.28, y: "-18vh" };
}

export default function GeometricIntro({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const line =
        containerRef.current?.querySelector<SVGPolylineElement>(".geo-path");
      if (!line) return;

      const length = line.getTotalLength();
      const { scale, y } = introSettle();
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: 0,
          attr: { "stroke-width": strokeForScale(scale) },
        });
        gsap.set(".geo-svg", { scale, y });
        onComplete();
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          onComplete,
        });

        tl.to(line, {
          strokeDashoffset: 0,
          duration: 2.4,
          ease: "power2.inOut",
        });

        tl.to(
          ".geo-svg",
          {
            scale,
            y,
            duration: 1.2,
            ease: "power3.inOut",
          },
          "+=0.3",
        );

        // Keep Illustrator stroke weight readable after CSS scale
        tl.to(
          line,
          {
            attr: { "stroke-width": strokeForScale(scale) },
            duration: 1.2,
            ease: "power3.inOut",
          },
          "<",
        );
      });

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center"
    >
      <svg
        className="geo-svg h-[min(78vmin,520px)] w-[min(78vmin,520px)] max-sm:h-[min(88vmin,420px)] max-sm:w-[min(88vmin,420px)]"
        viewBox="0 0 1080 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <polyline
          className="geo-path"
          points={ISOTIPO_POINTS}
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="8"
          strokeMiterlimit={10}
          strokeLinejoin="miter"
          strokeLinecap="butt"
        />
      </svg>
    </div>
  );
}
