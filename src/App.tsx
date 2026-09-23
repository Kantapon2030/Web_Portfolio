import { useState, useEffect, useRef } from 'react';
import {
  X,
  Copy,
  Check,
  ArrowUp,
  ExternalLink,
  ChevronDown,
  Award,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import realUserBody from './assets/real_user_body.png';
import arduinoBoard from './assets/arduino_board.png';
import minimalWhiteBg from './assets/minimal_white_bg.jpg';
import compHackathonLab from './assets/comp_hackathon_lab.jpg';
import compRobotRescue from './assets/comp_robot_rescue.jpg';
import compAiPresentation from './assets/comp_ai_presentation.jpg';
import compAwardPodium from './assets/comp_award_podium.jpg';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedNavFramer } from './components/ui/navigation-menu';
import { CompetitionShowcase } from './CompetitionShowcase';
import { CertificateModal } from './CertificateModal';
import { Competition } from './competitionData';
import { WelcomeScreen } from './components/ui/welcome-screen';
import { SplineScene } from './components/ui/splite';
import { Spotlight } from './components/ui/spotlight';
import { MagicText } from './components/ui/magic-text';
import { Timeline } from './components/ui/timeline';
import { MascotInteractive } from './components/MascotInteractive';

// Projects data
interface Project {
  id: string;
  number: string;
  title: string;
  category: 'ai' | 'hw' | 'web';
  categoryLabel: string;
  desc: string;
  fullDesc: string;
  metrics: string;
  tech: string[];
}

