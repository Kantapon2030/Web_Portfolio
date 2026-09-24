import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  Award,
  Maximize2,
  X,
  Radio,
  Cpu,
  Cloud,
  Globe,
  Users,
  CheckCircle2,
  Layers,
  ChevronDown,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Bot,
  Eye,
  Activity,
  Gauge,
  Compass,
  type LucideIcon,
} from 'lucide-react';

import presentationImg from '../assets/smart-songthaew-presentation.jpg';
import certificateImg from '../assets/smart-songthaew-certificate.png';
import robotPresentationImg from '../assets/comp_robot_rescue.jpg';
import robotCertImg from '../assets/cert_robotics_award.jpg';
import aiPresentationImg from '../assets/comp_ai_presentation.jpg';
import aiCertImg from '../assets/cert_ai_gold_award.jpg';
import mascotGuide from '../assets/guide_mascot_tight.png';

interface ProjectItem {
  id: string;
  indexTag: string;
  badge: string;
  badgeType: 'nsc' | 'robot' | 'ai';
  title: string;
  thaiSubtitle: string;
  description: string;
  presentationImg: string;
  presentationCaption: string;
  certificateImg: string;
  certificateCaption: string;
  role: string;
  year: string;
  type: string;
  recognition: string;
  organizer: string;
  technologies: string[];
  responsibilities: string[];
  stations: {
    step: string;
    name: string;
    sub: string;
    icon: LucideIcon;
  }[];
  mascotTip: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'smart-songthaew',
    indexTag: '01 / 03 · NSC 2026',
    badge: 'NSC 2026 · SELECTED',
    badgeType: 'nsc',
    title: 'Smart Songthaew Platform',
    thaiSubtitle: 'แพลตฟอร์มสมาร์ทสองแถวเพื่อการติดตามยานพาหนะแบบเรียลไทม์',
    description:
      'แพลตฟอร์มติดตามรถสองแถวแบบเรียลไทม์ เชื่อมต่ออุปกรณ์ IoT ผ่าน LoRa และ Cloud เพื่อช่วยให้ผู้โดยสารตรวจสอบตำแหน่งรถและวางแผนการเดินทางได้สะดวกขึ้น ลดปัญหาความไม่แน่นอนในการรอรถสาธารณะในภูมิภาค',
    presentationImg: presentationImg,
    presentationCaption: 'การนำเสนอผลงานต่อหน้าคณะกรรมการ · NSC 2026 ภาคใต้',
    certificateImg: certificateImg,
    certificateCaption: 'เกียรติบัตรทุนสนับสนุนการพัฒนาผลงาน · สวทช. และ วช.',
    role: 'Solo Developer (ผู้พัฒนาเดี่ยว 100%)',
    year: '2026 (พ.ศ. 2569)',
    type: 'โปรแกรมประยุกต์ใช้งาน ระดับนักเรียน',
    recognition: 'ผ่านการคัดเลือกและได้รับทุนสนับสนุนการพัฒนาผลงาน (NSC 2026)',
    organizer: 'สวทช. (NSTDA) ร่วมกับ วช.',
    technologies: [
      'IoT & Microcontroller',
      'LoRa Transmission',
      'Cloud Architecture',
      'Real-time Web App',
      'Vehicle Telemetry',
      '3D Printing Enclosure',
    ],
    responsibilities: [
      'วิเคราะห์ปัญหาการรอรถสองแถวและออกแบบสถาปัตยกรรมระบบทั้งฮาร์ดแวร์และซอฟต์แวร์',
      'ออกแบบและประกอบวงจร IoT GPS Tracking สำหรับติดตั้งบนยานพาหนะจริง',
      'ทดสอบการรับ-ส่งข้อมูลระยะไกลด้วยสัญญาณ LoRa สู่ระบบเครือข่าย',
      'พัฒนาระบบ Cloud Backend เพื่อรับข้อมูลพิกัดและกระจายข้อมูลแบบเรียลไทม์',
      'พัฒนา Web Application ให้ผู้โดยสารเปิดใช้งานเพื่อดูตำแหน่งรถได้โดยไม่ต้องลงแอปเพิ่ม',
      'ออกแบบและพิมพ์ 3D Enclosure ป้องกันแผงวงจร',
      'จัดทำเอกสารข้อเสนอโครงการและนำเสนอผลงานต่อหน้าคณะกรรมการผู้ทรงคุณวุฒิ',
    ],
    stations: [
      { step: '01', name: 'IoT Device', sub: 'กล่องระบุตำแหน่งบนรถสองแถว', icon: Cpu },
      { step: '02', name: 'LoRa Network', sub: 'ส่งข้อมูลระยะไกล ไม่พึ่งพาซิม', icon: Radio },
      { step: '03', name: 'Cloud Platform', sub: 'ประมวลผลพิกัดและคำนวณแบบสด', icon: Cloud },
      { step: '04', name: 'Web Application', sub: 'แสดงผลแผนที่เรียลไทม์บนเว็บ', icon: Globe },
      { step: '05', name: 'Passenger', sub: 'ผู้โดยสารเช็กตำแหน่งและวางแผนได้ทันที', icon: Users },
    ],
    mascotTip: 'โปรเจกต์นี้ได้รับทุนสนับสนุนจาก สวทช. และ วช. ครับ!',
  },
  {
    id: 'rescue-robot',
    indexTag: '02 / 03 · ROBOTICS CONTEST',
    badge: 'ROBOTICS · RUNNER-UP',
    badgeType: 'robot',
    title: 'Autonomous Rescue Robot',
    thaiSubtitle: 'หุ่นยนต์ค้นหาและกู้ภัยอัตโนมัติด้วยระบบขับเคลื่อน 4WD และเซนเซอร์รอบทิศทาง',
    description:
      'หุ่นยนต์อัตโนมัติสำหรับสำรวจพื้นที่ภัยพิบัติ ออกแบบโครงสร้างขับเคลื่อน 4WD ผสานระบบประมวลผลเซนเซอร์หลายชนิดเพื่อการตรวจจับผู้ประสบภัยและหลบหลีกสิ่งกีดขวางแบบเรียลไทม์บนสนามจำลอง',
    presentationImg: robotPresentationImg,
    presentationCaption: 'การแข่งขันหุ่นยนต์กู้ภัยภาคสนาม · การแข่งขันระดับภาค 2567',
    certificateImg: robotCertImg,
    certificateCaption: 'รางวัลรองชนะเลิศอันดับ 1 · การแข่งขันหุ่นยนต์กู้ภัย ระดับภาค',
    role: 'Hardware & Control Lead (ผู้ออกแบบและเขียนโปรแกรมควบคุม)',
    year: '2024 (พ.ศ. 2567)',
    type: 'การแข่งขันหุ่นยนต์ ระดับมัธยมศึกษา',
    recognition: 'รองชนะเลิศ อันดับ 1 การแข่งขันหุ่นยนต์กู้ภัย ระดับภาค 2567',
    organizer: 'สำนักงานเขตพื้นที่การศึกษามัธยมศึกษา (สพม.)',
    technologies: [
      'Autonomous Robotics',
      'PID Motor Control',
      'Sensor Fusion (IMU + Ultrasonic)',
      'Obstacle Avoidance',
      'C++ / Arduino & ESP32',
      'Custom Chassis Design',
    ],
    responsibilities: [
      'ออกแบบกลไกโครงสร้างแชสซีขับเคลื่อน 4WD สำหรับเคลื่อนที่บนพื้นผิวขรุขระ',
      'คำนวณและปรับจูนอัลกอริทึม PID Control ให้หุ่นยนต์รักษาสมดุลและทิศทางได้แม่นยำ',
      'ผสานสัญญาณเซนเซอร์อัลตราโซนิกและไจโรสโคปเพื่อการตัดสินใจเลี้ยวหลบหลีกสิ่งกีดขวาง',
      'ทดสอบภาคสนามจำลองสถานการณ์ภัยพิบัติและการค้นหาผู้ประสบภัย',
      'คุมระบบขับเคลื่อนและร่วมแข่งขันจนคว้ารางวัลรองชนะเลิศอันดับ 1',
    ],
    stations: [
      { step: '01', name: 'Environment Sensing', sub: 'ตรวจจับอุณหภูมิ ก๊าซ และสิ่งกีดขวาง', icon: Activity },
      { step: '02', name: 'Microcontroller Logic', sub: 'ประมวลผล PID และตัดสินใจอัตโนมัติ', icon: Cpu },
      { step: '03', name: '4WD Mobility System', sub: 'ขับเคลื่อนข้ามสิ่งกีดขวางและทางลาด', icon: Bot },
      { step: '04', name: 'Telemetry Link', sub: 'ส่งข้อมูลสถานะตัวเครื่องกลับศูนย์สั่งการ', icon: Radio },
      { step: '05', name: 'Search & Rescue', sub: 'ระบุตำแหน่งเป้าหมายได้อย่างแม่นยำ', icon: Compass },
    ],
    mascotTip: 'หุ่นยนต์ตัวนี้ลงแข่งในสนามจำลองภัยพิบัติและคว้าอันดับ 1 ระดับภาคมาได้ครับ!',
  },
  {
    id: 'edge-ai',
    indexTag: '03 / 03 · NATIONAL EXHIBITION',
    badge: 'AI EXHIBITION · GOLD MEDAL',
    badgeType: 'ai',
    title: 'Edge AI Vision Telemetry',
    thaiSubtitle: 'ระบบปัญญาประดิษฐ์ตรวจจับวัตถุและวิเคราะห์ภาพบนอุปกรณ์ประมวลผลขนาดเล็ก',
    description:
      'โครงงานพัฒนาโมเดล Deep Learning และระบบ Computer Vision สำหรับประมวลผลภาพบนบอร์ด Edge Computing โดยตรง เพื่อการตรวจจับวัตถุและส่งพิกัดแบบเรียลไทม์โดยไม่ต้องพึ่งพาระบบคลาวด์ความเร็วสูง',
    presentationImg: aiPresentationImg,
    presentationCaption: 'การนำเสนอโครงงานคอมพิวเตอร์และปัญญาประดิษฐ์ · งานศิลปหัตถกรรมระดับชาติ',
    certificateImg: aiCertImg,
    certificateCaption: 'เหรียญทอง โครงงานคอมพิวเตอร์ · งานศิลปหัตถกรรมนักเรียน ระดับชาติ',
    role: 'AI & Algorithm Developer (ผู้พัฒนาโมเดล AI และระบบประมวลผล)',
    year: '2023 (พ.ศ. 2566)',
    type: 'โครงงานคอมพิวเตอร์และปัญญาประดิษฐ์',
    recognition: 'เหรียญทอง โครงงานคอมพิวเตอร์ งานศิลปหัตถกรรมนักเรียน ระดับชาติ ครั้งที่ 70',
    organizer: 'สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ.)',
    technologies: [
      'Deep Learning & CNN',
      'Computer Vision (OpenCV)',
      'Edge Computing (Raspberry Pi / Jetson)',
      'YOLO Object Detection',
      'Python & PyTorch',
      'Real-time Video Pipeline',
    ],
    responsibilities: [
      'ออกแบบสถาปัตยกรรมโมเดล Deep Learning และจัดเตรียมชุดข้อมูลสำหรับฝึกสอน',
      'ปรับจูนโมเดลให้มีขนาดกะทัดรัด (Model Quantization) เพื่อรันบนบอร์ด Edge ได้รวดเร็ว',
      'พัฒนาระบบประมวลผลวิดีโอแบบสด (Real-time Video Pipeline) ความหน่วงต่ำ',
      'ทดสอบประสิทธิภาพความแม่นยำ (mAP) และ Frame Rate ในสภาวะแสงที่หลากหลาย',
      'จัดทำเล่มรายงานเชิงวิชาการและนำเสนอผลงานจนได้รับรางวัลเหรียญทองระดับชาติ',
    ],
    stations: [
      { step: '01', name: 'Camera Stream', sub: 'รับสัญญาณภาพความละเอียดสูงจากเลนส์กล้อง', icon: Eye },
      { step: '02', name: 'Edge AI Model', sub: 'รันโมเดล Object Detection บนชิปประมวลผล', icon: Cpu },
      { step: '03', name: 'Spatial Tracking', sub: 'คำนวณเวกเตอร์พิกัดและความเร็ววัตถุ', icon: Gauge },
      { step: '04', name: 'Telemetry Stream', sub: 'ส่งผลการวิเคราะห์ผ่านเครือข่ายความหน่วงต่ำ', icon: Radio },
      { step: '05', name: 'Action Decision', sub: 'สั่งการแจ้งเตือนและบันทึกสถิติแบบสด', icon: Activity },
    ],
    mascotTip: 'โครงงานนี้ได้เหรียญทองระดับชาติในงานศิลปหัตถกรรมนักเรียนครับ!',
  },
];

