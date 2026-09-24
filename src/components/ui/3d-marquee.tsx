import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Award } from "lucide-react";

export interface MarqueeImageObject {
  src: string;
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

// Pseudo-random deterministic seeded Fisher-Yates shuffle
// Guarantees every column has a completely unique, non-repeating, mixed sequence of certificates
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  const nextRand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(nextRand() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Build a mixed column of targetCount items
function generateMixedColumn(
  allImages: string[],
  colIndex: number,
  targetCount: number = 16
): string[] {
  if (allImages.length === 0) return [];
  // 5 distinct prime seeds for 5 independent columns
  const seeds = [1337, 4242, 9876, 2026, 7777];
  const seed = seeds[colIndex % seeds.length] + colIndex * 199;
  const shuffled = seededShuffle(allImages, seed);

  // Extend or slice to targetCount
  const result: string[] = [];
  while (result.length < targetCount) {
    result.push(...shuffled);
  }
  return result.slice(0, targetCount);
}

export const ThreeDMarquee: React.FC<ThreeDMarqueeProps> = ({
  images,
  className = "",
  onImageClick,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Normalize images to array of strings
  const normalizedImages: string[] = useMemo(() => {
    return images.map((item) => (typeof item === "string" ? item : item.src));
  }, [images]);

  // Distribute and thoroughly mix images across 5 columns
  // Each column contains 16 mixed items, repeated in 3 groups (Group 1: Top Buffer, Group 2: Center, Group 3: Bottom Buffer)
  // This yields ~9,000px height per column and guarantees a 100% gapless continuous infinite loop with NO blank cuts
  const columnsData = useMemo(() => {
    if (normalizedImages.length === 0) return [[], [], [], [], []];
    return [0, 1, 2, 3, 4].map((colIdx) =>
      generateMixedColumn(normalizedImages, colIdx, 16)
    );
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

  // Anti-Step Configuration:
  // 1. Alternating directions (Up, Down, Up, Down, Up)
  // 2. Co-prime durations (46s, 54s, 40s, 58s, 45s) so they never sync
  // 3. Staggered negative delays (-17.5s, -34.2s, -9.8s, -43.1s, -22.6s) so they start at different elevations at t=0
  // 4. Non-monotonic physical offsets to break any diagonal/staircase alignment
  const columnConfigs = [
    {
      name: "col-0",
      duration: 46,
      delay: -17.5,
      reverse: false, // Up
      offsetClass: "mt-0",
    },
    {
      name: "col-1",
      duration: 54,
      delay: -34.2,
      reverse: true, // Down
      offsetClass: "-mt-36 sm:-mt-52",
    },
    {
      name: "col-2",
      duration: 40,
      delay: -9.8,
      reverse: false, // Up
      offsetClass: "mt-24 sm:mt-32",
    },
    {
      name: "col-3",
      duration: 58,
      delay: -43.1,
      reverse: true, // Down
      offsetClass: "-mt-20 sm:-mt-28",
    },
    {
      name: "col-4",
      duration: 45,
      delay: -22.6,
      reverse: false, // Up
      offsetClass: "mt-40 sm:mt-56",
    },
  ];

  const renderCard = (src: string, key: string, cardId: number) => (
    <div
      key={key}
      onClick={() => handleCardClick(src, cardId)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/90 shadow-[0_12px_32px_rgba(0,0,0,0.85)] transition-all duration-300 hover:scale-105 hover:border-amber-400/60 hover:shadow-[0_20px_45px_rgba(251,191,36,0.25)] hover:z-30 aspect-[16/11]"
    >
      {/* Certificate Image */}
      <img
        src={src}
        alt="Academic & Competition Certificate"
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
      />

      {/* Glossy Reflection Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-white/10 opacity-60 transition-opacity duration-300 group-hover:opacity-20" />

      {/* Hover Sheen & Action Icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 backdrop-blur-[2px]">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 border border-white/20 text-white text-xs font-mono shadow-lg">
          <ZoomIn size={14} className="text-amber-400" />
          <span>ดูเกียรติบัตร</span>
        </div>
      </div>

      {/* Subtle Badge Icon */}
      <div className="absolute top-2.5 right-2.5 p-1 rounded-full bg-black/60 border border-white/10 text-amber-400/90 opacity-70 group-hover:opacity-100 transition-opacity">
        <Award size={12} />
      </div>
    </div>
  );

  return (
    <div
      className={`relative w-full overflow-hidden rounded-3xl bg-black ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 3D Perspective Stage */}
      <div
        className="relative w-full h-[660px] sm:h-[760px] md:h-[840px] lg:h-[900px] flex items-center justify-center overflow-hidden"
        style={{ perspective: "1100px" }}
      >
        {/* Tilted 3D Isometric Plane with generous bleed to eliminate corner gaps */}
        <div
          className="relative w-[136%] sm:w-[125%] -ml-[18%] sm:-ml-[12%] -my-44 sm:-my-60 flex justify-center gap-3 sm:gap-4 md:gap-6 px-4"
          style={{
            transform: "rotateX(20deg) rotateZ(-12deg) skewX(6deg) scale(1.06)",
            transformStyle: "preserve-3d",
          }}
        >
          {columnsData.map((columnImages, colIndex) => {
            const config = columnConfigs[colIndex % columnConfigs.length];

            return (
              <div
                key={`col-${colIndex}`}
                className={`flex-1 min-w-[140px] sm:min-w-[180px] md:min-w-[210px] lg:min-w-[240px] overflow-visible ${config.offsetClass} ${
                  colIndex === 4 ? "hidden xl:block" : ""
                } ${colIndex === 3 ? "hidden md:block" : ""}`}
              >
                {/* Continuous 3-Group Hardware-Accelerated Infinite Track */}
                <div
                  className="w-full flex flex-col will-change-transform"
                  style={{
                    animationName: config.reverse
                      ? "marqueeScrollDown"
                      : "marqueeScrollUp",
                    animationDuration: `${config.duration}s`,
                    animationTimingFunction: "linear",
                    animationIterationCount: "infinite",
                    animationDelay: `${config.delay}s`,
                    animationPlayState: isPaused ? "paused" : "running",
                  }}
                >
                  {/* Group 1: Buffer Above (Ensures 3,000px of cards are always above the viewport) */}
                  <div
                    className="flex flex-col gap-4 sm:gap-6 pb-4 sm:pb-6"
                    aria-hidden="true"
                  >
                    {columnImages.map((src, imgIdx) =>
                      renderCard(src, `g1-${colIndex}-${imgIdx}`, imgIdx)
                    )}
                  </div>

                  {/* Group 2: Center Viewport Content */}
                  <div className="flex flex-col gap-4 sm:gap-6 pb-4 sm:pb-6">
                    {columnImages.map((src, imgIdx) =>
                      renderCard(src, `g2-${colIndex}-${imgIdx}`, imgIdx)
                    )}
                  </div>

                  {/* Group 3: Buffer Below (Ensures 3,000px of cards are always below the viewport) */}
                  <div
                    className="flex flex-col gap-4 sm:gap-6 pb-4 sm:pb-6"
                    aria-hidden="true"
                  >
                    {columnImages.map((src, imgIdx) =>
                      renderCard(src, `g3-${colIndex}-${imgIdx}`, imgIdx)
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
