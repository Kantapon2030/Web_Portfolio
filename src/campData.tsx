import React from 'react';
// University & Organizer Vector SVG Emblems / Logos
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

// Imported authentic CUEE Camp certificate and activity photos
import cueeRealCert from './assets/camps/cuee_real_cert.jpg';
import cueeActivity1 from './assets/camps/cuee_activity_1.jpg';
import cueeActivity2 from './assets/camps/cuee_activity_2.jpg';
import cueeActivity3 from './assets/camps/cuee_activity_3.jpg';

import ceNextGenHackathon from './assets/camps/ce_nextgen_hackathon.jpg';
import cert04 from './assets/certificate/cert_04.png';

import kuUpskillCert from './assets/camps/up skill ku certificate.jpg';
import kuUpskillPhoto from './assets/camps/upskill ku.jpg';

import icsyouImg1 from './assets/camps/icsyou_camp_img_1.jpg';
import icsyouImg2 from './assets/camps/icsyou_camp_img_2.jpg';
import icsyouImg3 from './assets/camps/icsyou_camp_img_3.jpg';
import icsyouImg4 from './assets/camps/icsyou_camp_img_4.jpg';
import icsyouRealCert from './assets/camps/icsyou_real_cert.jpg';

export interface CampPhoto {
  url: string;
  caption: string;
  tag: string;
}

export interface CampItem {
  id: string;
  indexTag: string;
  badge: string;
  badgeType: 'chula' | 'kmitl' | 'ku' | 'psu' | 'posn' | 'cs';
  title: string;
  thaiSubtitle: string;
  organizer: string;
  faculty: string;
  organizerLogo: React.FC<{ className?: string }>;
  date: string;
  description: string;
  shortSummary: string;
  mascotTip: string;
  certificateImg: string;
  certificateCaption: string;
  galleryPhotos: CampPhoto[];
  role: string;
  technologies: string[];
  highlights: string[];
  accentColor: string;
}

