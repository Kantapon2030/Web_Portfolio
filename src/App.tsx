import { useState, useEffect, useRef } from 'react';
import {
  Copy,
  Check,
  ArrowUp,
  Sparkles
} from 'lucide-react';
import realUserBody from './assets/real_user_body.png';
import arduinoBoard from './assets/arduino_board.png';
import minimalWhiteBg from './assets/minimal_white_bg.jpg';
import { motion, useScroll, useTransform } from 'framer-motion';
import BreadcrumbIcon from '@/components/ui/uiable-breadcrumb-icon';
import { WelcomeScreen } from './components/ui/welcome-screen';
import { SplineScene } from './components/ui/splite';
import { Spotlight } from './components/ui/spotlight';
import { MagicText } from './components/ui/magic-text';
import { MascotInteractive } from './components/MascotInteractive';
import { calculateDetailedAge, DetailedAge } from './lib/age';
import { SmartSongthaewShowcase } from './components/SmartSongthaewShowcase';
import ButtonSocialIconDemo from '@/components/ui/social-icon';

// Hero Portrait SVG Component (Reusable for Desktop full-stage and Mobile centered-stage)
function HeroPortraitSvg({
  className = '',
  viewBox = '0 -30 1920 1110',
  preserveAspectRatio = 'xMidYMax meet',
}: {
  className?: string;
  viewBox?: string;
  preserveAspectRatio?: string;
}) {
  return (
    <svg
      className={className}
      viewBox={viewBox}
      preserveAspectRatio={preserveAspectRatio}
      role="img"
      aria-label="Portrait of Kantapon Wongprot"
    >
      <defs>
        <radialGradient id="blueEnergyGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
        </radialGradient>
        <filter id="glowFilter" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 1. Body Base Image */}
      <image
        href={realUserBody}
        x="0"
        y="0"
        width="1920"
        height="1080"
        preserveAspectRatio="xMidYMax meet"
      />

      {/* 2. Levitating Floating Arduino Board (Decorative interactive element) */}
      <g className="anim-arduino-float pointer-events-auto cursor-pointer group" aria-hidden="true">
        {/* Soft Energy Field on Palm */}
        <ellipse
          cx="791"
          cy="614"
          rx="65"
          ry="22"
          fill="url(#blueEnergyGlow)"
          className="anim-energy-pulse"
        />

        {/* Holographic Circuit Orbit Ring 1 */}
        <ellipse
          cx="791"
          cy="606"
          rx="86"
          ry="28"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.4"
          strokeDasharray="20 12 8 8"
          filter="url(#glowFilter)"
          className="anim-ring-spin opacity-90"
        />

        {/* Holographic Circuit Orbit Ring 2 (counter-tilted) */}
        <g transform="rotate(-9 791 606)">
          <ellipse
            cx="791"
            cy="606"
            rx="78"
            ry="24"
            fill="none"
            stroke="#93c5fd"
            strokeWidth="1.2"
            strokeDasharray="14 10"
            className="anim-ring-spin opacity-75"
            style={{ animationDirection: 'reverse', animationDuration: '14s' }}
          />
        </g>

        {/* The Isolated Floating Arduino Board */}
        <image
          href={arduinoBoard}
          x="721"
          y="548"
          width="140"
          height="115"
          className="transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_8px_20px_rgba(56,189,248,0.55)]"
          style={{ transformOrigin: '791px 605px' }}
        />
      </g>
    </svg>
  );
}

// Real birthdate: 2008-12-01 (17 years old)
const BIRTH_DATE = '2008-12-01';

