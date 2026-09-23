"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

export interface MagicTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  progress?: MotionValue<number>;
}

interface WordProps {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  wordClassName?: string;
}

const Word: React.FC<WordProps> = ({ children, progress, range, wordClassName }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mx-1.5 sm:mx-2.5 my-1 text-white font-medium transition-opacity ${wordClassName ?? ""}`}
    >
      {children}
    </motion.span>
  );
};

export const MagicText: React.FC<MagicTextProps> = ({
  text,
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
  const words = text.trim().split(/\s+/);

  return (
    <div
      ref={containerRef}
      className={`relative z-10 w-full max-w-4xl mx-auto px-6 select-none ${className}`}
    >
      <p className="flex flex-wrap justify-center items-center text-center font-hn leading-relaxed tracking-tight">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = Math.min(1, start + 1 / words.length);
          return (
            <Word
              key={`${word}-${i}`}
              progress={activeProgress}
              range={[start, end]}
              wordClassName={wordClassName}
            >
              {word}
            </Word>
          );
        })}
      </p>
    </div>
  );
};

export default MagicText;
