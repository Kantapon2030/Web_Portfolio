import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

import mascotCenter from '../assets/mascot_center.png';
import mascotUp from '../assets/mascot_up.png';
import mascotDown from '../assets/mascot_down.png';
import mascotLeft from '../assets/mascot_left.png';
import mascotRight from '../assets/mascot_right.png';
import mascotUpLeft from '../assets/mascot_up_left.png';
import mascotUpRight from '../assets/mascot_up_right.png';
import mascotDownLeft from '../assets/mascot_down_left.png';
import mascotDownRight from '../assets/mascot_down_right.png';

type Direction =
  | 'center'
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'up_left'
  | 'up_right'
  | 'down_left'
  | 'down_right';

const SPRITES: Record<Direction, string> = {
  center: mascotCenter,
  up: mascotUp,
  down: mascotDown,
  left: mascotRight, // mascot_right.png looks to viewer's Left (toward left cursor)
  right: mascotLeft, // mascot_left.png looks to viewer's Right (toward right cursor)
  up_left: mascotUpLeft, // mascot_up_left.png looks to viewer's Up-Left (toward up-left cursor)
  up_right: mascotUpRight, // mascot_up_right.png looks to viewer's Up-Right (toward up-right cursor)
  down_left: mascotDownLeft, // mascot_down_left.png looks to viewer's Down-Left
  down_right: mascotDownRight, // mascot_down_right.png looks to viewer's Down-Right
};

export const MascotInteractive: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<Direction>('center');
  const [isHovered, setIsHovered] = useState(false);

  // Springs for subtle tilt & micro-motion
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 180, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateZ = useTransform(smoothX, [-1, 1], [-4, 4]);
  const translateX = useTransform(smoothX, [-1, 1], [-6, 6]);
  const translateY = useTransform(smoothY, [-1, 1], [-4, 4]);

  // Preload all 9 images on mount
  useEffect(() => {
    Object.values(SPRITES).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Track cursor direction relative to mascot head (Throttled with rAF & IntersectionObserver)
  useEffect(() => {
    let animationFrameId: number | null = null;
    let isVisible = true;

    // Disconnect tracking when mascot is scrolled out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible || !containerRef.current) return;
      if (animationFrameId !== null) return; // Only run once per screen refresh frame

      animationFrameId = requestAnimationFrame(() => {
        animationFrameId = null;
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height * 0.32; // Mascot eyes / head center

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.hypot(dx, dy);

        // Normalized coordinates for subtle spring tilt
        const maxDistX = Math.max(window.innerWidth / 2, 400);
        const maxDistY = Math.max(window.innerHeight / 2, 400);
        mouseX.set(Math.max(-1, Math.min(1, dx / maxDistX)));
        mouseY.set(Math.max(-1, Math.min(1, dy / maxDistY)));

        // 9-Directional sprite selection based on angle & deadzone
        if (dist < 75) {
          setDirection('center');
        } else {
          const angle = Math.atan2(dy, dx) * (180 / Math.PI); // -180 to 180
          if (angle >= -22.5 && angle < 22.5) {
            setDirection('right');
          } else if (angle >= 22.5 && angle < 67.5) {
            setDirection('down_right');
          } else if (angle >= 67.5 && angle < 112.5) {
            setDirection('down');
          } else if (angle >= 112.5 && angle < 157.5) {
            setDirection('down_left');
          } else if (angle >= -67.5 && angle < -22.5) {
            setDirection('up_right');
          } else if (angle >= -112.5 && angle < -67.5) {
            setDirection('up');
          } else if (angle >= -157.5 && angle < -112.5) {
            setDirection('up_left');
          } else {
            setDirection('left');
          }
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [mouseX, mouseY]);

  const [isBouncing, setIsBouncing] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleMascotClick = () => {
    setClickCount((prev) => prev + 1);
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 550);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center select-none cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleMascotClick}
      title="คลิกเพื่อทักทายมาสคอต"
    >
      {/* Mascot Organic Container — Scaled down by ~12-15% for cleaner minimal proportion */}
      <div className="relative w-[210px] sm:w-[245px] h-[390px] sm:h-[420px] flex items-center justify-center">
        {/* Soft Ambient Backdrop Aura & Ground Shadow */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-sky-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-3 w-3/4 h-5 bg-black/10 dark:bg-black/40 rounded-full blur-md pointer-events-none" />

        {/* Dynamic Sprite Container with Micro-Tilt & Click Reaction */}
        <motion.div
          style={{
            rotateZ,
            x: translateX,
            y: translateY,
          }}
          animate={
            isBouncing
              ? {
                  scale: [1, 1.15, 0.95, 1.04, 1],
                  y: [0, -12, 2, -4, 0],
                  rotate: clickCount % 2 === 0 ? [0, -4, 4, 0] : [0, 4, -4, 0],
                  transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
                }
              : isHovered
              ? { scale: 1.04, transition: { duration: 0.2 } }
              : { scale: 1 }
          }
          className="relative w-full h-full flex items-center justify-center"
        >
          <img
            src={SPRITES[direction]}
            alt={`Kantapon Mascot looking ${direction}`}
            decoding="async"
            className="w-full h-full object-contain pointer-events-none drop-shadow-[0_16px_32px_rgba(0,0,0,0.15)] transition-all duration-75"
          />
        </motion.div>
      </div>

      {/* Minimal Signature Tag (No Speech Text) */}
      <div className="mt-2 flex items-center gap-2 text-xs text-neutral-400 font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span className="tracking-wide">Kantapon Signature Mascot</span>
      </div>
    </div>
  );
};

export default MascotInteractive;