export default function App() {
  // Welcome screen state
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  // Global scroll progress (Framer Motion value — updates DOM directly with zero component re-renders)
  const { scrollYProgress: globalScrollProgress } = useScroll();

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Exact real-time age state (initial calculation prevents layout shift)
  const [age, setAge] = useState<DetailedAge>(() => calculateDetailedAge(BIRTH_DATE));

  // Philosophy runway smooth scroll progress
  const philosophyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: philosophyProgress } = useScroll({
    target: philosophyRef,
    offset: ["start start", "end end"],
  });
  const philosophyEyebrowOpacity = useTransform(philosophyProgress, [0.02, 0.22], [0.2, 1]);
  const philosophyEyebrowY = useTransform(philosophyProgress, [0.02, 0.22], [18, 0]);
  const philosophySubtitleOpacity = useTransform(philosophyProgress, [0.55, 0.82], [0.1, 1]);
  const philosophySubtitleY = useTransform(philosophyProgress, [0.55, 0.82], [32, 0]);

  // Lock body overflow when welcome modal is open
  useEffect(() => {
    if (showWelcome) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showWelcome]);

  // Update age on mount and set a timer to recalculate right after midnight
  useEffect(() => {
    // Initial calculation on mount
    setAge(calculateDetailedAge(BIRTH_DATE));

    // Calculate milliseconds until next midnight in local timezone
    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      1
    );
    const msUntilMidnight = midnight.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setAge(calculateDetailedAge(BIRTH_DATE));
    }, msUntilMidnight);

    return () => clearTimeout(timer);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('tawna20081@gmail.com');
    setToastMessage('คัดลอกอีเมลเรียบร้อยแล้ว');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#181818] selection:bg-neutral-900 selection:text-white">
      {/* 2-Step Welcome Screen with Diamond Loader & Animated Smile Emoji */}
      {showWelcome && (
        <WelcomeScreen onComplete={() => setShowWelcome(false)} />
      )}

      {/* Precision Scroll Progress Bar (GPU Transform ScaleX — Zero Re-renders) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-emerald-500 z-50 origin-left shadow-[0_0_8px_rgba(16,185,129,0.7)]"
        style={{ scaleX: globalScrollProgress }}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 text-white text-xs font-medium shadow-2xl animate-fade-in border border-neutral-700">
          <Check size={13} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          TOP-RIGHT BREADCRUMB ICON NAVIGATION (COMPACT)
          ========================================================================= */}
      <header className="fixed top-5 right-6 z-50 pointer-events-auto">
        <BreadcrumbIcon />
      </header>

      {/* =========================================================================
          SECTION 1: HERO (100dvh / 100svh FULL VIEWPORT COMPOSITION — DARK OBSIDIAN STUDIO)
          ========================================================================= */}
      <section
        id="hero"
        aria-label="Home introduction"
        className="relative min-h-[100svh] lg:h-[100svh] w-full overflow-hidden select-none bg-[#09090b] text-white flex flex-col justify-between"
      >
        {/* Background Image with Muted Dark Treatment */}
        <img
          src={minimalWhiteBg}
          alt=""
          role="presentation"
          aria-hidden="true"
          decoding="async"
          className="anim-fade-in absolute inset-0 h-full w-full object-cover opacity-15 brightness-[0.35] contrast-125 mix-blend-luminosity pointer-events-none"
        />

        {/* Ambient Studio Lighting Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[400px] bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none" />

        {/* Deep Vignette Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/40 to-[#09090b] pointer-events-none" />

        {/* Subtle Background Giant Typography: "Kantapon Wongprot" */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[10vh] sm:top-[8vh] z-0 overflow-hidden anim-fade-up delay-marquee py-4 sm:py-8 pointer-events-none select-none hidden sm:block"
        >
          <div className="marquee flex w-max whitespace-nowrap font-inter font-light text-[10vh] sm:text-[14vh] lg:text-[17vh] leading-[1.1] text-white/[0.04] tracking-tight">
            <span className="inline-block pr-[6vw]">Kantapon Wongprot &mdash; Kantapon Wongprot&nbsp;</span>
            <span className="inline-block pr-[6vw]">Kantapon Wongprot &mdash; Kantapon Wongprot&nbsp;</span>
          </div>
        </div>

        {/* =========================================================================
            DESKTOP HERO (lg:flex) — Side-by-side full viewport obsidian studio
            ========================================================================= */}
        <div className="hidden lg:flex flex-col justify-between h-[100svh] w-full relative z-20">
          {/* DESKTOP ONLY (lg+): Real User Studio Portrait with Levitating Arduino Board on Right */}
          <div className="absolute inset-0 z-10 pointer-events-none flex items-end justify-center overflow-hidden">
            <HeroPortraitSvg
              className="anim-rise-in absolute inset-0 h-full w-full pointer-events-none lg:translate-x-[7%] xl:translate-x-[9%]"
              viewBox="0 -30 1920 1110"
              preserveAspectRatio="xMidYMax meet"
            />
          </div>

          {/* Center-Left Content Column on Desktop */}
          <div className="relative z-30 w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 pt-20 sm:pt-24 lg:pt-28 flex-1 flex flex-col justify-center pointer-events-none">
            <div className="max-w-[480px] lg:max-w-[520px] text-left pointer-events-auto anim-fade-up">
              {/* 1. Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 font-medium">
                  HELLO, I’M KANTAPON
                </span>
              </div>

              {/* 2. Main Heading: Kantapon Wongprot */}
              <h1 className="font-inter font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] text-neutral-100 tracking-tight leading-[1.06]">
                Kantapon<br />
                Wongprot
              </h1>

              {/* 3. Secondary Tagline: Building ideas with AI & Embedded Systems. */}
              <p className="font-inter font-medium text-lg sm:text-2xl lg:text-[1.75rem] text-neutral-300 mt-3 sm:mt-4 leading-snug">
                Building ideas with<br />
                <span className="text-white">AI &amp; Embedded Systems.</span>
              </p>

              {/* 4. Thai Introduction */}
              <p className="mt-4 sm:mt-5 text-[15px] sm:text-base lg:text-[17px] text-neutral-300/90 font-normal leading-[1.75] font-thai max-w-[480px] lg:max-w-[500px]">
                ผมชื่อกันตภณ นักเรียนชั้น ม.6 ที่สนใจ AI, Robotics<br className="hidden sm:inline" />
                และ Embedded Systems ชอบเปลี่ยนไอเดียให้กลายเป็น<br className="hidden sm:inline" />
                โปรเจกต์ที่ทดลองและใช้งานได้จริง
              </p>

              {/* 5. CTAs */}
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3.5 sm:gap-5 text-xs sm:text-sm">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-700 bg-neutral-900/70 backdrop-blur-sm text-neutral-100 hover:text-white hover:border-neutral-400 hover:bg-neutral-800 transition-all font-mono font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <span>View selected projects</span>
                  <span className="text-emerald-400">↗</span>
                </a>
                <a
                  href="#about"
                  className="group inline-flex items-center gap-1.5 px-3 py-2 text-neutral-400 hover:text-white transition-colors font-mono font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md"
                >
                  <span>About me</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Horizontal Neon/Silver Accent Rule (Desktop) */}
          <div className="anim-line inset-x-6 sm:inset-x-10 lg:inset-x-16 xl:inset-x-20 bottom-[5rem] sm:bottom-24 z-20 h-[1px] bg-white/15 block" />

          {/* Hero Footer Meta & Scroll to explore (Desktop) */}
          <div className="flex relative z-30 w-full max-w-[1536px] mx-auto items-end justify-between px-6 pb-5 sm:px-10 sm:pb-8 lg:px-16 xl:px-20 text-xs sm:text-sm leading-relaxed text-neutral-300">
            {/* Bottom Left: Identity & Location */}
            <div className="anim-fade-up delay-footer-left flex flex-col font-normal text-left">
              <span className="text-neutral-100 font-medium text-xs sm:text-sm">M.6 Student</span>
              <span className="text-neutral-300 text-[11px] sm:text-xs">AI, Robotics &amp; Embedded Systems</span>
              <span className="text-neutral-400 font-mono text-[10px] sm:text-[11px] mt-0.5 tracking-normal">Nakhon Si Thammarat, Thailand</span>
            </div>

            {/* Center-Bottom: Scroll Indicator */}
            <a
              href="#about"
              className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-neutral-400 hover:text-white transition-colors uppercase cursor-pointer py-1 px-2.5 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400"
              aria-label="Scroll to explore about me"
            >
              <span>SCROLL TO EXPLORE</span>
              <span>↓</span>
            </a>

            {/* Bottom Right: Year & Name */}
            <div className="anim-fade-up delay-footer-right text-right flex flex-col font-normal">
              <span className="text-neutral-400 font-mono text-[11px] sm:text-xs">Portfolio 2026</span>
              <span className="font-medium text-neutral-100 text-xs sm:text-sm">Kantapon Wongprot</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            MOBILE HERO (lg:hidden) — 2-Stage Story:
            Stage 1: Portrait first (full head, zero cutoff, glowing Arduino & laptop)
            Stage 2: Scroll down to reveal Kantapon Wongprot headline, tagline & bio
            ========================================================================= */}
        <div className="lg:hidden flex flex-col w-full relative z-20">
          {/* Mobile Stage 1 (100svh): Kantapon Portrait with Full Head & Scroll Prompt */}
          <div className="min-h-[100svh] flex flex-col justify-between items-center px-6 pt-20 pb-8 relative">
            {/* Eyebrow badge */}
            <div className="pt-2 flex justify-center w-full anim-fade-up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md shadow-lg">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-300 font-medium">
                  HELLO, I’M KANTAPON
                </span>
              </div>
            </div>

            {/* Centered User Portrait (Zero Cutoff: viewBox="590 60 740 1020" gives 60px breathing headroom) */}
            <div className="flex-1 flex items-center justify-center relative w-full my-auto py-2">
              {/* Soft Ambient Studio Lighting Glow */}
              <div className="absolute inset-0 max-w-[320px] max-h-[320px] m-auto bg-gradient-to-b from-sky-500/20 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="relative w-full max-w-[320px] sm:max-w-[360px] h-[58svh] flex items-center justify-center">
                <HeroPortraitSvg
                  className="anim-rise-in w-full h-full pointer-events-auto drop-shadow-[0_16px_36px_rgba(0,0,0,0.7)]"
                  viewBox="590 60 740 1020"
                  preserveAspectRatio="xMidYMid meet"
                />
              </div>
            </div>

            {/* Scroll Indicator Prompt */}
            <div className="pb-4 flex justify-center w-full anim-fade-up">
              <a
                href="#mobile-hero-details"
                className="inline-flex flex-col items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer group py-2 px-4 rounded-full bg-white/[0.04] border border-white/5 backdrop-blur-sm"
                aria-label="Scroll down to view profile and introduction"
              >
                <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 group-hover:text-neutral-200 uppercase font-medium">
                  SCROLL TO EXPLORE
                </span>
                <span className="text-emerald-400 text-xs animate-bounce leading-none">↓</span>
              </a>
            </div>
          </div>

          {/* Mobile Stage 2: Revealed on scroll — Kantapon Wongprot headline, tagline, bio, and CTAs */}
          <div
            id="mobile-hero-details"
            className="min-h-[100svh] flex flex-col justify-between px-6 pt-20 pb-8 relative"
          >
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col justify-center max-w-[480px] mx-auto w-full text-left"
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-medium">
                  KANTAPON WONGPROT
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-inter font-semibold text-4xl sm:text-5xl text-neutral-100 tracking-tight leading-[1.06]">
                Kantapon<br />
                Wongprot
              </h1>

              {/* Secondary Tagline */}
              <p className="font-inter font-medium text-lg sm:text-xl text-neutral-300 mt-3 leading-snug">
                Building ideas with<br />
                <span className="text-white">AI &amp; Embedded Systems.</span>
              </p>

              {/* Thai Introduction */}
              <p className="mt-4 text-[15px] sm:text-base text-neutral-300/90 font-normal leading-[1.75] font-thai">
                ผมชื่อกันตภณ นักเรียนชั้น ม.6 ที่สนใจ AI, Robotics<br />
                และ Embedded Systems ชอบเปลี่ยนไอเดียให้กลายเป็น<br />
                โปรเจกต์ที่ทดลองและใช้งานได้จริง
              </p>

              {/* CTAs */}
              <div className="mt-6 flex flex-wrap items-center gap-3.5 text-xs sm:text-sm">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-700 bg-neutral-900/80 backdrop-blur-sm text-neutral-100 hover:text-white hover:border-neutral-400 hover:bg-neutral-800 transition-all font-mono font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <span>View selected projects</span>
                  <span className="text-emerald-400">↗</span>
                </a>
                <a
                  href="#about"
                  className="group inline-flex items-center gap-1.5 px-3 py-2 text-neutral-400 hover:text-white transition-colors font-mono font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md"
                >
                  <span>About me</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </motion.div>

            {/* Mobile Horizontal Accent Rule & Footer Meta */}
            <div className="w-full max-w-[480px] mx-auto pt-8">
              <div className="w-full h-[1px] bg-white/15 mb-4" />
              <div className="flex items-center justify-between text-xs leading-relaxed text-neutral-300">
                <div className="flex flex-col text-left">
                  <span className="text-neutral-100 font-medium text-xs">M.6 Student</span>
                  <span className="text-neutral-300 text-[11px]">AI, Robotics &amp; Embedded Systems</span>
                  <span className="text-neutral-400 font-mono text-[10px] mt-0.5">Nakhon Si Thammarat, Thailand</span>
                </div>
                <div className="text-right flex flex-col">
                  <span className="text-neutral-400 font-mono text-[11px]">Portfolio 2026</span>
                  <span className="font-medium text-neutral-100 text-xs">Kantapon Wongprot</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: ABOUT ME & MASCOT SIGNATURE — 01 // ABOUT ME (MINIMAL MODERN)
          ========================================================================= */}
      <div className="w-full bg-[#faf9f6] text-[#181818]">
        <section id="about" className="py-24 sm:py-36 px-6 sm:px-12 max-w-5xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-12 sm:mb-16">
            <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
              ABOUT ME
            </span>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Anime Mascot Signature (Reduced size by 12-15%, minimalist presence) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <MascotInteractive />
            </div>

            {/* Right Column: Personal Information with Generous White Space */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Heading & Subheading */}
              <div className="mb-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900 leading-[1.2]">
                  สวัสดีครับ ผมกันตภณ
                </h2>
                <p className="text-base sm:text-lg text-neutral-500 font-normal mt-2 leading-relaxed">
                  จะเรียกว่า “ธันวา” ก็ได้ครับ
                </p>

                {/* Real-time Calculated Age (Clean text under subheading, no dark box, subtle accent) */}
                <p
                  className="mt-3 text-sm sm:text-base text-neutral-600 font-normal flex items-center gap-1.5"
                  aria-label={age.ariaLabel}
                >
                  <span>ตอนนี้ผมอายุ</span>
                  <span className="font-medium text-emerald-600 font-mono tracking-tight">
                    {age.years} ปี {age.months} เดือน {age.days} วัน
                  </span>
                </p>
              </div>

              {/* Body Paragraphs with Relaxed Leading & Normal Weight */}
              <div className="space-y-4 text-neutral-700 font-normal leading-relaxed text-sm sm:text-base">
                <p>
                  กำลังเรียนอยู่ชั้น ม.6 ที่โรงเรียนเตรียมอุดมศึกษาภาคใต้ จังหวัดนครศรีธรรมราช
                </p>
                <p>
                  ผมชอบสร้างโปรเจกต์ที่นำ AI ซอฟต์แวร์ และอุปกรณ์จริงมาทำงานร่วมกัน ตั้งแต่ Computer Vision ไปจนถึง Embedded Systems เพราะรู้สึกสนุกทุกครั้งที่สิ่งที่อยู่ในความคิดสามารถทำงานได้จริง
                </p>
                <p>
                  ช่วงนี้ผมกำลังพัฒนาทักษะด้าน AI และวิศวกรรมคอมพิวเตอร์ พร้อมทดลองสร้างโปรเจกต์ใหม่ ๆ ที่ช่วยแก้ปัญหาใกล้ตัวครับ
                </p>
              </div>

              {/* Reduced Skill Tags (Only 3 tags requested) */}
              <div className="mt-8 flex flex-wrap gap-2.5">
                {[
                  'AI & Computer Vision',
                  'Embedded Systems',
                  'Web Development'
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 rounded-full border border-neutral-200 text-xs font-mono text-neutral-700 bg-neutral-50 hover:border-neutral-900 hover:text-neutral-900 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Simple Text Links with Smooth Hover & Arrow */}
              <div className="mt-10 pt-6 border-t border-neutral-200/80 flex flex-wrap items-center gap-6 text-sm font-medium">
                <a
                  href="#skills"
                  className="group inline-flex items-center gap-1.5 text-neutral-800 hover:text-emerald-600 transition-colors"
                >
                  <span>ดูโปรเจกต์ของผม</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  <span>ประสบการณ์และกิจกรรม</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Seamless Full-Bleed Dark Gradient Runway into Section 3 (Eliminating Any White Borders) */}
        <div className="w-full h-48 sm:h-64 bg-gradient-to-b from-[#faf9f6] via-[#141418] to-[#050507]" />
        <div className="w-full h-24 sm:h-36 bg-[#050507]" />
      </div>

      {/* =========================================================================
          SECTION 3: MOTTO ABOVE 3D INTERACTIVE ROBOT (MINIMAL OBSIDIAN STUDIO)
          ========================================================================= */}
      <section
        id="skills"
        className="relative min-h-[100dvh] h-[100dvh] w-full bg-[#050507] text-white flex flex-col items-center justify-between select-none scroll-mt-0 pb-6 overflow-hidden"
      >
        {/* Studio Spotlight shining directly down seamlessly from above */}
        <Spotlight />

        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050507] to-transparent pointer-events-none z-20" />

        {/* TOP: Motto Directly Above Robot's Head (Clear, non-overlapping spacing) */}
        <div className="text-center z-20 shrink-0 px-6 pt-16 sm:pt-20">
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-neutral-400 block mb-2">
            02 // Motto & Interactive 3D
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-neutral-400 tracking-tight leading-tight uppercase">
            EVERYTHING IS POSSIBLE.
          </h1>
          <p className="mt-2 text-base sm:text-xl md:text-2xl font-light text-neutral-300 font-prompt tracking-wide">
            ทุกสิ่งเป็นไปได้
          </p>
        </div>

        {/* CENTER / BOTTOM: 3D Spline Canvas situated comfortably below text with NO overlap */}
        <div className="w-full flex-1 -mt-2 sm:-mt-4 min-h-0 relative flex items-center justify-center">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </section>

      {/* =========================================================================
          SECTION 3.5: MOTTO PHILOSOPHY (EXTENDED SCROLL RUNWAY & GRADUAL REVEAL)
          ========================================================================= */}
      <section
        id="philosophy"
        ref={philosophyRef}
        className="relative min-h-[180vh] w-full bg-[#050507] text-white select-none border-b border-neutral-900 scroll-mt-0"
      >
        {/* Sticky Viewport Stage for Smooth, Generous Scroll Reveal */}
        <div className="sticky top-0 h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden px-6">
          {/* Subtle Ambient Atmosphere */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/5 rounded-full blur-[180px] pointer-events-none" />

          <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center relative z-10">
            <motion.span
              style={{
                opacity: philosophyEyebrowOpacity,
                y: philosophyEyebrowY,
              }}
              className="text-[11px] font-mono tracking-[0.3em] uppercase text-neutral-500 block mb-6 will-change-transform"
            >
              Our Core Philosophy
            </motion.span>

            <MagicText
              lines={[
                "เราไม่ได้ทำไม่ได้",
                "เราแค่ยังไม่เคยถูกสอนให้ทำ"
              ]}
              progress={philosophyProgress}
              className="font-prompt text-3xl sm:text-5xl md:text-6xl font-normal sm:font-light tracking-normal text-center leading-[1.6]"
              wordClassName="my-2 sm:my-3 font-prompt"
            />

            <motion.p
              style={{
                opacity: philosophySubtitleOpacity,
                y: philosophySubtitleY,
              }}
              className="mt-8 sm:mt-10 text-xs sm:text-sm md:text-base font-light font-mono text-neutral-400 tracking-wider will-change-transform"
            >
              “We are not incapable; we simply haven't been taught how to do it yet.”
            </motion.p>
          </div>

          {/* Bottom edge fade */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#050507] to-transparent pointer-events-none" />
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: SMART SONGTHAEW LIVE TRANSIT SHOWCASE (FULL-BLEED STAGE)
          ========================================================================= */}
      <SmartSongthaewShowcase />

      {/* =========================================================================
          SECTION 6: GRAND FINALE CONTACT HUB (DEEP RICH BLACK FINALE) — 04 // CONTACT
          ========================================================================= */}
      <section id="contact" className="py-36 px-6 sm:px-12 bg-[#08080a] text-white text-center border-t border-neutral-900">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 font-mono">
            <span>04 // Contact & Inquiries</span>
          </div>

          <h2 className="font-hn text-4xl sm:text-6xl font-normal tracking-tight text-white mb-6">
            พร้อมร่วมงานและ<br />
            <span className="font-serif italic text-neutral-400">แลกเปลี่ยนทางวิชาการ</span>
          </h2>
          <p className="text-neutral-400 font-light text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            หากท่านมีข้อสงสัยเกี่ยวกับผลงาน โครงงาน หรือต้องการแลกเปลี่ยนข้อมูลด้านวิศวกรรมคอมพิวเตอร์ สามารถติดต่อได้เสมอครับ
          </p>

          {/* Email Contact with 1-Click Copy */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
            <a
              href="mailto:tawna20081@gmail.com"
              className="text-xl sm:text-3xl font-light text-white hover:text-emerald-400 underline underline-offset-8 transition-colors font-mono"
            >
              tawna20081@gmail.com
            </a>
            <button
              onClick={copyEmail}
              className="p-3 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300 hover:text-white shadow-md transition-all active:scale-95"
              title="คัดลอกอีเมล"
            >
              <Copy size={16} />
            </button>
          </div>

          {/* Social / External Links (Rounded squircle cards with brand logos in dark theme) */}
          <div className="mb-16">
            <ButtonSocialIconDemo theme="dark" />
          </div>

          {/* Back To Top & Replay Intro Buttons */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setShowWelcome(true)}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors uppercase tracking-wider"
            >
              <Sparkles size={13} className="text-emerald-400" />
              <span>Replay Intro</span>
            </button>
            <span className="text-neutral-700">&bull;</span>
            <a
              href="#hero"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors uppercase tracking-wider"
            >
              <ArrowUp size={13} />
              <span>Back To Top</span>
            </a>
          </div>

          {/* Final Copyright */}
          <div className="mt-14 pt-8 border-t border-neutral-900 text-xs text-neutral-500 font-light font-mono">
            © 2026 กันตภณ วงศ์พรต (Kantapon Wongprot) — Computer Engineering Portfolio
          </div>
        </div>
      </section>
    </div>
  );
}
