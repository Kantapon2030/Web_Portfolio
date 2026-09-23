import React from "react";

type SpotlightProps = {
  className?: string;
  fill?: string;
};

export const Spotlight: React.FC<SpotlightProps> = ({
  className = "",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden z-[1] ${className}`}
    >
      {/* 1. Overhead Ceiling Fixture / Source Aperture (Centered & Crisp) */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[340px] sm:w-[520px] h-[50px] bg-white/30 rounded-full blur-xl" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[180px] sm:w-[280px] h-[12px] bg-white/40 rounded-full blur-sm" />

      {/* 2. Symmetrical Conical Light Beam (Photorealistic Studio Cone) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] sm:w-[1050px] h-[780px]"
        style={{
          clipPath: "polygon(36% 0%, 64% 0%, 92% 100%, 8% 100%)",
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.05) 45%, rgba(255, 255, 255, 0.01) 75%, transparent 100%)",
          filter: "blur(36px)",
        }}
      />

      {/* 3. Smooth Radial Core Glow directly illuminating the Motto & Head */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[600px]"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 12%, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.04) 45%, transparent 75%)",
          filter: "blur(20px)",
        }}
      />

      {/* 4. Soft Stage Atmosphere behind the 3D Robot (Symmetrical & Subdued) */}
      <div
        className="absolute top-[42%] left-1/2 -translate-x-1/2 w-[500px] sm:w-[750px] h-[350px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.035) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
};

export default Spotlight;
