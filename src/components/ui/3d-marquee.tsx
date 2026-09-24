import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Award } from "lucide-react";

export interface MarqueeImageObject {
  src: string;
  thumb360?: string;
  thumb720?: string;
  alt?: string;
  title?: string;
}

export type MarqueeImage = string | MarqueeImageObject;

export interface ThreeDMarqueeProps {
  images: MarqueeImage[];
  className?: string;
  speed?: number;
  onImageClick?: (image: string, index: number) => void;
}



export const ThreeDMarquee: React.FC<ThreeDMarqueeProps> = ({
  images,
  className = "",
  onImageClick,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hoveredColIndex, setHoveredColIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  // On touch devices, skip column hover tracking entirely (no mouse events)
  const isTouchDevice = useMemo(() =>
    typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0),
    []
  );

  // Pause marquee when offscreen to completely eliminate lag & save GPU/CPU cycles
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Normalize images to array of MarqueeImageObject
  const normalizedImages: MarqueeImageObject[] = useMemo(() => {
    return images.map((item) =>
      typeof item === "string"
        ? { src: item, thumb360: item, thumb720: item }
        : item
    );
  }, [images]);


  // Distribute certificates evenly across 3 columns (100% unique certs represented)
  const columnsData: MarqueeImageObject[][] = useMemo(() => {
    if (normalizedImages.length === 0)
      return [[], [], []];

    const cols: MarqueeImageObject[][] = [[], [], []];
    normalizedImages.forEach((img, idx) => {
      cols[idx % 3].push(img);
    });
    // Ensure all 3 columns have equal length
    const maxLen = Math.max(...cols.map(c => c.length));
    cols.forEach(col => {
      while (col.length < maxLen && normalizedImages.length > 0) {
        col.push(normalizedImages[(col.length * 7) % normalizedImages.length]);
      }
    });
    return cols;
  }, [normalizedImages]);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCardClick = (src: string, globalIdx: number) => {
    if (onImageClick) {
      onImageClick(src, globalIdx);
    } else {
      setSelectedImage(src);
    }
  };

  // Staggered smooth durations and alternating directions for 3 Columns:
  // Col 0: Up (48s)
  // Col 1: Down (62s)
  // Col 2: Up (54s)
  const columnConfigs = [
    {
      name: "col-0",
      duration: 48,
      delay: -14,
      reverse: false, // Up
      offsetClass: "mt-0",
    },
    {
      name: "col-1",
      duration: 62,
      delay: -28,
      reverse: true, // Down
      offsetClass: "mt-0",
    },
    {
      name: "col-2",
      duration: 54,
      delay: -18,
      reverse: false, // Up
      offsetClass: "mt-0",
    },
  ];

  const renderCard = useCallback((item: MarqueeImageObject, key: string, cardId: number) => {
    const thumb360 = item.thumb360 || item.src;
    const thumb720 = item.thumb720 || item.src;

    return (
      <div
        key={key}
        onClick={() => handleCardClick(item.src, cardId)}
        style={{
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          contain: "content",
        }}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-xl shadow-black/80 transition-transform duration-300 hover:scale-105 hover:border-amber-400/60 hover:z-30 aspect-[16/11]"
      >
        {/* Certificate Image - Responsive Thumbnails */}
        <img
          src={thumb360}
          srcSet={`${thumb360} 360w, ${thumb720} 720w`}
          sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, 460px"
          width={360}
          height={248}
          alt={item.alt || "Academic & Competition Certificate"}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover object-center"
        />

        {/* Glossy Gradient Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60" />

        {/* Hover Sheen & Action Icon — hidden on mobile (touch) for perf */}
        {!isTouchDevice && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/60">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 border border-white/20 text-white text-xs font-mono shadow-md">
              <ZoomIn size={14} className="text-amber-400" />
              <span>ดูขนาดเต็ม</span>
            </div>
          </div>
        )}

        {/* Subtle Badge Icon */}
        <div className="absolute top-2.5 right-2.5 p-1 rounded-full bg-black/60 border border-white/10 text-amber-400/90 opacity-70">
          <Award size={12} />
        </div>
      </div>
    );
  }, [isTouchDevice]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-3xl bg-black ${className}`}
    >
      {/* 3D Perspective Stage */}
      <div
        className="relative w-full h-[680px] sm:h-[780px] md:h-[860px] lg:h-[920px] flex items-center justify-center overflow-hidden"
        style={{ perspective: "1100px" }}
      >
        {/* Tilted 3D Isometric Plane with generous card width and spacing for 3 Columns */}
        <div
          className="relative w-[130%] sm:w-[124%] md:w-[118%] lg:w-[114%] -ml-[15%] sm:-ml-[12%] md:-ml-[9%] lg:-ml-[7%] -my-32 sm:-my-48 flex justify-center gap-4 sm:gap-6 md:gap-8 px-2"
          style={{
            transform: "rotateX(20deg) rotateZ(-12deg) skewX(6deg) scale(1.08)",
            transformStyle: "preserve-3d",
          }}
        >
          {columnsData.map((columnImages, colIndex) => {
            const config = columnConfigs[colIndex % columnConfigs.length];

            return (
              <div
                key={`col-${colIndex}`}
                onMouseEnter={isTouchDevice ? undefined : () => setHoveredColIndex(colIndex)}
                onMouseLeave={isTouchDevice ? undefined : () => setHoveredColIndex(null)}
                className={`flex-1 min-w-[220px] sm:min-w-[280px] md:min-w-[340px] lg:min-w-[390px] xl:min-w-[430px] max-w-[480px] overflow-visible ${config.offsetClass}`}
              >
                {/* Continuous Hardware-Accelerated Infinite Track (2 groups of 9 cards = 18 total per col) */}
                <div
                  className="w-full flex flex-col"
                  style={{
                    animationName: config.reverse
                      ? "marqueeScrollDown"
                      : "marqueeScrollUp",
                    animationDuration: `${config.duration}s`,
                    animationTimingFunction: "linear",
                    animationIterationCount: "infinite",
                    animationDelay: `${config.delay}s`,
                    animationPlayState:
                      !isInView || selectedImage !== null || hoveredColIndex === colIndex
                        ? "paused"
                        : "running",
                    backfaceVisibility: "hidden",
                    transform: "translateZ(0)",
                    willChange: "transform",
                  }}
                >
                  {/* Group 1: Visible Track */}
                  <div
                    className="flex flex-col gap-4 sm:gap-6 pb-4 sm:pb-6"
                    aria-hidden="true"
                  >
                    {columnImages.map((item, imgIdx) =>
                      renderCard(item, `g1-${colIndex}-${imgIdx}`, imgIdx)
                    )}
                  </div>

                  {/* Group 2: Seamless Infinite Duplicate (-50% keyframe loop) */}
                  <div className="flex flex-col gap-4 sm:gap-6 pb-4 sm:pb-6">
                    {columnImages.map((item, imgIdx) =>
                      renderCard(item, `g2-${colIndex}-${imgIdx}`, imgIdx)
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ambient Top & Bottom Vignettes (Seamless Fade into Pure Obsidian Black) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 sm:h-56 bg-gradient-to-b from-black via-black/85 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 sm:h-56 bg-gradient-to-t from-black via-black/85 to-transparent z-10" />

        {/* Subtle Side Vignettes */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-black via-black/60 to-transparent z-10" />

        {/* Center Glow Accent */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(251,191,36,0.12) 0%, rgba(99,102,241,0.08) 50%, transparent 80%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      {/* Lightbox Modal for Certificate High-Resolution Viewing */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-800 bg-neutral-900/90 text-white">
                <div className="flex items-center gap-2">
                  <Award size={18} className="text-amber-400" />
                  <span className="font-mono text-xs sm:text-sm tracking-wide text-neutral-300">
                    CERTIFICATE ARCHIVE // ภาพเกียรติบัตรต้นฉบับ
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                  title="ปิด (Esc)"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Image View */}
              <div className="p-3 sm:p-6 flex items-center justify-center overflow-auto max-h-[78vh] bg-black/70">
                <img
                  src={selectedImage}
                  alt="Certificate Full View"
                  className="max-h-[72vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
                />
              </div>

              {/* Modal Footer */}
              <div className="px-5 py-2.5 border-t border-neutral-800 bg-neutral-900/60 flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span>คลิกข้างนอกหรือกด Esc เพื่อปิด</span>
                <a
                  href={selectedImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline hover:text-amber-300 transition-colors"
                >
                  เปิดไฟล์เต็มในแท็บใหม่ ↗
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThreeDMarquee;