const PROJECTS: Project[] = [
  {
    id: 'smart-songthaew',
    number: '01',
    title: 'Smart Songthaew แพลตฟอร์มสมาร์ตสองแถว',
    category: 'hw',
    categoryLabel: 'IoT & Web App',
    desc: 'ระบบ IoT + Web App ติดตามสองแถวแบบ Real-time ผ่าน LoRa (VIBE Architecture) ตัดค่าใช้จ่ายเครือข่าย คว้าทุนสนับสนุน NSC 2026 ระดับชาติ',
    fullDesc: 'พัฒนาแพลตฟอร์มแก้ปัญหาประชาชนในส่วนภูมิภาคที่ต้องเสียเวลารอรถสองแถวอย่างคาดเดาไม่ได้ หรือรอในพื้นที่เปลี่ยวและเสี่ยงอันตราย โดยออกแบบสถาปัตยกรรมการส่งข้อมูลระยะไกลผ่านคลื่นสัญญาณ LoRa (VIBE Architecture) เชื่อมกับ Web Application แบบ Real-time ไม่มีค่าบริการเครือข่ายรายเดือน ขึ้นรูปโครงอุปกรณ์ด้วย 3D Printer และออกแบบระบบ Cloud ครบวงจร',
    metrics: 'ผ่านการคัดเลือกรับทุนสนับสนุน NSC 2026 ระดับชาติ (สวทช. + วช.)',
    tech: ['IoT', 'LoRa', 'Web App', '3D Printing', 'Cloud', 'React']
  },
  {
    id: 'eduguard-ai',
    number: '02',
    title: 'EduGuard AI — พลิกเกมกลโกง AI',
    category: 'ai',
    categoryLabel: 'AI Detection',
    desc: 'ระบบ Full-Stack ช่วยครูตรวจจับงานเขียนของนักเรียนว่าใช้ AI หรือไม่ ความแม่นยำสูงกว่า AI Detector อื่นในตลาด ผ่านรอบ Top 10 ระดับประเทศ',
    fullDesc: 'พัฒนา Full-Stack Web Application ในฐานะหัวหน้าทีม โดยนำกระบวนการ Design Thinking มาทำความเข้าใจ Pain Point ของครู แล้วเปลี่ยนปัญหาให้กลายเป็นนวัตกรรมที่ใช้งานได้จริง ระบบมีความแม่นยำสูงกว่า AI Detector อื่นๆ ในตลาดจากผลการทดสอบ ผ่านการคัดเลือกเป็น 10 ทีมสุดท้ายระดับประเทศ',
    metrics: 'Top 10 Finalist ระดับประเทศ • แม่นยำกว่า AI Detector อื่นในตลาด',
    tech: ['Python', 'FastAPI', 'React', 'TypeScript', 'NLP', 'Design Thinking']
  },
  {
    id: 'smart-school-card',
    number: '03',
    title: 'Smart School Card ระบบบัตรนักเรียนอัจฉริยะ',
    category: 'hw',
    categoryLabel: 'Embedded & IoT',
    desc: 'ระบบเช็กชื่อ-ชำระเงินกาแฟออนไลน์ด้วยบัตร RFID + ESP32 เชื่อมเว็บแอป Real-time สำหรับนักเรียน ครู และผู้ปกครอง',
    fullDesc: 'ออกแบบและพัฒนาระบบบัตรนักเรียนอัจฉริยะที่รวมการเช็กชื่อเข้าเรียนและการชำระเงินในบัตรใบเดียว โดยใช้เทคโนโลยี RFID ร่วมกับ ESP32 ส่งข้อมูลแบบ Real-time ขึ้น Web Dashboard ที่ผู้ปกครองสามารถตรวจสอบสถานะบุตรหลานและประวัติการใช้จ่ายได้ทันที',
    metrics: 'ทดสอบจริงในโรงเรียน • ผู้ปกครองติดตามสถานะได้ Real-time',
    tech: ['ESP32', 'RFID', 'C/C++', 'React', 'Firebase', 'LINE API']
  },
  {
    id: 'kru-suan-ai',
    number: '04',
    title: 'ครูสวนAI — ผู้ช่วยเกษตรกรด้วย AI',
    category: 'ai',
    categoryLabel: 'Computer Vision',
    desc: 'AI วิเคราะห์ภาพจากสมาร์ตโฟนเพื่อระบุโรคพืชและแนะนำการดูแล ทำงานแบบ Offline รองรับภาษาไทย เพื่อยกระดับภาคเกษตรไทย',
    fullDesc: 'พัฒนาระบบ Computer Vision บนสมาร์ตโฟนที่ทำงานออฟไลน์ได้ เพื่อช่วยเกษตรกรระบุโรคและภาวะของพืช พร้อมแนะนำวิธีดูแลและปริมาณปุ๋ยที่เหมาะสม ลดการใช้ทรัพยากรเกินจำเป็น รองรับภาษาไทยและใช้งานง่ายแม้สัญญาณไม่ดี เพื่อให้เกษตรกรเป็นเจ้าของข้อมูลและการตัดสินใจ',
    metrics: 'ใช้งานได้ Offline • รองรับภาษาไทย • แม่นยำในการระบุโรคพืช',
    tech: ['TensorFlow Lite', 'Python', 'Flutter', 'Computer Vision', 'MobileNet']
  },
  {
    id: 'nextcode-ide',
    number: '05',
    title: 'NextCode IDE — โปรแกรม IDE สำหรับผู้เริ่มต้น',
    category: 'web',
    categoryLabel: 'Developer Tools',
    desc: 'Web-based IDE พร้อม AI Code Completion และ Visual Debugger ออกแบบเพื่อนักเรียน ม.ต้น ให้เรียนรู้การเขียนโปรแกรมได้ง่ายขึ้น',
    fullDesc: 'พัฒนา Web-based Integrated Development Environment (IDE) ที่รองรับ Python และ JavaScript พร้อมฟีเจอร์ AI Code Completion, Visual Debugger แบบ Step-by-step และ Error Explanation เป็นภาษาไทย ออกแบบ UX/UI เน้นความง่ายสำหรับผู้เริ่มต้น ใช้สอนจริงในค่าย Code for Junior',
    metrics: 'ใช้สอนในค่าย Code for Junior • ผู้เรียนกว่า 60 คน',
    tech: ['React', 'TypeScript', 'Monaco Editor', 'Python', 'WebSocket']
  },
  {
    id: 'ai-uniguide',
    number: '06',
    title: 'AI UniGuide Pro — ที่ปรึกษาเลือกมหาวิทยาลัย',
    category: 'ai',
    categoryLabel: 'AI & RAG',
    desc: 'แชทบอท AI แนะนำสาขาและมหาวิทยาลัยด้วยระบบ RAG ที่ดึงข้อมูลล่าสุดจาก TCAS อัตโนมัติ ช่วยนักเรียน ม.ปลายวางแผนการเรียน',
    fullDesc: 'สร้างระบบแชทบอทแนะนำเส้นทางการศึกษาด้วยเทคโนโลยี Retrieval-Augmented Generation (RAG) ที่ดึงข้อมูล TCAS, คะแนนรับสมัคร และรายละเอียดสาขาล่าสุดอัตโนมัติ ผู้ใช้สามารถถามข้อมูลได้ด้วยภาษาไทยแบบ Natural Language และรับคำแนะนำเฉพาะบุคคลตามผลการเรียนและความสนใจ',
    metrics: 'ข้อมูล TCAS อัปเดตอัตโนมัติ • รองรับภาษาไทยแบบ Natural Language',
    tech: ['Python', 'LangChain', 'RAG', 'OpenAI API', 'Vector DB', 'FastAPI']
  }
];