export const SmartSongthaewShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = slide next (right-to-left), -1 = prev
  const [isPaused, setIsPaused] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mascotBubbleText, setMascotBubbleText] = useState(PROJECTS[0].mascotTip);

  const runwayRef = useRef<HTMLDivElement>(null);

  const currentProject = PROJECTS[currentIndex];

  // Scroll animations for the giant "PROJECT" runway
  const { scrollYProgress: runwayProgress } = useScroll({
    target: runwayRef,
    offset: ['start end', 'end start'],
  });

  const projectTextX = useTransform(runwayProgress, [0, 1], [-80, 80]);
  const projectTextOpacity = useTransform(runwayProgress, [0.1, 0.4, 0.7, 0.95], [0.3, 1, 1, 0.3]);
  const projectScale = useTransform(runwayProgress, [0.1, 0.5], [0.94, 1.02]);

  // Navigate to next project (right-to-left)
  const goToNext = useCallback(() => {
    setDirection(1);
    setIsExpanded(false);
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  }, []);

  // Navigate to previous project (left-to-right)
  const goToPrev = useCallback(() => {
    setDirection(-1);
    setIsExpanded(false);
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  }, []);

  const goToSlide = (idx: number) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setIsExpanded(false);
    setCurrentIndex(idx);
  };

  const [isSectionInView, setIsSectionInView] = useState(false);
  const showcaseSectionRef = useRef<HTMLDivElement>(null);

  // Detect when project showcase is actively in viewport before running auto-slide
  useEffect(() => {
    const el = showcaseSectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Sync mascot bubble text on project change
  useEffect(() => {
    setMascotBubbleText(currentProject.mascotTip);
  }, [currentProject]);

  // High-performance 5-second automatic sliding ticker ONLY when section is visible in viewport
  useEffect(() => {
    const shouldPause = isPaused || certModalOpen || isExpanded || !isSectionInView;
    if (shouldPause) return;

    const timer = setTimeout(() => {
      goToNext();
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex, isPaused, certModalOpen, isExpanded, isSectionInView, goToNext]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && certModalOpen) {
        setCertModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [certModalOpen]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (certModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [certModalOpen]);

  const handleMascotClick = () => {
    const messages = [
      'ผมเป็นคนลงมือพัฒนาเองทั้งหมดเลยครับ!',
      'ลองกดขยายดูเกียรติบัตรฉบับเต็มได้เลยนะครับ',
      'กดปุ่ม "ดูเพิ่มเติม" เพื่อดูสถาปัตยกรรมระบบได้เลย!',
      currentProject.mascotTip,
    ];
    const nextMsg = messages[Math.floor(Math.random() * messages.length)];
    setMascotBubbleText(nextMsg);
  };

  // Variants for brisk, sleek right-to-left slide transition ("เลื่อนปู้ดๆ ไปเลย")
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 280, damping: 28 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring' as const, stiffness: 280, damping: 28 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    }),
  };

  return (
    <div className="w-full bg-[#050507]">
      {/* Seamless Transition Runway from Dark Section Above into Pure White */}
      <div className="w-full h-40 sm:h-64 bg-gradient-to-b from-[#050507] to-white" />

      {/* =========================================================================
          SECTION: SCROLL DOWN RUNWAY WITH GIANT ANIMATED "PROJECT" TYPOGRAPHY
          ========================================================================= */}
      <section
        ref={runwayRef}
        className="w-full bg-white text-neutral-900 py-16 sm:py-24 px-6 sm:px-12 flex flex-col items-center justify-center relative overflow-hidden select-none"
      >
        <div className="max-w-6xl w-full flex flex-col items-center text-center relative z-10">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>03 // FEATURED WORK & INNOVATIONS</span>
          </div>

          {/* Giant Animated "PROJECT" Typography */}
          <div className="w-full overflow-hidden py-4 sm:py-6">
            <motion.h2
              style={{
                x: projectTextX,
                opacity: projectTextOpacity,
                scale: projectScale,
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
              }}
              className="font-black text-6xl sm:text-8xl md:text-9xl lg:text-[13rem] tracking-tighter uppercase leading-none text-neutral-900 select-none"
            >
              <span className="text-red-600">P</span>ROJECT
            </motion.h2>
          </div>

          {/* Scroll Down Guide Prompt */}
          <div className="mt-4 sm:mt-6 flex flex-col items-center gap-2 text-xs sm:text-sm font-mono text-neutral-500">
            <span className="tracking-widest uppercase text-neutral-400">
              SCROLL DOWN TO EXPLORE
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-7 h-7 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-red-600 shadow-xs"
            >
              <ArrowDown size={14} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN SHOWCASE SECTION WITH AUTO-SLIDING CAROUSEL & RED CORNER BRACKETS
          ========================================================================= */}
      <section
        ref={showcaseSectionRef}
        id="projects"
        style={{ overflowAnchor: 'none' }}
        className="w-full bg-white text-neutral-900 pb-20 sm:pb-32 px-6 sm:px-12 lg:px-16"
      >
        <div className="max-w-6xl mx-auto">
          {/* Carousel Navigation Toolbar & Slide Ticker (Top Bar) */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-red-600 tracking-wider">
                {currentProject.indexTag}
              </span>
              <span className="text-neutral-300">|</span>
              <span className="text-xs font-mono text-neutral-400">
                {isPaused ? '⏸ หยุดชั่วคราว (Hovered)' : '▶ เลื่อนอัตโนมัติทุก 5 วิ'}
              </span>
            </div>

            {/* Navigation Buttons & Progress Dots */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              {/* Pagination Dots */}
              <div className="flex items-center gap-1.5 mr-2">
                {PROJECTS.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => goToSlide(idx)}
                    className="p-1 touch-manipulation group flex items-center justify-center focus-visible:outline-none"
                    title={`ไปที่ ${p.title}`}
                    aria-label={`Slide ${idx + 1}`}
                  >
                    <span
                      className={`h-2 rounded-full transition-all duration-300 block ${
                        idx === currentIndex
                          ? 'w-7 bg-red-600'
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
                  className="w-9 h-9 sm:w-10 sm:h-10 min-w-[36px] min-h-[36px] rounded-full bg-neutral-100 hover:bg-red-50 hover:text-red-600 border border-neutral-200 flex items-center justify-center text-neutral-700 transition-colors shadow-xs active:scale-95 touch-manipulation"
                  title="ผลงานก่อนหน้า (Previous)"
                  aria-label="Previous project"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="w-9 h-9 sm:w-10 sm:h-10 min-w-[36px] min-h-[36px] rounded-full bg-neutral-100 hover:bg-red-50 hover:text-red-600 border border-neutral-200 flex items-center justify-center text-neutral-700 transition-colors shadow-xs active:scale-95 touch-manipulation"
                  title="ผลงานถัดไป (Next)"
                  aria-label="Next project"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Main Card Wrapper (With Red Corner Brackets + Pause on Hover) */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative p-6 sm:p-10 lg:p-12 bg-white rounded-3xl transition-all shadow-sm border border-neutral-100 overflow-hidden"
          >
            {/* 5-Second Linear Progress Bar (At Top Edge — GPU Animated) */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-neutral-100 overflow-hidden">
              <div
                key={`progress-${currentIndex}`}
                className="h-full bg-red-500 origin-left"
                style={{
                  transformOrigin: '0% 50%',
                  animation: 'showcaseProgress 5s linear forwards',
                  animationPlayState: (isPaused || certModalOpen || isExpanded) ? 'paused' : 'running',
                }}
              />
            </div>

            {/* Red Corner Frame Accents (Corner Brackets with subtle red glow) */}
            {/* Top-Left Corner */}
            <div
              aria-hidden="true"
              className="absolute -top-1 -left-1 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 border-red-500 rounded-tl-xl shadow-[0_0_12px_rgba(239,68,68,0.35)] pointer-events-none z-10"
            />
            {/* Top-Right Corner */}
            <div
              aria-hidden="true"
              className="absolute -top-1 -right-1 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 border-red-500 rounded-tr-xl shadow-[0_0_12px_rgba(239,68,68,0.35)] pointer-events-none z-10"
            />
            {/* Bottom-Left Corner */}
            <div
              aria-hidden="true"
              className="absolute -bottom-1 -left-1 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-l-2 border-red-500 rounded-bl-xl shadow-[0_0_12px_rgba(239,68,68,0.35)] pointer-events-none z-10"
            />
            {/* Bottom-Right Corner */}
            <div
              aria-hidden="true"
              className="absolute -bottom-1 -right-1 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 border-red-500 rounded-br-xl shadow-[0_0_12px_rgba(239,68,68,0.35)] pointer-events-none z-10"
            />

            {/* Subtle Red Ambient Glow behind corners */}
            <div
              aria-hidden="true"
              className="absolute -top-6 -left-6 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none"
            />

            {/* Slide Content with AnimatePresence for Smooth Right-to-Left Gliding + Mobile Touch Swipe */}
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentProject.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
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
                <div className="flex items-center gap-3 mb-8 sm:mb-10">
                  <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
                    03 // SELECTED PROJECT
                  </span>
                  <div className="h-px flex-1 bg-neutral-200" />
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>{currentProject.badge}</span>
                  </div>
                </div>

                {/* Section Header */}
                <div className="max-w-3xl mb-10 sm:mb-12">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-50/80 border border-red-200 text-red-700 text-xs font-mono mb-4">
                    <Award size={14} className="text-red-600" />
                    <span>{currentProject.recognition}</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900 leading-[1.2]">
                    {currentProject.title}
                  </h2>
                  <p className="text-lg sm:text-xl text-neutral-600 font-normal mt-2">
                    {currentProject.thaiSubtitle}
                  </p>

                  <p className="mt-5 text-base sm:text-lg text-neutral-700 font-normal leading-relaxed">
                    {currentProject.description}
                  </p>
                </div>

                {/* Featured Visuals Showcase: Presentation Photo + Official Certificate */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-8 sm:mb-10">
                  {/* Left: Presentation Photo */}
                  <div className="lg:col-span-7 flex flex-col">
                    <div className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm group">
                      <img
                        src={currentProject.presentationImg}
                        alt={`ภาพการนำเสนอผลงาน ${currentProject.title}`}
                        decoding="async"
                        className="w-full h-auto object-cover max-h-[460px] transition-transform duration-500 group-hover:scale-[1.01]"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-neutral-900/80 backdrop-blur-md text-white text-[11px] font-mono tracking-wide shadow-sm">
                          LIVE PRESENTATION
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-neutral-500 font-mono gap-1">
                      <span>{currentProject.presentationCaption}</span>
                      <span className="text-neutral-400 text-[11px]">ภาพถ่ายจริงในการแข่งขัน</span>
                    </div>
                  </div>

                  {/* Right: Certificate Image with Zoom Lightbox Option */}
                  <div className="lg:col-span-5 flex flex-col">
                    <div
                      onClick={() => setCertModalOpen(true)}
                      className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-50 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                      title="คลิกเพื่อดูเกียรติบัตรขนาดเต็ม"
                    >
                      <img
                        src={currentProject.certificateImg}
                        alt={`เกียรติบัตร ${currentProject.title}`}
                        decoding="async"
                        className="w-full h-auto object-cover max-h-[460px] transition-transform duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                      />

                      {/* Hover overlay hint */}
                      <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-4 py-2 rounded-full bg-white/95 text-neutral-900 text-xs font-mono font-medium shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
                          <Maximize2 size={13} className="text-red-600" />
                          <span>คลิกเพื่อดูภาพขนาดเต็ม</span>
                        </span>
                      </div>

                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-red-700/90 backdrop-blur-md text-white text-[11px] font-mono tracking-wide shadow-sm flex items-center gap-1">
                          <Award size={12} />
                          <span>OFFICIAL CERTIFICATE</span>
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-neutral-500 font-mono gap-1.5">
                      <span>{currentProject.certificateCaption}</span>
                      <button
                        type="button"
                        onClick={() => setCertModalOpen(true)}
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 font-medium self-start sm:self-auto transition-colors"
                      >
                        <Maximize2 size={13} />
                        <span>คลิกขยายดูภาพเต็ม</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* =========================================================================
                    MASCOT GUIDE & "VIEW MORE / COLLAPSE" BUTTON INTERACTION AREA
                    ========================================================================= */}
                <div className="pt-4 pb-2 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                  {/* Mascot Guide Pointing & Speech Bubble */}
                  <div
                    onClick={handleMascotClick}
                    className="flex items-center gap-3 cursor-pointer group select-none"
                    title="คลิกที่มาสคอตเพื่อฟังคำแนะนำ!"
                  >
                    {/* Mascot Figure with Breathing Motion */}
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                      className="relative shrink-0"
                    >
                      <img
                        src={mascotGuide}
                        alt="Tanwa Mascot Guide"
                        decoding="async"
                        className="w-14 sm:w-16 h-auto drop-shadow-md transition-transform group-hover:scale-105"
                      />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white flex items-center justify-center text-[9px] text-white">
                        <Sparkles size={8} />
                      </span>
                    </motion.div>

                    {/* Speech Bubble */}
                    <div className="relative px-3.5 py-2 rounded-2xl bg-neutral-50 border border-red-200/80 shadow-xs text-xs font-mono text-neutral-700 max-w-xs">
                      <div className="flex items-center gap-1 text-red-600 font-bold text-[11px] mb-0.5">
                        <span>Tanwa</span>
                        <span className="text-neutral-400 font-normal">· ไกด์ประจำโปรเจกต์</span>
                      </div>
                      <p className="leading-snug">{mascotBubbleText}</p>
                      {/* Speech bubble beak */}
                      <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-neutral-50 border-b border-l border-red-200/80 rotate-45 pointer-events-none" />
                    </div>
                  </div>

                  {/* "View More / ดูเพิ่มเติม" Action Button */}
                  <div className="shrink-0 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium text-sm shadow-md hover:shadow-lg hover:shadow-red-600/25 transition-all active:scale-95"
                    >
                      <span>{isExpanded ? 'ย่อรายละเอียด' : 'ดูเพิ่มเติม (System Architecture & Role)'}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </div>
                </div>

                {/* =========================================================================
                    COLLAPSIBLE EXPANDED DETAILS (Smooth Accordion Slide Down)
                    ========================================================================= */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden pt-8 space-y-12 border-t border-neutral-200/80 mt-6"
                    >
                      {/* System Architecture Flow (Minimal Transit Flow) */}
                      <div className="p-6 sm:p-8 rounded-2xl border border-neutral-200 bg-neutral-50">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-200/80">
                          <div>
                            <span className="text-[11px] font-mono uppercase tracking-widest text-red-600 font-semibold block">
                              SYSTEM ARCHITECTURE & FLOW
                            </span>
                            <h3 className="text-base sm:text-lg font-medium text-neutral-900 mt-0.5">
                              สถาปัตยกรรมการทำงานของระบบ ({currentProject.title})
                            </h3>
                          </div>
                          <span className="text-xs font-mono text-neutral-500">
                            From core logic to real-world integration
                          </span>
                        </div>

                        {/* 5-Step Transit Route Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                          {currentProject.stations.map((st, idx) => {
                            const IconComponent = st.icon;
                            return (
                              <div
                                key={st.step}
                                className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs flex flex-col justify-between"
                              >
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-mono font-bold text-red-500">
                                      {st.step}
                                    </span>
                                    <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
                                      <IconComponent size={14} />
                                    </div>
                                  </div>
                                  <h4 className="text-sm font-semibold text-neutral-900 font-mono">
                                    {st.name}
                                  </h4>
                                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                                    {st.sub}
                                  </p>
                                </div>

                                {idx < 4 && (
                                  <div className="hidden md:block mt-3 text-right text-neutral-300 font-mono text-xs">
                                    →
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Project Details: Role, Responsibilities, and Technical Specifications */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
                        {/* Left: Individual Role & Scope of Work */}
                        <div className="lg:col-span-7 space-y-6">
                          <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-800 text-xs font-mono mb-3">
                              <Layers size={13} className="text-red-600" />
                              <span>{currentProject.role}</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-neutral-900 tracking-tight">
                              {currentProject.title}
                            </h3>
                            <p className="text-sm sm:text-base text-neutral-600 mt-2 leading-relaxed">
                              {currentProject.description}
                            </p>
                          </div>

                          {/* Scope Checklist */}
                          <div className="space-y-2.5 pt-2">
                            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-3">
                              ขอบเขตหน้าที่ที่รับผิดชอบ (RESPONSIBILITIES):
                            </span>
                            {currentProject.responsibilities.map((resp, i) => (
                              <div key={i} className="flex items-start gap-2.5 text-sm text-neutral-700">
                                <CheckCircle2
                                  size={16}
                                  className="text-red-600 shrink-0 mt-0.5"
                                />
                                <span>{resp}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Right: Metadata Grid & Technologies */}
                        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                          {/* Metadata Table */}
                          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-6">
                            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-4">
                              PROJECT SPECIFICATIONS
                            </span>

                            <dl className="space-y-4 text-sm divide-y divide-neutral-200/80">
                              <div className="flex justify-between items-center pt-2 first:pt-0">
                                <dt className="text-neutral-500 font-mono text-xs">บทบาท (Role)</dt>
                                <dd className="font-semibold text-neutral-900 font-mono text-right text-xs sm:text-sm">
                                  {currentProject.role}
                                </dd>
                              </div>
                              <div className="flex justify-between items-center pt-3">
                                <dt className="text-neutral-500 font-mono text-xs">ปีที่พัฒนา (Year)</dt>
                                <dd className="font-semibold text-neutral-900 font-mono">
                                  {currentProject.year}
                                </dd>
                              </div>
                              <div className="flex justify-between items-center pt-3">
                                <dt className="text-neutral-500 font-mono text-xs">ประเภทโครงงาน</dt>
                                <dd className="font-medium text-neutral-900 text-right text-xs sm:text-sm">
                                  {currentProject.type}
                                </dd>
                              </div>
                              <div className="flex justify-between items-start pt-3">
                                <dt className="text-neutral-500 font-mono text-xs shrink-0">การรับรอง (Recognition)</dt>
                                <dd className="font-medium text-right text-red-700 text-xs sm:text-sm">
                                  {currentProject.recognition}
                                </dd>
                              </div>
                              <div className="flex justify-between items-center pt-3">
                                <dt className="text-neutral-500 font-mono text-xs">หน่วยงานผู้จัด</dt>
                                <dd className="text-neutral-700 text-xs text-right">
                                  {currentProject.organizer}
                                </dd>
                              </div>
                            </dl>
                          </div>

                          {/* Technologies Applied */}
                          <div>
                            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-3">
                              TECHNOLOGIES & TOOLS:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {currentProject.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1 rounded-full border border-neutral-200 text-xs font-mono text-neutral-700 bg-neutral-100 hover:border-red-600 hover:text-red-600 transition-colors"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>


      {/* Full-Screen Zoom Lightbox Modal for Certificate */}
      {certModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`รูปเกียรติบัตรฉบับเต็ม ${currentProject.title}`}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setCertModalOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50">
              <div className="flex items-center gap-2">
                <Award size={18} className="text-red-600" />
                <span className="text-sm font-semibold text-neutral-900">
                  {currentProject.certificateCaption}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setCertModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 transition-colors"
                title="ปิด (Esc)"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Image */}
            <div className="p-4 sm:p-6 bg-neutral-100 flex items-center justify-center overflow-auto max-h-[80vh]">
              <img
                src={currentProject.certificateImg}
                alt={`เกียรติบัตร ${currentProject.title}`}
                decoding="async"
                className="w-full h-auto max-h-[75vh] object-contain rounded-lg shadow-sm"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-neutral-200 bg-white flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-600 gap-2">
              <span>{currentProject.recognition}</span>
              <span className="font-mono text-neutral-400">กดปุ่ม Esc หรือคลิกข้างนอกเพื่อปิด</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartSongthaewShowcase;
