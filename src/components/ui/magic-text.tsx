"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

export interface MagicTextProps {
  text?: string;
  lines?: string[];
  className?: string;
  wordClassName?: string;
  progress?: MotionValue<number>;
}

interface RevealItemProps {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}

const RevealItem: React.FC<RevealItemProps> = ({ children, progress, range, className }) => {
  // Smooth scroll-driven rise up and illumination
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [48, 0]);
  const scale = useTransform(progress, range, [0.96, 1]);

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
      }}
      className={`block my-2 sm:my-3.5 text-white font-prompt font-normal will-change-transform ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
};

export const MagicText: React.FC<MagicTextProps> = ({
  text,
  lines: customLines,
  className = "",
  wordClassName = "",
  progress: customProgress,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: defaultProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.45"],
  });

  const activeProgress = customProgress || defaultProgress;

  // Determine lines to display: customLines takes priority, otherwise split text by newline or phrase
  const lines =
    customLines ||
    (text
      ? text.includes("\n")
        ? text.split("\n")
        : text.includes("  ")
        ? text.split(/\s{2,}/)
        : text.trim().split(/\s+/)
      : []);

  return (
    <div
      ref={containerRef}
      className={`relative z-10 w-full max-w-4xl mx-auto px-6 select-none ${className}`}
    >
      <div className="flex flex-col items-center justify-center text-center font-prompt leading-[1.5] tracking-normal">
        {lines.map((line, i) => {
          // Spread across 0.08 to 0.72 of total scroll progress
          const totalSpan = 0.64;
          const step = totalSpan / lines.length;
          const start = 0.08 + i * step * 0.85;
          const end = Math.min(0.78, start + step);
          return (
            <RevealItem
              key={`${line}-${i}`}
              progress={activeProgress}
              range={[start, end]}
              className={wordClassName}
            >
              {line}
            </RevealItem>
          );
        })}
      </div>
    </div>
  );
};

export default MagicText;

