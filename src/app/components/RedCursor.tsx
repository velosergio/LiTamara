"use client";

import { useEffect, useRef } from "react";

export default function RedCursor({ hidden = false }: { hidden?: boolean }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const follower = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const prefersFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!prefersFinePointer) return;

    document.documentElement.classList.add("has-red-cursor");

    const onMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const animate = () => {
      follower.current.x += (mouse.current.x - follower.current.x) * 0.14;
      follower.current.y += (mouse.current.y - follower.current.y) * 0.14;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${follower.current.x}px, ${follower.current.y}px, 0) translate(-50%, -50%)`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove("has-red-cursor");
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  useEffect(() => {
    if (hidden) {
      document.documentElement.classList.remove("has-red-cursor");
    } else if (window.matchMedia("(pointer: fine)").matches) {
      document.documentElement.classList.add("has-red-cursor");
    }
  }, [hidden]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 [@media(pointer:fine)]:block ${hidden ? "!hidden" : "hidden"}`}
      aria-hidden
    >
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 size-10 rounded-full bg-[var(--red-cursor)] will-change-transform"
      />
      <div
        ref={followerRef}
        className="absolute top-0 left-0 size-3 rounded-full bg-[var(--red-follower)] will-change-transform"
      />
    </div>
  );
}
