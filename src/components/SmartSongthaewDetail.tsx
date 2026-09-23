import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Maximize2,
  Minimize2,
  X,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import presentationImg from '../assets/smart-songthaew-presentation.jpg';
import certificateImg from '../assets/smart-songthaew-certificate.png';

interface SmartSongthaewDetailProps {
  onBack: () => void;
}

export const SmartSongthaewDetail: React.FC<SmartSongthaewDetailProps> = ({ onBack }) => {
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Keyboard navigation for certificate modal (Escape key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (certModalOpen) {
          setCertModalOpen(false);
          setIsZoomed(false);
        } else {
          onBack();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [certModalOpen, onBack]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (certModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [certModalOpen]);

  const technologies = [
    'IoT',
    'LoRa',
    'VIBE Architecture',
    'Cloud',
    'Web Application',
    'Real-time Tracking',
    '3D Printing',
  ];

  const responsibilities = [
    'วิเคราะห์ปัญหาและความต้องการของผู้ใช้งาน',
    'ออกแบบแนวคิดและสถาปัตยกรรมระบบ',
    'ออกแบบการสื่อสารของอุปกรณ์ IoT ผ่าน LoRa',
    'พัฒนาระบบ Cloud สำหรับรับและจัดการข้อมูล',
    'พัฒนา Web Application สำหรับแสดงข้อมูล',
    'ออกแบบและประกอบต้นแบบอุปกรณ์',
    'ออกแบบชิ้นส่วนหรือกล่องอุปกรณ์สำหรับผลิตด้วย 3D Printer',
    'ทดสอบและปรับปรุงต้นแบบ',
    'จัดทำเอกสารโครงการ',
    'นำเสนอและตอบคำถามต่อคณะกรรมการ',
  ];

  const timelineSteps = [
    {
      step: '01',
      title: 'Problem Discovery',
      desc: 'ศึกษาปัญหาและข้อจำกัดของการเดินทางด้วยรถสองแถว',
    },
    {
      step: '02',
      title: 'System Design',
      desc: 'ออกแบบโครงสร้างการสื่อสารระหว่างอุปกรณ์ IoT, LoRa, Cloud และ Web Application',
    },
    {
      step: '03',
      title: 'Prototype Development',
      desc: 'พัฒนาต้นแบบฮาร์ดแวร์และซอฟต์แวร์',
    },
    {
      step: '04',
      title: 'Integration',
      desc: 'เชื่อมต่อการส่งข้อมูลจากอุปกรณ์ไปยังระบบ Cloud และหน้าเว็บไซต์',
    },
    {
      step: '05',
      title: 'Testing & Iteration',
      desc: 'ทดสอบการทำงานและปรับปรุงระบบ',
    },
    {
      step: '06',
      title: 'Documentation & Presentation',
      desc: 'จัดทำเอกสารและนำเสนอผลงานต่อคณะกรรมการ',
    },
  ];

  const flowNodes = [
    { label: 'Vehicle / IoT Device', desc: 'อุปกรณ์รับตำแหน่งบนรถสองแถว' },
    { label: 'LoRa Communication', desc: 'คลื่นส่งสัญญาณระยะไกลไร้สาย' },
    { label: 'Gateway or Receiver', desc: 'สถานีรับข้อมูลคลื่นความถี่' },
    { label: 'Cloud System', desc: 'ระบบคลาวด์ประมวลผลข้อมูล' },
    { label: 'Web Application', desc: 'หน้าเว็บแอปแสดงผลตำแหน่ง' },
    { label: 'Passenger', desc: 'ผู้โดยสารตรวจสอบเวลารถมาถึง' },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-neutral-800 selection:text-white pb-32">
      {/* Top Sticky Bar / Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb navigation"
        className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#09090b]/80 backdrop-blur-md px-6 sm:px-12 py-4"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs font-mono">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded py-1 px-2 -ml-2"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to selected projects</span>
          </button>

          <ol className="hidden sm:inline-flex items-center gap-2 text-neutral-500">
            <li>
              <button
                onClick={onBack}
                className="hover:text-neutral-300 transition-colors"
              >
                Home
              </button>
            </li>
            <ChevronRight size={12} className="text-neutral-600" />
            <li>
              <button
                onClick={onBack}
                className="hover:text-neutral-300 transition-colors"
              >
                Projects
              </button>
            </li>
            <ChevronRight size={12} className="text-neutral-600" />
            <li className="text-neutral-300 truncate max-w-[200px]" aria-current="page">
              Smart Songthaew Platform
            </li>
          </ol>
        </div>
      </nav>

      {/* =========================================================================
          1. PROJECT HERO
          ========================================================================= */}
      <header className="max-w-5xl mx-auto px-6 sm:px-12 pt-16 sm:pt-24 pb-12">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 text-xs font-mono mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>01 · INDIVIDUAL PROJECT · NSC 2026</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.12]">
          Smart Songthaew Platform
        </h1>

        {/* Thai title */}
        <p className="text-lg sm:text-xl text-neutral-400 font-thai mt-2 font-normal">
          แพลตฟอร์มสมาร์ทสองแถว
        </p>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-neutral-300 mt-4 font-normal">
          Real-time vehicle tracking through Cloud, IoT and LoRa.
        </p>

        {/* Short Summary */}
        <p className="mt-4 text-sm sm:text-base text-neutral-400 font-thai leading-relaxed max-w-3xl">
          แพลตฟอร์มติดตามรถสองแถวแบบเรียลไทม์ที่ออกแบบมาเพื่อช่วยลดความไม่แน่นอนในการรอรถ และทำให้ประชาชนในพื้นที่ส่วนภูมิภาคสามารถวางแผนการเดินทางได้สะดวกขึ้น
        </p>

        {/* Metadata Grid */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-5 gap-4 pt-6 border-t border-white/10 text-xs font-mono">
          <div>
            <span className="text-neutral-500 block uppercase tracking-wider text-[10px]">Year</span>
            <span className="text-neutral-200 font-medium mt-1 block">2026</span>
          </div>
          <div>
            <span className="text-neutral-500 block uppercase tracking-wider text-[10px]">Role</span>
            <span className="text-neutral-200 font-medium mt-1 block">Solo Developer</span>
          </div>
          <div>
            <span className="text-neutral-500 block uppercase tracking-wider text-[10px]">Project Type</span>
            <span className="text-neutral-200 font-medium mt-1 block">Individual Project</span>
          </div>
          <div>
            <span className="text-neutral-500 block uppercase tracking-wider text-[10px]">Recognition</span>
            <span className="text-emerald-400 font-medium mt-1 block">Selected for Funding</span>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="text-neutral-500 block uppercase tracking-wider text-[10px]">Program</span>
            <span className="text-neutral-200 font-medium mt-1 block">NSC 2026</span>
          </div>
        </div>

        {/* Hero Image: Kantapon presenting to committee */}
        <div className="mt-12 w-full rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl relative aspect-[16/10] sm:aspect-[16/9]">
          <img
            src={presentationImg}
            alt="ภาพ Kantapon Wongprot กำลังนำเสนอโปรเจกต์ Smart Songthaew Platform ต่อคณะกรรมการในการแข่งขัน NSC 2026"
            className="w-full h-full object-cover object-left"
            loading="eager"
            width={1200}
            height={675}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 sm:p-6 text-[11px] sm:text-xs text-neutral-300 font-mono">
            ภาพขณะนำเสนอผลงาน “แพลตฟอร์มสมาร์ทสองแถว” ต่อคณะกรรมการผู้ทรงคุณวุฒิ การแข่งขัน NSC 2026
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="max-w-5xl mx-auto px-6 sm:px-12 space-y-20 sm:space-y-28">
        {/* =========================================================================
            2. PROJECT OVERVIEW
            ========================================================================= */}
        <section aria-labelledby="overview-heading" className="pt-8 border-t border-white/10">
          <h2 id="overview-heading" className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 mb-6">
            Project Overview
          </h2>
          <div className="space-y-5 text-neutral-300 font-thai text-base sm:text-lg leading-relaxed max-w-3xl">
            <p>
              Smart Songthaew Platform เป็นแพลตฟอร์มสำหรับติดตามตำแหน่งรถสองแถวแบบเรียลไทม์ พัฒนาขึ้นจากปัญหาที่ผู้โดยสารไม่สามารถทราบตำแหน่งรถหรือประมาณเวลาที่รถจะเดินทางมาถึงได้อย่างชัดเจน
            </p>
            <p>
              ระบบเชื่อมต่ออุปกรณ์ IoT ผ่านการสื่อสารระยะไกลด้วย LoRa และส่งข้อมูลเข้าสู่ Cloud ก่อนแสดงผลผ่าน Web Application เพื่อให้ผู้ใช้งานเข้าถึงข้อมูลการเดินทางได้สะดวกขึ้น
            </p>
            <p className="text-neutral-400">
              โปรเจกต์นี้ให้ความสำคัญกับบริบทของพื้นที่ส่วนภูมิภาค ซึ่งบางพื้นที่อาจมีข้อจำกัดด้านการเชื่อมต่อเครือข่าย จึงออกแบบแนวทางการสื่อสารโดยคำนึงถึงระยะทาง ความเสถียร และค่าใช้จ่ายของระบบ
            </p>
          </div>
        </section>

        {/* =========================================================================
            3. THE PROBLEM & 4. THE SOLUTION
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 pt-8 border-t border-white/10">
          {/* 3. The Problem */}
          <section aria-labelledby="problem-heading">
            <h2 id="problem-heading" className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 mb-6">
              The Problem
            </h2>
            <ul className="space-y-3.5 text-neutral-300 font-thai text-sm sm:text-base leading-relaxed">
              {[
                'ผู้โดยสารไม่ทราบตำแหน่งปัจจุบันของรถสองแถว',
                'ไม่สามารถประมาณเวลาที่รถจะมาถึงได้อย่างชัดเจน',
                'ต้องใช้เวลารอโดยไม่มีข้อมูลประกอบการตัดสินใจ',
                'การวางแผนเดินทางในพื้นที่ส่วนภูมิภาคทำได้ยาก',
                'ระบบขนส่งบางพื้นที่มีข้อจำกัดด้านโครงสร้างพื้นฐานดิจิทัล',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 4. The Solution */}
          <section aria-labelledby="solution-heading">
            <h2 id="solution-heading" className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 mb-6">
              The Solution
            </h2>
            <div className="space-y-4 text-neutral-300 font-thai text-sm sm:text-base leading-relaxed">
              <p>
                ผมออกแบบระบบติดตามยานพาหนะแบบเรียลไทม์ โดยให้อุปกรณ์บนรถส่งข้อมูลผ่าน LoRa ตามแนวทาง VIBE Architecture ไปยังส่วนรับข้อมูล จากนั้นระบบจะนำข้อมูลเข้าสู่ Cloud เพื่อประมวลผลและแสดงผลผ่าน Web Application
              </p>
              <p className="text-neutral-400">
                ผู้ใช้งานสามารถเข้าถึงข้อมูลการเดินทางจากหน้าเว็บ โดยไม่จำเป็นต้องติดตั้งแอปพลิเคชันเพิ่มเติม
              </p>
            </div>
          </section>
        </div>

        {/* =========================================================================
            5. HOW IT WORKS (FLOW DIAGRAM WITH HTML & CSS — NO MERMAID)
            ========================================================================= */}
        <section aria-labelledby="how-it-works-heading" className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 gap-2">
            <h2 id="how-it-works-heading" className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500">
              How It Works
            </h2>
            <span className="text-xs font-mono text-neutral-500">
              VIBE Architecture Data Pipeline
            </span>
          </div>

          {/* Accessible System Pipeline Container */}
          <div
            role="region"
            aria-label="System architecture data flow diagram"
            className="w-full p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0d0d12]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {flowNodes.map((node, index) => {
                const isLast = index === flowNodes.length - 1;
                return (
                  <div
                    key={node.label}
                    className="relative flex flex-col justify-between p-4 rounded-xl border border-white/10 bg-neutral-900/60 hover:border-neutral-700 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                          STEP 0{index + 1}
                        </span>
                        {!isLast && (
                          <span className="text-neutral-500 text-xs font-mono hidden lg:inline">
                            →
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-semibold text-white font-mono">
                        {node.label}
                      </h3>
                      <p className="text-xs text-neutral-400 font-thai mt-1">
                        {node.desc}
                      </p>
                    </div>

                    {!isLast && (
                      <div className="lg:hidden mt-3 flex justify-center text-emerald-400 text-xs">
                        ↓
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. MY ROLE (BUILT INDEPENDENTLY)
            ========================================================================= */}
        <section aria-labelledby="role-heading" className="pt-8 border-t border-white/10">
          <h2 id="role-heading" className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 mb-6">
            Built Independently
          </h2>

          <blockquote className="text-lg sm:text-2xl font-medium text-white tracking-tight leading-snug mb-6 border-l-2 border-emerald-400 pl-4">
            “From the first idea to the final presentation, this project was developed independently.”
          </blockquote>

          <p className="text-sm sm:text-base text-neutral-300 font-thai leading-relaxed max-w-3xl mb-8">
            โปรเจกต์นี้เป็นผลงานเดี่ยว ผมรับผิดชอบตั้งแต่การวิเคราะห์ปัญหา ออกแบบระบบ พัฒนาต้นแบบ เชื่อมต่อส่วนประกอบ พัฒนา Web Application ทดสอบการทำงาน จัดทำเอกสาร และนำเสนอผลงานต่อคณะกรรมการ
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            {responsibilities.map((resp, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 p-3 rounded-lg border border-white/5 bg-neutral-900/40 text-xs sm:text-sm text-neutral-300 font-thai"
              >
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>{resp}</span>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            7. DEVELOPMENT PROCESS (MINIMALIST TIMELINE)
            ========================================================================= */}
        <section aria-labelledby="process-heading" className="pt-8 border-t border-white/10">
          <h2 id="process-heading" className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 mb-8">
            Development Process
          </h2>

          <div className="space-y-6">
            {timelineSteps.map((step) => (
              <div
                key={step.step}
                className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8 pb-6 border-b border-white/5 last:border-0"
              >
                <span className="text-xs font-mono text-emerald-400 font-medium shrink-0 pt-0.5">
                  {step.step}
                </span>
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-semibold text-white font-mono">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 font-thai">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            8. TECHNOLOGIES
            ========================================================================= */}
        <section aria-labelledby="technologies-heading" className="pt-8 border-t border-white/10">
          <h2 id="technologies-heading" className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 mb-6">
            Technology Stack
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full border border-white/10 bg-neutral-900/60 text-xs font-mono text-neutral-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* =========================================================================
            9. RECOGNITION (OFFICIAL CERTIFICATE & MODAL)
            ========================================================================= */}
        <section aria-labelledby="recognition-heading" className="pt-8 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <h2 id="recognition-heading" className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500">
              Recognition
            </h2>
            <span className="px-2.5 py-0.5 rounded-full border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 text-[10px] font-mono tracking-wider uppercase font-medium">
              SELECTED FOR DEVELOPMENT FUNDING
            </span>
          </div>

          <p className="text-sm sm:text-base text-neutral-300 font-thai leading-relaxed max-w-3xl mb-8">
            โปรเจกต์ผ่านการคัดเลือกและได้รับทุนสนับสนุนการพัฒนาผลงาน ระดับนักเรียน ในการแข่งขันพัฒนาโปรแกรมคอมพิวเตอร์แห่งประเทศไทย ครั้งที่ 28 หรือ The 28th National Software Contest: NSC 2026
          </p>

          {/* Certificate Frame with click-to-zoom */}
          <div className="max-w-2xl">
            <button
              type="button"
              onClick={() => setCertModalOpen(true)}
              className="group w-full text-left rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 hover:border-neutral-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 relative cursor-pointer"
              aria-label="คลิกเพื่อดูภาพเกียรติบัตรขนาดใหญ่"
            >
              <img
                src={certificateImg}
                alt="ภาพเกียรติบัตรการได้รับทุนสนับสนุนการพัฒนาผลงาน Smart Songthaew Platform ในโครงการ NSC 2026"
                className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                loading="lazy"
                width={800}
                height={565}
              />
              <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400 bg-neutral-950/80">
                <span>Development Funding Certificate · NSC 2026</span>
                <span className="inline-flex items-center gap-1.5 text-neutral-300 group-hover:text-emerald-400 transition-colors">
                  <Maximize2 size={13} />
                  <span>Click to view</span>
                </span>
              </div>
            </button>
          </div>
        </section>

        {/* =========================================================================
            10. REFLECTION
            ========================================================================= */}
        <section aria-labelledby="reflection-heading" className="pt-8 border-t border-white/10">
          <h2 id="reflection-heading" className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 mb-6">
            What I Learned
          </h2>
          <div className="space-y-4 text-neutral-300 font-thai text-sm sm:text-base leading-relaxed max-w-3xl">
            <p>
              โปรเจกต์นี้ทำให้ผมได้เรียนรู้การพัฒนาระบบที่เชื่อมโยงทั้ง Hardware, Communication, Cloud และ Web Application เข้าด้วยกัน รวมถึงการออกแบบภายใต้ข้อจำกัดของพื้นที่ใช้งานจริง
            </p>
            <p className="text-neutral-400">
              นอกจากทักษะด้านเทคนิค ผมยังได้ฝึกการอธิบายแนวคิด การจัดทำเอกสาร และการนำเสนอระบบที่มีหลายองค์ประกอบให้คณะกรรมการเข้าใจได้อย่างเป็นขั้นตอน
            </p>
          </div>
        </section>

        {/* =========================================================================
            11. PROJECT NAVIGATION
            ========================================================================= */}
        <section className="pt-12 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-sm font-mono text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded py-2 px-3 -ml-3"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>← Back to selected projects</span>
          </button>
        </section>
      </main>

      {/* =========================================================================
          FULL-SCREEN CERTIFICATE MODAL
          ========================================================================= */}
      {certModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="เกียรติบัตรทุนสนับสนุนการพัฒนาผลงาน NSC 2026"
          onClick={() => setCertModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full bg-[#121216] rounded-2xl shadow-2xl border border-neutral-800 flex flex-col transition-all duration-300 overflow-hidden ${
              isZoomed ? 'max-w-6xl max-h-[96vh]' : 'max-w-4xl max-h-[90vh]'
            }`}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span className="text-xs sm:text-sm font-mono font-medium text-white">
                  Development Funding Certificate · NSC 2026
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400"
                  title={isZoomed ? 'ย่อขนาด' : 'ขยายเต็มตา'}
                  aria-label={isZoomed ? 'ย่อขนาด' : 'ขยายเต็มตา'}
                >
                  {isZoomed ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button
                  onClick={() => setCertModalOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400"
                  title="ปิดหน้าต่าง [ESC]"
                  aria-label="ปิดหน้าต่าง"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Image Body */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-black/40">
              <img
                src={certificateImg}
                alt="ภาพเกียรติบัตรการได้รับทุนสนับสนุนการพัฒนาผลงาน Smart Songthaew Platform ในโครงการ NSC 2026 ฉบับเต็ม"
                className={`max-w-full object-contain mx-auto transition-transform duration-200 ${
                  isZoomed ? 'scale-100 max-h-[82vh]' : 'max-h-[68vh]'
                }`}
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400 bg-neutral-900/40">
              <span className="truncate">
                นายกันตภณ วงศ์พรต · โรงเรียนเตรียมอุดมศึกษาภาคใต้
              </span>
              <button
                onClick={() => setCertModalOpen(false)}
                className="px-3.5 py-1.5 rounded-lg border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white transition-colors"
              >
                ปิด [ESC]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartSongthaewDetail;
