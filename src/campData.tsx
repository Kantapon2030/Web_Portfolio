import React from 'react';
import {
  ChulaLogo,
  KmitlLogo,
  KuLogo,
  PsuLogo,
} from './competitionData';

// Imported authentic CUEE Camp certificate and activity photos
import cueeRealCert from './assets/camps/cuee_real_cert.jpg';
import cueeActivity1 from './assets/camps/cuee_activity_1.jpg';
import cueeActivity2 from './assets/camps/cuee_activity_2.jpg';
import cueeActivity3 from './assets/camps/cuee_activity_3.jpg';

import ceNextGenImg1 from './assets/camps/ce_nextgen_img_1.jpg';
import ceNextGenImg2 from './assets/camps/ce_nextgen_img_2.jpg';
import ceNextGenImg3 from './assets/camps/ce_nextgen_img_3.jpg';
import ceNextGenImg4 from './assets/camps/ce_nextgen_img_4.jpg';

import kuUpskillImg1 from './assets/camps/ku_upskill_img_1.jpg';
import kuUpskillImg2 from './assets/camps/ku_upskill_img_2.jpg';
import kuUpskillImg3 from './assets/camps/ku_upskill_img_3.jpg';
import kuUpskillImg4 from './assets/camps/ku_upskill_img_4.jpg';

import icsyouImg1 from './assets/camps/icsyou_camp_img_1.jpg';
import icsyouImg2 from './assets/camps/icsyou_camp_img_2.jpg';
import icsyouImg3 from './assets/camps/icsyou_camp_img_3.jpg';
import icsyouImg4 from './assets/camps/icsyou_camp_img_4.jpg';

import kmitlPreengImg1 from './assets/camps/kmitl_preeng_img_1.jpg';
import kmitlPreengImg2 from './assets/camps/kmitl_preeng_img_2.jpg';
import kmitlPreengImg3 from './assets/camps/kmitl_preeng_img_3.jpg';
import kmitlPreengImg4 from './assets/camps/kmitl_preeng_img_4.jpg';

// Authentic KU Emblem SVG removed as it is now imported from competitionData.tsx

