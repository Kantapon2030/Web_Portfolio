import React from 'react';
import compRobotRescue from './assets/comp_robot_rescue.jpg';
import compAiPresentation from './assets/comp_ai_presentation.jpg';
import compHackathonLab from './assets/comp_hackathon_lab.jpg';
import compAwardPodium from './assets/comp_award_podium.jpg';
import certRoboticsAward from './assets/cert_robotics_award.jpg';
import certAiGoldAward from './assets/cert_ai_gold_award.jpg';

import icsyouImg1 from './assets/camps/icsyou_camp_img_1.jpg';
import icsyouImg2 from './assets/camps/icsyou_camp_img_2.jpg';
import icsyouImg3 from './assets/camps/icsyou_camp_img_3.jpg';
import icsyouImg4 from './assets/camps/icsyou_camp_img_4.jpg';

// ============================================================================
// UNIVERSITY & ORGANIZER VECTOR SVG EMBLEMS / LOGOS
// ============================================================================

export const ChulaLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#FCE7F3" stroke="#DB2777" strokeWidth="3" />
    <circle cx="50" cy="50" r="41" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1.5" />
    <path d="M50 16L55 30H45L50 16Z" fill="#BE185D" />
    <path d="M36 28L44 38L32 38L36 28Z" fill="#DB2777" />
    <path d="M64 28L68 38L56 38L64 28Z" fill="#DB2777" />
    <path d="M26 40L38 46L24 50L26 40Z" fill="#BE185D" />
    <path d="M74 40L76 50L62 46L74 40Z" fill="#BE185D" />
    <rect x="28" y="52" width="44" height="6" rx="2" fill="#BE185D" />
    <rect x="32" y="60" width="36" height="5" rx="1.5" fill="#DB2777" />
    <rect x="36" y="67" width="28" height="4" rx="1" fill="#BE185D" />
    <circle cx="50" cy="50" r="6" fill="#F43F5E" />
    <circle cx="50" cy="50" r="3" fill="#FFE4E6" />
    <text x="50" y="84" textAnchor="middle" fill="#9D174D" fontSize="8" fontWeight="bold" fontFamily="sans-serif">CHULA</text>
  </svg>
);

export const KmitlLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#FFF7ED" stroke="#EA580C" strokeWidth="3" />
    <circle cx="50" cy="50" r="40" stroke="#FDBA74" strokeWidth="1.5" />
    <path d="M50 15L53 26H47L50 15Z" fill="#C2410C" />
    <path d="M38 27L50 42L62 27L58 48H42L38 27Z" fill="#EA580C" />
    <circle cx="50" cy="27" r="4" fill="#F97316" />
    <circle cx="38" cy="27" r="3" fill="#C2410C" />
    <circle cx="62" cy="27" r="3" fill="#C2410C" />
    <path d="M30 52H70L66 68H34L30 52Z" fill="#C2410C" />
    <rect x="26" y="70" width="48" height="6" rx="2" fill="#EA580C" />
    <text x="50" y="88" textAnchor="middle" fill="#9A3412" fontSize="9" fontWeight="800" fontFamily="sans-serif">KMITL</text>
  </svg>
);

export const NstdaLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#F0F9FF" stroke="#0284C7" strokeWidth="3" />
    <circle cx="50" cy="50" r="40" stroke="#BAE6FD" strokeWidth="1.5" />
    <ellipse cx="50" cy="48" rx="26" ry="10" transform="rotate(-30 50 48)" stroke="#0369A1" strokeWidth="2.5" />
    <ellipse cx="50" cy="48" rx="26" ry="10" transform="rotate(30 50 48)" stroke="#0284C7" strokeWidth="2.5" />
    <circle cx="50" cy="48" r="8" fill="#0284C7" />
    <circle cx="50" cy="48" r="4" fill="#38BDF8" />
    <circle cx="28" cy="38" r="3" fill="#0369A1" />
    <circle cx="72" cy="58" r="3" fill="#0369A1" />
    <text x="50" y="82" textAnchor="middle" fill="#075985" fontSize="8" fontWeight="800" fontFamily="sans-serif">NSTDA</text>
    <text x="50" y="90" textAnchor="middle" fill="#0369A1" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">สวทช.</text>
  </svg>
);

