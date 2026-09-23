import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
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
  const [clickMessage, setClickMessage] = useState<string | null>(null);

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

  // Track cursor direction relative to mascot head
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const greetings = [
    'สวัสดีครับ! ผมกันตภณ 🚀',
    'ยินดีต้อนรับสู่ Portfolio ครับ ✨',
    'มุ่งมั่นศึกษาต่อ วิศวะคอมฯ 💻',
    'สนใจด้าน Robotics & Deep Learning 🤖',
    '“EVERYTHING IS POSSIBLE.” ทุกสิ่งเป็นไปได้! 💡'
  ];

  const handleMascotClick = () => {
    const random = greetings[Math.floor(Math.random() * greetings.length)];
    setClickMessage(random);
    setTimeout(() => setClickMessage(null), 3500);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleMascotClick}
    >
      {/* Speech Bubble / Greeting Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{
          opacity: isHovered || clickMessage ? 1 : 0.85,
          y: isHovered || clickMessage ? -6 : 0,
          scale: 1,
        }}
        transition={{ duration: 0.2 }}
        className="mb-4 px-4 py-2 rounded-2xl bg-neutral-900 text-white border border-neutral-700/80 shadow-2xl flex items-center gap-2 cursor-pointer text-xs font-mono tracking-wide z-10"
      >
        <Sparkles size={13} className="text-emerald-400 shrink-0 animate-pulse" />
        <span>{clickMessage || 'มาสคอตมองตามเมาส์ได้ 8 ทิศ! (คลิกคุยได้ครับ)'}</span>
      </motion.div>

      {/* Mascot Organic Container */}
      <div className="relative w-[240px] sm:w-[280px] h-[460px] sm:h-[500px] flex items-center justify-center">
        {/* Soft Ambient Backdrop Aura & Ground Shadow */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-sky-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-4 w-3/4 h-6 bg-black/10 dark:bg-black/40 rounded-full blur-md pointer-events-none" />

        {/* Dynamic Sprite Container with Micro-Tilt */}
        <motion.div
          style={{
            rotateZ,
            x: translateX,
            y: translateY,
          }}
          className="relative w-full h-full flex items-center justify-center cursor-pointer"
        >
          <img
            src={SPRITES[direction]}
            alt={`Kantapon Mascot looking ${direction}`}
            className="w-full h-full object-contain pointer-events-none drop-shadow-[0_16px_32px_rgba(0,0,0,0.15)] transition-all duration-75"
          />
        </motion.div>
      </div>

      {/* Signature & Interactive Hint */}
      <div className="mt-3 flex items-center gap-2 text-xs text-neutral-500 font-mono">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>Kantapon — Anime Mascot Signature ({direction.replace('_', ' ')})</span>
      </div>
    </div>
  );
};

export default MascotInteractive;
