import React from "react";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

// Import all certificates strictly from src/assets/certificate only
const certModules = import.meta.glob<{ default: string }>(
  "@/assets/certificate/*.{png,jpg,jpeg,webp}",
  { eager: true }
);

const certificateImages: string[] = Object.values(certModules)
  .map((mod) => (typeof mod === "string" ? mod : mod.default))
  .filter(Boolean);

export const OtherCertificatesMarquee: React.FC = () => {
  return (
    <section id="other" className="relative w-full bg-black text-white overflow-hidden">
      {/* Seamless Transition Runway from Camp Showcase (#faf9f6) into Deep Obsidian Black (#000000) */}
      <div className="relative w-full h-20 sm:h-28 bg-gradient-to-b from-[#faf9f6] via-[#050507]/90 to-black overflow-hidden">
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

      {/* Main 3D Marquee Stage */}
      <div className="relative w-full px-2 sm:px-6 md:px-8 py-2 sm:py-4">
        <div className="mx-auto max-w-[1440px] rounded-3xl bg-neutral-950/80 p-2 sm:p-3 ring-1 ring-neutral-800/60 shadow-[0_0_80px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          <ThreeDMarquee images={certificateImages} />
        </div>
      </div>

      {/* Seamless Connector to Contact Hub (#08080a) */}
      <div className="w-full h-10 sm:h-16 bg-gradient-to-b from-black to-[#08080a]" />
    </section>
  );
};

export default OtherCertificatesMarquee;
