"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Compass, ArrowUpRight } from 'lucide-react';

export interface NavItem {
  name: string;
  href: string;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { name: 'About Me', href: '#about' },
  { name: 'Motto & 3D', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Competitions', href: '#competitions' },
  { name: 'Leadership', href: '#leadership' },
  { name: 'Honors', href: '#awards' },
  { name: 'Contact', href: '#contact' },
];

interface AnimatedNavFramerProps {
  items?: NavItem[];
  brandName?: string;
  onIntroClick?: () => void;
  className?: string;
}

export const AnimatedNavFramer: React.FC<AnimatedNavFramerProps> = ({
  items = DEFAULT_NAV_ITEMS,
  brandName = 'Kantapon',
  onIntroClick,
  className = '',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      if (scrollPos > 120) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setIsExpanded(false); // Reset to full navbar at top
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When scrolled down, user can toggle expansion; when at top, it is always open
  const showFullMenu = !isScrolled || isExpanded;

  return (
    <header className={`fixed top-4 inset-x-0 z-50 flex justify-center pointer-events-none px-4 ${className}`}>
      <motion.nav
        layout
        transition={{
          type: 'spring',
          stiffness: 380,
          damping: 30,
          mass: 0.8,
        }}
        className={`pointer-events-auto relative flex items-center shadow-2xl backdrop-blur-xl border border-white/10 transition-colors duration-300 ${
          showFullMenu
            ? 'w-full max-w-5xl rounded-full bg-black/60 px-5 py-2.5 sm:px-7 sm:py-3 text-white'
            : 'rounded-full bg-black/80 px-3.5 py-3.5 text-white hover:bg-neutral-900 border-white/20 hover:scale-105 active:scale-95 cursor-pointer'
        }`}
        onClick={() => {
          if (!showFullMenu) {
            setIsExpanded(true);
          }
        }}
        title={!showFullMenu ? 'Click the circle to expand it back' : undefined}
      >
        <AnimatePresence mode="wait">
          {!showFullMenu ? (
            /* COLLAPSED FLOATING CIRCLE STATE */
            <motion.div
              key="collapsed-circle"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 select-none group"
            >
              <div className="relative flex items-center justify-center w-7 h-7">
                <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping pointer-events-none" />
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-400/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Compass size={14} className="group-hover:rotate-45 transition-transform duration-300" />
                </div>
              </div>
              <span className="hidden sm:inline text-xs font-mono tracking-wider text-neutral-300 pr-1">
                Menu
              </span>
            </motion.div>
          ) : (
            /* EXPANDED FULL NAVBAR STATE */
            <motion.div
              key="expanded-navbar"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-between w-full gap-3 sm:gap-6"
            >
              {/* Brand / Logo */}
              <div className="flex items-center gap-2.5 shrink-0">
                <a
                  href="#hero"
                  onClick={() => setIsExpanded(false)}
                  className="font-hn text-base sm:text-lg font-medium tracking-tight text-white hover:text-emerald-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  {brandName}
                </a>
                <span className="text-[11px] font-mono text-neutral-400 hidden md:inline border-l border-neutral-700/80 pl-2.5">
                  กันตภณ วงศ์พรต
                </span>
              </div>

              {/* Navigation Links */}
              <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                {items.map((item) => {
                  const isActive = activeItem === item.href;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => {
                        setActiveItem(item.href);
                        if (isScrolled) setIsExpanded(false);
                      }}
                      className={`relative px-3 py-1.5 rounded-full text-xs font-normal transition-all duration-200 ${
                        isActive
                          ? 'text-white font-medium bg-white/10 shadow-sm'
                          : 'text-neutral-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.name}
                    </a>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto lg:ml-0">
                {onIntroClick && (
                  <button
                    onClick={() => {
                      onIntroClick();
                      if (isScrolled) setIsExpanded(false);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-[11px] font-mono text-neutral-300 hover:text-white transition-all shadow-sm"
                    title="ดูหน้าต้อนรับ (Welcome Screen)"
                  >
                    <Sparkles size={11} className="text-emerald-400 shrink-0" />
                    <span>Intro</span>
                  </button>
                )}

                <div className="hidden sm:flex items-center gap-2 border-l border-neutral-700/80 pl-3 text-xs font-mono">
                  <a
                    href="https://github.com/Kantapon2030/Web_Portfolio"
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors flex items-center gap-0.5"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight size={10} className="opacity-70" />
                  </a>
                </div>

                {/* Close Button when manually expanded while scrolled */}
                {isScrolled && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(false);
                    }}
                    className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
                    title="ย่อแถบเมนู (Collapse)"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

export default AnimatedNavFramer;
