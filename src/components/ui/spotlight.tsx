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
      className={`pointer-events-none absolute inset-x-0 top-0 h-full overflow-visible z-[1] ${className}`}
    >
      {/* 1. Ultra-soft top ambient source glow — seamless blend, no sharp cut */}
      <div
        className="absolute -top-32 sm:-top-48 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1100px] h-[360px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 40%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 40%, transparent 75%)",
          filter: "blur(60px)",
        }}
      />

      {/* 2. Conical downward light beam — perfectly smooth continuous gradient falloff */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] sm:w-[1300px] h-[950px] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.02) 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 48% 100% at 50% 0%, black 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 48% 100% at 50% 0%, black 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
          filter: "blur(50px)",
        }}
      />

      {/* 3. Central focus column — soft warm-white vertical beam */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[450px] sm:w-[750px] h-[650px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 45% 70% at 50% 10%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.03) 55%, transparent 80%)",
          filter: "blur(40px)",
        }}
      />

      {/* 4. Stage floor ambient illumination — subtle floor reflection behind robot */}
      <div
        className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[600px] sm:w-[950px] h-[450px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.035) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
};

export default Spotlight;
