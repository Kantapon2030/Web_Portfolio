import React, { useState, useEffect, useCallback } from 'react';
import { Home, ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

export interface BreadcrumbIconProps {
  className?: string;
  items?: BreadcrumbItem[];
}

const SECTION_MAP: { id: string; label: string }[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'เกี่ยวกับเรา' },
  { id: 'skills', label: 'ทักษะ & เครื่องมือ' },
  { id: 'philosophy', label: 'ปรัชญา' },
  { id: 'projects', label: 'ผลงานคัดสรร' },
  { id: 'camps', label: 'ค่ายวิชาการ' },
  { id: 'other', label: 'เกียรติบัตร' },
  { id: 'contact', label: 'ติดต่อ' },
];

export const BreadcrumbIcon: React.FC<BreadcrumbIconProps> = ({
  className = '',
  items: customItems,
}) => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Reliable, cross-browser smooth scroll to top
  const scrollToTop = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (document.documentElement) {
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    if (document.body) {
      document.body.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    const hero = document.getElementById('hero');
    if (hero) {
      hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const scrollToSection = useCallback((id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (id === 'hero') {
      scrollToTop(e);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [scrollToTop]);

  // Track active section on scroll
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + 200;

          if (window.scrollY < 120) {
            setActiveSection('hero');
            ticking = false;
            return;
          }

          let current = 'hero';
          for (let i = 0; i < SECTION_MAP.length; i++) {
            const section = document.getElementById(SECTION_MAP[i].id);
            if (section) {
              const top = section.offsetTop;
              if (scrollPosition >= top) {
                current = SECTION_MAP[i].id;
              }
            }
          }
          setActiveSection(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute displayed items
  const currentSectionMeta = SECTION_MAP.find((s) => s.id === activeSection);
  const isAtHero = activeSection === 'hero';

  const defaultItems: BreadcrumbItem[] = isAtHero
    ? [
        {
          label: 'Home',
          href: '#hero',
          icon: <Home size={14} className="text-emerald-400 shrink-0" />,
          onClick: scrollToTop,
        },
      ]
    : [
        {
          label: 'Home',
          href: '#hero',
          icon: <Home size={14} className="text-emerald-400 shrink-0" />,
          onClick: scrollToTop,
        },
        {
          label: currentSectionMeta ? currentSectionMeta.label : activeSection,
          href: `#${activeSection}`,
          onClick: (e) => scrollToSection(activeSection, e),
        },
      ];

  const items = customItems || defaultItems;

  return (
    <nav
      aria-label="Breadcrumb navigation"
      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/15 shadow-xl text-xs font-mono text-neutral-300 transition-all active:scale-[0.98] select-none ${className}`}
    >
      <ol className="inline-flex items-center gap-1.5 m-0 p-0 list-none">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isHome = index === 0;

          return (
            <li key={item.label} className="inline-flex items-center gap-1.5">
              <button
                type="button"
                onClick={item.onClick || (isHome ? scrollToTop : undefined)}
                className={`inline-flex items-center gap-1.5 py-0.5 px-1.5 rounded transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  isLast && !isHome
                    ? 'text-white font-medium hover:text-emerald-300'
                    : 'text-neutral-300 hover:text-white'
                }`}
                title={isHome ? 'เลื่อนกลับไปด้านบน (Home)' : `ไปที่ ${item.label}`}
              >
                {item.icon}
                <span className="truncate max-w-[120px] sm:max-w-[180px]">{item.label}</span>
              </button>

              {!isLast && (
                <ChevronRight
                  size={12}
                  className="text-neutral-500 shrink-0 select-none"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbIcon;
