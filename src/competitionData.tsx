import React from 'react';
import compRobotRescue from './assets/comp_robot_rescue.jpg';
import compAiPresentation from './assets/comp_ai_presentation.jpg';
import compHackathonLab from './assets/comp_hackathon_lab.jpg';
import compAwardPodium from './assets/comp_award_podium.jpg';
import certRoboticsAward from './assets/cert_robotics_award.jpg';
import certAiGoldAward from './assets/cert_ai_gold_award.jpg';

// ============================================================================
// UNIVERSITY & ORGANIZER VECTOR SVG EMBLEMS / LOGOS
// Designed with crisp high-DPI paths, authentic branding colors and metallic foils
// ============================================================================

export const ChulaLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#FCE7F3" stroke="#DB2777" strokeWidth="3" />
    <circle cx="50" cy="50" r="41" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1.5" />
    {/* Phra Kiao / Coronet Emblem Motif */}
    <path d="M50 16L55 30H45L50 16Z" fill="#BE185D" />
    <path d="M36 28L44 38L32 38L36 28Z" fill="#DB2777" />
    <path d="M64 28L68 38L56 38L64 28Z" fill="#DB2777" />
    <path d="M26 40L38 46L24 50L26 40Z" fill="#BE185D" />
    <path d="M74 40L76 50L62 46L74 40Z" fill="#BE185D" />
    {/* Tiered Lotus Throne */}
    <rect x="28" y="52" width="44" height="6" rx="2" fill="#BE185D" />
    <rect x="32" y="60" width="36" height="5" rx="1.5" fill="#DB2777" />
    <rect x="36" y="67" width="28" height="4" rx="1" fill="#BE185D" />
    {/* Circular rays */}
    <circle cx="50" cy="50" r="6" fill="#F43F5E" />
    <circle cx="50" cy="50" r="3" fill="#FFE4E6" />
    <text x="50" y="84" textAnchor="middle" fill="#9D174D" fontSize="8" fontWeight="bold" fontFamily="sans-serif">CHULA</text>
  </svg>
);

export const KmitlLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#FFF7ED" stroke="#EA580C" strokeWidth="3" />
    <circle cx="50" cy="50" r="40" stroke="#FDBA74" strokeWidth="1.5" />
    {/* The Great Crown (พระมหามงกุฎ) */}
    <path d="M50 15L53 26H47L50 15Z" fill="#C2410C" />
    <path d="M38 27L50 42L62 27L58 48H42L38 27Z" fill="#EA580C" />
    <circle cx="50" cy="27" r="4" fill="#F97316" />
    <circle cx="38" cy="27" r="3" fill="#C2410C" />
    <circle cx="62" cy="27" r="3" fill="#C2410C" />
    {/* Cogwheel base */}
    <path d="M30 52H70L66 68H34L30 52Z" fill="#C2410C" />
    <rect x="26" y="70" width="48" height="6" rx="2" fill="#EA580C" />
    <text x="50" y="88" textAnchor="middle" fill="#9A3412" fontSize="9" fontWeight="800" fontFamily="sans-serif">KMITL</text>
  </svg>
);

export const KmuttLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#FEF2F2" stroke="#DC2626" strokeWidth="3" />
    <circle cx="50" cy="50" r="40" stroke="#FCA5A5" strokeWidth="1.5" />
    {/* Bangmod Crown & Torch */}
    <path d="M50 18L56 34H44L50 18Z" fill="#B91C1C" />
    <path d="M33 34L45 48L32 50L33 34Z" fill="#DC2626" />
    <path d="M67 34L68 50L55 48L67 34Z" fill="#DC2626" />
    <circle cx="50" cy="46" r="7" fill="#EF4444" />
    <circle cx="50" cy="46" r="3.5" fill="#FEF2F2" />
    <path d="M32 58H68L64 70H36L32 58Z" fill="#B91C1C" />
    <rect x="28" y="72" width="44" height="5" rx="1.5" fill="#991B1B" />
    <text x="50" y="88" textAnchor="middle" fill="#991B1B" fontSize="8.5" fontWeight="800" fontFamily="sans-serif">KMUTT</text>
  </svg>
);

