"use client";

import gsap from "gsap";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { fondoDecorativo, type Obra, obras, thumbOf } from "../data/obras";

interface FloatingObraItem {
  key: string;
  /** null = imagen decorativa del fondo, sin ficha ni modal */
  obra: Obra | null;
  imgSrc: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  speed: number;
  dirX: number;
  dirY: number;
}

function buildFloatingItems(): FloatingObraItem[] {
  const mobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 640px)").matches;

  const sources = [
    ...obras.map((obra) => ({ key: obra.slug, obra, src: obra.images[0] })),
    ...fondoDecorativo.map((src) => ({ key: src, obra: null, src })),
  ];

  const items: FloatingObraItem[] = [];
  for (const { key, obra, src } of sources) {
    // Keep a clear band around the centered brand on phones
    const x = mobile ? 8 + Math.random() * 84 : Math.random() * 100;
    const y = mobile
      ? Math.random() < 0.5
        ? 4 + Math.random() * 22
        : 68 + Math.random() * 26
      : Math.random() * 100;

    items.push({
      key,
      obra,
      imgSrc: thumbOf(src),
      x,
      y,
      rotation: Math.random() * 30 - 15,
      scale: mobile ? 0.55 + Math.random() * 0.35 : 0.6 + Math.random() * 0.5,
      speed: 0.15 + Math.random() * 0.25,
      dirX: Math.random() > 0.5 ? 1 : -1,
      dirY: Math.random() > 0.5 ? 1 : -1,
    });
  }
  return items;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function handleMouseEnter(el: HTMLElement) {
  gsap.to(el, {
    scale: 1.15,
    opacity: 1,
    filter: "brightness(1.1)",
    duration: prefersReducedMotion() ? 0 : 0.4,
    ease: "power2.out",
    overwrite: "auto",
  });
}

function handleMouseLeave(el: HTMLElement, item: FloatingObraItem) {
  gsap.to(el, {
    scale: item.scale,
    filter: "brightness(1)",
    duration: prefersReducedMotion() ? 0 : 0.6,
    ease: "power2.inOut",
    overwrite: "auto",
  });
}

interface Props {
  onSelect: (obra: Obra) => void;
}

export default function FloatingObras({ onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLElement[]>([]);
  const [floatingItems] = useState(buildFloatingItems);

  const setItemRef = useCallback((el: HTMLElement | null, i: number) => {
    if (el) itemsRef.current[i] = el;
  }, []);

  useEffect(() => {
    const els = itemsRef.current;
    if (!els.length) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        motionOk: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const reduceMotion = Boolean(context.conditions?.reduceMotion);
        const tweens: gsap.core.Tween[] = [];

        for (let i = 0; i < els.length; i++) {
          const el = els[i];
          const item = floatingItems[i];
          if (!el) continue;

          gsap.set(el, {
            xPercent: -50,
            yPercent: -50,
            left: `${item.x}%`,
            top: `${item.y}%`,
            rotation: item.rotation,
            scale: item.scale,
            opacity: 0,
          });

          gsap.to(el, {
            opacity: 1,
            duration: reduceMotion ? 0 : 1.5,
            delay: reduceMotion ? 0 : i * 0.08,
            ease: "power2.out",
          });

          if (!reduceMotion) {
            const driftX = (40 + Math.random() * 60) * item.dirX;
            const driftY = (30 + Math.random() * 50) * item.dirY;
            const duration = 18 + Math.random() * 22;

            tweens.push(
              gsap.to(el, {
                x: `+=${driftX}`,
                y: `+=${driftY}`,
                rotation: `+=${(Math.random() - 0.5) * 20}`,
                duration,
                ease: "none",
                repeat: -1,
                yoyo: true,
              }),
            );
          }
        }

        return () => {
          for (const t of tweens) t.kill();
        };
      },
    );

    return () => {
      mm.revert();
    };
  }, [floatingItems]);

  return (
    <div ref={containerRef} className="floating-obras-container">
      {floatingItems.map((item, i) => {
        const { obra } = item;
        const image = (
          <Image
            src={item.imgSrc}
            alt={obra ? obra.title : ""}
            width={260}
            height={320}
            sizes="(max-width: 640px) 26vw, 18vw"
            draggable={false}
            style={{ width: "100%", height: "auto" }}
          />
        );

        if (!obra) {
          return (
            <div
              key={item.key}
              ref={(el) => setItemRef(el, i)}
              className="floating-obra floating-obra--decor"
              aria-hidden
            >
              {image}
            </div>
          );
        }

        return (
          <button
            type="button"
            key={item.key}
            ref={(el) => setItemRef(el, i)}
            className="floating-obra"
            onMouseEnter={() => {
              const el = itemsRef.current[i];
              if (el) handleMouseEnter(el);
            }}
            onMouseLeave={() => {
              const el = itemsRef.current[i];
              if (el) handleMouseLeave(el, item);
            }}
            onClick={() => onSelect(obra)}
          >
            {image}
          </button>
        );
      })}
    </div>
  );
}
