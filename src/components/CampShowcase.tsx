import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Award,
  Sparkles,
  Calendar,
  X,
  Layers,
  CheckCircle2,
  Image as ImageIcon,
  Camera,
} from 'lucide-react';
import { CAMPS_DATA, CampItem } from '../campData';
import mascotDownLeft from '../assets/mascot_down_left.png';

export const CampShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = slide next (right-to-left), -1 = prev
  const [isPaused, setIsPaused] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; caption: string; tag: string } | null>(null);
  const [mascotBubbleIdx, setMascotBubbleIdx] = useState(0);
  const [isCampInView, setIsCampInView] = useState(false);

  const runwayRef = useRef<HTMLDivElement>(null);
  const campContainerRef = useRef<HTMLDivElement>(null);
  const currentCamp: CampItem = CAMPS_DATA[currentIndex];

  // Scroll animations for the giant "CAMP" runway (restored as requested by user)
  const { scrollYProgress: runwayProgress } = useScroll({
    target: runwayRef,
    offset: ['start end', 'end start'],
  });

  const campTextX = useTransform(runwayProgress, [0, 1], [80, -80]);
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

  // Navigate to next camp
  const goToNext = useCallback(() => {
    setDirection(1);
    setActivePhotoIdx(0);
    setMascotBubbleIdx(0);
    setCurrentIndex((prev) => (prev + 1) % CAMPS_DATA.length);
  }, []);

  // Navigate to previous camp
  const goToPrev = useCallback(() => {
    setDirection(-1);
    setActivePhotoIdx(0);
    setMascotBubbleIdx(0);
    setCurrentIndex((prev) => (prev - 1 + CAMPS_DATA.length) % CAMPS_DATA.length);
  }, []);

  const goToSlide = (idx: number) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setActivePhotoIdx(0);
    setMascotBubbleIdx(0);
    setCurrentIndex(idx);
  };

  // High-performance automatic sliding ticker ONLY when in view and not paused
  useEffect(() => {
    const shouldPause = isPaused || lightboxOpen || !isCampInView;
    if (shouldPause) return;

    const interval = setInterval(() => {
      goToNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, lightboxOpen, isCampInView, goToNext]);

  // Keyboard navigation when lightbox is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxOpen) {
        setLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [lightboxOpen]);

  // Mascot fun extra quotes on click
  const extraMascotQuotes = [
    currentCamp.mascotTip,
    'คลิกที่รูปภาพเพื่อเปิดดูขนาดเต็มความละเอียดสูงได้นะ!',
    'สไลด์เปลี่ยนค่ายอัตโนมัติทุก 6 วินาที หรือกดปุ่มลูกศรได้เลยครับ',
  ];

  const handleMascotClick = () => {
    setMascotBubbleIdx((prev) => (prev + 1) % extraMascotQuotes.length);
  };

  // Ultra-smooth GPU compositor slide transitions (zero layout shift, zero jank)
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 32 : -32,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.22,
        ease: [0.25, 1, 0.5, 1] as const,
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -32 : 32,
      opacity: 0,
      transition: {
        duration: 0.18,
        ease: [0.5, 0, 0.75, 0] as const,
      },
    }),
  };

  const openLightbox = (photo: { url: string; caption: string; tag: string }) => {
    setLightboxImage(photo);
    setLightboxOpen(true);
  };

  const OrganizerLogo = currentCamp.organizerLogo;
  const currentActivePhoto = currentCamp.galleryPhotos[activePhotoIdx] || currentCamp.galleryPhotos[0];

  return (
    <div
      id="camps"
      ref={campContainerRef}
      style={{ overflowAnchor: 'none' }}
      className="w-full bg-[#faf9f6] text-neutral-900 select-none"
    >
      {/* =========================================================================
          SECTION: SCROLL DOWN RUNWAY WITH GIANT ANIMATED "CAMP" TYPOGRAPHY
          ========================================================================= */}
      <section
        ref={runwayRef}
        style={{ overflowAnchor: 'none' }}
        className="w-full bg-white text-neutral-900 pt-16 sm:pt-24 pb-8 sm:pb-12 px-6 sm:px-12 flex flex-col items-center justify-center relative overflow-hidden"
      >
        <div className="max-w-6xl w-full flex flex-col items-center text-center relative z-10">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-mono mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span>04 // ACADEMIC CAMPS &amp; WORKSHOPS</span>
          </div>

          {/* Giant Animated "CAMP" Typography */}
          <div className="w-full overflow-hidden py-2 sm:py-4">
            <motion.h2
              style={{
                x: campTextX,
                opacity: campTextOpacity,
                scale: campScale,
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
              }}
              className="font-black text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] tracking-tighter uppercase leading-none text-neutral-900"
            >
              <span className="text-indigo-600">C</span>AMP
            </motion.h2>
          </div>

          {/* Subtitle description */}
          <p className="max-w-2xl text-xs sm:text-sm font-light font-mono text-neutral-500 tracking-wide mt-1">
            ประสบการณ์การเรียนรู้เชิงปฏิบัติการ ค่ายวิชาการ และเวทีประชันไอเดียในระดับชั้นมัธยมศึกษา
          </p>
        </div>
      </section>

      {/* =========================================================================
          MAIN CAMP SHOWCASE SECTION (BOX FIT COMFORTABLY IN SINGLE VIEWPORT)
          ========================================================================= */}
      <section
        style={{ overflowAnchor: 'none' }}
        className="w-full bg-white text-neutral-900 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12"
      >
        <div className="max-w-6xl mx-auto" style={{ overflowAnchor: 'none' }}>
          {/* Navigation Toolbar & Slide Ticker (Top Bar) */}
          <div className="mb-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-indigo-600 tracking-wider">
                {currentCamp.indexTag}
              </span>
              <span className="text-neutral-300">|</span>
              <span className="text-xs font-mono text-neutral-400">
                {isPaused || !isCampInView ? '⏸ หยุดชั่วคราว' : '▶ เลื่อนอัตโนมัติทุก 6 วิ'}
              </span>
            </div>

            {/* Navigation Buttons & Progress Dots */}
            <div className="flex items-center gap-2.5 self-end sm:self-auto">
              {/* Pagination Dots */}
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-neutral-100 border border-neutral-200">
                {CAMPS_DATA.map((c, idx) => (
                  <button
                    key={c.id}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => goToSlide(idx)}
                    className="p-0.5 touch-manipulation group flex items-center justify-center focus-visible:outline-none"
                    title={`ไปที่ ${c.title}`}
                    aria-label={`Camp slide ${idx + 1}`}
                  >
                    <span
                      className={`h-1.5 rounded-full transition-all duration-300 block ${
                        idx === currentIndex
                          ? 'w-5 bg-indigo-600'
                          : 'w-1.5 bg-neutral-300 group-hover:bg-neutral-400'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={goToPrev}
                  className="w-8 h-8 rounded-full bg-white hover:bg-indigo-50 hover:text-indigo-600 border border-neutral-200 flex items-center justify-center text-neutral-700 transition-colors shadow-xs active:scale-95 touch-manipulation"
                  title="ค่ายก่อนหน้า (Previous)"
                  aria-label="Previous camp"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={goToNext}
                  className="w-8 h-8 rounded-full bg-white hover:bg-indigo-50 hover:text-indigo-600 border border-neutral-200 flex items-center justify-center text-neutral-700 transition-colors shadow-xs active:scale-95 touch-manipulation"
                  title="ค่ายถัดไป (Next)"
                  aria-label="Next camp"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* =========================================================================
              THE MAIN CAMP DATA BOX:
              - Strictly locked height on desktop (lg:h-[435px]) to prevent height shifts
              - overflowAnchor: 'none' to block browser scroll anchoring
              - Smooth hardware-accelerated crossfade transitions
              ========================================================================= */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ overflowAnchor: 'none' }}
            className="relative p-4 sm:p-6 lg:p-7 bg-white rounded-3xl shadow-sm border border-neutral-200/90 overflow-hidden lg:h-[442px] min-h-[442px]"
          >
            {/* 6-Second Linear Progress Bar (At Top Edge) */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-neutral-100 overflow-hidden z-20">
              <div
                key={`camp-progress-${currentIndex}`}
                className="h-full bg-indigo-600 origin-left"
                style={{
                  transformOrigin: '0% 50%',
                  animation: 'showcaseProgress 6s linear forwards',
                  animationPlayState: (isPaused || lightboxOpen || !isCampInView) ? 'paused' : 'running',
                }}
              />
            </div>

            {/* Indigo Corner Frame Accents (Corner Brackets) */}
            <div
              aria-hidden="true"
              className="absolute -top-1 -left-1 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-indigo-600 rounded-tl-xl shadow-[0_0_8px_rgba(79,70,229,0.3)] pointer-events-none z-10"
            />
            <div
              aria-hidden="true"
              className="absolute -top-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-indigo-600 rounded-tr-xl shadow-[0_0_8px_rgba(79,70,229,0.3)] pointer-events-none z-10"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-1 -left-1 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-indigo-600 rounded-bl-xl shadow-[0_0_8px_rgba(79,70,229,0.3)] pointer-events-none z-10"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-indigo-600 rounded-br-xl shadow-[0_0_8px_rgba(79,70,229,0.3)] pointer-events-none z-10"
            />

            {/* Subtle Indigo Ambient Glow */}
            <div
              aria-hidden="true"
              className="absolute -top-6 -left-6 w-36 h-36 bg-indigo-500/8 rounded-full blur-2xl pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-6 -right-6 w-36 h-36 bg-violet-500/8 rounded-full blur-2xl pointer-events-none"
            />

            {/* Slide Content with AnimatePresence */}
            <AnimatePresence custom={direction} mode="wait" initial={false}>
              <motion.div
                key={currentCamp.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  transform: 'translateZ(0)',
                  overflowAnchor: 'none',
                }}
                className="w-full h-full will-change-[transform,opacity]"
              >
                {/* 2-COLUMN SPLIT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-start">
                  {/* -------------------------------------------------------------
                      LEFT COLUMN (44% Width): Strictly Dimensioned for Zero Shift
                      ------------------------------------------------------------- */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    {/* Organizer & Badge Bar (Strictly 46px) */}
                    <div className="flex items-center justify-between gap-2 pb-2.5 mb-2 border-b border-neutral-100 h-[46px] overflow-hidden">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center p-1.5 shrink-0 shadow-2xs">
                          <OrganizerLogo className="w-full h-full object-contain" />
                        </div>
                        <div className="min-w-0 truncate">
                          <div className="text-xs font-mono font-bold text-indigo-700 truncate">
                            {currentCamp.organizer}
                          </div>
                          <div className="text-[11px] font-mono text-neutral-400 truncate">
                            {currentCamp.faculty}
                          </div>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-mono font-medium shrink-0">
                        <Sparkles size={11} className="text-indigo-500" />
                        <span>{currentCamp.badge}</span>
                      </div>
                    </div>

                    {/* Title & Subtitle (Strictly 58px) */}
                    <div className="h-[58px] flex flex-col justify-start overflow-hidden">
                      <h3 className="text-base sm:text-[17px] font-bold tracking-tight text-neutral-900 leading-snug line-clamp-2">
                        {currentCamp.title}
                      </h3>
                      <p className="text-xs text-indigo-700 font-medium truncate mt-0.5">
                        {currentCamp.thaiSubtitle}
                      </p>
                    </div>

                    {/* Short Summary (Strictly 38px) */}
                    <div className="mt-1.5 h-[38px] overflow-hidden">
                      <p className="text-xs sm:text-[13px] text-neutral-600 font-normal leading-relaxed line-clamp-2">
                        {currentCamp.shortSummary}
                      </p>
                    </div>

                    {/* Date & Role Tag (Strictly 26px) */}
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] font-mono text-neutral-500 h-[26px] overflow-hidden">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-100 border border-neutral-200 truncate">
                        <Calendar size={11} className="text-indigo-500 shrink-0" />
                        <span className="truncate">{currentCamp.date}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 truncate">
                        <Layers size={11} className="shrink-0" />
                        <span className="truncate max-w-[170px]">{currentCamp.role}</span>
                      </span>
                    </div>

                    {/* Core Skills Pills (Strictly 58px) */}
                    <div className="mt-2.5 pt-2 border-t border-neutral-100 h-[58px] overflow-hidden">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                        CORE SKILLS &amp; TECHNOLOGIES
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentCamp.technologies.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md border border-neutral-200 text-[11px] font-mono text-neutral-700 bg-neutral-50 hover:border-indigo-400 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hands-on Highlights (Strictly 60px) */}
                    <div className="mt-2 pt-2 border-t border-neutral-100 h-[60px] overflow-hidden">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                        สิ่งที่ได้ลงมือทำจริง (HANDS-ON HIGHLIGHTS)
                      </span>
                      <div className="space-y-1">
                        {currentCamp.highlights.slice(0, 2).map((h, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-[11px] text-neutral-700 leading-tight"
                          >
                            <CheckCircle2 size={13} className="text-indigo-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* -------------------------------------------------------------
                      RIGHT COLUMN (56% Width): Strictly Dimensioned for Zero Shift
                      ------------------------------------------------------------- */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    {/* Top Bar of Right Column: Section Sub-labels & MASCOT AT TOP-RIGHT! */}
                    <div className="flex items-center justify-between gap-3 mb-2 min-h-[48px] overflow-visible">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 uppercase tracking-wide">
                        <ImageIcon size={13} className="text-indigo-600" />
                        <span>OFFICIAL CERTIFICATE &amp; GALLERY</span>
                      </div>

                      {/* =========================================================================
                          MASCOT AT TOP-RIGHT (OPPOSITE OF PROJECT SECTION'S BOTTOM-LEFT)
                          ========================================================================= */}
                      <div
                        onClick={handleMascotClick}
                        className="flex items-center gap-2 cursor-pointer group select-none relative"
                        title="คลิกที่มาสคอตเพื่อฟังคำแนะนำ!"
                      >
                        {/* Speech Bubble (Pointing towards the Mascot on the right) */}
                        <div
                          key={`${currentIndex}-${mascotBubbleIdx}`}
                          className="relative px-3 py-1 rounded-xl bg-indigo-50 border border-indigo-200/90 shadow-2xs text-xs font-mono text-neutral-800 max-w-[210px] sm:max-w-[270px] text-right"
                        >
                          <div className="flex items-center justify-end gap-1 text-indigo-700 font-bold text-[10px] leading-tight">
                            <span className="text-neutral-400 font-normal">ไกด์ค่าย ·</span>
                            <span>Tanwa</span>
                          </div>
                          <p className="text-[11px] leading-tight line-clamp-2 text-neutral-700 mt-0.5">
                            {extraMascotQuotes[mascotBubbleIdx]}
                          </p>
                          {/* Speech Bubble Beak Pointing Right */}
                          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2 h-2 bg-indigo-50 border-t border-r border-indigo-200/90 rotate-45 pointer-events-none" />
                        </div>

                        {/* Mascot Figure (Top-Right, looking down-left) — fully visible without clipping */}
                        <div className="relative shrink-0 flex items-center justify-center">
                          <img
                            src={mascotDownLeft}
                            alt="Tanwa Camp Mascot Guide"
                            decoding="async"
                            className="h-11 sm:h-12 w-auto object-contain drop-shadow-sm transition-transform group-hover:scale-105"
                          />
                          <span className="absolute -bottom-0.5 -left-0.5 w-3.5 h-3.5 rounded-full bg-indigo-600 border-2 border-white flex items-center justify-center text-[7px] text-white">
                            <Sparkles size={7} />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Dual Visuals: Side-by-side Certificate + Active Activity Photo (Strictly 208px) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2 h-[208px]">
                      {/* Left Visual: Official Certificate */}
                      <div
                        onClick={() =>
                          openLightbox({
                            url: currentCamp.certificateImg,
                            caption: currentCamp.certificateCaption,
                            tag: 'CERTIFICATE',
                          })
                        }
                        className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-900/5 shadow-2xs hover:shadow-md transition-all cursor-pointer group h-full flex items-center justify-center p-1.5"
                        title="คลิกเพื่อดูเกียรติบัตรขนาดเต็ม"
                      >
                        <img
                          src={currentCamp.certificateImg}
                          alt={`เกียรติบัตร ${currentCamp.title}`}
                          decoding="async"
                          className="w-full h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                          loading="lazy"
                        />

                        {/* Top Verified Badge */}
                        <div className="absolute top-2 left-2 pointer-events-none">
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-700/90 backdrop-blur-md text-white text-[9px] font-mono tracking-wide shadow-xs flex items-center gap-1">
                            <Award size={10} className="text-amber-300" />
                            <span>เกียรติบัตรรับรอง</span>
                          </span>
                        </div>

                        {/* Zoom hint overlay */}
                        <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                          <span className="px-3 py-1.5 rounded-full bg-white/95 text-neutral-900 text-[11px] font-mono font-medium shadow-md flex items-center gap-1.5 backdrop-blur-sm">
                            <Maximize2 size={12} className="text-indigo-600" />
                            <span>ขยายเกียรติบัตร</span>
                          </span>
                        </div>
                      </div>

                      {/* Right Visual: Active Activity Photo */}
                      <div
                        onClick={() => openLightbox(currentActivePhoto)}
                        className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-2xs hover:shadow-md transition-all cursor-pointer group h-full flex items-center justify-center"
                        title="คลิกเพื่อดูรูปภาพขนาดเต็ม"
                      >
                        <img
                          key={currentActivePhoto.url}
                          src={currentActivePhoto.url}
                          alt={currentActivePhoto.caption}
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />

                        {/* Tag pill */}
                        <div className="absolute top-2 left-2 pointer-events-none">
                          <span className="px-2.5 py-0.5 rounded-full bg-neutral-900/85 backdrop-blur-md text-white text-[10px] font-mono tracking-wide shadow-xs flex items-center gap-1">
                            <Camera size={10} className="text-indigo-300" />
                            <span>{currentActivePhoto.tag}</span>
                          </span>
                        </div>

                        {/* Active photo indicator */}
                        <div className="absolute top-2 right-2 pointer-events-none">
                          <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[9px] font-mono">
                            {activePhotoIdx + 1}/{currentCamp.galleryPhotos.length}
                          </span>
                        </div>

                        {/* Zoom hint overlay */}
                        <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-3 py-1.5 rounded-full bg-white/95 text-neutral-900 text-[11px] font-mono font-medium shadow-md flex items-center gap-1.5 backdrop-blur-sm">
                            <Maximize2 size={12} className="text-indigo-600" />
                            <span>ขยายภาพกิจกรรม</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Thumbnail Filmstrip for Camp Photos (Strictly 52px) */}
                    <div className="pt-1.5 border-t border-neutral-100 flex items-center justify-between gap-2 h-[52px] overflow-hidden">
                      <div className="flex items-center gap-2 overflow-x-auto py-0.5 scrollbar-none">
                        {currentCamp.galleryPhotos.map((photo, pIdx) => {
                          const isSelected = pIdx === activePhotoIdx;
                          return (
                            <button
                              key={`${photo.url}-${pIdx}`}
                              type="button"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => setActivePhotoIdx(pIdx)}
                              className={`relative rounded-xl overflow-hidden border-2 transition-all shrink-0 w-16 h-10 sm:w-18 sm:h-11 group ${
                                isSelected
                                  ? 'border-indigo-600 ring-2 ring-indigo-500/30 scale-105 shadow-sm'
                                  : 'border-neutral-200 hover:border-indigo-300 opacity-65 hover:opacity-100'
                              }`}
                              title={photo.caption}
                            >
                              <img
                                src={photo.url}
                                alt=""
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                              <div className="absolute bottom-0 inset-x-0 bg-black/70 text-[8px] font-mono text-white py-0.5 text-center truncate px-0.5">
                                {photo.tag}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="text-right hidden sm:block min-w-0 flex-1 pl-2">
                        <p className="text-[11px] font-mono text-neutral-500 truncate">
                          {currentActivePhoto.caption}
                        </p>
                        <span className="text-[10px] font-mono text-indigo-600">
                          คลิก Thumbnail เพื่อเปลี่ยนรูปภาพกิจกรรม
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Full-Screen Lightbox Modal for Any Image */}
      {lightboxOpen && lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImage.caption}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-neutral-200 bg-neutral-50">
              <div className="flex items-center gap-2 min-w-0">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-mono font-semibold shrink-0">
                  {lightboxImage.tag}
                </span>
                <span className="text-sm font-semibold text-neutral-900 truncate">
                  {lightboxImage.caption}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 transition-colors shrink-0 ml-3"
                title="ปิด (Esc)"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Image */}
            <div className="p-4 sm:p-6 bg-neutral-100 flex items-center justify-center overflow-auto max-h-[80vh]">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.caption}
                decoding="async"
                className="w-full h-auto max-h-[75vh] object-contain rounded-lg shadow-sm"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-2.5 border-t border-neutral-200 bg-white flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-600 gap-2">
              <span className="font-mono text-indigo-600 truncate">{currentCamp.title}</span>
              <span className="font-mono text-neutral-400 shrink-0">กดปุ่ม Esc หรือคลิกข้างนอกเพื่อปิด</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampShowcase;