export const NstdaLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#F0F9FF" stroke="#0284C7" strokeWidth="3" />
    <circle cx="50" cy="50" r="40" stroke="#BAE6FD" strokeWidth="1.5" />
    {/* Atomic & Orbit Nodes */}
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
    {/* Sema Wheel / Dhammachakra Seal */}
    <circle cx="50" cy="46" r="18" stroke="#15803D" strokeWidth="3" />
    <circle cx="50" cy="46" r="6" fill="#15803D" />
    <line x1="50" y1="28" x2="50" y2="64" stroke="#15803D" strokeWidth="2" />
    <line x1="32" y1="46" x2="68" y2="46" stroke="#15803D" strokeWidth="2" />
    <line x1="37" y1="33" x2="63" y2="59" stroke="#16A34A" strokeWidth="1.5" />
    <line x1="37" y1="59" x2="63" y2="33" stroke="#16A34A" strokeWidth="1.5" />
    <text x="50" y="82" textAnchor="middle" fill="#166534" fontSize="8" fontWeight="800" fontFamily="sans-serif">สพฐ.</text>
    <text x="50" y="90" textAnchor="middle" fill="#15803D" fontSize="6" fontWeight="bold" fontFamily="sans-serif">OBEC THAILAND</text>
  </svg>
);

export const PosnLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#FAF5FF" stroke="#7E22CE" strokeWidth="3" />
    <circle cx="50" cy="50" r="40" stroke="#E9D5FF" strokeWidth="1.5" />
    {/* Olympic Wreath & Flame */}
    <path d="M50 18Q54 28 50 36Q46 28 50 18Z" fill="#EAB308" />
    <path d="M48 24Q52 30 49 35Q46 30 48 24Z" fill="#F59E0B" />
    {/* Academic Crest */}
    <path d="M30 46Q34 60 50 66Q66 60 70 46L50 40L30 46Z" fill="#6B21A8" stroke="#EAB308" strokeWidth="1.5" />
    <text x="50" y="56" textAnchor="middle" fill="#FEF08A" fontSize="8" fontWeight="800" fontFamily="sans-serif">POSN</text>
    <text x="50" y="84" textAnchor="middle" fill="#581C87" fontSize="8" fontWeight="800" fontFamily="sans-serif">สอวน.</text>
  </svg>
);