export const ObecLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="#16A34A" strokeWidth="3" />
    <circle cx="50" cy="50" r="40" stroke="#BBF7D0" strokeWidth="1.5" />
    <circle cx="50" cy="46" r="18" stroke="#15803D" strokeWidth="3" />
    <circle cx="50" cy="46" r="6" fill="#15803D" />
    <line x1="50" y1="28" x2="50" y2="64" stroke="#15803D" strokeWidth="2" />
    <line x1="32" y1="46" x2="68" y2="46" stroke="#15803D" strokeWidth="2" />
    <line x1="37" y1="33" x2="63" y2="59" stroke="#16A34A" strokeWidth="1.5" />
    <line x1="37" y1="59" x2="63" y2="33" stroke="#16A34A" strokeWidth="1.5" />
    <text x="50" y="82" textAnchor="middle" fill="#166534" fontSize="8" fontWeight="800" fontFamily="sans-serif">สพฐ.</text>
    <text x="50" y="90" textAnchor="middle" fill="#15803D" fontSize="6" fontWeight="bold" fontFamily="sans-serif">OBEC</text>
  </svg>
);

export const KuLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="#15803D" strokeWidth="3" />
    <circle cx="50" cy="50" r="40" stroke="#86EFAC" strokeWidth="1.5" />
    <path d="M50 16C50 16 65 32 65 48C65 60 55 72 50 78C45 72 35 60 35 48C35 32 50 16 50 16Z" fill="#16A34A" />
    <path d="M50 24V74" stroke="#DCFCE7" strokeWidth="2" />
    <circle cx="50" cy="46" r="6" fill="#FEF08A" />
    <text x="50" y="88" textAnchor="middle" fill="#14532D" fontSize="9" fontWeight="800" fontFamily="sans-serif">KU · มก.</text>
  </svg>
);

export const PsuLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="3" />
    <circle cx="50" cy="50" r="40" stroke="#93C5FD" strokeWidth="1.5" />
    <path d="M50 16L56 32H44L50 16Z" fill="#1E40AF" />
    <path d="M34 32L46 44L32 46L34 32Z" fill="#2563EB" />
    <path d="M66 32L68 46L54 44L66 32Z" fill="#2563EB" />
    <rect x="30" y="52" width="40" height="6" rx="2" fill="#1E3A8A" />
    <text x="50" y="86" textAnchor="middle" fill="#1E3A8A" fontSize="8" fontWeight="800" fontFamily="sans-serif">PSU · ม.อ.</text>
  </svg>
);

export const SssLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#FFF7ED" stroke="#EA580C" strokeWidth="3" />
    <circle cx="50" cy="50" r="40" stroke="#FDBA74" strokeWidth="1.5" />
    <path d="M35 60C35 45 45 35 50 35C55 35 65 45 65 60" stroke="#EA580C" strokeWidth="4" strokeLinecap="round" />
    <circle cx="50" cy="25" r="6" fill="#EA580C" />
    <circle cx="35" cy="35" r="5" fill="#F97316" />
    <circle cx="65" cy="35" r="5" fill="#F97316" />
    <text x="50" y="80" textAnchor="middle" fill="#9A3412" fontSize="11" fontWeight="800" fontFamily="sans-serif">สสส.</text>
  </svg>
);

export interface Competition {
  id: string;
  title: string;
  englishTitle: string;
  award: string;
  awardLevel: 'gold' | 'silver' | 'top' | 'honor' | 'posn';
  awardBadge: string;
  organizer: string;
  organizerSub: string;
  organizerLogo: React.FC<{ className?: string }>;
  accentColor: string;
  badgeBg: string;
  year: string;
  role: string;
  summary: string;
  fullDesc: string;
  metrics: string;
  tech: string[];
  photos: string[];
  certImage: string;
  certSubtitle: string;
}

