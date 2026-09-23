import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Diamond } from './diamond';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  // Step 1: โลโก้หมุน พื้นหลังสีดำทั้งหน้า
  // Step 2: ตัวอักษร welcome แบบมินิมอล ให้เต็มหน้า (พื้นหลังสีดำ)
  // Step 3: เปลี่ยนพื้นหลังเป็นสีขาว เขียนว่า Kantapon Web Portfolio
  const [step, setStep] = useState<1 | 2 | 3 | 'done'>(1);

  useEffect(() => {
    // Step 1 -> Step 2 after 1.4s
    const timer1 = setTimeout(() => {
      setStep(2);
    }, 1400);

    // Step 2 -> Step 3 after another 1.6s (total 3.0s)
    const timer2 = setTimeout(() => {
      setStep(3);
    }, 3100);

    // Step 3 -> Finish after another 1.8s (total 4.9s)
    const timer3 = setTimeout(() => {
      handleFinish();
    }, 5000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleFinish = () => {
    setStep('done');
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  return (
    <AnimatePresence>
      {step !== 'done' && (
        <motion.div
          key="welcome-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className={`fixed inset-0 z-[100] flex items-center justify-center select-none overflow-hidden transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            step === 3 ? 'bg-white text-black' : 'bg-black text-white'
          }`}
        >
          {/* Subtle Minimal Skip Indicator */}
          <button
            onClick={handleFinish}
            className={`absolute top-6 right-8 z-20 text-[11px] font-mono tracking-widest uppercase transition-opacity duration-300 hover:opacity-100 ${
              step === 3
                ? 'text-neutral-500 hover:text-black'
                : 'text-neutral-500 hover:text-white'
            }`}
          >
            Skip [ESC]
          </button>

          {/* ==============================================================
              STEP 1: โลโก้หมุน พื้นหลังสีดำทั้งหน้า
              ============================================================== */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center gap-6"
            >
              {/* Spinning Logo Container */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-white"
              >
                <Diamond className="w-full h-full text-white" />
              </motion.div>
            </motion.div>
          )}

          {/* ==============================================================
              STEP 2: ขึ้นตัวอักษร welcome แบบมินิมอล ให้เต็มหน้า (พื้นหลังสีดำ)
              ============================================================== */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="w-full px-6 flex items-center justify-center overflow-hidden"
            >
              <h1 className="font-hn font-light text-[18vw] sm:text-[19vw] lg:text-[20vw] leading-none tracking-tighter text-white uppercase text-center select-none">
                welcome
              </h1>
            </motion.div>
          )}

          {/* ==============================================================
              STEP 3: เปลี่ยนพื้นหลังเป็นสีขาว เขียนว่า Kantapon Web Portfolio
              ============================================================== */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center text-center px-6"
            >
              {/* Apple Text Reveal Motion Container */}
              <div className="overflow-hidden py-2 px-4">
                <motion.h1
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="font-hn text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-neutral-900"
                >
                  Kantapon Web Portfolio
                </motion.h1>
              </div>

              {/* Minimal Clean Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="mt-3 text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-neutral-500"
              >
                Computer Engineering &bull; 2025
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
