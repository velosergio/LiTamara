"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Obra } from "../data/obras";

interface Props {
  obra: Obra | null;
  onClose: () => void;
}

export default function ObraModal({ obra, onClose }: Props) {
  const [activeImg, setActiveImg] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  const obraSlug = obra?.slug;
  useEffect(() => {
    if (obraSlug) setActiveImg(0);
  }, [obraSlug]);

  useEffect(() => {
    if (!obra) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && obra.images.length > 1)
        setActiveImg((p) => (p + 1) % obra.images.length);
      if (e.key === "ArrowLeft" && obra.images.length > 1)
        setActiveImg((p) => (p - 1 + obra.images.length) % obra.images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [obra, onClose]);

  return (
    <AnimatePresence>
      {obra && (
        <motion.div
          ref={overlayRef}
          className="obra-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={(e) => {
            if (e.target === overlayRef.current) onClose();
          }}
        >
          <motion.div
            className="obra-modal"
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              className="obra-modal-close"
              onClick={onClose}
              aria-label="Cerrar"
            >
              ×
            </button>

            <div className="obra-modal-content">
              <div className="obra-modal-gallery">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={obra.images[activeImg]}
                    src={obra.images[activeImg]}
                    alt={obra.title}
                    draggable={false}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4 }}
                  />
                </AnimatePresence>

                {obra.images.length > 1 && (
                  <div className="obra-modal-nav">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImg(
                          (p) =>
                            (p - 1 + obra.images.length) % obra.images.length,
                        )
                      }
                      aria-label="Anterior"
                    >
                      ‹
                    </button>
                    <span>
                      {activeImg + 1} / {obra.images.length}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImg((p) => (p + 1) % obra.images.length)
                      }
                      aria-label="Siguiente"
                    >
                      ›
                    </button>
                  </div>
                )}
              </div>

              <motion.div
                className="obra-modal-info"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <h2>{obra.title}</h2>

                <div className="obra-modal-meta">
                  <p>
                    <span>Técnica</span>
                    {obra.technique}
                  </p>
                  <p>
                    <span>Dimensiones</span>
                    {obra.dimensions}
                  </p>
                  <p>
                    <span>Año</span>
                    {obra.year}
                  </p>
                  {obra.series && (
                    <p>
                      <span>Serie</span>
                      {obra.series}
                    </p>
                  )}
                </div>

                <div className="obra-modal-description">
                  <p>{obra.description}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
