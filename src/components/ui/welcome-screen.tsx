import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UniqueLoading from './morph-loading';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  // Step 1: UniqueLoading morphing animation on obsidian black
  // Step 2: Minimal white canvas with "ยินดีต้อนรับสู่" + "Kantapon Web Portfolio"
  // Step 'done': Smooth fade-out before unmounting
  const [step, setStep] = useState<1 | 2 | 'done'>(1);
  const timer1Ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timer2Ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finishTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFinish = useCallback(() => {
    if (timer1Ref.current) clearTimeout(timer1Ref.current);
    if (timer2Ref.current) clearTimeout(timer2Ref.current);
    if (step === 'done') return;

    setStep('done');
    // Allow the 600ms exit fade animation to complete cleanly before unmounting
    finishTimeoutRef.current = setTimeout(() => {
      onComplete();
    }, 600);
  }, [step, onComplete]);

  useEffect(() => {
    // Step 1 -> Step 2 after smooth morph animation (2.4s)
    timer1Ref.current = setTimeout(() => {
      setStep(2);
    }, 2400);

    // Step 2 -> Finish after comfortable reading time (2.3s after step 2, total ~4.7s)
    timer2Ref.current = setTimeout(() => {
      handleFinish();
    }, 4700);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (timer1Ref.current) clearTimeout(timer1Ref.current);
      if (timer2Ref.current) clearTimeout(timer2Ref.current);
      if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleFinish]);

  return (
    <AnimatePresence>
      {step !== 'done' && (
        <motion.div
          key="welcome-overlay-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleFinish}
          className={`fixed inset-0 z-[100] flex items-center justify-center select-none overflow-hidden cursor-pointer transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            step === 2 ? 'bg-white text-black' : 'bg-[#09090b] text-white'
          }`}
          style={{ willChange: 'opacity' }}
        >
          {/* Subtle Minimal Skip Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleFinish();
            }}
            className={`absolute top-5 right-5 sm:top-6 sm:right-8 z-30 px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-widest uppercase transition-all duration-300 border ${
              step === 2
                ? 'text-neutral-600 border-neutral-300 hover:text-black hover:bg-neutral-100'
                : 'text-neutral-400 border-white/15 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Skip introduction"
          >
            Skip [ESC]
          </button>

          {/* Smooth Step Transitions */}
          <AnimatePresence mode="wait">
            {/* ==============================================================
                STEP 1: UniqueLoading Morph Animation on Deep Obsidian
                ============================================================== */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-20 flex w-full h-screen flex-col justify-center items-center gap-10 px-6"
              >
                <UniqueLoading variant="morph" size="lg" className="w-32 h-32" />
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.45 }}
                  className="flex items-center gap-2.5 text-neutral-400 font-mono text-[11px] tracking-[0.25em] uppercase"
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20 flex flex-col items-center justify-center text-center px-6"
              >
                {/* Thai Welcome Intro */}
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.15 }}
                  className="text-xs sm:text-sm font-medium tracking-wide text-neutral-500 mb-2 font-prompt"
                >
                  ยินดีต้อนรับสู่
                </motion.span>

                {/* Apple Text Reveal Container */}
                <div className="overflow-hidden py-1 px-4">
                  <motion.h1
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{
                      duration: 0.75,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="font-prompt text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-neutral-900"
                  >
                    Kantapon Web Portfolio
                  </motion.h1>
                </div>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mt-3 text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-neutral-400"
                >
                  Computer Engineering &bull; 2026
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