export const COMPETITIONS_DATA: Competition[] = [
  {
    id: 'anti-corruption-hackathon',
    title: 'กิจกรรมนวัตกรรมต่อต้านการทุจริต (Anti-Corruption Hackathon Innovation)',
    englishTitle: 'Anti-Corruption Hackathon Innovation',
    award: 'เข้ารอบ 10 ทีมสุดท้ายระดับประเทศ (ระดับคุณภาพ ดี)',
    awardLevel: 'top',
    awardBadge: '🎖️ Top 10 Finalist ระดับประเทศ',
    organizer: 'สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ.)',
    organizerSub: 'ร่วมกับ สำนักงาน ป.ป.ช.',
    organizerLogo: ObecLogo,
    accentColor: '#16A34A',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40',
    year: '2569',
    role: 'หัวหน้าทีม & ผู้พัฒนาแอปพลิเคชัน (Lead & Full-Stack Developer)',
    summary: 'ผลงาน "พลิกเกมกลโกง AI" ระบบช่วยคุณครูตรวจจับงานเขียนของนักเรียนว่าใช้ AI หรือไม่ มีความแม่นยำสูงกว่า AI Detector ในตลาด',
    fullDesc: 'พัฒนาระบบ "พลิกเกมกลโกง AI" โดยรับบทบาทเป็นหัวหน้าทีมและพัฒนาเว็บแอปพลิเคชันแบบ Full-Stack นำกระบวนการ Design Thinking มาทำความเข้าใจ Pain Point ของคุณครู เพื่อเปลี่ยนปัญหาให้กลายเป็นนวัตกรรมที่ใช้งานได้จริง',
    metrics: 'คัดเลือกรอบ 10 ทีมระดับประเทศ • ระดับคุณภาพ ดี • ใช้งานได้จริง',
    tech: ['Web Application', 'Full-Stack', 'AI Detector', 'Design Thinking'],
    photos: [compHackathonLab, compAiPresentation, compAwardPodium],
    certImage: certAiGoldAward,
    certSubtitle: 'ผ่านการคัดเลือกเข้าสู่รอบ 10 ทีมสุดท้ายระดับประเทศ และได้รับผลการประเมิน "ระดับคุณภาพ ดี"'
  },
  {
    id: 'nsc-2026',
    title: 'การแข่งขันพัฒนาโปรแกรมคอมพิวเตอร์แห่งประเทศไทย ครั้งที่ 28 (NSC 2026)',
    englishTitle: 'The 28th National Software Contest: NSC 2026',
    award: 'ได้รับทุนสนับสนุนการพัฒนาผลงาน',
    awardLevel: 'honor',
    awardBadge: '💡 ได้รับทุนสนับสนุนระดับประเทศ',
    organizer: 'สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ (สวทช.)',
    organizerSub: 'ร่วมกับ สำนักงานการวิจัยแห่งชาติ (วช.)',
    organizerLogo: NstdaLogo,
    accentColor: '#0284C7',
    badgeBg: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800/40',
    year: '2569',
    role: 'ผู้พัฒนาแพลตฟอร์ม (Platform Developer)',
    summary: 'ผลงาน "แพลตฟอร์มสมาร์ทสองแถว" ผสานอุปกรณ์ IoT เข้ากับ Web Application แบบเรียลไทม์ โดยใช้สถาปัตยกรรม VIBE',
    fullDesc: 'เพื่อแก้ปัญหาประชาชนในส่วนภูมิภาคที่ต้องเสียเวลารอรถสองแถวอย่างคาดเดาไม่ได้ จึงพัฒนาแพลตฟอร์มที่ผสานอุปกรณ์ IoT เข้ากับ Web Application ผ่านเครือข่าย LoRa (VIBE Architecture) ซึ่งช่วยตัดภาระค่าบริการเครือข่าย นำความรู้จากค่ายวิศวกรรมไฟฟ้า จุฬาฯ และ CE Next Gen มาต่อยอด',
    metrics: 'รับทุนสนับสนุนระดับประเทศ • LoRa IoT System • Web Application',
    tech: ['IoT', 'Web Application', 'LoRa', 'Cloud', '3D Printer'],
    photos: [compRobotRescue, compHackathonLab, compAiPresentation],
    certImage: certRoboticsAward,
    certSubtitle: 'ผ่านการคัดเลือกและได้รับทุนสนับสนุนการพัฒนาผลงาน โครงการระดับนักเรียน'
  },
  {
    id: 'icsyou-pitching',
    title: 'กิจกรรม I CS YOU CAMP 2026 และการแข่งขัน Pitching Project',
    englishTitle: 'I CS YOU CAMP 2026 & Pitching Project',
    award: 'รางวัลรองชนะเลิศอันดับที่ 2',
    awardLevel: 'silver',
    awardBadge: '🥈 รองชนะเลิศอันดับ 2 (2nd Runner-Up)',
    organizer: 'ภาควิชาวิทยาการคอมพิวเตอร์',
    organizerSub: 'มหาวิทยาลัยเกษตรศาสตร์',
    organizerLogo: KuLogo,
    accentColor: '#15803D',
    badgeBg: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-800/40',
    year: '2569',
    role: 'Prompt Engineer',
    summary: 'แข่งขัน Pitching Project นำเสนอผลงาน ออกแบบเว็บไซต์ด้วยแพลตฟอร์ม Stitch โดยรับหน้าที่เป็น Prompt Engineer',
    fullDesc: 'ผ่านการคัดเลือกเข้าร่วมอบรมเชิงปฏิบัติการด้านวิทยาการคอมพิวเตอร์ ได้เรียนรู้การเขียนโค้ดและการออกแบบเว็บไซต์ด้วยแพลตฟอร์ม Stitch ทำงานร่วมกับทีมเพื่อพัฒนาผลงานเข้าแข่งขัน โดยรับหน้าที่เป็น Prompt Engineer ดึงศักยภาพ AI มาช่วยเสริมประสิทธิภาพทีมจนคว้ารางวัล',
    metrics: 'รางวัลรองชนะเลิศอันดับ 2 • การทำงานเป็นทีม • AI Prompt Engineering',
    tech: ['Prompt Engineering', 'AI', 'Stitch', 'Web Design'],
    photos: [icsyouImg1, icsyouImg2, icsyouImg3, icsyouImg4],
    certImage: icsyouImg1,
    certSubtitle: 'รางวัลรองชนะเลิศอันดับที่ 2 การแข่งขัน Pitching Project'
  },
  {
    id: 'ai-for-thai-hackathon',
    title: 'การแข่งขัน AI For Thai Hackathon 2026',
    englishTitle: 'AI For Thai Hackathon 2026',
    award: 'ผ่านเข้ารอบชิงชนะเลิศ (Finalist)',
    awardLevel: 'top',
    awardBadge: '🎖️ รอบชิงชนะเลิศ (Finalist)',
    organizer: 'คณะวิทยาศาสตร์ มหาวิทยาลัยสงขลานครินทร์',
    organizerSub: 'Prince of Songkla University',
    organizerLogo: PsuLogo,
    accentColor: '#1D4ED8',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40',
    year: '2569',
    role: 'นักพัฒนาเว็บและระบบ (Web Application Developer)',
    summary: 'เข้าร่วมแข่งขัน Hackathon รอบชิงชนะเลิศแบบ 24 ชั่วโมง พัฒนา Service AI For Thai นำมาประยุกต์ใช้งานในรูปแบบ Web Application',
    fullDesc: 'ร่วมกับเพื่อนในทีมพัฒนา Service AI For Thai นำมาวิเคราะห์โจทย์ปัญหาให้แตกฉาน พัฒนาระบบให้เป็น Web Application ภายใต้เวลาที่จำกัด ฝึกรับมือกับความกดดันและการจัดการระบบความคิด (System Thinking) ที่รอบคอบรัดกุมมากยิ่งขึ้น',
    metrics: 'รอบชิงชนะเลิศระดับภาค • แข่งขัน 24 ชั่วโมง • System Thinking',
    tech: ['Service AI For Thai', 'Web App', 'API', 'System Thinking'],
    photos: [compAiPresentation, compHackathonLab, compAwardPodium],
    certImage: certAiGoldAward,
    certSubtitle: 'ผ่านเข้ารอบชิงชนะเลิศการแข่งขัน AI For Thai Hackathon 2026'
  },
  {
    id: 'cyber-inspector-anti-vaping',
    title: 'โครงการโตไปไม่สูบ สารวัตรนักเรียนไซเบอร์',
    englishTitle: 'Cyber Student Inspector: Anti-Vaping Project',
    award: 'รางวัล THE BEST ด้านการจัดกิจกรรมที่เป็นเลิศ',
    awardLevel: 'gold',
    awardBadge: '🏆 THE BEST Activity Award',
    organizer: 'โรงเรียนเตรียมอุดมศึกษาภาคใต้ และ สสส.',
    organizerSub: 'TU South & Thai Health Promotion Foundation',
    organizerLogo: SssLogo,
    accentColor: '#EA580C',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800/40',
    year: '2569',
    role: 'ประธานโครงการ (Project President)',
    summary: 'ก่อตั้งและทำหน้าที่ประธานโครงการ เพื่อนำเทคโนโลยีและการสื่อสารเชิงรุกมาสร้างกลไกป้องกันภัยบุหรี่ไฟฟ้าในกลุ่มเยาวชน',
    fullDesc: 'ริเริ่มก่อตั้งโครงการภายใต้การสนับสนุนของ สสส. เพื่อนำเทคโนโลยีสร้างพื้นที่ป้องกันและให้ความรู้เกี่ยวกับบุหรี่ไฟฟ้า ได้เรียนรู้ทักษะความเป็นผู้นำ การบริหารจัดการโครงการระดับเครือข่ายภูมิภาค และพิสูจน์ให้เห็นว่าพลังของคนรุ่นใหม่สามารถสร้าง Social Impact ให้เกิดขึ้นได้จริง',
    metrics: 'รางวัล THE BEST ระดับภาคใต้ • สร้าง Social Impact • การจัดการโครงการ',
    tech: ['Leadership', 'Project Management', 'Social Impact', 'Communication'],
    photos: [compAwardPodium, compHackathonLab, compRobotRescue],
    certImage: certRoboticsAward,
    certSubtitle: 'รางวัล THE BEST ด้านการจัดกิจกรรมที่เป็นเลิศ ระดับเครือข่ายภาคใต้'
  }
];
