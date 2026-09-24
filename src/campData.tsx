import React from 'react';
import {
  ChulaLogo,
  KmitlLogo,
  KuLogo,
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

import kuUpskillCert from './assets/camps/up skill ku certificate.jpg';
import kuUpskillPhoto from './assets/camps/upskill ku.jpg';

import icsyouImg1 from './assets/camps/icsyou_camp_img_1.jpg';
import icsyouImg2 from './assets/camps/icsyou_camp_img_2.jpg';
import icsyouImg3 from './assets/camps/icsyou_camp_img_3.jpg';
import icsyouImg4 from './assets/camps/icsyou_camp_img_4.jpg';
import icsyouRealCert from './assets/camps/icsyou_real_cert.jpg';

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
    id: 'icsyou-camp',
    indexTag: '03 / 05 · KASETSART UNIVERSITY',
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
    indexTag: '04 / 05 · KASETSART UNIVERSITY',
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
      {
        url: kuUpskillCert,
        caption: 'เกียรติบัตรผ่านการฝึกอบรม Engineering Up Skill: Hands-on AI & Smart Systems มหาวิทยาลัยเกษตรศาสตร์',
        tag: 'CERTIFICATE',
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
