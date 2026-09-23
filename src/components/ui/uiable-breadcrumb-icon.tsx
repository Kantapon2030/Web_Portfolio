import React from 'react';
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

const defaultItems: BreadcrumbItem[] = [
  { label: 'Home', href: '#hero', icon: <Home size={14} className="text-emerald-400" /> },
];

export const BreadcrumbIcon: React.FC<BreadcrumbIconProps> = ({
  className = '',
  items = defaultItems,
}) => {
  return (
    <nav
      aria-label="Breadcrumb navigation"
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-xl border border-white/10 shadow-lg text-xs font-mono text-neutral-300 transition-all ${className}`}
    >
      <ol className="inline-flex items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="inline-flex items-center gap-1.5">
              {item.href ? (
                <a
                  href={item.href}
                  onClick={item.onClick}
                  className="inline-flex items-center gap-1.5 py-0.5 px-1 rounded hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1 focus-visible:ring-offset-black"
                >
                  {item.icon}
                  <span className={isLast ? 'text-white font-medium' : 'text-neutral-400'}>
                    {item.label}
                  </span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-white font-medium">
                  {item.icon}
                  <span>{item.label}</span>
                </span>
              )}

              {!isLast && (
                <ChevronRight size={12} className="text-neutral-500 shrink-0" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbIcon;
