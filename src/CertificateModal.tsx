import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Download,
  Maximize2,
  Minimize2,
  CheckCircle,
  Award,
  Calendar,
  Building2
} from 'lucide-react';
import { Competition } from './competitionData';

interface CertificateModalProps {
  competition: Competition | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  competition,
  onClose
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [downloadToast, setDownloadToast] = useState(false);

  if (!competition) return null;

  const handleDownload = () => {
    // Create download link for the certificate image
    const link = document.createElement('a');
    link.href = competition.certImage;
    link.download = `certificate_${competition.id}_kantapon_wongprot.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 3000);
  };

  const LogoComponent = competition.organizerLogo;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full bg-white dark:bg-[#151515] rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col transition-all duration-300 overflow-hidden ${
          isZoomed ? 'max-w-6xl max-h-[96vh]' : 'max-w-4xl max-h-[90vh]'
        }`}
      >
        {/* MODAL HEADER */}
        <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/60 dark:bg-neutral-900/60">
          <div className="flex items-center gap-3">
            <div className="p-1 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm">
              <LogoComponent className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-neutral-900 dark:text-white">
                  เกียรติบัตรรับรองผลงานฉบับทางการ
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                  <ShieldCheck size={11} /> Verified Certificate
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 font-mono">
                {competition.organizer}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsZoomed(!isZoomed);
              }}
              className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title={isZoomed ? 'ย่อขนาด' : 'ขยายเต็มตา'}
            >
              {isZoomed ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title="ปิด"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* MODAL BODY: Certificate Image & Details */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center">
          {/* Certificate Image Frame */}
          <div
            onClick={() => setIsZoomed(!isZoomed)}
            className="w-full relative rounded-2xl overflow-hidden bg-neutral-900 shadow-2xl border-2 border-neutral-300 dark:border-neutral-700 group cursor-pointer"
          >
            <img
              src={competition.certImage}
              alt="Official Certificate"
              className={`w-full object-contain mx-auto transition-transform duration-300 ${
                isZoomed ? 'scale-100' : 'group-hover:scale-[1.01]'
              }`}
              style={{ maxHeight: isZoomed ? '72vh' : '52vh' }}
            />
            {/* Click to zoom overlay badge */}
            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
              <Maximize2 size={12} />
              <span>คลิกเพื่อ{isZoomed ? 'ย่อ' : 'ขยาย'}</span>
            </div>
          </div>

          {/* Certificate Verification Meta Card */}
          <div className="w-full mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/60 flex items-start gap-3">
              <Award size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">รางวัลที่ได้รับ</span>
                <span className="text-xs font-semibold text-neutral-900 dark:text-cream leading-snug block">
                  {competition.award}
                </span>
                <span className="text-[10px] text-neutral-500 font-light block mt-0.5">
                  {competition.title}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/60 flex items-start gap-3">
              <Building2 size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">ผู้รับมอบ / สถาบัน</span>
                <span className="text-xs font-semibold text-neutral-900 dark:text-cream block">
                  กันตภณ วงศ์พรต (Kantapon Wongprot)
                </span>
                <span className="text-[10px] text-neutral-500 font-light block mt-0.5">
                  {competition.organizer}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/60 flex items-start gap-3">
              <Calendar size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">ปีการศึกษา / สถานะ</span>
                <span className="text-xs font-semibold text-neutral-900 dark:text-cream block">
                  ปีการศึกษา {competition.year}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono block mt-0.5">
                  ✓ ยืนยันเอกสารต้นฉบับเรียบร้อย
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="px-6 py-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/40 dark:bg-neutral-900/40">
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
            {downloadToast ? (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle size={14} /> กำลังดาวน์โหลดรูปเกียรติบัตร...
              </span>
            ) : (
              <span>เอกสารประกอบพอร์ตโฟลิโอ TCAS รอบ 1 คณะวิศวกรรมคอมพิวเตอร์</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              ปิดหน้าต่าง
            </button>
            <button
              onClick={handleDownload}
              className="px-5 py-2 rounded-full bg-neutral-900 dark:bg-white text-xs font-medium text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 flex items-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <Download size={14} />
              <span>ดาวน์โหลดเกียรติบัตร</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