export default function App() {
  // Welcome screen state
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  const [scrollProgress, setScrollProgress] = useState(0);

  // Projects filter and modal
  const [projectFilter, setProjectFilter] = useState<'all' | 'ai' | 'hw' | 'web'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Competitions certificate modal
  const [selectedCompetitionForCert, setSelectedCompetitionForCert] = useState<Competition | null>(null);

  // Awards modal
  const [selectedAward, setSelectedAward] = useState<{ title: string; subtitle: string; org: string; year: string } | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Stats number counters
  const [countersVisible, setCountersVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Philosophy runway smooth scroll progress
  const philosophyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: philosophyProgress } = useScroll({
    target: philosophyRef,
    offset: ["start start", "end end"],
  });
  const philosophySubtitleOpacity = useTransform(philosophyProgress, [0.35, 0.75], [0.2, 1]);
  const philosophySubtitleY = useTransform(philosophyProgress, [0.35, 0.75], [12, 0]);

  // Lock body overflow when modal is open
  useEffect(() => {
    if (selectedProject || selectedAward || selectedCompetitionForCert || showWelcome) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedProject, selectedAward, selectedCompetitionForCert, showWelcome]);

  // Scroll listener for progress
  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const progress = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for Stats
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCountersVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('tawna20081@gmail.com');
    setToastMessage('คัดลอกอีเมลเรียบร้อยแล้ว');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredProjects = projectFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === projectFilter);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#181818] selection:bg-neutral-900 selection:text-white">
      {/* 2-Step Welcome Screen with Diamond Loader & Animated Smile Emoji */}
      {showWelcome && (
        <WelcomeScreen onComplete={() => setShowWelcome(false)} />
      )}

      {/* Precision Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-emerald-500 z-50 transition-all duration-150 shadow-[0_0_8px_rgba(16,185,129,0.7)]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 text-white text-xs font-medium shadow-2xl animate-fade-in border border-neutral-700">
          <Check size={13} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          ANIMATED FRAMER NAVIGATION MENU (COLLAPSIBLE FLOATING PILL / CIRCLE)
          ========================================================================= */}
      <AnimatedNavFramer onIntroClick={() => setShowWelcome(true)} />

      {/* =========================================================================
          SECTION 1: HERO (100dvh FULL VIEWPORT COMPOSITION — DARK OBSIDIAN STUDIO)
          ========================================================================= */}
      <section id="hero" className="relative h-[100dvh] w-full overflow-hidden select-none bg-[#09090b] snap-start">
        {/* Background Image with Muted Dark Treatment */}
        <img
          src={minimalWhiteBg}
          alt=""
          className="anim-fade-in absolute inset-0 h-full w-full object-cover opacity-15 brightness-[0.35] contrast-125 mix-blend-luminosity"
        />

        {/* Ambient Studio Lighting Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[400px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />

        {/* Deep Vignette Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/40 to-[#09090b] pointer-events-none" />

        {/* Marquee Name Track (Luminous Minimalist Swiss Typography in Dark) */}
        <div className="absolute inset-x-0 top-[12vh] sm:top-[10vh] z-10 overflow-hidden anim-fade-up delay-marquee py-6 sm:py-10">
          <div className="marquee flex w-max whitespace-nowrap font-hn font-light text-[12vh] sm:text-[19vh] leading-[1.15] text-white/15 tracking-tight">
            <span className="inline-block pr-[8vw]">Kantapon &mdash; Wongprot&nbsp;</span>
            <span className="inline-block pr-[8vw]">Kantapon &mdash; Wongprot&nbsp;</span>
          </div>
        </div>

        {/* Horizontal Neon/Silver Accent Rule */}
        <div className="anim-line absolute inset-x-6 sm:inset-x-10 bottom-[5.5rem] sm:bottom-28 z-10 h-[1px] bg-white/20" />

        {/* Hero Footer Meta */}
        <div className="absolute inset-x-0 bottom-0 z-30 sm:z-10 flex items-end justify-between px-6 pb-5 sm:px-10 sm:pb-8 text-xs sm:text-sm leading-relaxed font-hn text-neutral-300">
          <div className="anim-fade-up delay-footer-left flex flex-col font-light">
            <span className="text-white font-medium">Computer Engineering Candidate</span>
            <span className="text-neutral-400">Robotics & Embedded Dev</span>
            <span className="text-neutral-400">Deep Learning & AI</span>
          </div>

          {/* Quick Scroll Indicator Center */}
          <a
            href="#about"
            className="hidden md:flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 text-white transition-opacity text-[11px] font-mono tracking-widest uppercase cursor-pointer"
          >
            <span>Explore Portfolio</span>
            <ChevronDown size={14} className="animate-bounce text-emerald-400" />
          </a>

          <div className="anim-fade-up delay-footer-right text-right flex flex-col font-light">
            <span className="text-neutral-400">Portfolio 2025</span>
            <span className="font-medium text-white">Kantapon Wongprot</span>
          </div>
        </div>

        {/* Real User Studio Portrait with Animated Levitating Arduino Board — Spacious, Uncropped Framing */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-end justify-center overflow-hidden">
          <svg
            className="anim-rise-in absolute inset-0 h-full w-full pointer-events-none"
            viewBox="0 -30 1920 1110"
            preserveAspectRatio="xMidYMax meet"
          >
            <defs>
              <radialGradient id="blueEnergyGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </radialGradient>
              <filter id="glowFilter" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 1. Body Base Image (White school uniform stands out crisply on dark backdrop!) */}
            <image
              href={realUserBody}
              x="0"
              y="0"
              width="1920"
              height="1080"
            />

            {/* 2. Levitating Floating Arduino Board with Glowing Holographic Circuit Rings */}
            <g className="anim-arduino-float pointer-events-auto cursor-pointer group">
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
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: ABOUT ME & MASCOT SIGNATURE — 01 // ABOUT ME (IVORY EDITORIAL)
          ========================================================================= */}
      <div className="w-full bg-[#faf9f6] text-[#181818]">
        <section id="about" className="py-24 sm:py-32 px-6 sm:px-12 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
              01 // About Me & Background
            </span>
            <div className="h-px flex-1 bg-neutral-200/80" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Anime Mascot Signature (Interactive 9-direction cursor tracking) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <MascotInteractive />
            </div>

            {/* Right Column: Personal Information & Capstone Highlights */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-semibold block mb-2">
                  AI Engineering &amp; Embedded Systems
                </span>
                <h2 className="font-hn text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-900 leading-[1.15]">
                  กันตภณ วงศ์พรต
                </h2>
                <p className="text-sm font-mono text-neutral-500 mt-1">
                  Kantapon Wongprot (ธันวา) &bull; นักเรียนชั้น ม.6 &bull; ร.ร.เตรียมอุดมศึกษาภาคใต้
                </p>
              </div>

              <div className="space-y-4 text-neutral-700 font-light leading-relaxed text-base sm:text-lg">
                <p>
                  นักเรียน ม.6 อายุ 17 ปี จากโรงเรียนเตรียมอุดมศึกษาภาคใต้ จ.นครศรีธรรมราช มุ่งมั่นพัฒนาในด้าน <strong className="font-semibold text-neutral-900">วิศวกรรมปัญญาประดิษฐ์</strong> และ <strong className="font-semibold text-neutral-900">ระบบสมองกลฝังตัว (Embedded Systems)</strong>
                </p>
                <p>
                  ผ่านค่ายวิศวกรรมระดับชาติ <strong className="font-semibold text-neutral-900">CE NEXT GEN ครั้งที่ 3 (KMITL)</strong>, <strong className="font-semibold text-neutral-900">Engineering Up Skill (ม.เกษตรศาสตร์)</strong> และ <strong className="font-semibold text-neutral-900">Pre-Engineering KMITL</strong>
                </p>
                <p>
                  เชื่อว่า "ทุกสิ่งในโลกนี้ เราสามารถสร้างมันขึ้นมาได้" — โค้ดคือเครื่องมือที่แปลงตรรกะและจินตนาการให้กลายเป็นนวัตกรรมที่ใช้งานได้จริง
                </p>
              </div>

              {/* Capability Focus Tags */}
              <div className="mt-7 flex flex-wrap gap-2">
                {['AI & Machine Learning', 'Computer Vision', 'IoT & Embedded', 'Full-Stack Web', 'Python / C++', 'ประธานชุมนุม Computer & AI'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full border border-neutral-300 text-xs font-mono text-neutral-800 bg-neutral-100 hover:bg-neutral-900 hover:text-white transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats Counter Grid */}
              <div ref={statsRef} className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { num: '6+', label: 'โปรเจกต์ที่พัฒนาจริง' },
                  { num: '5+', label: 'รางวัล/ทุนระดับชาติ' },
                  { num: '4', label: 'ค่ายวิศวกรรมระดับชาติ' },
                  { num: '42', label: 'สมาชิกชุมนุมคอมพิวเตอร์' }
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-xl bg-neutral-900 text-white border border-neutral-800 flex flex-col justify-between group"
                  >
                    <span className="font-hn text-2xl sm:text-3xl font-light text-white tracking-tight flex items-baseline gap-1">
                      {countersVisible ? stat.num : '0'}
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
                    </span>
                    <span className="mt-2 text-[11px] text-neutral-400 font-light leading-snug">
                      {stat.label}
                    </span>
                  </div>
                ))}
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
        className="relative min-h-[100dvh] h-[100dvh] w-full bg-[#050507] text-white flex flex-col items-center justify-between select-none scroll-mt-0 pb-6"
      >
        {/* Studio Spotlight shining directly down seamlessly from above */}
        <Spotlight
          className="-top-24 left-1/2 -translate-x-1/2"
          fill="white"
        />

        {/* Ambient Atmosphere Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-emerald-500/5 rounded-full blur-[170px] pointer-events-none" />

        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#050507] to-transparent pointer-events-none z-20" />

        {/* TOP: Motto Directly Above Robot's Head (Clear, non-overlapping spacing) */}
        <div className="text-center z-20 shrink-0 px-6 pt-16 sm:pt-20">
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-neutral-400 block mb-2">
            02 // Motto & Interactive 3D
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-neutral-400 tracking-tight leading-tight uppercase">
            EVERYTHING IS POSSIBLE.
          </h1>
          <p className="mt-2 text-base sm:text-xl md:text-2xl font-light text-neutral-300 font-hn tracking-wide">
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
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-neutral-500 block mb-6">
              Our Core Philosophy
            </span>

            <MagicText
              text="เราไม่ได้ทำไม่ได้ เราแค่ยังไม่เคยถูกสอนให้ทำ"
              progress={philosophyProgress}
              className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-center leading-[1.4]"
              wordClassName="mx-3 sm:mx-5 my-2 block sm:inline-block"
            />

            <motion.p
              style={{
                opacity: philosophySubtitleOpacity,
                y: philosophySubtitleY,
              }}
              className="mt-8 sm:mt-10 text-xs sm:text-sm md:text-base font-light font-mono text-neutral-400 tracking-wider"
            >
              “We are not incapable; we simply haven't been taught how to do it yet.”
            </motion.p>
          </div>

          {/* Bottom edge fade */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#050507] to-transparent pointer-events-none" />
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: SELECTED WORKS & PROJECTS (ผลงาน & โปรเจกต์) — 03 // PROJECTS
          ========================================================================= */}
      <section id="projects" className="py-36 px-6 sm:px-12 max-w-6xl mx-auto border-t border-neutral-200/80">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
            03 // Selected Projects
          </span>
          <div className="h-px flex-1 bg-neutral-200/80" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h2 className="font-hn text-4xl sm:text-5xl font-normal tracking-tight text-neutral-900">
              ผลงานที่พัฒนา<span className="font-serif italic text-neutral-400">จริง</span>
            </h2>
            <p className="mt-2 text-sm text-neutral-600 font-light">
              คลิกที่การ์ดเพื่อดูสถาปัตยกรรมและรายละเอียดเชิงลึกของแต่ละโครงการ
            </p>
          </div>

          {/* Minimalist Filter Pills */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-neutral-200/80 border border-neutral-300">
            {[
              { key: 'all', label: 'ทั้งหมด' },
              { key: 'ai', label: 'AI / ML' },
              { key: 'hw', label: 'Hardware' },
              { key: 'web', label: 'Web App' }
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setProjectFilter(f.key as typeof projectFilter)}
                className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all ${
                  projectFilter === f.key
                    ? 'bg-neutral-900 text-white shadow-md'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedProject(p)}
              className="group cursor-pointer rounded-2xl bg-white border border-neutral-200/90 p-7 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1.5 hover:border-neutral-900 transition-all duration-300 relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-semibold text-neutral-400 group-hover:text-neutral-900 transition-colors">
                    #{p.number}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-300 font-medium">
                    {p.categoryLabel}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-neutral-900 group-hover:text-emerald-700 transition-colors mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-neutral-600 font-light leading-relaxed mb-6">
                  {p.desc}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 border border-neutral-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-3.5 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 group-hover:text-neutral-900 transition-colors">
                  <span className="font-light text-[11px] truncate max-w-[200px]">{p.metrics}</span>
                  <ExternalLink size={13} className="flex-shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: COMPETITIONS & HONORS (CINEMATIC DARK EXHIBITION GALLERY) — 04 // COMPETITIONS
          ========================================================================= */}
      <CompetitionShowcase
        isDark={true}
        onOpenCertificate={(comp) => setSelectedCompetitionForCert(comp)}
      />

      {/* =========================================================================
          SECTION 5: LEADERSHIP JOURNEY (เส้นทางผู้นำ) — 05 // LEADERSHIP
          ========================================================================= */}
      <section id="leadership" className="py-36 px-6 sm:px-12 max-w-6xl mx-auto border-t border-neutral-200/80">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
            05 // Leadership & Teamwork
          </span>
          <div className="h-px flex-1 bg-neutral-200/80" />
        </div>

        <div className="mb-14">
          <h2 className="font-hn text-4xl sm:text-5xl font-normal tracking-tight text-neutral-900">
            ประสบการณ์<span className="font-serif italic text-neutral-400">การเป็นผู้นำ</span>
          </h2>
          <p className="mt-2 text-sm text-neutral-600 font-light">
            บทบาทการบริหารทีม การจัดกิจกรรมวิชาการ และการถ่ายทอดความรู้สู่ชุมชนนักเรียน
          </p>
        </div>

        {/* Aceternity UI Scroll-Linked Beam Timeline */}
        <div className="w-full">
          <Timeline
            data={[
              {
                title: "2024 — ปัจจุบัน",
                content: (
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-3">
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-neutral-900 text-white font-medium shadow-sm">
                        ประธานชุมนุมคอมพิวเตอร์ & AI
                      </span>
                      <span className="text-xs font-mono text-neutral-500">Club President</span>
                    </div>
                    <p className="text-neutral-700 text-sm md:text-base font-light mb-6 leading-relaxed">
                      ดูแลและให้คำปรึกษาสมาชิก 42 คน วางโครงสร้างหลักสูตรและจัดเวิร์กช็อป Python & Machine Learning 6 ครั้ง/เทอม พร้อมริเริ่มระบบพี่สอนน้องจนสมาชิกเพิ่มขึ้น 2 เท่า
                    </p>
                    <div className="mb-6 space-y-2">
                      <div className="flex gap-2 items-center text-neutral-700 text-xs md:text-sm">
                        <span className="text-emerald-600 font-bold">✓</span> จัดเวิร์กช็อป Python & Machine Learning เจาะลึก 6 หัวข้อ
                      </div>
                      <div className="flex gap-2 items-center text-neutral-700 text-xs md:text-sm">
                        <span className="text-emerald-600 font-bold">✓</span> ก่อตั้ง AI Study Group ต่อยอดสร้างผลงานโครงงานระดับประเทศ
                      </div>
                      <div className="flex gap-2 items-center text-neutral-700 text-xs md:text-sm">
                        <span className="text-emerald-600 font-bold">✓</span> ริเริ่มระบบ Mentor & Mentee ขยายสมาชิกสู่ 42 คน
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04)]">
                        <img
                          src={compHackathonLab}
                          alt="AI Workshop & Mentoring"
                          className="rounded-lg object-cover h-40 md:h-52 w-full transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="p-3 text-[11px] font-mono text-neutral-600 bg-neutral-50/80 border-t border-neutral-100 flex justify-between items-center">
                          <span>AI Lab & Study Group</span>
                          <span className="text-neutral-400">42 Members</span>
                        </div>
                      </div>
                      <div className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04)]">
                        <img
                          src={compAiPresentation}
                          alt="Technical Presentation"
                          className="rounded-lg object-cover h-40 md:h-52 w-full transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="p-3 text-[11px] font-mono text-neutral-600 bg-neutral-50/80 border-t border-neutral-100 flex justify-between items-center">
                          <span>Workshop Presentation</span>
                          <span className="text-neutral-400">Python & ML</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                title: "2024",
                content: (
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-3">
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-neutral-900 text-white font-medium shadow-sm">
                        หัวหน้าทีมแข่งขันหุ่นยนต์ระดับภาค
                      </span>
                      <span className="text-xs font-mono text-neutral-500">Team Captain</span>
                    </div>
                    <p className="text-neutral-700 text-sm md:text-base font-light mb-6 leading-relaxed">
                      วางแผนงาน จัดสรรบทบาทด้าน Hardware, Circuit, และ Code ให้ทีม 8 คน บริหารการซ้อมต่อเนื่อง 3 เดือน จนคว้ารางวัลรองชนะเลิศอันดับ 1 การแข่งขันหุ่นยนต์กู้ภัยระดับภาค 2567
                    </p>
                    <div className="mb-6 space-y-2">
                      <div className="flex gap-2 items-center text-neutral-700 text-xs md:text-sm">
                        <span className="text-emerald-600 font-bold">✓</span> วางสถาปัตยกรรมระบบควบคุมแบบผสาน (ESP32 + Arduino)
                      </div>
                      <div className="flex gap-2 items-center text-neutral-700 text-xs md:text-sm">
                        <span className="text-emerald-600 font-bold">✓</span> ฝึกฝนและแก้โจทย์เฉพาะหน้าในสนามจริงร่วมกับทีม 8 คน
                      </div>
                      <div className="flex gap-2 items-center text-neutral-700 text-xs md:text-sm">
                        <span className="text-emerald-600 font-bold">✓</span> คว้ารางวัลรองชนะเลิศอันดับ 1 ระดับภาค 2567
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04)]">
                        <img
                          src={compRobotRescue}
                          alt="Robotics Rescue Competition"
                          className="rounded-lg object-cover h-40 md:h-52 w-full transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="p-3 text-[11px] font-mono text-neutral-600 bg-neutral-50/80 border-t border-neutral-100 flex justify-between items-center">
                          <span>Rescue Robot Field Trial</span>
                          <span className="text-emerald-600 font-medium">1st Runner-up</span>
                        </div>
                      </div>
                      <div className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04)]">
                        <img
                          src={compAwardPodium}
                          alt="Award Ceremony Podium"
                          className="rounded-lg object-cover h-40 md:h-52 w-full transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="p-3 text-[11px] font-mono text-neutral-600 bg-neutral-50/80 border-t border-neutral-100 flex justify-between items-center">
                          <span>Award Ceremony</span>
                          <span className="text-neutral-400">Regional Competition</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                title: "2023",
                content: (
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-3">
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-neutral-900 text-white font-medium shadow-sm">
                        ผู้ร่วมก่อตั้งค่าย "Code for Junior"
                      </span>
                      <span className="text-xs font-mono text-neutral-500">Camp Founder</span>
                    </div>
                    <p className="text-neutral-700 text-sm md:text-base font-light mb-6 leading-relaxed">
                      ริเริ่มค่ายสอนพื้นฐานการเขียนโปรแกรมให้รุ่นน้อง ม.ต้น 60 คน ระดมทีมวิทยากรอาสา 12 คน และจัดทำหลักสูตรแบบ Hands-on gamification ปลูกฝังแรงบันดาลใจด้านวิศวกรรมคอมพิวเตอร์
                    </p>
                    <div className="mb-6 space-y-2">
                      <div className="flex gap-2 items-center text-neutral-700 text-xs md:text-sm">
                        <span className="text-emerald-600 font-bold">✓</span> จัดการอบรมเชิงปฏิบัติการ (Coding Workshop) สำหรับน้อง ม.ต้น 60 คน
                      </div>
                      <div className="flex gap-2 items-center text-neutral-700 text-xs md:text-sm">
                        <span className="text-emerald-600 font-bold">✓</span> ออกแบบสื่อการเรียนรู้แบบ Game-based Learning
                      </div>
                      <div className="flex gap-2 items-center text-neutral-700 text-xs md:text-sm">
                        <span className="text-emerald-600 font-bold">✓</span> สถิติความพึงพอใจโครงการสูงถึง 96.4%
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04)]">
                        <img
                          src={compAiPresentation}
                          alt="Code for Junior Workshop"
                          className="rounded-lg object-cover h-40 md:h-52 w-full transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="p-3 text-[11px] font-mono text-neutral-600 bg-neutral-50/80 border-t border-neutral-100 flex justify-between items-center">
                          <span>Junior Coding Camp</span>
                          <span className="text-neutral-400">60 Students</span>
                        </div>
                      </div>
                      <div className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04)]">
                        <img
                          src={compHackathonLab}
                          alt="Camp Hackathon Mentoring"
                          className="rounded-lg object-cover h-40 md:h-52 w-full transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="p-3 text-[11px] font-mono text-neutral-600 bg-neutral-50/80 border-t border-neutral-100 flex justify-between items-center">
                          <span>Hackathon Mentoring</span>
                          <span className="text-neutral-400">12 Mentors</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                title: "2022",
                content: (
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-3">
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-neutral-900 text-white font-medium shadow-sm">
                        คณะกรรมการนักเรียน ฝ่ายเทคโนโลยีและสารสนเทศ
                      </span>
                      <span className="text-xs font-mono text-neutral-500">School Committee</span>
                    </div>
                    <p className="text-neutral-700 text-sm md:text-base font-light mb-6 leading-relaxed">
                      ร่วมพัฒนาระบบเช็กชื่อกิจกรรมออนไลน์ และดูแลงานถ่ายทอดสดระบบภาพและเสียงของโรงเรียนตลอดปีการศึกษา
                    </p>
                    <div className="space-y-2">
                      <div className="flex gap-2 items-center text-neutral-700 text-xs md:text-sm">
                        <span className="text-emerald-600 font-bold">✓</span> พัฒนา Web Application สำหรับเช็กชื่อกิจกรรมโรงเรียน
                      </div>
                      <div className="flex gap-2 items-center text-neutral-700 text-xs md:text-sm">
                        <span className="text-emerald-600 font-bold">✓</span> ควบคุมระบบมิกเซอร์และสวิตเชอร์ถ่ายทอดสดงานประจำปี
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: AWARDS & CERTIFICATES (เกียรติบัตร & รางวัล) — 06 // AWARDS
          ========================================================================= */}
      <section id="awards" className="py-36 px-6 sm:px-12 max-w-6xl mx-auto border-t border-neutral-200/80">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
            06 // Honors & Awards
          </span>
          <div className="h-px flex-1 bg-neutral-200/80" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-hn text-4xl sm:text-5xl font-normal tracking-tight text-neutral-900">
              เกียรติประวัติ & <span className="font-serif italic text-neutral-400">ใบรับรอง</span>
            </h2>
            <p className="mt-2 text-sm text-neutral-600 font-light">
              รางวัลจากการแข่งขันระดับชาติ ระดับภูมิภาค และการสอบวัดระดับทางวิชาการ
            </p>
          </div>

          <span className="text-xs font-mono text-neutral-500">
            คลิกที่การ์ดเพื่อดูรายละเอียดการรับรอง
          </span>
        </div>

        {/* Minimal Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              category: 'NSC 2026 — National',
              title: 'ได้รับทุนสนับสนุน Smart Songthaew',
              subtitle: 'การแข่งขันพัฒนาโปรแกรมคอมพิวเตอร์แห่งประเทศไทย ครั้งที่ 28',
              org: 'สวทช. (NSTDA) ร่วมกับ วช.',
              year: '2569'
            },
            {
              category: 'ICS You Camp 2026',
              title: 'รองชนะเลิศ อันดับ 2 — Pitching Project',
              subtitle: 'กิจกรรม ICS YOU CAMP การแข่งขัน Pitching Project',
              org: 'ภาควิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์ ม.เกษตรศาสตร์',
              year: '2569'
            },
            {
              category: 'AI For Thai Hackathon',
              title: 'Finalist รอบชิงชนะเลิศ',
              subtitle: 'AI For Thai Hackathon 2026 แบบ 24 ชั่วโมง',
              org: 'สาขาวิทยาศาสตร์การคำนวณ คณะวิทยาศาสตร์ ม.อ.',
              year: '2569'
            },
            {
              category: 'THE BEST Award',
              title: 'รางวัล THE BEST ด้านการจัดกิจกรรมที่เป็นเลิศ',
              subtitle: 'โครงการสารวัตรนักเรียนไซเบอร์ งาน "โตไปไม่สูบ Festival" ระดับเครือข่ายภาคใต้',
              org: 'สสส. ร่วมกับ ร.ร.เตรียมอุดมศึกษาภาคใต้',
              year: '2568'
            },
            {
              category: 'National Training Camp',
              title: 'ผ่านค่าย CE NEXT GEN ครั้งที่ 3',
              subtitle: 'ค่ายฝึกอบรมเชิงปฏิบัติการด้านวิศวกรรมคอมพิวเตอร์',
              org: 'ภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์ สจล.',
              year: '2568'
            },
            {
              category: 'Pre-Engineering KMITL',
              title: 'ผ่านหลักสูตร Computer Programming',
              subtitle: 'โครงการเตรียมวิศวกรรม KMITL Pre-Engineering School Program 2025',
              org: 'สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง',
              year: '2568'
            }
          ].map((a) => (
            <div
              key={a.title}
              onClick={() => setSelectedAward(a)}
              className="p-6 rounded-2xl bg-white border border-neutral-200/90 hover:border-neutral-900 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded font-medium">
                    {a.category}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-500 font-medium">
                    {a.year}
                  </span>
                </div>
                <h3 className="font-semibold text-neutral-900 text-base leading-snug">{a.title}</h3>
                <p className="text-xs text-neutral-600 font-light mt-1.5 leading-relaxed">{a.subtitle}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
                <span className="truncate">{a.org}</span>
                <span className="text-[11px] font-mono text-emerald-600 font-medium flex items-center gap-1">
                  <ShieldCheck size={13} /> Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: GRAND FINALE CONTACT HUB (DEEP RICH BLACK FINALE) — 07 // CONTACT
          ========================================================================= */}
      <section id="contact" className="py-36 px-6 sm:px-12 bg-[#08080a] text-white text-center border-t border-neutral-900">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 font-mono">
            <span>07 // Contact & Inquiries</span>
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

          {/* Social / External Links */}
          <div className="flex items-center justify-center gap-3 flex-wrap mb-16">
            {[
              { label: 'GitHub', href: 'https://github.com/Kantapon2030' },
              { label: 'Instagram', href: 'https://instagram.com/kantapon_020' },
              { label: 'Facebook', href: 'https://facebook.com/kantapon.wongprot' }
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 hover:bg-white hover:text-neutral-900 hover:border-white transition-all shadow-sm"
              >
                {s.label}
              </a>
            ))}
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
            © 2025 กันตภณ วงศ์พรต (Kantapon Wongprot) — Computer Engineering Portfolio
          </div>
        </div>
      </section>

      {/* =========================================================================
          MODAL 1: PROJECT DETAIL MODAL
          ========================================================================= */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-[#141418] rounded-3xl p-8 shadow-2xl border border-neutral-800 relative flex flex-col max-h-[90vh] overflow-y-auto text-white"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute right-6 top-6 p-1.5 rounded-full text-neutral-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-mono text-white font-semibold px-2 py-1 rounded bg-neutral-800 border border-neutral-700">
                #{selectedProject.number}
              </span>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  {selectedProject.categoryLabel}
                </span>
                <h3 className="text-xl font-medium text-white">{selectedProject.title}</h3>
              </div>
            </div>

            <div className="my-4 p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-200 font-mono">
              <strong className="text-emerald-400">ผลลัพธ์สำคัญ:</strong> {selectedProject.metrics}
            </div>

            <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
              {selectedProject.fullDesc}
            </p>

            <div className="mb-6">
              <span className="text-xs font-mono text-neutral-400 block mb-2">เทคโนโลยีที่ใช้:</span>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full bg-neutral-800 text-neutral-200 border border-neutral-700 font-mono text-[11px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-neutral-800 flex items-center justify-between">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-neutral-200 transition-colors"
              >
                ปิดหน้าต่าง
              </button>
              <a
                href="#contact"
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-xs font-medium text-black transition-colors"
              >
                สอบถามเกี่ยวกับโครงงานนี้
              </a>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: AWARD DETAIL MODAL
          ========================================================================= */}
      {selectedAward && (
        <div
          onClick={() => setSelectedAward(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#141418] rounded-3xl p-7 shadow-2xl border border-neutral-800 relative text-left text-white"
          >
            <button
              onClick={() => setSelectedAward(null)}
              className="absolute right-6 top-6 p-1.5 rounded-full text-neutral-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 mb-4 text-emerald-400">
              <Award size={20} />
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                Official Honor Record
              </span>
            </div>
            <h3 className="text-lg font-medium text-white mb-1">{selectedAward.title}</h3>
            <p className="text-sm text-neutral-400 font-light mb-4">{selectedAward.subtitle}</p>
            
            <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-2 text-xs font-mono text-neutral-300 mb-6">
              <div className="flex justify-between">
                <span className="text-neutral-400">หน่วยงานผู้จัด:</span>
                <span className="font-medium text-neutral-200">{selectedAward.org}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">ปีการศึกษา:</span>
                <span className="font-medium text-neutral-200">{selectedAward.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">สถานะ:</span>
                <span className="text-emerald-400 font-medium inline-flex items-center gap-1">
                  <ShieldCheck size={12} /> ยืนยันเอกสารแล้ว
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedAward(null)}
              className="w-full py-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium transition-colors"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: CERTIFICATE HIGH-RESOLUTION PREVIEW MODAL
          ========================================================================= */}
      <CertificateModal
        competition={selectedCompetitionForCert}
        onClose={() => setSelectedCompetitionForCert(null)}
      />
    </div>
  );
}
