"use client";

import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { type Obra, obras } from "../data/obras";

interface FloatingObraItem {
  obra: Obra;
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
  const items: FloatingObraItem[] = [];
  for (const obra of obras) {
    const img = obra.images[0];
    items.push({
      obra,
      imgSrc: img,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 30 - 15,
      scale: 0.6 + Math.random() * 0.5,
      speed: 0.15 + Math.random() * 0.25,
      dirX: Math.random() > 0.5 ? 1 : -1,
      dirY: Math.random() > 0.5 ? 1 : -1,
    });
  }
  return items;
}

interface Props {
  onSelect: (obra: Obra) => void;
}

export default function FloatingObras({ onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLButtonElement[]>([]);
  const [floatingItems] = useState(buildFloatingItems);
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  const setItemRef = useCallback((el: HTMLButtonElement | null, i: number) => {
    if (el) itemsRef.current[i] = el;
  }, []);

  useEffect(() => {
    const els = itemsRef.current;
    if (!els.length) return;

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
        duration: 1.5,
        delay: i * 0.08,
        ease: "power2.out",
      });

      const driftX = (40 + Math.random() * 60) * item.dirX;
      const driftY = (30 + Math.random() * 50) * item.dirY;
      const duration = 18 + Math.random() * 22;

      const tween = gsap.to(el, {
        x: `+=${driftX}`,
        y: `+=${driftY}`,
        rotation: `+=${(Math.random() - 0.5) * 20}`,
        duration,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });

      tweens.push(tween);
    }

    tweensRef.current = tweens;

    return () => {
      for (const t of tweens) t.kill();
    };
  }, [floatingItems]);

  const handleMouseEnter = (el: HTMLButtonElement) => {
    gsap.to(el, {
      scale: 1.15,
      opacity: 1,
      filter: "brightness(1.1)",
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = (el: HTMLButtonElement, item: FloatingObraItem) => {
    gsap.to(el, {
      scale: item.scale,
      filter: "brightness(1)",
      duration: 0.6,
      ease: "power2.inOut",
      overwrite: "auto",
    });
  };

  return (
    <div ref={containerRef} className="floating-obras-container">
      {floatingItems.map((item, i) => (
        <button
          type="button"
          key={item.obra.slug}
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
          onClick={() => onSelect(item.obra)}
        >
          <img
            src={item.imgSrc}
            alt={item.obra.title}
            draggable={false}
            loading="lazy"
          />
        </button>
      ))}
    </div>
  );
}
