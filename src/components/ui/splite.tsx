import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
  onLoad?: () => void;
}

export function SplineScene({ scene, className = '', onLoad }: SplineSceneProps) {
  return (
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
        className={className}
        onLoad={onLoad}
      />
    </Suspense>
  );
}

export default SplineScene;
