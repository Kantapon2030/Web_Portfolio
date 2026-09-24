import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Award,
  X,
  CheckCircle2,
  Camera,
  Maximize2,
  ArrowDown,
} from 'lucide-react';
import { CAMPS_DATA, CampItem } from '../campData';
import { CornerMascot } from './CornerMascot';

interface MediaItem {
  url: string;
  caption: string;
  tag: string;
  isCertificate: boolean;
  id: string;
}

export const CampShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = slide next (right-to-left), -1 = prev
  const [isPaused, setIsPaused] = useState(false);
  const [isCampExpanded, setIsCampExpanded] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isCampInView, setIsCampInView] = useState(false);

  const runwayRef = useRef<HTMLDivElement>(null);
  const campContainerRef = useRef<HTMLDivElement>(null);
  const currentCamp: CampItem = CAMPS_DATA[currentIndex];

  // Combined media list for current camp (Activity photos + Official Certificate)
  const allMedia: MediaItem[] = useMemo(() => {
    return [
      ...currentCamp.galleryPhotos.map((p, idx) => ({
        url: p.url,
        caption: p.caption,
        tag: p.tag,
        isCertificate: false,
        id: `photo-${idx}`,
      })),
      {
        url: currentCamp.certificateImg,
        caption: currentCamp.certificateCaption,
        tag: 'OFFICIAL CERTIFICATE',
        isCertificate: true,
        id: 'cert',
      },
    ];
  }, [currentCamp]);

  // Reset active photo index when camp changes
  useEffect(() => {
    setActivePhotoIdx(0);
  }, [currentIndex]);

  // Scroll animations for the giant "CAMP" background runway
  const { scrollYProgress: runwayProgress } = useScroll({
    target: runwayRef,
    offset: ['start end', 'end start'],
  });

  const campTextX = useTransform(runwayProgress, [0, 1], [-80, 80]);
  const campTextOpacity = useTransform(runwayProgress, [0.1, 0.4, 0.7, 0.95], [0.3, 1, 1, 0.3]);
  const campScale = useTransform(runwayProgress, [0.1, 0.5], [0.94, 1.02]);

  // Track if Camp section is actively visible in viewport
  useEffect(() => {
    const el = campContainerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCampInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Navigate to next camp (right-to-left)
  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % CAMPS_DATA.length);
  }, []);

  // Navigate to previous camp (left-to-right)
  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + CAMPS_DATA.length) % CAMPS_DATA.length);
  }, []);

  const goToSlide = (idx: number) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Keyboard navigation when lightbox is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') {
        setLightboxOpen(false);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % allMedia.length);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, allMedia.length]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [lightboxOpen]);

  // Slide transition variants (smooth slide right/left)
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.28,
        ease: [0.7, 0, 0.84, 0] as const,
      },
    }),
  };

  const openLightboxAt = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const activePhoto = allMedia[activePhotoIdx] || allMedia[0];

  return (
    <div
      id="camps"
      ref={campContainerRef}
      style={{ overflowAnchor: 'none' }}
      className="relative w-full bg-[#faf9f6] text-neutral-900 select-none overflow-hidden"
    >
      {/* =========================================================================
          SECTION: SCROLL DOWN RUNWAY WITH GIANT ANIMATED "CAMP" TYPOGRAPHY
          ========================================================================= */}
      <section
        ref={runwayRef}
        style={{ overflowAnchor: 'none' }}
        className="w-full bg-[#faf9f6] text-neutral-900 py-10 sm:py-16 px-4 sm:px-8 flex flex-col items-center justify-center relative overflow-hidden select-none"
      >
        <div className="max-w-3xl w-full flex flex-col items-center text-center relative z-10">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <span>04 // ACADEMIC CAMPS &amp; WORKSHOPS</span>
          </div>

          {/* Giant Animated "CAMP" Typography */}
          <div className="w-full overflow-hidden py-3 sm:py-4">
            <motion.h2
              style={{
                x: campTextX,
                opacity: campTextOpacity,
                scale: campScale,
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
              }}
              className="font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter uppercase leading-none text-neutral-900 select-none"
            >
              <span className="text-indigo-600">C</span>AMP
            </motion.h2>
          </div>

          {/* Section Subtitle */}
          <p className="text-neutral-500 font-prompt text-xs sm:text-sm font-light tracking-wide max-w-lg mx-auto mb-3">
            ประสบการณ์การเรียนรู้เชิงปฏิบัติการ ค่ายวิชาการ และเวทีประชันไอเดียในระดับชั้นมัธยมศึกษา
          </p>

          {/* Scroll Down Guide Prompt */}
          <div className="mt-2 sm:mt-3 flex flex-col items-center gap-2 text-xs sm:text-sm font-mono text-neutral-500">
            <span className="tracking-widest uppercase text-neutral-400">
              SCROLL DOWN TO EXPLORE
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-7 h-7 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-indigo-600 shadow-xs"
            >
              <ArrowDown size={14} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN CAMP SHOWCASE SECTION (MODERATE-SIZED BOX WITH PHOTO & EXPANDABLE DETAILS)
          ========================================================================= */}
      <section
        style={{ overflowAnchor: 'none' }}
        className="w-full bg-[#faf9f6] text-neutral-900 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl mx-auto" style={{ overflowAnchor: 'none' }}>
          {/* Top Control Toolbar: Index Tag, Auto-Advance indicator, Pagination Dots & Arrows */}
          <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-indigo-600 tracking-wider">
                {currentCamp.indexTag}
              </span>
              <span className="text-neutral-300">|</span>
              <span className="text-xs font-mono text-neutral-500">
                {isPaused || lightboxOpen || !isCampInView || isCampExpanded
                  ? '⏸ หยุดชั่วคราว (Hovered)'
                  : '▶ เลื่อนอัตโนมัติทุก 10 วิ'}
              </span>
            </div>

            {/* Navigation Buttons & Progress Dots */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              {/* Pagination Dots */}
              <div className="flex items-center gap-1.5 mr-2">
                {CAMPS_DATA.map((c, idx) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    className="p-1 touch-manipulation group flex items-center justify-center focus-visible:outline-none"
                    title={`ไปที่ ${c.title}`}
                    aria-label={`Slide ${idx + 1}`}
                  >
                    <span
                      className={`h-2 rounded-full transition-all duration-300 block ${
                        idx === currentIndex
                          ? 'w-7 bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.5)]'
                          : 'w-2 bg-neutral-200 group-hover:bg-neutral-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={goToPrev}
                  className="w-9 h-9 sm:w-10 sm:h-10 min-w-[36px] min-h-[36px] rounded-full bg-neutral-100 hover:bg-indigo-50 hover:text-indigo-600 border border-neutral-200 flex items-center justify-center text-neutral-700 transition-colors shadow-xs active:scale-95 touch-manipulation"
                  title="ค่ายก่อนหน้า (Previous)"
                  aria-label="Previous camp"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="w-9 h-9 sm:w-10 sm:h-10 min-w-[36px] min-h-[36px] rounded-full bg-neutral-100 hover:bg-indigo-50 hover:text-indigo-600 border border-neutral-200 flex items-center justify-center text-neutral-700 transition-colors shadow-xs active:scale-95 touch-manipulation"
                  title="ค่ายถัดไป (Next)"
                  aria-label="Next camp"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* =========================================================================
              MAIN CARD WRAPPER:
              - Tech Corner Brackets in Indigo Accent
              - 10-Second Linear Progress Bar on Top
              - Photo-Centric Dynamic Presentation
              ========================================================================= */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative p-5 sm:p-7 bg-white rounded-3xl transition-all shadow-sm border border-neutral-200/90 overflow-hidden"
          >
            {/* 10-Second Linear Progress Bar (At Top Edge) */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-neutral-100 overflow-hidden z-20">
              <div
                key={`camp-progress-${currentIndex}`}
                onAnimationEnd={() => {
                  if (!isPaused && !lightboxOpen && isCampInView && !isCampExpanded) {
                    goToNext();
                  }
                }}
                className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 origin-left"
                style={{
                  transformOrigin: '0% 50%',
                  animation: 'camp10sProgress 10s linear forwards',
                  animationPlayState:
                    isPaused || lightboxOpen || !isCampInView || isCampExpanded ? 'paused' : 'running',
                }}
              />
            </div>

            {/* Indigo Corner Frame Accents (Corner Brackets with subtle glow) */}
            {/* Top-Left Corner */}
            <div
              aria-hidden="true"
              className="absolute -top-1 -left-1 w-8 h-8 sm:w-10 sm:h-10 border-t-2 border-l-2 border-indigo-600 rounded-tl-xl shadow-[0_0_12px_rgba(79,70,229,0.35)] pointer-events-none z-10"
            />
            {/* Top-Right Corner */}
            <div
              aria-hidden="true"
              className="absolute -top-1 -right-1 w-8 h-8 sm:w-10 sm:h-10 border-t-2 border-r-2 border-indigo-600 rounded-tr-xl shadow-[0_0_12px_rgba(79,70,229,0.35)] pointer-events-none z-10"
            />
            {/* Bottom-Left Corner Frame Accent */}
            <div
              aria-hidden="true"
              className="absolute -bottom-1 -left-1 w-8 h-8 sm:w-10 sm:h-10 border-b-2 border-l-2 border-indigo-600 rounded-bl-xl shadow-[0_0_12px_rgba(79,70,229,0.35)] pointer-events-none z-10"
            />
            {/* Bottom-Right Corner Frame Accent */}
            <div
              aria-hidden="true"
              className="absolute -bottom-1 -right-1 w-8 h-8 sm:w-10 sm:h-10 border-b-2 border-r-2 border-indigo-600 rounded-br-xl shadow-[0_0_12px_rgba(79,70,229,0.35)] pointer-events-none z-10"
            />

            {/* Bottom-Left Corner Mascot (Stands right in bottom-left corner, zero vertical expansion) */}
            <div className="absolute bottom-1.5 left-2 sm:bottom-2 sm:left-3 z-20 pointer-events-auto">
              <CornerMascot
                pose="up_right"
                size="sm"
                idleAnimation="peek"
                alt="Tanwa Camp Mascot"
              />
            </div>

            {/* Subtle Indigo Ambient Glow behind corners */}
            <div
              aria-hidden="true"
              className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"
            />

            {/* Slide Content with AnimatePresence for Smooth Right-to-Left Gliding + Swipe */}
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentCamp.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragDirectionLock
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  const swipeThreshold = 50;
                  if (info.offset.x < -swipeThreshold) {
                    goToNext();
                  } else if (info.offset.x > swipeThreshold) {
                    goToPrev();
                  }
                }}
                className="w-full cursor-grab active:cursor-grabbing touch-pan-y"
              >
                {/* Section Eyebrow Header */}
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
                    04 // ACADEMIC CAMPS
                  </span>
                  <div className="h-px flex-1 bg-neutral-200" />
                </div>

                {/* Camp Header: Title & Subtitle Only (Name) */}
                <div className="mb-4 sm:mb-5">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 leading-snug">
                    {currentCamp.title}
                  </h2>
                  <p className="text-sm sm:text-base text-indigo-700 font-medium mt-1">
                    {currentCamp.thaiSubtitle}
                  </p>
                </div>

                {/* Featured Visual: 1 Activity Photo Only */}
                <div className="flex flex-col mb-4 sm:mb-5">
                  <div
                    onClick={() => openLightboxAt(0)}
                    className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-xs group cursor-pointer w-full aspect-[16/10] sm:aspect-[16/9] max-h-[380px]"
                    title="คลิกเพื่อขยายดูภาพขนาดเต็ม (Fullscreen Lightbox)"
                  >
                    <motion.img
                      key={`featured-photo-${currentCamp.id}`}
                      src={activePhoto.url}
                      alt={activePhoto.caption}
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      decoding="async"
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.01]"
                    />

                    {/* Tag Badge */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-medium tracking-wide shadow-xs flex items-center gap-1.5 backdrop-blur-md bg-neutral-900/80 text-white">
                        <Camera size={12} className="text-indigo-300" />
                        <span>{activePhoto.tag || 'CAMP PHOTO'}</span>
                      </span>
                    </div>

                    {/* Hover Zoom Hint */}
                    <div className="absolute inset-0 bg-neutral-950/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center z-10">
                      <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-neutral-900 text-xs font-mono font-semibold shadow-lg flex items-center gap-2 backdrop-blur-sm">
                        <Maximize2 size={13} className="text-indigo-600" />
                        <span>คลิกดูขนาดเต็ม</span>
                      </span>
                    </div>

                    {/* Bottom Caption Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white z-10 pointer-events-none">
                      <p className="text-xs sm:text-sm font-medium line-clamp-2 leading-snug drop-shadow-sm">
                        {activePhoto.caption}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-neutral-500 font-mono pl-14 sm:pl-16">
                    <span>ภาพถ่ายกิจกรรมจริง ณ ค่าย</span>
                  </div>
                </div>

                {/* =========================================================================
                    ACTION BAR: CERTIFICATE BUTTON + VIEW DETAILS (RIGHT ALIGNED, ZERO VERTICAL BLOAT)
                    ========================================================================= */}
                <div className="pt-2.5 pb-0.5 border-t border-neutral-100 flex items-center justify-end gap-2 pl-14 sm:pl-16">
                  <button
                    type="button"
                    onClick={() => {
                      const certIndex = allMedia.findIndex((m) => m.isCertificate);
                      openLightboxAt(certIndex !== -1 ? certIndex : 0);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-700 text-xs font-mono transition-colors cursor-pointer active:scale-95"
                    title="คลิกเพื่อดูเกียรติบัตรขนาดเต็ม"
                  >
                    <Award size={13} className="text-indigo-600" />
                    <span>ดูเกียรติบัตร</span>
                    <Maximize2 size={11} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCampExpanded(!isCampExpanded)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs font-mono shadow-sm transition-all active:scale-95"
                  >
                    <span>{isCampExpanded ? 'ย่อรายละเอียด' : 'ดูรายละเอียดเพิ่มเติม'}</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${isCampExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>

                {/* =========================================================================
                    COLLAPSIBLE EXPANDED DETAILS (Accordion for Camp)
                    ========================================================================= */}
                <AnimatePresence>
                  {isCampExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden pt-6 space-y-6 border-t border-neutral-200/80 mt-4"
                    >
                      {/* Description Box */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-600 font-semibold block mb-2">
                          CAMP OVERVIEW & DETAILS
                        </span>
                        <p className="text-sm sm:text-base text-neutral-700 font-normal leading-relaxed">
                          {currentCamp.description}
                        </p>
                      </div>

                      {/* Official Certificate Preview Card */}
                      <div className="p-4 sm:p-5 rounded-2xl border border-indigo-100 bg-indigo-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-12 rounded-lg overflow-hidden border border-indigo-200 shrink-0 bg-white shadow-2xs">
                            <img
                              src={currentCamp.certificateImg}
                              alt="Certificate Thumbnail"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-700 font-semibold block">
                              OFFICIAL CERTIFICATE
                            </span>
                            <p className="text-xs sm:text-sm text-neutral-700 font-medium">
                              {currentCamp.certificateCaption || 'เกียรติบัตรผ่านการเข้าร่วมและอบรม'}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const certIdx = allMedia.findIndex((m) => m.isCertificate);
                            openLightboxAt(certIdx !== -1 ? certIdx : 0);
                          }}
                          className="px-3.5 py-1.5 rounded-full bg-white hover:bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-mono font-medium shadow-2xs transition-colors shrink-0"
                        >
                          คลิกขยายดูเกียรติบัตรขนาดเต็ม
                        </button>
                      </div>

                      {/* Role, Core Skills & Highlights */}
                      <div className="rounded-2xl p-4 sm:p-5 bg-neutral-50/90 border border-neutral-200/90 space-y-4">
                        <div>
                          <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                            ROLE & CORE SKILLS
                          </div>
                          <div className="text-sm sm:text-base font-semibold text-neutral-900 mb-2 leading-snug">
                            {currentCamp.role}
                          </div>

                          {/* Tech Badges */}
                          <div className="flex flex-wrap gap-1.5">
                            {currentCamp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white border border-neutral-200 text-neutral-700 shadow-2xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Key Hands-On Highlights */}
                        <div className="space-y-2 pt-3 border-t border-neutral-200/80">
                          <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                            EXPERIENCE & HIGHLIGHTS
                          </div>
                          {currentCamp.highlights.map((hl, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-[13px] text-neutral-600 leading-relaxed">
                              <CheckCircle2 size={13} className="text-indigo-600 shrink-0 mt-0.5" />
                              <span>{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Lightbox / Gallery Quick Action Button */}
                      <div className="pt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => openLightboxAt(0)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-mono font-medium transition-all active:scale-95 border border-indigo-200"
                        >
                          <Maximize2 size={13} className="text-indigo-600" />
                          <span>เปิดโหมดดูภาพทั้งหมดในค่ายนี้ ({allMedia.length} รูป)</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FULL-SCREEN HIGH-RES LIGHTBOX MODAL WITH KEYBOARD & TOUCH NAVIGATION
          ========================================================================= */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 select-none"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Top Toolbar: Counter, Tag & Close Button */}
            <div
              className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between text-white z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-mono border border-white/10">
                  {lightboxIndex + 1} / {allMedia.length}
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-600/80 backdrop-blur-md text-xs font-mono border border-indigo-400/30">
                  {allMedia[lightboxIndex].tag}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors shadow-lg active:scale-95"
                title="ปิดหน้าต่าง (Esc)"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* Previous Image Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center transition-all z-20 shadow-xl active:scale-95"
              title="ภาพก่อนหน้า (Arrow Left)"
              aria-label="Previous photo"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Next Image Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev + 1) % allMedia.length);
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center transition-all z-20 shadow-xl active:scale-95"
              title="ภาพถัดไป (Arrow Right)"
              aria-label="Next photo"
            >
              <ChevronRight size={22} />
            </button>

            {/* Centered High-Res Photo Container */}
            <div
              className="relative max-w-5xl max-h-[80vh] w-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={`lightbox-img-${lightboxIndex}`}
                src={allMedia[lightboxIndex].url}
                alt={allMedia[lightboxIndex].caption}
                initial={{ opacity: 0.4, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                decoding="async"
                className="max-h-[72vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
              />

              {/* Caption Overlay Box */}
              <div className="mt-3 px-4 py-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-white text-center max-w-2xl text-xs sm:text-sm font-light">
                {allMedia[lightboxIndex].caption}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CampShowcase;
