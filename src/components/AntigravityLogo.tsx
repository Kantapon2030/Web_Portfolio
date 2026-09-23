import React from 'react';

interface AntigravityLogoProps {
  className?: string;
  size?: number;
}

export const AntigravityLogo: React.FC<AntigravityLogoProps> = ({
  className = '',
  size = 140
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Core Glowing Gradients */}
        <linearGradient id="agGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>

        <linearGradient id="agGradFacetLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.75" />
        </linearGradient>

        <linearGradient id="agGradFacetRight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.8" />
        </linearGradient>

        <linearGradient id="agGradFacetBottom" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.8" />
        </linearGradient>

        <radialGradient id="agCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#67e8f9" stopOpacity="1" />
          <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.6" />
          <stop offset="80%" stopColor="#818cf8" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>

        {/* Dynamic Glow Filter */}
        <filter id="agGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer Levitating Gravitational Energy Field */}
      <circle cx="80" cy="80" r="55" fill="url(#agCoreGlow)" className="animate-pulse" opacity="0.7" />

      {/* Floating Orbital Energy Ring */}
      <ellipse
        cx="80"
        cy="80"
        rx="68"
        ry="24"
        transform="rotate(-25 80 80)"
        stroke="url(#agGradPrimary)"
        strokeWidth="1.8"
        strokeDasharray="8 5 3 5"
        filter="url(#agGlow)"
        opacity="0.85"
      />

      {/* Counter Orbital Ring */}
      <ellipse
        cx="80"
        cy="80"
        rx="62"
        ry="20"
        transform="rotate(35 80 80)"
        stroke="#38bdf8"
        strokeWidth="1.2"
        strokeDasharray="14 8"
        opacity="0.6"
      />

      {/* The Central Iconic Antigravity Prism / Inverted Levitating Delta */}
      <g filter="url(#agGlow)">
        {/* Facet Top / Back */}
        <polygon
          points="80,24 126,56 80,74 34,56"
          fill="url(#agGradPrimary)"
          opacity="0.9"
        />

        {/* Facet Left Front */}
        <polygon
          points="34,56 80,74 80,136"
          fill="url(#agGradFacetLeft)"
        />

        {/* Facet Right Front */}
        <polygon
          points="126,56 80,74 80,136"
          fill="url(#agGradFacetRight)"
        />

        {/* Inner Refractive Crystal Edges */}
        <line x1="80" y1="24" x2="80" y2="74" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.8" />
        <line x1="34" y1="56" x2="80" y2="74" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.6" />
        <line x1="126" y1="56" x2="80" y2="74" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.7" />
        <line x1="80" y1="74" x2="80" y2="136" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.9" />

        {/* Outer Prism Rim */}
        <polygon
          points="80,24 126,56 80,136 34,56"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeOpacity="0.5"
        />

        {/* Center Quantum Singularity Core Dot */}
        <circle cx="80" cy="74" r="3.5" fill="#ffffff" filter="url(#agGlow)" />
      </g>
    </svg>
  );
};

export default AntigravityLogo;
