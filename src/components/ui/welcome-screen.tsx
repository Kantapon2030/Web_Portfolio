import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UniqueLoading from './morph-loading';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  // Step 1: UniqueLoading morphing animation on dark background
  // Step 2: Transition to clean white background: "ยินดีต้อนรับสู่" + "Kantapon Web Portfolio"
  const [step, setStep] = useState<1 | 2>(1);
  const timer1Ref = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const timer2Ref = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFinish = React.useCallback(() => {
    if (timer1Ref.current) clearTimeout(timer1Ref.current);
    if (timer2Ref.current) clearTimeout(timer2Ref.current);
    // Let the outer AnimatePresence in App.tsx handle exit animation
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Step 1 -> Step 2 after morph animation (~2.6s)
    timer1Ref.current = setTimeout(() => {
      setStep(2);
    }, 2600);

    // Step 2 -> Finish after another 2.0s (total ~4.6s)
    timer2Ref.current = setTimeout(() => {
      handleFinish();
    }, 4600);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (timer1Ref.current) clearTimeout(timer1Ref.current);
      if (timer2Ref.current) clearTimeout(timer2Ref.current);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleFinish]);

  return (
    <motion.div
      key="welcome-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-0 z-[100] flex items-center justify-center select-none overflow-hidden transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        step === 2 ? 'bg-white text-black' : 'bg-black text-white'
      }`}
      style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
    >
      {/* Subtle Minimal Skip Indicator */}
      <button
        onClick={handleFinish}
        className={`absolute top-6 right-8 z-20 text-[11px] font-mono tracking-widest uppercase transition-opacity duration-300 hover:opacity-100 ${
          step === 2
            ? 'text-neutral-500 hover:text-black'
            : 'text-neutral-500 hover:text-white'
        }`}
      >
        Skip [ESC]
      </button>

      {/* Touch tap anywhere to skip */}
      <div
        className="absolute inset-0 z-10"
        onClick={handleFinish}
        aria-hidden="true"
      />

      {/* Step content transitions */}
      <AnimatePresence mode="wait">
        {/* ==============================================================
            STEP 1: UniqueLoading Morph Animation on Deep Black
            ============================================================== */}
        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="relative z-20 flex w-full h-screen flex-col justify-center items-center gap-10 px-6"
          >
            <UniqueLoading variant="morph" size="lg" className="w-32 h-32" />
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="flex items-center gap-2 text-neutral-400 font-mono text-[11px] tracking-[0.25em] uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LOADING EXPERIENCE</span>
            </motion.div>
          </motion.div>
        )}

        {/* ==============================================================
            STEP 2: Minimal White Canvas with "ยินดีต้อนรับสู่" + "Kantapon Web Portfolio"
            ============================================================== */}
        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 flex flex-col items-center justify-center text-center px-6"
          >
            {/* Thai Welcome Small Intro Text */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-xs sm:text-sm font-medium tracking-wide text-neutral-500 mb-2 font-hn"
            >
              ยินดีต้อนรับสู่
            </motion.span>

            {/* Apple Text Reveal Motion Container */}
            <div className="overflow-hidden py-1 px-4">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="font-hn text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-neutral-900"
              >
                Kantapon Web Portfolio
              </motion.h1>
            </div>

            {/* Minimal Clean Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-3 text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-neutral-400"
            >
              Computer Engineering &bull; 2026
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WelcomeScreen;
