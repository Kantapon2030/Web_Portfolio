import { Suspense, lazy, useRef, useState, useEffect } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

import type { Application } from '@splinetool/runtime';

interface SplineSceneProps {
  scene: string;
  className?: string;
  onLoad?: () => void;
}

export function SplineScene({ scene, className = '', onLoad }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const splineAppRef = useRef<Application | null>(null);
  const isInViewRef = useRef<boolean>(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        isInViewRef.current = inView;
        setIsVisible(inView);

        if (splineAppRef.current) {
          try {
            if (inView) {
              if (splineAppRef.current.isStopped) {
                splineAppRef.current.play();
              }
            } else {
              if (!splineAppRef.current.isStopped) {
                splineAppRef.current.stop();
              }
            }
          } catch {
            // Safety guard
          }
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (splineAppRef.current) {
        try {
          if (!splineAppRef.current.isStopped) {
            splineAppRef.current.stop();
          }
        } catch {
          // Safety guard
        }
      }
    };
  }, []);

  const handleSplineLoad = (app: Application) => {
    splineAppRef.current = app;
    // If scene loaded while user has already scrolled past, pause immediately
    if (!isInViewRef.current) {
      try {
        app.stop();
      } catch {
        // Safety guard
      }
    }
    if (onLoad) onLoad();
  };

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className}`}
      style={{
        visibility: isVisible ? 'visible' : 'hidden',
        contain: 'layout paint',
      }}
    >
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-black/40">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
              <span className="text-[11px] font-mono text-neutral-400">Loading 3D Scene...</span>
            </div>
          </div>
        }
      >
        <Spline
          scene={scene}
          className="w-full h-full"
          onLoad={handleSplineLoad}
        />
      </Suspense>
    </div>
  );
}

export default SplineScene;
