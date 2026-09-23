import React, { useState } from 'react';
import {
  ShieldCheck,
  Pause,
  Play,
  ArrowUpRight
} from 'lucide-react';
import { COMPETITIONS_DATA, Competition } from './competitionData';

interface CompetitionShowcaseProps {
  isWhite?: boolean;
  isDark?: boolean;
  onOpenCertificate: (competition: Competition) => void;
}

export const CompetitionShowcase: React.FC<CompetitionShowcaseProps> = ({
  isDark = true,
  onOpenCertificate
}) => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate list to achieve a completely seamless, continuous infinite horizontal marquee
  const loopItems = [...COMPETITIONS_DATA, ...COMPETITIONS_DATA];

  return (
    <section
      id="competitions"
      className={`py-24 sm:py-32 overflow-hidden transition-colors ${
        isDark ? 'bg-[#09090b] text-white border-y border-neutral-900' : 'bg-transparent text-neutral-900'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        {/* Section Header Indicator */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
            03 // Competitions & Verified Honors
          </span>
          <div className={`h-px flex-1 ${isDark ? 'bg-neutral-800/80' : 'bg-neutral-200/80'}`} />
        </div>

        {/* Minimal Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="font-hn text-3xl sm:text-4xl font-normal tracking-tight text-white leading-tight">
              ผลงานการแข่งขัน<span className="font-serif italic text-neutral-400">ระดับประเทศ</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-light">
              ผลงานการแข่งขันทางวิชาการ หุ่นยนต์ และนวัตกรรม พร้อมเกียรติบัตรรับรอง
            </p>
          </div>

          {/* Minimal Play/Pause Button */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 text-xs font-mono transition-all"
            title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
          >
            {isPaused ? <Play size={11} /> : <Pause size={11} />}
            <span>{isPaused ? 'เล่นต่อ' : 'หยุด'}</span>
          </button>
        </div>

        {/* CONTINUOUS SMOOTH MARQUEE */}
        <div className="relative -mx-6 sm:-mx-12 overflow-hidden py-2">
          {/* Subtle horizontal gradient edge fades */}
          <div className="absolute left-0 inset-y-0 w-12 sm:w-24 bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-12 sm:w-24 bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none" />

          <div
            className="anim-marquee-continuous flex gap-5 w-max px-6 sm:px-12"
            style={{
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            {loopItems.map((comp, idx) => {
              const LogoComponent = comp.organizerLogo;
              const mainPhoto = comp.photos[0];

              return (
                <div
                  key={`${comp.id}-${idx}`}
                  onClick={() => onOpenCertificate(comp)}
                  className="w-[280px] sm:w-[310px] flex-shrink-0 bg-[#121215] rounded-2xl border border-neutral-800/80 p-3.5 flex flex-col justify-between hover:border-neutral-600 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                >
                  {/* Photo container */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden bg-neutral-900">
                    <img
                      src={mainPhoto}
                      alt={comp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Minimal Year Tag Top-Left */}
                    <span className="absolute top-2.5 left-2.5 z-10 text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-neutral-300">
                      {comp.year}
                    </span>

                    {/* Minimal Logo Badge Top-Right */}
                    <div
                      className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center p-1"
                      title={comp.organizer}
                    >
                      <LogoComponent className="w-full h-full object-contain" />
                    </div>
                  </div>

                  {/* Clean Minimal Typography */}
                  <div className="pt-3.5 flex flex-col gap-1">
                    {/* Award Highlight */}
                    <span className="text-[11px] font-mono text-emerald-400 font-medium truncate">
                      {comp.award}
                    </span>

                    {/* Title */}
                    <h3 className="text-sm font-medium text-neutral-100 group-hover:text-emerald-300 transition-colors line-clamp-1">
                      {comp.title}
                    </h3>

                    {/* Organizer */}
                    <p className="text-[11px] text-neutral-400 font-light truncate">
                      {comp.organizer}
                    </p>

                    {/* Action Line */}
                    <div className="mt-2.5 pt-2.5 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-400 group-hover:text-neutral-200 transition-colors">
                      <span className="flex items-center gap-1.5 font-mono text-[10px]">
                        <ShieldCheck size={12} className="text-emerald-400" />
                        เกียรติบัตรรับรอง
                      </span>
                      <ArrowUpRight size={13} className="text-neutral-500 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitionShowcase;