// ============================================================================
// DATA STRUCTURE FOR COMPETITIONS
// ============================================================================

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
    id: 'rescue-robot-2024',
    title: 'การแข่งขันหุ่นยนต์กู้ภัยและสำรวจอัตโนมัติ ระดับภาค 2567',
    englishTitle: 'Regional Autonomous Rescue & Exploration Robotics 2024',
    award: 'รองชนะเลิศ อันดับ 1',
    awardLevel: 'silver',
    awardBadge: '🥈 รองชนะเลิศอันดับ 1 (1st Runner-Up)',
    organizer: 'จุฬาลงกรณ์มหาวิทยาลัย ร่วมกับ สพฐ.',
    organizerSub: 'Chulalongkorn University & OBEC Thailand',
    organizerLogo: ChulaLogo,
    accentColor: '#DB2777',
    badgeBg: 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/40 dark:text-pink-300 dark:border-pink-800/40',
    year: '2567',
    role: 'หัวหน้าทีม & ออกแบบระบบสมองกลฝังตัว (Team Leader & Embedded Engineer)',
    summary: 'ออกแบบอัลกอริทึม PID Control สำหรับการนำทางอัตโนมัติบนบอร์ด ESP32 เชื่อมต่อ LiDAR และกล้องประมวลผล Computer Vision เพื่อตรวจจับและเก็บกู้วัตถุจำลองในอารีน่าภัยพิบัติ',
    fullDesc: 'กันตภณทำหน้าที่นำทีม 8 คนในการออกแบบโครงสร้างกลไกและอัลกอริทึม โดยใช้ Closed-loop PID Controller ร่วมกับเซนเซอร์อินฟราเรด 6 จุดและ LiDAR คัดแยกสิ่งกีดขวาง ส่งข้อมูลผ่านโปรโตคอลความเร็วสูง ทำภารกิจสำเร็จภายในเวลา 1.45 นาที คว้ารองชนะเลิศอันดับ 1 จากผู้เข้าแข่งขัน 36 ทีมทั่วภาค',
    metrics: 'ความแม่นยำเซนเซอร์ 98.4% • เวลาต่อภารกิจ 1.45 นาที • แข่งขัน 36 ทีม',
    tech: ['ESP32', 'C/C++', 'OpenCV', 'PID Control', 'LiDAR Sensor', 'Fusion Algorithm'],
    photos: [compRobotRescue, compAwardPodium, compHackathonLab],
    certImage: certRoboticsAward,
    certSubtitle: 'เกียรติบัตรรับรองรางวัลรองชนะเลิศอันดับ 1 ระดับภาค พร้อมตราประทับมหาวิทยาลัยและ สพฐ.'
  },
  {
    id: 'national-gold-2023',
    title: 'งานศิลปหัตถกรรมนักเรียน ระดับชาติ ครั้งที่ 71 (โครงงานคอมพิวเตอร์)',
    englishTitle: '71st National Student Arts & Crafts Competition (Software CS Category)',
    award: 'เหรียญทอง ชนะเลิศระดับชาติ',
    awardLevel: 'gold',
    awardBadge: '🥇 เหรียญทอง ระดับชาติ (National Gold Medal)',
    organizer: 'สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ.)',
    organizerSub: 'Ministry of Education Thailand',
    organizerLogo: ObecLogo,
    accentColor: '#16A34A',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40',
    year: '2566 - 2567',
    role: 'ผู้วิจัยหลักและพัฒนาระบบ AI & Full-Stack (Lead Researcher & Developer)',
    summary: 'พัฒนาโครงงาน "ThaiMind" นวัตกรรมปัญญาประดิษฐ์ NLP ภาษาไทย สรุปเนื้อหาบทเรียนอัตโนมัติและสร้างแบบทดสอบเชิงลึก ทดลองใช้งานจริงกับนักเรียน 120 คนในโรงเรียน',
    fullDesc: 'นำเสนอผลงานต่อหน้าคณะกรรมการผู้ทรงคุณวุฒิระดับชาติ โดย Fine-tune สถาปัตยกรรม Transformer บนคลังข้อมูลภาษาไทยกว่า 50,000 ประโยค เพื่อให้สรุปความได้อย่างถูกต้องตามหลักภาษาไทย ไม่สูญเสียใจความสำคัญ ลดเวลาอ่านทบทวนได้ถึง 70% และได้รับคะแนนการประเมินอันดับ 1 ในระดับประเทศ',
    metrics: 'คะแนนการประเมิน 96.5/100 • เหรียญทองอันดับ 1 • ประหยัดเวลาอ่าน 70%',
    tech: ['Python', 'PyTorch', 'Transformers', 'FastAPI', 'React', 'Thai NLP'],
    photos: [compAwardPodium, compAiPresentation, compRobotRescue],
    certImage: certAiGoldAward,
    certSubtitle: 'เกียรติบัตรเหรียญทองระดับชาติ ออกโดยสำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน'
  },
  {
    id: 'ai-youth-challenge',
    title: 'Thailand AI Youth Challenge 2024 (การแข่งขัน AI ระดับเยาวชน)',
    englishTitle: 'Thailand AI Youth Challenge 2024 National Hackathon',
    award: 'Top 20 Finalist ระดับประเทศ',
    awardLevel: 'top',
    awardBadge: '🎖️ Top 20 Finalist ระดับประเทศ',
    organizer: 'สวทช. (NSTDA) ร่วมกับ สจล. ลาดกระบัง',
    organizerSub: 'National Science and Technology Development Agency & KMITL',
    organizerLogo: NstdaLogo,
    accentColor: '#0284C7',
    badgeBg: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800/40',
    year: '2567',
    role: 'ผู้พัฒนาโมเดล Computer Vision (Computer Vision & Model Optimization)',
    summary: 'ส่งผลงาน "LeafScan" โมเดล Edge AI ตรวจจับโรคพืชผลทางการเกษตร 12 ชนิด ทำงานแบบ Real-time บนอุปกรณ์พกพาโดยไม่ต้องเชื่อมต่ออินเทอร์เน็ต',
    fullDesc: 'ผ่านการคัดเลือกจากผู้ส่งผลงานกว่า 240 โครงงานทั่วประเทศ เข้าสู่รอบชิงชนะเลิศ 20 ทีมสุดท้าย ณ ศูนย์นิทรรศการและการประชุม โดยเทรนโมเดล MobileNetV3 และทำ 8-bit Quantization ให้เหลือขนาดเพียง 8.4MB มีความแม่นยำสูงถึง 94.2% พร้อมนำเสนอในเวที Tech Pitching',
    metrics: 'คัดเลือก 20 ทีมจาก 240+ ทีม • ความแม่นยำ 94.2% • โมเดลขนาด 8.4MB',
    tech: ['PyTorch', 'TensorFlow Lite', 'MobileNetV3', 'Edge Computing', 'Flutter'],
    photos: [compAiPresentation, compHackathonLab, compAwardPodium],
    certImage: certAiGoldAward,
    certSubtitle: 'เกียรติบัตรรับรอง Top 20 Finalist จากสำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ (สวทช.)'
  },
  {
    id: 'kmitl-hackathon',
    title: 'KMITL Engineering Innovation Hackathon 2024',
    englishTitle: 'KMITL Innovator Hackathon & Tech Showcase',
    award: 'รางวัลนวัตกรรมยอดเยี่ยมด้าน IoT',
    awardLevel: 'honor',
    awardBadge: '💡 Best IoT Innovation Award',
    organizer: 'สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง (KMITL)',
    organizerSub: 'Faculty of Engineering, KMITL Ladkrabang',
    organizerLogo: KmitlLogo,
    accentColor: '#EA580C',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800/40',
    year: '2567',
    role: 'ผู้พัฒนาสถาปัตยกรรมระบบ IoT & Dashboard (Full-Stack IoT Architect)',
    summary: 'สร้างต้นแบบ "AirSense Mesh Network" โครงข่ายเซนเซอร์วัดค่าฝุ่น PM2.5 และคุณภาพอากาศแบบกระจายศูนย์ พร้อมระบบพยากรณ์ความเสี่ยง',
    fullDesc: 'เข้าร่วมการแข่งขันแบบ Hackathon 48 ชั่วโมง คิดค้นโซลูชันเชื่อมต่อโหนดเซนเซอร์ SDS011 และ BME280 ผ่านโปรโตคอล ESP-NOW และ MQTT รวบรวมข้อมูลขึ้นเซิร์ฟเวอร์แบบ Real-time วิเคราะห์แนวโน้มการสะสมของฝุ่นในพื้นที่ ช่วยให้โรงเรียนบริหารกิจกรรมกลางแจ้งได้อย่างปลอดภัย',
    metrics: 'ตรวจวัดต่อเนื่อง 24/7 • ได้รับรางวัลนวัตกรรมยอดเยี่ยม • แฮกกาธอน 48 ชั่วโมง',
    tech: ['ESP-NOW', 'MQTT', 'InfluxDB', 'Grafana', 'C++', 'Node.js'],
    photos: [compHackathonLab, compRobotRescue, compAwardPodium],
    certImage: certRoboticsAward,
    certSubtitle: 'เกียรติบัตรรางวัลนวัตกรรมยอดเยี่ยม คณะวิศวกรรมศาสตร์ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง'
  },
  {
    id: 'posn-computer-camp',
    title: 'โอลิมปิกวิชาการ สอวน. คอมพิวเตอร์ ค่าย 1',
    englishTitle: 'POSN Computer Science Olympiad — Camp 1 Distinction',
    award: 'ผ่านการประเมินค่าย 1 (เกียรติบัตรผ่านการอบรม)',
    awardLevel: 'posn',
    awardBadge: '🧪 ผ่านการคัดเลือกและจบหลักสูตรค่าย 1',
    organizer: 'มูลนิธิ สอวน. ศูนย์มหาวิทยาลัยเกษตรศาสตร์',
    organizerSub: 'The Promotion of Academic Olympiads (POSN Foundation)',
    organizerLogo: PosnLogo,
    accentColor: '#7E22CE',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/40',
    year: '2566',
    role: 'ผู้แทนนักเรียนสอบคัดเลือก (Olympic Student Trainee)',
    summary: 'ผ่านการสอบคัดเลือกเข้าค่ายโอลิมปิกวิชาการ สาขาวิทยาการคอมพิวเตอร์ อบรมเข้มข้นด้านโครงสร้างข้อมูล ขั้นตอนวิธี (Algorithms) และการเขียนโปรแกรมเชิงลึก',
    fullDesc: 'ศึกษาและฝึกแก้โจทย์ปัญหาด้าน Data Structures & Algorithms ระดับสูง (Recursion, Graph Theory, Dynamic Programming, Time Complexity Optimization) ด้วยภาษา C++ ผ่านการประเมินผลปฏิบัติการและข้อเขียนภาคทฤษฎีตามมาตรฐานมูลนิธิ สอวน.',
    metrics: 'อันดับหัวกะทิของศูนย์สอบ • อบรมเข้มข้น 120 ชม. • อัลกอริทึม C++ ขั้นสูง',
    tech: ['C++', 'Algorithms', 'Data Structures', 'Graph Theory', 'Dynamic Programming'],
    photos: [compHackathonLab, compAiPresentation, compRobotRescue],
    certImage: certAiGoldAward,
    certSubtitle: 'เกียรติบัตรผ่านการอบรมหลักสูตรโอลิมปิกวิชาการ มูลนิธิ สอวน.'
  },
  {
    id: 'kmutt-bangmod-hackathon',
    title: 'Bangmod Junior Tech & Robotics Fair 2024',
    englishTitle: 'KMUTT Bangmod Junior Tech & Robotics Innovation',
    award: 'รางวัลชมเชยระดับเหรียญเงิน',
    awardLevel: 'silver',
    awardBadge: '🥈 รางวัลเกียรติคุณเหรียญเงิน (Silver Honor)',
    organizer: 'มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี (KMUTT บางมด)',
    organizerSub: 'King Mongkut’s University of Technology Thonburi',
    organizerLogo: KmuttLogo,
    accentColor: '#DC2626',
    badgeBg: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800/40',
    year: '2567',
    role: 'หัวหน้านักพัฒนาซอฟต์แวร์ควบคุม (Lead Control Software Developer)',
    summary: 'การประกวดนวัตกรรมหุ่นยนต์และระบบควบคุมอัตโนมัติ ออกแบบวงจรและโปรแกรมระบบขับเคลื่อนอัจฉริยะ',
    fullDesc: 'เข้าร่วมการแข่งขันการแก้ปัญหาด้วยหุ่นยนต์และเทคโนโลยีอัตโนมัติ ณ อาคารปฏิบัติการวิศวกรรม มจธ. บางมด พัฒนาระบบขับเคลื่อนมอเตอร์แบบสองแกนร่วมกับบอร์ดเซนเซอร์ตรวจจับพื้นผิวและสัญญาณไร้สาย ได้รับคำชมเชยจากคณาจารย์ภาควิชาวิศวกรรมเครื่องกลและวิศวกรรมคอมพิวเตอร์',
    metrics: 'รางวัลเหรียญเงิน • คะแนนทักษะการแก้โจทย์ 91% • โชว์ผลงานหน้าคณาจารย์ มจธ.',
    tech: ['Arduino', 'Motor Drivers', 'PID Tuning', 'Bluetooth Low Energy', 'Circuit Design'],
    photos: [compRobotRescue, compAwardPodium, compHackathonLab],
    certImage: certRoboticsAward,
    certSubtitle: 'เกียรติบัตรรางวัลเหรียญเงิน มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี'
  }
];
