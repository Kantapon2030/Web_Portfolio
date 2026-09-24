import React from 'react';

export interface UniqueLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'morph';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const UniqueLoading: React.FC<UniqueLoadingProps> = ({
  variant = 'morph',
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeMap: Record<'sm' | 'md' | 'lg', string> = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  if (variant === 'morph') {
    return (
      <div
        className={`relative ${sizeMap[size] || ''} ${className}`}
        role="status"
        aria-label="Loading..."
        {...props}
      >
        <style>
          {`
            @keyframes morph-0 {
              0%, 100% {
                border-radius: 0%;
                transform: translate(0) scale(1);
              }
              25% {
                border-radius: 50%;
                transform: translate(20px, -20px) scale(1.2);
              }
              50% {
                border-radius: 25%;
                transform: translate(40px) scale(0.8);
              }
              75% {
                border-radius: 75%;
                transform: translate(20px, 20px) scale(1.1);
              }
            }
            @keyframes morph-1 {
              0%, 100% {
                border-radius: 0%;
                transform: translate(0) scale(1) rotate(0deg);
              }
              25% {
                border-radius: 50%;
                transform: translate(-20px, -20px) scale(1.3) rotate(90deg);
              }
              50% {
                border-radius: 25%;
                transform: translate(-40px) scale(0.7) rotate(180deg);
              }
              75% {
                border-radius: 75%;
                transform: translate(-20px, 20px) scale(1.2) rotate(270deg);
              }
            }
            @keyframes morph-2 {
              0%, 100% {
                border-radius: 0%;
                transform: translate(0) scale(1);
              }
              25% {
                border-radius: 100%;
                transform: translate(-20px, 20px) scale(0.9);
              }
              50% {
                border-radius: 0%;
                transform: translateY(40px) scale(1.4);
              }
              75% {
                border-radius: 50%;
                transform: translate(20px, 20px) scale(0.8);
              }
            }
            @keyframes morph-3 {
              0%, 100% {
                border-radius: 0%;
                transform: translate(0) scale(1) rotate(0deg);
              }
              25% {
                border-radius: 25%;
                transform: translate(20px, 20px) scale(1.1) rotate(-90deg);
              }
              50% {
                border-radius: 100%;
                transform: translateY(-40px) scale(1.3) rotate(-180deg);
              }
              75% {
                border-radius: 75%;
                transform: translate(-20px, -20px) scale(0.9) rotate(-270deg);
              }
            }
          `}
        </style>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[0, 1, 2, 3].map((d) => (
            <div
              key={d}
              className="absolute w-4 h-4 bg-white dark:bg-white shadow-[0_0_12px_rgba(255,255,255,0.5)]"
              style={{
                animation: `morph-${d} 2s infinite ease-in-out`,
                animationDelay: `${d * 0.2}s`,
                willChange: 'transform, border-radius',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default UniqueLoading;
