import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { CornerMascot } from "./CornerMascot";

// Import all certificates strictly from src/assets/certificate only
const certModules = import.meta.glob<{ default: string }>(
  "@/assets/certificate/*.{png,jpg,jpeg,webp}",
  { eager: true }
);

const certificateImages: string[] = Object.values(certModules)
  .map((mod) => (typeof mod === "string" ? mod : mod.default))
  .filter(Boolean);

export const OtherCertificatesMarquee: React.FC = () => {
  const runwayRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: runwayProgress } = useScroll({
    target: runwayRef,
    offset: ["start end", "end start"],
  });

  const otherTextX = useTransform(runwayProgress, [0, 1], [-80, 80]);
  const otherTextOpacity = useTransform(runwayProgress, [0.1, 0.4, 0.7, 0.95], [0.3, 1, 1, 0.3]);
  const otherScale = useTransform(runwayProgress, [0.1, 0.5], [0.94, 1.02]);

  return (
    <section id="other" className="relative w-full bg-black text-white overflow-hidden">
      {/* Seamless Transition Runway from Camp Showcase (#faf9f6) into Deep Obsidian Black (#000000) */}
      <div className="relative w-full h-24 sm:h-36 bg-gradient-to-b from-[#faf9f6] via-neutral-950/80 to-black overflow-hidden">
        {/* Soft atmospheric glow origin */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[160px] pointer-events-none opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(251,191,36,0.2) 0%, rgba(99,102,241,0.1) 50%, transparent 80%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* =========================================================================
          SECTION: SCROLL DOWN RUNWAY WITH GIANT ANIMATED "OTHER" TYPOGRAPHY
          ========================================================================= */}
      <section
        ref={runwayRef}
        className="w-full bg-black text-white pt-6 sm:pt-14 pb-10 sm:pb-14 px-6 sm:px-12 flex flex-col items-center justify-center relative overflow-hidden select-none"
      >
        <div className="max-w-6xl w-full flex flex-col items-center text-center relative z-10">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-mono mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>05 // OTHER</span>
          </div>

          {/* Giant Animated "OTHER" Typography */}
          <div className="w-full overflow-hidden py-4 sm:py-6">
            <motion.h2
              style={{
                x: otherTextX,
                opacity: otherTextOpacity,
                scale: otherScale,
                willChange: "transform, opacity",
                transform: "translateZ(0)",
              }}
              className="font-black text-6xl sm:text-8xl md:text-9xl lg:text-[13rem] tracking-tighter uppercase leading-none text-white select-none"
            >
              <span className="text-amber-400">O</span>THER
            </motion.h2>
          </div>

          {/* Scroll Down Guide Prompt */}
          <div className="mt-2 sm:mt-4 flex flex-col items-center gap-2 text-xs sm:text-sm font-mono text-neutral-400">
            <span className="tracking-widest uppercase text-neutral-500">
              SCROLL DOWN TO EXPLORE
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-7 h-7 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 shadow-xs"
            >
              <ArrowDown size={14} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main 3D Marquee Stage */}
      <div className="relative w-full px-2 sm:px-4 md:px-6 py-2 sm:py-4">
        {/* Subtle Mascot Observer Peeking at Certificates */}
        <div className="mx-auto max-w-[1560px] flex justify-end px-6 sm:px-10 -mb-5 relative z-20 pointer-events-auto">
          <CornerMascot
            pose="down_left"
            size="sm"
            idleAnimation="peek"
            alt="Tanwa Cert Marquee Mascot"
            className="filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
          />
        </div>

        <div className="mx-auto max-w-[1560px] rounded-3xl bg-neutral-950 p-2 sm:p-3 ring-1 ring-neutral-800/60 shadow-[0_0_80px_rgba(0,0,0,0.9)] overflow-hidden relative">
          <ThreeDMarquee images={certificateImages} />
        </div>
      </div>

      {/* Seamless Connector to Contact Hub (#08080a) */}
      <div className="w-full h-10 sm:h-16 bg-gradient-to-b from-black to-[#08080a]" />
    </section>
  );
};

export default OtherCertificatesMarquee;