export const CAMPS_DATA: CampItem[] = [
  {
    id: 'cuee-camp-2026',
    indexTag: '01 / 04 · CHULALONGKORN UNIVERSITY',
    badge: 'CHULA · CUEE 2026',
    badgeType: 'chula',
    title: 'CUEE CAMP 2026 (ค่ายวิศวกรรมไฟฟ้า จุฬาฯ)',
    thaiSubtitle: 'ค่ายเจาะลึก 4 สาขาวิศวกรรมไฟฟ้าและการพัฒนา Mini IoT Project',
    organizer: 'จุฬาลงกรณ์มหาวิทยาลัย',
    faculty: 'ภาควิชาวิศวกรรมไฟฟ้า คณะวิศวกรรมศาสตร์',
    organizerLogo: ChulaLogo,
    date: '7 - 22 มีนาคม 2569 (ระดับชาติ)',
    description:
      'ผ่านการคัดเลือกเข้าเรียนรู้พื้นฐานวิศวกรรมไฟฟ้าแบบเจาะลึกทั้ง 4 สาขาหลัก (Communication, Electronics, Power, Control) และได้ลงมือพัฒนา Mini IoT Project ในช่วงท้ายของค่าย ซึ่งองค์ความรู้และไอเดียตั้งต้นจากค่ายนี้เป็นจุดริเริ่มสำคัญที่นำไปประยุกต์และต่อยอดจนกลายเป็นผลงานนวัตกรรมระดับชาติ "แพลตฟอร์มสมาร์ทสองแถว"',
    shortSummary:
      'เจาะลึก 4 สาขาวิศวกรรมไฟฟ้า (Comms, Power, Electronics, Control) และพัฒนา Mini IoT Project ซึ่งเป็นรากฐานไอเดียสู่นวัตกรรมสมาร์ทสองแถว',
    mascotTip: 'ค่ายนี้แหละครับที่เป็นจุดประกายเริ่มต้นของโปรเจกต์สมาร์ทสองแถว!',
    certificateImg: cueeRealCert,
    certificateCaption: 'ประกาศนียบัตรผ่านการเข้าร่วมกิจกรรม ค่ายวิศวกรรมไฟฟ้า จุฬาลงกรณ์มหาวิทยาลัย (CUEE CAMP 2026)',
    galleryPhotos: [
      {
        url: cueeActivity1,
        caption: 'ภาพถ่ายร่วมกับเพื่อนๆ ค่ายวิศวกรรมไฟฟ้า ณ ลานหน้าคณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย',
        tag: 'CAMP PHOTO',
      },
      {
        url: cueeActivity2,
        caption: 'การลงมือเขียนโค้ดและประกอบรถหุ่นยนต์ Mini IoT Project ในห้องปฏิบัติการภาควิชาวิศวกรรมไฟฟ้า',
        tag: 'HANDS-ON LAB',
      },
      {
        url: cueeActivity3,
        caption: 'บรรยากาศการเรียนรู้ทฤษฎีวิศวกรรมไฟฟ้า 4 สาขาหลัก (Comms, Power, Electronics, Control) ในห้องบรรยาย',
        tag: 'WORKSHOP',
      },
    ],
    role: 'ผู้เข้าร่วมค่าย & ผู้พัฒนา Mini IoT Project (Hands-on Developer)',
    technologies: [
      'Microcontroller & IoT',
      'Electronic Circuits',
      'Wireless Communication',
      'Control Systems (PID)',
      'Sensor Telemetry',
      'Power Electronics',
    ],
    highlights: [
      'เรียนรู้เจาะลึกระบบอิเล็กทรอนิกส์และวงจรสื่อสารไร้สายระดับมหาวิทยาลัย',
      'ออกแบบและประกอบวงจรฮาร์ดแวร์จริงพร้อมเชื่อมต่อเซนเซอร์ตรวจจับ',
      'ทดลองเขียนโปรแกรมส่งสัญญาณข้อมูลแบบ Real-time เข้าสู่ระบบ Cloud',
      'นำองค์ความรู้จากค่ายนี้ไปเป็นจุดกำเนิดของโครงงาน Smart Songthaew (NSC 2026)',
    ],
    accentColor: '#4F46E5', // Electric Indigo
  },
  {
    id: 'ce-nextgen-camp',
    indexTag: '02 / 04 · KMITL LADKRABANG',
    badge: 'KMITL · CE NEXT GEN #3',
    badgeType: 'kmitl',
    title: 'โครงการค่ายฝึกอบรมเชิงปฏิบัติการ CE NEXT GEN ครั้งที่ 3',
    thaiSubtitle: 'ค่ายปูพื้นฐานการพัฒนา Web Application และการสร้าง Portfolio จากศูนย์',
    organizer: 'สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง (KMITL)',
    faculty: 'ภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์',
    organizerLogo: KmitlLogo,
    date: '3 - 7 ธันวาคม 2568 (ระดับชาติ)',
    description:
      'ผ่านการคัดเลือกเข้ารับการฝึกอบรมเข้มข้นเพื่อปูพื้นฐานการเขียนโปรแกรมพัฒนาเว็บแอปพลิเคชัน (HTML, CSS, JavaScript) และนำความรู้ที่ได้มาประยุกต์ใช้ในการทำโปรเจกต์จบของค่าย โดยได้ลงมือเขียนโค้ดเพื่อสร้างเว็บไซต์ Portfolio ของตนเองขึ้นมาตั้งแต่ต้นจนจบด้วยตัวเองทั้งหมด โดยไม่พึ่งพาเครื่องมือ AI เพื่อทำความเข้าใจโครงสร้างและแก่นแท้ของการเขียนโปรแกรมอย่างแท้จริง',
    shortSummary:
      'ฝึกอบรมเข้มข้นด้าน Web Development (HTML/CSS/JS) ปูพื้นฐานการเขียนโค้ดและพัฒนาเว็บไซต์ Portfolio ด้วยตนเอง 100% โดยไม่พึ่งพา AI',
    mascotTip: 'ค่ายนี้ผมเขียนโค้ดทำเว็บพอร์ตด้วยตัวเอง 100% ลุยตั้งแต่ศูนย์เลยครับ!',
    certificateImg: cert04,
    certificateCaption: 'เกียรติบัตรผ่านการสำเร็จการอบรม โครงการค่ายฝึกอบรมเชิงปฏิบัติการ CE NEXT GEN ครั้งที่ 3 ภาควิชาวิศวกรรมคอมพิวเตอร์ สจล. ลาดกระบัง',
    galleryPhotos: [
      {
        url: ceNextGenHackathon,
        caption: 'ภาพขณะลงมือปฏิบัติการเขียนโค้ดสดและพัฒนา Web Application ในห้องแล็บคอมพิวเตอร์ ค่าย CE NEXT GEN #3 สจล. ลาดกระบัง',
        tag: 'HANDS-ON CODING',
      },
    ],
    role: 'ผู้เข้าร่วมค่าย & Full-Stack Web Developer (Solo Coder)',
    technologies: [
      'HTML5 Semantic Structure',
      'Vanilla CSS & Responsive Design',
      'JavaScript (ES6+ Logic)',
      'DOM Manipulation',
      'Git Version Control',
      'Web Performance Optimization',
    ],
    highlights: [
      'เข้าใจรากฐานของ Web Platform อย่างถ่องแท้จากการเขียนโค้ดด้วยตนเอง 100%',
      'เรียนรู้แนวคิด Component-driven Design และการบริหารจัดการ Responsive Layout',
      'พัฒนาโครงงานเว็บไซต์ของตนเองจนผ่านการประเมินสำเร็จการอบรม',
      'สร้างสายสัมพันธ์กับรุ่นพี่ภาควิชาวิศวกรรมคอมพิวเตอร์ สจล. ลาดกระบัง',
    ],
    accentColor: '#6366F1', // Royal Violet
  },
  {
    id: 'icsyou-camp',
    indexTag: '03 / 04 · KASETSART UNIVERSITY',
    badge: 'KU CS · 2ND RUNNER-UP',
    badgeType: 'ku',
    title: 'กิจกรรม I CS YOU CAMP 2026 และการแข่งขัน Pitching Project',
    thaiSubtitle: 'ค่ายวิทยาการคอมพิวเตอร์ ม.เกษตรศาสตร์ · รางวัลรองชนะเลิศอันดับที่ 2 (Second Runner-Up)',
    organizer: 'มหาวิทยาลัยเกษตรศาสตร์ (Kasetsart University)',
    faculty: 'ภาควิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์',
    organizerLogo: KuLogo,
    date: '1 - 2 สิงหาคม 2569 (ระดับชาติ)',
    description:
      'เข้าร่วมกิจกรรมค่ายวิทยาการคอมพิวเตอร์ (I CS YOU CAMP 2026) ณ ภาควิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์ มหาวิทยาลัยเกษตรศาสตร์ ได้ศึกษาเรียนรู้กระบวนการออกแบบ UI/UX อย่างเป็นระบบด้วย Figma และ Stitch พร้อมทั้งฝึกฝนการพัฒนาเว็บแอปพลิเคชันแบบ Full-Stack ด้วยการประยุกต์ใช้ AI ในช่วงโปรเจกต์จบของค่ายได้ทำหน้าที่เป็น Prompt Engineer และเป็นแกนหลักในการนำเสนอและปรับจูนไอเดียนวัตกรรมร่วมกับเพื่อนในทีม จนสามารถพาทีมคว้ารางวัล "รองชนะเลิศอันดับที่ 2" (Second Runner-Up) ในการแข่งขัน Pitching Project มาครองได้สำเร็จ',
    shortSummary:
      'เรียนรู้ UI/UX ด้วย Figma & Stitch และสร้างเว็บ Full-Stack ด้วย AI พร้อมทำหน้าที่ Prompt Engineer ปรับจูนไอเดียจนคว้ารางวัลรองชนะเลิศอันดับ 2',
    mascotTip: 'ค่ายนี้ผมทำหน้าที่ Prompt Engineer และคอยปรับจูนไอเดียกับเพื่อนๆ จนคว้ารองชนะเลิศอันดับ 2 มาได้ครับ!',
    certificateImg: icsyouRealCert,
    certificateCaption: 'ประกาศนียบัตรรางวัลรองชนะเลิศอันดับที่ 2 การแข่งขัน Pitching Project ในกิจกรรม I CS YOU CAMP 2026 มหาวิทยาลัยเกษตรศาสตร์',
    galleryPhotos: [
      {
        url: icsyouImg1,
        caption: 'ถ่ายภาพร่วมกับทีมและคณะกรรมการบนเวทีในพิธีมอบรางวัล "รองชนะเลิศอันดับที่ 2" (Second Runner-Up)',
        tag: 'AWARD CEREMONY',
      },
      {
        url: icsyouImg2,
        caption: 'บรรยากาศการระดมความคิด นำเสนอ และปรับจูนไอเดียโปรเจกต์นวัตกรรมร่วมกับเพื่อนร่วมทีมอย่างจริงจัง',
        tag: 'TEAM IDEATION',
      },
      {
        url: icsyouImg3,
        caption: 'การลงมือเขียนโค้ดและทำ Prompt Engineering พัฒนา Full-Stack Web ด้วย AI ในห้องแล็บคอมพิวเตอร์',
        tag: 'FULL-STACK & AI',
      },
      {
        url: icsyouImg4,
        caption: 'การฝึกอบรมเชิงลึกด้านการออกแบบโครงสร้าง UI/UX และดีไซน์ซิสเต็มด้วยเครื่องมือ Figma และ Stitch',
        tag: 'UI/UX DESIGN',
      },
    ],
    role: 'Prompt Engineer & Ideation Lead (รองชนะเลิศอันดับ 2)',
    technologies: [
      'Prompt Engineering',
      'Full-Stack Web (AI-Driven)',
      'UI/UX Design (Figma)',
      'Stitch Design System',
      'Team Ideation & Brainstorming',
      'Pitching & Presentation',
    ],
    highlights: [
      'คว้ารางวัลรองชนะเลิศอันดับที่ 2 (Second Runner-Up) การแข่งขัน Pitching Project ของค่าย',
      'ทำหน้าที่หลักด้าน Prompt Engineering ในการนำ AI มาช่วยพัฒนา Full-Stack Web Application',
      'เรียนรู้การออกแบบ UI/UX เชิงลึกด้วย Figma และเทคนิคการวางระบบด้วย Stitch',
      'เป็นแกนหลักในการนำเสนอ ถกเถียง และปรับจูนแนวคิดนวัตกรรมร่วมกับเพื่อนร่วมทีม',
    ],
    accentColor: '#10B981', // Emerald Green
  },
  {
    id: 'ku-upskill-camp',
    indexTag: '04 / 04 · KASETSART UNIVERSITY',
    badge: 'KU · รศ.ยืน ภู่วรวรรณ',
    badgeType: 'ku',
    title: 'การฝึกอบรม Engineering Up Skill: Hands-on AI & Smart Systems',
    thaiSubtitle: 'ถ่ายทอดทักษะวิศวกรและการคิดเชิงตรรกะ โดย รศ.ยืน ภู่วรวรรณ ปรมาจารย์ด้านคอมพิวเตอร์ไทย',
    organizer: 'มหาวิทยาลัยเกษตรศาสตร์',
    faculty: 'ภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์',
    organizerLogo: KuLogo,
    date: '13 - 14 มิถุนายน 2569 (ระดับชาติ)',
    description:
      'เป็นหนึ่งในผู้ผ่านการคัดเลือกเข้ารับการถ่ายทอดองค์ความรู้และทักษะความเป็นวิศวกรจาก "รองศาสตราจารย์ ยืน ภู่วรวรรณ" อาจารย์อาวุโสประจำภาควิชาวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยเกษตรศาสตร์ ผู้ได้รับการยกย่องเป็นปรมาจารย์คนสำคัญของวงการวิทยาการคอมพิวเตอร์และวิศวกรรมคอมพิวเตอร์ไทย โดยได้รับการปลูกฝังกระบวนการคิดเชิงตรรกะแบบวิศวกร (Engineering Logic) ตั้งแต่ระดับรากฐาน ซึมซับ Mindset สำคัญว่า "ทุกสิ่งในโลกนี้ เราสามารถสร้างมันขึ้นมาได้" พร้อมลงมือปฏิบัติจริง (Hands-on) ด้านเทคโนโลยีปัญญาประดิษฐ์ (AI) และระบบอัจฉริยะ (Smart Systems)',
    shortSummary:
      'รับการถ่ายทอดทักษะวิศวกรและการคิดเชิงตรรกะ (Engineering Logic) โดยตรงจาก รศ.ยืน ภู่วรวรรณ ปรมาจารย์คอมพิวเตอร์ไทย อาจารย์อาวุโส ภาควิชาวิศวกรรมคอมพิวเตอร์ ม.เกษตรศาสตร์',
    mascotTip: 'ได้ถ่ายทอดวิชาและแนวคิดวิศวกรโดยตรงจาก รศ.ยืน ภู่วรวรรณ ปรมาจารย์คอมพิวเตอร์ไทย: "ทุกสิ่งในโลกเราสร้างได้" ครับ!',
    certificateImg: kuUpskillCert,
    certificateCaption: 'เกียรติบัตรผ่านการฝึกอบรม Engineering Up Skill: Hands-on AI & Smart Systems มหาวิทยาลัยเกษตรศาสตร์',
    galleryPhotos: [
      {
        url: kuUpskillPhoto,
        caption: 'ภาพถ่ายร่วมกับ รศ.ยืน ภู่วรวรรณ อาจารย์อาวุโส ภาควิชาวิศวกรรมคอมพิวเตอร์ ม.เกษตรศาสตร์ ปรมาจารย์แห่งวงการคอมพิวเตอร์ไทย',
        tag: 'WITH MASTER YUEN',
      },
    ],
    role: 'ผู้เข้ารับการอบรม (Engineering Logic & AI Trainee)',
    technologies: [
      'Engineering Logic & Thinking',
      'Problem-Solving Mindset',
      'Artificial Intelligence (AI)',
      'Smart Systems Architecture',
      'Computer Vision Inference',
      'Hands-on Prototyping',
    ],
    highlights: [
      'ได้รับการถ่ายทอดกระบวนการคิดเชิงตรรกะ (Engineering Logic) และทักษะวิศวกรจาก รศ.ยืน ภู่วรวรรณ ปรมาจารย์คอมพิวเตอร์ไทย',
      'อาจารย์อาวุโสประจำภาควิชาวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยเกษตรศาสตร์',
      'ปลูกฝัง Mindset สำคัญระดับปรมาจารย์: "ทุกสิ่งในโลกนี้ เราสามารถสร้างมันขึ้นมาได้"',
      'ฝึกคิดวิเคราะห์ปัญหาอย่างเป็นเหตุเป็นผล และปฏิบัติการระบบ AI & Smart Systems จริงในห้องแล็บ',
    ],
    accentColor: '#7C3AED', // Deep Violet
  },
];
