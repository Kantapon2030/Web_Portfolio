# Kantapon Wongprot — Computer Engineering Portfolio 🚀

[![Cloudflare Workers](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Workers-f38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://portfolio.tawna20081.workers.dev)
[![React](https://img.shields.io/badge/React%2018-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript%205-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite%205-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%203-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

> **Live Demo:** [portfolio.tawna20081.workers.dev](https://portfolio.tawna20081.workers.dev)

พอร์ตโฟลิโอเว็บไซต์ของ **กันตภณ วงศ์พรต (Kantapon Wongprot)** ผู้มุ่งมั่นศึกษาต่อในระดับอุดมศึกษา สาขา **วิศวกรรมคอมพิวเตอร์ (Computer Engineering)** รวบรวมผลงานนวัตกรรมด้าน **AI, IoT, หุ่นยนต์กู้ภัย, ค่ายวิชาการระดับประเทศ และโครงงานเทคโนโลยี** นำเสนอผ่านการออกแบบอินเตอร์แอคทีฟระดับพรีเมียมด้วยโมเดล 3D และ Animation ที่ลื่นไหล รองรับทั้ง Desktop และ Mobile

---

## ✨ Features & Highlights

- 🤖 **Interactive 3D Mascot:** ตัวละครมาสคอตหุ่นยนต์ 3D สร้างด้วย **Spline 3D** ตอบสนองต่อการขยับเมาส์ พร้อมระบบ Fallback และ Memory Management ที่ปรับให้ลื่นไหลบนสมาร์ตโฟน
- ⚡ **Futuristic Hero Section:** กราฟิก Portrait แบบ SVG Layering ผสานวงแหวนโฮโลแกรม Arduino Levitating และ Spotlight Effect
- 🏆 **Flagship Projects Showcase:**
  - **Smart Songthaew:** ระบบสารสนเทศรถสองแถวอัจฉริยะแบบ Real-Time ด้วย IoT, GPS และ Web Application
  - **พลิกเกมกลโกง:** ผลงานการแข่งขันและนวัตกรรมต่อต้านการทุจริต คว้ารางวัลระดับประเทศ
  - **Kru Suan AI:** แพลตฟอร์มปัญญาประดิษฐ์เพื่อการเรียนรู้และการศึกษา
- 🏕️ **Academic Camps & Competitions:** การเข้าร่วมค่ายเยาวชนด้านวิศวกรรมคอมพิวเตอร์ เช่น CE NextGen Hackathon, KMITL Pre-Engineering และ KU UpSkill
- 📜 **3D Infinite Certificates Marquee:** สไลด์แสดงเกียรติบัตรและประกาศนียบัตรแบบ 3 มิติ รองรับ Responsive เต็มรูปแบบ
- 📊 **Cloudflare Observability:** มีระบบ Cloudflare Workers Logs และ Traces ตรวจสอบสถานะการทำงานและทราฟฟิกเรียลไทม์

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | [React 18](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/) |
| **Build Tool & Bundler** | [Vite 5](https://vitejs.dev/) with Rollup Manual Chunking |
| **Styling & Design System** | [Tailwind CSS 3](https://tailwindcss.com/), [PostCSS](https://postcss.org/), [Autoprefixer](https://github.com/postcss/autoprefixer) |
| **Animation & Motion** | [Framer Motion](https://www.framer.com/motion/) |
| **3D Engine & Runtime** | [@splinetool/react-spline](https://spline.design/), WebGL / WebGPU Runtime |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Deployment & Hosting** | [Cloudflare Workers / Static Assets](https://developers.cloudflare.com/workers/) with Wrangler CLI |

---

## 📂 Project Structure

```bash
Web_Portfolio/
├── public/                 # Static assets, favicons, mascot icons
├── src/
│   ├── assets/             # Project photos, certificate images, and media
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Design system components (Spotlight, Typewriter, etc.)
│   │   ├── CampShowcase.tsx
│   │   ├── CornerMascot.tsx
│   │   ├── MascotInteractive.tsx
│   │   ├── OtherCertificatesMarquee.tsx
│   │   └── SmartSongthaewShowcase.tsx
│   ├── lib/                # Helper utilities (age calculation, formatting)
│   ├── App.tsx             # Main Application Container
│   ├── index.css           # Global CSS and custom animations
│   └── main.tsx            # React DOM Entrypoint
├── dist/                   # Production build output
├── wrangler.json           # Cloudflare Workers configuration
├── vite.config.ts          # Vite build optimizations & chunking strategy
└── package.json            # Project dependencies and npm scripts
```

---

## 🚀 Getting Started Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (Version 18 or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

1. **Clone repository:**
   ```bash
   git clone https://github.com/Kantapon2030/Web_Portfolio.git
   cd Web_Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## ☁️ Deployment

This project is deployed to **Cloudflare Workers (Static Assets)**.

```bash
# Build the latest bundle
npm run build

# Deploy via Wrangler
npx wrangler deploy
```

---

## 👤 Author

**Kantapon Wongprot (กันตภณ วงศ์พรต)**
- 🌐 Portfolio: [https://portfolio.tawna20081.workers.dev](https://portfolio.tawna20081.workers.dev)
- 🐙 GitHub: [@Kantapon2030](https://github.com/Kantapon2030)
- 📘 Facebook: [kantapon21342](https://www.facebook.com/kantapon21342)

---

## 📄 License

This portfolio and its source code are licensed under the MIT License.
