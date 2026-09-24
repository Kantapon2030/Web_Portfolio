import React from 'react';

export interface SocialItem {
  id: string;
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface ButtonSocialIconDemoProps {
  theme?: 'dark' | 'light';
  className?: string;
}

export const ButtonSocialIconDemo: React.FC<ButtonSocialIconDemoProps> = ({
  theme = 'dark',
  className = '',
}) => {
  const socialLinks: SocialItem[] = [
    {
      id: 'github',
      name: 'GitHub',
      href: 'https://github.com/Kantapon2030',
      icon: (
        <svg
          className="w-5 h-5 fill-current text-neutral-100"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
    },
    {
      id: 'facebook',
      name: 'Facebook',
      href: 'https://www.facebook.com/kantapon21342',
      icon: (
        <svg
          className="w-5 h-5 fill-[#1877F2]"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      id: 'instagram',
      name: 'Instagram',
      href: 'https://instagram.com/kantapon_020',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <radialGradient id="ig-grad-social" cx="0.3" cy="1.05" r="1.1">
              <stop offset="0%" stopColor="#fdf497" />
              <stop offset="5%" stopColor="#fdf497" />
              <stop offset="45%" stopColor="#fd5949" />
              <stop offset="60%" stopColor="#d6249f" />
              <stop offset="90%" stopColor="#285AEB" />
            </radialGradient>
          </defs>
          <path
            fill="url(#ig-grad-social)"
            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
          />
        </svg>
      ),
    },
  ];

  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center justify-center gap-3 sm:gap-4 flex-wrap ${className}`}>
      {socialLinks.map((item) => (
        <a
          key={item.id}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-label={item.name}
          title={item.name}
          className={`
            group inline-flex items-center gap-2.5
            px-5 py-3 rounded-2xl
            transition-all duration-300 ease-out
            hover:-translate-y-1 active:scale-95
            ${
              isDark
                ? 'bg-[#121217] border border-neutral-800/90 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:bg-[#181820] hover:border-neutral-700 hover:shadow-[0_8px_25px_rgba(0,0,0,0.8)] text-neutral-300 hover:text-white'
                : 'bg-white border border-neutral-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:bg-neutral-50 hover:border-neutral-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] text-neutral-700 hover:text-neutral-900'
            }
          `}
        >
          <div className="transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
            {item.icon}
          </div>
          <span className="text-sm font-medium font-sans tracking-wide">
            {item.name}
          </span>
        </a>
      ))}
    </div>
  );
};

export default ButtonSocialIconDemo;
