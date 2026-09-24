import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

import mascotCenter from '../assets/mascot_center.png';
import mascotUp from '../assets/mascot_up.png';
import mascotDown from '../assets/mascot_down.png';
import mascotLeft from '../assets/mascot_left.png';
import mascotRight from '../assets/mascot_right.png';
import mascotUpLeft from '../assets/mascot_up_left.png';
import mascotUpRight from '../assets/mascot_up_right.png';
import mascotDownLeft from '../assets/mascot_down_left.png';
import mascotDownRight from '../assets/mascot_down_right.png';
import guideMascot from '../assets/guide_mascot_tight.png';
import miniMascot from '../assets/mini_mascot.png';

export type MascotPose =
  | 'center'
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'up_left'
  | 'up_right'
  | 'down_left'
  | 'down_right'
  | 'guide'
  | 'mini';

const POSE_IMAGES: Record<MascotPose, string> = {
  center: mascotCenter,
  up: mascotUp,
  down: mascotDown,
  left: mascotRight, // Note: mascot_right sprite gazes toward viewer's left
  right: mascotLeft, // mascot_left sprite gazes toward viewer's right
  up_left: mascotUpLeft,
  up_right: mascotUpRight,
  down_left: mascotDownLeft,
  down_right: mascotDownRight,
  guide: guideMascot,
  mini: miniMascot,
};

interface CornerMascotProps {
  pose?: MascotPose;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  idleAnimation?: 'float' | 'peek' | 'wave' | 'nod' | 'none';
  showShadow?: boolean;
  interactive?: boolean;
  alt?: string;
  onClick?: () => void;
}

const SIZE_MAP: Record<NonNullable<CornerMascotProps['size']>, string> = {
  xs: 'w-8 h-auto sm:w-10',
  sm: 'w-11 h-auto sm:w-14',
  md: 'w-14 h-auto sm:w-18',
  lg: 'w-20 h-auto sm:w-24',
  xl: 'w-24 h-auto sm:w-32',
};

export const CornerMascot: React.FC<CornerMascotProps> = ({
  pose = 'center',
  size = 'md',
  className = '',
  idleAnimation = 'float',
  showShadow = true,
  interactive = true,
  alt = 'Tanwa Mascot',
  onClick,
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [isBouncing, setIsBouncing] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  // On touch devices, skip Framer Motion infinite animation loops entirely
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const imgSrc = POSE_IMAGES[pose] || POSE_IMAGES.center;

  // Idle movement variant
  const getIdleAnimation = () => {
    switch (idleAnimation) {
      case 'peek':
        return {
          y: [0, -6, 0],
          transition: { repeat: Infinity, duration: 3.2, ease: 'easeInOut' as const },
        };
      case 'wave':
        return {
          rotate: [0, -4, 4, 0],
          y: [0, -4, 0],
          transition: { repeat: Infinity, duration: 2.8, ease: 'easeInOut' as const },
        };
      case 'nod':
        return {
          rotate: [-1, 2, -1],
          transition: { repeat: Infinity, duration: 2.4, ease: 'easeInOut' as const },
        };
      case 'float':
        return {
          y: [0, -5, 0],
          transition: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' as const },
        };
      case 'none':
      default:
        return {};
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setClickCount((prev) => prev + 1);
    setIsBouncing(true);
    setShowSparkles(true);

    if (onClick) onClick();

    setTimeout(() => setIsBouncing(false), 600);
    setTimeout(() => setShowSparkles(false), 1200);
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${
        interactive ? 'cursor-pointer' : 'pointer-events-none'
      } ${className}`}
      onClick={interactive ? handleClick : undefined}
    >
      {/* Tap Sparkle Particles Effect — Skip on touch for performance */}
      {!isTouchDevice && (
        <AnimatePresence>
        {showSparkles && (
          <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
            {/* Top sparkle */}
            <motion.div
              initial={{ scale: 0, y: 0, opacity: 1 }}
              animate={{ scale: [0, 1.2, 0], y: -26, x: 8, opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="absolute"
            >
              <Sparkles size={16} className="text-amber-400 drop-shadow-sm" />
            </motion.div>
            {/* Left sparkle */}
            <motion.div
              initial={{ scale: 0, y: 0, opacity: 1 }}
              animate={{ scale: [0, 1, 0], y: -16, x: -20, opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
              className="absolute"
            >
              <Sparkles size={12} className="text-indigo-400 drop-shadow-sm" />
            </motion.div>
            {/* Right sparkle */}
            <motion.div
              initial={{ scale: 0, y: 0, opacity: 1 }}
              animate={{ scale: [0, 1.1, 0], y: -8, x: 22, opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, delay: 0.12, ease: 'easeOut' }}
              className="absolute"
            >
              <Sparkles size={14} className="text-emerald-400 drop-shadow-sm" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      )}

      {/* Mascot Animated Body */}
      <motion.div
        animate={
          isBouncing
            ? {
                scale: [1, 1.22, 0.95, 1.05, 1],
                y: [0, -14, 2, -4, 0],
                rotate: clickCount % 2 === 0 ? [0, -8, 6, -3, 0] : [0, 8, -6, 3, 0],
                transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] },
              }
            : isTouchDevice
            ? {} // No idle animation on touch devices — saves per-frame JS work
            : getIdleAnimation()
        }
        whileHover={
          !isTouchDevice && interactive && !isBouncing
            ? {
                scale: 1.1,
                y: -6,
                rotate: pose.includes('left') ? -3 : pose.includes('right') ? 3 : 2,
                transition: { type: 'spring', stiffness: 400, damping: 14 },
              }
            : undefined
        }
        whileTap={interactive ? { scale: 0.92 } : undefined}
        className="relative flex items-center justify-center"
      >
        <img
          src={imgSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`${SIZE_MAP[size]} object-contain`}
        />

        {/* Ambient bottom shadow under feet/base if enabled */}
        {showShadow && (
          <div
            aria-hidden="true"
            className="absolute -bottom-1 inset-x-2 h-2 bg-black/10 rounded-full blur-[3px] pointer-events-none -z-10"
          />
        )}
      </motion.div>
    </div>
  );
};

export default CornerMascot;
