import React from "react";

type SpotlightProps = {
  className?: string;
  fill?: string;
};

export const Spotlight: React.FC<SpotlightProps> = ({
  className = "",
  fill = "white"
}) => {
  return (
    <div className={`pointer-events-none absolute inset-x-0 -top-40 h-[1000px] flex items-center justify-center overflow-visible z-[1] ${className}`}>
      {/* Infinite Ethereal Spotlight Beam with soft radial diffusion (no hard boundaries) */}
      <div className="absolute top-0 w-[900px] h-[650px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-neutral-100/5 to-transparent blur-3xl pointer-events-none" />
      
      {/* Radiant Top Aperture Glow */}
      <div className="absolute top-0 w-[450px] h-[350px] bg-gradient-to-b from-white/25 via-white/10 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* SVG Angled Ambient Light Flare with non-clipping filter bounds */}
      <svg
        className="w-[1200px] h-[900px] opacity-75 pointer-events-none -mt-20 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_0%,rgba(0,0,0,0.8)_60%,transparent_100%)]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3787 2842"
        fill="none"
      >
        <g filter="url(#spotlight-filter-infinite)">
          <ellipse
            cx="1924.71"
            cy="273.501"
            rx="1924.71"
            ry="273.501"
            transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
            fill={fill}
            fillOpacity="0.22"
          />
        </g>
        <defs>
          <filter
            id="spotlight-filter-infinite"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="180"
              result="effect1_foregroundBlur_infinite"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Spotlight;