// Authentic PSU Emblem SVG removed as it is now imported from competitionData.tsx

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
    indexTag: '01 / 05 · CHULALONGKORN UNIVERSITY',
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
    indexTag: '02 / 05 · KMITL LADKRABANG',
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
    certificateImg: ceNextGenImg4,
    certificateCaption: 'เกียรติบัตรผ่านการสำเร็จการอบรม ค่าย CE NEXT GEN ครั้งที่ 3 สจล. ลาดกระบัง',
    galleryPhotos: [
      {
        url: ceNextGenImg1,
        caption: 'การเรียนรู้โครงสร้าง DOM, Modern CSS Architecture และ JavaScript Engine',
        tag: 'FRONTEND LAB',
      },
      {
        url: ceNextGenImg2,
        caption: 'ช่วงเวลาแห่งการลงมือเขียนโค้ดสด (Live Coding) เพื่อพัฒนาโครงงานเว็บจบของค่าย',
        tag: 'LIVE CODING',
      },
      {
        url: ceNextGenImg3,
        caption: 'บรรยากาศการนำเสนอผลงาน Portfolio Website ต่อหน้าอาจารย์และรุ่นพี่วิศวะคอมฯ',
        tag: 'FINAL SHOWCASE',
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
    id: 'ku-upskill-camp',
    indexTag: '03 / 05 · KASETSART UNIVERSITY',
    badge: 'KU · AI & SMART SYSTEMS',
    badgeType: 'ku',
    title: 'การฝึกอบรม Engineering Up Skill: Hands-on AI & Smart Systems',
    thaiSubtitle: 'การถ่ายทอดกระบวนการคิดเชิงตรรกะแบบวิศวกร (Engineering Logic) โดย รศ. ยืน ภู่วรวรรณ',
    organizer: 'มหาวิทยาลัยเกษตรศาสตร์',
    faculty: 'ภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์',
    organizerLogo: KuLogo,
    date: '13 - 14 มิถุนายน 2569 (ระดับชาติ)',
    description:
      'เป็นหนึ่งในผู้ที่ผ่านการคัดเลือกเข้ารับการถ่ายทอดความรู้และทักษะความเป็นวิศวกรจาก รองศาสตราจารย์ ยืน ภู่วรวรรณ โดยตรง ทำให้ได้รับการปลูกฝังกระบวนการคิดเชิงตรรกะแบบวิศวกร (Engineering Logic) ที่เชื่อมั่นว่า "ทุกสิ่งในโลกนี้เราสามารถสร้างมันขึ้นมาได้" พร้อมทั้งได้ลงมือปฏิบัติจริง (Hands-on) เกี่ยวกับการทำงานของเทคโนโลยีปัญญาประดิษฐ์ (AI) และระบบอัจฉริยะ (Smart Systems)',
    shortSummary:
      'รับการถ่ายทอด Engineering Mindset จาก รศ. ยืน ภู่วรวรรณ พร้อมปฏิบัติการ AI และ Smart Systems เพื่อการแก้ปัญหาจริงในระดับวิศวกรรม',
    mascotTip: 'ได้ Mindset จาก รศ. ยืน ภู่วรวรรณ: "ทุกสิ่งในโลกเราสร้างได้" ครับ!',
    certificateImg: kuUpskillImg1,
    certificateCaption: 'เกียรติบัตรผ่านการฝึกอบรม Hands-on AI & Smart Systems มหาวิทยาลัยเกษตรศาสตร์',
    galleryPhotos: [
      {
        url: kuUpskillImg2,
        caption: 'การรับฟังการบรรยายวิสัยทัศน์และการคิดแบบวิศวกรจาก รศ. ยืน ภู่วรวรรณ อย่างใกล้ชิด',
        tag: 'KEYNOTE SESSION',
      },
      {
        url: kuUpskillImg3,
        caption: 'การทดลองเขียนโปรแกรมเชื่อมต่อระบบตรวจจับภาพและอัลกอริทึมปัญญาประดิษฐ์',
        tag: 'AI WORKSHOP',
      },
      {
        url: kuUpskillImg4,
        caption: 'บรรยากาศการร่วมแลกเปลี่ยนแนวคิดนวัตกรรมกับเพื่อนนักเรียนด้านวิศวกรรมทั่วประเทศ',
        tag: 'SMART SYSTEMS LAB',
      },
    ],
    role: 'ผู้เข้ารับการอบรม (Engineering Trainee & AI Researcher)',
    technologies: [
      'Engineering Logic & Philosophy',
      'Artificial Intelligence (AI)',
      'Smart Systems Architecture',
      'Computer Vision Inference',
      'Embedded Machine Learning',
      'Problem Decomposition',
    ],
    highlights: [
      'รับการถ่ายทอด Mindset วิศวกร: "ทุกสิ่งในโลกนี้ เราสามารถสร้างมันขึ้นมาได้"',
      'เรียนรู้สถาปัตยกรรมของระบบ AI ที่ทำงานร่วมกับอุปกรณ์ Smart Hardware',
      'ฝึกวิเคราะห์โจทย์ปัญหาระดับประเทศและแตกองค์ประกอบเพื่อหาทางแก้ด้วยเทคโนโลยี',
      'ต่อยอดแนวคิดสู่การเป็นนักพัฒนาเทคโนโลยี AI ที่แก้ปัญหาได้จริง',
    ],
    accentColor: '#7C3AED', // Deep Violet
  },
  {
    id: 'icsyou-camp',
    indexTag: '04 / 05 · CS & TECH HACKATHON',
    badge: 'I CS YOU · PITCHING AWARD',
    badgeType: 'cs',
    title: 'กิจกรรม I CS YOU CAMP 2026 และการแข่งขัน Pitching Project',
    thaiSubtitle: 'ค่ายวิทยาการคอมพิวเตอร์และการแข่งขันประชันไอเดียนวัตกรรมเทคโนโลยี',
    organizer: 'สถาบันการศึกษาเครือข่ายความร่วมมือทางวิทยาการคอมพิวเตอร์',
    faculty: 'สาขาวิทยาการคอมพิวเตอร์ (Computer Science)',
    organizerLogo: PsuLogo,
    date: 'พฤษภาคม 2569 (ระดับภูมิภาค)',
    description:
      'เข้าร่วมกิจกรรมค่ายวิทยาการคอมพิวเตอร์เพื่อเสริมสร้างทักษะ Computational Thinking, Data Structures และการทำงานเป็นทีม พร้อมเข้าร่วมการแข่งขัน Pitching Project ประชันไอเดียการประยุกต์ใช้เทคโนโลยีแก้ปัญหาเชิงสังคม นำเสนอแนวคิดต่อหน้าคณาจารย์ผู้ทรงคุณวุฒิ',
    shortSummary:
      'เสริมสร้างทักษะ Computational Thinking และการแข่งขัน Pitching Project ประชันไอเดียการประยุกต์ใช้เทคโนโลยีแก้ปัญหาเชิงสังคม',
    mascotTip: 'ได้ขึ้นเวที Pitching นำเสนอไอเดียนวัตกรรมเทคโนโลยีเพื่อสังคมต่อหน้ากรรมการ!',
    certificateImg: icsyouImg1,
    certificateCaption: 'เกียรติบัตรผ่านการเข้าร่วมและแข่งขัน Pitching Project ในค่าย I CS YOU 2026',
    galleryPhotos: [
      {
        url: icsyouImg2,
        caption: 'บรรยากาศการร่วมทำกิจกรรมปฏิบัติการเขียนโค้ดและทดสอบตรรกะโปรแกรมกับเพื่อนร่วมทีม',
        tag: 'CS WORKSHOP',
      },
      {
        url: icsyouImg3,
        caption: 'ช่วงเวลาการพัฒนาและปรับแต่ง Presentation Slide สำหรับการขึ้นเวที Pitching',
        tag: 'PROJECT PITCH',
      },
      {
        url: icsyouImg4,
        caption: 'การแลกเปลี่ยนความรู้และมุมมองด้านเทคโนโลยีร่วมกับวิทยากรและรุ่นพี่ในค่าย',
        tag: 'NETWORKING',
      },
    ],
    role: 'Lead Tech Pitcher & Developer',
    technologies: [
      'Computational Thinking',
      'Agile Team Collaboration',
      'Tech Pitching & Communication',
      'Data Analytics Fundamentals',
      'Prototype Wireframing',
      'User-Centric Design',
    ],
    highlights: [
      'ฝึกทักษะการสื่อสารทางเทคนิค (Tech Storytelling) ให้เข้าใจง่ายและทรงพลัง',
      'ระดมสมองและพัฒนาโปรเจกต์ต้นแบบภายในเวลาจำกัดร่วมกับเพื่อนในค่าย',
      'รับคำแนะนำและมุมมองเชิงลึกจากคณาจารย์ผู้เชี่ยวชาญด้านวิทยาการคอมพิวเตอร์',
    ],
    accentColor: '#3B82F6', // Cobalt Blue
  },
  {
    id: 'kmitl-preeng-program',
    indexTag: '05 / 05 · K-ENGINEERING EXTENSION',
    badge: 'KMITL · PRE-ENGINEERING',
    badgeType: 'kmitl',
    title: 'โครงการเตรียมวิศวกรรม KMITL Pre-Engineering School Program 2025',
    thaiSubtitle: 'หลักสูตรเรียนล่วงหน้าระดับมหาวิทยาลัย รายวิชา Computer Programming',
    organizer: 'สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง (KMITL)',
    faculty: 'K-Engineering Extension School, Faculty of Engineering',
    organizerLogo: KmitlLogo,
    date: '2568 (ระดับชาติ)',
    description:
      'เข้าร่วมโครงการเรียนล่วงหน้าระดับมหาวิทยาลัย (Pre-Engineering) ในรายวิชาการเขียนโปรแกรมคอมพิวเตอร์พื้นฐาน (Computer Programming) ของคณะวิศวกรรมศาสตร์ สจล. เพื่อเตรียมความพร้อมสู่การเป็นวิศวกร โดยได้ศึกษาโครงสร้างภาษาคอมพิวเตอร์ การแก้ปัญหาเชิงตรรกะ และการเขียนโค้ดอย่างเป็นระบบ ซึ่งเป็นการปูพื้นฐานทางวิศวกรรมที่สำคัญในการนำไปต่อยอดพัฒนานวัตกรรมและระบบอัจฉริยะต่อไป',
    shortSummary:
      'สำเร็จหลักสูตรเรียนล่วงหน้า Computer Programming คณะวิศวะ สจล. ปูพื้นฐานภาษาคอมพิวเตอร์และอัลกอริทึมตามมาตรฐานวิศวกรรมศาสตร์',
    mascotTip: 'เรียนวิชาการเขียนโปรแกรมของมหาวิทยาลัยล่วงหน้า และสอบผ่านเกณฑ์วิศวะ สจล. ครับ!',
    certificateImg: kmitlPreengImg1,
    certificateCaption: 'เกียรติบัตร "ผ่าน" การอบรมหลักสูตร Computer Programming คณะวิศวกรรมศาสตร์ สจล.',
    galleryPhotos: [
      {
        url: kmitlPreengImg2,
        caption: 'การศึกษาโครงสร้างภาษาและอัลกอริทึมการคำนวณขั้นสูงตามเกณฑ์มาตรฐานวิศวกรรมศาสตร์',
        tag: 'ACADEMIC COURSE',
      },
      {
        url: kmitlPreengImg3,
        caption: 'การฝึกเขียนโค้ดแก้โจทย์ปัญหาแบบอัตโนมัติและการทดสอบประสิทธิภาพความเร็วโค้ด',
        tag: 'SYSTEMATIC CODING',
      },
      {
        url: kmitlPreengImg4,
        caption: 'บทเรียนการเชื่อมต่อโปรแกรมเข้ากับระบบสมองกลและโครงสร้างข้อมูลระดับปริญญาตรี',
        tag: 'PRE-ENGINEERING',
      },
    ],
    role: 'Pre-Engineering Student (เกรดการประเมิน: ผ่านตามมาตรฐานวิศวกรรมศาสตร์)',
    technologies: [
      'University-level C/C++',
      'Structured Programming',
      'Algorithmic Problem Solving',
      'Memory Management Basics',
      'Modular Code Architecture',
      'Time & Space Complexity',
    ],
    highlights: [
      'สำเร็จหลักสูตรวิศวกรรมศาสตร์ระดับปริญญาตรีล่วงหน้าตั้งแต่ชั้นมัธยมศึกษา',
      'ผ่านการประเมินผลการสอบปฏิบัติการเขียนโปรแกรมอย่างเป็นระบบ',
      'มีความพร้อมเต็มเปี่ยมสำหรับการศึกษาต่อในระดับวิศวกรรมคอมพิวเตอร์',
    ],
    accentColor: '#8B5CF6', // Electric Purple
  },
];
