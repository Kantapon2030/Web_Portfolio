import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Award,
  Sparkles,
  Calendar,
  X,
  Layers,
  CheckCircle2,
  Camera,
  Pause,
  Clock,
  ZoomIn,
} from 'lucide-react';
import { CAMPS_DATA, CampItem } from '../campData';
import mascotDownLeft from '../assets/mascot_down_left.png';

export const CampShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = slide next (left-to-right), -1 = prev
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; caption: string; tag: string } | null>(null);
  const [mascotBubbleIdx, setMascotBubbleIdx] = useState(0);
  const [isCampInView, setIsCampInView] = useState(false);

  const runwayRef = useRef<HTMLDivElement>(null);
  const campContainerRef = useRef<HTMLDivElement>(null);
  const currentCamp: CampItem = CAMPS_DATA[currentIndex];

  // Scroll animations for the giant "CAMP" background runway
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
    setMascotBubbleIdx(0);
    setCurrentIndex((prev) => (prev + 1) % CAMPS_DATA.length);
  }, []);

  // Navigate to previous camp
  const goToPrev = useCallback(() => {
    setDirection(-1);
    setMascotBubbleIdx(0);
    setCurrentIndex((prev) => (prev - 1 + CAMPS_DATA.length) % CAMPS_DATA.length);
  }, []);

  const goToSlide = (idx: number) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setMascotBubbleIdx(0);
    setCurrentIndex(idx);
  };

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
    'คลิกที่ภาพเกียรติบัตรหรือภาพกิจกรรม เพื่อดูขนาดเต็มคมชัดได้เลยครับ!',
    'รูปจะเลื่อนแสดงตลอดเวลา และสไลด์เปลี่ยนค่ายอัตโนมัติทุก 10 วินาทีครับ',
  ];

  const handleMascotClick = () => {
    setMascotBubbleIdx((prev) => (prev + 1) % extraMascotQuotes.length);
  };

  // Slide transition variants: slides to right/left smoothly
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 48 : -48,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -48 : 48,
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: [0.7, 0, 0.84, 0] as const,
      },
    }),
  };

  const openLightbox = (photo: { url: string; caption: string; tag: string }) => {
    setLightboxImage(photo);
    setLightboxOpen(true);
  };

  // Media list for the left continuous vertical marquee:
  // Starts strictly with the Official Certificate, followed by activity photos
  const campMediaList = useMemo(() => {
    const list = [
      {
        url: currentCamp.certificateImg,
        caption: currentCamp.certificateCaption,
        tag: 'OFFICIAL CERTIFICATE',
        isCertificate: true,
      },
      ...currentCamp.galleryPhotos.map((p) => ({
        url: p.url,
        caption: p.caption,
        tag: p.tag,
        isCertificate: false,
      })),
    ];
    return list;
  }, [currentCamp]);

  // Duplicate list to achieve a seamless, continuous, infinite vertical scroll
  const duplicatedMediaList = useMemo(() => {
    let list = [...campMediaList];
    while (list.length < 4) {
      list = [...list, ...campMediaList];
    }
    return [...list, ...list];
  }, [campMediaList]);

  // Calculate scrolling duration based on number of items for an optimal viewing pace
  const marqueeDuration = Math.max(18, duplicatedMediaList.length * 4.5);

  const OrganizerLogo = currentCamp.organizerLogo;

  return (
    <div
      id="camps"
      ref={campContainerRef}
      style={{ overflowAnchor: 'none' }}
      className="relative w-full bg-[#faf9f6] text-neutral-900 select-none overflow-hidden"
    >
      {/* =========================================================================
          GIANT TYPOGRAPHIC RUNWAY ("CAMP")
          ========================================================================= */}
      <section
        ref={runwayRef}
        style={{ overflowAnchor: 'none' }}
        className="relative w-full min-h-[160px] sm:min-h-[220px] lg:min-h-[260px] flex flex-col items-center justify-center overflow-hidden pt-12 sm:pt-16 pb-4 pointer-events-none"
      >
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <motion.div
            style={{
              x: campTextX,
              opacity: campTextOpacity,
              scale: campScale,
            }}
            className="flex items-center justify-center will-change-transform"
          >
            <span
              className="text-[14vw] sm:text-[15vw] md:text-[16vw] font-black tracking-tighter leading-none select-none text-transparent"
              style={{
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                WebkitTextStroke: '2px rgba(99, 102, 241, 0.45)',
                color: 'rgba(99, 102, 241, 0.08)',
                filter: 'drop-shadow(0 20px 30px rgba(99, 102, 241, 0.12))',
              }}
            >
              CAMP
            </span>
          </motion.div>
        </div>

        {/* Section Subtitle */}
        <div className="relative z-10 text-center px-4 mt-8 sm:mt-12">
          <p className="text-neutral-500 font-prompt text-xs sm:text-sm md:text-base font-light tracking-wide max-w-xl mx-auto">
            ประสบการณ์การเรียนรู้เชิงปฏิบัติการ ค่ายวิชาการ และเวทีประชันไอเดียในระดับชั้นมัธยมศึกษา
          </p>
        </div>
      </section>

      {/* =========================================================================
          MAIN CAMP SHOWCASE SECTION (1 HIGH-IMPACT UNIFIED BOX)
          ========================================================================= */}
      <section
        style={{ overflowAnchor: 'none' }}
        className="w-full bg-[#faf9f6] text-neutral-900 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-10"
      >
        <div className="max-w-6xl mx-auto" style={{ overflowAnchor: 'none' }}>
          {/* Top Control Toolbar */}
          <div className="mb-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-indigo-600 tracking-wider">
                {currentCamp.indexTag}
              </span>
              <span className="text-neutral-300">|</span>
              <span className="text-xs font-mono text-neutral-500 flex items-center gap-1.5">
                {isPaused || lightboxOpen || !isCampInView ? (
                  <>
                    <Pause size={12} className="text-amber-500" />
                    <span>หยุดชั่วคราว (ชี้เมาส์)</span>
                  </>
                ) : (
                  <>
                    <Clock size={12} className="text-indigo-600" />
                    <span>เลื่อนอัตโนมัติทุก 10 วินาที</span>
                  </>
                )}
              </span>
            </div>

            {/* Navigation Buttons & Progress Dots */}
            <div className="flex items-center gap-2.5 self-end sm:self-auto">
              {/* Pagination Dots */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-neutral-200 shadow-2xs">
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
                          ? 'w-6 bg-indigo-600'
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
                  className="w-8 h-8 rounded-full bg-white hover:bg-indigo-50 hover:text-indigo-600 border border-neutral-200 flex items-center justify-center text-neutral-700 transition-colors shadow-2xs active:scale-95 touch-manipulation"
                  title="ค่ายก่อนหน้า (Previous)"
                  aria-label="Previous camp"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={goToNext}
                  className="w-8 h-8 rounded-full bg-white hover:bg-indigo-50 hover:text-indigo-600 border border-neutral-200 flex items-center justify-center text-neutral-700 transition-colors shadow-2xs active:scale-95 touch-manipulation"
                  title="ค่ายถัดไป (Next)"
                  aria-label="Next camp"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* =========================================================================
              THE MAIN CAMP SHOWCASE BOX:
              - Left side: Large Certificate & Activity Photos vertically scrolling
              - Subtle edge fade feathering smoothly into the right side without damaging images
              - Right side: Camp information, badges, title, skills, highlights, mascot
              - Top: 10-Second Linear Progress Bar indicating auto-advance to next camp
              ========================================================================= */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ overflowAnchor: 'none' }}
            className="relative bg-white rounded-3xl shadow-lg border border-neutral-200/90 overflow-hidden lg:h-[530px] min-h-[530px]"
          >
            {/* 10-Second Linear Progress Bar (At Top Edge of Box) */}
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-neutral-100/90 overflow-hidden z-30">
              <div
                key={`camp-10s-timer-${currentIndex}`}
                onAnimationEnd={() => {
                  if (!isPaused && !lightboxOpen && isCampInView) {
                    goToNext();
                  }
                }}
                className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 origin-left shadow-[0_0_10px_rgba(99,102,241,0.6)]"
                style={{
                  transformOrigin: '0% 50%',
                  animation: 'camp10sProgress 10s linear forwards',
                  animationPlayState: isPaused || lightboxOpen || !isCampInView ? 'paused' : 'running',
                }}
              />
            </div>

            {/* Tech Corner Accent Brackets */}
            <div
              aria-hidden="true"
              className="absolute -top-1 -left-1 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-indigo-600 rounded-tl-xl shadow-[0_0_8px_rgba(79,70,229,0.3)] pointer-events-none z-20"
            />
            <div
              aria-hidden="true"
              className="absolute -top-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-indigo-600 rounded-tr-xl shadow-[0_0_8px_rgba(79,70,229,0.3)] pointer-events-none z-20"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-1 -left-1 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-indigo-600 rounded-bl-xl shadow-[0_0_8px_rgba(79,70,229,0.3)] pointer-events-none z-20"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-indigo-600 rounded-br-xl shadow-[0_0_8px_rgba(79,70,229,0.3)] pointer-events-none z-20"
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
                {/* 2-COLUMN LAYOUT:
                    LEFT (56%): Large Certificate & Activity Photos Vertical Marquee
                    RIGHT (44%): Camp Details, Highlights, Skills & Mascot Guide */}
                <div className="grid grid-cols-1 lg:grid-cols-12 h-full items-stretch">
                  {/* -------------------------------------------------------------
                      LEFT COLUMN: Large Visual Showcase with Continuous Scroll
                      ------------------------------------------------------------- */}
                  <div className="lg:col-span-7 relative h-[380px] sm:h-[440px] lg:h-[530px] overflow-hidden bg-neutral-900/5 flex flex-col justify-center">
                    {/* Top Status Pill: Explains Marquee Interaction */}
                    <div className="absolute top-3 left-4 z-20 pointer-events-none">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200/80 text-[10px] font-mono text-neutral-700 shadow-xs flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                        <span>แกลเลอรีภาพ &amp; เกียรติบัตร (เลื่อนต่อเนื่อง)</span>
                      </span>
                    </div>

                    {/* Continuous Vertical Marquee Track */}
                    <div
                      className="flex flex-col gap-4 sm:gap-6 py-4 px-4 sm:px-6 w-full"
                      style={{
                        animation: `campVerticalMarquee ${marqueeDuration}s linear infinite`,
                        animationPlayState: isPaused || lightboxOpen ? 'paused' : 'running',
                      }}
                    >
                      {duplicatedMediaList.map((item, mIdx) => (
                        <div
                          key={`camp-media-${currentIndex}-${mIdx}`}
                          onClick={() => openLightbox(item)}
                          className="group relative cursor-pointer overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-indigo-500 shrink-0 w-full max-w-[560px] mx-auto aspect-[16/10]"
                          title="คลิกเพื่อดูภาพขนาดเต็ม"
                        >
                          {/* Image Component */}
                          <img
                            src={item.url}
                            alt={item.caption}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          />

                          {/* Tag Badge (Certificate vs Photo) */}
                          <div className="absolute top-3 left-3 pointer-events-none z-10">
                            <span
                              className={`px-3 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wide shadow-xs flex items-center gap-1.5 backdrop-blur-md ${
                                item.isCertificate
                                  ? 'bg-indigo-700/95 text-white shadow-indigo-700/20'
                                  : 'bg-neutral-900/85 text-white shadow-black/20'
                              }`}
                            >
                              {item.isCertificate ? (
                                <Award size={12} className="text-amber-300" />
                              ) : (
                                <Camera size={12} className="text-indigo-300" />
                              )}
                              <span>{item.tag}</span>
                            </span>
                          </div>

                          {/* Subtle Gloss Sheen Overlay */}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-40 group-hover:opacity-20 transition-opacity" />

                          {/* Hover Action Overlay: Zoom Button & Caption Toast */}
                          <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4 text-white z-10">
                            <div className="flex justify-end">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-neutral-900 text-xs font-mono font-semibold shadow-md">
                                <ZoomIn size={14} className="text-indigo-600" />
                                <span>ขยายขนาดเต็ม</span>
                              </span>
                            </div>
                            <div className="bg-black/75 backdrop-blur-md p-3 rounded-xl border border-white/15">
                              <p className="text-xs sm:text-sm font-medium line-clamp-2 leading-snug">
                                {item.caption}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Refined Edge Fade Vignettes (Soft feathering strictly at borders so images stay crisp) */}
                    {/* Right Edge Fade: Gently blends into the white information panel on the right */}
                    <div className="hidden lg:block pointer-events-none absolute top-0 bottom-0 right-0 w-8 sm:w-12 bg-gradient-to-r from-transparent to-white z-20" />

                    {/* Top Edge Fade: Soft entrance for scrolling cards */}
                    <div className="pointer-events-none absolute top-0 left-0 right-0 h-10 sm:h-14 bg-gradient-to-b from-white via-white/80 to-transparent z-20" />

                    {/* Bottom Edge Fade: Soft exit for scrolling cards */}
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 sm:h-14 bg-gradient-to-t from-white via-white/80 to-transparent z-20" />
                  </div>

                  {/* -------------------------------------------------------------
                      RIGHT COLUMN: Information, Description, Skills, Mascot Guide
                      ------------------------------------------------------------- */}
                  <div className="lg:col-span-5 relative p-5 sm:p-7 lg:p-7 flex flex-col justify-between h-full bg-white z-10">
                    <div>
                      {/* Top Header: Organizer Logo & Badge */}
                      <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-neutral-100">
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

                      {/* Mascot Guide Tanwa (Integrated at top-right of description!) */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1 min-w-0">
                          {/* Camp Title */}
                          <h3 className="text-base sm:text-lg lg:text-[19px] font-bold tracking-tight text-neutral-900 leading-snug line-clamp-2">
                            {currentCamp.title}
                          </h3>
                          {/* Thai Subtitle */}
                          <p className="text-xs text-indigo-700 font-semibold truncate mt-0.5">
                            {currentCamp.thaiSubtitle}
                          </p>
                        </div>

                        {/* Mascot Guide Component */}
                        <div
                          onClick={handleMascotClick}
                          className="shrink-0 flex items-center gap-1.5 cursor-pointer group select-none ml-1"
                          title="คลิกที่มาสคอตเพื่อฟังคำแนะนำ!"
                        >
                          <motion.div
                            animate={{ y: [0, -3, 0] }}
                            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                            className="relative flex items-center justify-center"
                          >
                            <img
                              src={mascotDownLeft}
                              alt="Tanwa Camp Guide"
                              decoding="async"
                              className="h-12 sm:h-14 lg:h-16 w-auto object-contain drop-shadow-sm transition-transform group-hover:scale-105"
                            />
                            <span className="absolute -bottom-1 -left-1 w-3.5 h-3.5 rounded-full bg-indigo-600 border border-white flex items-center justify-center text-[7px] text-white">
                              <Sparkles size={7} />
                            </span>
                          </motion.div>
                        </div>
                      </div>

                      {/* Mascot Speech Bubble / Camp Quote */}
                      <div
                        onClick={handleMascotClick}
                        className="mb-2.5 px-3 py-1.5 rounded-xl bg-indigo-50/70 border border-indigo-200/70 text-xs font-mono text-neutral-700 cursor-pointer hover:bg-indigo-50 transition-colors flex items-center gap-2"
                      >
                        <span className="text-[10px] font-bold text-indigo-700 shrink-0">ไกด์ Tanwa:</span>
                        <p className="text-[11px] text-neutral-700 truncate">
                          {extraMascotQuotes[mascotBubbleIdx]}
                        </p>
                      </div>

                      {/* Camp Short Summary */}
                      <p className="text-xs sm:text-[13px] text-neutral-600 font-normal leading-relaxed line-clamp-2 sm:line-clamp-3 mb-2.5">
                        {currentCamp.shortSummary}
                      </p>

                      {/* Date & Role Tags */}
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-neutral-500 mb-2.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-100 border border-neutral-200 truncate">
                          <Calendar size={11} className="text-indigo-500 shrink-0" />
                          <span className="truncate">{currentCamp.date}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 truncate">
                          <Layers size={11} className="shrink-0" />
                          <span className="truncate max-w-[200px]">{currentCamp.role}</span>
                        </span>
                      </div>

                      {/* Core Skills & Technologies */}
                      <div className="pt-2 border-t border-neutral-100 mb-2">
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

                      {/* Hands-on Highlights */}
                      <div className="pt-2 border-t border-neutral-100">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                          สิ่งที่ได้ลงมือทำจริง (HANDS-ON HIGHLIGHTS)
                        </span>
                        <div className="space-y-1">
                          {currentCamp.highlights.slice(0, 2).map((h, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-1.5 text-[11px] text-neutral-700 leading-tight"
                            >
                              <CheckCircle2 size={13} className="text-indigo-600 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Status & Interaction Tip */}
                    <div className="pt-2.5 mt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                      <span>เลื่อนเมาส์ชี้เพื่อหยุดดูภาพ</span>
                      <button
                        type="button"
                        onClick={() =>
                          openLightbox({
                            url: currentCamp.certificateImg,
                            caption: currentCamp.certificateCaption,
                            tag: 'CERTIFICATE',
                          })
                        }
                        className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center gap-1 hover:underline"
                      >
                        <Award size={12} />
                        <span>ดูเกียรติบัตรเต็ม ↗</span>
                      </button>
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
