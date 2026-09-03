"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const ISOTIPO_POINTS =
  "153.4,932.5 98.8,308.2 651.4,35.1 913.7,612.3 431.8,838.2 211.2,327.4 761.7,71.5 1033.7,597.3 560.3,1044.9 46.3,670.1 391.2,109 864.5,362.8 632.1,858.6 217.7,657.3";

export default function GeometricIntro({
  onComplete,
}: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const line = containerRef.current?.querySelector<SVGPolylineElement>(
        ".geo-path",
      );
      if (!line) return;

      const length = line.getTotalLength();
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
          scale: 0.28,
          y: "-18vh",
          duration: 1.2,
          ease: "power3.inOut",
        },
        "+=0.3",
      );

      // Compensate CSS scale so the 8px Illustrator stroke stays visible
      tl.to(
        line,
        {
          attr: { "stroke-width": 20 },
          duration: 1.2,
          ease: "power3.inOut",
        },
        "<",
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center"
    >
      <svg
        className="geo-svg h-[min(72vmin,520px)] w-[min(72vmin,520px)]"
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
